# Backend — Tiendri V2

## Vision General

SaaS e-commerce para comerciantes colombianos. Backend construido sobre Supabase (PostgreSQL + Storage + RLS). Arquitectura: Server Actions (Next.js App Router) -> Supabase server client.

### Arquitectura

```
┌─────────────────────────────────────────────────┐
│  Client (React hooks)                           │
│  useCategories · useProducts · useMediaLibrary  │
└──────────────────┬──────────────────────────────┘
                   │ 'use server'
┌──────────────────▼──────────────────────────────┐
│  Server Actions                                 │
│  _actions/store · categories · subcategories    │
│  _actions/products · media                      │
└──────────────────┬──────────────────────────────┘
                   │ @supabase/ssr
┌──────────────────▼──────────────────────────────┐
│  Supabase                                       │
│  PostgreSQL (RLS) · Storage (CDN) · Auth        │
└─────────────────────────────────────────────────┘
```

---

## Base de Datos

### Modelo de Datos (16 tablas)

#### Reference Tables

**templates**

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| name | TEXT | NOT NULL |
| slug | TEXT | UNIQUE, NOT NULL |
| code | TEXT | NOT NULL |
| industry | TEXT[] | |
| default_colors | JSONB | |
| default_variants | JSONB | |
| default_sections | JSONB | |
| palettes | JSONB | |
| metadata | JSONB | |

**plans**

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| name | TEXT | NOT NULL |
| slug | TEXT | UNIQUE, NOT NULL |
| code | TEXT | NOT NULL |
| price | INT | NOT NULL |
| product_limit | INT | nullable |
| storage_limit | INT | NOT NULL |
| category_limit | INT | NOT NULL |
| media_limit | INT | NOT NULL |
| features | JSONB | |

**currencies**

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| code | TEXT | UNIQUE, NOT NULL |
| name | TEXT | NOT NULL |
| symbol | TEXT | NOT NULL |
| decimal_places | INT | NOT NULL |
| locale | TEXT | NOT NULL |

#### Core Tables

**stores**

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| owner_id | UUID | FK auth.users |
| name | TEXT | NOT NULL |
| slug | TEXT | UNIQUE, NOT NULL |
| description | TEXT | |
| template_id | UUID | FK templates |
| plan_id | UUID | FK plans |
| currency_id | UUID | FK currencies |
| catalog_mode | catalog_mode enum | NOT NULL |
| palette_id | TEXT | |
| payment_methods | payment_method[] | |
| social_media | JSONB | |
| business_info | JSONB | |
| onboarding_completed | BOOLEAN | DEFAULT false |
| created_at | TIMESTAMPTZ | DEFAULT now() |
| updated_at | TIMESTAMPTZ | DEFAULT now() |

**store_appearance**

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| store_id | UUID | UNIQUE FK stores |
| palette_id | TEXT | |
| font_pair | TEXT | |
| theme | JSONB | |
| layout | JSONB | |
| variants | JSONB | |
| sections | JSONB | |
| content | JSONB | |
| branding | JSONB | |
| version | INT | DEFAULT 1 |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

**store_infrastructure**

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| store_id | UUID | UNIQUE FK stores |
| custom_domain | TEXT | |
| domain_verified | BOOLEAN | DEFAULT false |
| domain_dns_records | JSONB | |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

**categories**

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| store_id | UUID | FK stores |
| name | TEXT | NOT NULL |
| slug | TEXT | NOT NULL |
| description | TEXT | |
| image | TEXT | |
| icon | TEXT | |
| sort_order | INT | DEFAULT 0 |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

UNIQUE(store_id, slug)

**subcategories**

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| store_id | UUID | FK stores |
| category_id | UUID | FK categories ON DELETE CASCADE |
| name | TEXT | NOT NULL |
| slug | TEXT | NOT NULL |
| description | TEXT | |
| image | TEXT | |
| sort_order | INT | DEFAULT 0 |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

UNIQUE(category_id, slug)

**products**

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| store_id | UUID | FK stores |
| category_id | UUID | FK categories ON DELETE RESTRICT |
| subcategory_id | UUID | FK subcategories ON DELETE SET NULL |
| name | TEXT | NOT NULL |
| slug | TEXT | NOT NULL |
| subtitle | TEXT | |
| description | TEXT | max 300 chars |
| price | INT | NOT NULL |
| compare_at_price | INT | CHECK > price |
| tags | TEXT[] | |
| specs | JSONB | |
| stock | INT | nullable |
| available | BOOLEAN | DEFAULT true |
| featured | BOOLEAN | DEFAULT false |
| is_best_seller | BOOLEAN | DEFAULT false |
| search_vector | tsvector | |
| sort_order | INT | DEFAULT 0 |
| image_url | TEXT | |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

UNIQUE(store_id, slug)

