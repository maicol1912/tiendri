# Template System — Developer Guide

> A focused reference for anyone building or understanding Tiendri templates.
> For the broader architecture context, see `docs/technical.md`.

---

## What Is a Template?

A template is the complete visual skin for a merchant's storefront. It consists of three things:

1. **`config.ts`** — default values the template ships with (`satisfies TemplateConfig`)
2. **`config-schema.ts`** — a declarative description of which fields the merchant can configure from the dashboard
3. **Components** — React components that render the storefront using a `ResolvedStoreConfig`

The dashboard reads the schema to build forms automatically. The storefront renders by passing a resolved config (template defaults merged with merchant overrides) down to the components.

---

## Template File Structure

```
src/templates/[name]/
├── config.ts             # Default theme values — satisfies TemplateConfig
├── config-schema.ts      # Configurable surface — exports TemplateConfigSchema
├── index.tsx             # Storefront entry point
├── mock/
│   ├── data.ts           # Static mock data (used in /template/[name] preview)
│   └── assets.ts         # Image path constants
├── components/           # Storefront components (header, home, product detail, etc.)
├── hooks/                # e.g. useTemplateNav
├── context/              # CartContext (localStorage cart for storefront)
└── utils/                # grid-classes, layout-classes map helpers
```

**Invariants:**
- `config.ts` must export an object that satisfies `TemplateConfig` via `as const satisfies TemplateConfig`
- `config-schema.ts` must export a named object of type `TemplateConfigSchema`
- The registry (`src/templates/registry.ts`) must be updated when adding a new template

---

## How a Storefront Loads a Template

```
Server Component (/[slug]/page.tsx)
  └── calls get_public_storefront(slug) RPC → raw store data

  resolveTemplateConfig(templateDefaults, storeCustomization)
  └── returns ResolvedStoreConfig

  buildCssVars(resolvedConfig)
  └── returns { "--t-primary": "#000", "--t-card-bg": "#F6F6F6", ... }

  <div class="template-scope" style={cssVars}>
    └── <TemplateComponent config={resolvedConfig} data={storefrontData} />
```

Components only receive `ResolvedStoreConfig` — they never see raw `TemplateConfig` or raw `StoreCustomization` directly.

---

## How the Dashboard Reads the Schema

```
/dashboard/configuracion
  └── ConfiguracionClient
       └── getTemplateSchemaSync(templateId) → TemplateConfigSchema

       schema.theme.colors      → color picker rows in ThemeTab
       schema.theme.radius      → range slider rows in ThemeTab
       schema.theme.fontPairs   → font picker in ThemeTab

       schema.content.tabGroups → DynamicTabContent
         └── tabGroup.sections
              ├── ConfigSection         → DynamicSection (flat card with fields)
              └── RepeatableConfigSection → RepeatableSection (add/remove/reorder items)
```

When a merchant saves a value, it is stored as a partial `StoreCustomization` blob in localStorage (key: `tiendri_demo-store_customization`). The resolver merges it with template defaults at render time.

---

## TemplateConfigSchema Reference

### Root Shape

```typescript
interface TemplateConfigSchema {
  theme: {
    colors: ThemeSchemaColor[];     // editable color tokens
    radius: ThemeSchemaRadius[];    // editable radius tokens
    fontPairs: ThemeSchemaFontPair[];
  };
  content: {
    tabGroups: ConfigTabGroup[];    // dashboard tab groups
  };
}
```

### ConfigTabGroup

```typescript
interface ConfigTabGroup {
  id: string;
  label: string;           // Tab label shown in the dashboard
  icon?: string;           // Lucide icon name (e.g. "Layout", "Navigation")
  sections: (ConfigSection | RepeatableConfigSection)[];
}
```

### ConfigSection (flat)

```typescript
interface ConfigSection {
  id: string;
  label: string;
  description?: string;
  icon?: string;           // Lucide icon name
  fields: ConfigField[];
}
```

### RepeatableConfigSection

