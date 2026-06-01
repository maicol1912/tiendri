---
name: palette-designer
description: >
  Design color palettes for tiendri templates. Covers token architecture, WCAG contrast,
  dark/light palette handling, and integration with the schema-driven dashboard.
  Trigger: When creating palettes for a new template, auditing palette readability,
  or migrating a template to the palette system.
license: Apache-2.0
metadata:
  author: maicol1912
  version: "1.0"
---

## When to Use

- Creating color palettes for a NEW template
- Auditing an existing template's palettes for contrast/readability issues
- Migrating a template from hardcoded colors to the palette system
- Adding palettes to a template that only has the basic `editableColors` schema

## Prerequisites (BEFORE designing palettes)

### 1. Eliminate ALL hardcoded colors from template components

This is the #1 lesson from the tech-premium migration. Palettes are USELESS if components have hardcoded Tailwind colors.

**Audit command — run this FIRST:**
```bash
rg "text-black|text-white|bg-white|bg-black|text-gray-|text-zinc-|text-slate-|bg-gray-|bg-zinc-|bg-slate-|border-gray-|border-black|fill-black|stroke-black|ring-black|divide-gray-" src/templates/{template-name}/components/
```

**Every match MUST be replaced:**

| Hardcoded | Replace with |
|-----------|-------------|
| `text-black`, `text-gray-900` | `text-[var(--t-text-primary)]` |
| `text-gray-700` | `text-[var(--t-text-secondary)]` |
| `text-gray-500`, `text-gray-400` | `text-[var(--t-text-muted)]` |
| `bg-white` | `bg-[var(--t-section-bg)]` or `bg-[var(--t-card-bg)]` |
| `bg-gray-50`, `bg-gray-100` | `bg-[var(--t-card-bg)]` |
| `bg-gray-900`, `bg-black` | `bg-[var(--t-background)]` |
| `border-gray-200`, `border-gray-300` | `border-[var(--t-card-border)]` or `border-[var(--t-divider)]` |
| `hover:bg-gray-50` | `hover:opacity-90` or `hover:bg-[var(--t-card-bg)]` |

**Intentional exceptions** (DO NOT replace):
- Overlay text on content-configured backgrounds (hero banners with bgColor prop)
- Modal backdrops (`bg-black/40`)
- Semantic indicators (`text-red-500` for required fields)
- Product color swatches (content data, not theme)

### 2. Verify TemplateLayoutClient CSS var injection

The template preview route at `src/app/template/[templateName]/TemplateLayoutClient.tsx` manually maps config tokens to CSS variables. The storefront route (`/[slug]`) uses `buildCssVars.ts` which auto-maps.

**TemplateLayoutClient does NOT auto-map.** Every new token MUST be added manually:
```tsx
"--t-text-primary": colors.textPrimary,
"--t-header-bg": colors.headerBg,
"--t-section-bg": colors.sectionBg,
"--t-popular-bg0": colors.popularBg0,
// ... etc
```

`buildCssVars.ts` auto-converts camelCase → `--t-kebab-case`, so the storefront works automatically. But the preview breaks silently if TemplateLayoutClient is missing entries — the CSS var is undefined, browser falls back to transparent/default, and dark palettes look broken.

**Rule: every token added to config.ts MUST also be added to TemplateLayoutClient.tsx.**

## Color Token Architecture

### Required tokens (minimum for any template)

Every palette MUST define ALL tokens the template uses. For tech-premium, that's 40+ tokens grouped by function:

| Group | Tokens | Purpose |
|-------|--------|---------|
| **Core** | `primary`, `secondary`, `background` | Brand identity + page bg |
| **Text** | `textPrimary`, `textSecondary`, `textMuted`, `textSubtle`, `textFooter`, `textBreadcrumb`, `textSummerSale` | All text variants |
| **Surfaces** | `cardBg`, `sectionBg`, `headerBg`, `surface`, `searchBg`, `reviewBg`, `paginationBg`, `specBadgeBg` | Backgrounds for UI areas |
| **Borders** | `border`, `borderLight`, `borderInput`, `borderMid`, `navBorder` | Dividers and borders |
| **Buttons** | `buttonBg`, `buttonText` | CTAs |
| **Footer** | `footerBg` | Footer background |
| **Badges** | `badgeBg`, `badgeText` | Cart badges, discount labels |
| **Interactive** | `tabActive`, `categoryActiveBg`, `categoryActiveText`, `ratingStar`, `ratingBarBg` | Active states |
| **Popular cards** | `popularBg0-3`, `popularText0-3` | See dedicated section below |