**product_images**

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| product_id | UUID | FK products ON DELETE CASCADE |
| store_id | UUID | FK stores |
| url | TEXT | NOT NULL |
| alt_text | TEXT | |
| sort_order | INT | DEFAULT 0 |
| created_at | TIMESTAMPTZ | |

Max 4 per product (enforced by trigger `enforce_max_product_images`).

**product_variants**

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| product_id | UUID | FK products ON DELETE CASCADE |
| name | TEXT | NOT NULL |
| price_modifier | INT | DEFAULT 0 |
| type | TEXT | DEFAULT 'option' |
| metadata | JSONB | DEFAULT '{}' |
| created_at | TIMESTAMPTZ | |

**offers**

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| store_id | UUID | FK stores |
| code | TEXT | |
| name | TEXT | NOT NULL |
| description | TEXT | |
| type | offer_type enum | NOT NULL |
| active | BOOLEAN | DEFAULT true |
| start_date | TIMESTAMPTZ | |
| end_date | TIMESTAMPTZ | |
| priority | INT | DEFAULT 0 |
| rules | JSONB | |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

**offer_items**

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| offer_id | UUID | FK offers |
| product_id | UUID | FK products, nullable |
| category_id | UUID | FK categories, nullable |
| quantity | INT | DEFAULT 1 |
| created_at | TIMESTAMPTZ | |

CHECK(product_id IS NOT NULL OR category_id IS NOT NULL)

**orders**

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| store_id | UUID | FK stores |
| customer | JSONB | NOT NULL |
| items | JSONB | NOT NULL |
| total | INT | NOT NULL |
| status | order_status enum | DEFAULT 'pending' |
| currency_id | UUID | FK currencies |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

**media_assets**

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| store_id | UUID | FK stores |
| filename | TEXT | NOT NULL |
| alt | TEXT | |
| url | TEXT | NOT NULL |
| mimetype | TEXT | NOT NULL |
| size | INT | NOT NULL |
| width | INT | |
| height | INT | |
| context | media_context enum | DEFAULT 'general' |
| tags | TEXT[] | |
| created_at | TIMESTAMPTZ | |

**store_pages**

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| store_id | UUID | FK stores |
| slug | TEXT | NOT NULL |
| title | TEXT | NOT NULL |
| content | JSONB | |
| published | BOOLEAN | DEFAULT false |
| seo | JSONB | |
| sort_order | INT | DEFAULT 0 |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

---

### Enums (14)

| Enum | Values |
|------|--------|
| `catalog_mode` | `'simple'`, `'nested'` |
| `order_status` | `'pending'`, `'confirmed'`, `'shipped'`, `'delivered'`, `'cancelled'` |
| `media_context` | `'product'`, `'banner'`, `'logo'`, `'category'`, `'general'` |
| `offer_type` | `'percentage'`, `'fixed_amount'`, `'bogo'`, `'free_shipping'`, `'combo'`, `'flash_sale'`, `'coupon'` |
| `payment_method` | `'nequi'`, `'daviplata'`, `'efectivo'`, `'transferencia'`, `'tarjeta'` |
| `variant_slot` | `'header'`, `'hero'`, `'categoryNav'`, `'productCard'`, `'footer'`, `'bottomNav'`, `'searchBar'` |
| `header_variant` | `'DEFAULT'`, `'GLASS'`, `'GREETING'`, `'GREETING_SIMPLE'`, `'MINIMAL'` |
| `hero_variant` | `'FULL_BLEED'`, `'CONTAINED'`, `'SPLIT'`, `'TEXT_ONLY'`, `'CAROUSEL'`, `'CARD_SPLIT'`, `'EDITORIAL'`, `'PROMO_STRIP'`, `'PROMO_CARD'` |
| `category_nav_variant` | `'CHIPS'`, `'GRID'`, `'HORIZONTAL_SCROLL'`, `'TABS'`, `'COLUMNAR'` |
| `product_card_variant` | `'BELOW_IMAGE'`, `'OVERLAY_BOTTOM'`, `'OVERLAY_FULL'`, `'SIDE_BY_SIDE'`, `'WITH_DESCRIPTION'` |
| `footer_variant` | `'COLUMNS'`, `'COMPACT'` |
| `bottom_nav_variant` | `'EDGE'`, `'FLOATING_PILL'`, `'DOT_INDICATOR'` |
| `search_bar_variant` | `'INLINE'`, `'ICON_TRIGGER'` |
| `social_media_platform` | `'whatsapp'`, `'instagram'`, `'facebook'`, `'tiktok'`, `'twitter'`, `'youtube'` |

---

### RLS (Row Level Security)

**Helper functions:**

- `is_store_owner(store_id UUID)` — `SECURITY DEFINER`. Returns true if `auth.uid() = stores.owner_id`.
- `is_store_public(store_id UUID)` — Returns true if `stores.onboarding_completed = true`.

**Pattern:**

