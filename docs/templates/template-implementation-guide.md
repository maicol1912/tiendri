# Template Implementation Guide — Tiendri V2

Guia tecnica para implementar un template nuevo a nivel de codigo. Para las funcionalidades de producto, ver `template-features.md`.

---

## 1. Estructura de Archivos

Cada template vive en `src/templates/{template-name}/` y DEBE contener:

### Archivos raiz (obligatorios)

| Archivo | Proposito |
|---------|-----------|
| `config.ts` | Valores por defecto: 9 tokens de color, radius, grid, layout, branding, content, business. Debe hacer `satisfies TemplateConfig` |
| `config-schema.ts` | Schema para el dashboard: tabs, secciones, campos editables por el comerciante |
| `palettes.ts` | 16 paletas de color pre-armadas (minimo) |
| `ui-config.ts` | Configuracion del Theme Customizer: colorFields, gridFields, layoutOptions, sectionLabels |
| `index.tsx` | Entry point: re-exporta `HomeShell as default` + todas las shell routes + mock data |
| `types.ts` | Interfaces TypeScript locales del template |

### Directorios (obligatorios)

| Directorio | Contenido |
|------------|-----------|
| `components/` | Todos los componentes React del template |
| `mock/data.ts` | Mock data estatica: store info, categorias, productos, producto detalle, cart items |
| `mock/assets.ts` | Constantes de rutas de imagenes → `public/mocks/{template-name}/` |
| `utils/grid-classes.ts` | `gridColsClass(mobile, desktop) → string` (clases Tailwind de grid) |
| `utils/layout-classes.ts` | `cardStyleClass`, `hoverEffectClass`, `imageRatioClass` |
| `hooks/useTemplateNav.ts` | Hook `useTemplateNav()` para navegacion interna del template |

---

## 2. Contrato de Tipos — 5 Capas

### Capa 1 — TemplateConfig (`src/types/templates/template-config.ts`)

Lo que el template exporta como defaults:

```typescript
{
  id: string;                    // kebab-case unico
  name: string;                  // nombre display
  description: string;
  font: string;                  // font family body
  headingFont: string;           // font family headings
  colors: TemplateColorTokens;   // 9 tokens requeridos
  radius: TemplateRadiusTokens;  // card, category, button
  grid: TemplateGridConfig;      // products, categories, listing, search → {mobile, desktop}
  layout: TemplateLayoutConfig;  // cardImageRatio, gridDensity, spacingDensity
  sections: readonly SectionConfig[]; // [{id, visible}]
  branding?: BrandingConfig;
  content?: ContentConfig;
  business?: BusinessConfig;
  structuralVariants?: StructuralVariants;
}
```

### Capa 2 — StoreCustomization (`src/types/templates/store-customization.ts`)

Overrides del comerciante en Supabase (JSONB). Todos opcionales: `theme`, `layout`, `branding`, `content`, `business`, `appearance`.

### Capa 3 — ResolvedStoreConfig (`src/types/templates/resolved-config.ts`)

`resolveTemplateConfig()` merge en orden:
1. Defaults del template (config.ts)
2. Tokens de la paleta (si hay `paletteId`)
3. Overrides individuales del comerciante

### Capa 4 — CSS Variables

`buildCssVars(config)` → variables `--t-*` → inyectadas en `.template-scope`.

### Capa 5 — TemplateUIConfig (`src/types/templates/ui-config.ts`)

Wiring del ThemeCustomizer. Se define en `ui-config.ts` de cada template.

---

## 3. Componentes Requeridos

### Shell (client boundaries con logica de estado)

| Componente | Responsabilidad |
|------------|----------------|
| `HomeShell.tsx` | Conecta CartProvider + useTemplateNav + useLayoutConfig. Renderiza HomePage |
| `ListingShellRoute.tsx` | Estado de filtros (`activeFilters`, `searchQuery`, `sortOption`) |
| `ProductDetailShellRoute.tsx` | Carga producto por ID, estado de variante seleccionada |
| `SearchShellRoute.tsx` | Estado de busqueda en tiempo real |
| `CartShellRoute.tsx` | Lee `useCart()`, pasa items a CartPage |
| `CheckoutShellRoute.tsx` | Estado del formulario, validacion |
| `StoreInfoShellRoute.tsx` | Pasa store info a StoreInfoPage |

### Paginas (presentacionales, reciben props)

`HomePage`, `ProductListingPage`, `ProductDetailPage`, `SearchPage`, `CartPage`, `CheckoutPage`, `StoreInfoPage`

### Navegacion

`Header.tsx` (desktop), `BottomNav.tsx` (mobile, `md:hidden`)

### Secciones Home

