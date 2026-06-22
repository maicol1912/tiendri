# Tiendri v2 — Visión General del Sistema

Documento técnico que explica cómo funciona la aplicación completa. Para alguien que arranca de cero en el proyecto.

---

## 1. Qué es Tiendri

SaaS para comerciantes colombianos. El merchant crea su tienda online con catálogo de productos y recibe pedidos vía WhatsApp. El sistema funciona así:

1. El merchant se registra, elige un "vibe" (estilo visual) y completa el onboarding
2. Se le asigna un template que define la apariencia de su storefront
3. Desde el dashboard configura productos, categorías, branding, colores, secciones
4. Los clientes entran al storefront (`/mi-tienda`), navegan el catálogo y arman un pedido
5. Al confirmar, se genera un mensaje de WhatsApp con el resumen del pedido

---

## 2. Stack Tecnológico

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| Next.js | 16 (App Router) | Framework principal, Server Components + Server Actions |
| React | 19 | UI con Server/Client Component split |
| TypeScript | strict | Tipado en toda la app |
| Tailwind CSS | v4 | Estilos utility-first |
| shadcn/ui | — | Primitivas de UI (Button, Dialog, Sheet, etc.) |
| Supabase | — | Base de datos (PostgreSQL), Auth, Storage, RLS |
| Lenis | — | Scroll smoothing en la landing |
| Vercel | — | Deploy automático (push a `main` = producción) |

---

## 3. Arquitectura General

### Rutas de la aplicación

```
src/app/
├── (marketing)/          → Landing page pública
├── (auth)/               → Login / Registro (auth con Supabase)
├── (onboarding)/         → Wizard de 5 pasos para nuevos merchants
├── (dashboard)/          → Panel de administración del merchant
│   └── dashboard/
│       ├── configuracion/  → Personalización visual + contenido
│       ├── productos/      → CRUD de productos
│       └── categorias/     → CRUD de categorías
├── template/[templateName]/ → Preview de templates (público, con ThemeCustomizer)
└── [slug]/                  → Storefront real del merchant (público)
```

### Flujo de un request al storefront

```
Browser → /mi-tienda
  → [slug]/layout.tsx (Server Component)
    → getStoreBySlug("mi-tienda")          // Supabase query + JOIN store_appearance
    → getTemplateConfig(store.template_id)  // Dynamic import del manifest
    → getTemplateSchema(store.template_id)  // Dynamic import del config-schema
    → appearanceToCustomization(store.store_appearance, templateId)  // Bridge
    → resolveTemplateConfig(defaults, customization, schema)  // 3-layer merge
    → buildCssVars(resolvedConfig)          // → CSS custom properties --t-*
    → getTemplateManifest(templateId, resolvedConfig)  // + structural variants mapping
    → <TemplateLayout manifest={manifest} config={resolved} ... />
```

### Flujo de un request al preview

```
Browser → /template/tech-premium
  → template/[templateName]/page.tsx (Server Component)
    → getTemplateConfig("tech-premium")     // manifest defaults
    → resolveTemplateConfig(defaults)       // sin customización = puro default
    → getTemplateMockData("tech-premium")   // datos de demo
    → autoPopulateProductGroups(config, mockProducts)  // llenar grupos
    → <TemplateLayout ... />
```

---

## 4. Sistema de Templates

### 8 templates implementados

| Template | Industria | Hero | Secciones únicas |
|----------|-----------|------|-----------------|
| `tech-premium` | Tecnología, gadgets | PROMO_CARD | popular, banners |
| `fashion` | Moda, ropa | EDITORIAL | featured, editorial |
| `furniture-dark` | Muebles (oscuro) | FULL_BLEED | video |
| `furniture-light` | Muebles (claro) | CONTAINED | — |
| `beauty-soft` | Belleza (suave) | SPLIT | — |
| `beauty-elegant` | Belleza (elegante) | CARD_SPLIT | — |
| `decor-warm` | Decoración, hogar | CAROUSEL | bestSellers |
| `food-night` | Comida, restaurantes | PROMO_STRIP | — |

### Estructura de archivos por template

