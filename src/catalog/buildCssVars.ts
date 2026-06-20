// Build CSS custom properties from a resolved store config.
// Automates the manual mapping in TemplateLayoutClient.tsx — same output,
// data-driven instead of hardcoded per-key entries.
//
// Output:
//   colors:  camelCase key → --t-{kebab-case-key}   e.g. onPrimary → --t-on-primary
//   radius:  key → --t-radius-{key}                  e.g. card → --t-radius-card
//   fonts:   --font-body, --font-heading, --template-heading-font
//
// 9-token color system (as of color system simplification):
//   primary, secondary, background, foreground, card, border, muted, accent, onPrimary
//
// Grid and layout values are NOT CSS vars — they're consumed as props by
// components (e.g. grid-cols-{n} classes built from config.grid.products.mobile).

import type { ResolvedStoreConfig } from "@/types/templates";
import type { BorderRadiusScale, ImageBorderRadius, CardPadding, GridColumnsMobile, GridColumnsDesktop, ContainerMaxWidth, ImageFit, BodyFontSize, DensityPreset, CardImageRatio, CardBorderTreatment, DividerStyle } from "@/types/templates/primitives";
import type { HeadingScale } from "@/types/templates/typography";

// Token interfaces (inlined from removed preset-types)
interface CardTokens {
  cardBorderTreatment?: CardBorderTreatment;
  imageFit?: ImageFit;
  imageBorderRadius?: ImageBorderRadius;
}

interface LayoutTokens {
  density?: DensityPreset;
  gridColumnsMobile?: GridColumnsMobile;
  gridColumnsDesktop?: GridColumnsDesktop;
  containerMaxWidth?: ContainerMaxWidth;
  cardImageRatio?: CardImageRatio;
  cardPadding?: CardPadding;
  imageFit?: ImageFit;
}

interface TypographyTokens {
  fontPair?: string;
  headingWeight?: number;
  headingScale?: HeadingScale;
  headingTransform?: "none" | "uppercase";
  bodyFontSize?: BodyFontSize;
  bodyFontWeight?: 300 | 400 | 500;
}

// Hardcoded defaults (previously in preset-defaults.ts)
const DEFAULT_TYPOGRAPHY_VALUES = {
  fontPair: "minimalista",
  headingWeight: 600,
  headingScale: "lg" as HeadingScale,
  headingTransform: "none" as const,
  bodyFontSize: "base" as BodyFontSize,
  bodyFontWeight: 400 as 300 | 400 | 500,
};

const DEFAULT_LAYOUT_VALUES = {
  density: "balanced" as DensityPreset,
  gridColumnsMobile: 2 as GridColumnsMobile,
  gridColumnsDesktop: 3 as GridColumnsDesktop,
  containerMaxWidth: "medium" as ContainerMaxWidth,
  cardImageRatio: "square" as CardImageRatio,
  cardPadding: "normal" as CardPadding,
};

const DEFAULT_CARD_VALUES = {
  cardBorderTreatment: "none" as CardBorderTreatment,
  imageFit: "cover" as ImageFit,
  imageBorderRadius: "same-as-card" as ImageBorderRadius,
};

const DEFAULT_CHROME_VALUES = {
  borderRadiusScale: "md" as BorderRadiusScale,
  dividerStyle: "none" as DividerStyle,
};

/**
 * Convert a camelCase string to kebab-case.
 * "cardBg" → "card-bg", "searchBg" → "search-bg"
 */
