# Dashboard — Merchant Management UI

The dashboard is the merchant-facing management interface for Tiendri. Every authenticated merchant uses it to manage their store content (products, categories), customize their storefront appearance, and share their store with customers.

**Current persistence**: localStorage (all data keyed by `tiendri_<storeId>_*`). The repository layer is designed as async from the start so the switch to Supabase is a one-file change per repository — no page or hook changes required.

---

## Route Structure

All dashboard routes live under `src/app/(dashboard)/dashboard/`. The route group `(dashboard)` applies a shared layout (`src/app/(dashboard)/layout.tsx`) that renders the sidebar, mobile header, breadcrumbs, and the page content area.

```
src/app/(dashboard)/
  layout.tsx                       ← shell: sidebar + header + breadcrumbs
  dashboard/
    page.tsx                       ← /dashboard (home)
    categorias/
      page.tsx                     ← /dashboard/categorias
      [id]/page.tsx                ← /dashboard/categorias/[id]
      create-category-sheet.tsx    ← sheet component (used inline)
      category-icon.tsx            ← icon renderer
    productos/
      page.tsx                     ← /dashboard/productos
      nuevo/page.tsx               ← /dashboard/productos/nuevo
      [id]/page.tsx                ← /dashboard/productos/[id]
      product-form.tsx             ← shared form (create + edit)
      product-image-gallery.tsx    ← image management
      actions.ts                   ← client-side localStorage helpers
    banners/
      page.tsx                     ← /dashboard/banners (redirect)
    compartir/
      page.tsx                     ← /dashboard/compartir
    configuracion/
      page.tsx                     ← /dashboard/configuracion
      configuracion-client.tsx     ← tab orchestration (Client Component)
      actions.ts                   ← localStorage helpers
      tabs/
        branding-tab.tsx           ← Identidad tab
        theme-tab.tsx              ← Apariencia tab
        business-tab.tsx           ← Negocio tab
```

---

## Route Map

| Route | Page | Status |
|-------|------|--------|
| `/dashboard` | Home — stats grid, quick actions, storage indicator | Implemented |
| `/dashboard/categorias` | Categories list with drag-and-drop sort | Implemented |
| `/dashboard/categorias/[id]` | Edit category + manage subcategories | Implemented |
| `/dashboard/productos` | Products list with filters and availability/featured toggles | Implemented |
| `/dashboard/productos/nuevo` | Create product form | Implemented |
| `/dashboard/productos/[id]` | Edit product | Implemented |
| `/dashboard/banners` | Server-side redirect to `/dashboard/configuracion` | Redirect |
| `/dashboard/compartir` | QR code generator + copy link + WhatsApp share | Implemented |
| `/dashboard/configuracion` | Store configuration — schema-driven tabs | Implemented |

---

## Shell Components

The layout at `src/app/(dashboard)/layout.tsx` is a Client Component that composes three shell pieces:

### DashboardSidebar (`src/components/dashboard/sidebar.tsx`)

- Fixed left sidebar, **desktop only** (`lg:block hidden`), 256px wide.
- Reads store name from `tiendri_demo-store_store` in localStorage to display in the sidebar header.
- `NAV_ITEMS` array drives the navigation links — add an entry here to add a new nav item.
- Active route detection: exact match for `/dashboard`, `startsWith` for all other routes.
- Exposes `SidebarNav` as a separate component — reused inside the mobile Sheet.
- Bottom of sidebar: "Ver mi tienda" external link, only rendered when a slug is configured.

### DashboardHeader (`src/components/dashboard/header.tsx`)

- Sticky top bar, **mobile only** (`lg:hidden`).
- Contains: hamburger button → opens a `Sheet` with `SidebarNav`, store name (center), Tiendri logo (right).
- Sheet closes automatically via `onNavigate` callback after a link is tapped.

### DashboardBreadcrumbs (`src/components/dashboard/breadcrumbs.tsx`)

- Renders above `{children}` in the main content area, **desktop and tablet only** (`md:block hidden`).
- `ROUTE_LABELS` map drives the human-readable labels for each path segment. Add new routes here.
- Dynamic segments (`[id]`, `[slug]`) are skipped silently — breadcrumbs stay clean.
- Not rendered when there is only one crumb (e.g., on `/dashboard` itself).

---

## Dashboard Home (`/dashboard`)

Displays:
- **Stats grid** (2 cols mobile / 4 cols desktop): total products, total categories, plan (hardcoded "Gratis"), store status (active if products > 0).
- **Quick actions** (2 cols / 4 cols): Add product, View store, Copy link, Share QR.
- **StorageIndicator** card — shows localStorage usage for the current store.

Data is loaded via `getRepositories().products.count()` and `getRepositories().categories.count()` in parallel on mount.

---

## Configuration System (Schema-Driven)

