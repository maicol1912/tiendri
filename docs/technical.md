# Documentación Técnica — TIENDRI

> Referencia técnica definitiva del proyecto. Actualizar ante cualquier cambio de arquitectura, modelo de datos o decisiones de diseño.

**Plataforma**: tiendri.com
**Descripción**: Plataforma para pequeñas empresas en Colombia/LATAM que permite crear catálogos online y recibir pedidos vía WhatsApp.

---

## Índice

1. [Tech Stack](#tech-stack)
2. [Modelo de Datos](#modelo-de-datos)
3. [Esquema de Base de Datos](#esquema-de-base-de-datos)
4. [Sistema de Templates](#sistema-de-templates)
5. [Decisiones de Arquitectura](#decisiones-de-arquitectura)
6. [Arquitectura Frontend](#arquitectura-frontend)
7. [Workflow Git](#workflow-git)

---

## Tech Stack

| Componente | Tecnología | Versión / Nota |
|---|---|---|
| Framework | Next.js | App Router (última estable) |
| UI Library | React | Última estable |
| Lenguaje | TypeScript | Strict mode — nunca usar `any` |
| Estilos | Tailwind CSS | v4 con CSS variables para temas dinámicos |
| Componentes UI | shadcn/ui | Última versión |
| Primitivos | Radix UI | Accesibilidad |
| Íconos | Lucide React | |
| Toasts | Sonner | NO usar el toast deprecado de shadcn |
| Código QR | qrcode.react | |
| Drag & Drop | @dnd-kit | Para reordenar elementos |
| Recorte de imágenes | react-easy-crop | |
| Validación | Zod | Validación de esquemas en Server Actions |
| Backend | Supabase | PostgreSQL + Auth + Storage |
| Auth SSR | @supabase/ssr | Manejo de cookies |
| Deploy | Vercel | Auto-deploy en push a main |

### Tipografía

| Fuente | Uso | Pesos disponibles |
|---|---|---|
| Inter | Cuerpo (body text) — dashboard, landing, templates | 400, 500, 600, 700 |
| Aeonik | Titulares (headings) — landing, templates | 400 (Air), 900 (Black) |

> **Nota**: Aeonik es una fuente custom con dos pesos extremos: Air (400) y Black (900). Para headings que requieran pesos intermedios, usar Inter como fallback via `fontFamily: "var(--font-sans)"`.

Las fuentes dentro de los templates se scopean via `.template-scope` usando la variable CSS `--template-heading-font`. Cada template puede sobreescribir la fuente de headings independientemente.

### Variables de Entorno

```env
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY   # Solo en Server Actions — NUNCA exponer al frontend
NEXT_PUBLIC_APP_URL
```

> `SUPABASE_SERVICE_ROLE_KEY` nunca debe filtrarse al cliente. Usarla exclusivamente dentro de Server Actions.

---

## Modelo de Datos

### Store

```typescript
{
  id: string                // UUID
  user_id: string           // FK → auth.users
  name: string              // >= 2 caracteres
  slug: string              // ^[a-z0-9][a-z0-9-]*[a-z0-9]$ — único globalmente
  description: string       // máx. 120 caracteres
  whatsapp: string          // 12 dígitos (57 + 10 dígitos del número colombiano)
  logo: string | null       // URL de Storage
  banner: string | null     // URL de Storage
  catalog_mode: 'simple' | 'nested'
  onboarding_completed: boolean

  // Campos de tema
  theme_template_id: string
  theme_primary_color: string    // Hex #RRGGBB
  theme_secondary_color: string  // Hex #RRGGBB
  theme_font_family: string
  theme_font_pair: 'modern' | 'warm' | 'elegant' | 'functional'
  theme_border_radius: 'sharp' | 'rounded' | 'pill'
  theme_appearance: 'light' | 'dark'

  // Redes sociales — almacenadas como JSONB
  social_links: {
    instagram?: string
    facebook?: string
    tiktok?: string
    twitter?: string
    youtube?: string
  }

  created_at: timestamp
  updated_at: timestamp
}
```

### Category

```typescript
{
  id: string
  store_id: string          // FK → stores
  name: string
  description: string | null
  image: string | null      // URL de Storage
  icon: string              // Uno de 20 permitidos (ver lista abajo)
  sort_order: integer
  created_at: timestamp
  updated_at: timestamp
}
```

**Íconos permitidos (20):**
`ShoppingBag` · `UtensilsCrossed` · `Shirt` · `Wrench` · `Sparkles` · `Coffee` · `Pizza` · `Cake` · `IceCream` · `Scissors` · `Hammer` · `Tv` · `Smartphone` · `Heart` · `Star` · `Flower` · `Leaf` · `Zap` · `Music` · `Gift`

### Subcategory

```typescript
{
  id: string
  category_id: string       // FK → categories
  store_id: string          // FK redundante para RLS sin JOIN
  name: string
  description: string | null
  image: string | null
  sort_order: integer
  created_at: timestamp
  updated_at: timestamp
}
```

> El `store_id` redundante existe para permitir políticas RLS sin hacer JOINs en cada consulta.

### Product

```typescript
{
  id: string
  store_id: string          // FK → stores
  category_id: string       // FK → categories
  subcategory_id: string | null  // FK → subcategories (requerido en modo nested)
  name: string              // >= 2 caracteres
  description: string       // máx. 300 caracteres
  price: integer            // COP, sin decimales, >= 0
  compare_at_price: integer | null  // Debe ser positivo o NULL
  available: boolean
  featured: boolean
  sort_order: integer
  created_at: timestamp
  updated_at: timestamp
}
```

### Product Image

```typescript
{
  id: string
  product_id: string        // FK → products
  store_id: string          // FK redundante para RLS
  url: string               // URL de Storage
  sort_order: integer       // 0–3 (máximo 4 imágenes por producto)
  created_at: timestamp
}
```

### Product Variant

```typescript
{
  id: string
  product_id: string        // FK → products
  name: string
  price_modifier: integer   // COP (puede ser negativo, positivo o cero)
  created_at: timestamp
}
```

### Order _(tabla creada, UI no incluida en MVP)_

```typescript
{
  id: string
  store_id: string
  items: JSONB              // Snapshot del carrito al momento del pedido
  customer_name: string
  customer_phone: string
  customer_email: string
  customer_address: string
  customer_notes: string
  status: string
  total: integer
  created_at: timestamp
  updated_at: timestamp
}
```

> Los items se guardan como JSONB para congelar el estado del pedido. Si el producto cambia o se elimina después, el historial de órdenes no se ve afectado.

### Profile

```typescript
{
  id: string                // Igual a auth.users.id
  email: string
  full_name: string | null
  avatar_url: string | null
  created_at: timestamp
  updated_at: timestamp
}
```

---

## Esquema de Base de Datos

Base de datos: **Supabase (PostgreSQL)**

### Migraciones (orden de aplicación)

| # | Migración | Descripción |
|---|---|---|
| 1 | `create_profiles` | Tabla + trigger `on_auth_user_created` (crea perfil automáticamente en signup) |
| 2 | `create_stores` | Tabla con todos los campos de tema, constraint de slug, RLS |
| 3 | `create_categories` | Tabla, índices, RLS |
| 4 | `create_subcategories` | Tabla con `store_id` redundante para RLS |
| 5 | `create_products` | Tabla, 7 índices, RLS |
| 6 | `create_product_images` | Tabla + trigger máx. 4 imágenes, RLS |
| 7 | `create_product_variants` | Tabla, RLS vía JOIN |
| 8 | `create_orders` | Tabla, INSERT público para checkout anónimo, RLS |
| 9 | `create_triggers` | Trigger `update_updated_at` en todas las tablas |
| 10 | `create_functions` | RPC: `get_public_storefront`, `get_store_stats`, `reorder_entities` |
| 11 | `create_storage` | 4 buckets (logos, banners, products, categories) + políticas |

### Row Level Security (RLS)

| Tabla | Propietario (auth) | Público (anon) |
|---|---|---|
| profiles | SELECT, UPDATE propio | Ninguno |
| stores | ALL propio | SELECT (solo `onboarding_completed = true`) |
| categories | ALL en stores propias | SELECT (stores completadas) |
| subcategories | ALL en stores propias | SELECT (stores completadas) |
| products | ALL en stores propias | SELECT (stores completadas) |
| product_images | ALL en stores propias | SELECT (stores completadas) |
| product_variants | ALL vía product | SELECT (stores completadas) |
| orders | SELECT, UPDATE en stores propias | INSERT (stores completadas) |

### Buckets de Storage _(todos con lectura pública)_

| Bucket | Uso | Proporción |
|---|---|---|
| `logos` | Logos de tiendas | 1:1 |
| `banners` | Banners de tiendas | 3:1 |
| `products` | Imágenes de productos | Variable |
| `categories` | Imágenes de categorías | Variable |

**Estructura de paths:**

```
{bucket}/{store_id}/{entity_id}/{sort_order}.webp
```

### Funciones de Base de Datos (RPC)

#### `get_public_storefront(slug TEXT) → JSONB`

Carga el storefront completo en un único round-trip. Retorna la tienda, categorías, subcategorías y productos con sus imágenes y variantes. Utilizada por el Server Component del storefront para evitar múltiples consultas en el render inicial.

#### `get_store_stats(store_id UUID) → JSONB`

Retorna métricas de la tienda:

```typescript
{
  productCount: number
  categoryCount: number
  availableCount: number
  orderCount: number
}
```

#### `reorder_entities(table, parent_column, parent_id, ordered_ids[]) → VOID`

Función genérica para actualizar `sort_order` en lote. Recibe la tabla, la columna padre, el ID padre y el arreglo de IDs en el nuevo orden.

### Triggers de Base de Datos

| Trigger | Descripción |
|---|---|
| `on_auth_user_created` | Inserta fila en `profiles` al crear usuario en `auth.users` |
| `set_updated_at` | Actualiza `updated_at` en todas las tablas principales |
| `enforce_max_product_images` | Bloquea INSERT si el producto ya tiene 4 imágenes |
| `protect_builtin_sections` | Bloquea DELETE de secciones built-in (futuro, no MVP) |

---

## Sistema de Templates

### Arquitectura de 5 capas

The template type system is split across five files in `src/types/templates/`:

| Layer | File | Purpose |
|---|---|---|
| 1. Primitives | `primitives.ts` | Union types: `CardStyle`, `HoverEffect`, `ImageRatio`, `BorderRadius`, `NavStyle`, `TabStyle`, `BannerHeight`, `HeaderStyle`, `FooterStyle`, `GridBreakpoint` |
| 2. Sections | `sections.ts` | `SectionId`, `SectionConfig` — per-section visibility and render order |
| 3. TemplateConfig | `template-config.ts` | Full contract each template must satisfy: `TemplateColorTokens`, `TemplateRadiusTokens`, `TemplateGridConfig`, `TemplateLayoutConfig`, root `TemplateConfig` interface |
| 4. StoreCustomization | `store-customization.ts` | Partial override blob saved to Supabase JSONB: `ThemeCustomization`, `LayoutCustomization`, `StoreCustomization` |
| 5. ResolvedConfig | `resolved-config.ts` | `ResolvedStoreConfig = TemplateConfig` (type alias — resolver deep-merges into the same shape), `MockStoreConfig`, `ConfigResolver` |

Shared customization sub-types (`BrandingConfig`, `ContentConfig`, `BusinessConfig`) live in `customization-sections.ts` — imported by both `TemplateConfig` and `StoreCustomization` to avoid circular dependencies.

All types are re-exported from `src/types/templates/index.ts`.

### Template File Structure

Each template lives under `src/templates/[name]/`:

```
src/templates/[name]/
├── config.ts          # Default values — object satisfies TemplateConfig
├── config-schema.ts   # Configurable surface — exports TemplateConfigSchema
├── index.tsx          # Entry point (exports the storefront component)
├── mock/
│   ├── data.ts        # Static mock data for preview rendering
│   └── assets.ts      # Image path constants
├── components/        # Visual components + route shell pages
├── hooks/             # e.g. useTemplateNav
├── context/           # CartContext (localStorage cart)
└── utils/             # grid-classes, layout-classes helpers
```

### Template Registry

`src/templates/registry.ts` exports two loaders:

- `getTemplateSchema(templateId)` — async, code-splits the schema per template (preferred for dashboard pages)
- `getTemplateSchemaSync(templateId)` — synchronous, static imports; included in the initial bundle

Currently registered: `"tech-premium"`.

### Config Resolver

`src/lib/resolveTemplateConfig.ts` — `resolveTemplateConfig(template, customization?) → ResolvedStoreConfig`

Merge strategy:

| Field | Strategy |
|---|---|
| `colors`, `radius`, `grid`, `layout` | Shallow merge — merchant keys win field-by-field |
| `sections` | Merchant array **replaces** template array entirely |
| `branding` | Shallow merge; `socialLinks` gets a second-level spread |
| `content` | Shallow merge; `heroBanner` gets a second-level spread; arrays (navLinks, footerServices, footerAssistance, productTabs, popularSearches) **replace** |
| `business` | Shallow merge |

### CSS Variable Generation

`src/lib/buildCssVars.ts` — `buildCssVars(config: ResolvedStoreConfig) → Record<string, string>`

| Token group | CSS var format | Example |
|---|---|---|
| Colors | `--t-{kebab-case-key}` | `cardBg` → `--t-card-bg` |
| Radius | `--t-radius-{key}` | `card` → `--t-radius-card` |
| Body font | `--font-body` | `"Inter"` |
| Heading font | `--font-heading`, `--template-heading-font` | `"var(--font-display)"` |

Grid and layout values are consumed as component props — they do NOT become CSS variables.

### TemplateConfigSchema

`src/types/templates/config-schema.ts` — describes the configurable surface consumed by the dashboard form renderer.

Root shape:

```typescript
interface TemplateConfigSchema {
  theme: ThemeSchemaConfig;         // colors[], radius[], fontPairs[]
  content: { tabGroups: ConfigTabGroup[] };
}
```

`ConfigTabGroup` → `ConfigSection | RepeatableConfigSection` → `ConfigField[]`

See `docs/template-system.md` for the complete field type reference.

### Implementación actual

- **tech-premium**: único template implementado (migrado desde tech2)
- Templates placeholder eliminados; 7+ pendientes de migración desde repo viejo
- Registry async/sync para code-splitting del schema por template

### Estructura de un template

```
src/templates/[name]/
├── config.ts          # satisfies TemplateConfig — colores, grid, layout, secciones
├── config-schema.ts   # TemplateConfigSchema — superficie configurable del dashboard
├── types.ts           # tipos específicos del template (opcional)
├── index.tsx          # entry point
├── mock/
│   ├── data.ts        # datos mock centralizados
│   └── assets.ts      # paths de imágenes
├── components/        # componentes visuales + shells de ruta
├── hooks/             # useTemplateNav
├── context/           # CartContext con localStorage
└── utils/             # grid-classes, layout-classes
```

### Personalización

- **Colores**: 32+ CSS variables (`--t-*`) inyectadas en `.template-scope`
- **Border radius**: configurable via CSS variables
- **Grid columns**: 1-6 por breakpoint, static Tailwind class maps (NUNCA clases dinámicas)
- **Layout options**: cardStyle, hoverEffect, imageRatio, tabStyle, bannerHeight, headerStyle, footerStyle
- **Secciones**: orden dinámico + visibilidad toggle
- **Theme Customizer**: drawer flotante con color pickers, sliders, drag & drop

### Routing

Sub-rutas reales por template (NO state-based):

| Ruta | Página |
|---|---|
| `/template/[name]/` | Home |
| `/template/[name]/producto/[id]` | Detalle de producto |
| `/template/[name]/catalogo` | Listing |
| `/template/[name]/carrito` | Carrito |
| `/template/[name]/buscar` | Búsqueda |
| `/template/[name]/checkout` | Checkout |

### CSS Variables

Prefijo genérico `--t-*` para TODAS las variables (no prefijos específicos por template). Variables inyectadas en el div `.template-scope` del layout. CERO colores hex hardcodeados en componentes.

### Tipos globales

- `src/types/templates/` — primitives, sections, template-config, store-customization, resolved-config, config-schema
- `src/types/store.ts` — StoreInfo, StorefrontProduct, Category (compartidos, display-optimized para el storefront)
- `src/types/cart.ts` — CartItem, Cart, CheckoutFormData
- `src/types/domain/` — Category, Subcategory, Product, ProductImage, ProductVariant, ActionResult (dashboard/DB-aligned)

### Resolver

`src/lib/resolveTemplateConfig.ts` — merge de defaults del template + overrides JSONB del merchant.

---

## Data Layer

### Repository Pattern

Interfaces defined in `src/lib/repositories/interfaces.ts`:

| Repository interface | Methods |
|---|---|
| `CategoryRepository` | `list`, `getById`, `create`, `update`, `delete`, `reorder`, `count` |
| `SubcategoryRepository` | `listByCategory`, `getById`, `create`, `update`, `delete`, `reorder`, `deleteAllByCategory` |
| `ProductRepository` | `list`, `getById`, `getBySlug`, `create`, `update`, `delete`, `reorder`, `toggleAvailable`, `toggleFeatured`, `count`, `countByCategory`, `switchCatalogModeToSimple` |
| `StoreRepository` | `get`, `updateCatalogMode` |

All mutation methods return `Promise<ActionResult<T>>`. All read methods are async for Supabase migration compatibility.

### localStorage Implementations

`src/lib/repositories/local-storage/`:

| File | Class |
|---|---|
| `category.repository.ts` | `LocalCategoryRepository` |
| `subcategory.repository.ts` | `LocalSubcategoryRepository` |
| `product.repository.ts` | `LocalProductRepository` |
| `store.repository.ts` | `LocalStoreRepository` |

**localStorage key convention:** `tiendri_{storeId}_{entity}`

Examples: `tiendri_demo-store_categories`, `tiendri_demo-store_products`, `tiendri_demo-store_subcategories`

**Image storage:** Product images are stored as base64 data URLs (`ProductImage.url`). This is the localStorage phase only — the Supabase phase will replace these with CDN URLs.

### Factory

`src/lib/repositories/factory.ts`

- `getStoreId()` — returns `"demo-store"` (fixed until auth is implemented)
- `getCategoryRepository()`, `getSubcategoryRepository()`, `getProductRepository()`, `getStoreRepository()` — singleton instances, stable references on every call
- `getRepositories()` — returns all four as a frozen object (used by hooks)

Singletons are created at module level to prevent `useCallback` dependency arrays from seeing a changed `repo` reference and triggering infinite re-renders.

### React Hooks

`src/hooks/use-repositories.ts` — client hooks wrapping the repository layer:

| Hook | Signature | Returns |
|---|---|---|
| `useCategories` | `(storeId?)` | `categories`, `isLoading`, `error`, `create`, `update`, `remove`, `reorder`, `refresh` |
| `useSubcategories` | `(storeId?, categoryId)` | `subcategories`, `isLoading`, `error`, `create`, `update`, `remove`, `reorder`, `refresh` |
| `useProducts` | `(storeId?, filters?)` | `products`, `isLoading`, `error`, `create`, `update`, `remove`, `toggleAvailable`, `toggleFeatured`, `reorder`, `refresh` |

`reorder` applies an optimistic local state update after a successful repository call.
`toggleAvailable` and `toggleFeatured` also apply optimistic updates using the updated entity returned by `ActionResult.data`.

---

## Domain Types

**Location:** `src/types/domain/` — DB-aligned types used in the dashboard. Import from the barrel `src/types/domain/index.ts`.

| File | Exports |
|---|---|
| `category.ts` | `CategoryIcon` (20-value union), `Category`, `CreateCategoryInput`, `UpdateCategoryInput` |
| `subcategory.ts` | `Subcategory`, `CreateSubcategoryInput`, `UpdateSubcategoryInput` |
| `product.ts` | `Product`, `ProductImage`, `ProductVariant`, `CreateProductInput`, `UpdateProductInput`, `ProductFilters` |
| `action-result.ts` | `ActionResult<T>` |

### ActionResult<T> Pattern

```typescript
type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: { code: string; message: string; field?: string } }
```

All repository mutations return `ActionResult<T>`. `code` follows tiendri-rules.md §3.2. `message` is in Colombian Spanish. `field` identifies the specific input when applicable.

### Domain vs Storefront Types

| Concern | Location | Optimized for |
|---|---|---|
| Dashboard CRUD | `src/types/domain/` | DB alignment, mutations, RLS |
| Storefront rendering | `src/types/store.ts` | Display (StorefrontProduct, lighter shape) |

Templates **must not** import from `src/types/domain/`. The storefront consumes `StorefrontProduct` from `src/types/store.ts`.

### Zod Validators

`src/lib/validators/`:

| File | Schemas |
|---|---|
| `category.schema.ts` | `categorySchema`, `updateCategorySchema`, `subcategorySchema`, `updateSubcategorySchema` |
| `product.schema.ts` | Product creation and update schemas |
| `store-customization.schema.ts` | StoreCustomization blob validation |

Validators are used server-side (Server Actions) before any repository mutation.

---

## Business Rules

### Catalog Modes

| Mode | Description |
|---|---|
| `simple` | Products belong directly to categories — no subcategory level |
| `nested` | Products belong to a subcategory within a category |

Switching `nested → simple` nullifies all `subcategory_id` fields and deletes all subcategories. Validate first with `validateModeSwitch()` to check for potential orphans.

### Entity Limits

| Entity | Limit |
|---|---|
| Categories per store | 50 |
| Subcategories per category | 20 |
| Products per store | 1000 |
| Images per product | 4 |

### Cascade Deletes

- **Category deleted** → all its subcategories deleted → all products in those subcategories deleted + all products directly in the category deleted
- **Subcategory deleted** → orphaned products either deleted (`orphanAction: 'delete'`) or reassigned (`orphanAction: 'move'`, `targetSubcategoryId` required)

### Slug Uniqueness

Slugs are unique **within a store** (not globally). The pattern is `^[a-z0-9][a-z0-9-]*[a-z0-9]$` — lowercase alphanumeric with hyphens, cannot start or end with a hyphen, minimum 2 characters.

---

## Decisiones de Arquitectura

### 1. Precios como INTEGER en COP

En la práctica, los pequeños negocios en Colombia no usan centavos. Guardar el precio como entero elimina toda lógica de puntos flotantes y simplifica las operaciones aritméticas del carrito y los totales.

### 2. `store_id` redundante en subcategorías

Permite escribir políticas RLS directas sobre la tabla `subcategories` sin necesidad de hacer un JOIN a `categories` en cada consulta. Pequeño costo de almacenamiento a cambio de un gran beneficio en simplicidad y performance.

### 3. Variantes: estrategia de reemplazo completo en actualización

Al editar variantes de un producto, se hace `DELETE` de todas las existentes y luego `INSERT` de las nuevas. Más simple que implementar un diff/merge que detecte cambios, agrega y elimina individualmente.

### 4. Carrito y favoritos en localStorage

Los visitantes del storefront son anónimos. Guardar este estado en localStorage elimina la necesidad de un backend, sesiones anónimas y políticas RLS adicionales para datos efímeros.

### 5. Imágenes de producto en tabla separada

Permite control individual por imagen: eliminar una sin afectar las otras, reordenarlas de forma independiente, y facilita aplicar el límite de 4 imágenes via trigger.

### 6. Orders como snapshot JSONB

Al momento de crear una orden, los items del carrito se serializan y congelan en JSONB. Si el merchant cambia el precio de un producto o lo elimina después, el historial de órdenes sigue siendo coherente.

### 7. Server Actions como capa de abstracción

El frontend no "sabe" que existe Supabase. Llama funciones TypeScript tipadas (Server Actions) que internamente ejecutan las consultas. Esto desacopla la UI del proveedor de backend.

### 8. ISR con `revalidatePath()`

Las páginas de storefront usan Incremental Static Regeneration. Cuando el merchant realiza cambios desde el dashboard, el Server Action correspondiente llama a `revalidatePath()` para invalidar el cache automáticamente.

### 9. Rate limiting in-memory via `globalThis`

Aceptable para MVP en Vercel. Se resetea en cold starts, lo que es un trade-off conocido y asumido. No requiere Redis ni infraestructura adicional en esta etapa.

### 10. Onboarding crea la tienda atómicamente al final

En vez de crear la tienda al inicio del onboarding e ir actualizando paso a paso, se acumula el estado en el cliente y se hace un único `INSERT` al completar el último paso. Evita tiendas a medias en la base de datos.

### 11. `getUser()` en lugar de `getSession()`

`getUser()` valida el token contra Supabase en cada llamada, lo que lo hace más seguro contra session spoofing. `getSession()` puede devolver datos del token local sin validarlos con el servidor.

### 12. Doble validación (servidor + cliente)

- **Servidor**: Zod en Server Actions valida todos los datos antes de tocar la base de datos.
- **Cliente**: Validación visual inmediata para feedback de UX sin esperar el round-trip al servidor.

Ambas capas son necesarias. La validación del cliente es UX; la del servidor es seguridad.

### 13. Optimistic updates con ROLLBACK_SNAPSHOT

Para toggles de estado (disponibilidad, destacado), el cambio se aplica inmediatamente en el estado local antes de que la Server Action responda. Si la acción falla, se restaura el estado anterior desde un `ROLLBACK_SNAPSHOT`. Esto elimina la percepción de latencia en operaciones frecuentes.

---

## Arquitectura Frontend

### Gestión de Estado

```
StoreContext (createContext + useReducer)
  └── 25+ acciones tipadas
  
useStoreActions (hook de abstracción)
  ├── isBackend = !!user && !!storeId
  ├── true  → llama Server Actions (Supabase)
  └── false → opera sobre localStorage (modo demo)
```

El hook `useStoreActions` es el punto central que determina si el store está en modo autenticado o en modo demo. Ningún componente llama directamente a Server Actions ni a localStorage.

### Arquitectura dual del Storefront

```
Server Component (wrapper)
  ├── Llama getPublicStorefront(slug)
  ├── Exporta generateMetadata()
  └── Pasa data como prop al Client Component

Client Component
  ├── Recibe initialData: CatalogStore | null
  ├── Si initialData !== null → usa datos del servidor
  └── Si initialData === null → fallback a localStorage (demos)
```

Esta arquitectura permite:
- SEO completo vía SSR/ISR
- Interactividad del carrito en el cliente
- Demos funcionales sin cuenta registrada

### Helpers del Catálogo

| Función | Descripción |
|---|---|
| `getVisibleProducts()` | Filtra por categoría, subcategoría y búsqueda; ordena por destacado → `sort_order` |
| `getCatalogTree()` | Construye el árbol `cat → subcat → products` según el `catalog_mode` |
| `validateModeSwitch()` | Verifica que no haya productos huérfanos antes de cambiar a modo nested |

---

## Workflow Git

```
develop  ←── trabajo diario, features, fixes
   │
   └──► main  ←── producción (auto-deploy en Vercel al hacer push)
```

- Todo el trabajo ocurre en `develop`
- Solo se mergea a `main` cuando el estado es deployable
- Push a `main` dispara el pipeline de Vercel automáticamente
- Commits en formato **Conventional Commits**

```
feat: descripción corta
fix: descripción corta
refactor: descripción corta
chore: descripción corta
docs: descripción corta
```

---

_Documento generado el 28/04/2026. Mantener actualizado ante cualquier cambio arquitectónico._
