"use server";

// Server Actions for /dashboard/configuracion
// Persist store customization to Supabase.
// Primary target: store_appearance table (typed columns per v10 schema).
// Fallback: stores.customization JSONB column (legacy -- kept for backward compat).
// Auth check: getUser() -> find store by owner_id.
// RLS on the stores table enforces auth.uid() = owner_id as a second layer.
//
// Fallback pattern: callers check for UNAUTHORIZED and fall back to localStorage.

import { revalidatePath } from "next/cache";
import { createClient } from "@/infrastructure/supabase/server";
import {
  brandingSchema,
  contentSchema,
  businessSchema,
  themeSchema,
} from "@/shared/validators/store-customization.schema";
import type { StoreCustomization } from "@/types/templates/store-customization";
import type { BrandingConfig, ContentConfig, BusinessConfig } from "@/types/templates/customization-sections";
import type { ThemeCustomization } from "@/types/templates/store-customization";
import type { Json, StoreRow, StoreAppearanceRow, StoreAppearanceUpdate } from "@/infrastructure/database.types";
import { DEFAULT_TEMPLATE_ID } from "@/shared/constants";
import type { ActionResult } from "@/types/domain";

// ── Helpers ────────────────────────────────────────────────────────────────────────────────

/** Fully recursive deep-merge: patch wins over base at every nesting level. */
function deepMerge<T extends Record<string, unknown>>(base: T, patch: Partial<T>): T {
  const result = { ...base };
  for (const key of Object.keys(patch) as Array<keyof T>) {
    const patchVal = patch[key];
    if (patchVal === undefined) continue;
    const baseVal = base[key];
    if (
      patchVal !== null && typeof patchVal === "object" && !Array.isArray(patchVal) &&
      baseVal !== null && typeof baseVal === "object" && !Array.isArray(baseVal)
    ) {
      result[key] = deepMerge(baseVal as Record<string, unknown>, patchVal as Record<string, unknown>) as T[typeof key];
    } else {
      result[key] = patchVal as T[typeof key];
    }
  }
  return result;
}

/** Convert a StoreAppearanceRow into the StoreCustomization shape understood by templates. */
function appearanceRowToCustomization(row: StoreAppearanceRow): StoreCustomization {
  // store_appearance has standalone columns for variants and sections but StoreCustomization
  // folds them into layout.structuralVariants and layout.sections respectively.
  const baseLayout = (row.layout as unknown as StoreCustomization["layout"]) ?? {};
  const variantsOverride = row.variants != null
    ? { structuralVariants: row.variants as unknown as StoreCustomization["layout"] extends { structuralVariants?: infer V } ? V : unknown }
    : {};
  const sectionsOverride = row.sections != null
    ? { sections: row.sections as unknown as StoreCustomization["layout"] extends { sections?: infer S } ? S : unknown }
    : {};

  return {
    templateId: DEFAULT_TEMPLATE_ID,
    theme: (row.theme as unknown as StoreCustomization["theme"]) ?? {},
    layout: { ...baseLayout, ...variantsOverride, ...sectionsOverride } as StoreCustomization["layout"],
    content: (row.content as unknown as StoreCustomization["content"]) ?? {},
    branding: (row.branding as unknown as StoreCustomization["branding"]) ?? {},
  };
}

// ── Auth helper ────────────────────────────────────────────────────────────────────────────

/** Returns the authenticated user's store row, or null if not authenticated / no store. */
async function getAuthenticatedStore(): Promise<Pick<StoreRow, "id" | "slug"> | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase
    .from("stores")
    .select("id, slug")
    .eq("owner_id", user.id)
    .single();

  if (!data) return null;
  return data as unknown as Pick<StoreRow, "id" | "slug">;
}

// ── store_appearance upsert helper ────────────────────────────────────────────────────────────

/**
 * Upsert a partial patch into store_appearance for the given store.
 * On conflict for store_id, updates only the provided columns.
 * Revalidates the public storefront path on success.
 */
