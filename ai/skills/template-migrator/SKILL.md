---
name: template-migrator
description: >
  Migrates Figma-designed storefront templates from old tiendri repo to tiendri_v2 config-driven architecture.
  Trigger: When migrating a template, porting a template, creating a new template from Figma, or when user says "migrar template", "portar template", "nuevo template".
license: Apache-2.0
metadata:
  author: maicol1912
  version: "1.1"
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
| **Border Radius** | ZERO hardcoded — ALL via CSS vars. See Rule 14 below |
| **Layout Props** | ALL card/grid components accept `layout` prop. See Rule 15 below |
| **Section Order** | HomePage uses `sectionRenderers` pattern. See Rule 17 below |
| **Config Flow** | Shells read from `useLayoutConfig()` context. See Rule 18 below |

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

#### Rule 14: ZERO Hardcoded Border Radius

Every border radius MUST use CSS variables, never hardcoded values:

| Element | CSS Variable |
|---------|-------------|
| Cards | `rounded-[var(--t-radius-card)]` |
| Buttons | `rounded-[var(--t-radius-button)]` |
| Category pills | `rounded-[var(--t-radius-category)]` |
| Search inputs | `rounded-[var(--t-radius-button)]` |
| Size/color selectors | `rounded-[var(--t-radius-button)]` |

Even if the template design uses 0px radius, use the CSS var — the merchant must be able to change it.

NEVER: `rounded-none`, `rounded-0`, `borderRadius: "0px"`, `rounded-[4px]`
ALWAYS: `rounded-[var(--t-radius-card)]` or `rounded-[var(--t-radius-button)]`

#### Rule 15: Layout Props on ALL Components

Every component that renders cards, grids, or configurable elements MUST accept a `layout` prop:

```typescript
layout?: {
  cardStyle?: string;
  cardHoverEffect?: string;
  cardImageRatio?: string;
  headerStyle?: string;
  footerStyle?: string;
}
```

Apply using utility functions from `utils/layout-classes.ts`:
- `cardStyleClass(layout?.cardStyle ?? "flat")` → flat/shadow/bordered/elevated
- `hoverEffectClass(layout?.cardHoverEffect ?? "scale")` → none/lift/scale/glow
- `imageRatioClass(layout?.cardImageRatio ?? "portrait")` → square/portrait/wide

NEVER hardcode: `hover:scale-[1.02]`, `hover:shadow-lg`, `aspect-[3/4]`, `style={{ aspectRatio: "3/4" }}`

#### Rule 16: Grid Columns from Config

Every product/category grid MUST read columns from config, never hardcoded:
- `gridColsClass(grid?.mobile ?? 2, grid?.desktop ?? 4)` from `utils/grid-classes.ts`
- Accept `grid?: { mobile: number; desktop: number }` prop on page/section components
- NEVER: `grid-cols-2 md:grid-cols-4`, `md:grid-cols-3 lg:grid-cols-4`
- ALWAYS: `gridColsClass(mobile, desktop)` using values from props

#### Rule 17: Section Reordering + Visibility (HomePage)

HomePage MUST implement the `sectionRenderers` pattern:

```typescript
const sectionRenderers: Record<string, () => React.ReactNode> = {
  hero: () => <HeroSection {...heroProps} />,
  collections: () => <CollectionSection {...collectionProps} />,
  editorial: () => <EditorialSection {...editorialProps} />,
};

// In JSX — sections are dynamic, filterable, reorderable:
<main>
  {sections
    .filter((s) => s.visible)
    .map((s) => (
      <Fragment key={s.id}>{sectionRenderers[s.id]?.()}</Fragment>
    ))}
</main>
```

- Header and Footer stay OUTSIDE the dynamic sections (always visible)
- Accept `sections?: Array<{ id: string; visible: boolean }>` prop
- Fall back to `config.sections` defaults when prop is not provided

#### Rule 18: Config Flow via useLayoutConfig

HomeShell and ALL shell routes MUST read live config from `useLayoutConfig()` context:

