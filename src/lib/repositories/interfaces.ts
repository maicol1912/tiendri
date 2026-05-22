// Repository interfaces — the contract every implementation must satisfy.
// All methods are async for Supabase migration compatibility.
// Mutations return ActionResult<T> following tiendri-rules.md §3.1.

import type {
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
  Subcategory,
  CreateSubcategoryInput,
  UpdateSubcategoryInput,
  Product,
  CreateProductInput,
  UpdateProductInput,
  ProductFilters,
  ActionResult,
  MediaAsset,
  CreateMediaAssetInput,
  UpdateMediaAssetInput,
  MediaLibraryStats,
  MediaSearchFilters,
} from '@/types/domain';

// ── Category ──────────────────────────────────────────────────────────────────

export interface CategoryRepository {
  list(storeId: string): Promise<Category[]>;
  getById(storeId: string, id: string): Promise<Category | null>;
  create(storeId: string, input: CreateCategoryInput): Promise<ActionResult<Category>>;
  update(storeId: string, id: string, input: UpdateCategoryInput): Promise<ActionResult<Category>>;
  delete(storeId: string, id: string): Promise<ActionResult<void>>;
  /** Re-order categories by providing an ordered list of IDs */
  reorder(storeId: string, orderedIds: string[]): Promise<ActionResult<void>>;
  count(storeId: string): Promise<number>;
}

// ── Subcategory ───────────────────────────────────────────────────────────────

export interface SubcategoryRepository {
  listByCategory(storeId: string, categoryId: string): Promise<Subcategory[]>;
  getById(storeId: string, id: string): Promise<Subcategory | null>;
  create(storeId: string, input: CreateSubcategoryInput): Promise<ActionResult<Subcategory>>;
  update(
    storeId: string,
    id: string,
    input: UpdateSubcategoryInput
  ): Promise<ActionResult<Subcategory>>;
  /**
   * Delete a subcategory.
   * orphanAction='delete' removes orphaned products.
   * orphanAction='move' reassigns them to targetSubcategoryId.
   */
  delete(
    storeId: string,
    id: string,
    orphanAction: 'move' | 'delete',
    targetSubcategoryId?: string
  ): Promise<ActionResult<void>>;
  /** Re-order subcategories within a category */
  reorder(
    storeId: string,
    categoryId: string,
    orderedIds: string[]
  ): Promise<ActionResult<void>>;
  /** Cascade delete — called when a category is deleted */
  deleteAllByCategory(storeId: string, categoryId: string): Promise<void>;
}

// ── Product ───────────────────────────────────────────────────────────────────

export interface ProductRepository {
  list(storeId: string, filters?: ProductFilters): Promise<Product[]>;
  getById(storeId: string, id: string): Promise<Product | null>;
  getBySlug(storeId: string, slug: string): Promise<Product | null>;
  create(storeId: string, input: CreateProductInput): Promise<ActionResult<Product>>;
  update(storeId: string, id: string, input: UpdateProductInput): Promise<ActionResult<Product>>;
  delete(storeId: string, id: string): Promise<ActionResult<void>>;
  /** Re-order products by providing an ordered list of IDs */
  reorder(storeId: string, orderedIds: string[]): Promise<ActionResult<void>>;
  toggleAvailable(storeId: string, id: string): Promise<ActionResult<Product>>;
  toggleFeatured(storeId: string, id: string): Promise<ActionResult<Product>>;
  count(storeId: string): Promise<number>;
  countByCategory(storeId: string, categoryId: string): Promise<number>;
  /** Called when catalog_mode switches nested→simple: nullify all subcategory_id */
  switchCatalogModeToSimple(storeId: string): Promise<void>;
}

// ── Media ─────────────────────────────────────────────────────────────────────

export interface MediaRepository {
  /** Upload a new asset: runs canvas→WebP pipeline, enforces limits, stores in localStorage. */
  upload(storeId: string, input: CreateMediaAssetInput): Promise<ActionResult<MediaAsset>>;
  /** List all assets for the store, sorted by created_at DESC. */
  list(storeId: string): Promise<MediaAsset[]>;
  /** Filter assets by context, tags (intersection), and/or query (filename + alt). */
  search(storeId: string, filters: MediaSearchFilters): Promise<MediaAsset[]>;
  /** Return a single asset or null if not found. */
  getById(storeId: string, id: string): Promise<MediaAsset | null>;
  /** Update mutable fields (alt, tags). Immutable fields are unchanged. */
  updateAlt(storeId: string, id: string, input: UpdateMediaAssetInput): Promise<ActionResult<MediaAsset>>;
  /** Remove an asset. Returns MEDIA_NOT_FOUND if id is unknown. */
  delete(storeId: string, id: string): Promise<ActionResult<void>>;
  /** Compute current usage stats for the store. */
  getStats(storeId: string): Promise<MediaLibraryStats>;
  /** Resolve a single media ID to its stored URL, or null if not found. */
  resolveUrl(storeId: string, mediaId: string): Promise<string | null>;
  /** Resolve multiple media IDs to a Map<id, url>. Missing IDs are omitted. */
  resolveUrls(storeId: string, mediaIds: string[]): Promise<Map<string, string>>;
}

// ── Store ─────────────────────────────────────────────────────────────────────

export interface StoreMeta {
  id: string;
  name: string;
  slug: string;
  catalog_mode: 'simple' | 'nested';
  currency: string;
}

export interface StoreRepository {
  get(storeId: string): Promise<StoreMeta | null>;
  /** Handles cascade for nested→simple: delete subcategories, nullify subcategory_id */
  updateCatalogMode(
    storeId: string,
    newMode: 'simple' | 'nested'
  ): Promise<ActionResult<StoreMeta>>;
}