### Popular product card tokens (DEDICATED per palette)

This was the hardest lesson. Generic formulas (`color-mix`) produce ugly results on dark palettes. Each palette MUST define exact card backgrounds and text colors.

**Light palettes**: progression from near-white to medium gray
```
popularBg0: "#F6F6F6"   // very light
popularBg1: "#EAEAEA"   // light-medium
popularBg2: "#CDCDCD"   // medium
popularBg3: "#9A9A9A"   // medium-dark (NEVER near-black)
popularText0: "#000000"  // dark text
popularText1: "#000000"  // dark text
popularText2: "#000000"  // dark text
popularText3: "#FFFFFF"  // light text (card is dark enough)
```

**Dark palettes**: progression from clearly-lighter-than-page to near-page-bg
```
// Card 0 MUST be visibly different from page background
popularBg0: "#3A4A5C"   // MUCH lighter than page bg (~#0D1117)
popularBg1: "#2C3A4C"   // medium
popularBg2: "#1E2A3C"   // medium-dark
popularBg3: "#101C2C"   // near page bg
popularText0: "#E6EDF3"  // light text (ALL cards are dark)
popularText1: "#E6EDF3"  // light text
popularText2: "#FFFFFF"  // pure white (darker bg needs max contrast)
popularText3: "#FFFFFF"  // pure white
```