```typescript
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";

const config = useLayoutConfig<TemplateConfig>();
const layout = config?.layout ?? defaultConfig.layout;
const grid = config?.grid ?? defaultConfig.grid;
const sections = config?.sections ?? defaultConfig.sections;
```

Pass `layout`, `grid`, and `sections` to page components. Page components pass `layout` and `grid` to child components (ProductCard, HeroSection, etc.).

Without this wiring, ThemeCustomizer changes update CSS vars but leave grid/layout/sections frozen at defaults.

#### Rule 19: Header + Footer Accept Layout Style

Header MUST accept `layout?: { headerStyle?: string }` and conditionally render:
- `"centered"` (default): logo left, nav center, icons right
- `"standard"`: logo + nav left, icons right
- `"minimal"`: logo center only, icons right

Footer MUST accept `layout?: { footerStyle?: string }` and conditionally render:
- `"minimal"`: brand + copyright only
- `"columns"`: multi-column with link groups
- `"centered"`: everything centered, stacked

#### Rule 20: Icon Contrast in Dark Containers

If icons are placed inside dark-background circles (e.g., cart/user buttons with `bg-[var(--t-secondary)]`):
- Icons MUST use a LIGHT color: `text-[var(--t-card-bg)]` or `text-[var(--t-background)]`
- NEVER use `text-[var(--t-text-primary)]` or `text-[var(--t-button-text)]` inside dark circles — they will be invisible (dark on dark)

#### Rule 21: Product Card 3-Line Layout

If the original template shows category/subtitle + product name + price, preserve ALL 3 lines:
- Line 1: category/subtitle in muted text (`text-[var(--t-text-muted)]`, smaller size)
- Line 2: product name in bold (`text-[var(--t-text-primary)]`, `font-bold`)
- Line 3: price

Check if `StorefrontProduct.subtitle` field is needed — add it as optional to shared types if so.

#### Rule 22: Font Variables

Components using `fontFamily` MUST reference CSS vars:
- Body text: `var(--font-sans)` or `var(--font-body)`
- Headings: `var(--font-display)` or `var(--font-heading)`

`buildCssVars.ts` MUST inject `--font-sans` as an alias for `--font-body` (some template components use `var(--font-sans)` directly). Verify font injection works before declaring migration complete.

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

**config-schema.ts checklist** — the following MUST be exposed and wired to ThemeCustomizer:
- [ ] Grid fields: `grid.products`, `grid.categories`, `grid.listing`, `grid.search` with mobile/desktop subfields
- [ ] Layout options: `cardStyle`, `cardHoverEffect`, `cardImageRatio`, `headerStyle`, `footerStyle`
- [ ] Section reordering controls with labels per section
- [ ] Radius fields: `radius.card`, `radius.category`, `radius.button`
- [ ] Font pair picker (if template supports font switching)

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
3. Update `TemplateLayoutClient.tsx`:
   - [ ] Add to `TEMPLATE_UI_CONFIGS` registry with: `defaultConfig`, `label`, `colorFields`, `gridFields`, `layoutOptions`, `sectionLabels`, `palettes`
   - [ ] `buildCssVars()` auto-maps ALL color tokens + radius + fonts (including `--font-sans` alias)
   - [ ] `CartWrapper` component selects the correct CartProvider for this template
   - [ ] Add to `LAYOUT_SUPPORTED_TEMPLATES` list
   - [ ] Verify `useLayoutConfig<T>()` generic resolves correctly for the new template's config type
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

# Zero hardcoded border radius
grep -rn "rounded-none\|rounded-0\|borderRadius.*0px\|rounded-\[0\]" src/templates/[new-name]/components/

# Zero hardcoded grid columns
grep -rn "grid-cols-[0-9]\|md:grid-cols-[0-9]\|lg:grid-cols-[0-9]" src/templates/[new-name]/components/

