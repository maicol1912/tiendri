// Fetch a published store by its public slug.
// Uses the server Supabase client — RLS ensures only stores with
// onboarding_completed = true are visible to anonymous users.
// The explicit onboarding_completed filter below is defensive coding:
// it makes the intent clear even though RLS already enforces it at the DB level.
//
// KNOWN QUIRK: TypeScript's generic inference for Supabase queries with complex
// JSONB columns (like `customization: Json`) can collapse to `never` when
// you access properties on the query result directly. The explicit `as StoreRow`
// cast breaks this deadlock without sacrificing type safety — the cast
// target IS the correct type, and the Supabase select("*") returns a StoreRow.

import { cache } from "react";
import { createClient } from "@/infrastructure/supabase/server";
import type { StoreRow, StoreAppearanceRow } from "@/infrastructure/database.types";
import type { StoreCustomization } from "@/types/templates";

// Primary shape returned to Server Components and the storefront layout.
// Includes the joined store_appearance row (null when no appearance is configured yet).
export interface StoreWithAppearance extends Omit<StoreRow, "customization"> {
  store_appearance: StoreAppearanceRow | null;
  customization?: unknown; // legacy field — kept for backward compat; use appearanceToCustomization()
}

/**
 * Converts a `store_appearance` row into a `StoreCustomization` object suitable
 * for passing to `resolveTemplateConfig`. Returns `undefined` when appearance is null
 * so callers can fall back to the legacy JSONB path gracefully.
 *
 * NOTE: Does NOT change the signature of `resolveTemplateConfig` — this is a bridge
 * that lives at the data-fetching boundary.
 */
export function appearanceToCustomization(
  appearance: StoreAppearanceRow | null,
  templateId: string,
): StoreCustomization | undefined {
  if (!appearance) return undefined;

  return {
    templateId,
    theme: {
      colors: (appearance.theme as any)?.colors,
      radius: (appearance.theme as any)?.radius,
      fontPair: appearance.font_pair ?? undefined,
      paletteId: appearance.palette_id ?? undefined,
      typography: (appearance.theme as any)?.typography,
    },
    layout: {
      grid: (appearance.layout as any)?.grid,
      layout: (appearance.layout as any)?.layout,
      sections: (appearance.sections as any) ?? undefined,
      density: (appearance.layout as any)?.density,
      structuralVariants: (appearance.variants as any) ?? undefined,
    },
    branding: (appearance.branding as any) ?? undefined,
    content: (appearance.content as any) ?? undefined,
    business: undefined, // business lives on stores.business_info — not in store_appearance
  };
}

/**
 * Returns the store row (with joined appearance) for a given slug,
 * or null if not found / not published.
 * Only stores where `onboarding_completed = true` are returned — draft stores
 * resolve to null and the caller should render a 404.
 */
export const getStoreBySlug = cache(async function getStoreBySlug(
  slug: string,
): Promise<StoreWithAppearance | null> {
  const supabase = await createClient();

  const result = await supabase
    .from("stores")
    .select("*, store_appearance(*)")
    .eq("slug", slug)
    .eq("onboarding_completed", true)
    .single();

  // PGRST116 = "no rows returned" — slug not found or draft store blocked by RLS.
  // Any other error is unexpected — surface it so the caller can log/handle it.
  if (result.error) {
    if (result.error.code === "PGRST116") return null;
    throw new Error(
      `getStoreBySlug failed for slug "${slug}": ${result.error.message}`,
    );
  }

  // Explicit cast needed: TypeScript's type inference for Supabase queries with
  // recursive Json columns and nested relations collapses to `never` without this.
  const row = result.data as StoreRow & {
    store_appearance: StoreAppearanceRow | StoreAppearanceRow[] | null;
  };

  if (!row) return null;

  // Supabase returns one-to-one relations as an object, but defensively handle
  // the array case (e.g. if the query shape changes or the client version wraps it).
  const appearance = Array.isArray(row.store_appearance)
    ? (row.store_appearance[0] ?? null)
    : (row.store_appearance ?? null);

  return {
    ...row,
    store_appearance: appearance,
    // Legacy field preserved so any code still reading `store.customization` doesn't break.
    // New code should call `appearanceToCustomization(store.store_appearance, store.template_id)`.
    customization: appearance
      ? appearanceToCustomization(appearance, row.template_id)
      : row.customization != null
        ? (row.customization as unknown as StoreCustomization)
        : undefined,
  };
});