`HeroBanner.tsx`, `CategorySection.tsx`, `ProductCard.tsx`

### Carrito y Checkout

`CartItemRow.tsx`, `OrderSummary.tsx`, `CheckoutForm.tsx`

### Filtros

`FilterSidebar.tsx` (sidebar desktop + drawer mobile), `SearchBar.tsx`

### Footer

`Footer.tsx` — redes sociales + "Creado con Tiendri"

---

## 4. Hook de Navegacion

`hooks/useTemplateNav.ts` — usa `useRouter()` + `useParams()` de Next.js:

```typescript
interface TemplateNav {
  basePath: string;                    // /template/{templateName}
  goHome: () => void;                  // → basePath
  goProduct: (id: string) => void;     // → basePath/producto/{id}
  goListing: () => void;               // → basePath/catalogo
  goCart: () => void;                   // → basePath/carrito
  goSearch: () => void;                // → basePath/buscar
  goCheckout: () => void;              // → basePath/checkout
  goInfo: () => void;                  // → basePath/info
}
```

Rutas bajo `src/app/template/[templateName]/`:

| Ruta | Shell |
|------|-------|
| `/` | HomeShell |
| `/catalogo` | ListingShellRoute |
| `/producto/[productId]` | ProductDetailShellRoute |
| `/carrito` | CartShellRoute |
| `/buscar` | SearchShellRoute |
| `/checkout` | CheckoutShellRoute |
| `/info` | StoreInfoShellRoute |

---

## 5. Tokens de Color

### 9 Requeridos

| Token | Uso |
|-------|-----|
| `primary` | Botones, CTAs, links activos |
| `secondary` | Acentos secundarios |
| `background` | Fondo de pagina |
| `foreground` | Texto principal |
| `card` | Fondo de cards |
| `border` | Bordes, separadores |
| `muted` | Texto secundario, fondos suaves |
| `accent` | Badges, highlights |
| `onPrimary` | Texto sobre primary (contraste) |

### Extras Opcionales

Templates pueden agregar tokens extra: `searchBg`, `bottomNavBg`, `iconPillBg`, `discountBg`, `discountText`, `backButtonBg`, `reviewBg`, etc.

### Regla: CERO Colores Hardcodeados

```css
/* CORRECTO */
background: var(--t-primary);
color: var(--t-foreground);

/* INCORRECTO — PROHIBIDO */
background: #FF5733;
```

---

## 6. CSS Variables

`buildCssVars()` genera automaticamente desde el config:

| Grupo | Variables |
|-------|-----------|
| **Colores** | `--t-primary`, `--t-secondary`, `--t-background`, `--t-foreground`, `--t-card`, `--t-border`, `--t-muted`, `--t-accent`, `--t-on-primary`, `--t-primary-rgb` + extras |
| **Radius** | `--t-radius-card`, `--t-radius-category`, `--t-radius-button` + derivados (`-base`, `-sm`, `-lg`, `-image`) |
| **Tipografia** | `--t-type-heading-weight/size/tracking/transform`, `--t-type-body-weight/size`, `--t-type-paragraph-max-width`, `--t-type-contrast` |
| **Spacing** | `--t-space-section/card/item/gap` (segun densidad: compact/balanced/spacious) |
| **Grid** | `--t-grid-cols-mobile/desktop`, `--t-container-max`, `--t-image-fit` |
| **Card** | `--t-card-bg-mode`, `--t-card-padding` |
| **Fonts** | `--font-body`, `--font-heading`, `--font-sans`, `--template-heading-font` |

Inyectadas como `style={{...}}` en el div `.template-scope`.

---

## 7. Paletas

Cada `palettes.ts` exporta `ColorPalette[]`:

```typescript
interface ColorPalette {
  id: string;           // kebab-case unico
  name: string;         // nombre en espanol
  description: string;  // una linea estetica
  style: string;        // "premium" | "minimal" | "warm" | "vibrant"
  preview: string[];    // 4-5 hex para swatches
  colors: Record<string, string>; // los 9 tokens
}
```

**Reglas:**
- Minimo 16 paletas (12 para fashion)
- Primera paleta = match exacto con defaults de `config.ts`
- Todas cubren los 9 tokens
- Coherentes con la industria del template

**Resolucion (3 capas):**
1. `config.ts` defaults → 2. Paleta seleccionada → 3. Overrides del comerciante

---

## 8. Secciones Composables

3 slots + 1 estilo. Registros en `src/templates/_shared/`.

### Hero (`hero-variants/`)

Variantes: `full-bleed`, `contained`, `split`, `text-only`

Props: `{ subtitle, titleLight, titleBold, description, ctaText, image, bgColor, onCtaClick? }`

