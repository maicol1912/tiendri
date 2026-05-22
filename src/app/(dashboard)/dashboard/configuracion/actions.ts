"use server";

// Server Actions for /dashboard/configuracion
// Auth: getUser() — never getSession()
// Validation: Zod schemas from validators/store-customization.schema.ts
// Response pattern: { success: true, data } / { success: false, error: { code, message, field? } }

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  brandingSchema,
  contentSchema,
  businessSchema,
  themeSchema,
} from "@/lib/validators/store-customization.schema";
import type { BrandingInput, ContentInput, BusinessInput, ThemeInput } from "@/lib/validators/store-customization.schema";
import type { StoreCustomization } from "@/types/templates/store-customization";

// ── Shared types ──────────────────────────────────────────────────────────────

interface ActionError {
  code: string;
  message: string;
  field?: string;
}

type ActionResult<T = undefined> =
  | { success: true; data?: T }
  | { success: false; error: ActionError };

// Lightweight store shape — only what we need from Supabase
interface StoreRecord {
  id: string;
  slug: string;
  owner_id: string;
  customization: unknown;
}

// ── Shared auth + store helpers ───────────────────────────────────────────────

async function getAuthenticatedStore(): Promise<
  | { storeId: string; slug: string }
  | { error: ActionError }
> {
  const supabase = await createClient();

  const { data: authData, error: userError } = await supabase.auth.getUser();
  if (userError || !authData.user) {
    return { error: { code: "UNAUTHORIZED", message: "Debes iniciar sesión para continuar" } };
  }

  const { data, error: storeError } = await supabase
    .from("stores")
    .select("id, slug, owner_id")
    .eq("owner_id", authData.user.id)
    .single();

  if (storeError || !data) {
    return { error: { code: "NOT_FOUND", message: "No se encontró tu tienda" } };
  }

  // Supabase typed client resolves partial selects — cast to our interface
  const store = data as unknown as StoreRecord;
  return { storeId: store.id, slug: store.slug };
}

// ── Merge helpers — preserve existing customization sections ─────────────────

async function mergeAndSave(
  storeId: string,
  slug: string,
  section: "branding" | "content" | "business" | "theme",
  data: BrandingInput | ContentInput | BusinessInput | ThemeInput
): Promise<ActionResult> {
  const supabase = await createClient();

  // Fetch current customization to merge (not replace) at section level
  const { data: rawStore } = await supabase
    .from("stores")
    .select("customization")
    .eq("id", storeId)
    .single();

  const store = rawStore as unknown as Pick<StoreRecord, "customization"> | null;
  const existing = (store?.customization ?? {}) as StoreCustomization;

  const updated: StoreCustomization = {
    ...existing,
    [section]: {
      ...(existing[section] ?? {}),
      ...data,
    },
  };

  // Supabase typed client resolves `.update()` arg to `never` for JSONB columns
  // in strict TypeScript mode when using the generated database types.
  // Casting to `{ update(data: Record<string, unknown>): unknown }` targets only
  // the problematic `update` method and avoids a broad `as any` on the whole client.
  type UpdatableTable = { update(data: Record<string, unknown>): ReturnType<typeof supabase.from>; };
  const { error: updateError } = await (supabase.from("stores") as unknown as UpdatableTable)
    .update({ customization: updated })
    .eq("id", storeId);

  if (updateError) {
    return {
      success: false,
      error: { code: "DATABASE_ERROR", message: "Error al guardar los cambios. Intentá de nuevo." },
    };
  }

  revalidatePath(`/${slug}`);
  revalidatePath("/dashboard/configuracion");

  return { success: true };
}

// ── updateBranding ─────────────────────────────────────────────────────────────

