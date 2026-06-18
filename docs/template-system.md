# Template System — Arquitectura basada en Manifiestos

> Guia practica para entender y crear templates en Tiendri.
> El codigo es la fuente de verdad; este documento es el mapa.

---

## 1. Vision general

Tiendri usa un **sistema de templates basado en manifiestos**. Cada template es una declaracion de ~150 lineas que indica _que variantes usar_ para cada slot visual (header, hero, footer, etc.). Un motor centralizado (`TemplateLayout`) lee el manifiesto y renderiza todo.

**Antes**: cada template tenia ~3,500 lineas en 25+ archivos de componentes React.
**Ahora**: cada template es un manifiesto declarativo. Los componentes viven en `_variants/` y `_core/` — compartidos por todos los templates.

### Templates actuales

8 templates implementados: `tech-premium`, `fashion`, `furniture-dark`, `furniture-light`, `beauty-soft`, `beauty-elegant`, `decor-warm`, `food-night`.

---

## 2. Anatomia de un template

Cada template vive en `src/templates/{nombre}/` y tiene exactamente **5 archivos**:

| Archivo | Que hace |
|---------|----------|
| `manifest.ts` | Declaracion central: colores, tipografia, grid, layout, secciones y **variantes de cada slot**. Es la identidad completa del template. |
| `palettes.ts` | Paletas de color preconstruidas que el comerciante puede elegir en el Theme Customizer. |
| `config-schema.ts` | Schema de campos editables desde el dashboard. El dashboard lee este schema y construye formularios automaticamente. |
| `ui-config.ts` | Configuracion del Theme Customizer: campos de color editables, controles de grid, opciones de layout, etiquetas de seccion. |
| `mock/data.ts` | Datos ficticios para el modo preview (tienda, categorias, productos). |

**No hay carpeta `components/`**. Los templates NO tienen componentes propios. Todo se resuelve via variantes compartidas.

---

## 3. El contrato del manifiesto

El manifiesto implementa la interfaz `TemplateManifest` (definida en `src/types/templates/manifest.ts`):

```typescript
// TemplateManifest = TemplateConfig + variants
export interface TemplateManifest extends TemplateConfig {
  variants: TemplateVariants;
}

export interface TemplateVariants {
  header: HeaderVariant;
  footer: FooterVariant;
  bottomNav: BottomNavVariant;
  productCard: ProductCardVariant;
  hero: HeroVariant;
  categoryNav: CategoryNavVariant;
  searchBar: SearchBarVariant;
}
```

### Campos del manifiesto

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| `id` | `string` | Identificador unico (ej: `"beauty-elegant"`) |
| `name` | `string` | Nombre legible (ej: `"Beauty Elegant"`) |
| `description` | `string` | Descripcion para el catalogo de templates |
| `font` | `string` | Fuente principal del cuerpo de texto |
| `headingFont` | `string` | Fuente para headings |
| `colors` | `TemplateColorTokens` | Tokens de color (9 obligatorios + extras) |
| `radius` | `TemplateRadiusTokens` | Border-radius para card, category, button |
| `grid` | `TemplateGridConfig` | Columnas por viewport para products, categories, listing, search |
| `layout` | `TemplateLayoutConfig` | Ratio de imagen, densidad de grid, densidad de spacing |
| `sections` | `SectionConfig[]` | Secciones del home page en orden de renderizado |
| `branding?` | `BrandingConfig` | Nombre de tienda, descripcion, redes sociales |
| `content?` | `ContentConfig` | Hero banner, nav links, footer content, tabs, busquedas populares |
| `business?` | `BusinessConfig` | Moneda, metodos de pago |
| `variants` | `TemplateVariants` | **La clave**: que variante usar para cada uno de los 7 slots |

### Tokens de color obligatorios

Todo manifiesto debe definir estos 9 tokens en `colors`:

| Token | Proposito |
|-------|-----------|
| `primary` | Color principal de la marca |
| `secondary` | Color secundario / complementario |
| `background` | Fondo general de la pagina |
| `foreground` | Color principal de texto |
| `card` | Fondo de cards y superficies |
| `border` | Bordes y separadores |
| `muted` | Texto secundario / apagado |
| `accent` | Acento especial (ej: estrellas de rating) |
| `onPrimary` | Texto sobre fondos `primary` (contraste) |

