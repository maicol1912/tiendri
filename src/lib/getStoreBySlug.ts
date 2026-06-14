// Fetch a published store by its public slug.
// Uses the server Supabase client — RLS ensures only stores with
// onboarding_completed = true are visible to anonymous users.
// The explicit onboarding_completed filter below is defensive coding:
// it makes the intent clear even though RLS already enforces it at the DB level.
//
// KNOWN QUIRK: TypeScript's generic inference for Supabase queries with complex
// JSONB columns (like `customization: Json`) can collapse to `never` when
// you access properties on the query result directly. The explicit `as StoreRow`
// cast on line 44 breaks this deadlock without sacrificing type safety — the cast
// target IS the correct type, and the Supabase select("*") returns a StoreRow.

import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { StoreRow } from "@/types/database.types";
import type { StoreCustomization } from "@/types/templates";

// Public shape returned to Server Components and the storefront layout.
// Replaces the generic `customization: Json` with the properly-typed
// `StoreCustomization | null` so callers don't need to cast manually.
export interface StoreWithCustomization extends Omit<StoreRow, "customization"> {
  customization: StoreCustomization | null;
}

/**
 * Returns the store row for a given slug, or null if not found / not published.
 * Only stores where `onboarding_completed = true` are returned — draft stores
 * resolve to null and the caller should render a 404.
 */
export const getStoreBySlug = cache(async function getStoreBySlug(
  slug: string
): Promise<StoreWithCustomization | null> {
  const supabase = await createClient();

  const result = await supabase
    .from("stores")
    .select("*")
    .eq("slug", slug)
    .eq("onboarding_completed", true)
    .single();

  // PGRST116 = "no rows returned" — slug not found or draft store blocked by RLS.
  // Any other error is unexpected — surface it so the caller can log/handle it.
  if (result.error) {
    if (result.error.code === "PGRST116") return null;
    throw new Error(
      `getStoreBySlug failed for slug "${slug}": ${result.error.message}`
    );
  }

  // Explicit cast needed: TypeScript's type inference for Supabase queries with
  // recursive Json columns collapses to `never` without this annotation.
  // The cast is safe — select("*") always returns the full StoreRow.
  const row = result.data as StoreRow;

  if (!row) return null;

  // Cast the JSONB customization column from the generic Json type to the
  // typed StoreCustomization. The JSONB is either a serialized
  // StoreCustomization object or null.
  const customization =
    row.customization != null
      ? (row.customization as unknown as StoreCustomization)
      : null;

  return {
    ...row,
    customization,
  };
});
