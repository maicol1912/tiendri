"use server";

// Server Actions for /dashboard/configuracion
// Persist store customization to Supabase (stores.customization JSONB column).
// Auth check: getUser() → find store by owner_id.
// RLS on the stores table enforces auth.uid() = owner_id as a second layer.
//
// Fallback pattern: callers check for UNAUTHORIZED and fall back to localStorage.

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  storeCustomizationSchema,
  brandingSchema,
  contentSchema,
  businessSchema,
  themeSchema,
} from "@/lib/validators/store-customization.schema";
import type { StoreCustomization } from "@/types/templates/store-customization";
import type { BrandingConfig, ContentConfig, BusinessConfig } from "@/types/templates/customization-sections";
import type { ThemeCustomization } from "@/types/templates/store-customization";

// ── Shared types ──────────────────────────────────────────────────────────────

interface ActionError {
  code: string;
  message: string;
  field?: string;
}

export type ActionResult<T = undefined> =
  | { success: true; data?: T }
  | { success: false; error: ActionError };

// ── Auth helper ───────────────────────────────────────────────────────────────

/** Returns the authenticated user's store row, or null if not authenticated / no store. */
async function getAuthenticatedStore() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: store } = await supabase
    .from("stores")
    .select("id, customization")
    .eq("owner_id", user.id)
    .single();

  return store ?? null;
}

/** Deep-merge `patch` into `base` (one level of nesting — sufficient for StoreCustomization). */
function deepMerge<T extends Record<string, unknown>>(
  base: T,
  patch: Partial<T>
): T {
  const result = { ...base };
  for (const key of Object.keys(patch) as Array<keyof T>) {
    const patchVal = patch[key];
    const baseVal = base[key];
    if (
      patchVal !== null &&
      typeof patchVal === "object" &&
      !Array.isArray(patchVal) &&
      baseVal !== null &&
      typeof baseVal === "object" &&
      !Array.isArray(baseVal)
    ) {
      result[key] = {
        ...(baseVal as Record<string, unknown>),
        ...(patchVal as Record<string, unknown>),
      } as T[typeof key];
    } else {
      result[key] = patchVal as T[typeof key];
    }
  }
  return result;
}

// ── Read ──────────────────────────────────────────────────────────────────────

/** Read the full customization blob for the authenticated user's store. */
export async function readCustomization(): Promise<StoreCustomization | null> {
  const store = await getAuthenticatedStore();
  if (!store) return null;

  const raw = store.customization;
  if (!raw || typeof raw !== "object") return null;

  return raw as StoreCustomization;
}

// ── Write (full) ──────────────────────────────────────────────────────────────

/** Replace the entire customization blob. Validates with Zod before writing. */
export async function writeCustomization(
  data: StoreCustomization
): Promise<ActionResult<void>> {
  const store = await getAuthenticatedStore();
  if (!store) {
    return {
      success: false,
      error: { code: "UNAUTHORIZED", message: "No autenticado" },
    };
  }

  const parsed = storeCustomizationSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Datos inválidos: " + parsed.error.issues[0]?.message,
      },
    };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("stores")
    .update({ customization: parsed.data as Record<string, unknown> })
    .eq("id", store.id);

  if (error) {
    return {
      success: false,
      error: { code: "DB_ERROR", message: "Error al guardar los cambios. Intentá de nuevo." },
    };
  }

  revalidatePath("/[slug]", "layout");
  return { success: true };
}

// ── Section updaters ──────────────────────────────────────────────────────────

/** Merge theme overrides into existing customization. */
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

  const current = (store.customization ?? { templateId: "tech-premium" }) as StoreCustomization;
  const updated: StoreCustomization = {
    ...current,
    theme: deepMerge(
      (current.theme ?? {}) as Record<string, unknown>,
      parsed.data as Record<string, unknown>
    ) as ThemeCustomization,
  };

  const supabase = await createClient();
  const { error } = await supabase
    .from("stores")
    .update({ customization: updated as Record<string, unknown> })
    .eq("id", store.id);

  if (error) {
    return {
      success: false,
      error: { code: "DB_ERROR", message: "Error al guardar la apariencia. Intentá de nuevo." },
    };
  }

  revalidatePath("/[slug]", "layout");
  return { success: true };
}

/** Merge branding overrides into existing customization. */
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

  const current = (store.customization ?? { templateId: "tech-premium" }) as StoreCustomization;
  const updated: StoreCustomization = {
    ...current,
    branding: {
      ...(current.branding ?? {}),
      ...parsed.data,
    },
  };

  const supabase = await createClient();
  const { error } = await supabase
    .from("stores")
    .update({ customization: updated as Record<string, unknown> })
    .eq("id", store.id);

  if (error) {
    return {
      success: false,
      error: { code: "DB_ERROR", message: "Error al guardar la identidad. Intentá de nuevo." },
    };
  }

  revalidatePath("/[slug]", "layout");
  return { success: true };
}

/** Merge content overrides into existing customization. */
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

  const current = (store.customization ?? { templateId: "tech-premium" }) as StoreCustomization;
  const updated: StoreCustomization = {
    ...current,
    content: {
      ...(current.content ?? {}),
      ...parsed.data,
    },
  };

  const supabase = await createClient();
  const { error } = await supabase
    .from("stores")
    .update({ customization: updated as Record<string, unknown> })
    .eq("id", store.id);

  if (error) {
    return {
      success: false,
      error: { code: "DB_ERROR", message: "Error al guardar el contenido. Intentá de nuevo." },
    };
  }

  revalidatePath("/[slug]", "layout");
  return { success: true };
}

/** Merge business overrides into existing customization. */
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

  const current = (store.customization ?? { templateId: "tech-premium" }) as StoreCustomization;
  const updated: StoreCustomization = {
    ...current,
    business: {
      ...(current.business ?? {}),
      ...parsed.data,
    },
  };

  const supabase = await createClient();
  const { error } = await supabase
    .from("stores")
    .update({ customization: updated as Record<string, unknown> })
    .eq("id", store.id);

  if (error) {
    return {
      success: false,
      error: { code: "DB_ERROR", message: "Error al guardar el negocio. Intentá de nuevo." },
    };
  }

  revalidatePath("/[slug]", "layout");
  return { success: true };
}

/** Generic section updater for dynamic schema tabs (e.g. layout, content subsections). */
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

  const current = (store.customization ?? { templateId: "tech-premium" }) as StoreCustomization;
  const currentSection = (current[section] ?? {}) as Record<string, unknown>;

  const updated: StoreCustomization = {
    ...current,
    [section]: {
      ...currentSection,
      ...data,
    },
  };

  // Validate the full blob after merge
  const parsed = storeCustomizationSchema.safeParse(updated);
  if (!parsed.success) {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Datos inválidos: " + parsed.error.issues[0]?.message,
      },
    };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("stores")
    .update({ customization: parsed.data as Record<string, unknown> })
    .eq("id", store.id);

  if (error) {
    return {
      success: false,
      error: { code: "DB_ERROR", message: "Error al guardar los cambios. Intentá de nuevo." },
    };
  }

  revalidatePath("/[slug]", "layout");
  return { success: true };
}