| Role | Access | Scope |
|------|--------|-------|
| `anon` | SELECT | Public stores only (`is_store_public`) |
| `authenticated` | SELECT, INSERT, UPDATE, DELETE | Own stores only (`is_store_owner`) |

**Special cases:**

| Table | Exception |
|-------|-----------|
| `orders` | `anon` INSERT allowed (anonymous checkout) |
| `store_pages` | `anon` SELECT only where `published = true` |
| `product_variants` | RLS via subquery through `products.store_id` |
| `product_images` | RLS via subquery through `products.store_id` |
| `media_assets` | No `anon` access at all |

---

### Database Functions

| Function | Type | Description |
|----------|------|-------------|
| `set_updated_at()` | TRIGGER | Sets `updated_at = now()` on UPDATE |
| `slugify(text)` | IMMUTABLE | Generates URL-safe slug from text |
| `is_store_owner(uuid)` | SECURITY DEFINER | Ownership check against `auth.uid()` |
| `is_store_public(uuid)` | FUNCTION | Checks `onboarding_completed = true` |
| `search_products(store_id, query, limit)` | FUNCTION | Full-text search with `tsvector`, ILIKE fallback |
| `get_store_variants(store_id)` | FUNCTION | Merges template `default_variants` + store `store_appearance.variants` |
| `switch_catalog_mode_to_simple(store_id)` | FUNCTION | Migrates nested catalog to simple (removes subcategory associations) |
| `enforce_max_categories()` | TRIGGER | Plan-aware limit on categories per store |
| `enforce_max_subcategories()` | TRIGGER | Max 20 subcategories per category |
| `enforce_max_products()` | TRIGGER | Plan-aware limit on products per store |
| `enforce_max_product_images()` | TRIGGER | Max 4 images per product |
| `enforce_max_media_assets()` | TRIGGER | Plan-aware limit on media assets per store |
| `update_products_search_vector()` | TRIGGER | Rebuilds `tsvector` on product INSERT/UPDATE |

---

### Storage Buckets (4)

| Bucket | Path Pattern | Max Size | Allowed Types |
|--------|-------------|----------|---------------|
| `logos` | `{store_id}/{filename}.webp` | 5 MB | webp, png, jpeg |
| `banners` | `{store_id}/{filename}.webp` | 5 MB | webp, png, jpeg |
| `products` | `{store_id}/{filename}.webp` | 5 MB | webp, png, jpeg |
| `categories` | `{store_id}/{filename}.webp` | 5 MB | webp, png, jpeg |

All buckets allow public read. Authenticated upload/delete restricted to store owners via ownership check.

**Context-to-bucket mapping (media actions):**

| `media_context` | Bucket |
|-----------------|--------|
| `'logo'` | `logos` |
| `'product'` | `products` |
| `'banner'` | `banners` |
| `'category'` | `categories` |
| `'general'` | `logos` (fallback) |

---

### Migrations

| File | Phase | Content |
|------|-------|---------|
| `001_enums.sql` | Schema | All enum type definitions |
| `002_reference_tables.sql` | Schema | `templates`, `plans`, `currencies` |
| `003_stores.sql` | Schema | `stores`, `store_appearance`, `store_infrastructure` |
| `004_categories.sql` | Schema | `categories`, `subcategories` |
| `005_products.sql` | Schema | `products`, `product_images`, `product_variants` |
| `006_offers.sql` | Schema | `offers`, `offer_items` |
| `007_orders.sql` | Schema | `orders` |
| `008_media_pages.sql` | Schema | `media_assets`, `store_pages` |
| `009_storage_buckets.sql` | Storage | Bucket creation + RLS policies |
| `010_functions_triggers.sql` | Logic | All functions, triggers, RLS policies |
| `011_product_variants_enhance.sql` | Schema | Added `type` and `metadata` columns to `product_variants` |

---

### Seed Data

**System user:** `demo@tiendri.com` (UUID: `00000000-0000-0000-0000-000000000001`)

**Demo stores:** 8 stores, one per template. UUIDs: `10000000-0000-0000-0000-00000000000{1-8}`

**Content:** 48 categories, 64 products with images and variants across all demo stores.

**Plans:**

| Plan | Price (COP) | Products | Categories | Media |
|------|------------|----------|------------|-------|
| Free | 0 | 20 | 5 | 50 |
| Pro | 49,900 | 100 | 20 | 200 |
| Negocio | 99,900 | unlimited | unlimited | 500 |

**Currencies:** COP, USD, EUR, MXN, ARS, BRL, CLP, PEN

**Templates:** tech-premium, fashion, furniture-dark, furniture-light, beauty-soft, beauty-elegant, decor-warm, food-night

---

## Server Actions

### Ubicacion

`src/app/(dashboard)/dashboard/_actions/`

### Patron

