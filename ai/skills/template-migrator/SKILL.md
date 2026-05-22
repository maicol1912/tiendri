---
name: template-migrator
description: >
  Migrates Figma-designed storefront templates from old tiendri repo to tiendri_v2 config-driven architecture.
  Trigger: When migrating a template, porting a template, creating a new template from Figma, or when user says "migrar template", "portar template", "nuevo template".
license: Apache-2.0
metadata:
  author: maicol1912
  version: "1.0"
---

## When to Use

- Migrating an existing template from `tiendri/src/components/templates/[name]` to `tiendri_v2/src/templates/[name]`
- Creating a new template from Figma designs
- User references a template name to port (e.g., "migremos tech3", "portemos elegant")
- Rebuilding a template with the config-driven architecture

## Reference Implementation

`src/templates/tech-premium/` is the gold standard. Every new template MUST follow its patterns exactly.

## Migration Phases

Execute in order. Do NOT skip phases. Each phase must be verified before moving to the next.

### Phase 1: Discovery

1. Explore source template in OLD repo: `D:\info maicol\Documents\PERSONAL_PROJECTS\tiendri\src\components\templates\[old-name]\`
2. Read EVERY file — inventory components, visual structure, inline data
3. Check for `url.txt` with Figma links
4. Map ALL image references → locate actual files in `public/templates/[old-name]/`
5. Identify all hardcoded data: products, categories, store info, banners, colors, fonts
6. Document the page structure: which pages exist (home, detail, listing, cart, search, checkout)
7. Note the responsive breakpoints and mobile-specific layouts

**Output**: Complete inventory report to share with the user before proceeding.

### Phase 2: Scaffold

Create folder structure in `src/templates/[new-name]/`:

```
[new-name]/
├── config.ts                    # satisfies TemplateConfig
├── types.ts                     # template-specific types + re-exports
├── index.tsx                    # entry point
├── mock/
│   ├── data.ts                  # ALL mock data centralized
│   └── assets.ts                # image path constants
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── BottomNav.tsx
│   ├── SearchBar.tsx
│   ├── HomePage.tsx             # assembles sections via sectionRenderers
│   ├── HomeShell.tsx            # "use client" home wrapper
│   ├── ProductCard.tsx
│   ├── CategoryCard.tsx
│   ├── [template-specific].tsx  # hero, banners, popular, etc.
│   ├── ProductDetailPage.tsx + ProductDetailShellRoute.tsx
│   ├── ProductListingPage.tsx + ListingShellRoute.tsx
│   ├── CartPage.tsx + CartShellRoute.tsx
│   ├── SearchPage.tsx + SearchShellRoute.tsx
│   ├── CheckoutPage.tsx + CheckoutShellRoute.tsx
│   └── FilterSidebar.tsx
├── hooks/
│   └── useTemplateNav.ts        # navigation hook (can copy from tech-premium)
├── context/
│   └── CartContext.tsx           # localStorage cart (can copy from tech-premium)
└── utils/
    ├── grid-classes.ts          # reuse from tech-premium
    └── layout-classes.ts        # reuse from tech-premium
```

### Phase 3: Config Setup

```typescript
import type { TemplateConfig } from "@/types/templates";

export const [name]Config = {
  id: "[new-name]",
  name: "[Display Name]",
  description: "[Spanish description]",
  font: "Inter",
  headingFont: "var(--font-display), ui-sans-serif, system-ui, sans-serif",

  colors: {
    primary: "#...",      // buttons, active states, links
    secondary: "#...",    // dark backgrounds
    background: "#...",   // page background
    cardBg: "#...",       // product card background
    border: "#...",       // general borders
    surface: "#...",      // category cards, input backgrounds
    searchBg: "#...",     // search input background
    textMuted: "#...",    // secondary text
    buttonBg: "#...",     // button background (often same as primary)
    buttonText: "#...",   // button text color
    footerBg: "#...",     // footer background
    // ... add ALL colors used in the template
  },

  radius: {
    card: "Xpx",
    category: "Xpx",
    button: "Xpx",
  },

  grid: {
    products: { mobile: 2, desktop: 4 },
    categories: { mobile: 3, desktop: 6 },
    listing: { mobile: 2, desktop: 3 },
    search: { mobile: 2, desktop: 3 },
  },

  layout: {
    cardStyle: "flat" as const,
    cardHoverEffect: "none" as const,
    cardImageRatio: "square" as const,
    navStyle: "grid" as const,
    tabStyle: "underline" as const,
    bannerHeight: "normal" as const,
    headerStyle: "standard" as const,
    footerStyle: "columns" as const,
  },

  sections: [
    { id: "hero", visible: true },
    { id: "banners", visible: true },
    { id: "categories", visible: true },
    { id: "products", visible: true },
    { id: "popular", visible: true },
    { id: "discounts", visible: true },
    { id: "summer-sale", visible: true },
  ],

  navLinks: [
    { label: "Inicio", href: "/" },
    { label: "Catálogo", href: "/listing" },
    // ...
  ],

  footerServices: ["..."],
  footerAssistance: ["..."],
  productTabs: [
    { id: "new-arrival" as const, label: "Nuevos" },
    { id: "bestseller" as const, label: "Más vendidos" },
    { id: "featured" as const, label: "Destacados" },
  ],
  popularSearches: ["..."],
} as const satisfies TemplateConfig;

