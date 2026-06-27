// Storefront data loaders — query real Supabase data for a store's catalog.
// Follows the same pattern as getStoreBySlug.ts: server Supabase client + React cache().
//
// All four loaders accept a storeId (UUID) and return typed domain objects.
// The Supabase nested select `product_images(*)` returns a join result whose
// TypeScript type collapses to `never` without an explicit cast — hence the
// `as ProductImageRow[]` casts below (same pattern as getStoreBySlug.ts).

import { cache } from "react";
import { createClient } from "@/infrastructure/supabase/server";
import type { ProductImageRow } from "@/infrastructure/database.types";
import type { StorefrontProduct, StorefrontCategory } from "@/types/domain/store";

// ── Internal helper ────────────────────────────────────────────────────────────

type ProductRowWithImages = {
  id: string;
  name: string;
  slug: string;
  subtitle: string | null;
  description: string;
  price: number;
  compare_at_price: number | null;
  available: boolean;
  category_id: string;
  subcategory_id: string | null;
  specs: unknown;
  product_images: ProductImageRow[] | null;
};

function mapProduct(p: ProductRowWithImages): StorefrontProduct {
  const images = (p.product_images ?? [])
    .slice()
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((img) => ({ url: img.url, sort_order: img.sort_order }));

  const specs = Array.isArray(p.specs) ? (p.specs as string[]) : undefined;

  return {
    id: p.id,
    name: p.name,
    subtitle: p.subtitle ?? undefined,
    slug: p.slug,
    description: p.description,
    price: p.price,
    originalPrice: p.compare_at_price ?? undefined,
    inStock: p.available,
    categoryId: p.category_id,
    subcategoryId: p.subcategory_id ?? undefined,
    images,
    specs,
    rating: undefined,
  };
}

/**
 * Resolves media_* IDs to CDN URLs for the storefront.
 *
 * The dashboard version (media.ts resolveMediaUrls) calls getStoreId() internally,
 * which requires an authenticated session. The storefront is public, so we
 * take storeId explicitly instead.
 */
async function resolveMediaUrlsForStore(
  mediaIds: string[],
  storeId: string
): Promise<Record<string, string>> {
  if (mediaIds.length === 0) return {};

  const supabase = await createClient();
  const rawIds = mediaIds.map((id) => (id.startsWith("media_") ? id.slice(6) : id));

  const { data, error } = await supabase
    .from("media_assets")
    .select("id, url")
    .in("id", rawIds)
    .eq("store_id", storeId);

  if (error || !data) return {};

  const result: Record<string, string> = {};
  for (const row of data) {
    result[`media_${row.id}`] = row.url;
  }
  return result;
}

/**
 * Resolves media_* IDs in a product's images array in place.
 * Shared by all three product loaders.
 */
async function resolveProductImages(
  products: StorefrontProduct[],
  storeId: string
): Promise<void> {
  const mediaIds = products
    .flatMap((p) => p.images)
    .map((img) => img.url)
    .filter((url): url is string => !!url && url.startsWith("media_"));

  if (mediaIds.length === 0) return;

  const urlMap = await resolveMediaUrlsForStore(mediaIds, storeId);
  for (const product of products) {
    for (const img of product.images) {
      if (img.url && urlMap[img.url]) {
        img.url = urlMap[img.url];
      }
    }
  }
}

// ── Exported loaders ───────────────────────────────────────────────────────────

/**
 * Returns all available products for a store, ordered by sort_order.
 */
export const getStorefrontProducts = cache(async (storeId: string): Promise<StorefrontProduct[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*, product_images(*)")
    .eq("store_id", storeId)
    .eq("available", true)
    .order("sort_order", { ascending: true });

  if (error || !data) return [];

  const products = (data as unknown as ProductRowWithImages[]).map(mapProduct);
  await resolveProductImages(products, storeId);
  return products;
});

/**
 * Returns all categories for a store, ordered by sort_order.
 */
export const getStorefrontCategories = cache(async (storeId: string): Promise<StorefrontCategory[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("store_id", storeId)
    .order("sort_order", { ascending: true });

  if (error || !data) return [];

  const categories: StorefrontCategory[] = data.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    icon: c.icon ?? "Tag",
    image: c.image ?? undefined,
  }));

  const mediaIds = categories
    .map((c) => c.image)
    .filter((id): id is string => !!id && id.startsWith("media_"));

  if (mediaIds.length > 0) {
    const urlMap = await resolveMediaUrlsForStore(mediaIds, storeId);
    for (const cat of categories) {
      if (cat.image && urlMap[cat.image]) {
        cat.image = urlMap[cat.image];
      }
    }
  }

  return categories;
});

/**
 * Returns products flagged as best sellers for a store, up to `limit`.
 */
export const getStorefrontBestSellers = cache(
  async (storeId: string, limit = 8): Promise<StorefrontProduct[]> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("products")
      .select("*, product_images(*)")
      .eq("store_id", storeId)
      .eq("available", true)
      .eq("is_best_seller", true)
      .order("sort_order", { ascending: true })
      .limit(limit);

    if (error || !data) return [];

    const products = (data as unknown as ProductRowWithImages[]).map(mapProduct);
    await resolveProductImages(products, storeId);
    return products;
  },
);

/**
 * Returns products flagged as featured (popular) for a store, up to `limit`.
 */
export const getStorefrontPopularProducts = cache(
  async (storeId: string, limit = 8): Promise<StorefrontProduct[]> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("products")
      .select("*, product_images(*)")
      .eq("store_id", storeId)
      .eq("available", true)
      .eq("featured", true)
      .order("sort_order", { ascending: true })
      .limit(limit);

    if (error || !data) return [];

    const products = (data as unknown as ProductRowWithImages[]).map(mapProduct);
    await resolveProductImages(products, storeId);
    return products;
  },
);

/**
 * Returns products that have a compare_at_price (i.e., are on discount), up to `limit`.
 */
export const getStorefrontDiscountProducts = cache(
  async (storeId: string, limit = 8): Promise<StorefrontProduct[]> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("products")
      .select("*, product_images(*)")
      .eq("store_id", storeId)
      .eq("available", true)
      .not("compare_at_price", "is", null)
      .order("sort_order", { ascending: true })
      .limit(limit);

    if (error || !data) return [];

    const products = (data as unknown as ProductRowWithImages[]).map(mapProduct);
    await resolveProductImages(products, storeId);
    return products;
  },
);