```typescript
'use server'
import { createClient } from '@/infrastructure/supabase/server'
import { getStoreId } from './store'

export async function actionName(input): Promise<ActionResult<T>> {
  const supabase = await createClient()
  const storeId = getStoreId()
  // ... query/mutate
}
```

### ActionResult\<T\>

```typescript
type ActionResult<T> =
  | { success: true; data: T }
  | {
      success: false;
      error: {
        code: string;       // e.g. 'VALIDATION_ERROR', 'SLUG_TAKEN'
        message: string;    // human-readable, Colombian Spanish
        field?: string;     // field name when targeting a specific input
      };
    };
```

### Error Codes

| Code | Meaning |
|------|---------|
| `VALIDATION_ERROR` | Zod schema failure |
| `SLUG_TAKEN` | Duplicate slug within scope |
| `NOT_FOUND` | Entity not found |
| `PLAN_LIMIT` / `CATEGORY_LIMIT` | Plan limit exceeded (categories) |
| `PRODUCT_LIMIT` | Plan limit exceeded (products) |
| `MAX_PRODUCT_IMAGES` | 4 images per product max |
| `MAX_MEDIA_REACHED` / `MEDIA_ASSET_LIMIT` | Media count limit reached |
| `DATABASE_ERROR` | Supabase query failure |

---

### Store Actions (`store.ts`) — 3 functions

| Action | Signature | Description |
|--------|-----------|-------------|
| `getStoreId` | `() => string` | Returns hardcoded `DEMO_STORE_ID` (`10000000-...0001`) |
| `getStore` | `() => Promise<StoreMeta \| null>` | SELECT stores JOIN currencies(code) |
| `updateCatalogMode` | `(mode: 'simple' \| 'nested') => Promise<ActionResult<StoreMeta>>` | `'simple'`: calls RPC `switch_catalog_mode_to_simple`. `'nested'`: plain UPDATE. |

---

### Category Actions (`categories.ts`) — 7 functions

| Action | Signature | Description |
|--------|-----------|-------------|
| `listCategories` | `() => Promise<Category[]>` | SELECT all, ordered by `sort_order ASC`. Returns `[]` on error. |
| `getCategoryById` | `(id: string) => Promise<Category \| null>` | SELECT single, scoped to store. |
| `createCategory` | `(input: CreateCategoryInput) => Promise<ActionResult<Category>>` | Zod validation, slug uniqueness check, auto `sort_order` (max+1), INSERT. DB trigger enforces plan limits. |
| `updateCategory` | `(id: string, input: UpdateCategoryInput) => Promise<ActionResult<Category>>` | Zod partial validation, slug uniqueness check (excluding self), partial UPDATE. |
| `deleteCategory` | `(id: string) => Promise<ActionResult<void>>` | Deletes products first (RESTRICT constraint prevents direct delete), then category. Subcategories cascade via FK. |
| `reorderCategories` | `(orderedIds: string[]) => Promise<ActionResult<void>>` | Loops and sets `sort_order = index` for each id. |
| `countCategories` | `() => Promise<number>` | COUNT with `head: true`. Returns `0` on error. |

---

### Subcategory Actions (`subcategories.ts`) — 7 functions

| Action | Signature | Description |
|--------|-----------|-------------|
| `listSubcategories` | `(categoryId: string) => Promise<Subcategory[]>` | SELECT by store + category, ordered by `sort_order`. |
| `getSubcategoryById` | `(id: string) => Promise<Subcategory \| null>` | SELECT single scoped to store. |
| `createSubcategory` | `(input: CreateSubcategoryInput) => Promise<ActionResult<Subcategory>>` | Zod validation, slug uniqueness scoped to CATEGORY, auto sort_order within category. DB trigger enforces max 20 per category. |
| `updateSubcategory` | `(id: string, input: UpdateSubcategoryInput) => Promise<ActionResult<Subcategory>>` | Fetches current to get `category_id` for slug scope, partial UPDATE. |
| `deleteSubcategory` | `(id: string, orphanAction: 'move' \| 'delete', targetSubcategoryId?: string) => Promise<ActionResult<void>>` | `'move'`: UPDATEs products' `subcategory_id` to target. `'delete'`: DELETEs orphaned products. Then deletes subcategory. |
| `reorderSubcategories` | `(categoryId: string, orderedIds: string[]) => Promise<ActionResult<void>>` | Sets `sort_order = index`, scoped to categoryId. |
| `deleteAllByCategory` | `(categoryId: string) => Promise<void>` | Cascade helper, deletes all subcategories for a category. |

---

### Product Actions (`products.ts`) — 11 functions