function toKebabCase(str: string): string {
  return str.replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`);
}

/**
 * Parse a hex color string into its R, G, B numeric components.
 * Supports 3-digit (#FFF) and 6-digit (#FFFFFF) hex with optional leading #.
 * Returns null if the input cannot be parsed.
 */
function hexToRgbTuple(hex: string): [number, number, number] | null {
  const clean = hex.replace("#", "");
  const full = clean.length === 3
    ? clean.split("").map((c) => c + c).join("")
    : clean;
  if (full.length !== 6) return null;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
  return [r, g, b];
}

/**
 * Relative luminance of a hex color (WCAG formula), 0 = black, 1 = white.
 * Returns null if the hex cannot be parsed.
 */
function getLuminance(hex: string): number | null {
  const rgb = hexToRgbTuple(hex);
  if (!rgb) return null;
  const [r, g, b] = rgb.map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Derive a foreground color for use on top of the card background.
 * When the card is significantly lighter than the page background (dark theme),
 * we use the page background color as the card text color since `foreground`
 * is designed for the page background, not for the card surface.
 * In light themes (card ≈ page background in luminance), `foreground` works fine.
 */
function deriveCardForeground(
  cardHex: string,
  backgroundHex: string,
  foregroundHex: string,
): string {
  const cardLum = getLuminance(cardHex);
  const bgLum = getLuminance(backgroundHex);
  if (cardLum === null || bgLum === null) return foregroundHex;
  // If the card is substantially lighter than the background (dark theme scenario),
  // the background color is the dark anchor — use it as card text color.
  // Threshold: card luminance > bg luminance by more than 0.2 (perceptually significant).
  if (cardLum - bgLum > 0.2) return backgroundHex;
  return foregroundHex;
}

/**
 * Convert a hex color string to a comma-separated RGB string.
 * "#FFAF42" → "255, 175, 66"
 * Supports 3-digit (#FFF) and 6-digit (#FFFFFF) hex with optional leading #.
 * Returns an empty string if the input cannot be parsed.
 */
function hexToRgb(hex: string): string {
  const clean = hex.replace("#", "");
  const full = clean.length === 3
    ? clean.split("").map((c) => c + c).join("")
    : clean;
  if (full.length !== 6) return "";
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return "";
  return `${r}, ${g}, ${b}`;
}

function buildTypographyExtendedVars(_typography: TypographyTokens): Record<string, string> {
  return {
    "--t-type-paragraph-max-width": "65ch",
  };
}

const BORDER_RADIUS_SCALE_MAP: Record<BorderRadiusScale, string> = {
  sharp: "0",
  xs: "0.125rem",
  sm: "0.25rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  pill: "9999px",
};

const IMAGE_BORDER_RADIUS_MAP: Record<ImageBorderRadius, string> = {
  "same-as-card": "var(--t-radius-base)",
  none: "0",
  rounded: "0.5rem",
  circle: "9999px",
};

const CARD_PADDING_MAP: Record<CardPadding, string> = {
  none: "0",
  tight: "0.5rem",
  normal: "0.75rem",
  spacious: "1.25rem",
};

function buildCardVars(cards: CardTokens, borderRadiusScale?: BorderRadiusScale, cardPaddingOverride?: CardPadding): Record<string, string> {
  const scale: BorderRadiusScale = borderRadiusScale ?? DEFAULT_CHROME_VALUES.borderRadiusScale;
  const imageBorderRadius: ImageBorderRadius = cards.imageBorderRadius ?? DEFAULT_CARD_VALUES.imageBorderRadius;
  const cardPadding: CardPadding = cardPaddingOverride ?? DEFAULT_LAYOUT_VALUES.cardPadding;
  const baseValue = BORDER_RADIUS_SCALE_MAP[scale];

  return {
    "--t-radius-base": baseValue,
    "--t-radius-sm": "calc(var(--t-radius-base) * 0.5)",
    "--t-radius-lg": scale === "pill" ? "9999px" : "calc(var(--t-radius-base) * 2)",
    "--t-radius-image": IMAGE_BORDER_RADIUS_MAP[imageBorderRadius],
    "--t-card-padding": CARD_PADDING_MAP[cardPadding],
  };
}

const IMAGE_FIT_VAR_MAP: Record<ImageFit, string> = {
  cover: "cover",
  contain: "contain",
};

function buildLayoutVars(layout: LayoutTokens): Record<string, string> {
  const colsMobile: GridColumnsMobile = layout.gridColumnsMobile ?? DEFAULT_LAYOUT_VALUES.gridColumnsMobile;
  const colsDesktop: GridColumnsDesktop = layout.gridColumnsDesktop ?? DEFAULT_LAYOUT_VALUES.gridColumnsDesktop;
  const imageFit: ImageFit = layout.imageFit ?? DEFAULT_CARD_VALUES.imageFit;

  return {
    "--t-grid-cols-mobile": String(colsMobile),
    "--t-grid-cols-desktop": String(colsDesktop),
    "--t-image-fit": IMAGE_FIT_VAR_MAP[imageFit],
  };
}

/**
 * Build a flat Record of CSS custom property key → value pairs from a
 * resolved store config. The returned object is safe to spread into a
 * React `style` prop (cast to React.CSSProperties on the call site).
 *
 * No value will be undefined — keys with undefined color/radius tokens are
 * excluded from the output entirely to keep the CSS vars map clean.
 */
export function buildCssVars(config: ResolvedStoreConfig): Record<string, string> {
  const vars: Record<string, string> = {};

  // ── Colors → --t-{kebab-case-key} ─────────────────────────────────────────
  for (const [key, value] of Object.entries(config.colors)) {
    if (typeof value === "string" && value.length > 0) {
      vars[`--t-${toKebabCase(key)}`] = value;
    }
  }

  // --t-card-foreground: text color for content inside a --t-card surface.
  // In dark themes the card is a light surface while --t-foreground is light (for the
  // dark page background), so we derive the correct contrasting color automatically.
  {
    const cardHex = config.colors.card;
    const bgHex = config.colors.background;
    const fgHex = config.colors.foreground;
    if (
      typeof cardHex === "string" && cardHex.length > 0 &&
      typeof bgHex === "string" && bgHex.length > 0 &&
      typeof fgHex === "string" && fgHex.length > 0
    ) {
      vars["--t-card-foreground"] = deriveCardForeground(cardHex, bgHex, fgHex);
    }
  }

  // --t-primary-rgb: comma-separated R, G, B of the primary color.
  // Enables rgba(var(--t-primary-rgb), 0.10) for hue-tinted shadows in CSS.
  if (typeof config.colors.primary === "string" && config.colors.primary.length > 0) {
    const rgb = hexToRgb(config.colors.primary);
    if (rgb) vars["--t-primary-rgb"] = rgb;
  }

  // ── Radius → --t-radius-{key} ─────────────────────────────────────────────
  for (const [key, value] of Object.entries(config.radius)) {
    if (typeof value === "string" && value.length > 0) {
      vars[`--t-radius-${toKebabCase(key)}`] = value;
    }
  }

  // ── Fonts ─────────────────────────────────────────────────────────────────
  // --font-body / --font-heading are consumed by next/font CSS variable classes.
  // --font-sans is the alias used by the fashion template components (style={{ fontFamily: "var(--font-sans)" }}).
  // --template-heading-font is the raw font-family string used by components
  // that set font-family directly (e.g. headings with a display font).
  const fontPairId =
    config.theme?.fontPair ??
    (config as unknown as { fontPair?: string }).fontPair;

  if (fontPairId) {
    vars["--font-heading"] = `var(--font-heading-${fontPairId})`;
    vars["--font-body"] = `var(--font-body-${fontPairId})`;
    vars["--font-sans"] = `var(--font-body-${fontPairId})`;
  } else {
    if (config.font) {
      vars["--font-body"] = config.font;
      vars["--font-sans"] = config.font;
    }
    if (config.headingFont) {
      vars["--font-heading"] = config.headingFont;
      vars["--template-heading-font"] = config.headingFont;
    }
  }

  // ── Typography tokens → --t-type-* ────────────────────────────────────────
  // Fine-tunable per-field from merchant theme customization.
  const typography = config.theme?.typography;
  if (typography) {
    const scaleMap: Record<string, string> = {
      md: "1.5rem",
      lg: "2rem",
      xl: "2.5rem",
      "2xl": "3.5rem",
    };
    const headingSpacingMap: Record<string, string> = { tight: '-0.03em', normal: '0em', wide: '0.1em' };
    vars["--t-type-heading-weight"] = String(typography.headingWeight);
    vars["--t-type-heading-size"] = scaleMap[typography.headingScale] ?? "2rem";
    vars["--t-type-heading-tracking"] = headingSpacingMap[typography.headingSpacing] ?? '0em';
    vars["--t-type-heading-transform"] = typography.headingTransform;

    const extendedTokens: TypographyTokens = {
      headingWeight: typography.headingWeight,
      bodyFontSize: config.theme?.typography?.bodyFontSize ?? config.theme?.bodyFontSize,
      bodyFontWeight: config.theme?.typography?.bodyFontWeight ?? config.theme?.bodyFontWeight,
    };
    Object.assign(vars, buildTypographyExtendedVars(extendedTokens));
  }

  // ── Spacing/density tokens → --t-space-* ──────────────────────────────────
  // Density level resolves to a set of spacing multiplier tokens.
  // Defaults to "balanced" when no preset has been applied.
  const density = config.layoutDensity ?? "balanced";
  const spacingMap: Record<string, Record<string, string>> = {
    compact:  { section: "2rem",  card: "0.75rem", item: "0.5rem",  gap: "0.75rem" },
    balanced: { section: "3rem",  card: "1rem",    item: "0.75rem", gap: "1rem"    },
    spacious: { section: "5rem",  card: "1.5rem",  item: "1rem",    gap: "1.5rem"  },
  };
  const spacing = spacingMap[density] ?? spacingMap["balanced"]!;
  vars["--t-space-section"] = spacing.section;
  vars["--t-space-card"]    = spacing.card;
  vars["--t-space-item"]    = spacing.item;
  vars["--t-space-gap"]     = spacing.gap;

  // spacingDensity — merchant fine-tune control that overrides the coarser
  // layoutDensity values written above. Only applied when the merchant has
  // explicitly set config.layout.spacingDensity; otherwise layoutDensity wins.
  // Both write to the same --t-space-* vars that components consume.
  if (config.layout?.spacingDensity != null) {
    const spacingDensityMap: Record<string, Record<string, string>> = {
      tight:  { section: '1.5rem', card: '0.5rem',  item: '0.375rem', gap: '0.5rem'  },
      normal: { section: '2.5rem', card: '1rem',    item: '0.75rem',  gap: '1rem'    },
      airy:   { section: '4rem',   card: '1.5rem',  item: '1rem',     gap: '1.5rem'  },
    };
    const sd = spacingDensityMap[config.layout.spacingDensity] ?? spacingDensityMap['normal'];
    vars['--t-space-section'] = sd.section;
    vars['--t-space-card']    = sd.card;
    vars['--t-space-item']    = sd.item;
    vars['--t-space-gap']     = sd.gap;
  }

  // ── Card tokens → --t-radius-*, --t-card-padding ──────────────────────────
  // Read from config.layout (the merged TemplateLayoutConfig) for card/chrome fields.
  const cardInput: CardTokens = {
    cardBorderTreatment: config.layout?.cardBorderTreatment,
    imageFit: config.layout?.imageFit,
    imageBorderRadius: config.layout?.imageBorderRadius,
  };
  const chromeRadiusScale = config.layout?.borderRadiusScale;
  Object.assign(vars, buildCardVars(cardInput, chromeRadiusScale, config.layout?.cardPadding));

  // ── Layout tokens → --t-grid-cols-*, --t-image-fit ──────────────────────
  const layoutInput: LayoutTokens = {
    gridColumnsMobile: config.layout?.gridColumnsMobile,
    gridColumnsDesktop: config.layout?.gridColumnsDesktop,
    containerMaxWidth: config.layout?.containerMaxWidth,
    cardImageRatio: config.layout?.cardImageRatio,
    cardPadding: config.layout?.cardPadding,
    imageFit: config.layout?.imageFit,
  };
  Object.assign(vars, buildLayoutVars(layoutInput));

  // NOTE: "fontFamily" (camelCase, no -- prefix) is intentional.
  // buildCssVars output is spread into style={} as React.CSSProperties, so
  // React maps camelCase keys to their CSS property equivalents on the DOM element.
  // This sets font-family: var(--font-body) on the .template-scope div itself,
  // ensuring the body font resolves even when a parent has a different font-family.
  // It is NOT a CSS custom property and must NOT use the --t- prefix.
  vars["fontFamily"] = "var(--font-body)";

  return vars;
}