```typescript
interface RepeatableConfigSection extends Omit<ConfigSection, 'fields'> {
  kind: "repeatable";
  itemLabel: string;       // Shown on the "Agregar X" button
  minItems?: number;       // Default 0
  maxItems?: number;
  fields: ConfigField[];   // Keys are relative (no dot-path prefix)
}
```

Use `isRepeatableSection(section)` (exported from `src/types/templates/config-schema.ts`) to branch between renderers.

### ConfigField — All Properties

| Property | Type | When required | Notes |
|---|---|---|---|
| `key` | `string` | Always | Dot-path into `StoreCustomization`. In repeatable sections, keys are relative (e.g. `"title"` not `"content.banners[0].title"`) |
| `type` | `FieldType` | Always | See table below |
| `label` | `string` | Always | Spanish UI label for the merchant |
| `description` | `string` | — | Help text below the field |
| `placeholder` | `string` | — | Input placeholder text |
| `defaultValue` | `unknown` | — | Pre-filled value |
| `required` | `boolean` | — | Marks field as mandatory |
| `maxLength` | `number` | `text`, `textarea` | Max character count |
| `min` | `number` | `number`, `range` | Minimum value |
| `max` | `number` | `number`, `range` | Maximum value |
| `step` | `number` | `range` | Slider step increment |
| `unit` | `string` | `range` | Display suffix (e.g. `"px"`, `"%"`) |
| `options` | `{label, value}[]` | `select` | Options list — required for select |
| `aspectRatio` | `string` | `image` | Crop constraint (e.g. `"16:9"`, `"1:1"`) |
| `maxFileSize` | `number` | `image` | Max bytes |
| `dependsOn` | `{field, value}` | — | Hide field unless another field equals a value |

### FieldType Reference

| Type | Rendered as | Notes |
|---|---|---|
| `text` | Single-line text input | Use `maxLength` for limits |
| `textarea` | Multi-line text input | Use `maxLength` for limits |
| `image` | Image uploader with crop | Use `aspectRatio` and `maxFileSize` |
| `url` | URL input with validation | |
| `color` | Color picker (hex) | |
| `select` | Dropdown menu | Requires `options` array |
| `number` | Numeric input | Use `min`/`max` |
| `range` | Slider | Use `min`/`max`/`step`/`unit` |
| `boolean` | Toggle switch | |
| `tag-list` | Comma-separated tag chip list | For arrays of strings |
| `key-value-list` | Pairs editor | For arrays of `{key, value}` objects |
| `font-picker` | Font pair selector | Driven by `theme.fontPairs` |
| `color-palette` | Multi-color group picker | For grouped color token editing |

### Field Key Conventions

**Simple sections** — use full dot-path into `StoreCustomization`:
```
content.heroBanner.title
content.heroBanner.image
content.popularSearches
branding.storeName
```

**Repeatable sections** — use relative key (the renderer prefixes the array path and index):
```
title        → becomes content.promotionalBanners[0].title at runtime
image        → becomes content.promotionalBanners[0].image at runtime
```

**Data path for repeatable sections** — the section `id` is converted from kebab-case to camelCase to derive the key in `StoreCustomization`:
```
id: "promotional-banners"  →  content.promotionalBanners
id: "nav-links"            →  content.navLinks
```

### Theme Schema Types

```typescript
interface ThemeSchemaColor {
  key: string;     // Matches a key in TemplateColorTokens (e.g. "primary")
  label: string;   // Spanish label
  default: string; // Hex value (e.g. "#6366F1")
}

interface ThemeSchemaRadius {
  key: string;     // Matches a key in TemplateRadiusTokens (e.g. "card")
  label: string;
  default: string; // CSS value (e.g. "12px")
  max: number;     // Max px value for slider
}

interface ThemeSchemaFontPair {
  key: string;     // e.g. "modern", "warm", "elegant", "functional"
  label: string;
  body: string;    // Body font family name
  heading: string; // Heading font family name
  preview?: string;
}
```

---

## Creating a New Template — Step by Step