Los templates pueden agregar tokens extra via el index signature (ej: `searchBg`, `bottomNavBg`, `footerBg`).

### Ejemplo real: tech-premium

```typescript
import type { TemplateManifest } from "@/types/templates/manifest";
import type { BrandingConfig, ContentConfig, BusinessConfig } from "@/types/templates";

export const techPremiumManifest = {
  id: "tech-premium",
  name: "Tech Premium",
  description: "Ideal para tecnologia, electronica y gadgets",

  colors: {
    primary: '#000000',
    secondary: '#211C24',
    background: '#FAFAFA',
    foreground: '#000000',
    card: '#F6F6F6',
    border: '#B5B5B5',
    muted: '#787878',
    accent: '#FFB547',
    onPrimary: '#FFFFFF',
    footerBg: '#000000',  // token extra
  },

  font: "Inter",
  headingFont: "var(--font-display), ui-sans-serif, system-ui, sans-serif",

  grid: {
    products: { mobile: 2, desktop: 4 },
    categories: { mobile: 3, desktop: 6 },
    listing: { mobile: 2, desktop: 3 },
    search: { mobile: 2, desktop: 3 },
  },

  radius: {
    card: "9px",
    category: "15px",
    button: "8px",
  },

  layout: {
    cardImageRatio: "square" as const,
    gridDensity: "standard" as const,
    spacingDensity: "normal" as const,
  },

  sections: [
    { id: "hero" as const, visible: true },
    { id: "banners" as const, visible: true },
    { id: "categories" as const, visible: true },
    { id: "products" as const, visible: true },
    { id: "popular" as const, visible: true },
  ],

  branding: { ... } satisfies BrandingConfig,
  content: { ... } satisfies ContentConfig,
  business: { currency: "COP", paymentMethods: [] } satisfies BusinessConfig,

  variants: {
    header: "DEFAULT",
    footer: "COLUMNS",
    bottomNav: "EDGE",
    hero: "CONTAINED",
    categoryNav: "HORIZONTAL_SCROLL",
    productCard: "BELOW_IMAGE",
    searchBar: "INLINE",
  },
} as const satisfies TemplateManifest;
```

**Patron clave**: `as const satisfies TemplateManifest` — esto da type safety completo sin perder los tipos literales de las variantes.

---

## 4. Slots de variantes

El sistema tiene **7 slots**. Cada slot es un componente compartido que vive en `src/templates/_variants/{slot}/`. El manifiesto elige exactamente una variante por slot.

### Header (`_variants/header/`)

| Variante | Descripcion |
|----------|-------------|
| `DEFAULT` | Barra clasica con logo, navegacion y iconos |
| `GLASS` | Efecto glassmorphism, fondo semitransparente |
| `GREETING` | Saludo personalizado al usuario + avatar |
| `GREETING_SIMPLE` | Version simplificada del greeting |
| `MINIMAL` | Header compacto, minimalista |

### Footer (`_variants/footer/`)

| Variante | Descripcion |
|----------|-------------|
| `COLUMNS` | Footer multi-columna con servicios, asistencia y redes |
| `COMPACT` | Footer compacto de una sola linea |

### Bottom Navigation (`_variants/bottom-nav/`)

| Variante | Descripcion |
|----------|-------------|
| `EDGE` | Barra fija al borde inferior, estilo nativo |
| `FLOATING_PILL` | Barra flotante con forma de pastilla |
| `DOT_INDICATOR` | Indicador con punto activo |

### Hero (`_variants/hero/`)

| Variante | Descripcion |
|----------|-------------|
| `FULL_BLEED` | Imagen a pantalla completa |
| `CONTAINED` | Imagen contenida con margenes |
| `SPLIT` | Mitad texto, mitad imagen |
| `TEXT_ONLY` | Solo texto, sin imagen |
| `CAROUSEL` | Slider rotativo de banners |
| `CARD_SPLIT` | Layout tipo tarjeta dividida |
| `EDITORIAL` | Estilo editorial / revista |
| `PROMO_STRIP` | Franja promocional horizontal |
| `PROMO_CARD` | Tarjeta promocional destacada |

