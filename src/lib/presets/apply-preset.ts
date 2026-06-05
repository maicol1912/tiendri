// Preset System — applyPreset pure function
// Applies a style preset to a StoreCustomization, preserving all merchant-set
// values (branding, content, business, palette, radius, per-token color overrides)
// and overwriting only the preset-managed fields.

import { stylePresets } from "./presets";
import type { StoreCustomization } from "@/types/templates/store-customization";

/**
 * Apply a style preset to a merchant's current StoreCustomization.
 *
 * Pure function — does not mutate the input. Returns a new StoreCustomization
 * with the preset's theme and layout values applied.
 *
 * Preserved (untouched): branding, content, business, appearance,
 *   theme.paletteId, theme.colors, theme.radius (per-token overrides).
 *
 * Overwritten: theme.presetId, theme.fontPair, theme.typography,
 *   layout.density, and the 9 preset-managed layout.layout fields.
 *
 * @param presetId - The ID of the preset to apply (e.g. "minimalista", "directo")
 * @param current  - The merchant's existing StoreCustomization
 * @returns New StoreCustomization with preset applied, or `current` unchanged if presetId not found
 */
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