| Action | Signature | Description |
|--------|-----------|-------------|
| `listProducts` | `(filters?: ProductFilters) => Promise<Product[]>` | SELECT with `product_images(*)`, `product_variants(*)`. Filters: `categoryId`, `subcategoryId`, `available`, `featured`, `search` (ilike on name). |
| `getProductById` | `(id: string) => Promise<Product \| null>` | SELECT single with relations. |
| `getProductBySlug` | `(slug: string) => Promise<Product \| null>` | SELECT by slug with relations. |
| `createProduct` | `(input: CreateProductInput) => Promise<ActionResult<Product>>` | Zod, slug check, sort_order, INSERT product then images then variants. Manual rollback (delete product) if images/variants fail. DB trigger enforces plan limit. |
| `updateProduct` | `(id: string, input: UpdateProductInput) => Promise<ActionResult<Product>>` | Partial update on product fields. DELETE + re-INSERT for images (if provided). DELETE + re-INSERT for variants (if provided). Re-fetches with relations. |
| `deleteProduct` | `(id: string) => Promise<ActionResult<void>>` | DELETE product. CASCADE handles `product_images` + `product_variants`. |
| `reorderProducts` | `(orderedIds: string[]) => Promise<ActionResult<void>>` | Sets `sort_order = index` for each id. |
| `toggleAvailable` | `(id: string) => Promise<ActionResult<Product>>` | Fetches current `available`, flips boolean, UPDATE, re-fetches full product. |
| `toggleFeatured` | `(id: string) => Promise<ActionResult<Product>>` | Same pattern as `toggleAvailable`. |
| `countProducts` | `() => Promise<number>` | COUNT with `head: true`. |
| `countProductsByCategory` | `(categoryId: string) => Promise<number>` | COUNT filtered by `category_id`. |

Note: `switchCatalogModeToSimple()` also exists here but delegates to the same RPC as `store.ts`.

---

### Media Actions (`media.ts`) — 9 functions

| Action | Signature | Description |
|--------|-----------|-------------|
| `uploadMediaAsset` | `(input: UploadInput) => Promise<ActionResult<MediaAsset>>` | Strips data URL prefix, decodes base64, uploads to Storage at `{storeId}/{uuid}.{ext}`, inserts into `media_assets`. DB trigger enforces plan limit. |
| `listMediaAssets` | `() => Promise<MediaAsset[]>` | SELECT all, ordered `created_at DESC`. |
| `searchMediaAssets` | `(filters: MediaSearchFilters) => Promise<MediaAsset[]>` | Supabase filters for `context` and `tags` (array contains). Client-side text filter on `filename` + `alt`. |
| `getMediaAssetById` | `(id: string) => Promise<MediaAsset \| null>` | Strips `media_` prefix from id before querying. |
| `updateMediaAssetAlt` | `(id: string, input: UpdateMediaAssetInput) => Promise<ActionResult<MediaAsset>>` | Updates `alt` and/or `tags` only. |
| `deleteMediaAsset` | `(id: string) => Promise<ActionResult<void>>` | Parses bucket + path from CDN URL, removes from Storage (best-effort), deletes DB record. |
| `getMediaStats` | `() => Promise<MediaLibraryStats>` | Counts assets + sums bytes. JOINs `stores -> plans(media_limit)` for cap. Fallbacks: `100` count, `8,388,608` bytes (8 MB). |
| `resolveMediaUrl` | `(mediaId: string) => Promise<string \| null>` | Resolves a single media ID to its URL. |
| `resolveMediaUrls` | `(mediaIds: string[]) => Promise<Record<string, string>>` | Returns `{ "media_{uuid}": url }` map for each found id. |

**Upload input shape:**

```typescript
{
  filename: string
  base64Data: string      // full data URL or raw base64
  mimetype: string
  size: number
  width: number
  height: number
  context?: MediaAssetContext
  tags?: string[]
  alt?: string
}
```

**ID convention:** All `media_assets` rows get their id prefixed as `media_${row.id}` in the mapping layer.

---

## Hooks

### Ubicacion

`src/app/(dashboard)/_hooks/`

All hooks call Server Actions directly. The `_storeId` parameters are vestigial (kept for backwards compatibility with the old localStorage repository layer).

### useCategories

```typescript
function useCategories(_storeId?: string): {
  categories: Category[]
  isLoading: boolean
  error: string | null
  create: (input: CreateCategoryInput) => Promise<boolean>
  update: (id: string, input: UpdateCategoryInput) => Promise<boolean>
  remove: (id: string) => Promise<boolean>
  reorder: (orderedIds: string[]) => Promise<boolean>
  refresh: () => Promise<void>
}
```

### useSubcategories

```typescript
function useSubcategories(_storeId: string | undefined, categoryId: string): {
  subcategories: Subcategory[]
  isLoading: boolean
  error: string | null
  create: (input: CreateSubcategoryInput) => Promise<boolean>
  update: (id: string, input: UpdateSubcategoryInput) => Promise<boolean>
  remove: (id: string, orphanAction: 'move' | 'delete', targetSubcategoryId?: string) => Promise<boolean>
  reorder: (orderedIds: string[]) => Promise<boolean>
  refresh: () => Promise<void>
}
```

