// Media URL resolver for the public storefront.
// Plain async functions — no 'use server' or 'use client' directive.
// Intended to be called from Server Components / RSC layouts.
// Uses the anon Supabase client (RLS ensures only published store assets are visible).

import { createClient } from "@/infrastructure/supabase/server";

/**
 * Recursively extract all media_xxx tokens from an object tree.
 * Returns a deduplicated array of token strings.
 */
export function extractMediaTokens(obj: unknown): string[] {
  const tokens: string[] = [];

  function walk(value: unknown): void {
    if (typeof value === "string" && value.startsWith("media_")) {
      tokens.push(value);
    } else if (Array.isArray(value)) {
      value.forEach(walk);
    } else if (value !== null && typeof value === "object") {
      Object.values(value as Record<string, unknown>).forEach(walk);
    }
  }

  walk(obj);
  return [...new Set(tokens)]; // dedupe
}

/**
 * Resolve media_xxx tokens to CDN URLs for the public storefront.
 * Uses the anon Supabase client — no auth required.
 *
 * @param storeId  - The store's UUID (used to scope the DB query).
 * @param mediaIds - Array of media_xxx token strings to resolve.
 * @returns A Map from token string to resolved URL.
 *          Tokens not found in the DB are omitted from the map.
 */
export async function resolveMediaUrlsForStorefront(
  storeId: string,
  mediaIds: string[],
): Promise<Map<string, string>> {
  const urlMap = new Map<string, string>();
  if (mediaIds.length === 0) return urlMap;

  const supabase = await createClient();

  // Cast through `any` because `media_assets` is not yet reflected in the
  // generated database.types.ts. This mirrors the pattern used across the
  // codebase for tables that are ahead of the local type snapshot.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // Strip the "media_" prefix to get plain UUIDs for the DB query,
  // but keep a reverse map so we can key the result by the original token.
  const uuidToToken = new Map<string, string>();
  const uuids: string[] = [];
  for (const token of mediaIds) {
    const uuid = token.startsWith("media_") ? token.slice(6) : token;
    uuids.push(uuid);
    uuidToToken.set(uuid, token);
  }

  const { data, error } = await (supabase as any)
    .from("media_assets")
    .select("id, url")
    .eq("store_id", storeId)
    .in("id", uuids);

  if (error || !data) return urlMap;

  for (const row of data as Array<{ id: string; url: string }>) {
    const token = uuidToToken.get(row.id) ?? row.id;
    urlMap.set(token, row.url);
  }

  return urlMap;
}