### 1. Create the Directory Structure

```bash
mkdir src/templates/my-template
mkdir src/templates/my-template/components
mkdir src/templates/my-template/mock
```

### 2. Write `config.ts` — Template Defaults

```typescript
// src/templates/my-template/config.ts
import type { TemplateConfig } from "@/types/templates";

export const myTemplateConfig = {
  id: "my-template",
  name: "My Template",
  description: "Short description for merchants",

  font: "Inter",
  headingFont: "var(--font-display), ui-sans-serif, system-ui, sans-serif",

  colors: {
    primary: "#6366F1",
    secondary: "#4F46E5",
    background: "#FFFFFF",
    cardBg: "#F9FAFB",
    border: "#E5E7EB",
    surface: "#F3F4F6",
    textMuted: "#9CA3AF",
    buttonBg: "#6366F1",
    buttonText: "#FFFFFF",
    footerBg: "#111827",
  },

  radius: {
    card: "12px",
    category: "16px",
    button: "8px",
  },

  grid: {
    products: { mobile: 2, desktop: 4 },
    categories: { mobile: 3, desktop: 6 },
    listing: { mobile: 2, desktop: 3 },
    search: { mobile: 2, desktop: 3 },
  },

  layout: {
    cardStyle: "shadow" as const,
    cardHoverEffect: "lift" as const,
    cardImageRatio: "square" as const,
    navStyle: "pills" as const,
    tabStyle: "pills" as const,
    bannerHeight: "normal" as const,
    headerStyle: "standard" as const,
    footerStyle: "columns" as const,
  },

  sections: [
    { id: "hero", visible: true },
    { id: "categories", visible: true },
    { id: "products", visible: true },
  ],

  branding: {
    storeName: "Mi Tienda",
    description: "Tu tienda online en Tiendri",
    socialLinks: {},
  },

  content: {
    heroBanner: {
      title: "Bienvenido a mi tienda",
      subtitle: "Encontrá los mejores productos.",
      ctaText: "Ver catálogo",
    },
  },

  business: {
    currency: "COP",
    paymentMethods: [],
  },
} as const satisfies TemplateConfig;
```

Key rules:
- Use `as const satisfies TemplateConfig` — never `as TemplateConfig` (loses literal types)
- All required `TemplateColorTokens` keys must be present: `primary`, `secondary`, `background`, `cardBg`, `border`, `surface`, `textMuted`, `buttonBg`, `buttonText`, `footerBg`
- All required `TemplateRadiusTokens` keys must be present: `card`, `category`, `button`
- Use `as const` on literal union fields (`"shadow" as const`)

### 3. Write `config-schema.ts` — Configurable Surface

```typescript
// src/templates/my-template/config-schema.ts
import type { TemplateConfigSchema } from "@/types/templates";

export const myTemplateConfigSchema: TemplateConfigSchema = {
  theme: {
    colors: [
      { key: "primary", label: "Color principal", default: "#6366F1" },
      { key: "background", label: "Color de fondo", default: "#FFFFFF" },
    ],
    radius: [
      { key: "card", label: "Radio de tarjetas", default: "12px", max: 24 },
      { key: "button", label: "Radio de botones", default: "8px", max: 24 },
    ],
    fontPairs: [
      { key: "modern", label: "Moderno", body: "Inter", heading: "Space Grotesk" },
    ],
  },
  content: {
    tabGroups: [
      {
        id: "contenido-principal",
        label: "Contenido Principal",
        icon: "Layout",
        sections: [
          {
            id: "hero-banner",
            label: "Banner principal",
            icon: "Image",
            fields: [
              { key: "content.heroBanner.title", type: "text", label: "Título", maxLength: 80 },
              { key: "content.heroBanner.image", type: "image", label: "Imagen", aspectRatio: "16:9" },
              { key: "content.heroBanner.ctaText", type: "text", label: "Texto del botón", maxLength: 40 },
            ],
          },
        ],
      },
    ],
  },
};
```