export async function updateBranding(formData: FormData): Promise<ActionResult> {
  const auth = await getAuthenticatedStore();
  if ("error" in auth) return { success: false, error: auth.error };

  const raw = {
    storeName: (formData.get("storeName") as string | null) ?? undefined,
    description: (formData.get("description") as string | null) ?? undefined,
    whatsapp: (formData.get("whatsapp") as string | null) ?? undefined,
    logo: (formData.get("logo") as string | null) ?? undefined,
    favicon: (formData.get("favicon") as string | null) ?? undefined,
    socialLinks: {
      instagram: (formData.get("instagram") as string | null) ?? undefined,
      facebook: (formData.get("facebook") as string | null) ?? undefined,
      tiktok: (formData.get("tiktok") as string | null) ?? undefined,
      twitter: (formData.get("twitter") as string | null) ?? undefined,
      youtube: (formData.get("youtube") as string | null) ?? undefined,
    },
  };

  const result = brandingSchema.safeParse(raw);
  if (!result.success) {
    const firstIssue = result.error.issues[0];
    const field = firstIssue?.path.join(".");
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: firstIssue?.message ?? "Datos inválidos",
        field,
      },
    };
  }

  return mergeAndSave(auth.storeId, auth.slug, "branding", result.data);
}

// ── updateContent ─────────────────────────────────────────────────────────────

export async function updateContent(formData: FormData): Promise<ActionResult> {
  const auth = await getAuthenticatedStore();
  if ("error" in auth) return { success: false, error: auth.error };

  // Parse JSON-encoded fields from the form
  const parseJsonField = <T>(key: string): T | undefined => {
    const val = formData.get(key) as string | null;
    if (!val) return undefined;
    try {
      return JSON.parse(val) as T;
    } catch {
      return undefined;
    }
  };

  const raw = {
    heroBanner: {
      title: (formData.get("heroBannerTitle") as string | null) ?? undefined,
      subtitle: (formData.get("heroBannerSubtitle") as string | null) ?? undefined,
      ctaText: (formData.get("heroBannerCtaText") as string | null) ?? undefined,
      image: (formData.get("heroBannerImage") as string | null) ?? undefined,
    },
    navLinks: parseJsonField<{ label: string; href: string }[]>("navLinks"),
    footerServices: parseJsonField<string[]>("footerServices"),
    footerAssistance: parseJsonField<string[]>("footerAssistance"),
    productTabs: parseJsonField<{ id: string; label: string }[]>("productTabs"),
    popularSearches: parseJsonField<string[]>("popularSearches"),
    featuredProductIds: parseJsonField<string[]>("featuredProductIds"),
    popularProductIds: parseJsonField<string[]>("popularProductIds"),
    discountProductIds: parseJsonField<string[]>("discountProductIds"),
  };

  const result = contentSchema.safeParse(raw);
  if (!result.success) {
    const firstIssue = result.error.issues[0];
    const field = firstIssue?.path.join(".");
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: firstIssue?.message ?? "Datos inválidos",
        field,
      },
    };
  }

  // ── Product ownership validation ──────────────────────────────────────────
  // Collect all submitted product IDs across the three arrays.
  const submittedProductIds = [
    ...(result.data.featuredProductIds ?? []),
    ...(result.data.popularProductIds ?? []),
    ...(result.data.discountProductIds ?? []),
  ];

  if (submittedProductIds.length > 0) {
    // TODO: Once the `products` table exists, uncomment and activate the block below
    // to validate that every submitted product ID belongs to this merchant's store.
    // Without this check a merchant could reference another store's product IDs,
    // which would expose foreign data on their storefront.
    //
    // const supabase = await createClient();
    // const { data: ownedProducts, error: productsError } = await supabase
    //   .from("products")
    //   .select("id")
    //   .eq("store_id", auth.storeId)
    //   .in("id", submittedProductIds);
    //
    // if (productsError) {
    //   return {
    //     success: false,
    //     error: { code: "DATABASE_ERROR", message: "Error al verificar los productos." },
    //   };
    // }
    //
    // const ownedIds = new Set((ownedProducts ?? []).map((p) => p.id));
    // const foreignIds = submittedProductIds.filter((id) => !ownedIds.has(id));
    // if (foreignIds.length > 0) {
    //   return {
    //     success: false,
    //     error: {
    //       code: "VALIDATION_ERROR",
    //       message: "Algunos productos seleccionados no pertenecen a tu tienda.",
    //       field: "productIds",
    //     },
    //   };
    // }
  }

  return mergeAndSave(auth.storeId, auth.slug, "content", result.data);
}

