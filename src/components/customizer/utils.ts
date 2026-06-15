import type { CustomizerPalette, MutableColors } from "./types";

export function detectPaletteId(
  palettes: CustomizerPalette[] | undefined,
  colors: MutableColors
): string | undefined {
  if (!palettes) return undefined;
  for (const palette of palettes) {
    const keys = Object.keys(palette.colors);
    const matches = keys.every((k) => colors[k] === palette.colors[k]);
    if (matches) return palette.id;
  }
  return undefined;
}

export const TYPOGRAPHY_DEFAULTS = {
  headingWeight: 700,
  headingScale: "xl",
  headingTransform: "none",
  bodyFontSize: "base",
  headingSpacing: "normal",
  bodyFontWeight: 400,
  fontSizeContrast: "medium",
} as const;

export const COLOR_TOKEN_DEFAULTS = {
  colorStrategy: "accent-pop",
  backgroundTreatment: "solid",
  cardBackground: "white",
  imageOverlayHover: "none",
  accentDistribution: "badges-and-buttons",
} as const;

export const STRUCTURAL_DEFAULTS = {
  cardContentLayout: "below-image",
  heroVariant: "full-bleed",
  categoryNavStyle: "horizontal-scroll",
  addToCartStyle: "full-width",
} as const;

export function parseRadius(val: string): number {
  return parseInt(val, 10) || 0;
}