### 4. Create Components

Components receive `config: ResolvedStoreConfig`. Never hardcode colors — always use CSS vars:

```tsx
// Good — reads from the injected CSS var
<button className="bg-[--t-button-bg] text-[--t-button-text]">
  {config.content?.heroBanner?.ctaText ?? "Ver catálogo"}
</button>

// Bad — hardcoded color
<button className="bg-black text-white">Ver catálogo</button>
```

### 5. Register in `src/templates/registry.ts`

Add a case to both `getTemplateSchema` (async) and `syncRegistry` (sync):

```typescript
// Async loader
case "my-template": {
  const { myTemplateConfigSchema } = await import("./my-template/config-schema");
  return myTemplateConfigSchema;
}

// Sync registry
import { myTemplateConfigSchema } from "./my-template/config-schema";
const syncRegistry: Record<string, TemplateConfigSchema> = {
  "tech-premium": techPremiumConfigSchema,
  "my-template": myTemplateConfigSchema,  // ← add this
};
```

### 6. The Dashboard Adapts Automatically

Once registered, the configuracion page at `/dashboard/configuracion` will:
- Load the schema via `getTemplateSchemaSync`
- Render color pickers from `schema.theme.colors`
- Render radius sliders from `schema.theme.radius`
- Render font picker from `schema.theme.fontPairs`
- Render content tab groups from `schema.content.tabGroups`

No dashboard code changes required.

---

## Example: tech-premium Anatomy

### config.ts Highlights

`src/templates/tech-premium/config.ts` defines 26 named color tokens (including template-specific extras like `badgeBg`, `ratingStar`, `searchBg`) beyond the 10 required ones. The index signature `[key: string]: string` in `TemplateColorTokens` allows this without breaking the shared type.

It ships with default `content` values (heroBanner text, navLinks, footerServices, productTabs, popularSearches) that the merchant can override. These mirror the top-level keys (`config.navLinks`) for backward compatibility with components that haven't been migrated to read from `config.content.*`.

### config-schema.ts Highlights

`src/templates/tech-premium/config-schema.ts` declares:

- **Theme**: 4 colors (primary, secondary, accent, background), 3 radius tokens, 4 font pairs
- **Content tab 1** — `"Contenido Principal"`: hero banner (simple), promotional banners (repeatable, max 4), offers banner (simple)
- **Content tab 2** — `"Navegación y Pie de Página"`: nav links (repeatable), product tabs (repeatable), popular searches (tag-list), footer services (tag-list), footer assistance (tag-list)

### Merchant Data Flow

```
Merchant edits field in /dashboard/configuracion
  └── onChange handler calls setByPath(customization, "content.heroBanner.title", value)
       └── saved to localStorage key "tiendri_demo-store_customization"

Storefront renders (/template/tech-premium or /[slug])
  └── reads customization from localStorage
       └── resolveTemplateConfig(techPremiumConfig, customization)
            └── buildCssVars(resolved) → injected as style prop on .template-scope
                 └── components read CSS vars and config.content.* values
```

---

## Component CSS Variable Convention

All components must use CSS variables from the `.template-scope` scope:

| Token | CSS var | Example use |
|---|---|---|
| Primary color | `--t-primary` | CTA buttons, active states |
| Secondary color | `--t-secondary` | Accents, badges |
| Background | `--t-background` | Page background |
| Card background | `--t-card-bg` | Product card background |
| Border | `--t-border` | Dividers, input borders |
| Surface | `--t-surface` | Section backgrounds |
| Muted text | `--t-text-muted` | Secondary labels, descriptions |
| Button bg | `--t-button-bg` | Primary action buttons |
| Button text | `--t-button-text` | Text on primary buttons |
| Footer bg | `--t-footer-bg` | Footer background |
| Card radius | `--t-radius-card` | Product card `border-radius` |
| Category radius | `--t-radius-category` | Category chip radius |
| Button radius | `--t-radius-button` | Button `border-radius` |

---

_Last updated: 2026-05-22_