```
src/templates/tech-premium/
├── manifest.ts        → Defaults de tema + declaración de variantes (satisfies TemplateManifest)
├── config-schema.ts   → Schema de lo que el merchant puede configurar desde el dashboard
├── palettes.ts        → Paletas de color disponibles para este template
├── ui-config.ts       → Configuración del ThemeCustomizer (paneles, opciones)
└── mock/
    ├── data.ts        → Datos de demo (store, products, categories)
    └── assets.ts      → URLs de imágenes de demo
```

### Template Registry (data-driven)

Los templates se registran en objetos `Record<string, () => Promise<...>>`. No hay switch statements.

```typescript
// src/templates/registry.ts
const CONFIG_LOADERS: Record<string, () => Promise<TemplateConfig>> = {
  "tech-premium": () => import("./tech-premium/manifest").then(m => m.techPremiumManifest),
  "fashion":      () => import("./fashion/manifest").then(m => m.fashionManifest),
  // ... 8 entries total
};

// Agregar un 9º template = agregar 1 línea acá + 1 en SCHEMA_LOADERS + 1 en MOCK_LOADERS
```

El fallback para IDs desconocidos es `DEFAULT_TEMPLATE_ID` (`"tech-premium"`) definido en `src/shared/constants.ts`.

---

## 5. Pipeline de Renderizado

```
┌─────────────────────────────────────────────────────────────────────┐
│ 1. DATOS                                                            │
│    getStoreBySlug() → SELECT *, store_appearance(*) FROM stores     │
│    Devuelve StoreWithAppearance (store + appearance row)             │
│                                                                     │
│ 2. BRIDGE                                                           │
│    appearanceToCustomization(appearance, templateId)                 │
│    Convierte StoreAppearanceRow → StoreCustomization                │
│                                                                     │
│ 3. MERGE (3 capas)                                                  │
│    resolveTemplateConfig(templateDefaults, customization, schema)    │
│    Capa 1: defaults del manifest                                    │
│    Capa 2: tokens de la paleta seleccionada                         │
│    Capa 3: overrides del merchant                                   │
│    Resultado: ResolvedStoreConfig                                   │
│                                                                     │
│ 4. CSS VARS                                                         │
│    buildCssVars(resolvedConfig)                                     │
│    Genera Record<string, string> con --t-primary, --t-background,   │
│    --t-radius-card, --t-type-heading-weight, --t-space-section, etc.│
│    Se inyectan como style={{ ...cssVars }} en el div .template-scope │
│                                                                     │
│ 5. MANIFEST                                                        │
│    getTemplateManifest(templateId, resolvedConfig)                   │
│    Mapea structuralVariants del merchant → variant slots del manifest│
│    (heroVariant → hero, cardContentLayout → productCard, etc.)      │
│                                                                     │
│ 6. RENDER                                                           │
│    TemplateLayout → HeaderComponent + Shell + FooterComponent       │
│    Shell depende de la ruta: HomeShell, ListingShell, CartShell...   │
│    HomeShell → CoreHomePage → SECTION_REGISTRY dispatch             │
└─────────────────────────────────────────────────────────────────────┘
```

### resolveTemplateConfig — merge de 3 capas

```
Template defaults (manifest.ts)
  ↓ spread
Palette tokens (si paletteId está seteado en la customización)
  ↓ spread (ganan sobre defaults)
Merchant overrides (store_appearance.theme.colors, etc.)
  ↓ spread (ganan sobre paleta y defaults)
= ResolvedStoreConfig
```

Las secciones (`sections[]`) del merchant REEMPLAZAN el array completo del template (no se mergean). Branding, content, business hacen shallow merge.

### buildCssVars — generación de CSS custom properties

Toma un `ResolvedStoreConfig` y produce un `Record<string, string>`:

- **Colores**: itera `config.colors` → `--t-{kebab-key}` (ej: `--t-primary`, `--t-foreground`)
- **Radius**: itera `config.radius` → `--t-radius-{key}` (ej: `--t-radius-card`)
- **Tipografía**: `config.theme.typography.*` → `--t-type-heading-weight`, `--t-type-heading-size`, etc.
- **Spacing**: `config.layout.spacingDensity` → `--t-space-section`, `--t-space-gap`, etc.
- **Grid density**: `config.layout.gridDensity` → override de `config.grid.products.mobile/desktop`

