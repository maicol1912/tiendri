# Composable Variant System — Developer Guide

> How to add new variants and new section slots to the Tiendri template system.

---

## Architecture overview

The composable system separates **what variant to render** from **which template is
rendering it**. Every section slot follows the same four-file pattern:

```
src/templates/_shared/{slot}-variants/
  types.ts       ← Props interface shared by all variants
  Variant1.tsx   ← Presentational component
  Variant2.tsx   ← Presentational component
  index.ts       ← REGISTRY: Record<VariantKey, ComponentType<Props>>
```

Templates consume the registry through a **Router component** that lives inside the
template folder:

```
src/templates/{template-name}/components/{Slot}Router.tsx
```

The router reads `structuralVariants?.{slot}Variant ?? recipe?.default{Slot}Variant`
and resolves the correct component from the registry.

### Current slots and registries

| Slot | Union type | Registry constant | Variants |
|---|---|---|---|
| Hero | `HeroVariant` | `HERO_REGISTRY` | contained, full-bleed, split, text-only, promo-carousel, gradient-promo, split-carousel |
| CardLayout | `CardContentLayout` | `CARD_LAYOUT_REGISTRY` | below-image, overlay-bottom, overlay-full, side-by-side, dark-elevated, lifestyle-background, featured-animated, glassmorphic-discount, action-buttons, masonry-variant |
| Header | `HeaderVariant` | `HEADER_REGISTRY` | minimal-dark, location-greeting, multi-tier, notification, glassmorphic, color-accented |
| Footer | `FooterVariant` | `FOOTER_REGISTRY` | three-column, compact-row, social-icons |
| CategoryNav | `CategoryNavVariant` | `CATEGORY_NAV_REGISTRY` | icon-grid, image-pills, horizontal-scroll, tab-bar, chips |
| BottomNav | `BottomNavVariant` | `BOTTOM_NAV_REGISTRY` | flat-solid, frosted-glass, rounded-top |
| Cart | `CartVariant` | `CART_REGISTRY` | detailed, minimal |
| Checkout | `CheckoutVariant` | `CHECKOUT_REGISTRY` | detailed, minimal |

---

## PART 1: Adding a new variant to an existing slot

**Walkthrough: Adding `video-background` to the Hero slot.**

### Step 1 — Add the value to the union type

File: `src/types/templates/primitives.ts`

```ts
// Before:
export type HeroVariant = "full-bleed" | "contained" | "split" | "text-only" | "promo-carousel" | "gradient-promo" | "split-carousel";

// After:
export type HeroVariant = "full-bleed" | "contained" | "split" | "text-only" | "promo-carousel" | "gradient-promo" | "split-carousel" | "video-background";
```

### Step 2 — Create the variant component

File: `src/templates/_shared/hero-variants/VideoBackground.tsx`

Always use a **default export** — `next/dynamic` requires it.
Include `'use client'` at the top if the component uses any browser API or event handler.
Use CSS vars for colors, never hardcode.

```tsx
'use client';

import type { HeroStaticProps } from './types';

export default function HeroVideoBackground({
  subtitle,
  titleLight,
  titleBold,
  description,
  ctaText,
  onCtaClick,
}: HeroStaticProps) {
  return (
    <section
      className="relative overflow-hidden w-full min-h-[400px]"
      aria-label="Hero promotion"
    >
      {/* Video background — presentational only, no state */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="relative z-10 flex flex-col gap-4 px-6 py-12 text-white">
        <p className="text-white/60 font-semibold">{subtitle}</p>
        <h1 style={{ fontFamily: 'var(--font-heading)' }}>
          <span className="font-light">{titleLight}</span>
          <span className="font-bold">{titleBold}</span>
        </h1>
        <p style={{ color: 'var(--t-text-muted)' }}>{description}</p>
        <button
          type="button"
          className="border border-white text-white bg-transparent px-10 py-3 hover:bg-white/10 transition-colors"
          style={{ transitionDuration: 'var(--t-fx-duration)' }}
          onClick={onCtaClick}
        >
          {ctaText}
        </button>
      </div>
    </section>
  );
}
```

### Step 3 — Register in the registry index

File: `src/templates/_shared/hero-variants/index.ts`

```ts
import dynamic from 'next/dynamic';
import type { HeroVariant } from '@/types/templates';
import type { HeroProps } from './types';

// ... existing dynamic imports ...
const VideoBackground = dynamic(() => import('./VideoBackground')) as React.ComponentType<HeroProps>;

export const HERO_REGISTRY: Record<HeroVariant, React.ComponentType<HeroProps>> = {
  contained: Contained,
  'full-bleed': FullBleed,
  split: Split,
  'text-only': TextOnly,
  'promo-carousel': PromoCarousel,
  'gradient-promo': GradientPromo,
  'split-carousel': SplitCarousel,
  'video-background': VideoBackground,  // ← add here
};
```

