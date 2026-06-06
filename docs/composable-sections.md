# Sistema de Secciones Composables — Referencia Técnica

> Fuente de verdad para el sistema de variantes de sección composables.
> Leer `docs/template-system.md` antes si no estás familiarizado con la arquitectura de templates.

---

## Tabla de contenidos

1. [Qué son las secciones composables](#1-qué-son-las-secciones-composables)
2. [Los 8 slots de sección](#2-los-8-slots-de-sección)
3. [Arquitectura: el patrón de registro](#3-arquitectura-el-patrón-de-registro)
4. [TemplateRecipe — defaults del template](#4-templaterecipe--defaults-del-template)
5. [StructuralVariants — overrides del merchant](#5-structuralvariants--overrides-del-merchant)
6. [Contratos SharedStoreInfo y SharedCategory](#6-contratos-sharedstoreinfo-y-sharedcategory)
7. [Patrón Adapter — normalización de datos por template](#7-patrón-adapter--normalización-de-datos-por-template)
8. [Patrón Router — selección de variante en runtime](#8-patrón-router--selección-de-variante-en-runtime)
9. [Cómo agregar una nueva variante a un slot existente](#9-cómo-agregar-una-nueva-variante-a-un-slot-existente)
10. [Cómo agregar un nuevo slot de sección](#10-cómo-agregar-un-nuevo-slot-de-sección)
11. [Estructura de archivos](#11-estructura-de-archivos)

---

## 1. Qué son las secciones composables

Las secciones composables son el sistema que permite que múltiples variantes visuales de una misma sección (Hero, Header, Card, etc.) sean intercambiables en runtime sin modificar el código de ningún template.

**Por qué existe:**

- Un merchant puede elegir que su Hero sea "split" en lugar de "contained" sin que el template sepa nada de eso
- Múltiples templates pueden compartir las mismas variantes de sección (código DRY)
- Se pueden agregar nuevas variantes sin tocar templates existentes
- El sistema de onboarding puede asignar variantes según la vibe elegida

**Principio fundamental:** Los templates definen *qué slots existen* y *cuáles son sus defaults* (vía `TemplateRecipe`). Los merchants *sobreescriben* qué variante usar en cada slot (vía `StructuralVariants`). Las variantes son componentes React independientes que viven en `src/templates/_shared/`.

---

## 2. Los 8 slots de sección

| Slot | Tipo de variante | Registro | Variantes disponibles |
|---|---|---|---|
| Hero | `HeroVariant` | `HERO_REGISTRY` | contained, full-bleed, split, text-only, promo-carousel, gradient-promo, split-carousel |
| Header | `HeaderVariant` | `HEADER_REGISTRY` | minimal-dark, location-greeting, multi-tier, notification, glassmorphic, color-accented |
| Card layout | `CardContentLayout` | `CARD_LAYOUT_REGISTRY` | below-image, overlay-bottom, overlay-full, side-by-side, dark-elevated, lifestyle-background, featured-animated, glassmorphic-discount, action-buttons, masonry-variant |
| Category nav | `CategoryNavVariant` | `CATEGORY_NAV_REGISTRY` | icon-grid, image-pills, horizontal-scroll, tab-bar, chips |
| Footer | `FooterVariant` | `FOOTER_REGISTRY` | three-column, compact-row, social-icons |
| Bottom nav | `BottomNavVariant` | `BOTTOM_NAV_REGISTRY` | flat-solid, frosted-glass, rounded-top |
| Cart | `CartVariant` | `CART_REGISTRY` | detailed, minimal |
| Checkout | `CheckoutVariant` | `CHECKOUT_REGISTRY` | detailed, minimal |

**Total: 38 variantes en 8 slots.**

### Conteo por slot

| Slot | Variantes |
|---|---|
| Hero | 7 |
| Header | 6 |
| Card layout | 10 |
| Category nav | 5 |
| Footer | 3 |
| Bottom nav | 3 |
| Cart | 2 |
| Checkout | 2 |
| **Total** | **38** |

---

## 3. Arquitectura: el patrón de registro

Cada slot sigue el mismo patrón de tres archivos:

```
src/templates/_shared/{slot}-variants/
├── types.ts     — interfaz de props del slot
├── index.ts     — registro: Record<VariantKey, ComponentType<Props>>
└── Variant1.tsx
└── Variant2.tsx
└── ...
```

### El registro

Cada slot exporta un objeto `REGISTRY` que mapea cada clave de variante a un componente React, cargado con `next/dynamic` para code-splitting automático:

```typescript
// Patrón estándar — ejemplo: hero-variants/index.ts
import dynamic from 'next/dynamic';
import type { HeroVariant } from '@/types/templates';
import type { HeroProps } from './types';

const Contained = dynamic(() => import('./Contained')) as React.ComponentType<HeroProps>;
// ... resto de variantes

export const HERO_REGISTRY: Record<HeroVariant, React.ComponentType<HeroProps>> = {
  contained: Contained,
  'full-bleed': FullBleed,
  split: Split,
  'text-only': TextOnly,
  'promo-carousel': PromoCarousel,
  'gradient-promo': GradientPromo,
  'split-carousel': SplitCarousel,
};
```

Las claves del registro son exactamente los valores del tipo union en `src/types/templates/primitives.ts`. Agregar una variante al tipo sin agregarla al registro (o viceversa) produce un error de TypeScript.

---

## 4. TemplateRecipe — defaults del template

Definido en `src/types/templates/structural-variants.ts`. Un `TemplateRecipe` es la declaración del template de cuáles variantes usar por defecto para cada slot:

```typescript
export interface TemplateRecipe {
  defaultHeroVariant: HeroVariant;
  defaultCategoryNavVariant: CategoryNavVariant;
  defaultCardContentLayout: CardContentLayout;
  defaultBottomNavVariant: BottomNavVariant;
  defaultHeaderVariant?: HeaderVariant;
  defaultFooterVariant?: FooterVariant;
  defaultCartVariant?: CartVariant;
  defaultCheckoutVariant?: CheckoutVariant;
}
```

Los campos `defaultHeaderVariant`, `defaultFooterVariant`, `defaultCartVariant` y `defaultCheckoutVariant` son opcionales para compatibilidad retroactiva con templates que no han definido un default explícito para esos slots.

Cada template define su `TemplateRecipe` en su propio archivo de configuración. El router de cada slot usa este recipe como fallback cuando el merchant no ha especificado una variante.

---

## 5. StructuralVariants — overrides del merchant

Definido en `src/types/templates/structural-variants.ts`. Vive dentro de `StoreCustomization` y representa las elecciones del merchant sobre qué variante usar en cada slot:

```typescript
export interface StructuralVariants {
  cardContentLayout?: CardContentLayout;
  heroVariant?: HeroVariant;
  categoryNavStyle?: CategoryNavPattern;
  categoryNavVariant?: CategoryNavVariant;
  addToCartStyle?: AddToCartStyle;
  bottomNavVariant?: BottomNavVariant;
  headerVariant?: HeaderVariant;
  footerVariant?: FooterVariant;
  cartVariant?: CartVariant;
  checkoutVariant?: CheckoutVariant;
}
```

Todos los campos son opcionales. Un campo `undefined` significa "usar el default del template" (el `TemplateRecipe`). Esto garantiza que un merchant que nunca cambia nada sigue viendo el template como fue diseñado.

### Resolución de variante en runtime

La precedencia es siempre:

```
StructuralVariants (merchant) > TemplateRecipe (template default) > hardcoded fallback
```

En código:

```typescript
const variant = structuralVariants?.heroVariant ?? recipe?.defaultHeroVariant ?? 'contained';
```

---

## 6. Contratos SharedStoreInfo y SharedCategory

Definidos en `src/types/store.ts`. Son las interfaces mínimas que los componentes de sección pueden recibir, independientemente del template que los use.

### SharedStoreInfo

```typescript
export interface SharedStoreInfo {
  name: string;
  slug: string;
  logo?: string | null;
  description?: string | null;
  whatsapp?: string | null;
  social_links?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    tiktok?: string;
    youtube?: string;
  } | null;
}
```

Usada por: `HeaderProps`, `FooterProps`.

### SharedCategory

```typescript
export interface SharedCategory {
  id: string;
  name: string;
  image?: string | null;
  icon?: string | null;
}
```

Usada por: `CategoryNavProps`.

Estas interfaces son un **subconjunto** de los tipos nativos de cada template. El adapter transforma los tipos nativos a estas interfaces antes de pasarlos a los componentes de sección.

---

## 7. Patrón Adapter — normalización de datos por template

Cada template tiene un archivo `adapters.ts` que convierte sus tipos de datos nativos a los contratos compartidos. Esto desacopla los componentes de sección de la implementación interna de cada template.

### Ejemplo: `src/templates/tech-premium/adapters.ts`

```typescript
import type { StoreInfo, Category, SharedStoreInfo, SharedCategory } from "@/types/store";

export function toSharedStore(store: StoreInfo): SharedStoreInfo {
  return {
    name: store.name,
    slug: store.slug,
    logo: store.logo,
    description: store.description ?? null,
    whatsapp: store.whatsapp ?? null,
    social_links: store.social_links ?? null,
  };
}

export function toSharedCategories(categories: Category[]): SharedCategory[] {
  return categories.map((c) => ({
    id: c.id,
    name: c.name,
    icon: c.icon ?? null,
    image: null,
  }));
}
```

El template llama a estos adapters antes de pasar datos a los componentes de sección compartidos:

```tsx
// En el componente de página del template
<CategoryNavRouter
  categories={toSharedCategories(nativeCategories)}
  structuralVariants={structuralVariants}
  recipe={recipe}
/>
```

---

## 8. Patrón Router — selección de variante en runtime

Cada slot tiene un componente "Router" en el directorio del template que:
1. Lee `structuralVariants?.{variant}` y `recipe?.default{Slot}Variant`
2. Valida que la variante sea un valor conocido
3. Busca el componente en el registro
4. Renderiza el componente con las props correctas

### Ejemplo: `src/templates/tech-premium/components/HeroRouter.tsx`

```typescript
import { HERO_REGISTRY } from '@/templates/_shared/hero-variants';
import type { HeroVariant } from '@/types/templates';
import type { StructuralVariants, TemplateRecipe } from '@/types/templates/structural-variants';

const VALID_VARIANTS = new Set<HeroVariant>([
  'contained', 'full-bleed', 'split', 'text-only', 'promo-carousel',
]);

export function HeroRouter({ data, structuralVariants, recipe, onCtaClick }) {
  const raw = structuralVariants?.heroVariant ?? recipe?.defaultHeroVariant ?? 'contained';
  const variant: HeroVariant = VALID_VARIANTS.has(raw as HeroVariant) ? raw as HeroVariant : 'contained';
  const HeroComponent = HERO_REGISTRY[variant];

  if (variant === 'promo-carousel') {
    return <HeroComponent mode="carousel" cards={[]} />;
  }

  return (
    <HeroComponent
      mode="static"
      subtitle={data.subtitle}
      titleLight={data.titleLight}
      // ...
    />
  );
}
```

El `VALID_VARIANTS` set actúa como guardrail contra variantes inválidas que puedan venir de `StoreCustomization` corrupta o desactualizada.

---

## 9. Cómo agregar una nueva variante a un slot existente

### Paso 1: Agregar el ID al tipo union

En `src/types/templates/primitives.ts`, agregar el nuevo valor al tipo correspondiente:

```typescript
// Ejemplo: agregar "masonry-columns" a HeroVariant
export type HeroVariant = "full-bleed" | "contained" | "split" | "text-only"
  | "promo-carousel" | "gradient-promo" | "split-carousel" | "masonry-columns"; // nuevo
```

### Paso 2: Crear el componente de variante

En `src/templates/_shared/{slot}-variants/`, crear el nuevo archivo de componente. Debe implementar la interfaz de props del slot (definida en `types.ts`):

```typescript
// src/templates/_shared/hero-variants/MasonryColumns.tsx
import type { HeroProps } from './types';

export default function MasonryColumns(props: HeroProps) {
  // ... implementación
}
```

### Paso 3: Registrar la variante

En `src/templates/_shared/{slot}-variants/index.ts`, importar y agregar al registro:

```typescript
const MasonryColumns = dynamic(() => import('./MasonryColumns')) as React.ComponentType<HeroProps>;

export const HERO_REGISTRY: Record<HeroVariant, React.ComponentType<HeroProps>> = {
  // ... existentes
  'masonry-columns': MasonryColumns,
};
```

TypeScript forzará que el registro tenga todas las claves del tipo union.

### Paso 4: (Opcional) Actualizar el Router del template

Si la nueva variante requiere una lógica especial de renderizado (como `promo-carousel` que usa `mode="carousel"`), actualizarla en el `*Router.tsx` del template.

### Paso 5: Verificar tipos

```bash
npx tsc --noEmit
```

---

## 10. Cómo agregar un nuevo slot de sección

Un "nuevo slot" es una sección completamente nueva que no existe aún (ej: un slot para la sección de "testimonios" o "banners de promoción").

### Paso 1: Agregar el tipo de variante a primitives.ts

```typescript
// src/types/templates/primitives.ts
export type TestimonialsVariant = "carousel" | "grid" | "single-featured";
```

### Paso 2: Crear los archivos del slot

```
src/templates/_shared/testimonials-variants/
├── types.ts       — interface TestimonialsProps { ... }
├── index.ts       — TESTIMONIALS_REGISTRY
├── Carousel.tsx
├── Grid.tsx
└── SingleFeatured.tsx
```

### Paso 3: Agregar al tipo CartVariant o CheckoutVariant según corresponda

O bien, agregar el nuevo campo de variante a `StructuralVariants` en `src/types/templates/structural-variants.ts`:

```typescript
export interface StructuralVariants {
  // ... existentes
  testimonialsVariant?: TestimonialsVariant;
}
```

Y si el template debe tener un default, agregar a `TemplateRecipe`:

```typescript
export interface TemplateRecipe {
  // ... existentes
  defaultTestimonialsVariant?: TestimonialsVariant;
}
```

### Paso 4: Crear el Router en el template

Crear `src/templates/{template-name}/components/TestimonialsRouter.tsx` siguiendo el patrón descrito en la sección 8.

### Paso 5: Usar el Router en la página del template

En la página principal del template, incluir el nuevo Router en la jerarquía de componentes.

### Paso 6: Verificar tipos

```bash
npx tsc --noEmit
```

---

## 11. Estructura de archivos

```
src/templates/_shared/
├── style-maps.ts                    — class maps compartidos (CARD_STYLE_MAP, etc.)
├── hero-variants/
│   ├── types.ts                     — HeroProps (HeroStaticProps | HeroCarouselProps)
│   ├── index.ts                     — HERO_REGISTRY
│   ├── Contained.tsx
│   ├── FullBleed.tsx
│   ├── Split.tsx
│   ├── TextOnly.tsx
│   ├── PromoCarousel.tsx
│   ├── GradientPromo.tsx
│   └── SplitCarousel.tsx
├── header-variants/
│   ├── types.ts                     — HeaderProps (store, cartItemCount, callbacks)
│   ├── index.ts                     — HEADER_REGISTRY
│   ├── MinimalDark.tsx
│   ├── LocationGreeting.tsx
│   ├── MultiTier.tsx
│   ├── Notification.tsx
│   ├── Glassmorphic.tsx
│   └── ColorAccented.tsx
├── card-layouts/
│   ├── types.ts                     — CardLayoutProps (product, layout, class maps, callbacks)
│   ├── index.ts                     — CARD_LAYOUT_REGISTRY
│   ├── BelowImage.tsx
│   ├── OverlayBottom.tsx
│   ├── OverlayFull.tsx
│   ├── SideBySide.tsx
│   ├── DarkElevated.tsx
│   ├── LifestyleBackground.tsx
│   ├── FeaturedAnimated.tsx
│   ├── GlassmorphicDiscount.tsx
│   ├── ActionButtons.tsx
│   └── MasonryVariant.tsx
├── category-nav-variants/
│   ├── types.ts                     — CategoryNavProps (categories, activeCategoryId, callback)
│   ├── index.ts                     — CATEGORY_NAV_REGISTRY
│   ├── IconGrid.tsx
│   ├── ImagePills.tsx
│   ├── HorizontalScroll.tsx
│   ├── TabBar.tsx
│   └── Chips.tsx
├── footer-variants/
│   ├── types.ts                     — FooterProps (store, services, assistance, showBranding)
│   ├── index.ts                     — FOOTER_REGISTRY
│   ├── ThreeColumn.tsx
│   ├── CompactRow.tsx
│   └── SocialIcons.tsx
├── bottom-nav-variants/
│   ├── types.ts                     — BottomNavProps (activeTab, cartItemCount, onTabChange)
│   ├── index.ts                     — BOTTOM_NAV_REGISTRY
│   ├── FlatSolid.tsx
│   ├── FrostedGlass.tsx
│   └── RoundedTop.tsx
├── cart-variants/
│   ├── types.ts                     — CartPageProps (items, subtotal, tax, callbacks)
│   ├── index.ts                     — CART_REGISTRY
│   ├── DetailedCart.tsx
│   └── MinimalCart.tsx
└── checkout-variants/
    ├── types.ts                     — CheckoutPageProps + DetailedCheckoutProps + MinimalCheckoutProps
    ├── index.ts                     — CHECKOUT_REGISTRY
    ├── DetailedCheckout.tsx
    └── MinimalCheckout.tsx

src/types/templates/
└── structural-variants.ts           — StructuralVariants + TemplateRecipe

src/templates/tech-premium/
├── adapters.ts                      — toSharedStore, toSharedCategories
└── components/
    └── HeroRouter.tsx               — Router del slot Hero
```

---

_Última actualización: 2026-06-06_
_Basado en: `src/templates/_shared/*/types.ts`, `src/templates/_shared/*/index.ts`, `src/types/templates/structural-variants.ts`, `src/templates/tech-premium/adapters.ts`, `src/templates/tech-premium/components/HeroRouter.tsx`_
