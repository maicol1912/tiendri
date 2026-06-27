// Config Resolver — merges template defaults with merchant overrides.
// Components always receive a ResolvedStoreConfig, never the raw pieces.

import type {
  TemplateConfig,
  TemplateColorTokens,
  TemplateRadiusTokens,
  TemplateGridConfig,
  TemplateLayoutConfig,
  ResolvedStoreConfig,
  StoreCustomization,
  BrandingConfig,
  ContentConfig,
  BusinessConfig,
  SectionConfig,
} from "@/types/templates";
import type { ColorPalette, TemplateConfigSchema } from "@/types/templates/config-schema";

// ── Essential sections fallback ───────────────────────────────────────────────
// Only categories + products when the owner hasn't configured sections.
// Hero/banners/popular/etc. appear only when explicitly enabled.
const ESSENTIAL_SECTIONS: SectionConfig[] = [
  { id: 'categories', visible: true },
  { id: 'products', visible: true },
];

// ── Media ID resolution ───────────────────────────────────────────────────────

/**
 * Recursively walks an object and replaces any string value that starts with
 * "media_" with the corresponding URL from urlMap. Values not in the map (or
 * strings that don't start with "media_") are passed through unchanged.
 *
 * The function is immutable — it never mutates the input object.
 */
function resolveMediaIds(
  obj: Record<string, unknown>,
  urlMap: Map<string, string>
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const key of Object.keys(obj)) {
    const value = obj[key];

    if (typeof value === 'string') {
      result[key] = value.startsWith('media_')
        ? (urlMap.get(value) ?? value)
        : value;
    } else if (Array.isArray(value)) {
      result[key] = value.map((item) => {
        if (typeof item === 'string') {
          return item.startsWith('media_') ? (urlMap.get(item) ?? item) : item;
        }
        if (item !== null && typeof item === 'object' && !Array.isArray(item)) {
          return resolveMediaIds(item as Record<string, unknown>, urlMap);
        }
        return item;
      });
    } else if (value !== null && typeof value === 'object') {
      result[key] = resolveMediaIds(value as Record<string, unknown>, urlMap);
    } else {
      result[key] = value;
    }
  }

  return result;
}

// ── Palette token resolution ─────────────────────────────────────────────────

/**
 * Finds a palette by ID and returns its color tokens.
 * Returns an empty object when no match is found (no-op for spread).
 */
function resolvePaletteTokens(
  paletteId: string | undefined,
  palettes: ColorPalette[] | undefined,
): Record<string, string> {
  if (!paletteId || !palettes || palettes.length === 0) return {};
  const palette = palettes.find((p) => p.id === paletteId);
  return palette ? palette.colors : {};
}

/**
 * Merge a template's defaults with optional merchant overrides.
 *
 * Merge strategy per section:
 * - colors, radius, grid, layout: shallow merge — merchant keys win field-by-field
 * - sections: merchant array REPLACES template array entirely (order matters)
 * - branding: shallow merge — merchant values win per field
 * - content: shallow merge per top-level field; nested objects (heroBanner,
 *   socialLinks) get a second-level spread. Arrays (navLinks, footerServices,
 *   footerAssistance, productTabs, popularSearches) REPLACE — not concatenate.
 * - business: shallow merge — merchant values win per field
 *
 * Color resolution order (3 layers):
 *   1. Template defaults (config.ts colors)
 *   2. Palette tokens (if paletteId is set and palette found in schema)
 *   3. Per-token merchant overrides (customization.theme.colors)
 *
 * The explicit casts below are safe: required keys always come from the template
 * (which is fully typed) and Partial overrides can only replace existing values,
 * never introduce undefined for a required field.
 *
 * @param schema Optional template config schema containing palette definitions.
 *   When provided with a paletteId in customization, palette tokens are applied
 *   between template defaults and per-token overrides.
 * @param urlMap Optional pre-built map of media IDs to resolved URLs. When
 *   provided, any string value starting with "media_" in the resolved branding
 *   and content objects is replaced with the corresponding URL. Backward
 *   compatible — omitting urlMap produces identical output to the previous
 *   version.
 */