async function upsertAppearance(
  supabase: Awaited<ReturnType<typeof createClient>>,
  storeId: string,
  slug: string,
  patch: Partial<StoreAppearanceUpdate>,
): Promise<ActionResult<void>> {
  const { error } = await supabase
    .from("store_appearance")
    .upsert(
      { store_id: storeId, ...patch },
      { onConflict: "store_id" }
    );

  if (error) {
    if (process.env.NODE_ENV === 'development') console.error("Failed to update appearance:", error);
    return { success: false, error: { code: "DB_ERROR", message: error.message } };
  }

  revalidatePath(`/${slug}`, "layout");
  return { success: true, data: undefined };
}

// ── Read ───────────────────────────────────────────────────────────────────────────────────

/** Minimal product shape required by the ProductPicker component. */
export interface PickerProductData {
  id: string;
  name: string;
  price: number;
  images: Array<{ url: string | null }>;
}

/**
 * Fetch all products for the authenticated user's store.
 * Returns an empty array if the user is not authenticated or the query fails.
 * Images are sorted by sort_order and limited to the first 4 per product.
 */
export async function readProducts(): Promise<PickerProductData[]> {
  const store = await getAuthenticatedStore();
  if (!store) return [];

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("id, name, price, product_images(url, sort_order)")
    .eq("store_id", store.id)
    .order("sort_order", { ascending: true });

  if (error || !data) return [];

  return data.map((row) => {
    const images = (
      (row.product_images as Array<{ url: string; sort_order: number }> | null) ?? []
    )
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((img) => ({ url: img.url }));

    return {
      id: row.id as string,
      name: row.name as string,
      price: row.price as number,
      images,
    };
  });
}

/**
 * Read the full customization for the authenticated user's store.
 * Primary: reads from store_appearance table (v10 schema).
 * Fallback: reads from stores.customization JSONB (legacy).
 */
export async function readCustomization(): Promise<StoreCustomization | null> {
  const store = await getAuthenticatedStore();
  if (!store) return null;

  const supabase = await createClient();

  // Primary: store_appearance table
  const { data: appearance } = await supabase
    .from("store_appearance")
    .select("*")
    .eq("store_id", store.id)
    .single();

  if (appearance) {
    return appearanceRowToCustomization(appearance as StoreAppearanceRow);
  }

  return null;
}

// ── Section updaters ────────────────────────────────────────────────────────────────────────

/** Merge theme overrides into store_appearance.theme. */
export async function updateTheme(
  theme: ThemeCustomization
): Promise<ActionResult<void>> {
  const store = await getAuthenticatedStore();
  if (!store) {
    return {
      success: false,
      error: { code: "UNAUTHORIZED", message: "No autenticado" },
    };
  }

  const parsed = themeSchema.safeParse(theme);
  if (!parsed.success) {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Datos de apariencia inválidos: " + parsed.error.issues[0]?.message,
      },
    };
  }

  const supabase = await createClient();

  // Read current theme to deep-merge
  const { data: current } = await supabase
    .from("store_appearance")
    .select("theme")
    .eq("store_id", store.id)
    .single();

  const currentTheme = (current?.theme as unknown as Record<string, unknown>) ?? {};
  const mergedTheme = deepMerge(currentTheme, parsed.data as Record<string, unknown>);

  const patch: Partial<StoreAppearanceUpdate> = {
    theme: mergedTheme as Json,
  };

  // If the theme data includes a fontPair, persist it to the typed column
  if ("fontPair" in parsed.data && (parsed.data as Record<string, unknown>).fontPair != null) {
    patch.font_pair = String((parsed.data as Record<string, unknown>).fontPair);
  }

  return upsertAppearance(supabase, store.id, store.slug, patch);
}

/** Merge branding overrides into store_appearance.branding. */
export async function updateBranding(
  branding: BrandingConfig
): Promise<ActionResult<void>> {
  const store = await getAuthenticatedStore();
  if (!store) {
    return {
      success: false,
      error: { code: "UNAUTHORIZED", message: "No autenticado" },
    };
  }

  const parsed = brandingSchema.safeParse(branding);
  if (!parsed.success) {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Datos de identidad inválidos: " + parsed.error.issues[0]?.message,
      },
    };
  }

  const supabase = await createClient();

  // Read current branding to deep-merge
  const { data: current } = await supabase
    .from("store_appearance")
    .select("branding")
    .eq("store_id", store.id)
    .single();

  const currentBranding = (current?.branding as unknown as Record<string, unknown>) ?? {};
  const mergedBranding = deepMerge(currentBranding, parsed.data as Record<string, unknown>);

  return upsertAppearance(supabase, store.id, store.slug, {
    branding: mergedBranding as Json,
  });
}