### Product Card (`_variants/product-card/`)

| Variante | Descripcion |
|----------|-------------|
| `BELOW_IMAGE` | Info del producto debajo de la imagen |
| `OVERLAY_BOTTOM` | Info superpuesta en la parte inferior de la imagen |
| `OVERLAY_FULL` | Info superpuesta cubriendo toda la imagen |
| `SIDE_BY_SIDE` | Imagen y texto lado a lado |
| `WITH_DESCRIPTION` | Card con descripcion expandida |

### Category Navigation (`_variants/category-nav/`)

| Variante | Descripcion |
|----------|-------------|
| `CHIPS` | Chips / pills seleccionables |
| `GRID` | Grid de categorias con icono o imagen |
| `HORIZONTAL_SCROLL` | Scroll horizontal de tarjetas |
| `TABS` | Pestanas tipo tab bar |
| `COLUMNAR` | Lista columnar vertical |

### Search Bar (`_variants/search-bar/`)

| Variante | Descripcion |
|----------|-------------|
| `INLINE` | Barra de busqueda siempre visible |
| `ICON_TRIGGER` | Icono que abre el campo de busqueda |

### Como funciona el registry de variantes

Cada slot tiene un registry que mapea el nombre de la variante a su componente. Los componentes se cargan con `dynamic()` (lazy loading):

```typescript
// src/templates/_variants/hero/index.ts
import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { HeroSlotProps, HeroVariant } from "./types";

export const HERO_REGISTRY: Record<HeroVariant, ComponentType<HeroSlotProps>> = {
  FULL_BLEED: dynamic(() => import("./FULL_BLEED")),
  CONTAINED: dynamic(() => import("./CONTAINED")),
  SPLIT: dynamic(() => import("./SPLIT")),
  // ... todas las variantes
};
```

El motor (`TemplateLayout`) simplemente hace:

```typescript
const HeaderComponent = HEADER_REGISTRY[manifest.variants.header];
const FooterComponent = FOOTER_REGISTRY[manifest.variants.footer];
const BottomNavComponent = BOTTOM_NAV_REGISTRY[manifest.variants.bottomNav];
```

---

## 5. Secciones del Home Page

El campo `sections` del manifiesto controla que secciones aparecen en el home y en que orden. Cada entrada tiene un `id` y un flag `visible`:

```typescript
sections: [
  { id: "hero", visible: true },
  { id: "categories", visible: true },
  { id: "products", visible: true },
],
```

### Tipos de seccion disponibles

Registrados en `src/templates/_core/sections/index.ts`:

| Seccion | Que renderiza |
|---------|--------------|
| `hero` | Banner hero (usa la variante de hero del manifiesto) |
| `categories` | Grid de categorias (usa la variante de categoryNav) |
| `products` | Grid de productos con tabs (usa la variante de productCard) |
| `collections` | Colecciones agrupadas |
| `editorial` | Contenido editorial / storytelling |
| `banners` | Banners promocionales |
| `popular` | Productos populares |
| `video` | Seccion de video |

El orden en el array `sections` determina el orden de renderizado. El flag `visible` permite ocultar secciones sin eliminarlas.

---

## 6. El motor: TemplateLayout

`src/templates/_core/TemplateLayout.tsx` es el punto de entrada de renderizado. Recibe:

```typescript
interface TemplateLayoutProps {
  store: StoreInfo;
  products: StorefrontProduct[];
  categories: Category[];
  config: ResolvedStoreConfig;
  manifest: TemplateManifest;
  currencySymbol?: string;
}
```

### Que hace

1. **Resuelve la ruta** a partir del pathname → una de: `home`, `listing`, `product`, `cart`, `search`, `checkout`, `info`.
2. **Selecciona variantes** del registry segun `manifest.variants`.
3. **Renderiza el shell** correspondiente a la ruta:
   - `HomeShell` — iteracion de secciones segun `config.sections`
   - `ListingShell` — catalogo con filtros
   - `ProductDetailShell` — detalle de producto
   - `CartShell` — carrito de compras
   - `SearchShell` — busqueda
   - `CheckoutShell` — flujo de checkout
   - `StoreInfoShell` — informacion de la tienda