export function resolveTemplateConfig(
  template: TemplateConfig,
  customization?: StoreCustomization,
  schema?: TemplateConfigSchema,
  urlMap?: Map<string, string>,
): ResolvedStoreConfig {
  if (!customization) {
    return {
      ...template,
      navLinks: template.content?.navLinks ?? [],
      footerServices: template.content?.footerServices ?? [],
      footerAssistance: template.content?.footerAssistance ?? [],
      productTabs: template.content?.productTabs ?? [],
      popularSearches: template.content?.popularSearches ?? [],
    };
  }

  // ── Branding merge ────────────────────────────────────────────────────────
  const resolvedBranding: BrandingConfig | undefined =
    template.branding || customization.branding
      ? {
          ...template.branding,
          ...customization.branding,
          // Second-level spread for nested socialLinks object
          socialLinks:
            template.branding?.socialLinks || customization.branding?.socialLinks
              ? {
                  ...template.branding?.socialLinks,
                  ...customization.branding?.socialLinks,
                }
              : undefined,
        }
      : undefined;

  // ── Content merge ─────────────────────────────────────────────────────────
  // Arrays (navLinks, footerServices, etc.) REPLACE the template default —
  // merchant intent is to define the full list, not extend it.
  const resolvedContent: ContentConfig | undefined =
    template.content || customization.content
      ? {
          ...template.content,
          ...customization.content,
          // Second-level spread for nested heroBanner object
          heroBanner:
            template.content?.heroBanner || customization.content?.heroBanner
              ? {
                  ...template.content?.heroBanner,
                  ...customization.content?.heroBanner,
                }
              : undefined,
        }
      : undefined;

  // ── Business merge ────────────────────────────────────────────────────────
  const resolvedBusiness: BusinessConfig | undefined =
    template.business || customization.business
      ? {
          ...template.business,
          ...customization.business,
        }
      : undefined;

  // ── Media ID resolution (post-merge) ──────────────────────────────────────
  // When a urlMap is provided, replace any "media_*" strings in branding and
  // content with their resolved URLs. This keeps the function synchronous while
  // allowing callers to pre-fetch URLs before calling resolveTemplateConfig.
  const finalBranding =
    urlMap && urlMap.size > 0 && resolvedBranding
      ? (resolveMediaIds(
          resolvedBranding as unknown as Record<string, unknown>,
          urlMap
        ) as unknown as BrandingConfig)
      : resolvedBranding;

  const finalContent =
    urlMap && urlMap.size > 0 && resolvedContent
      ? (resolveMediaIds(
          resolvedContent as unknown as Record<string, unknown>,
          urlMap
        ) as unknown as ContentConfig)
      : resolvedContent;

  // ── Palette-aware color resolution ─────────────────────────────────────────
  const paletteTokens = resolvePaletteTokens(
    customization.theme?.paletteId,
    schema?.theme.palettes,
  );

  // ── gridDensity → grid override ──────────────────────────────────────────
  // Applies AFTER the shallow merge so the density setting overrides both the
  // template default and any explicit merchant grid overrides. Components that
  // call gridColsClass(config.grid.products.mobile, …) pick this up for free.
  const mergedGrid = {
    ...template.grid,
    ...customization.layout?.grid,
  } as TemplateGridConfig;
  const gridDensity = customization.layout?.layout?.gridDensity ?? 'standard';
  const GRID_DENSITY_MAP: Record<string, { mobile: number; desktop: number }> = {
    compact:  { mobile: 3, desktop: 5 },
    standard: { mobile: 2, desktop: 4 },
    spacious: { mobile: 1, desktop: 3 },
  };
  const gridOverride = GRID_DENSITY_MAP[gridDensity];
  let resolvedGrid: TemplateGridConfig = mergedGrid;
  if (gridOverride) {
    resolvedGrid = {
      ...mergedGrid,
      products:   { ...mergedGrid.products,   mobile: gridOverride.mobile, desktop: gridOverride.desktop },
      categories: { ...mergedGrid.categories, mobile: Math.min(gridOverride.mobile + 1, 4), desktop: Math.min(gridOverride.desktop + 2, 8) },
      listing:    { ...mergedGrid.listing,    mobile: gridOverride.mobile, desktop: gridOverride.desktop },
    } as TemplateGridConfig;
  }

  return {
    ...template,
    // Appearance / theme tokens — 3-layer merge: defaults → palette → overrides
    colors: {
      ...template.colors,
      ...paletteTokens,
      ...customization.theme?.colors,
    } as TemplateColorTokens,
    radius: { ...template.radius, ...customization.theme?.radius } as TemplateRadiusTokens,
    // Layout / grid tokens
    grid: resolvedGrid,
    layout: { ...template.layout, ...customization.layout?.layout } as TemplateLayoutConfig,
    sections: (customization.layout?.sections && customization.layout.sections.length > 0)
      ? customization.layout.sections
      : ESSENTIAL_SECTIONS,
    // Merchant identity / content / business
    branding: finalBranding,
    content: finalContent,
    business: resolvedBusiness,
    // Lift content arrays to top-level so components can access them directly
    // without needing to reach into content. The resolver is the single source
    // of truth — templates no longer duplicate these at the root of config.ts.
    navLinks: finalContent?.navLinks ?? template.content?.navLinks ?? [],
    footerServices: finalContent?.footerServices ?? template.content?.footerServices ?? [],
    footerAssistance: finalContent?.footerAssistance ?? template.content?.footerAssistance ?? [],
    productTabs: finalContent?.productTabs ?? template.content?.productTabs ?? [],
    popularSearches: finalContent?.popularSearches ?? template.content?.popularSearches ?? [],
    // Forwarded from merchant customization — used by buildCssVars for
    // typography tokens (--t-type-*) and spacing/density tokens (--t-space-*).
    // These are additive and backward-compatible: consumers that don't read
    // these fields are completely unaffected.
    theme: customization.theme,
    layoutDensity: customization.layout?.density,
    structuralVariants: customization.layout?.structuralVariants ?? template.structuralVariants,
  };
}