Los CSS vars se inyectan en un `<div style={cssVars}>` que envuelve todo el template. Los componentes los consumen con `var(--t-primary)`, `var(--t-radius-card)`, etc.

---

## 6. Sistema de Variantes — 12 Registries

Los templates no hardcodean diseños. Declaran QUÉ variante usar para cada slot, y el registry resuelve el componente.

### 7 slots de layout (required en TemplateVariants)

| Slot | Registry | Variantes disponibles |
|------|----------|----------------------|
| `header` | HEADER_REGISTRY | DEFAULT, GLASS, GREETING, GREETING_SIMPLE, MINIMAL |
| `hero` | HERO_REGISTRY | FULL_BLEED, CONTAINED, SPLIT, TEXT_ONLY, CAROUSEL, CARD_SPLIT, EDITORIAL, PROMO_STRIP, PROMO_CARD |
| `productCard` | PRODUCT_CARD_REGISTRY | BELOW_IMAGE, OVERLAY_BOTTOM, OVERLAY_FULL, SIDE_BY_SIDE, WITH_DESCRIPTION |
| `footer` | FOOTER_REGISTRY | COLUMNS, COMPACT |
| `bottomNav` | BOTTOM_NAV_REGISTRY | EDGE, FLOATING_PILL, DOT_INDICATOR |
| `categoryNav` | CATEGORY_NAV_REGISTRY | CHIPS, GRID, HORIZONTAL_SCROLL, TABS, COLUMNAR |
| `searchBar` | SEARCH_BAR_REGISTRY | INLINE, ICON_TRIGGER |

### 5 slots de sección (optional en TemplateVariants)

| Slot | Registry | Variantes disponibles |
|------|----------|----------------------|
| `bestSellers` | BEST_SELLERS_REGISTRY | DEFAULT |
| `popular` | POPULAR_REGISTRY | DEFAULT |
| `banners` | BANNERS_REGISTRY | DEFAULT |
| `editorial` | EDITORIAL_REGISTRY | DEFAULT |
| `video` | VIDEO_REGISTRY | DEFAULT |

### Cómo funciona el dispatch

**Slots de layout** (header, footer, bottomNav): se resuelven en `TemplateLayout.tsx`

```typescript
const HeaderComponent = HEADER_REGISTRY[manifest.variants.header];   // ej: HEADER_REGISTRY["GLASS"]
const FooterComponent = FOOTER_REGISTRY[manifest.variants.footer];   // ej: FOOTER_REGISTRY["COMPACT"]
```

**Slots de sección** (bestSellers, popular, banners, editorial, video): fluyen así:

```
manifest.variants.popular = "DEFAULT"
  → HomeShell pasa sectionVariants={{ popular: "DEFAULT", ... }} a CoreHomePage
    → CoreHomePage itera config.sections[], para cada sección:
        const sectionVariant = sectionVariants[section.id]  // ej: "DEFAULT"
        <Renderer variant={sectionVariant} {...sectionProps} />
          → PopularSection (thin dispatcher)
            → POPULAR_REGISTRY["DEFAULT"]
              → DEFAULT.tsx (componente real con el UI)
```

**Slots que NO son variantes** (hero, categoryNav, productCard dentro de secciones): fluyen como props directos a través de `SectionRendererProps.variants`.

### Declaración en un manifest

```typescript
// src/templates/tech-premium/manifest.ts
export const techPremiumManifest = {
  // ...theme defaults...
  variants: {
    // 7 required
    header: "DEFAULT",
    footer: "COLUMNS",
    bottomNav: "EDGE",
    productCard: "BELOW_IMAGE",
    hero: "PROMO_CARD",
    categoryNav: "HORIZONTAL_SCROLL",
    searchBar: "INLINE",
    // Optional section-level (solo los que el template usa)
    popular: "DEFAULT",
  },
  sections: [
    { id: "hero", visible: true },
    { id: "categories", visible: true },
    { id: "products", visible: true },
    { id: "popular", visible: true },
  ],
} as const satisfies TemplateManifest;
```