Config: `structuralVariants.heroVariant`

### Card Layout (`card-layouts/`)

Variantes: `below-image`, `overlay-bottom`, `overlay-full`, `side-by-side`

Props: `{ product, currencySymbol, layout, addToCartStyle?, onClick?, onAddToCart?, buttonClass, badgeClass, priceConfig, ... }`

Config: `structuralVariants.cardContentLayout`

### Category Nav (`category-nav-variants/`)

Variantes: `horizontal-scroll`, `grid`, `tabs`, `chips`

Props: `{ categories, activeCategoryId?, onCategoryClick?, gridMobile?, gridDesktop? }`

Config: `structuralVariants.categoryNavStyle`

### Add to Cart Style

Variantes: `full-width`, `icon-button`, `floating-fab`, `on-hover-only`

Config: `structuralVariants.addToCartStyle`

### Style Maps (`_shared/style-maps.ts`)

Mapas de clases Tailwind reutilizables: `BUTTON_STYLE_MAP`, `BADGE_STYLE_MAP`, `PRICE_DISPLAY_MAP`, `CARD_STYLE_MAP`, `HOVER_EFFECT_MAP`, `BACKGROUND_TREATMENT_MAP`, `COLOR_STRATEGY_MAP`, `CARD_BORDER_MAP`, `SECTION_SEPARATOR_MAP`, `IMAGE_FIT_MAP`, `IMAGE_HOVER_BEHAVIOR_MAP`.

---

## 9. Integracion con Cart

Usar el `CartProvider` compartido de `src/lib/cart/`:

```typescript
interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: string, variantName?: string | null) => void;
  incrementItem: (productId: string, variantName?: string | null) => void;
  decrementItem: (productId: string, variantName?: string | null) => void;
  clearCart: () => void;
}
```

```typescript
interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string | null;
  variantName: string | null;   // discrimina variantes como entries separados
  originalPrice?: number | null;
}
```

Persistencia: localStorage con key `tc_{template_id_underscored}_cart_{store_slug}`.

`CartProvider` se wrappea en `TemplateLayoutClient` — los componentes solo usan `useCart()`.

---

## 10. Config Schema (Dashboard)

```typescript
interface TemplateConfigSchema {
  theme: ThemeSchemaConfig;      // palettes + colors + radius + fontPairs
  content: {
    tabGroups: ConfigTabGroup[]; // tabs del dashboard
  };
}
```

**ThemeSchemaConfig:**
```typescript
{
  palettes?: ColorPalette[];
  colors: ThemeSchemaColor[];      // {key, label, defaultValue}
  radius: ThemeSchemaRadius[];     // {key, label, defaultValue, max}
  fontPairs: ThemeSchemaFontPair[];
}
```

**Tipos de ConfigField:** `text`, `textarea`, `image`, `url`, `color`, `select`, `number`, `range`, `boolean`, `tag-list`, `key-value-list`, `font-picker`, `color-palette`.

Dot-path keys: `grid.products.mobile`, `sections[0].visible`, `layout.layout.cardImageRatio`.

---

## 11. Theme Customizer

`TemplateLayoutClient.tsx` maneja:
1. Estado de config (empieza con `uiConfig.defaultConfig`)
2. `buildCssVars(config)` → CSS vars en `.template-scope`
3. Font pair resolution → CSS variable classes en `.template-scope`
4. `LayoutConfigContext` → `useLayoutConfig<T>()` para componentes
5. Boton flotante → abre drawer `ThemeCustomizer`
6. Live update: cambio en customizer → `buildCssVars()` → re-render

```typescript
interface TemplateUIConfig {
  label: string;
  defaultConfig: Record<string, unknown>;
  colorFields: { key: string; label: string }[];
  gridFields: { key: string; mobileLabel: string; desktopLabel: string }[];
  layoutOptions: { key: string; label: string; options: {value, label}[] }[];
  sectionLabels: { id: string; label: string }[];
  palettes: ColorPalette[];
  defaultFontPairKey?: string;
}
```

Lectura en componentes:
```typescript
const { config } = useLayoutConfig<MiTemplateConfig>();
```

---

## 12. Fonts

15 pares en `src/lib/fonts.ts` via `next/font/google`:

| Grupo | Pares |
|-------|-------|
| Sofisticados | elegante, editorial, atemporal |
| Modernos | minimalista, preciso, contemporaneo |
| Expresivos | audaz, urbano, dramatico, llamativo |
| Calidos | amigable, artesanal, jugueton |
| Clasicos | clasico, profesional |

Definir `defaultFontPairKey` en `ui-config.ts`.

---

## 13. SEO

