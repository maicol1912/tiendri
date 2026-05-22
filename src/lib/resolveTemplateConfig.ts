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
 */
export function resolveTemplateConfig(
  template: TemplateConfig,
  customization?: StoreCustomization,
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
    branding: resolvedBranding,
    content: resolvedContent,
    business: resolvedBusiness,
  };
}