### Agregar una nueva variante

3 archivos:

```
src/templates/_variants/{slot}/
├── NEW_VARIANT.tsx   → Componente con el UI
└── (update) types.ts → Agregar "NEW_VARIANT" al union type
└── (update) index.ts → Agregar al registry con dynamic(() => import("./NEW_VARIANT"))
```

---

## 7. Sistema de Secciones — SECTION_REGISTRY

### 12 secciones registradas

```typescript
// src/templates/_core/sections/index.ts
export const SECTION_REGISTRY: Record<SectionId, ComponentType<SectionRendererProps>> = {
  hero:         HeroSection,
  categories:   CategoriesSection,
  products:     ProductsSection,       // dispatcher → product groups (tabs/stacked) o legacy
  collections:  CollectionsSection,
  editorial:    EditorialSection,       // thin dispatcher → EDITORIAL_REGISTRY
  banners:      BannersSection,         // thin dispatcher → BANNERS_REGISTRY
  popular:      PopularSection,         // thin dispatcher → POPULAR_REGISTRY
  video:        VideoSectionAdapter,    // thin dispatcher → VIDEO_REGISTRY
  featured:     FeaturedSection,
  searchBar:    SearchBarSection,
  discounts:    DiscountsSection,
  bestSellers:  BestSellersSectionAdapter,  // thin dispatcher → BEST_SELLERS_REGISTRY
};
```

`CoreHomePage` itera `config.sections.filter(s => s.visible)` y renderiza cada sección vía el registry.

### getSectionField — configuración de 3 niveles

```typescript
getSectionField<T>(key, sectionConfig, globalValue, defaultValue)
```

Prioridad:
1. `sectionConfig[key]` — configuración per-sección del merchant (ej: "título de esta sección")
2. `globalValue` — valor global del template (ej: `config.grid.products.mobile`)
3. `defaultValue` — fallback hardcodeado

### Product Groups

La sección `products` actúa como dispatcher:

- Si hay `productGroups` configurados con productos asignados:
  - `displayMode: "tabs"` → `TabBarProductGroups` (tabs interactivos con filtrado real)
  - `displayMode: "stacked"` → `StackedProductGroups` (cada grupo como subsección)
- Si no hay groups configurados → `LegacyProductsLayout` (comportamiento original)

Los grupos se configuran desde el dashboard en el tab "Grupos de Productos".

---

## 8. Persistencia — store_appearance

### Tabla store_appearance

Relación 1:1 con `stores` vía `store_id`. Columnas tipadas (no un blob JSONB):

| Columna | Tipo | Contenido |
|---------|------|-----------|
| `palette_id` | text | ID de la paleta de colores activa |
| `font_pair` | text | ID del font pair (ej: "elegante", "minimalista") |
| `theme` | jsonb | Colores, radius, tipografía (overrides del merchant) |
| `layout` | jsonb | Grid, density, layout options |
| `variants` | jsonb | Structural variant overrides (heroVariant, cardContentLayout, etc.) |
| `sections` | jsonb | Array de `{id, visible, config}` — orden y visibilidad de secciones |
| `content` | jsonb | navLinks, heroBanner, footerServices, productGroups, etc. |
| `branding` | jsonb | logo, storeName, description, whatsapp, socialLinks |
| `version` | int | Optimistic concurrency |

### Dashboard actions

```
src/app/(dashboard)/dashboard/configuracion/actions.ts

updateTheme()     → upsertAppearance({ theme: merged })
updateBranding()  → upsertAppearance({ branding: merged })
updateContent()   → upsertAppearance({ content: merged })
updateBusiness()  → stores.business_info (tabla stores, NO store_appearance)
updateCustomizationSection(key, data) → rutea al column correcto de store_appearance
```

`upsertAppearance()` usa Supabase `.upsert({ store_id, ...patch }, { onConflict: "store_id" })` — crea o actualiza en un solo query.

### Bridge de compatibilidad