// ── updateBusiness ────────────────────────────────────────────────────────────

export async function updateBusiness(formData: FormData): Promise<ActionResult> {
  const auth = await getAuthenticatedStore();
  if ("error" in auth) return { success: false, error: auth.error };

  const paymentMethodsRaw = formData.getAll("paymentMethods") as string[];

  const raw = {
    city: (formData.get("city") as string | null) ?? undefined,
    address: (formData.get("address") as string | null) ?? undefined,
    hours: (formData.get("hours") as string | null) ?? undefined,
    paymentMethods: paymentMethodsRaw.length > 0 ? paymentMethodsRaw : undefined,
    shippingInfo: {
      cost: (formData.get("shippingCost") as string | null) ?? undefined,
      estimatedTime: (formData.get("shippingTime") as string | null) ?? undefined,
      freeAbove: (formData.get("shippingFreeAbove") as string | null) ?? undefined,
    },
    currency: (formData.get("currency") as string | null) ?? undefined,
  };

  const result = businessSchema.safeParse(raw);
  if (!result.success) {
    const firstIssue = result.error.issues[0];
    const field = firstIssue?.path.join(".");
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: firstIssue?.message ?? "Datos inválidos",
        field,
      },
    };
  }

  return mergeAndSave(auth.storeId, auth.slug, "business", result.data);
}

// ── updateTheme ───────────────────────────────────────────────────────────────

export async function updateTheme(formData: FormData): Promise<ActionResult> {
  const auth = await getAuthenticatedStore();
  if ("error" in auth) return { success: false, error: auth.error };

  // Reconstruct the nested colors/radius objects from flat form fields
  const raw = {
    colors: {
      primary: (formData.get("primary") as string | null) ?? undefined,
      secondary: (formData.get("secondary") as string | null) ?? undefined,
      background: (formData.get("background") as string | null) ?? undefined,
      cardBg: (formData.get("cardBg") as string | null) ?? undefined,
    },
    radius: {
      card: (formData.get("radiusCard") as string | null) ?? undefined,
      category: (formData.get("radiusCategory") as string | null) ?? undefined,
      button: (formData.get("radiusButton") as string | null) ?? undefined,
    },
    fontPair: (formData.get("fontPair") as string | null) ?? undefined,
  };

  const result = themeSchema.safeParse(raw);
  if (!result.success) {
    const firstIssue = result.error.issues[0];
    const field = firstIssue?.path.join(".");
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: firstIssue?.message ?? "Datos de apariencia inválidos",
        field,
      },
    };
  }

  return mergeAndSave(auth.storeId, auth.slug, "theme", result.data);
}

// ── createUploadUrl ────────────────────────────────────────────────────────────

export async function createUploadUrl(
  bucket: string,
  storeId: string,
  filename: string
): Promise<
  | { success: true; signedUrl: string; publicUrl: string }
  | { success: false; error: ActionError }
> {
  const supabase = await createClient();

  const { data: authData, error: userError } = await supabase.auth.getUser();
  if (userError || !authData.user) {
    return { success: false, error: { code: "UNAUTHORIZED", message: "No autorizado" } };
  }

  // Verify ownership — user must own this store
  const { data: rawStore } = await supabase
    .from("stores")
    .select("id")
    .eq("id", storeId)
    .eq("owner_id", authData.user.id)
    .single();

  if (!rawStore) {
    return { success: false, error: { code: "FORBIDDEN", message: "No tenés permiso para subir archivos a esta tienda" } };
  }

  const path = `${storeId}/${filename}`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(bucket)
    .createSignedUploadUrl(path);

  if (uploadError || !uploadData) {
    return {
      success: false,
      error: { code: "STORAGE_ERROR", message: "Error al generar URL de subida. Intentá de nuevo." },
    };
  }

  const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(path);

  return {
    success: true,
    signedUrl: uploadData.signedUrl,
    publicUrl,
  };
}