4. **Monta chrome** (header arriba, footer + bottom-nav abajo).

Los templates NO tocan este archivo. El motor es compartido.

---

## 7. CSS Variables — Sistema de tokens `--t-*`

Los colores, radios y demas tokens del manifiesto se convierten en CSS custom properties con prefijo `--t-`:

```css
--t-primary: #000000;
--t-background: #FAFAFA;
--t-card: #F6F6F6;
--t-radius-card: 9px;
/* etc. */
```

### Flujo de resolucion

1. **Defaults del template** — `manifest.ts` define los valores base.
2. **Customizacion del comerciante** — `StoreCustomization` en Supabase (produccion) o localStorage (demo). Solo contiene los campos que el comerciante cambio.
3. **`resolveTemplateConfig(defaults, customization)`** fusiona las dos capas en un `ResolvedStoreConfig`.
4. **`buildCssVars(resolved)`** convierte el resultado en un mapa de variables CSS.
5. Las variables se inyectan como `style` en el div `.template-scope`.
6. Los componentes usan SOLO variables `--t-*` via Tailwind — **cero colores hardcodeados**.

Para detalles completos, ver `docs/css-variables.md`.

---

## 8. Archivos de soporte

### palettes.ts

Array de `ColorPalette[]`. Cada paleta tiene:

```typescript
{
  id: "oro-rosa",
  name: "Oro Rosa",
  description: "Tonos rosados con acentos dorados",
  style: "warm",
  preview: ["#D4A574", "#F2E0D0", "#FFFFFF", "#1A1A1A", "#F5EDE8"],
  colors: {
    primary: "#D4A574",
    secondary: "#1A1A1A",
    background: "#FFFFFF",
    foreground: "#1A1A1A",
    card: "#F5EDE8",
    border: "#E8D5C4",
    muted: "#8A7A6A",
    accent: "#C0956E",
    onPrimary: "#FFFFFF",
  },
}
```

El comerciante elige una paleta en el Theme Customizer como punto de partida y luego puede ajustar colores individuales.

### config-schema.ts

Schema que declara que puede editar el comerciante desde el dashboard. Se organiza en `tabGroups` con tabs y fields:

```typescript
export const beautyElegantConfigSchema: TemplateConfigSchema = {
  theme: { palettes, colors, radius, fontPairs },
  content: {
    tabGroups: [
      {
        id: "diseno",
        label: "Diseno",
        tabs: [
          {
            id: "grid-columns",
            label: "Columnas del grid",
            sections: [
              {
                id: "products-grid",
                label: "Productos",
                fields: [
                  { key: "grid.products.mobile", type: "select", label: "Columnas mobile", options: [...] },
                  { key: "grid.products.desktop", type: "select", label: "Columnas desktop", options: [...] },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};
```

El dashboard lee este schema y construye formularios dinamicamente (modelo Shopify).

### ui-config.ts

Configuracion estatica para el Theme Customizer flotante:

```typescript
export const beautyElegantUiConfig = {
  label: "Beauty Elegant",
  defaultConfig: beautyElegantManifest,
  colorFields: [
    { key: "primary", label: "Principal" },
    { key: "secondary", label: "Secundario" },
    // ...
  ],
  gridFields: [...],
  layoutOptions: [...],
  sectionLabels: { hero: "Banner principal", categories: "Categorias", products: "Productos" },
  palettes: beautyElegantPalettes,
} satisfies TemplateUIConfig;
```

### mock/data.ts

Datos para el modo preview:

```typescript
export const mockStore: StoreInfo = { ... };
export const mockCategories: Category[] = [ ... ];
export const mockProducts: StorefrontProduct[] = [ ... ];
```

---

## 9. Registry central

`src/templates/registry.ts` expone dos loaders async:

```typescript
export async function getTemplateConfig(templateId: string): Promise<TemplateManifest> {
  switch (templateId) {
    case "tech-premium": {
      const { techPremiumManifest } = await import("./tech-premium/manifest");
      return techPremiumManifest;
    }
    case "beauty-elegant": {
      const { beautyElegantManifest } = await import("./beauty-elegant/manifest");
      return beautyElegantManifest;
    }
    // ... los 8 templates
    default: {
      const { techPremiumManifest } = await import("./tech-premium/manifest");
      return techPremiumManifest; // fallback
    }
  }
}

export async function getTemplateSchema(templateId: string): Promise<TemplateConfigSchema | null> {
  // Mismo patron con config-schema.ts
}
```