TypeScript will error if you add to the union but forget the registry entry — this is intentional.

### Step 4 — Update TemplateRecipe if it becomes a default option

File: `src/types/templates/structural-variants.ts`

No change needed unless you want `video-background` to be a valid `defaultHeroVariant`
in a recipe. The `TemplateRecipe` interface uses `HeroVariant` directly, so it already
accepts the new value.

```ts
// No change required — TemplateRecipe already accepts all HeroVariant values.
// Just update the recipe in the template's config.ts:

recipe: {
  defaultHeroVariant: "video-background",  // ← valid once union is updated
  // ...
}
```

### Step 5 — Update the HeroRouter's VALID_VARIANTS set

Each template has its own `HeroRouter.tsx`. Add the new variant to the `Set`:

```ts
// src/templates/fashion/components/HeroRouter.tsx
const VALID_VARIANTS = new Set<HeroVariant>([
  'contained',
  'full-bleed',
  'split',
  'text-only',
  'promo-carousel',
  'gradient-promo',
  'split-carousel',
  'video-background',  // ← add here
]);
```

Also handle it in the mode branch if it uses `carousel` mode:

```ts
if (variant === 'promo-carousel' || variant === 'split-carousel') {
  return <HeroComponent mode="carousel" cards={[]} />;
}
// video-background uses static mode — no change needed in the else branch
```

### Step 6 — Add the option to the dashboard section-picker

File: `src/app/dashboard/[slug]/customize/page.tsx` (or the section-picker component).
Add a new entry to the hero variant options list so merchants can select it from the UI.

### Step 7 — Test

Run `npx tsc --noEmit` to verify types. The registry `Record<HeroVariant, ...>` will
error at compile time if you missed any union member.

---

## PART 2: Adding a new section slot

**Walkthrough: Adding a `ProductDetail` slot.**

This is a bigger change. It touches types, registry, routers, template pages, and the
dashboard section-picker.

### Step 1 — Create the types.ts

File: `src/templates/_shared/product-detail-variants/types.ts`

Define the props interface that ALL variants will share. Keep it minimal — pass only
what all variants need.

```ts
import type { StorefrontProduct } from '@/types/store';
import type { TemplateLayoutConfig } from '@/types/templates';

export interface ProductDetailProps {
  product: StorefrontProduct;
  currencySymbol: string;
  layout: Partial<TemplateLayoutConfig>;
  onAddToCart?: (productId: string) => void;
  onBack?: () => void;
}
```

### Step 2 — Create variant components

File: `src/templates/_shared/product-detail-variants/Stacked.tsx`
File: `src/templates/_shared/product-detail-variants/SideBySide.tsx`

Follow the same conventions as existing variants:
- Default export (required for `dynamic()`)
- `'use client'` at the top if there are event handlers or browser APIs
- CSS vars for all colors (`var(--t-primary)`, `var(--t-card-bg)`, etc.)
- Props from the shared `ProductDetailProps` interface only
- No state management — this is presentation only

```tsx
'use client';

import type { ProductDetailProps } from './types';

export default function ProductDetailStacked({
  product,
  currencySymbol,
  onAddToCart,
  onBack,
}: ProductDetailProps) {
  return (
    <div className="flex flex-col gap-6 p-6" style={{ background: 'var(--t-background)' }}>
      {/* stacked layout: image above, content below */}
    </div>
  );
}
```

### Step 3 — Create the registry index

File: `src/templates/_shared/product-detail-variants/index.ts`

```ts
import dynamic from 'next/dynamic';
import type { ProductDetailVariant } from '@/types/templates/primitives';
import type { ProductDetailProps } from './types';

const Stacked = dynamic(() => import('./Stacked')) as React.ComponentType<ProductDetailProps>;
const SideBySide = dynamic(() => import('./SideBySide')) as React.ComponentType<ProductDetailProps>;

export const PRODUCT_DETAIL_REGISTRY: Record<ProductDetailVariant, React.ComponentType<ProductDetailProps>> = {
  stacked: Stacked,
  'side-by-side': SideBySide,
};

export type { ProductDetailProps } from './types';
```

### Step 4 — Add the variant type to primitives.ts

File: `src/types/templates/primitives.ts`

```ts
export type ProductDetailVariant = "stacked" | "side-by-side";
```

### Step 5 — Add to StructuralVariants

File: `src/types/templates/structural-variants.ts`