**Critical rules:**
- Card 0 lightest value MUST have visible contrast against page `background`
- Card 3 darkest value approaches but NEVER equals page `background`
- Light palette card 3 goes to medium gray (~#9A9A9A), NEVER to black
- Dark palette card 0 needs to be at least +30-40 lightness points above page bg
- Text colors are per-card, not per-palette — dark palettes use light text on ALL 4

## WCAG Contrast Requirements

Every palette MUST pass these contrast pairs at WCAG AA (4.5:1 minimum):

| Text token | Background token | Min ratio |
|-----------|-----------------|-----------|
| `textPrimary` | `background` | 4.5:1 |
| `textPrimary` | `cardBg` | 4.5:1 |
| `textSecondary` | `background` | 4.5:1 |
| `textMuted` | `background` | 3.0:1 (large text AA) |
| `buttonText` | `buttonBg` | 4.5:1 |
| `categoryActiveText` | `categoryActiveBg` | 4.5:1 |
| `badgeText` | `badgeBg` | 4.5:1 |
| `textFooter` | `footerBg` | 3.0:1 |
| `popularText{N}` | `popularBg{N}` | 4.5:1 (for each N=0,1,2,3) |

**Dark palette gotcha**: if `background` is dark (#0D1117), then `textPrimary` MUST be light (#E6EDF3). ALL text tokens need to be light. If you define a dark bg with dark text, the palette is broken.

## Palette Design Rules

### Diversity (minimum 10 palettes per template)

Each palette MUST have a distinct personality. Cover these aesthetic categories:

| Style | Characteristics | Example |
|-------|----------------|---------|
| `minimal` | Clean, lots of white space, muted | Obsidiana |
| `premium` | Dark, gold/metallic accents, luxury | Lujo Nocturno |
| `corporate` | Blues/grays, professional, trustworthy | Acero Ártico |
| `cyberpunk` | Dark bg, neon accents (cyan/magenta) | Circuito Neón |
| `warm` | Earthy tones, terracotta, cream | Terracota Cálida |
| `brutalist` | High contrast, raw, bold red/black | Crudo Brutalist |
| `nature` | Greens, organic, serene | Jardín Salvia |
| `playful` | Pastels, bright pops, fun | Dulce Pop |
| `tropical` | Teals, corals, sandy | Profundidad Oceánica |
| `vibrant` | Warm oranges/pinks/purples | Flor del Atardecer |
| `monochrome` | Single hue, different saturations | Pizarra Mono |
| `awwwards` | Bold creative, unexpected combos | Índigo Eléctrico |

### Balance (light vs dark)

Recommended split: ~75% light, ~25% dark. Most Colombian merchants prefer light storefronts. But dark palettes are essential for premium/tech brands.

### First palette = current defaults

Palette #1 MUST match the template's existing `config.ts` colors EXACTLY. This ensures existing stores see zero visual change when the palette system is added.

## Palette Data Structure

```typescript
import type { ColorPalette } from "@/types/templates/config-schema";

export const templatePalettes: ColorPalette[] = [
  {
    id: "kebab-case-id",        // stored in customization.theme.paletteId
    name: "Nombre en Español",  // shown in palette picker grid
    description: "Una línea describiendo la estética",
    style: "premium",           // category tag
    preview: ["#hex1", "#hex2", "#hex3", "#hex4", "#hex5"],  // 4-5 swatches for picker
    colors: {
      // ALL tokens — every single one the template uses
      primary: "#...",
      // ... 40+ tokens
    },
  },
];
```

## Integration Checklist (when adding palettes to a template)

### Files to create/modify

```
1. CREATE  src/templates/{name}/palettes.ts
   └─ Export templatePalettes: ColorPalette[]

2. MODIFY  src/templates/{name}/config-schema.ts
   └─ Import palettes, add to theme.palettes

3. MODIFY  src/templates/{name}/config.ts
   └─ Add any new tokens to default colors (must match palette #1)

4. MODIFY  src/app/template/[templateName]/TemplateLayoutClient.tsx
   └─ Add CSS var declarations for ALL new tokens

5. AUDIT   src/templates/{name}/components/**/*.tsx
   └─ Zero hardcoded colors — all use var(--t-*) tokens
```

### Verification steps

1. `npx tsc --noEmit` — zero errors
2. Apply palette #1 (default) — template looks IDENTICAL to before
3. Apply a LIGHT palette — all text readable, all sections visible
4. Apply a DARK palette — all text readable, cards distinct from page bg, popular cards have visible gradient
5. Switch between palettes — no visual artifacts, smooth transitions
6. Check ALL pages: home, product detail, product listing, cart, checkout, search

## Anti-Patterns (mistakes from tech-premium migration)

| Anti-pattern | Why it breaks | Correct approach |
|-------------|---------------|-----------------|
| Using `color-mix()` for popular card backgrounds | Dark palettes produce ugly intermediate colors | Dedicated `popularBg0-3` tokens per palette |
| `footerBg` as dark anchor for card gradient | Footer is near-black — cards go too dark | Use moderate dark anchors, or dedicated tokens |
| Hardcoded `text-black` in components | Dark palettes = black text on dark bg = invisible | `text-[var(--t-text-primary)]` |
| Missing CSS vars in TemplateLayoutClient | Token exists in config but not injected as CSS var | Add EVERY token to TemplateLayoutClient manually |
| Same text color for all popular cards | Dark bg cards need light text, light bg cards need dark | `popularText0-3` per palette |
| Card 0 too close to page bg on dark palettes | No visible distinction between card and page | Card 0 must be +30-40 lightness above page bg |
| Going to near-black on light palette card 3 | Too dramatic, doesn't match original design | Medium gray (~#9A9A9A) max, never black |
| `textMuted` as dark anchor for cards | Better but still produces palette-inappropriate tones | Dedicated tokens give full control |

## Resources

- **Reference palette file**: `src/templates/tech-premium/palettes.ts` (16 palettes, fully verified)
- **Token types**: `src/types/templates/config-schema.ts` → `ColorPalette` interface
- **CSS var builder**: `src/lib/buildCssVars.ts` (auto-maps camelCase → --t-kebab-case for storefront)
- **Preview CSS vars**: `src/app/template/[templateName]/TemplateLayoutClient.tsx` (manual mapping for preview)
- **Config defaults**: `src/templates/tech-premium/config.ts` (reference for token list)