Cada template se importa dinamicamente — su codigo solo entra al bundle cuando se necesita.

---

## 10. Paso a paso: crear el template #9

### Paso 1 — Crear la carpeta

```
src/templates/mi-template/
  manifest.ts
  palettes.ts
  config-schema.ts
  ui-config.ts
  mock/
    data.ts
```

**No crear carpeta `components/`**. Los componentes son variantes compartidas.

### Paso 2 — Escribir el manifiesto

```typescript
// src/templates/mi-template/manifest.ts
import type { TemplateManifest } from "@/types/templates/manifest";
import type { BrandingConfig, ContentConfig, BusinessConfig } from "@/types/templates";

export const miTemplateManifest = {
  id: "mi-template",
  name: "Mi Template",
  description: "Ideal para...",

  // 1. Colores — los 9 tokens obligatorios
  colors: {
    primary: "#2563EB",
    secondary: "#1E293B",
    background: "#FFFFFF",
    foreground: "#0F172A",
    card: "#F8FAFC",
    border: "#E2E8F0",
    muted: "#64748B",
    accent: "#F59E0B",
    onPrimary: "#FFFFFF",
  },

  // 2. Tipografia
  font: "Inter",
  headingFont: "var(--font-display), ui-sans-serif, system-ui, sans-serif",

  // 3. Grid
  grid: {
    products: { mobile: 2, desktop: 4 },
    categories: { mobile: 3, desktop: 6 },
    listing: { mobile: 2, desktop: 3 },
    search: { mobile: 2, desktop: 3 },
  },

  // 4. Radios
  radius: {
    card: "12px",
    category: "16px",
    button: "8px",
  },

  // 5. Layout
  layout: {
    cardImageRatio: "square" as const,
    gridDensity: "standard" as const,
    spacingDensity: "normal" as const,
  },

  // 6. Secciones del home (orden = orden de renderizado)
  sections: [
    { id: "hero" as const, visible: true },
    { id: "categories" as const, visible: true },
    { id: "products" as const, visible: true },
  ],

  // 7. Defaults de branding, contenido y negocio
  branding: {
    storeName: "Mi Tienda",
    description: "Tu tienda online en Tiendri",
    socialLinks: {},
  } satisfies BrandingConfig,

  content: {
    heroBanner: {
      title: "Titulo del hero",
      subtitle: "Subtitulo descriptivo.",
      ctaText: "Ver catalogo",
    },
    navLinks: [
      { label: "Inicio", href: "/" },
      { label: "Catalogo", href: "/catalogo" },
      { label: "Buscar", href: "/buscar" },
      { label: "Carrito", href: "/carrito" },
    ],
    footerServices: ["Envios a domicilio", "Pago seguro", "Atencion al cliente"],
    footerAssistance: ["Preguntas frecuentes", "Terminos y condiciones"],
    productTabs: [
      { id: "new-arrival", label: "Nuevos" },
      { id: "bestseller", label: "Mas vendidos" },
      { id: "featured", label: "Destacados" },
    ],
    popularSearches: ["Producto 1", "Producto 2"],
  } satisfies ContentConfig,

  business: {
    currency: "COP",
    paymentMethods: [],
  } satisfies BusinessConfig,

  // 8. VARIANTES — elegir una por slot
  variants: {
    header: "DEFAULT",
    footer: "COLUMNS",
    bottomNav: "EDGE",
    hero: "CONTAINED",
    categoryNav: "HORIZONTAL_SCROLL",
    productCard: "BELOW_IMAGE",
    searchBar: "INLINE",
  },
} as const satisfies TemplateManifest;

export type MiTemplateManifest = typeof miTemplateManifest;
```

### Paso 3 — Crear paletas

