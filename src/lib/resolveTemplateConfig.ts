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
} from "@/types/templates";

/**
 * Merge a template's defaults with optional merchant overrides.
 *
 * - If no customization is provided, the template config is returned as-is.
 * - Top-level objects (colors, radius, grid, layout) are shallow-merged so that
 *   the merchant only needs to specify the keys they want to override.
 * - sections: if the merchant supplied a full array it replaces the template's
 *   default entirely (array order = render order).
 *
 * The explicit casts below are safe because the required keys always come from
 * the template (which is fully typed), and Partial overrides can only replace
 * existing string values — never introduce undefined for a required field.
 */
export function resolveTemplateConfig(
  template: TemplateConfig,
  customization?: StoreCustomization,
): ResolvedStoreConfig {
  if (!customization) return template;

  return {
    ...template,
    colors: { ...template.colors, ...customization.theme?.colors } as TemplateColorTokens,
    radius: { ...template.radius, ...customization.theme?.radius } as TemplateRadiusTokens,
    grid: { ...template.grid, ...customization.layout?.grid } as TemplateGridConfig,
    layout: { ...template.layout, ...customization.layout?.layout } as TemplateLayoutConfig,
    sections: customization.layout?.sections ?? template.sections,
  };
}
