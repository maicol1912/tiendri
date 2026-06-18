# Sistema de Secciones y Variantes Composables

> Leer `docs/template-system.md` antes si no estás familiarizado con la arquitectura de templates.
> Ver `docs/css-variables.md` para el catálogo de variables `--t-*`.

---

## 1. Qué es

El sistema de secciones y variantes composables permite que cada template declare _qué variantes visuales usar_ para cada slot (header, hero, footer, etc.) y _qué secciones mostrar_ en el home. Un motor centralizado (`CoreHomePage` + `SECTION_REGISTRY`) despacha todo dinámicamente.

**Dos niveles:**
- **Variantes de slot** — componentes intercambiables para header, hero, product card, etc. Viven en `_variants/`.
- **Renderers de sección** — bloques del home page (hero, categorías, productos, etc.). Viven en `_core/sections/`.

---

## 2. Slots de variantes (`_variants/`)

7 slots registrados en `src/templates/_variants/`. Cada slot tiene un registry que mapea nombre de variante a componente, usando `next/dynamic` para code-splitting:

```typescript
// Patrón de cada registry
export const HERO_REGISTRY: Record<HeroVariant, ComponentType<HeroSlotProps>> = {
  FULL_BLEED: dynamic(() => import("./FULL_BLEED")),
  CONTAINED:  dynamic(() => import("./CONTAINED")),
  // ...
};
```

### Header (`_variants/header/`) — 5 variantes

| Variante | Descripción |
|----------|-------------|
| `DEFAULT` | Barra clásica con logo, navegación e iconos |
| `GLASS` | Efecto glassmorphism, fondo semitransparente |
| `GREETING` | Saludo personalizado al usuario + avatar |
| `GREETING_SIMPLE` | Versión simplificada del greeting |
| `MINIMAL` | Header compacto, minimalista |

### Hero (`_variants/hero/`) — 9 variantes

| Variante | Descripción |
|----------|-------------|
| `FULL_BLEED` | Imagen a pantalla completa |
| `CONTAINED` | Imagen contenida con márgenes |
| `SPLIT` | Mitad texto, mitad imagen |
| `TEXT_ONLY` | Solo texto, sin imagen |
| `CAROUSEL` | Slider rotativo de banners |
| `CARD_SPLIT` | Layout tipo tarjeta dividida |
| `EDITORIAL` | Estilo editorial / revista |
| `PROMO_STRIP` | Franja promocional horizontal |
| `PROMO_CARD` | Tarjeta promocional destacada |

### Product Card (`_variants/product-card/`) — 5 variantes

| Variante | Descripción |
|----------|-------------|
| `BELOW_IMAGE` | Info del producto debajo de la imagen |
| `OVERLAY_BOTTOM` | Info superpuesta en la parte inferior |
| `OVERLAY_FULL` | Info superpuesta cubriendo toda la imagen |
| `SIDE_BY_SIDE` | Imagen y texto lado a lado |
| `WITH_DESCRIPTION` | Card con descripción expandida |

### Category Nav (`_variants/category-nav/`) — 5 variantes

| Variante | Descripción |
|----------|-------------|
| `CHIPS` | Chips / pills seleccionables |
| `GRID` | Grid de categorías con icono o imagen |
| `HORIZONTAL_SCROLL` | Scroll horizontal de tarjetas |
| `TABS` | Pestañas tipo tab bar |
| `COLUMNAR` | Lista columnar vertical |

### Footer (`_variants/footer/`) — 2 variantes

| Variante | Descripción |
|----------|-------------|
| `COLUMNS` | Footer multi-columna con servicios, asistencia y redes |
| `COMPACT` | Footer compacto de una sola línea |

### Bottom Nav (`_variants/bottom-nav/`) — 3 variantes

| Variante | Descripción |
|----------|-------------|
| `EDGE` | Barra fija al borde inferior, estilo nativo |
| `FLOATING_PILL` | Barra flotante con forma de pastilla |
| `DOT_INDICATOR` | Indicador con punto activo |

### Search Bar (`_variants/search-bar/`) — 2 variantes

| Variante | Descripción |
|----------|-------------|
| `INLINE` | Barra de búsqueda siempre visible |
| `ICON_TRIGGER` | Ícono que abre el campo de búsqueda |

**Total: 31 variantes en 7 slots.**

---

## 3. Renderers de sección (`_core/sections/`)

12 renderers en `src/templates/_core/sections/`, registrados en `SECTION_REGISTRY`:

```typescript
// src/templates/_core/sections/index.ts
export const SECTION_REGISTRY: Record<SectionId, ComponentType<SectionRendererProps>> = {
  hero:        HeroSection,
  categories:  CategoriesSection,
  products:    ProductsSection,
  featured:    FeaturedSection,
  editorial:   EditorialSection,
  video:       VideoSection,
  collections: CollectionsSection,
  banners:     BannersSection,
  popular:     PopularSection,
  discounts:   DiscountsSection,
  searchBar:   SearchBarSection,
  bestSellers: BestSellersSection,
};
```

