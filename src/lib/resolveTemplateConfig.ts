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
} from "@/types/templates";

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
 * The explicit casts below are safe: required keys always come from the template
 * (which is fully typed) and Partial overrides can only replace existing values,
 * never introduce undefined for a required field.
 *
 * @param urlMap Optional pre-built map of media IDs to resolved URLs. When
 *   provided, any string value starting with "media_" in the resolved branding
 *   and content objects is replaced with the corresponding URL. Backward
 *   compatible — omitting urlMap produces identical output to the previous
 *   version.
 */
export function resolveTemplateConfig(
  template: TemplateConfig,
  customization?: StoreCustomization,
  urlMap?: Map<string, string>,
): ResolvedStoreConfig {
  if (!customization) return template;

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

  return {
    ...template,
    // Appearance / theme tokens
    colors: { ...template.colors, ...customization.theme?.colors } as TemplateColorTokens,
    radius: { ...template.radius, ...customization.theme?.radius } as TemplateRadiusTokens,
    // Layout / grid tokens
    grid: { ...template.grid, ...customization.layout?.grid } as TemplateGridConfig,
    layout: { ...template.layout, ...customization.layout?.layout } as TemplateLayoutConfig,
    sections: customization.layout?.sections ?? template.sections,
    // Merchant identity / content / business
    branding: finalBranding,
    content: finalContent,
    business: resolvedBusiness,
  };
}