`/dashboard/configuracion` renders a multi-tab form that combines **universal tabs** (same for all templates) with **dynamic tabs** declared by the active template's schema.

### Tab Order

```
Identidad → [dynamic tabs from schema] → Apariencia → Negocio
```

For `tech-premium`, the dynamic tabs are "Contenido Principal" and "Contenido Secundario" (declared in `src/templates/tech-premium/config-schema.ts`). Different templates will produce different tabs.

### Universal Tabs

| Tab | File | What it manages |
|-----|------|----------------|
| Identidad | `tabs/branding-tab.tsx` | Store name, logo, slogan, social links |
| Apariencia | `tabs/theme-tab.tsx` | Color palette, border radius, font pair — reads options from template schema |
| Negocio | `tabs/business-tab.tsx` | WhatsApp number, address, currency, catalog mode |

### Dynamic Tabs

Rendered from `schema.content.tabGroups` — each `ConfigTabGroup` becomes one tab. The tab content is rendered by `DynamicTabContent` (see Schema Form Components section).

### How It Works

1. `configuracion-client.tsx` calls `getTemplateSchemaSync(templateId)` to get the active template's `TemplateConfigSchema`.
2. `schema.content.tabGroups` is mapped to tab triggers and `DynamicTabContent` instances.
3. On save, `DynamicTabContent` calls `onSave(data)` which merges into the full customization blob and writes to localStorage.
4. **One-time migration**: on mount, `migrateLegacyBanners()` checks for the old `tiendri_demo-store_banners` key and merges banner data into the main blob under `content.*`, then deletes the old key.

### Storage Key

All store customization is stored under one key:

```
tiendri_demo-store_customization  →  StoreCustomization (JSON blob)
```

Section helpers in `actions.ts` handle partial updates: `updateBranding()`, `updateContent()`, `updateBusiness()`, `updateTheme()` — each reads the full blob, merges the section, and writes back.

---

## Schema Form Components

Located at `src/components/dashboard/schema-form/`. These components turn a `TemplateConfigSchema` into live form UI without any template-specific code.

| Component | File | What it renders |
|-----------|------|----------------|
| `DynamicField` | `dynamic-field.tsx` | Single field based on `FieldType` — `text`, `textarea`, `number`, `boolean`, `select`, `image`, `tag-list`, `key-value-list` |
| `DynamicSection` | `dynamic-section.tsx` | shadcn Card wrapping a group of `DynamicField` instances (one `ConfigSection`) |
| `RepeatableSection` | `repeatable-section.tsx` | Array of items with add, remove, and drag-to-reorder (one `RepeatableConfigSection`) |
| `DynamicTabContent` | `dynamic-tab-content.tsx` | Full tab from a `ConfigTabGroup` — renders sections, handles save + toast |
| `TagListField` | `tag-list-field.tsx` | String array rendered as removable chips with an input to add new entries |
| `ImageUploadField` | `image-upload-field.tsx` | File input with preview; converts to base64 WebP via canvas before storing |

`DynamicField` uses an exhaustive `switch` over `FieldType` with a `never` fallthrough — TypeScript will error at compile time if a new field type is added to the schema without a corresponding renderer.

**Dot-path convention**: each `ConfigField.path` is a dot-separated string (e.g. `"content.heroBanner.title"`) that maps directly to the `StoreCustomization` object. `getByPath` / `setByPath` from `src/lib/config-path-utils.ts` handle immutable reads and writes.

---

## Shared Components

Located at `src/components/shared/`. Exported from `src/components/shared/index.ts`.

| Component | Props summary | What it does |
|-----------|--------------|--------------|
| `ConfirmDialog` | `open`, `onOpenChange`, `title`, `description`, `onConfirm`, `variant?`, `loading?` | Modal confirmation dialog used for destructive actions (delete category, delete product, etc.) |
| `EmptyState` | `icon`, `title`, `description`, `action?` | Centered empty state with icon, heading, description, and optional CTA button |
| `PriceInput` | `value`, `onChange`, `currency?`, `label?`, `error?` | Number input formatted as Colombian pesos (`es-CO` locale, no decimals) |
| `SortableList` + `DragHandle` | `items`, `onReorder`, `renderItem` | Generic drag-and-drop list using `@dnd-kit/core`; calls `onReorder(orderedIds[])` on drop |
| `DataTable` | `columns`, `data`, `loading?`, `emptyState?`, `onRowClick?` | Responsive table — `Table` on desktop, stacked cards on mobile; skeleton rows while loading |
| `VariantEditor` | `variants`, `onChange` | Inline editor for product variants (name + price modifier); add/remove rows |
| `StorageIndicator` + `estimateLocalStorageUsage` | `storeId` | Progress bar showing `tiendri_<storeId>_*` localStorage usage out of 5 MB; warns at 80%, red at 90% |

---

## Data Layer

### Domain Types (`src/types/domain/`)