# Zero hardcoded hover/aspect classes
grep -rn "hover:scale-\|hover:shadow-lg\|aspect-\[" src/templates/[new-name]/components/
```

Visual verification:
- [ ] Compare each section with Figma desktop screenshot
- [ ] Compare each section with Figma mobile screenshot
- [ ] Test ALL navigation (nav links, product clicks, cart, search, back/forward)
- [ ] Test filters + pagination in listing page
- [ ] Test search with debounce
- [ ] Test cart add/remove/quantity
- [ ] Test checkout form + WhatsApp/CTA
- [ ] Test mobile carousel for popular products (horizontal snap, not stacked)

ThemeCustomizer verification (MANDATORY — every item must pass):
- [ ] Change palette → ALL colors update across ALL pages
- [ ] Change radius (card) → ALL card corners update
- [ ] Change radius (button) → ALL buttons, inputs, selectors update
- [ ] Change radius (category) → ALL category pills update
- [ ] Change grid columns (products) → product grid updates on home AND catalog pages
- [ ] Change grid columns (categories) → category grid updates
- [ ] Reorder sections → sections render in new order on home page
- [ ] Hide a section → section disappears immediately
- [ ] Change card style to "shadow" → cards get shadows
- [ ] Change card style to "bordered" → cards get visible border
- [ ] Change hover effect to "none" → no hover animation
- [ ] Change hover effect to "lift" → cards lift on hover
- [ ] Change image ratio to "square" → card images become square
- [ ] Change image ratio to "portrait" → card images become portrait
- [ ] Change font pair → all text (body + headings) updates
- [ ] Change header style → header layout changes
- [ ] Change footer style → footer layout changes

## Gotchas (Lessons Learned)

| # | Gotcha | Solution |
|---|--------|----------|
| 1 | Fonts look wrong on headings | Space Grotesk doesn't have weight 100/300. Add `fontFamily: "var(--font-sans)"` on h1-h6 using `font-thin`/`font-light` |
| 2 | Price hydration mismatch | Use `Intl.NumberFormat("en-US")` not `toLocaleString()` |
| 3 | Underline not showing on tabs | `border-none` kills `border-b-2`. Use `border-0` instead |
| 4 | Grid doesn't change with config | Tailwind purges dynamic classes. Use `gridColsClass()` static map |
| 5 | Customizer only affects home | Config must flow via props to ALL shell/page components |
| 6 | Images look broken | Check file size — under 3KB = likely corrupt |
| 7 | Duplicate React key error | Don't use `banner.title` as key when titles repeat (e.g., "Apple"). Use index: `${title}-${idx}` |
| 8 | Mobile hydration warning `bis_register` | Browser extension (Bing) — harmless, ignore |
| 9 | Category radius not updating | Check for hardcoded `rounded-[15px]` — must be `rounded-[var(--t-radius-category)]` |
| 10 | Nav links don't match destinations | Labels must describe WHERE they go, not generic "About"/"Blog" |
| 11 | ThemeCustomizer changes invisible | HomeShell/shells must read from `useLayoutConfig()` context and pass to page components. Without this, customizer edits update CSS vars but NOT grid/layout/sections |
| 12 | Icons invisible in dark circles | Cart/user icons inside dark bg circles need light text color (`text-[var(--t-card-bg)]`), not primary text color |
| 13 | Grid columns don't update | Using hardcoded `grid-cols-X` classes. MUST use `gridColsClass()` with values from config via props |
| 14 | Sections can't be reordered | HomePage renders components in hardcoded order. MUST use `sectionRenderers` pattern with `sections.filter(s => s.visible).map(...)` |
| 15 | Border radius stuck at 0 | Components use `rounded-none` or `borderRadius: "0px"`. MUST use `var(--t-radius-card)` / `var(--t-radius-button)` |
| 16 | Font pair switching doesn't work | `buildCssVars.ts` must inject `--font-sans` alias alongside `--font-body` for templates that use `var(--font-sans)` |

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

# Find hardcoded border radius (must return 0)
grep -rn "rounded-none\|rounded-0\|borderRadius.*0px" src/templates/[name]/components/

# Find hardcoded grid columns (must return 0)
grep -rn "grid-cols-[0-9]\|md:grid-cols-[0-9]" src/templates/[name]/components/

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
- **ThemeCustomizer registry**: `src/app/template/[templateName]/TemplateLayoutClient.tsx` — TEMPLATE_UI_CONFIGS, buildCssVars, CartWrapper, LAYOUT_SUPPORTED_TEMPLATES