`resolveTemplateConfig` recibe `StoreCustomization` (la interfaz original). La función `appearanceToCustomization()` en `getStoreBySlug.ts` convierte `StoreAppearanceRow → StoreCustomization` para mantener la firma intacta.

---

## 9. Dashboard de Configuración

### Tabs del dashboard

```
/dashboard/configuracion

┌──────────────────────────────────────────────────────────────────┐
│ Identidad │ [Tabs dinámicos del schema] │ Secciones │           │
│           │                              │           │           │
│ Grupos de Productos │ Apariencia │ Negocio                      │
└──────────────────────────────────────────────────────────────────┘
```

| Tab | Qué configura | Persistencia |
|-----|---------------|-------------|
| **Identidad** | Logo, nombre, descripción, WhatsApp, redes sociales | `store_appearance.branding` |
| **[Dynamic tabs]** | Contenido del hero, nav links, footer — varía por template según `config-schema.ts` | `store_appearance.content` |
| **Secciones** | Drag-to-reorder, visibility toggles, campos per-sección | `store_appearance.sections` (vía layout) |
| **Grupos de Productos** | Crear/editar grupos, modo tabs/stacked, asignar productos, banners | `store_appearance.content.productGroups` |
| **Apariencia** | Template actual (read-only), paleta, colores, font pair, radius | `store_appearance.theme` + `palette_id` + `font_pair` |
| **Negocio** | Ciudad, dirección, horarios, métodos de pago, envío, moneda | `stores.business_info` |

### Schema-driven forms

Los tabs dinámicos se generan automáticamente desde el `config-schema.ts` de cada template:

```
config-schema.ts define tabGroups[]
  → cada tabGroup tiene sections[]
    → cada section tiene fields[]
      → DynamicField renderiza el campo según su type (text, image, color, select, range, etc.)
```

Componentes en `src/components/dashboard/schema-form/`:
- `DynamicField` — renderiza UN campo según su type
- `DynamicSection` — renderiza una sección con N campos
- `RepeatableSection` — sección con items dinámicos (ej: navLinks[])
- `DynamicTabContent` — renderiza un tab completo iterando sus sections
- `SectionsAccordionTab` — drag-to-reorder + visibility switch + config per-sección

### Template switcher

El switcher de template es **read-only** — muestra el template actual pero no permite cambiarlo. Para cambiar de template, el merchant debe contactar soporte.

---

## 10. ThemeCustomizer (herramienta de preview)

### Qué es

Un drawer flotante que aparece SOLO en las rutas de preview (`/template/[templateName]`). Permite a los visitantes ver qué personalizaciones son posibles.

### Persistencia

- **Guarda en localStorage** del navegador del visitante
- **NO guarda en Supabase** — es una herramienta de demostración, no de merchant
- Los cambios se pierden al cerrar el navegador

### 6 paneles

| Panel | Qué controla |
|-------|-------------|
| **Tipografía** | Font pair, heading weight/scale/transform/spacing |
| **Colores** | Paleta, overrides por token, color strategy |
| **Formas y bordes** | Radius (card, category, button), border radius scale |
| **Grid y estructura** | Grid density, spacing, columns mobile/desktop |
| **Cards y páginas** | Card layout, hero variant, category nav style, add-to-cart style |
| **Secciones** | Drag-to-reorder, visibility toggles |

### Qué funciona en vivo y qué no

**Funciona en vivo** (basado en CSS vars — se aplica instantáneamente):
- Colores, paletas, overrides de color
- Font pair
- Heading weight, scale, transform, spacing
- Radius (card, category, button)
- Spacing density, layout density
- Border radius scale, image border radius

**NO funciona en vivo** (Problem A — static config split):
- Structural variants (hero, productCard, categoryNav) — TemplateLayout recibe props estáticos del server
- Section reorder/visibility — CoreHomePage lee `config.sections` como prop, no del contexto del customizer
- Grid density/columns — los componentes usan `config.grid.*` como prop estático

La razón: `TemplateLayout` y `ThemeCustomizer` son componentes hermanos. El customizer puede modificar CSS vars (que cascadean vía el DOM), pero no puede cambiar los React props que `TemplateLayout` ya recibió del server.