| Sección | Qué renderiza |
|--------|--------------|
| `hero` | Banner hero — usa la variante de hero del manifiesto |
| `categories` | Grid de categorías — usa la variante de categoryNav |
| `products` | Grid de productos con tabs — usa la variante de productCard |
| `featured` | Productos destacados o selección editorial |
| `editorial` | Contenido editorial / storytelling |
| `video` | Sección de video |
| `collections` | Colecciones agrupadas |
| `banners` | Banners promocionales |
| `popular` | Productos populares |
| `discounts` | Productos en descuento / ofertas especiales |
| `searchBar` | Barra de búsqueda prominente en el home |
| `bestSellers` | Ranking de productos más vendidos |

Todos los renderers reciben `SectionRendererProps` — un tipo unificado que incluye store, products, categories y config completo. La función `extractSectionProps(config)` (en `_core/pages/extract-section-props.ts`) prepara estas props una vez; cada renderer extrae solo lo que necesita.

---

## 4. Cómo funciona el despacho

`CoreHomePage` itera el array `config.sections`, filtra por `visible: true`, y despacha cada entrada a su renderer vía `SECTION_REGISTRY`:

```
manifest.sections (declaración)
  → CoreHomePage filtra por visible
    → SECTION_REGISTRY[section.id] (lookup)
      → SectionRenderer({ ...sectionProps })
```

El orden en el array `sections` del manifiesto determina el orden de renderizado. El flag `visible` permite ocultar secciones sin eliminarlas del manifiesto.

---

## 5. Agregar una variante nueva

Para agregar una variante a un slot existente (ej: un nuevo hero `BENTO`):

1. Crear el componente `src/templates/_variants/hero/BENTO.tsx` con default export.
2. Agregar `"BENTO"` al tipo union `HeroVariant` en `src/types/templates/primitives.ts`.
3. Agregar al registry: `BENTO: dynamic(() => import("./BENTO"))` en `_variants/hero/index.ts`.
4. TypeScript forzará que el registry esté completo — `tsc --noEmit` lo verifica.
5. Asignar la variante en el manifiesto del template que la usa: `hero: "BENTO"`.

**Reglas:**
- Default export obligatorio (`next/dynamic` lo requiere).
- Solo CSS vars `--t-*` para colores — nunca hex hardcodeados.
- `'use client'` solo si el componente tiene event handlers o hooks.
- El componente recibe props tipadas — no acceder al config directamente.

---

## 6. Agregar un renderer de sección nuevo

Para agregar una sección nueva (ej: `testimonials`):

1. Crear `src/templates/_core/sections/TestimonialsSection.tsx`.
2. Agregar `"testimonials"` al tipo `SectionId` en `src/types/templates/`.
3. Registrar en `SECTION_REGISTRY`: `testimonials: TestimonialsSection`.
4. Agregar a `extractSectionProps` si necesita props específicas del config.
5. Declarar en el manifiesto del template: `{ id: "testimonials", visible: true }`.

---

## 7. Árbol de archivos

```
src/templates/
  _variants/
    header/           # 5 variantes — DEFAULT, GLASS, GREETING, GREETING_SIMPLE, MINIMAL
    hero/             # 9 variantes — FULL_BLEED, CONTAINED, SPLIT, TEXT_ONLY, CAROUSEL, CARD_SPLIT, EDITORIAL, PROMO_STRIP, PROMO_CARD
    product-card/     # 5 variantes — BELOW_IMAGE, OVERLAY_BOTTOM, OVERLAY_FULL, SIDE_BY_SIDE, WITH_DESCRIPTION
    category-nav/     # 5 variantes — CHIPS, GRID, HORIZONTAL_SCROLL, TABS, COLUMNAR
    footer/           # 2 variantes — COLUMNS, COMPACT
    bottom-nav/       # 3 variantes — EDGE, FLOATING_PILL, DOT_INDICATOR
    search-bar/       # 2 variantes — INLINE, ICON_TRIGGER
  _core/
    sections/
      index.ts        # SECTION_REGISTRY
      HeroSection.tsx
      CategoriesSection.tsx
      ProductsSection.tsx
      FeaturedSection.tsx
      EditorialSection.tsx
      VideoSection.tsx
      CollectionsSection.tsx
      BannersSection.tsx
      PopularSection.tsx
      DiscountsSection.tsx
      SearchBarSection.tsx
      BestSellersSection.tsx
    pages/
      CoreHomePage.tsx          # Despacha secciones vía SECTION_REGISTRY
      extract-section-props.ts  # extractSectionProps(config) → SectionRendererProps
    shells/                     # 7 shells (client boundaries con hooks)
    hooks/                      # 6 hooks compartidos del motor
    TemplateLayout.tsx          # Entry point: Header + Footer + BottomNav + route switch

src/types/templates/
  primitives.ts     # Tipos union de variantes (HeroVariant, FooterVariant, etc.)
  manifest.ts       # TemplateManifest, TemplateVariants
```

---

_Actualizado: 2026-06-18_
_Sistema actual: 31 variantes en 7 slots, 12 renderers de sección._
