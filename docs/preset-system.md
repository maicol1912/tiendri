# Style Preset System — Complete Technical Reference

> Phase 1 of the Tiendri V2 customization roadmap.
> This document is the single source of truth for implementing the preset system end-to-end.
> Read `docs/template-system.md` first if you are not yet familiar with the template architecture.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Architecture](#2-architecture)
3. [The 8 Presets](#3-the-8-presets)
4. [New Types Required](#4-new-types-required)
5. [buildCssVars Expansion](#5-buildcssvars-expansion)
6. [Component Consumption Pattern](#6-component-consumption-pattern)
7. [Dashboard Integration](#7-dashboard-integration)
8. [Anti-Ugliness Guardrails](#8-anti-ugliness-guardrails)
9. [Implementation Plan](#9-implementation-plan)
10. [Migration Notes](#10-migration-notes)

---

## 1. Overview

### What Is the Preset System?

A **style preset** is a one-click personality for a merchant's storefront. It is a named bundle of layout and typographic values that collectively produce a coherent visual character — compact and direct, spacious and editorial, vibrant and expressive, etc.

Presets do **not** replace the color palette system. A merchant picks a palette for colors, and separately picks a preset for personality. The two systems compose: you can have the "Boutique" preset with any of the 16 color palettes.

### How It Fits Into the Architecture

The template system has three layers:

```
Template (structure)     — what pages and sections exist, where elements live
Preset (personality)     — density, typographic scale, card style, motion level
Fine-tuning (overrides)  — per-field tweaks: exact radius, individual color token
```

Templates define structure and structural defaults. Presets define multi-field personalities expressed as `StoreCustomization` overrides. Fine-tuning is what the merchant does after picking a preset — individual radius sliders, color pickers, etc.

### Key Invariant: Presets Are Universal

All 8 presets are available in all 11 templates. A preset is a `StoreCustomization` patch — it writes to the merchant's override layer, not to the template. The template's `config.ts` is never touched. This means:

- `/template/[name]` preview pages always show the template's own defaults
- Presets only manifest in the merchant's live store
- Switching presets is non-destructive — it overwrites the preset-managed fields in `StoreCustomization`, while preserving branding, content, and business fields

---

## 2. Architecture

### Data Flow

```
Merchant clicks preset
        │
        ▼
applyPreset(presetId, current: StoreCustomization) → StoreCustomization
        │
        │  Writes to:
        │   theme.presetId
        │   theme.fontPair
        │   theme.typography  (new)
        │   layout.layout     (existing TemplateLayoutConfig fields)
        │   layout.density    (new)
        │
        ▼
localStorage("tiendri_demo-store_customization")
        │
        ▼
resolveTemplateConfig(templateConfig, storeCustomization)
        │  Signature unchanged — shallow-merges as before
        │  Return type EXTENDED with two new optional fields:
        │    • `theme` (ThemeCustomization) — forwarded from StoreCustomization
        │    • `layoutDensity` (DensityLevel) — forwarded from StoreCustomization.layout.density
        │  This is additive and backward-compatible — no existing consumer breaks
        │  layout.layout already handled by existing merge
        │
        ▼
ResolvedStoreConfig
        │
        ▼
buildCssVars(resolvedConfig)   ← EXPANDED to emit typography + spacing tokens
        │
        ▼
CSS custom properties injected on .template-scope
        │
        ├── --t-*          (color tokens — unchanged)
        ├── --t-radius-*   (radius tokens — unchanged)
        ├── --t-type-*     (typography tokens — NEW)
        └── --t-space-*    (spacing/density tokens — NEW)
        │
        ▼
Template components read tokens via CSS vars + structural props via config
```

### Where Presets Are Defined

```
src/lib/presets/
├── preset-types.ts     ← StylePreset type, TypographyConfig, DensityConfig
├── presets.ts          ← stylePresets constant — the 8 preset objects
└── apply-preset.ts     ← applyPreset(presetId, current) → StoreCustomization
```

### How Preset Application Works

`applyPreset` is a pure function:

```typescript
// src/lib/presets/apply-preset.ts
import { stylePresets } from "./presets";
import type { StoreCustomization } from "@/types/templates/store-customization";

export function applyPreset(
  presetId: string,
  current: StoreCustomization,
): StoreCustomization {
  const preset = stylePresets.find((p) => p.id === presetId);
  if (!preset) return current;

  return {
    ...current,
    theme: {
      ...current.theme,
      presetId,
      fontPair: preset.theme.fontPair,
      typography: preset.theme.typography,
    },
    layout: {
      ...current.layout,
      density: preset.layout.density,
      layout: {
        ...current.layout?.layout,
        ...preset.layout.layout,
      },
    },
  };
}
```

The function preserves everything the merchant has set (branding, content, business, palette, radius, per-token color overrides) and replaces only the preset-managed fields.

### How Reset Works

"Reset to preset defaults" re-applies the currently active preset over the current customization. This restores only preset-managed fields, leaving fine-tuning overrides applied after the preset in place. If the merchant wants a clean slate, they pick a preset with no prior fine-tuning.

```typescript
// Reset = re-apply the same preset
const reset = applyPreset(current.theme?.presetId ?? "directo", current);
```

### Font Pair Fallback Strategy

Presets reference **universal font pair keys**: `"elegant"`, `"warm"`, `"functional"`, `"modern"`. These four keys are the only values a preset will ever write to `theme.fontPair`.

Each template **MUST** define all 4 of these keys in their `fontPairs` array in `config-schema.ts`. If a template is missing one of the keys, the preset's `fontPair` value is stored in `StoreCustomization` but the template's font pair picker will fall back to the template's first defined font pair at render time.

The fallback logic sits at the render layer — `applyPreset` itself always writes the key unconditionally:

```typescript
// In applyPreset — font pair is always written; fallback happens at render time
fontPair: preset.theme.fontPair, // Template must define this key; falls back to first pair if missing
```

This means the preset system never crashes on a template that hasn't been fully updated, but the visual result may differ from intent until all 4 universal keys are defined.

> **Phase 1a task:** Standardize the 4 universal font pair keys (`"elegant"`, `"warm"`, `"functional"`, `"modern"`) across all 11 templates in their `config-schema.ts` `fontPairs` arrays.

### The Golden Rule

**Presets NEVER modify any template's `config.ts`.** They only write to `StoreCustomization`. This is not a convention — it is an architectural invariant. `config.ts` is the template's static contract and must not be mutated at runtime.

---

## 3. The 8 Presets

### Preset Value Notation

Each preset writes the following fields in `StoreCustomization`:

| Field path | Type | Notes |
|---|---|---|
| `theme.presetId` | `string` | The preset's own ID |
| `theme.fontPair` | `string` | Font pair key |
| `theme.typography` | `TypographyConfig` | New — heading scale, weight, tracking |
| `layout.density` | `DensityLevel` | New — spacing multiplier |
| `layout.layout.cardStyle` | `CardStyle` | Existing field |
| `layout.layout.cardHoverEffect` | `HoverEffect` | Existing field |
| `layout.layout.cardImageRatio` | `ImageRatio` | Existing field |
| `layout.layout.animationLevel` | `AnimationLevel` | Existing field |
| `layout.layout.shadowStyle` | `"neutral" \| "hue-tinted"` | Existing field |
| `layout.layout.headerStyle` | `HeaderStyle` | Existing field |
| `layout.layout.bannerHeight` | `BannerHeight` | Existing field |
| `layout.layout.buttonStyle` | `ButtonStyle` | New primitive |
| `layout.layout.badgeStyle` | `BadgeStyle` | New primitive |
| `layout.layout.priceDisplay` | `PriceDisplay` | New primitive |

---

### Preset 1 — Minimalista

**Target store:** High-end boutique, studio, artisan brand. Stores that sell on aesthetics and restraint.

**Description:** Maximum breathing room. No decoration competes with the product. Ghost buttons, flat cards, subtle shadows. Typography is expressive but sparse.

**Genes:** Spacious · Expressive type · Subtle color · Flat cards · Ghost buttons

| Field | Value |
|---|---|
| `theme.fontPair` | `"elegant"` |
| `theme.typography.headingWeight` | `700` |
| `theme.typography.headingScale` | `"xl"` |
| `theme.typography.headingTracking` | `"-0.02em"` |
| `theme.typography.headingTransform` | `"none"` |
| `layout.density` | `"spacious"` |
| `layout.layout.cardStyle` | `"flat"` |
| `layout.layout.cardHoverEffect` | `"lift"` |
| `layout.layout.cardImageRatio` | `"wide"` |
| `layout.layout.animationLevel` | `"subtle"` |
| `layout.layout.shadowStyle` | `"neutral"` |
| `layout.layout.headerStyle` | `"centered"` |
| `layout.layout.bannerHeight` | `"tall"` |
| `layout.layout.buttonStyle` | `"ghost"` |
| `layout.layout.badgeStyle` | `"pill"` |
| `layout.layout.priceDisplay` | `"subtle"` |

---

### Preset 2 — Boutique

**Target store:** Fashion, accessories, beauty. Stores where brand feel is part of the sale.

**Description:** Warm density with tactile card presentation. Hue-tinted shadows give depth. Pill badges and filled buttons reinforce brand color. Expressive typography stays elegant.

**Genes:** Balanced density · Expressive type · Hue-tinted shadows · Elevated cards · Pill badges · Filled buttons

| Field | Value |
|---|---|
| `theme.fontPair` | `"warm"` |
| `theme.typography.headingWeight` | `600` |
| `theme.typography.headingScale` | `"lg"` |
| `theme.typography.headingTracking` | `"-0.01em"` |
| `theme.typography.headingTransform` | `"none"` |
| `layout.density` | `"balanced"` |
| `layout.layout.cardStyle` | `"elevated"` |
| `layout.layout.cardHoverEffect` | `"lift"` |
| `layout.layout.cardImageRatio` | `"portrait"` |
| `layout.layout.animationLevel` | `"subtle"` |
| `layout.layout.shadowStyle` | `"hue-tinted"` |
| `layout.layout.headerStyle` | `"centered"` |
| `layout.layout.bannerHeight` | `"normal"` |
| `layout.layout.buttonStyle` | `"filled"` |
| `layout.layout.badgeStyle` | `"pill"` |
| `layout.layout.priceDisplay` | `"standard"` |

---

### Preset 3 — Directo

**Target store:** Grocery, hardware, everyday goods. Stores where conversion speed matters more than aesthetics.

**Description:** Compact layout, functional typography, prices always prominent. Bordered cards create clear visual separation. Square badges and filled buttons are no-nonsense.

**Genes:** Compact density · Functional type · Prominent prices · Bordered cards · Square badges · Filled buttons

| Field | Value |
|---|---|
| `theme.fontPair` | `"functional"` |
| `theme.typography.headingWeight` | `700` |
| `theme.typography.headingScale` | `"md"` |
| `theme.typography.headingTracking` | `"0em"` |
| `theme.typography.headingTransform` | `"none"` |
| `layout.density` | `"compact"` |
| `layout.layout.cardStyle` | `"bordered"` |
| `layout.layout.cardHoverEffect` | `"none"` |
| `layout.layout.cardImageRatio` | `"square"` |
| `layout.layout.animationLevel` | `"none"` |
| `layout.layout.shadowStyle` | `"neutral"` |
| `layout.layout.headerStyle` | `"standard"` |
| `layout.layout.bannerHeight` | `"short"` |
| `layout.layout.buttonStyle` | `"filled"` |
| `layout.layout.badgeStyle` | `"square"` |
| `layout.layout.priceDisplay` | `"prominent"` |

---

### Preset 4 — Editorial

**Target store:** Art prints, books, specialty food, collectibles. Stores that tell a story.

**Description:** Wide images dominate, text breathes, layout feels like a magazine. Outlined buttons maintain sophistication. Expressive, spacious, story-first.

**Genes:** Spacious density · Expressive type · Subtle color · Wide-image cards · Outlined buttons

| Field | Value |
|---|---|
| `theme.fontPair` | `"elegant"` |
| `theme.typography.headingWeight` | `400` |
| `theme.typography.headingScale` | `"2xl"` |
| `theme.typography.headingTracking` | `"-0.03em"` |
| `theme.typography.headingTransform` | `"none"` |
| `layout.density` | `"spacious"` |
| `layout.layout.cardStyle` | `"flat"` |
| `layout.layout.cardHoverEffect` | `"scale"` |
| `layout.layout.cardImageRatio` | `"wide"` |
| `layout.layout.animationLevel` | `"subtle"` |
| `layout.layout.shadowStyle` | `"neutral"` |
| `layout.layout.headerStyle` | `"minimal"` |
| `layout.layout.bannerHeight` | `"tall"` |
| `layout.layout.buttonStyle` | `"outlined"` |
| `layout.layout.badgeStyle` | `"pill"` |
| `layout.layout.priceDisplay` | `"subtle"` |

---

### Preset 5 — Vibrante

**Target store:** Youth fashion, sports, sneakers, pop culture. Stores that need energy.

**Description:** Full animation, glow hover effects, elevated cards that pop. Fills every pixel with brand color intensity. Pill badges and high-contrast filled buttons.

**Genes:** Balanced density · Full animation · Glow hover · Elevated cards · Hue-tinted shadows · Pill badges

| Field | Value |
|---|---|
| `theme.fontPair` | `"modern"` |
| `theme.typography.headingWeight` | `800` |
| `theme.typography.headingScale` | `"xl"` |
| `theme.typography.headingTracking` | `"-0.02em"` |
| `theme.typography.headingTransform` | `"uppercase"` |
| `layout.density` | `"balanced"` |
| `layout.layout.cardStyle` | `"elevated"` |
| `layout.layout.cardHoverEffect` | `"glow"` |
| `layout.layout.cardImageRatio` | `"square"` |
| `layout.layout.animationLevel` | `"full"` |
| `layout.layout.shadowStyle` | `"hue-tinted"` |
| `layout.layout.headerStyle` | `"standard"` |
| `layout.layout.bannerHeight` | `"normal"` |
| `layout.layout.buttonStyle` | `"filled"` |
| `layout.layout.badgeStyle` | `"pill"` |
| `layout.layout.priceDisplay` | `"prominent"` |

---

### Preset 6 — Técnico

**Target store:** Electronics, tools, components, B2B. Stores where spec sheets matter.

**Description:** Dense, information-forward. Shadow cards create depth without decoration. Prices are prominent. Functional typography maximizes legibility at small sizes. Square badges read like labels.

**Genes:** Compact density · Functional type · Prominent prices · Shadow cards · Square badges

| Field | Value |
|---|---|
| `theme.fontPair` | `"functional"` |
| `theme.typography.headingWeight` | `600` |
| `theme.typography.headingScale` | `"md"` |
| `theme.typography.headingTracking` | `"0em"` |
| `theme.typography.headingTransform` | `"none"` |
| `layout.density` | `"compact"` |
| `layout.layout.cardStyle` | `"shadow"` |
| `layout.layout.cardHoverEffect` | `"lift"` |
| `layout.layout.cardImageRatio` | `"square"` |
| `layout.layout.animationLevel` | `"subtle"` |
| `layout.layout.shadowStyle` | `"neutral"` |
| `layout.layout.headerStyle` | `"standard"` |
| `layout.layout.bannerHeight` | `"short"` |
| `layout.layout.buttonStyle` | `"filled"` |
| `layout.layout.badgeStyle` | `"square"` |
| `layout.layout.priceDisplay` | `"prominent"` |

---

### Preset 7 — Natural

**Target store:** Plants, wellness, organic food, handmade goods. Earth-friendly aesthetics.

**Description:** Spacious, unhurried. Hue-tinted shadows pick up the brand's warm palette. Outlined buttons feel handcrafted. Pill badges are soft. No uppercase, no aggression.

**Genes:** Spacious density · Default type · Hue-tinted shadows · Flat/soft cards · Outlined buttons · Pill badges

| Field | Value |
|---|---|
| `theme.fontPair` | `"warm"` |
| `theme.typography.headingWeight` | `500` |
| `theme.typography.headingScale` | `"lg"` |
| `theme.typography.headingTracking` | `"0em"` |
| `theme.typography.headingTransform` | `"none"` |
| `layout.density` | `"spacious"` |
| `layout.layout.cardStyle` | `"flat"` |
| `layout.layout.cardHoverEffect` | `"scale"` |
| `layout.layout.cardImageRatio` | `"portrait"` |
| `layout.layout.animationLevel` | `"subtle"` |
| `layout.layout.shadowStyle` | `"hue-tinted"` |
| `layout.layout.headerStyle` | `"centered"` |
| `layout.layout.bannerHeight` | `"normal"` |
| `layout.layout.buttonStyle` | `"outlined"` |
| `layout.layout.badgeStyle` | `"pill"` |
| `layout.layout.priceDisplay` | `"standard"` |

---

### Preset 8 — Nocturno

**Target store:** Music, night life, gaming, premium electronics. Dark-mode-native aesthetics.

**Description:** Dark palette, full animation, glow hover. The preset sets the structural personality; the merchant pairs it with a dark color palette (e.g. "Obsidian", "Midnight Luxury"). Expressive type, hue-tinted glow.

**Note:** Nocturno does NOT automatically switch to dark mode — that is the responsibility of the `appearance` field and palette. Nocturno sets the structural personality; the merchant must also select a dark palette from the Paletas section.

**Genes:** Balanced density · Expressive type · Full animation · Glow hover · Elevated cards · Hue-tinted shadows

| Field | Value |
|---|---|
| `theme.fontPair` | `"modern"` |
| `theme.typography.headingWeight` | `700` |
| `theme.typography.headingScale` | `"xl"` |
| `theme.typography.headingTracking` | `"-0.02em"` |
| `theme.typography.headingTransform` | `"none"` |
| `layout.density` | `"balanced"` |
| `layout.layout.cardStyle` | `"elevated"` |
| `layout.layout.cardHoverEffect` | `"glow"` |
| `layout.layout.cardImageRatio` | `"square"` |
| `layout.layout.animationLevel` | `"full"` |
| `layout.layout.shadowStyle` | `"hue-tinted"` |
| `layout.layout.headerStyle` | `"centered"` |
| `layout.layout.bannerHeight` | `"tall"` |
| `layout.layout.buttonStyle` | `"filled"` |
| `layout.layout.badgeStyle` | `"pill"` |
| `layout.layout.priceDisplay` | `"standard"` |

---

### Fields NOT Managed by Presets

The following `TemplateLayoutConfig` fields are **intentionally excluded** from all 8 presets. They remain at the template's default value unless the merchant explicitly changes them in the Estilo Visual tab:

| Field | Reason left to merchant |
|---|---|
| `footerStyle` | Highly template-specific; presets don't prescribe footer structure |
| `navStyle` | Navigation behavior is a merchant choice, not a visual personality |
| `tabStyle` | Tab styling varies too much between templates to preset reliably |

Presets intentionally leave these alone because they are highly template-specific. A merchant changing their preset should not find their navigation layout suddenly different. These fields are configurable directly in the Estilo Visual tab and are never overwritten by `applyPreset`.

> **Note:** `cardImageRatio` IS preset-managed — it appears in every preset table above. Do not confuse it with the non-managed fields listed here.

---

## 4. New Types Required

### 4.1 New Primitives — `src/types/templates/primitives.ts`

Add these union types:

```typescript
// Button visual style
export type ButtonStyle = "filled" | "outlined" | "ghost";

// Badge shape style
export type BadgeStyle = "pill" | "square";

// Price display prominence
export type PriceDisplay = "prominent" | "standard" | "subtle";

// Layout density level
export type DensityLevel = "compact" | "balanced" | "spacious";

// Typography heading scale
export type HeadingScale = "md" | "lg" | "xl" | "2xl";
```

### 4.2 New Typography Config Type

Create `src/types/templates/typography.ts`:

```typescript
// Typography personality config — controlled by presets, fine-tunable by merchant.
// All values produce CSS custom properties via buildCssVars.
export interface TypographyConfig {
  /** Heading font weight: 400 | 500 | 600 | 700 | 800 */
  headingWeight: number;
  /** Scale multiplier bucket for heading font-size relative to base */
  headingScale: HeadingScale;
  /** Letter-spacing for headings: "-0.03em" | "-0.02em" | "-0.01em" | "0em" */
  headingTracking: string;
  /** Text transform for headings */
  headingTransform: "none" | "uppercase" | "capitalize";
}
```

Export `TypographyConfig` and `HeadingScale` from `src/types/templates/index.ts`.

### 4.3 Updated `TemplateLayoutConfig` — `src/types/templates/template-config.ts`

Add new fields to the existing interface:

```typescript
export interface TemplateLayoutConfig {
  // Existing fields (unchanged)
  cardStyle: CardStyle;
  cardHoverEffect: HoverEffect;
  cardImageRatio: ImageRatio;
  navStyle: NavStyle;
  tabStyle: TabStyle;
  bannerHeight: BannerHeight;
  headerStyle: HeaderStyle;
  footerStyle: FooterStyle;
  shadowStyle?: "neutral" | "hue-tinted";
  animationLevel?: AnimationLevel;

  // New fields added for Phase 1
  buttonStyle?: ButtonStyle;
  badgeStyle?: BadgeStyle;
  priceDisplay?: PriceDisplay;
}
```

### 4.4 Updated `ThemeCustomization` — `src/types/templates/store-customization.ts`

Add new fields:

```typescript
export interface ThemeCustomization {
  paletteId?: string;
  colors?: Partial<TemplateColorTokens>;
  radius?: Partial<TemplateRadiusTokens>;
  fontPair?: string;
  /** ID of the active style preset */
  presetId?: string;
  /** Typography personality — set by presets, fine-tunable */
  typography?: TypographyConfig;
}
```

### 4.5 Updated `LayoutCustomization` — `src/types/templates/store-customization.ts`

Add density:

```typescript
export interface LayoutCustomization {
  grid?: Partial<TemplateGridConfig>;
  layout?: Partial<TemplateLayoutConfig>;
  sections?: SectionConfig[];
  /** Spacing density level — set by presets */
  density?: DensityLevel;
}
```

### 4.6 The `StylePreset` Type — `src/lib/presets/preset-types.ts`

```typescript
import type { TypographyConfig } from "@/types/templates/typography";
import type { DensityLevel } from "@/types/templates/primitives";
import type { TemplateLayoutConfig } from "@/types/templates/template-config";

export interface StylePreset {
  id: string;
  name: string;
  description: string;
  /** Store types this preset is designed for */
  targetStores: string[];
  theme: {
    fontPair: string;
    typography: TypographyConfig;
  };
  layout: {
    density: DensityLevel;
    /** Partial layout overrides — only preset-managed fields */
    layout: Pick<
      TemplateLayoutConfig,
      | "cardStyle"
      | "cardHoverEffect"
      | "cardImageRatio"
      | "animationLevel"
      | "shadowStyle"
      | "headerStyle"
      | "bannerHeight"
      | "buttonStyle"
      | "badgeStyle"
      | "priceDisplay"
    >;
  };
}
```

### 4.7 The `stylePresets` Constant — `src/lib/presets/presets.ts`

```typescript
import type { StylePreset } from "./preset-types";

export const stylePresets: StylePreset[] = [
  {
    id: "minimalista",
    name: "Minimalista",
    description: "Elegante y silencioso. El producto habla solo.",
    targetStores: ["Boutique", "Estudio", "Artesanías"],
    theme: {
      fontPair: "elegant",
      typography: {
        headingWeight: 700,
        headingScale: "xl",
        headingTracking: "-0.02em",
        headingTransform: "none",
      },
    },
    layout: {
      density: "spacious",
      layout: {
        cardStyle: "flat",
        cardHoverEffect: "lift",
        cardImageRatio: "wide",
        animationLevel: "subtle",
        shadowStyle: "neutral",
        headerStyle: "centered",
        bannerHeight: "tall",
        buttonStyle: "ghost",
        badgeStyle: "pill",
        priceDisplay: "subtle",
      },
    },
  },
  // ... remaining 7 presets (see Section 3 for complete values)
];
```

---

## 5. buildCssVars Expansion

### New CSS Variables

`buildCssVars` must emit three new groups of CSS custom properties:

#### Group 1: Typography Tokens (`--t-type-*`)

| Config field | CSS variable | Example value |
|---|---|---|
| `theme.typography.headingWeight` | `--t-type-heading-weight` | `700` |
| `theme.typography.headingScale` | `--t-type-heading-scale` | (resolved — see table below) |
| `theme.typography.headingTracking` | `--t-type-heading-tracking` | `-0.02em` |
| `theme.typography.headingTransform` | `--t-type-heading-transform` | `none` |

`headingScale` is a bucket name, not a CSS value. It resolves to a `font-size` CSS value:

| `headingScale` | `--t-type-heading-size` | Notes |
|---|---|---|
| `"md"` | `1.5rem` | h1 at 24px |
| `"lg"` | `2rem` | h1 at 32px |
| `"xl"` | `2.5rem` | h1 at 40px |
| `"2xl"` | `3.5rem` | h1 at 56px |

#### Group 2: Spacing/Density Tokens (`--t-space-*`)

`density` is a bucket that resolves to a set of spacing multiplier tokens:

| Density | `--t-space-section` | `--t-space-card` | `--t-space-item` | `--t-space-gap` |
|---|---|---|---|---|
| `"compact"` | `2rem` | `0.75rem` | `0.5rem` | `0.75rem` |
| `"balanced"` | `3rem` | `1rem` | `0.75rem` | `1rem` |
| `"spacious"` | `5rem` | `1.5rem` | `1rem` | `1.5rem` |

These four tokens cascade through the `.template-scope` div. Components read them for section padding, card internal padding, list item gaps, and grid gaps.

#### Group 3: Layout Style Tokens (`--t-layout-*`)

New layout fields that are scalar values (not JSX-structural) become CSS vars:

| Config field | CSS variable | Notes |
|---|---|---|
| `layout.layout.shadowStyle` | `--t-shadow-style` | `"neutral"` \| `"hue-tinted"` |

`buttonStyle`, `badgeStyle`, and `priceDisplay` are **NOT** CSS vars — they are structural decisions that change JSX (which element or className branch is rendered). Components read these from the `config` prop directly.

### Implementation — Updated `buildCssVars`

The function signature stays unchanged. The new logic reads `config.theme?.typography` and `config.layoutDensity` (both are new optional fields on `ResolvedStoreConfig`).

**Important:** `resolveTemplateConfig` signature is unchanged, but its **return type is EXTENDED** with two new optional fields (`theme`, `layoutDensity`). This is additive and backward-compatible — no existing consumer breaks. Since `typography` lives in `StoreCustomization.theme` (not in `TemplateConfig`), the resolver needs to forward it:

```typescript
// In resolveTemplateConfig return value — add to existing spread:
return {
  ...template,
  colors: { ... },
  radius: { ... },
  grid: { ... },
  layout: { ... },
  sections: ...,
  branding: ...,
  content: ...,
  business: ...,
  // New forwarded fields
  theme: customization.theme,           // forwards presetId, typography, fontPair
  layoutDensity: customization.layout?.density,  // forwards density
};
```

Then in `buildCssVars`:

```typescript
// New section — Typography tokens
const typography = config.theme?.typography;
if (typography) {
  const scaleMap: Record<string, string> = {
    md: "1.5rem",
    lg: "2rem",
    xl: "2.5rem",
    "2xl": "3.5rem",
  };
  vars["--t-type-heading-weight"] = String(typography.headingWeight);
  vars["--t-type-heading-size"] = scaleMap[typography.headingScale] ?? "2rem";
  vars["--t-type-heading-tracking"] = typography.headingTracking;
  vars["--t-type-heading-transform"] = typography.headingTransform;
}

// New section — Density/spacing tokens
const density = config.layoutDensity ?? "balanced";
const spacingMap: Record<string, Record<string, string>> = {
  compact:  { section: "2rem",  card: "0.75rem", item: "0.5rem",  gap: "0.75rem" },
  balanced: { section: "3rem",  card: "1rem",    item: "0.75rem", gap: "1rem"    },
  spacious: { section: "5rem",  card: "1.5rem",  item: "1rem",    gap: "1.5rem"  },
};
const spacing = spacingMap[density] ?? spacingMap.balanced;
vars["--t-space-section"] = spacing.section;
vars["--t-space-card"]    = spacing.card;
vars["--t-space-item"]    = spacing.item;
vars["--t-space-gap"]     = spacing.gap;
```

### Updated `ResolvedStoreConfig` Type

`ResolvedStoreConfig` (defined in `src/types/templates/index.ts` or `template-config.ts`) must include the forwarded fields:

```typescript
// ResolvedStoreConfig extends TemplateConfig with runtime-resolved fields
export interface ResolvedStoreConfig extends TemplateConfig {
  theme?: ThemeCustomization;       // merchant's full theme object
  layoutDensity?: DensityLevel;     // resolved density level
}
```

---

## 6. Component Consumption Pattern

### The Two Rules

**Rule 1: CSS vars for cascading visual properties.**
Values that style without changing structure (colors, spacing, font-size, font-weight, letter-spacing, shadow intensity) are read from CSS variables. Components never read these from props.

```tsx
// Good — reads from CSS var, works everywhere .template-scope is injected
<h2 className="font-[--t-type-heading-weight]"
    style={{
      fontSize: "var(--t-type-heading-size)",
      letterSpacing: "var(--t-type-heading-tracking)",
      textTransform: "var(--t-type-heading-transform)" as React.CSSProperties["textTransform"],
    }}>
  {title}
</h2>

// Good — spacing from density token
<section style={{ paddingTop: "var(--t-space-section)", paddingBottom: "var(--t-space-section)" }}>
```

**Rule 2: Props for structural (JSX-branching) decisions.**
Values that determine which element or className branch to render are read from `config` props. These are `buttonStyle`, `badgeStyle`, and `priceDisplay`.

```tsx
// Good — structural decision via config prop
const buttonClass = {
  filled:   "bg-[--t-button-bg] text-[--t-button-text]",
  outlined: "border-2 border-[--t-primary] text-[--t-primary] bg-transparent",
  ghost:    "text-[--t-primary] bg-transparent hover:bg-[--t-primary]/10",
}[config.layout.buttonStyle ?? "filled"];
```

### Standard Pattern: Tailwind Class Maps

Every template that renders buttons, badges, or prices should use a class-map object to branch on the config value. The maps should be defined at the module level (not inline) to avoid re-creation on every render:

```typescript
// In template/[name]/utils/style-maps.ts

export const BUTTON_CLASS_MAP: Record<ButtonStyle, string> = {
  filled:   "bg-[--t-button-bg] text-[--t-button-text] border-transparent",
  outlined: "border-2 border-[--t-primary] text-[--t-primary] bg-transparent hover:bg-[--t-primary]/5",
  ghost:    "text-[--t-primary] bg-transparent hover:bg-[--t-primary]/10 border-transparent",
};

export const BADGE_CLASS_MAP: Record<BadgeStyle, string> = {
  pill:    "rounded-full",
  square:  "rounded-sm",
};

export const PRICE_CLASS_MAP: Record<PriceDisplay, string> = {
  prominent: "text-xl font-bold text-[--t-primary]",
  standard:  "text-base font-semibold text-[--t-foreground]",
  subtle:    "text-sm font-medium text-[--t-text-muted]",
};
```

### What Components Need Updating

Across all 11 templates, the following component types need to consume the new tokens:

| Component type | New tokens to consume | Method |
|---|---|---|
| Section wrappers | `--t-space-section` | CSS var via `style` prop |
| Card components | `--t-space-card`, `--t-space-gap` | CSS var |
| H1/H2 headings | `--t-type-heading-size`, `--t-type-heading-weight`, `--t-type-heading-tracking`, `--t-type-heading-transform` | CSS var |
| CTA buttons | `buttonStyle` | Prop → class map |
| Product badges | `badgeStyle` | Prop → class map |
| Price labels | `priceDisplay` | Prop → class map |
| Product card grids | `--t-space-gap` | CSS var |

**Migration order:** tech-premium first (reference implementation), then extend to remaining 10 templates in Phase 1c.

### Card-Level Structural Logic

Cards may also need to branch on `cardStyle`. The existing class-map pattern applies:

```typescript
// Already exists in some templates — standardize this pattern
export const CARD_STYLE_MAP: Record<CardStyle, string> = {
  flat:     "shadow-none border-0 bg-[--t-card-bg]",
  shadow:   "shadow-md border-0 bg-[--t-card-bg]",
  bordered: "shadow-none border border-[--t-border] bg-[--t-card-bg]",
  elevated: "shadow-lg border-0 bg-[--t-card-bg] hover:shadow-xl",
};

export const HOVER_EFFECT_MAP: Record<HoverEffect, string> = {
  none:  "",
  lift:  "transition-transform hover:-translate-y-1",
  scale: "transition-transform hover:scale-[1.02]",
  glow:  "transition-shadow hover:shadow-[0_0_20px_rgba(var(--t-primary-rgb),0.3)]",
};
```

---

## 7. Dashboard Integration

### Where the Preset Picker Lives

The preset picker is a new section inside the **"Apariencia"** tab, rendered before the palette picker. The tab order becomes:

```
Apariencia tab
  1. Template picker (existing)
  2. Preset picker      ← NEW (Phase 1b)
  3. Palette picker (existing)
  4. Font pair picker (existing, still fine-tunable post-preset)
  5. Advanced colors (existing)
  6. Radius sliders (existing)
```

### Preset Picker UI Spec

The preset picker is a grid of cards — 2 columns on mobile, 4 on desktop (or 2+2). Each card shows:

- Preset name (large, in the preset's heading font)
- One-line description
- A visual "gene strip": 4 small icons representing density, card style, animation level, and button style
- A "Seleccionado" badge when active

When a preset is selected:
1. Call `applyPreset(presetId, readCustomization())` → get new `StoreCustomization`
2. Write new customization to localStorage
3. Update local React state
4. Show a toast: "Personalidad aplicada. Podés ajustar los detalles abajo."

### The Onboarding Flow

On first visit (when `customization.theme?.presetId` is `undefined`), show a modal or inline banner:

```
"¿Qué tipo de tienda sos?"
[Preset cards grid]
"Elegí una personalidad de inicio. Siempre podés cambiarla."
[Botón: Continuar con Directo]  ← default fallback
```

This ensures every merchant starts with a coherent visual personality rather than raw defaults.

The onboarding state is tracked in `customization.theme.presetId` — if it's set, onboarding is done.

### Fine-Tuning Controls After Preset

After a preset is applied, the palette picker, font pair, and advanced color controls all remain usable. They act as fine-tuning layers on top of the preset. The system's resolution order (palette → per-token overrides) means per-token changes always win over preset values.

However, layout fields set by the preset (cardStyle, buttonStyle, etc.) are also individually accessible from the schema-form section in "Estilo visual" (see below). A merchant may pick "Boutique" and then change `cardStyle` from `elevated` to `flat` — the preset ID is preserved in `theme.presetId` but the individual field override wins.

### "Estilo visual" — Layout Controls Tab Group

> **Note:** The `estilo-visual` tab group **already exists** from Phase 0 — it was added as part of the initial schema system and already contains: `cardStyle`, `cardHoverEffect`, `cardImageRatio`, `headerStyle`, `footerStyle`, `navStyle`, `bannerHeight`, `animationLevel`, and `shadowStyle`.

Phase 1b does **NOT** create this tab group — it adds the **3 NEW fields** (`buttonStyle`, `badgeStyle`, `priceDisplay`) to the existing sections. The schema snippet below shows the complete desired state of the tab group after Phase 1b, including both existing and new fields:

```typescript
// Added to each template's config-schema.ts tabGroups array
{
  id: "estilo-visual",
  label: "Estilo visual",
  icon: "Sliders",
  sections: [
    {
      id: "layout-options",
      label: "Opciones de diseño",
      description: "Ajustá la personalidad visual de tu tienda.",
      fields: [
        {
          key: "layout.layout.cardStyle",
          type: "select",
          label: "Estilo de tarjetas",
          options: [
            { label: "Plano", value: "flat" },
            { label: "Sombra", value: "shadow" },
            { label: "Con borde", value: "bordered" },
            { label: "Elevado", value: "elevated" },
          ],
        },
        {
          key: "layout.layout.buttonStyle",
          type: "select",
          label: "Estilo de botones",
          options: [
            { label: "Relleno", value: "filled" },
            { label: "Contorno", value: "outlined" },
            { label: "Fantasma", value: "ghost" },
          ],
        },
        {
          key: "layout.layout.cardHoverEffect",
          type: "select",
          label: "Efecto al pasar el cursor",
          options: [
            { label: "Ninguno", value: "none" },
            { label: "Elevación", value: "lift" },
            { label: "Escala", value: "scale" },
            { label: "Resplandor", value: "glow" },
          ],
        },
        {
          key: "layout.layout.animationLevel",
          type: "select",
          label: "Nivel de animaciones",
          options: [
            { label: "Sin animaciones", value: "none" },
            { label: "Sutiles", value: "subtle" },
            { label: "Completas", value: "full" },
          ],
        },
        {
          key: "layout.layout.badgeStyle",
          type: "select",
          label: "Forma de etiquetas",
          options: [
            { label: "Redondeado", value: "pill" },
            { label: "Cuadrado", value: "square" },
          ],
        },
        {
          key: "layout.layout.priceDisplay",
          type: "select",
          label: "Prominencia de precios",
          options: [
            { label: "Destacado", value: "prominent" },
            { label: "Normal", value: "standard" },
            { label: "Discreto", value: "subtle" },
          ],
        },
        {
          key: "layout.layout.bannerHeight",
          type: "select",
          label: "Altura del banner principal",
          options: [
            { label: "Bajo", value: "short" },
            { label: "Normal", value: "normal" },
            { label: "Alto", value: "tall" },
          ],
        },
        {
          key: "layout.layout.headerStyle",
          type: "select",
          label: "Estilo del encabezado",
          options: [
            { label: "Estándar", value: "standard" },
            { label: "Centrado", value: "centered" },
            { label: "Mínimo", value: "minimal" },
          ],
        },
        {
          key: "layout.layout.shadowStyle",
          type: "select",
          label: "Estilo de sombras",
          options: [
            { label: "Neutro", value: "neutral" },
            { label: "Tono del color", value: "hue-tinted" },
          ],
        },
      ],
    },
  ],
}
```

The dashboard reads this via the existing `DynamicTabContent` renderer — no new dashboard component code required.

### "Reset to Preset" Behavior

Each field in the "Estilo visual" section shows its current value. If it differs from the active preset's default, a "Restablecer" button appears (same UX as the existing color override reset in `ThemeTab`).

A "Restablecer al preset" button at the top of the "Estilo visual" tab calls `applyPreset` and re-applies all preset fields, discarding per-field overrides.

---

## 8. Anti-Ugliness Guardrails

### dependsOn Rules

The following field combinations produce ugly results and should be hidden or warned:

| Condition | Action |
|---|---|
| `animationLevel === "full"` AND `cardStyle === "bordered"` | Show warning: "Las animaciones completas combinan mejor con tarjetas elevadas." |
| `cardHoverEffect === "glow"` AND `shadowStyle === "neutral"` | Show warning: "El resplandor se ve mejor con sombras en tono del color." Auto-suggest switching `shadowStyle` to `"hue-tinted"`. |
| `priceDisplay === "subtle"` AND `animationLevel === "full"` | No warning — these are independent enough. |
| `buttonStyle === "ghost"` AND `cardStyle === "flat"` | Show info: "Estilo muy minimalista — ideal para boutiques y galerías de arte." (positive reinforcement) |
| `headingTransform === "uppercase"` AND `fontPair === "elegant"` | Show warning: "Las fuentes elegantes generalmente no usan mayúsculas forzadas." |

### Contrast Checking

When a merchant switches to `buttonStyle === "ghost"` or `buttonStyle === "outlined"`, the UI must verify that `--t-primary` has sufficient contrast against `--t-background` (WCAG AA, ratio ≥ 4.5:1). If not, show an inline warning:

```
"El color principal tiene bajo contraste con el fondo en el estilo de botón seleccionado. 
Cambiá la paleta o ajustá el color principal."
```

Contrast check runs client-side using the hex values in `StoreCustomization`. Use the existing `hexToRgb` helper from `buildCssVars.ts`.

### The "Reset to Preset" Escape Hatch

If a merchant has made multiple fine-tuning changes and the result looks bad, the single "Restablecer al preset" action restores the 8 preset-managed fields to their preset defaults without touching branding, content, business, or the color palette. This is the primary escape hatch.

---

## 9. Implementation Plan

### Phase 1a — Types, Preset Definitions, buildCssVars (2–3 days)

**Files to create:**
- `src/types/templates/typography.ts` — `TypographyConfig` type
- `src/lib/presets/preset-types.ts` — `StylePreset` type
- `src/lib/presets/presets.ts` — `stylePresets` constant with all 8 presets
- `src/lib/presets/apply-preset.ts` — `applyPreset` pure function

**Files to update:**
- `src/types/templates/primitives.ts` — add `ButtonStyle`, `BadgeStyle`, `PriceDisplay`, `DensityLevel`, `HeadingScale`
- `src/types/templates/template-config.ts` — add `buttonStyle?`, `badgeStyle?`, `priceDisplay?` to `TemplateLayoutConfig`; add `layoutDensity?` and `theme?` to `ResolvedStoreConfig`
- `src/types/templates/store-customization.ts` — add `presetId?`, `typography?` to `ThemeCustomization`; add `density?` to `LayoutCustomization`
- `src/types/templates/index.ts` — re-export new types
- `src/lib/buildCssVars.ts` — add typography token emission, spacing token emission
- `src/lib/resolveTemplateConfig.ts` — forward `theme` and `layoutDensity` through to `ResolvedStoreConfig`

**Additional task — font pair keys:** Standardize the 4 universal font pair keys (`"elegant"`, `"warm"`, `"functional"`, `"modern"`) across all 11 templates in their `config-schema.ts` `fontPairs` arrays. Templates missing any of these keys will fall back to their first font pair when a preset is applied (see Section 2 — Font Pair Fallback Strategy).

**Scope:** ~8 files, ~200 lines of net new code. Zero UI changes. Zero component changes.

**Verification:** `npx tsc --noEmit` must pass. Run `applyPreset("minimalista", mockCustomization)` in a test and verify the output matches Section 3.

---

### Phase 1b — Dashboard Preset Picker UI (2–3 days)

**Files to create:**
- `src/app/(dashboard)/dashboard/configuracion/tabs/preset-picker.tsx` — preset grid card component
- `src/app/(dashboard)/dashboard/configuracion/tabs/preset-tab-section.tsx` — preset section for ThemeTab

**Files to update:**
- `src/app/(dashboard)/dashboard/configuracion/tabs/theme-tab.tsx` — integrate `PresetTabSection` before palette picker; handle `presetId` state; call `applyPreset` on selection
- Each template's `config-schema.ts` — the `"estilo-visual"` tab group already exists from Phase 0; add the 3 NEW fields (`buttonStyle`, `badgeStyle`, `priceDisplay`) to the existing `layout-options` section (see Section 7)

**Onboarding flow:**
- Check if `customization.theme?.presetId` is `undefined` on mount
- If undefined, show the onboarding banner with preset cards
- Default selection: "Directo" (safe, compact, conversion-focused)

**Scope:** ~4 files, ~300 lines. Pure UI, no backend changes.

---

### Phase 1c — Component Updates Across Templates (3–4 days)

Start with **tech-premium** as the reference implementation.

For each template, update:
1. Section wrapper components — read `--t-space-section` from CSS var
2. Heading components — read `--t-type-heading-*` from CSS var
3. Card components — use `CARD_STYLE_MAP`, `HOVER_EFFECT_MAP`
4. Button components — use `BUTTON_CLASS_MAP` from `config.layout.buttonStyle`
5. Badge components — use `BADGE_CLASS_MAP` from `config.layout.badgeStyle`
6. Price labels — use `PRICE_CLASS_MAP` from `config.layout.priceDisplay`
7. Grid containers — read `--t-space-gap` from CSS var

Create `src/templates/[name]/utils/style-maps.ts` per template (or a single shared one at `src/templates/_shared/style-maps.ts` if the maps are identical across all templates — prefer shared).

**Scope:** 11 templates × ~6 component types = ~66 component updates. Most are simple className additions.

---

### Phase 1d — Sync ThemeCustomizer with Dashboard (1 day)

The `ThemeCustomizer` component (used for live preview) must also read `presetId` from `StoreCustomization` and reflect it in its UI state. Currently it does not show a preset picker.

**Files to update:**
- `src/components/customizer/theme-customizer.tsx` — add preset picker section (can reuse the `PresetTabSection` component from Phase 1b)

**Note:** This phase is lower priority. The dashboard is the primary merchant interface. ThemeCustomizer is a supplementary live-preview tool.

---

### Total Estimated Scope

| Phase | Duration | Risk |
|---|---|---|
| 1a: Types + logic | 2–3 days | Low — pure TypeScript, no UI |
| 1b: Dashboard UI | 2–3 days | Low — follows existing tab patterns |
| 1c: Component updates | 3–4 days | Medium — many files, but mechanical |
| 1d: ThemeCustomizer sync | 1 day | Low — reuses Phase 1b components |
| **Total** | **8–11 days** | Low–Medium |

---

## 10. Migration Notes

### Existing Merchant Customizations

Merchants who have customized layout fields (cardStyle, headerStyle, etc.) before the preset system exists will have those values in `StoreCustomization.layout.layout`. Since `resolveTemplateConfig` shallow-merges layout fields, their existing values continue to win over any template defaults.

When a merchant first visits the dashboard after Phase 1 ships:
- `theme.presetId` is `undefined` — the onboarding banner appears
- Their existing layout overrides are preserved in `layout.layout`
- If they pick a preset, `applyPreset` overwrites the preset-managed layout fields with preset values (existing fine-tuning is replaced for those specific fields)
- If they dismiss onboarding without picking a preset, nothing changes

### Backward Compatibility Guarantees

1. **`resolveTemplateConfig` signature is unchanged, but its return type gains two new optional fields** (`theme`, `layoutDensity`). Existing consumers that don't read these fields are completely unaffected — the addition is additive and backward-compatible.
2. **`buildCssVars` signature is unchanged.** New CSS vars are additive. Components that don't read them are unaffected.
3. **`TemplateLayoutConfig` additions are optional fields.** No template's `config.ts` needs updating — the new fields default to `undefined` and components must handle `undefined` with a sensible fallback (e.g. `config.layout.buttonStyle ?? "filled"`).
4. **`ThemeCustomization` additions are optional.** Old `StoreCustomization` blobs without `presetId` or `typography` deserialize correctly — new fields are simply `undefined`.
5. **Template `config.ts` files are never modified.** All preset logic is in `StoreCustomization` layer only.

### Template Schema Migration

Each template's `config-schema.ts` gains a new tab group (`"estilo-visual"`) in Phase 1b. This is additive — the dashboard reads all tab groups and renders them. Adding a new tab group never breaks existing tab groups.

Templates that haven't had their `config-schema.ts` updated yet will simply not show the "Estilo visual" tab — the existing behavior is preserved.

---

_Last updated: 2026-06-04_
_Author: Camilo (Frontend Senior) — Phase 1 Preset System documentation_