| File | Types |
|------|-------|
| `category.ts` | `Category`, `CreateCategoryInput`, `UpdateCategoryInput`, `CategoryIcon` |
| `subcategory.ts` | `Subcategory`, `CreateSubcategoryInput`, `UpdateSubcategoryInput` |
| `product.ts` | `Product`, `ProductImage`, `ProductVariant`, `CreateProductInput`, `UpdateProductInput`, `ProductFilters` |
| `action-result.ts` | `ActionResult<T>` — discriminated union `{ success: true; data: T } \| { success: false; error: ActionError }` |

Import from the barrel: `import type { Category, Product } from '@/types/domain'`.

### Repository Pattern (`src/lib/repositories/`)

All repositories implement async interfaces (`interfaces.ts`) even though the current localStorage implementations are synchronous. This means the Supabase migration will only require new implementation files — no changes to hooks or pages.

**Interfaces**:
- `CategoryRepository` — list, getById, create, update, delete, reorder, count
- `SubcategoryRepository` — listByCategory, getById, create, update, delete (with orphan handling), reorder, deleteAllByCategory
- `ProductRepository` — list (with filters), getById, getBySlug, create, update, delete, reorder, toggleAvailable, toggleFeatured, count, countByCategory, switchCatalogModeToSimple
- `StoreRepository` — get, updateCatalogMode

**Factory** (`factory.ts`): singletons are created at module load time and returned from `getRepositories()`. This prevents reference changes on re-render that would break `useCallback` dependency arrays.

**localStorage implementations** (`local-storage/`):
- `category.repository.ts`, `subcategory.repository.ts`, `product.repository.ts`, `store.repository.ts`
- All keys follow the pattern: `tiendri_<storeId>_<entity>` (e.g. `tiendri_demo-store_categories`)
- Images stored as base64 WebP data URLs; `StorageIndicator` warns when approaching the 5 MB browser limit

**Current `storeId`**: hardcoded to `"demo-store"` via `getStoreId()` until auth is implemented.

### Hooks (`src/hooks/use-repositories.ts`)

| Hook | Returns | Description |
|------|---------|-------------|
| `useCategories(storeId?)` | `{ categories, isLoading, error, create, update, remove, reorder, refresh }` | Full CRUD + DnD reorder for categories |
| `useSubcategories(storeId?, categoryId)` | `{ subcategories, isLoading, error, create, update, remove, reorder, refresh }` | Scoped to one category; handles orphan products on delete |
| `useProducts(storeId?, filters?)` | `{ products, isLoading, error, create, update, remove, toggleAvailable, toggleFeatured, reorder, refresh }` | Full CRUD with availability/featured toggles |

All mutation methods return `Promise<boolean>` — `true` on success, `false` on error (sets `error` state).

`reorder` uses optimistic updates: updates local state immediately without a re-fetch for a snappy drag-and-drop feel.

Additional hooks in `src/hooks/`:
- `use-image-upload.ts` — WebP conversion pipeline for product images
- `useCart.ts`, `useProductModal.ts`, `useSearch.ts`, `useThemePreview.ts` — storefront-side hooks (not dashboard-specific)

### Validators (`src/lib/validators/`)

Zod schemas for form validation:
- `category.schema.ts` — name (required), description (optional), icon, color
- `product.schema.ts` — name, price, description, category, availability, images, variants
- `store-customization.schema.ts` — StoreCustomization blob (used in configuracion)

---

## Adding a New Dashboard Section

Follow these steps to add a new page (e.g. `/dashboard/pedidos`):

**1. Create the route**

```
src/app/(dashboard)/dashboard/pedidos/page.tsx
```

Use `'use client'` if the page needs state or browser APIs. Use the repository hooks for data access.

**2. Add to sidebar**

In `src/components/dashboard/sidebar.tsx`, add an entry to `NAV_ITEMS`:

```ts
{ label: "Pedidos", href: "/dashboard/pedidos", icon: ShoppingCart },
```

**3. Add breadcrumb label**

In `src/components/dashboard/breadcrumbs.tsx`, add to `ROUTE_LABELS`:

```ts
pedidos: "Pedidos",
```

**4. Use shared infrastructure**

- `useCategories` / `useProducts` from `@/hooks/use-repositories` for data
- `DataTable`, `EmptyState`, `ConfirmDialog` from `@/components/shared` for UI
- `getRepositories()` from `@/lib/repositories` for direct repository access
- `ActionResult<T>` from `@/types/domain` for mutation return types

**5. Add domain types (if new entity)**

- Add interface to `src/types/domain/<entity>.ts`
- Export from `src/types/domain/index.ts`
- Add a repository interface to `src/lib/repositories/interfaces.ts`
- Implement in `src/lib/repositories/local-storage/<entity>.repository.ts`
- Register in `src/lib/repositories/factory.ts`