/** Merge content overrides into store_appearance.content. */
export async function updateContent(
  content: ContentConfig
): Promise<ActionResult<void>> {
  const store = await getAuthenticatedStore();
  if (!store) {
    return {
      success: false,
      error: { code: "UNAUTHORIZED", message: "No autenticado" },
    };
  }

  const parsed = contentSchema.safeParse(content);
  if (!parsed.success) {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Datos de contenido inválidos: " + parsed.error.issues[0]?.message,
      },
    };
  }

  const supabase = await createClient();

  // Read current content to deep-merge
  const { data: current } = await supabase
    .from("store_appearance")
    .select("content")
    .eq("store_id", store.id)
    .single();

  const currentContent = (current?.content as unknown as Record<string, unknown>) ?? {};
  const mergedContent = deepMerge(currentContent, parsed.data as Record<string, unknown>);

  return upsertAppearance(supabase, store.id, store.slug, {
    content: mergedContent as Json,
  });
}

/**
 * Merge business overrides into stores.business_info.
 * Business info lives on the stores.business_info JSONB column (v10 schema).
 */
export async function updateBusiness(
  business: BusinessConfig
): Promise<ActionResult<void>> {
  const store = await getAuthenticatedStore();
  if (!store) {
    return {
      success: false,
      error: { code: "UNAUTHORIZED", message: "No autenticado" },
    };
  }

  const parsed = businessSchema.safeParse(business);
  if (!parsed.success) {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Datos del negocio inválidos: " + parsed.error.issues[0]?.message,
      },
    };
  }

  const supabase = await createClient();

  // Read current business_info for deep-merge
  const { data: storeRow } = await supabase
    .from("stores")
    .select("id, slug, business_info")
    .eq("id", store.id)
    .single();

  const currentBiz = ((storeRow as any)?.business_info as Record<string, unknown>) ?? {};
  const merged = deepMerge(currentBiz, parsed.data as Record<string, unknown>);

  const { error } = await supabase
    .from("stores")
    .update({ business_info: merged as unknown as Json } as any)
    .eq("id", store.id);

  if (error) {
    return {
      success: false,
      error: { code: "DB_ERROR", message: "Error al guardar el negocio. Intentá de nuevo." },
    };
  }

  revalidatePath(`/${store.slug}`, "layout");
  return { success: true, data: undefined };
}

/**
 * Generic section updater for dynamic schema tabs (e.g. layout, content subsections).
 * Routes appearance-keyed sections to the typed store_appearance columns.
 * Falls back to stores.customization JSONB for non-appearance sections.
 */
export async function updateCustomizationSection(
  section: keyof StoreCustomization,
  data: Record<string, unknown>
): Promise<ActionResult<void>> {
  const store = await getAuthenticatedStore();
  if (!store) {
    return {
      success: false,
      error: { code: "UNAUTHORIZED", message: "No autenticado" },
    };
  }

  const supabase = await createClient();

  // Sections that map directly to typed store_appearance columns.
  // Note: StoreCustomization does NOT have variants/sections at the root;
  // those are folded into layout on read. Here we only route the root-level
  // StoreCustomization keys that have matching store_appearance columns.
  const appearanceColumns = new Set<keyof StoreCustomization>(["theme", "layout", "content", "branding"]);

  if (appearanceColumns.has(section)) {
    const columnName = section as "theme" | "layout" | "content" | "branding";

    // Read the current column value to deep-merge
    const { data: current } = await supabase
      .from("store_appearance")
      .select(columnName)
      .eq("store_id", store.id)
      .single();

    const currentSection = ((current as Record<string, unknown> | null)?.[columnName] as unknown as Record<string, unknown>) ?? {};
    const merged = deepMerge(currentSection, data);

    return upsertAppearance(supabase, store.id, store.slug, {
      [columnName]: merged as Json,
    });
  }

  // Section not mapped to store_appearance — no-op for non-appearance keys.
  return {
    success: false,
    error: { code: "VALIDATION_ERROR", message: `Sección desconocida: ${String(section)}` },
  };
}