```typescript
// src/templates/mi-template/palettes.ts
import type { ColorPalette } from "@/types/templates";

export const miTemplatePalettes: ColorPalette[] = [
  {
    id: "default",
    name: "Default",
    description: "Paleta base del template",
    style: "neutral",
    preview: ["#2563EB", "#1E293B", "#FFFFFF", "#0F172A", "#F8FAFC"],
    colors: {
      primary: "#2563EB",
      secondary: "#1E293B",
      background: "#FFFFFF",
      foreground: "#0F172A",
      card: "#F8FAFC",
      border: "#E2E8F0",
      muted: "#64748B",
      accent: "#F59E0B",
      onPrimary: "#FFFFFF",
    },
  },
  // ... mas paletas (recomendado: 8-16 paletas)
];
```

### Paso 4 — Crear config-schema y ui-config

Seguir el patron de un template existente (ej: `beauty-elegant`). Los campos del schema controlan que puede personalizar el comerciante desde el dashboard.

### Paso 5 — Crear datos mock

```typescript
// src/templates/mi-template/mock/data.ts
import type { StoreInfo, Category, StorefrontProduct } from "@/types/store";

export const mockStore: StoreInfo = { /* ... */ };
export const mockCategories: Category[] = [ /* ... */ ];
export const mockProducts: StorefrontProduct[] = [ /* ... */ ];
```

### Paso 6 — Registrar en el registry

Agregar un `case` en ambas funciones de `src/templates/registry.ts`:

```typescript
// En getTemplateConfig:
case "mi-template": {
  const { miTemplateManifest } = await import("./mi-template/manifest");
  return miTemplateManifest;
}

// En getTemplateSchema:
case "mi-template": {
  const { miTemplateConfigSchema } = await import("./mi-template/config-schema");
  return miTemplateConfigSchema;
}
```

### Paso 7 — Registrar ui-config

Agregar la entrada en el mapa `TEMPLATE_UI_CONFIGS` dentro de `src/app/template/[templateName]/TemplateLayoutClient.tsx`.

### Paso 8 — Verificar

```bash
npx tsc --noEmit
```

Si compila sin errores, el template esta listo para preview.

---

## 11. Reglas

### OBLIGATORIO

- Todo manifiesto debe usar `as const satisfies TemplateManifest`.
- Los 9 tokens de color base son obligatorios.
- Cada slot de variante debe tener exactamente una variante asignada.
- Los textos de UI deben estar en espanol colombiano.
- Los colores se consumen SOLO via CSS vars `--t-*` en los componentes.

### PROHIBIDO

- **No crear archivos `.tsx` dentro de `src/templates/{nombre}/`** — los templates no tienen componentes propios.
- **No hardcodear colores** en los componentes de variante — usar siempre `var(--t-primary)`, `var(--t-background)`, etc.
- **No importar componentes entre templates** — todo pasa por `_variants/` y `_core/`.
- **No modificar `TemplateLayout.tsx`** para agregar un template — el motor es generico.

---

## 12. Estructura de carpetas

```
src/templates/
  _core/                    # Motor centralizado
    TemplateLayout.tsx       # Entry point de renderizado
    shells/                  # Shell por ruta (Home, Listing, Cart, etc.)
    sections/                # Section registry (hero, categories, products, etc.)
    hooks/                   # Hooks compartidos del motor
  _variants/                # Componentes compartidos por slot
    header/                  # 5 variantes de header
    footer/                  # 2 variantes de footer
    bottom-nav/              # 3 variantes de bottom nav
    hero/                    # 9 variantes de hero
    product-card/            # 5 variantes de product card
    category-nav/            # 5 variantes de category nav
    search-bar/              # 2 variantes de search bar
  _shared/                  # Hooks y utilidades compartidas
  registry.ts               # Loaders async de manifiestos y schemas
  tech-premium/             # Template: solo manifest + palettes + schema + ui-config + mock
  fashion/
  furniture-dark/
  furniture-light/
  beauty-soft/
  beauty-elegant/
  decor-warm/
  food-night/
```

---

## 13. Links a docs relacionados

- `docs/css-variables.md` — grupos de CSS vars `--t-*` y como funciona `buildCssVars`.
- `docs/preset-system.md` — paletas de color por template.
- `docs/composable-sections.md` — slots composables, variantes disponibles y guia practica.

---

_Actualizado: 2026-06-18_