---

## 11. Onboarding

### Wizard de 5 pasos

1. **Store name** — Nombre de la tienda
2. **Vibe** — Selección de estilo visual
3. **Category** — Tipo de negocio
4. **Products** — Agregar primeros productos
5. **WhatsApp** — Configurar número de contacto

### Mapping vibe → template

| Vibe | Template asignado | Público objetivo |
|------|-------------------|-----------------|
| Elegante | `beauty-elegant` | Joyería, boutique, beauty |
| Moderno | `tech-premium` | Tecnología, moda juvenil, gaming |
| Energético | `fashion` | Ropa deportiva, moda caribeña |
| Cálido | `decor-warm` | Artesanías, café especial, vintage |
| Catálogo | `furniture-light` | Abarrotes, ferretería, B2B |

Definido en `src/onboarding/vibe-preset-map.ts`.

---

## 12. Escalabilidad

### Agregar un template nuevo

| Paso | Archivo | Qué hacer |
|------|---------|-----------|
| 1 | `src/templates/{name}/manifest.ts` | Definir tema, colores, grid, sections, variants |
| 2 | `src/templates/{name}/config-schema.ts` | Definir qué puede configurar el merchant |
| 3 | `src/templates/{name}/palettes.ts` | Definir paletas de color |
| 4 | `src/templates/{name}/ui-config.ts` | Configurar paneles del ThemeCustomizer |
| 5 | `src/templates/{name}/mock/data.ts` | Datos de demo |
| 6 | `src/templates/registry.ts` | 1 línea en `CONFIG_LOADERS` + 1 en `SCHEMA_LOADERS` |
| 7 | `src/templates/mock-loader.ts` | 1 línea en `MOCK_LOADERS` |

### Agregar una variante nueva

3 archivos en `src/templates/_variants/{slot}/`:
1. `NEW_VARIANT.tsx` — componente con el UI
2. Actualizar `types.ts` — agregar al union type
3. Actualizar `index.ts` — agregar al registry con `dynamic(() => import("./NEW_VARIANT"))`

### Agregar una sección nueva

4-6 archivos:
1. `SectionId` union en `src/types/templates/sections.ts` — agregar el nuevo ID
2. `src/templates/_core/sections/NewSection.tsx` — thin dispatcher
3. `src/templates/_variants/{section}/` — types.ts + index.ts + DEFAULT.tsx
4. `SECTION_REGISTRY` en `src/templates/_core/sections/index.ts` — agregar entrada
5. `extractSectionProps` en `src/templates/_core/pages/extract-section-props.ts` — agregar props derivadas si necesario

### Anti-patterns eliminados

- ❌ Switch statements en registry → ✅ Objetos `Record<string, () => Promise<...>>`
- ❌ `"tech-premium"` hardcodeado en 14+ lugares → ✅ `DEFAULT_TEMPLATE_ID` constante
- ❌ Diseños inline en secciones → ✅ Variant registries con dispatch
- ❌ `normalizeCategories()` shim → ✅ Mock data canónica
- ❌ `stores.customization` JSONB → ✅ `store_appearance` con columnas tipadas

---

## 13. Estructura de Archivos Clave

