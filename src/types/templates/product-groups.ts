/** Display mode for product groups — per-store, not per-section. */
export type ProductGroupDisplayMode = 'tabs' | 'stacked';

/** Optional banner image for a product group. */
export interface ProductGroupBanner {
  /** Supabase Storage URL or direct URL. */
  url: string;
  /** Alt text for accessibility. */
  alt?: string;
  /** Aspect ratio hint — used only in stacked mode banners. */
  aspectRatio?: 'wide' | 'standard';
}

/** Per-group layout overrides. All fields optional — fall back to store/template defaults. */
export interface ProductGroupLayout {
  /** Grid columns on mobile. Range: 1–2. */
  columnsMobile?: 1 | 2;
  /** Grid columns on desktop. Range: 2–5. */
  columnsDesktop?: 2 | 3 | 4 | 5;
  /** Max products to show. Range: 1–100. If unset, shows all productIds. */
  productsLimit?: number;
}

/** A single product group — merchant-curated collection of products. */
export interface ProductGroup {
  /** Stable unique identifier (UUID v4). */
  id: string;
  /** Display name — shown as tab label or section heading. Max 60 chars. */
  name: string;
  /** Curated product IDs in display order. Empty array = hidden group. */
  productIds: string[];
  /** Optional banner image — shown above the product grid in stacked mode. */
  banner?: ProductGroupBanner;
  /** Per-group layout overrides. */
  layout?: ProductGroupLayout;
  /** Sort position — groups render in ascending sortOrder. */
  sortOrder: number;
}

/** Root configuration object stored in ContentConfig.productGroups. */
export interface ProductGroupsConfig {
  /** Display mode — tabs or stacked. Per-store. */
  displayMode: ProductGroupDisplayMode;
  /** Ordered list of product groups. No limit on count in MVP. */
  groups: ProductGroup[];
}
