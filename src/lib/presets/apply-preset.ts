// Preset System — applyPreset pure function
// Applies a style preset to a StoreCustomization, preserving all merchant-set
// values (branding, content, business, palette, radius, per-token color overrides)
// and overwriting only the preset-managed fields.

import { stylePresets } from "./presets";
import type { StoreCustomization } from "@/types/templates/store-customization";
import type { TemplateLayoutConfig } from "@/types/templates/template-config";

const FALLBACK_PRESET_ID = "tech-premium";

/**
 * Apply a style preset to a merchant's current StoreCustomization.
 *
 * Pure function — does not mutate the input. Returns a new StoreCustomization
 * with the preset's theme and layout values applied.
 *
 * Preserved (untouched): branding, content, business, appearance,
 *   theme.paletteId, theme.colors, theme.radius (per-token color overrides).
 *
 * Overwritten: theme.presetId + all 46 preset-managed fields across
 *   typography, layout, cards, effects, color, and chrome sub-objects.
 *
 * @param presetId - The ID of the preset to apply (e.g. "tech-premium", "galeria")
 * @param current  - The merchant's existing StoreCustomization
 * @returns New StoreCustomization with preset applied; falls back to tech-premium if not found
 */
export function applyPreset(
  presetId: string,
  current: StoreCustomization,
): StoreCustomization {
  let preset = stylePresets.find((p) => p.id === presetId);

  if (!preset) {
    console.warn(
      `[applyPreset] Unknown preset id "${presetId}" — falling back to "${FALLBACK_PRESET_ID}".`,
    );
    preset = stylePresets.find((p) => p.id === FALLBACK_PRESET_ID)!;
  }

  const { typography, layout, cards, effects, color, chrome } = preset;

  return {
    ...current,
    theme: {
      ...current.theme,
      presetId,
      // Typography
      fontPair: typography.fontPair,
      typography: {
        headingWeight: typography.headingWeight ?? 600,
        headingScale: typography.headingScale ?? "lg",
        headingTracking: typography.headingTracking ?? "-0.01em",
        headingTransform: typography.headingTransform ?? "none",
      },
      // Extended typography fields
      bodyFontSize: typography.bodyFontSize,
      bodyLineHeight: typography.bodyLineHeight,
      displaySize: typography.displaySize,
      cardTextAlign: typography.cardTextAlign,
      headingFontStyle: typography.headingFontStyle,
      headingDecoration: typography.headingDecoration,
      // Color personality tokens
      colorStrategy: color.colorStrategy,
      backgroundTreatment: color.backgroundTreatment,
      cardBackground: color.cardBackground,
      imageOverlayHover: color.imageOverlayHover,
      accentDistribution: color.accentDistribution,
    },
    layout: {
      ...current.layout,
      density: layout.density,
      structuralVariants: {
        ...current.layout?.structuralVariants,
      },
      layout: {
        ...current.layout?.layout,
        // Card tokens
        ...(layout.cardImageRatio !== undefined && { cardImageRatio: layout.cardImageRatio }),
        ...(cards.cardBorderTreatment !== undefined && { cardBorderTreatment: cards.cardBorderTreatment }),
        ...(cards.imageFit !== undefined && { imageFit: cards.imageFit }),
        ...(cards.imageBorderRadius !== undefined && { imageBorderRadius: cards.imageBorderRadius }),
        ...(cards.imageHoverEffect !== undefined && { imageHoverEffect: cards.imageHoverEffect }),
        // Effect tokens
        ...(effects.shadowElevation !== undefined && { shadowElevation: effects.shadowElevation }),
        ...(effects.transitionSpeed !== undefined && { transitionSpeed: effects.transitionSpeed }),
        ...(effects.transitionEasing !== undefined && { transitionEasing: effects.transitionEasing }),
        // Layout tokens
        ...(layout.gridColumnsMobile !== undefined && { gridColumnsMobile: layout.gridColumnsMobile }),
        ...(layout.gridColumnsDesktop !== undefined && { gridColumnsDesktop: layout.gridColumnsDesktop }),
        ...(layout.containerMaxWidth !== undefined && { containerMaxWidth: layout.containerMaxWidth }),
        ...(layout.cardPadding !== undefined && { cardPadding: layout.cardPadding }),
        // Chrome tokens
        ...(chrome.borderRadiusScale !== undefined && { borderRadiusScale: chrome.borderRadiusScale }),
        ...(chrome.dividerStyle !== undefined && { dividerStyle: chrome.dividerStyle }),
      } as Partial<TemplateLayoutConfig>,
    },
  };
}