- `generateMetadata()` en paginas del template
- JSON-LD `Product` en detalle, `ItemList` en catalogo
- OpenGraph + Twitter Cards
- Precios: `new Intl.NumberFormat("es-CO").format(price)`

---

## 14. Mock Data

`mock/data.ts` exporta:

| Export | Tipo | Minimo |
|--------|------|--------|
| `mockStore` | `StoreInfo` | 1 |
| `mockCategories` | `Category[]` | 4-6 |
| `mockProducts` | `StorefrontProduct[]` | 8-12 |
| `mockDetailProduct` | `StorefrontProduct` | 1 (todos los campos) |
| `mockCartItems` | `CartItem[]` | 2-3 |

`mock/assets.ts` — constantes de paths a `public/mocks/{template-name}/`.

---

## 15. Responsive

- Mobile-first, breakpoints `md:` y `lg:` de Tailwind
- BottomNav: `md:hidden`
- Grid: `gridColsClass(mobile, desktop)` → `grid-cols-{m} lg:grid-cols-{d}`
- Filtros: `hidden lg:flex` sidebar, drawer en mobile
- Safe area: `pb-[calc(80px+env(safe-area-inset-bottom,0px))]`
- Defaults: productos `{2, 4}`, categorias `{3, 6}`

---

## 16. Registro

3 archivos que tocar:

1. `src/templates/registry.ts` — agregar `case` en `getTemplateConfig()` y `getTemplateSchema()`
2. `src/templates/index.ts` — agregar entry en `templateRegistry`
3. `src/app/template/[templateName]/TemplateLayoutClient.tsx` — agregar import + entry en `TEMPLATE_UI_CONFIGS`

---

## 17. Texto

- UI en espanol colombiano
- Precios en COP: `$80.000`
- `formatPrice` y `formatPriceCurrency` de `src/lib/format.ts`

---

## 18. Onboarding

5 vibes: `elegante`, `moderno`, `energetico`, `calido`, `catalogo`. La vibe asigna el `templateId` en creacion. Despues, `StoreCustomization` maneja overrides.

---

## Checklist de Implementacion

### Archivos
- [ ] `config.ts` — `satisfies TemplateConfig`, 9 tokens
- [ ] `config-schema.ts` — theme + content tabs
- [ ] `palettes.ts` — 16+ paletas
- [ ] `ui-config.ts` — customizer fields
- [ ] `index.tsx` — re-exports
- [ ] `types.ts` — interfaces locales
- [ ] `mock/data.ts` + `mock/assets.ts`
- [ ] `utils/grid-classes.ts` + `utils/layout-classes.ts`
- [ ] `hooks/useTemplateNav.ts`

### Componentes
- [ ] 7 Shell routes (Home, Listing, Detail, Search, Cart, Checkout, Info)
- [ ] 7 Pages (presentacionales)
- [ ] Header + BottomNav
- [ ] HeroBanner + CategorySection + ProductCard (composables)
- [ ] FilterSidebar + SearchBar
- [ ] CartItemRow + OrderSummary + CheckoutForm
- [ ] Footer

### Integracion
- [ ] CERO colores hardcodeados
- [ ] `useCart()` para operaciones de carrito
- [ ] `useLayoutConfig<T>()` para config en vivo
- [ ] `useTemplateNav()` para navegacion
- [ ] Secciones composables via registries de `_shared/`

### Registro
- [ ] `registry.ts` (config + schema)
- [ ] `index.ts` (templateRegistry)
- [ ] `TemplateLayoutClient.tsx` (TEMPLATE_UI_CONFIGS)

---

## Referencia: Archivos Clave

| Archivo | Proposito |
|---------|-----------|
| `src/types/templates/template-config.ts` | Interface TemplateConfig |
| `src/types/templates/config-schema.ts` | Schema + tipos de campo |
| `src/types/templates/primitives.ts` | Union types (HeroVariant, etc.) |
| `src/types/templates/structural-variants.ts` | StructuralVariants |
| `src/lib/buildCssVars.ts` | Generador CSS vars |
| `src/lib/resolveTemplateConfig.ts` | Merger 3 capas |
| `src/lib/cart/CartProvider.tsx` | Cart compartido |
| `src/lib/fonts.ts` | 15 font pairs |
| `src/lib/format.ts` | formatPrice, formatPriceCurrency |
| `src/templates/registry.ts` | Async loaders |
| `src/templates/index.ts` | Registry map |
| `src/templates/_shared/style-maps.ts` | Tailwind class maps |
| `src/app/template/[templateName]/TemplateLayoutClient.tsx` | Hub customizer |

**Template de referencia:** `src/templates/beauty-elegant/` (el mas completo).