The `remove` function handles orphaned products: either moves them to a target subcategory or deletes them.

### useProducts

```typescript
function useProducts(_storeId?: string, filters?: ProductFilters): {
  products: Product[]
  isLoading: boolean
  error: string | null
  create: (input: CreateProductInput) => Promise<boolean>
  update: (id: string, input: UpdateProductInput) => Promise<boolean>
  remove: (id: string) => Promise<boolean>
  toggleAvailable: (id: string) => Promise<boolean>
  toggleFeatured: (id: string) => Promise<boolean>
  reorder: (orderedIds: string[]) => Promise<boolean>
  refresh: () => Promise<void>
}
```

### useMediaLibrary

```typescript
function useMediaLibrary(): {
  assets: MediaAsset[]
  stats: MediaLibraryStats | null
  isLoading: boolean
  error: string | null
  upload: (file: File, options?: UploadOptions) => Promise<UploadResult>
  deleteAsset: (id: string) => Promise<boolean>
  updateAlt: (id: string, alt: string, tags?: string[]) => Promise<boolean>
  search: (filters: MediaSearchFilters) => Promise<MediaAsset[]>
  resolveUrl: (mediaId: string) => Promise<string | null>
  refresh: () => Promise<void>
}
```

**Upload pipeline:** Client-side `resizeAndConvert(file, 800, 0.7)` then Server Action `uploadMediaAsset` with base64 payload.

**Supporting types:**

```typescript
type UploadOptions = { context?: MediaAssetContext; tags?: string[]; alt?: string }
type UploadResult = { success: boolean; asset?: MediaAsset; errorCode?: string; errorMessage?: string }
```

### useImageUpload

```typescript
function useImageUpload(options?: UseImageUploadOptions): {
  images: UploadedImage[]
  addImage: (file: File) => Promise<'FILE_TOO_LARGE' | 'MAX_IMAGES_REACHED' | null>
  removeImage: (id: string) => void
  reorderImages: (orderedIds: string[]) => void
  isProcessing: boolean
}
```

NOT backed by Supabase. Purely local state for the product form image management. Uses `resizeAndConvert` for client-side processing.

**Defaults:** max 4 images, 5 MB max input size, 0.7 quality, 800px max width.

### useDashboardTour

```typescript
function useDashboardTour(): void
```

Checks `sessionStorage['tiendri_tour_trigger']` and `localStorage['tiendri_tour_completed']`. Lazy-loads `driver.js` for the guided tour. No return value.

---

## Adapter Layer

### Ubicacion

`src/infrastructure/adapters/storefront-adapter.ts`

### Proposito

Maps Supabase DB rows to domain types that templates consume. This is the boundary between the database shape and the storefront rendering layer.

### Types

```typescript
// DB row type aliases (from database.types)
type ProductRow = Tables<'products'>
type ProductImageRow = Tables<'product_images'>
type ProductVariantRow = Tables<'product_variants'>
type CategoryRow = Tables<'categories'>
type SubcategoryRow = Tables<'subcategories'>
type StoreRow = Tables<'stores'>
type StoreAppearanceRow = Tables<'store_appearance'>

// Composite
type ProductWithRelations = {
  product: ProductRow
  images: ProductImageRow[]
  variants: ProductVariantRow[]
}
```

### Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `toProductImages` | `(rows: ProductImageRow[]) => ProductImage[]` | Sorts by `sort_order`, maps `url` + `sort_order`. |
| `toVariantGroups` | `(rows: ProductVariantRow[]) => StorefrontVariantGroup[]` | Groups by `row.type`, sorts by `metadata.order` then name. |
| `toColorOptions` | `(rows: ProductVariantRow[]) => ColorOption[]` | Filters `type === 'color'`, reads `metadata.hex` + `metadata.label`. |
| `toStorefrontProduct` | `(product, images, variants) => StorefrontProduct` | Full mapping (see field mapping below). |
| `toStorefrontProducts` | `(items: ProductWithRelations[]) => StorefrontProduct[]` | Sorts by `sort_order` then `created_at DESC`, batch maps. |
| `filterFeatured` | `(products: StorefrontProduct[]) => StorefrontProduct[]` | Identity function (filtering should happen before mapping). |
| `filterFeaturedFromRows` | `(items: ProductWithRelations[]) => ProductWithRelations[]` | Filters `product.featured`. |
| `filterBestSellersFromRows` | `(items: ProductWithRelations[]) => ProductWithRelations[]` | Filters `product.is_best_seller`. |
| `filterByCategoryFromRows` | `(items, categoryId) => ProductWithRelations[]` | Filters by `product.category_id`. |
| `toCategory` | `(category: CategoryRow) => Category` | Maps `id`, `name`, `slug`, `icon`, `image`. |
| `toCategories` | `(rows: CategoryRow[]) => Category[]` | Sorts by `sort_order`, batch maps. |
| `toStoreInfo` | `(store, appearance?) => StoreInfo` | Reads `business_info` JSON, `social_media` JSON, `branding` JSON for logo, `payment_methods` array. |