export type [Name]Config = typeof [name]Config;
```

### Phase 4: Component Migration

#### Critical Rules

| Rule | Details |
|------|---------|
| **Naming** | Generic: `Header.tsx`, NOT `[Name]Header.tsx` |
| **Strings** | ZERO hardcoded — all from config/mock props |
| **Colors** | ZERO hardcoded hex — all via `var(--t-*)` CSS variables |
| **Grid** | ZERO hardcoded `grid-cols-X` — use `gridColsClass()` utility |
| **Fonts** | Add `style={{ fontFamily: "var(--font-sans)" }}` on headings using `font-thin` or `font-light` |
| **Prices** | `new Intl.NumberFormat("en-US").format(price)` — NEVER `toLocaleString()` |
| **Language** | ALL UI text in Spanish (Colombian) — product brand names stay English |
| **HTML** | Semantic: `<header>`, `<main>`, `<nav>`, `<footer>`, `<section>`, `<article>` |
| **Accessibility** | `aria-label` on all interactive elements, `aria-labelledby` on sections |
| **Images** | Next.js `<Image>` with `priority` on hero, `loading="lazy"` below fold, proper `sizes` |
| **Borders** | Use `border-0` NOT `border-none` (border-none overrides border-b-2) |
| **Tabs** | Use `tabStyleClasses()` from layout-classes.ts |
| **Pattern** | Presentational pages (pure props) + Route shells ("use client" with state + hooks) |

#### Component Injection Pattern

```tsx
// StorefrontShell / HomeShell injects CSS variables:
<div
  className="template-scope"
  style={{
    "--template-heading-font": config.headingFont,
    "--t-primary": config.colors.primary,
    "--t-secondary": config.colors.secondary,
    "--t-background": config.colors.background,
    // ... ALL colors and radius
  } as React.CSSProperties}
>
  {children}
</div>
```

Components consume via Tailwind arbitrary values:
```tsx
className="bg-[var(--t-card-bg)] rounded-[var(--t-radius-card)]"
className="text-[var(--t-text-muted)]"
className="bg-[var(--t-primary)] text-[var(--t-button-text)]"
```

### Phase 5: Images

1. Locate images in OLD repo: `public/templates/[old-name]/`
2. Copy to: `public/mocks/[new-name]/`
3. Standardized naming:
   - `hero-*.png` — hero banner image
   - `banner-*.png` — promotional banners
   - `product-01.png` through `product-08.png` — product images (zero-padded)
   - `popular-01.png` through `popular-04.png` — popular product banners
   - `discount-01.png` through `discount-04.png` — discount product images
   - `summer-sale.png` — summer sale desktop banner
   - `summer-sale-mobile.png` — mobile-specific banner (if exists)
4. **VERIFY file sizes** — images under 3KB are likely corrupt
5. Update `mock/assets.ts` with `.png` extension (NOT `.webp` unless converted)

### Phase 6: Customization Layer

Everything config-driven. After migration:
- Changing `config.colors.primary` updates ALL buttons, badges, active states
- Changing `config.radius.card` updates ALL product cards
- Changing `config.grid.products.desktop` from 4 to 3 changes the grid
- Changing `config.layout.cardStyle` from "flat" to "shadow" adds shadows
- Reordering `config.sections` changes page layout
- Setting `section.visible: false` hides that section

**Verification**: `grep` for hardcoded hex colors in components — must find ZERO.

### Phase 7: URL Routing

Create sub-routes (reuse from tech-premium pattern):

```
src/app/template/[templateName]/
├── layout.tsx              ← shared (CartProvider + CSS vars + customizer)
├── page.tsx                ← home
├── producto/[productId]/
│   └── page.tsx            ← product detail
├── catalogo/
│   └── page.tsx            ← listing
├── carrito/
│   └── page.tsx            ← cart
├── buscar/
│   └── page.tsx            ← search
└── checkout/
    └── page.tsx            ← checkout