```ts
import type {
  // ... existing imports ...
  ProductDetailVariant,
} from "./primitives";

export interface StructuralVariants {
  // ... existing fields ...
  productDetailVariant?: ProductDetailVariant;
}

export interface TemplateRecipe {
  // ... existing fields ...
  defaultProductDetailVariant?: ProductDetailVariant;
}
```

### Step 6 — Create a router in each template

File: `src/templates/fashion/components/ProductDetailRouter.tsx`

Copy the pattern from `HeroRouter.tsx` — it's identical except for the slot name,
registry, and valid variants set:

```tsx
import { PRODUCT_DETAIL_REGISTRY } from '@/templates/_shared/product-detail-variants';
import type { ProductDetailVariant } from '@/types/templates/primitives';
import type { StructuralVariants, TemplateRecipe } from '@/types/templates/structural-variants';
import type { ProductDetailProps } from '@/templates/_shared/product-detail-variants';

interface ProductDetailRouterProps extends ProductDetailProps {
  structuralVariants?: StructuralVariants;
  recipe?: TemplateRecipe;
}

const VALID_VARIANTS = new Set<ProductDetailVariant>(['stacked', 'side-by-side']);

export function ProductDetailRouter({
  structuralVariants,
  recipe,
  ...props
}: ProductDetailRouterProps) {
  const raw = structuralVariants?.productDetailVariant ?? recipe?.defaultProductDetailVariant ?? 'stacked';
  const variant: ProductDetailVariant = VALID_VARIANTS.has(raw as ProductDetailVariant)
    ? (raw as ProductDetailVariant)
    : 'stacked';

  const Component = PRODUCT_DETAIL_REGISTRY[variant];
  return <Component {...props} />;
}
```

Repeat for every template that should support this slot.

### Step 7 — Wire into template pages

In `src/templates/fashion/components/ProductDetailPage.tsx`, replace any existing
hard-coded product detail rendering with the new router:

```tsx
import { ProductDetailRouter } from './ProductDetailRouter';
import type { StructuralVariants } from '@/types/templates/structural-variants';

interface ProductDetailPageProps {
  // ... existing props ...
  structuralVariants?: StructuralVariants;
}

export function ProductDetailPage({ product, structuralVariants, ...rest }: ProductDetailPageProps) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--t-background)' }}>
      <ProductDetailRouter
        product={product}
        structuralVariants={structuralVariants}
        recipe={fashionConfig.recipe}
        // ... rest of props
      />
    </div>
  );
}
```

### Step 8 — Add to the dashboard section-picker

In the dashboard customize UI, add a new card/dropdown for `productDetailVariant` with
the available options and their labels/previews.

### Step 9 — Add defaultProductDetailVariant to each template recipe

File: `src/templates/fashion/config.ts`

```ts
recipe: {
  // ... existing defaults ...
  defaultProductDetailVariant: "stacked" as const,
},
```

File: `src/templates/pets-modern/config.ts`, and all other templates.

---

## PART 3: Integrating a new template with the composable system

**How to wire a brand-new template (e.g., `jewelry`) into the existing composable system.**

### Step 1 — Create adapters.ts

File: `src/templates/jewelry/adapters.ts`

Every template needs adapter functions to convert from its local types to the shared
`SharedStoreInfo` and `SharedCategory` types that the shared registry components expect.

```ts
import type { StoreInfo, Category, SharedStoreInfo, SharedCategory } from '@/types/store';

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

### Step 2 — Create a router for each slot

Minimum viable set of routers (copy from `fashion/components/`):

| Router file | Registry used | Default fallback |
|---|---|---|
| `HeroRouter.tsx` | `HERO_REGISTRY` | `'text-only'` |
| `HeaderRouter.tsx` | `HEADER_REGISTRY` | `'minimal-dark'` |
| `FooterRouter.tsx` | `FOOTER_REGISTRY` | `'compact-row'` |
| `BottomNavRouter.tsx` | `BOTTOM_NAV_REGISTRY` | `'flat-solid'` |
| `CategoryNavRouter.tsx` | `CATEGORY_NAV_REGISTRY` | `'horizontal-scroll'` |
| `CartRouter.tsx` | `CART_REGISTRY` | `'minimal'` |
| `CheckoutRouter.tsx` | `CHECKOUT_REGISTRY` | `'minimal'` |

Each router follows the same pattern:
1. Read `structuralVariants?.{slot}Variant ?? recipe?.default{Slot}Variant ?? '{fallback}'`
2. Guard with a `VALID_VARIANTS` set
3. Look up `REGISTRY[variant]`
4. Render with the appropriate props (adapting local types to shared types as needed)

### Step 3 — Add a recipe to config.ts

File: `src/templates/jewelry/config.ts`

```ts
recipe: {
  defaultHeroVariant: "contained" as const,
  defaultCategoryNavVariant: "image-pills" as const,
  defaultCardContentLayout: "overlay-bottom" as const,
  defaultBottomNavVariant: "rounded-top" as const,
  defaultHeaderVariant: "glassmorphic" as const,
  defaultFooterVariant: "three-column" as const,
  defaultCartVariant: "detailed" as const,
  defaultCheckoutVariant: "detailed" as const,
},
```

Choose defaults that match the template's visual personality.

### Step 4 — Wire routers into template pages

In `HomePage.tsx`, `ProductListingPage.tsx`, `ProductDetailPage.tsx`, etc., replace
any hard-coded Header/Footer/BottomNav/Hero calls with their Router equivalents:

```tsx
// In jewelry/components/HomePage.tsx