### Field Mapping (DB -> Domain)

| DB Column | Domain Field | Notes |
|-----------|-------------|-------|
| `compare_at_price` | `originalPrice` | Rename only |
| `available` | `inStock` | Rename only |
| `is_best_seller` | `isBestSeller` | Rename only |
| `subtitle` | `subtitle` | Pass-through |
| `specs` (JSONB) | `specs` (`string[]`) | JSON -> typed array |
| `product_images` table | `images[]` | Embedded via relation, sorted by `sort_order` |
| `product_variants` where `type='color'` | `colors: ColorOption[]` | Extracted from `metadata.hex` + `metadata.label` |
| `product_variants` (all) | `variants: StorefrontVariantGroup[]` | Grouped by `type` |
| `business_info.whatsapp` | `StoreInfo.whatsapp` | Extracted from JSONB |
| `business_info.hours` | `StoreInfo.hours` | Extracted from JSONB |
| `business_info.shipping_info` | `StoreInfo.shippingInfo` | Extracted from JSONB |
| `social_media` (JSONB) | `StoreInfo.social_links` | Mapped to `{ instagram?, facebook?, ... }` |
| `store_appearance.branding` (JSONB) | `StoreInfo.logo` | Extracted from JSONB |

---

## Repository Layer (Legacy)

### Ubicacion

`src/infrastructure/repositories/`

The localStorage repository layer is the original data layer, now superseded by Server Actions + Supabase. It remains as a fallback and is not actively used in production flows.

### Files

| File | Export |
|------|--------|
| `interfaces.ts` | `CategoryRepository`, `SubcategoryRepository`, `ProductRepository`, `MediaRepository`, `StoreRepository`, `StoreMeta` |
| `factory.ts` | `getStoreId()`, `getCategoryRepository()`, `getSubcategoryRepository()`, `getProductRepository()`, `getStoreRepository()`, `getMediaRepository()`, `getRepositories()` |
| `local-storage/category.repository.ts` | `LocalCategoryRepository implements CategoryRepository` |
| `local-storage/subcategory.repository.ts` | `LocalSubcategoryRepository implements SubcategoryRepository` |
| `local-storage/product.repository.ts` | `LocalProductRepository implements ProductRepository` |
| `local-storage/store.repository.ts` | `LocalStoreRepository implements StoreRepository` |
| `local-storage/media.repository.ts` | `LocalMediaRepository implements MediaRepository` |

### StoreMeta

```typescript
interface StoreMeta {
  id: string
  name: string
  slug: string
  catalog_mode: 'simple' | 'nested'
  currency: string
}
```

---

## Domain Types

### Ubicacion

`src/types/domain/`

### ActionResult\<T\>

```typescript
type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: { code: string; message: string; field?: string } }
```

### Category

```typescript
type CategoryIcon = 'Smartphone' | 'Watch' | 'Camera' | 'Laptop' | 'Headphones' | 'Tv' |
  'Shirt' | 'ShoppingBag' | 'Home' | 'Sofa' | 'Utensils' | 'Car' | 'Bike' | 'Dumbbell' |
  'Book' | 'Music' | 'Gamepad2' | 'Baby' | 'Dog' | 'Flower2'

interface Category {
  id: string; store_id: string; name: string; slug: string;
  description?: string; image?: string; icon: CategoryIcon;
  sort_order: number; created_at: string; updated_at: string;
}
```

### Subcategory

```typescript
interface Subcategory {
  id: string; category_id: string; store_id: string; name: string; slug: string;
  description?: string; image?: string; sort_order: number;
  created_at: string; updated_at: string;
}
```

### Product

```typescript
interface Product {
  id: string; store_id: string; category_id: string; subcategory_id?: string;
  name: string; slug: string; description: string; price: number;
  compare_at_price?: number; available: boolean; featured: boolean;
  sort_order: number; images: ProductImage[]; variants: ProductVariant[];
  created_at: string; updated_at: string;
}

interface ProductImage {
  id: string; product_id: string; store_id: string;
  url: string; sort_order: number; created_at: string;
}

interface ProductVariant {
  id: string; product_id: string; name: string;
  price_modifier: number; created_at: string;
}

interface UIProductVariant { id: string; name: string; priceModifier: number }
```

### Storefront Types