```

Each page imports mock data and renders its ShellRoute component.

**Navigation**: All via `useTemplateNav()` hook — `goHome()`, `goProduct(id)`, `goListing()`, `goCart()`, `goSearch()`, `goCheckout()`.

### Phase 8: Integration

1. Add to registry: `src/templates/index.ts`
   ```typescript
   export const templateRegistry = {
     "tech-premium": () => import("./tech-premium"),
     "[new-name]": () => import("./[new-name]"),  // ADD
   };
   ```
2. Add metadata in `src/app/template/[templateName]/page.tsx` `templateMeta`
3. Update `TemplateLayoutClient.tsx` to handle the new template (config loading)
4. Add customizer metadata for the new template

### Phase 9: Verification Checklist

```bash
# TypeScript — must be 0 errors
npx tsc --noEmit

# All routes return 200
curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/template/[new-name]
curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/template/[new-name]/catalogo
curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/template/[new-name]/carrito
curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/template/[new-name]/buscar
curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/template/[new-name]/checkout

# Zero hardcoded hex colors in components
grep -rn "#[0-9A-Fa-f]\{6\}" src/templates/[new-name]/components/ | grep -v "var(--" | grep -v "//"

# Zero direct config imports in shells/pages (only type imports allowed)
grep -rn "import { .*Config }" src/templates/[new-name]/components/ | grep -v "import type"

# Zero --tp- old prefix
grep -rn "\-\-tp-" src/templates/[new-name]/
```

Visual verification:
- [ ] Compare each section with Figma desktop screenshot
- [ ] Compare each section with Figma mobile screenshot
- [ ] Test ALL navigation (nav links, product clicks, cart, search, back/forward)
- [ ] Test filters + pagination in listing page
- [ ] Test search with debounce
- [ ] Test cart add/remove/quantity
- [ ] Test checkout form + WhatsApp/CTA
- [ ] Test customizer: change colors, grid, layout, sections — all reflect live
- [ ] Test mobile carousel for popular products (horizontal snap, not stacked)

## Gotchas (Lessons Learned)

| Gotcha | Solution |
|--------|----------|
| Fonts look wrong on headings | Space Grotesk doesn't have weight 100/300. Add `fontFamily: "var(--font-sans)"` on h1-h6 using `font-thin`/`font-light` |
| Price hydration mismatch | Use `Intl.NumberFormat("en-US")` not `toLocaleString()` |
| Underline not showing on tabs | `border-none` kills `border-b-2`. Use `border-0` instead |
| Grid doesn't change with config | Tailwind purges dynamic classes. Use `gridColsClass()` static map |
| Customizer only affects home | Config must flow via props to ALL shell/page components |
| Images look broken | Check file size — under 3KB = likely corrupt |
| Duplicate React key error | Don't use `banner.title` as key when titles repeat (e.g., "Apple"). Use index: `${title}-${idx}` |
| Mobile hydration warning `bis_register` | Browser extension (Bing) — harmless, ignore |
| Category radius not updating | Check for hardcoded `rounded-[15px]` — must be `rounded-[var(--t-radius-category)]` |
| Nav links don't match destinations | Labels must describe WHERE they go, not generic "About"/"Blog" |

## Commands

```bash
# Start dev server
cd "D:/info maicol/Documents/PERSONAL_PROJECTS/tiendri_v2" && pnpm dev

# Type check
npx tsc --noEmit

# List template files
ls src/templates/[name]/

# Find hardcoded colors
grep -rn "#[0-9A-Fa-f]\{6\}" src/templates/[name]/components/

# Find direct config imports
grep -rn "from \"../config\"" src/templates/[name]/components/ | grep -v "import type"

# Copy images from old repo
cp "D:/info maicol/Documents/PERSONAL_PROJECTS/tiendri/public/templates/[old-name]/"* "D:/info maicol/Documents/PERSONAL_PROJECTS/tiendri_v2/public/mocks/[new-name]/"
```

## Resources

- **Reference implementation**: `src/templates/tech-premium/` — the gold standard
- **Global types**: `src/types/templates/` — TemplateConfig contract
- **Config resolver**: `src/lib/resolveTemplateConfig.ts`
- **Shared utils**: `src/templates/tech-premium/utils/` — grid-classes.ts, layout-classes.ts (copy to new template)
- **Route structure**: `src/app/template/[templateName]/` — layout + sub-routes
