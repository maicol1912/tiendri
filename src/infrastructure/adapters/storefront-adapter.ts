/**
 * Storefront Adapter
 *
 * Pure functions that map Supabase database rows into the domain types
 * that storefront templates consume. No side effects, no DB calls.
 *
 * DB rows  -->  StorefrontProduct, Category, StoreInfo, StorefrontVariantGroup
 */

import type { Database, Json } from '@/infrastructure/database.types';
import type {
  Category,
  ColorOption,
  ProductImage,
  StoreInfo,
  StorefrontProduct,
  StorefrontVariantGroup,
  StorefrontVariantOption,
} from '@/types/domain/store';

// ── DB Row type aliases ─────────────────────────────────────────────────────

export type ProductRow =
  Database['public']['Tables']['products']['Row'];

export type ProductImageRow =
  Database['public']['Tables']['product_images']['Row'];

export type ProductVariantRow =
  Database['public']['Tables']['product_variants']['Row'];

export type CategoryRow =
  Database['public']['Tables']['categories']['Row'];

export type SubcategoryRow =
  Database['public']['Tables']['subcategories']['Row'];

export type StoreRow =
  Database['public']['Tables']['stores']['Row'];

export type StoreAppearanceRow =
  Database['public']['Tables']['store_appearance']['Row'];

// ── Composite types for JOINed queries ──────────────────────────────────────

/** Product row with its related images and variants already fetched. */
export interface ProductWithRelations {
  product: ProductRow;
  images: ProductImageRow[];
  variants: ProductVariantRow[];
}

// ── Helpers ─────────────────────────────────────────────────────────────────

/** Safely cast a Json value to string[] (for specs, tags, etc.). */
function toStringArray(value: Json | undefined | null): string[] {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.filter((v): v is string => typeof v === 'string');
  }
  return [];
}

/** Safely cast a Json value to a record. */
function toRecord(
  value: Json | undefined | null,
): Record<string, Json | undefined> {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, Json | undefined>;
  }
  return {};
}

/** Extract a string field from a Json record, returning undefined if missing. */
function jsonString(
  obj: Record<string, Json | undefined>,
  key: string,
): string | undefined {
  const v = obj[key];
  return typeof v === 'string' ? v : undefined;
}

// ── Product images ──────────────────────────────────────────────────────────

/** Map DB product_images rows to the template ProductImage type. */
export function toProductImages(rows: ProductImageRow[]): ProductImage[] {
  return [...rows]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((row) => ({
      url: row.url,
      sort_order: row.sort_order,
    }));
}

// ── Product variants ────────────────────────────────────────────────────────

/** Human-readable label for each variant type. */
const VARIANT_TYPE_LABELS: Record<string, string> = {
  color: 'Color',
  size: 'Talla',
  storage: 'Almacenamiento',
  option: 'Opciones',
};

/**
 * Resolve the group label for a variant type.
 * Falls back to capitalising the raw type value for unknown types.
 */
function variantTypeLabel(type: string): string {
  return VARIANT_TYPE_LABELS[type] ?? type.charAt(0).toUpperCase() + type.slice(1);
}

/**
 * Compare two variants for sort-within-group ordering.
 * Uses `metadata.order` (number) when present, otherwise falls back to `name`.
 */
function compareVariants(a: ProductVariantRow, b: ProductVariantRow): number {
  const metaA = toRecord(a.metadata);
  const metaB = toRecord(b.metadata);
  const orderA = typeof metaA['order'] === 'number' ? (metaA['order'] as number) : undefined;
  const orderB = typeof metaB['order'] === 'number' ? (metaB['order'] as number) : undefined;

  if (orderA !== undefined && orderB !== undefined) return orderA - orderB;
  if (orderA !== undefined) return -1;
  if (orderB !== undefined) return 1;
  return a.name.localeCompare(b.name);
}

/**
 * Map DB product_variants rows into StorefrontVariantGroups, one per `type`.
 *
 * Each variant carries a `type` column ('color', 'size', 'storage', 'option')
 * and a `metadata` JSONB payload with type-specific fields.
 * Variants within each group are sorted by `metadata.order` when present,
 * otherwise alphabetically by name.
 */
export function toVariantGroups(
  rows: ProductVariantRow[],
): StorefrontVariantGroup[] {
  if (rows.length === 0) return [];

  // Group variants by type, preserving insertion order of first occurrence
  const grouped = new Map<string, ProductVariantRow[]>();
  for (const row of rows) {
    const type = row.type ?? 'option';
    if (!grouped.has(type)) grouped.set(type, []);
    grouped.get(type)!.push(row);
  }

  return Array.from(grouped.entries()).map(([type, groupRows]) => {
    const sorted = [...groupRows].sort(compareVariants);

    const options: StorefrontVariantOption[] = sorted.map((row) => ({
      id: row.id,
      label: row.name,
      priceModifier: row.price_modifier !== 0 ? row.price_modifier : undefined,
      available: true,
    }));

    const resolvedType = (['color', 'size', 'storage', 'custom'].includes(type)
      ? type
      : 'custom') as StorefrontVariantGroup['type'];

    return {
      id: type,
      label: variantTypeLabel(type),
      type: resolvedType,
      options,
    };
  });
}