```typescript
interface StorefrontProduct {
  id: string; name: string; subtitle?: string; slug: string;
  price: number; originalPrice?: number;
  images: ProductImage[]; description?: string; specs?: string[];
  rating?: number; reviewCount?: number;
  colors?: ColorOption[]; variants?: StorefrontVariantGroup[];
  inStock: boolean; inWishlist?: boolean;
  categoryId: string; subcategoryId?: string;
}

interface ColorOption { id: string; label: string; hex: string }

interface StorefrontVariantGroup {
  id: string; label: string;
  type: 'color' | 'size' | 'storage' | 'custom';
  options: StorefrontVariantOption[];
}

interface StorefrontVariantOption {
  id: string; label: string; value?: string;
  priceModifier?: number; available?: boolean;
}
```

### Store

```typescript
interface Store {
  id: string; slug: string; name: string; ownerId: string;
  whatsappNumber: string; templateId: string;
  createdAt: string; updatedAt: string;
}

interface StoreInfo {
  name: string; slug: string; logo: string | null;
  description?: string; whatsapp?: string; hours?: string;
  paymentMethods?: string[]; shippingInfo?: string;
  social_links?: { instagram?; facebook?; tiktok?; twitter?; youtube? };
}
```

### MediaAsset

```typescript
type MediaAssetContext = 'product' | 'banner' | 'logo' | 'category' | 'general'

interface MediaAsset {
  id: string; store_id: string; filename: string; alt: string;
  url: string; mimetype: string; size: number; width: number; height: number;
  context: MediaAssetContext; tags: string[]; created_at: string;
}

interface MediaLibraryStats { count: number; totalBytes: number; limitBytes: number; limitCount: number }
interface MediaSearchFilters { context?: MediaAssetContext; tags?: string[]; query?: string }
```

### Cart

```typescript
interface CartItem {
  productId: string; name: string; price: number; quantity: number;
  imageUrl: string | null; variantName: string | null;
  originalPrice?: number; description?: string;
  rating?: number; reviewCount?: number;
  colorId?: string; cardBgColor?: string;
}

interface Cart { items: CartItem[]; total: number }
interface CheckoutFormData { nombre: string; whatsapp: string; email: string; direccion: string; notas: string }
```

### Onboarding

```typescript
type VibeId = 'elegante' | 'moderno' | 'energetico' | 'calido' | 'catalogo'
type CatalogMode = 'simple' | 'nested'
type OnboardingStep = 1 | 2 | 3 | 4 | 5
type AccentColor = 'rojo' | 'naranja' | 'amarillo' | 'verde' | 'turquesa' | 'azul' |
  'violeta' | 'rosa' | 'negro' | 'gris' | 'blanco' | 'cafe'

interface OnboardingState {
  step: OnboardingStep; storeName: string; whatsapp: string; slug: string;
  catalogMode: CatalogMode | null; selectedVibe: VibeId | null;
  accentColor: AccentColor | null; logoUrl: string | null;
}
```

---

## Shared Utilities

### image-processing.ts

`src/shared/image-processing.ts`

```typescript
interface ResizeAndConvertResult {
  dataUrl: string
  width: number
  height: number
  mimetype: string
}

async function resizeAndConvert(
  file: File,
  maxWidth: number = 800,
  quality: number = 0.7
): Promise<ResizeAndConvertResult>
```

Canvas-based pipeline: creates `Image`, draws to canvas at scaled dimensions (only scales down if `img.width > maxWidth`). Tries `canvas.toBlob('image/webp', quality)` first, falls back to `'image/png'`. Returns data URL.

---

## Supabase Clients

### Ubicacion

`src/infrastructure/supabase/`

### Browser Client (`client.ts`)

```typescript
export function createClient(): SupabaseClient<Database>
// Uses createBrowserClient from @supabase/ssr
// Env: NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### Server Client (`server.ts`)

```typescript
export async function createClient(): Promise<SupabaseClient<Database>>
// Uses createServerClient from @supabase/ssr
// Reads cookies via next/headers cookies()
// Sets cookies in try/catch (safe for Server Components)
```

### Middleware (`middleware.ts`)

```typescript
export async function updateSession(request: NextRequest): Promise<{
  response: NextResponse
  user: User | null
}>
// Syncs cookies between request and response
// Calls supabase.auth.getUser() (NOT getSession() — security best practice)
// Returns early with { response: NextResponse.next(), user: null } if env vars missing
```

---

## Comandos

```bash
npx supabase start                    # Levantar Supabase local (Docker)
npx supabase db reset                 # Reset + apply migrations + seed
npx supabase gen types typescript \
  --local > src/infrastructure/database.types.ts   # Regenerar tipos
npx supabase stop                     # Detener Supabase local
```

---

## Estado Actual

| Item | Estado |
|------|--------|
| Demo store hardcoded | UUID: `10000000-0000-0000-0000-000000000001` |
| Auth | Pendiente -- actualmente usa demo store |
| localStorage repos | Conservados como fallback, no eliminados |
| Storefront publico | Pendiente de migrar a Supabase (usa mock data) |
| `database.types.ts` | Eliminado del tracking -- regenerar con `supabase gen types` |