```
src/
├── app/
│   ├── (marketing)/                 → Landing page
│   ├── (auth)/                      → Login/Register con tsParticles
│   ├── (onboarding)/onboarding/     → Wizard de 5 pasos
│   ├── (dashboard)/dashboard/
│   │   ├── configuracion/           → Server Actions + Client forms
│   │   │   ├── actions.ts           → upsertAppearance, read/update functions
│   │   │   ├── page.tsx             → Server Component (fetch data)
│   │   │   ├── configuracion-client.tsx → Client Component (tabs, forms)
│   │   │   └── tabs/               → branding, theme, business, product-groups
│   │   ├── productos/               → CRUD productos
│   │   └── categorias/              → CRUD categorías
│   ├── template/[templateName]/     → Preview con ThemeCustomizer
│   └── [slug]/                      → Storefront real del merchant
│
├── catalog/
│   ├── getStoreBySlug.ts            → Query + JOIN store_appearance + bridge
│   ├── resolveTemplateConfig.ts     → 3-layer merge + autoPopulateProductGroups
│   └── buildCssVars.ts              → Config → CSS custom properties
│
├── templates/
│   ├── registry.ts                  → CONFIG_LOADERS + SCHEMA_LOADERS (data-driven)
│   ├── mock-loader.ts               → MOCK_LOADERS (data-driven)
│   ├── manifest-resolver.ts         → structuralVariants → manifest mapping
│   ├── _core/
│   │   ├── TemplateLayout.tsx       → Frame orquestador (header + shell + footer)
│   │   ├── pages/CoreHomePage.tsx   → SECTION_REGISTRY dispatch loop
│   │   ├── shells/                  → HomeShell, ListingShell, CartShell, etc.
│   │   ├── sections/               → 12 section dispatchers + product-groups/
│   │   └── cart/                    → CartProvider, useCart
│   ├── _variants/                   → 12 variant registries
│   │   ├── header/                  → 5 variantes
│   │   ├── hero/                    → 9 variantes
│   │   ├── product-card/            → 5 variantes
│   │   ├── footer/                  → 2 variantes
│   │   ├── bottom-nav/              → 3 variantes
│   │   ├── category-nav/            → 5 variantes
│   │   ├── search-bar/              → 2 variantes
│   │   ├── banners/                 → 1 variante (DEFAULT)
│   │   ├── best-sellers/            → 1 variante (DEFAULT)
│   │   ├── editorial/               → 1 variante (DEFAULT)
│   │   ├── popular/                 → 1 variante (DEFAULT)
│   │   └── video/                   → 1 variante (DEFAULT)
│   ├── _shared/                     → Hooks, utils, components compartidos
│   └── {template-name}/            → 8 template directories
│
├── components/
│   ├── ui/                          → Primitivas shadcn/ui
│   ├── shared/                      → ConfirmDialog, DataTable, ProductPicker, etc.
│   ├── dashboard/                   → Sidebar, header, breadcrumbs
│   │   └── schema-form/             → DynamicField, DynamicSection, SectionsAccordionTab
│   └── customizer/                  → ThemeCustomizer + 6 paneles
│
├── shared/
│   ├── constants.ts                 → DEFAULT_TEMPLATE_ID
│   ├── fonts.ts                     → 15 font pairs en 5 grupos
│   ├── format.ts                    → formatPrice, formatPriceCurrency
│   └── validators/                  → Zod schemas
│
├── types/
│   ├── templates/                   → TemplateConfig, TemplateManifest, TemplateVariants,
│   │                                  ResolvedStoreConfig, StoreCustomization, SectionId
│   └── domain/                      → Category, Product, Store, Cart, ActionResult
│
├── infrastructure/
│   ├── supabase/                    → Clients (client, server, middleware)
│   ├── database.types.ts            → Tipos generados de Supabase (stores + store_appearance)
│   ├── repositories/                → Repository pattern (localStorage — legacy)
│   └── adapters/                    → storefront-adapter
│
├── onboarding/                      → Provider, vibes, tour
├── storefront/                      → WhatsApp message builder
└── catalog/                         → resolveTemplateConfig, buildCssVars, getStoreBySlug

supabase/
├── migrations/                      → 001–011 SQL migrations
├── seed.sql                         → Datos de demo para 8 stores
└── config.toml                      → Configuración local
```

---

## 14. Constantes y Convenciones

| Convención | Valor/Regla |
|-----------|-------------|
| CSS variable prefix | `--t-*` (ej: `--t-primary`, `--t-radius-card`) |
| Template fallback | `DEFAULT_TEMPLATE_ID` de `src/shared/constants.ts` |
| Texto UI | Español colombiano |
| Commits | Conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:` |
| Git flow | `develop` (trabajo diario) → `main` (producción, auto-deploy Vercel) |
| Manifest assertion | Todos los manifests usan `as const satisfies TemplateManifest` |
| Secciones | Thin dispatchers → variant registry → componente real |
| Configuración | Schema-driven: `config-schema.ts` define qué aparece en el dashboard |