import { HeaderRouter } from './HeaderRouter';
import { HeroRouter } from './HeroRouter';
import { FooterRouter } from './FooterRouter';
import { BottomNavRouter } from './BottomNavRouter';
import { jewelryConfig } from '../config';
import type { StructuralVariants } from '@/types/templates/structural-variants';

export function HomePage({ store, structuralVariants, ...rest }) {
  return (
    <div style={{ background: 'var(--t-background)' }}>
      <HeaderRouter
        store={store}
        structuralVariants={structuralVariants}
        recipe={jewelryConfig.recipe}
        // ... header-specific props
      />

      <main>
        <HeroRouter
          structuralVariants={structuralVariants}
          recipe={jewelryConfig.recipe}
          // ... hero-specific props
        />
        {/* ... rest of page content */}
      </main>

      <FooterRouter
        store={store}
        structuralVariants={structuralVariants}
        recipe={jewelryConfig.recipe}
      />

      <BottomNavRouter
        structuralVariants={structuralVariants}
        recipe={jewelryConfig.recipe}
        // ... bottom nav props
      />
    </div>
  );
}
```

---

## Best practices

### COPY, don't rewrite

When creating a new variant, copy the most visually similar existing variant and modify
it. Rewriting from scratch has historically introduced regressions (Wave 1):
- Broken `HeroProps` discriminated union handling (`mode: 'static' | 'carousel'`)
- Missing `'use client'` directives causing hydration errors
- Using hardcoded hex values instead of CSS vars

**Copy `Contained.tsx` or `BelowImage.tsx` as your starting point.**

### Default export is mandatory

`next/dynamic()` requires a default export. Named exports will break the registry
at runtime with a cryptic error.

```ts
// WRONG — will break dynamic import
export function HeroVideoBackground(props: HeroStaticProps) { ... }

// CORRECT
export default function HeroVideoBackground(props: HeroStaticProps) { ... }
```

### 'use client' when needed

Add `'use client'` at the top of any variant that:
- Has `onClick`, `onChange`, or any event handler
- Uses `useState`, `useEffect`, or any React hook
- Uses browser APIs (`window`, `document`, `localStorage`)

Omit it for purely static/presentational variants with no interactivity.

### CSS vars for styling, props for structure

| Use | For |
|---|---|
| `var(--t-primary)` | colors, borders, shadows |
| `var(--t-fx-duration)` | animation durations |
| `var(--t-radius-base)` | border radii |
| `var(--t-space-*)` | padding, margin, gap |
| Props | number of columns, content text, image URL, callbacks |

Never hardcode hex colors in variant components — the merchant's palette must work.

### Keep variants presentational

Variants must not own state or manage side effects. They receive everything they need
via props from the router.

```ts
// WRONG — variant owns cart state
export default function CartHero() {
  const [items, setItems] = useState([]);
  useEffect(() => { fetchCart().then(setItems); }, []);
  ...
}

// CORRECT — variant only renders
export default function HeroContained({ titleLight, titleBold, onCtaClick }: HeroStaticProps) {
  return (
    <section>
      <h1>{titleLight}{titleBold}</h1>
      <button onClick={onCtaClick}>Shop</button>
    </section>
  );
}
```

### The VALID_VARIANTS guard

Every Router must include a `Set<VariantType>` guard. This prevents a stale
`structuralVariants` value (e.g., from a deleted variant) from crashing the render:

```ts
const raw = structuralVariants?.heroVariant ?? recipe?.defaultHeroVariant ?? 'text-only';
const variant: HeroVariant = VALID_VARIANTS.has(raw as HeroVariant)
  ? (raw as HeroVariant)
  : 'text-only';  // ← safe fallback, never null/undefined
```

### TypeScript as the safety net

The registry type `Record<HeroVariant, React.ComponentType<HeroProps>>` means:
- Adding a value to the union type without adding it to the registry → **compile error**
- Passing the wrong props type to a registry component → **compile error**
- Using a string not in the union → **compile error**

Run `npx tsc --noEmit` after every change to the variant system.