/**
 * Extract ColorOption[] from variants where type = 'color'.
 * Uses `metadata.hex` for the color value and `metadata.label` (or `name`)
 * for the human-readable label.
 */
export function toColorOptions(rows: ProductVariantRow[]): ColorOption[] {
  return rows
    .filter((row) => row.type === 'color')
    .sort(compareVariants)
    .map((row) => {
      const meta = toRecord(row.metadata);
      return {
        id: row.id,
        label: (typeof meta['label'] === 'string' ? meta['label'] : undefined) ?? row.name,
        hex: (typeof meta['hex'] === 'string' ? meta['hex'] : undefined) ?? '#000000',
      };
    });
}

// ── Product mapping ─────────────────────────────────────────────────────────

/**
 * Map a single DB product row (+ its related images and variants)
 * into the StorefrontProduct type that templates consume.
 */
export function toStorefrontProduct(
  product: ProductRow,
  images: ProductImageRow[],
  variants: ProductVariantRow[],
): StorefrontProduct {
  const sortedImages = toProductImages(images);
  const variantGroups = toVariantGroups(variants);
  const colorOptions = toColorOptions(variants);

  // specs can be Json — coerce to string[]
  const specs = toStringArray(product.specs);

  return {
    id: product.id,
    name: product.name,
    subtitle: product.subtitle ?? undefined,
    slug: product.slug,
    price: product.price,
    originalPrice: product.compare_at_price,
    images: sortedImages,
    description: product.description || undefined,
    specs: specs.length > 0 ? specs : undefined,
    // No ratings system yet — templates handle undefined gracefully
    rating: undefined,
    reviewCount: 0,
    colors: colorOptions.length > 0 ? colorOptions : undefined,
    variants: variantGroups.length > 0 ? variantGroups : undefined,
    inStock: product.available,
    categoryId: product.category_id,
    subcategoryId: product.subcategory_id ?? undefined,
  };
}

/**
 * Batch-map an array of products with their relations into StorefrontProducts.
 * Sorts by sort_order (ascending) then by created_at (newest first).
 */
export function toStorefrontProducts(
  items: ProductWithRelations[],
): StorefrontProduct[] {
  return items
    .sort(
      (a, b) =>
        a.product.sort_order - b.product.sort_order ||
        new Date(b.product.created_at).getTime() -
          new Date(a.product.created_at).getTime(),
    )
    .map(({ product, images, variants }) =>
      toStorefrontProduct(product, images, variants),
    );
}

/**
 * Filter helpers — common predicates templates use on product lists.
 */
export function filterFeatured(
  products: StorefrontProduct[],
): StorefrontProduct[] {
  // We lose the `featured` flag after mapping, so accept the raw items
  // and filter before mapping, OR use this with the original rows.
  return products;
}

export function filterFeaturedFromRows(
  items: ProductWithRelations[],
): ProductWithRelations[] {
  return items.filter((i) => i.product.featured);
}

export function filterBestSellersFromRows(
  items: ProductWithRelations[],
): ProductWithRelations[] {
  return items.filter((i) => i.product.is_best_seller);
}

export function filterByCategoryFromRows(
  items: ProductWithRelations[],
  categoryId: string,
): ProductWithRelations[] {
  return items.filter((i) => i.product.category_id === categoryId);
}

// ── Category mapping ────────────────────────────────────────────────────────

/** Map a DB categories row into the domain Category type. */
export function toCategory(category: CategoryRow): Category {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    icon: category.icon,
    image: category.image ?? undefined,
  };
}

/** Batch-map categories, sorted by sort_order. */
export function toCategories(rows: CategoryRow[]): Category[] {
  return [...rows]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(toCategory);
}

// ── Store mapping ───────────────────────────────────────────────────────────

/**
 * Map a DB stores row (+ optional store_appearance) into the
 * StoreInfo type that templates receive as props.
 */
export function toStoreInfo(
  store: StoreRow,
  appearance?: StoreAppearanceRow | null,
): StoreInfo {
  // business_info is a Json blob with whatsapp, hours, etc.
  const bizInfo = toRecord(store.business_info);

  // social_media is a Json blob: { instagram?: string, ... }
  const socialRaw = toRecord(store.social_media);

  // branding from store_appearance contains logo
  const branding = appearance ? toRecord(appearance.branding) : {};

  // Payment methods come as an enum array from the DB
  const paymentMethods: string[] = Array.isArray(store.payment_methods)
    ? store.payment_methods
    : [];

  return {
    name: store.name,
    slug: store.slug,
    logo: (jsonString(branding, 'logo') as string) ?? null,
    description: store.description ?? undefined,
    whatsapp: jsonString(bizInfo, 'whatsapp'),
    hours: jsonString(bizInfo, 'hours'),
    paymentMethods: paymentMethods.length > 0 ? paymentMethods : undefined,
    shippingInfo: jsonString(bizInfo, 'shipping_info'),
    social_links: {
      instagram: jsonString(socialRaw, 'instagram'),
      facebook: jsonString(socialRaw, 'facebook'),
      tiktok: jsonString(socialRaw, 'tiktok'),
      twitter: jsonString(socialRaw, 'twitter'),
      youtube: jsonString(socialRaw, 'youtube'),
    },
  };
}
