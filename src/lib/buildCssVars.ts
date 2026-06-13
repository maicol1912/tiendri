// Build CSS custom properties from a resolved store config.
// Automates the manual mapping in TemplateLayoutClient.tsx — same output,
// data-driven instead of hardcoded per-key entries.
//
// Output:
//   colors:  camelCase key → --t-{kebab-case-key}   e.g. onPrimary → --t-on-primary
//   radius:  key → --t-radius-{key}                  e.g. card → --t-radius-card
//   fonts:   --font-body, --font-heading, --template-heading-font
//   effects: --t-fx-* motion/interaction tokens from EffectTokens
//
// 9-token color system (as of color system simplification):
//   primary, secondary, background, foreground, card, border, muted, accent, onPrimary
//
// Grid and layout values are NOT CSS vars — they're consumed as props by
// components (e.g. grid-cols-{n} classes built from config.grid.products.mobile).

import type { ResolvedStoreConfig } from "@/types/templates";
import type { AnimationLevel, TransitionSpeed, TransitionEasing, ShadowElevation, BorderRadiusScale, ImageBorderRadius, CardPadding, GridColumnsMobile, GridColumnsDesktop, ContainerMaxWidth, ImageFit, CardBackground, BodyFontSize, BodyLineHeight, DisplaySize } from "@/types/templates/primitives";
import { DEFAULT_PRESET_VALUES } from "@/lib/presets/preset-defaults";
import type { EffectTokens, CardTokens, LayoutTokens, ColorTokens, TypographyTokens } from "@/lib/presets/preset-types";

/**
 * Convert a camelCase string to kebab-case.
 * "cardBg" → "card-bg", "searchBg" → "search-bg"
 */
function toKebabCase(str: string): string {
  return str.replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`);
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

const TRANSITION_SPEED_MAP: Record<TransitionSpeed, string> = {
  instant: "0ms",
  fast: "150ms",
  normal: "250ms",
  slow: "400ms",
  "very-slow": "600ms",
};

const TRANSITION_EASING_MAP: Record<TransitionEasing, string> = {
  linear: "linear",
  ease: "ease",
  "ease-in-out": "ease-in-out",
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
};

const SHADOW_ELEVATION_MAP: Record<ShadowElevation, string> = {
  none: "0",
  xs: "0.5",
  sm: "1",
  md: "1.5",
  lg: "2",
  xl: "3",
};

const ANIMATION_HOVER_SCALE: Record<AnimationLevel, string> = {
  none: "1",
  subtle: "1.02",
  full: "1.05",
};

const ANIMATION_HOVER_LIFT: Record<AnimationLevel, string> = {
  none: "0px",
  subtle: "-2px",
  full: "-4px",
};

const ANIMATION_HOVER_GLOW_SPREAD: Record<AnimationLevel, string> = {
  none: "0px",
  subtle: "4px",
  full: "12px",
};

const ANIMATION_HOVER_GLOW_OPACITY: Record<AnimationLevel, string> = {
  none: "0",
  subtle: "0.15",
  full: "0.3",
};

const ANIMATION_ENTER_DISTANCE: Record<AnimationLevel, string> = {
  none: "0px",
  subtle: "8px",
  full: "20px",
};

const ANIMATION_ENTER_DURATION: Record<AnimationLevel, string> = {
  none: "0ms",
  subtle: "300ms",
  full: "500ms",
};

function buildEffectVars(effects: EffectTokens): Record<string, string> {
  const defaults = DEFAULT_PRESET_VALUES.effects;
  const level: AnimationLevel = effects.animationLevel ?? (defaults.animationLevel as AnimationLevel);
  const speed: TransitionSpeed = effects.transitionSpeed ?? (defaults.transitionSpeed as TransitionSpeed);
  const easing: TransitionEasing = effects.transitionEasing ?? (defaults.transitionEasing as TransitionEasing);
  const elevation: ShadowElevation = effects.shadowElevation ?? (defaults.shadowElevation as ShadowElevation);

  return {
    "--t-fx-duration": TRANSITION_SPEED_MAP[speed],
    "--t-fx-easing": TRANSITION_EASING_MAP[easing],
    "--t-fx-hover-scale": ANIMATION_HOVER_SCALE[level],
    "--t-fx-hover-lift": ANIMATION_HOVER_LIFT[level],
    "--t-fx-hover-glow-spread": ANIMATION_HOVER_GLOW_SPREAD[level],
    "--t-fx-hover-glow-opacity": ANIMATION_HOVER_GLOW_OPACITY[level],
    "--t-fx-enter-distance": ANIMATION_ENTER_DISTANCE[level],
    "--t-fx-enter-duration": ANIMATION_ENTER_DURATION[level],
    "--t-shadow-scale": SHADOW_ELEVATION_MAP[elevation],
  };
}

const BODY_FONT_SIZE_MAP: Record<BodyFontSize, string> = {
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
};

const BODY_LINE_HEIGHT_MAP: Record<BodyLineHeight, string> = {
  tight: "1.35",
  normal: "1.5",
  relaxed: "1.65",
  loose: "1.8",
};

const DISPLAY_SIZE_MAP: Record<DisplaySize, string> = {
  md: "2.5rem",
  lg: "3.5rem",
  xl: "5rem",
  "2xl": "7rem",
};

function buildTypographyExtendedVars(typography: TypographyTokens): Record<string, string> {
  const defaults = DEFAULT_PRESET_VALUES.typography;
  const bodyFontSize: BodyFontSize = typography.bodyFontSize ?? (defaults.bodyFontSize as BodyFontSize);
  const bodyLineHeight: BodyLineHeight = typography.bodyLineHeight ?? (defaults.bodyLineHeight as BodyLineHeight);
  const displaySize: DisplaySize = typography.displaySize ?? (defaults.displaySize as DisplaySize);
  const headingWeight = typography.headingWeight ?? defaults.headingWeight;
  const headingTracking = typography.headingTracking ?? defaults.headingTracking;
  const headingFontStyle = typography.headingFontStyle ?? defaults.headingFontStyle;

  return {
    "--t-type-body-size": BODY_FONT_SIZE_MAP[bodyFontSize],
    "--t-type-body-line-height": BODY_LINE_HEIGHT_MAP[bodyLineHeight],
    "--t-type-body-weight": "400",
    "--t-type-display-size": DISPLAY_SIZE_MAP[displaySize],
    "--t-type-display-weight": String(headingWeight),
    "--t-type-display-tracking": headingTracking ?? (defaults.headingTracking as string),
    "--t-type-heading-style": headingFontStyle ?? (defaults.headingFontStyle as string),
    "--t-type-paragraph-max-width": "65ch",
    "--t-type-card-align": typography.cardTextAlign ?? (defaults.cardTextAlign as string),
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

function buildCardVars(cards: CardTokens, borderRadiusScale?: BorderRadiusScale): Record<string, string> {
  const cardDefaults = DEFAULT_PRESET_VALUES.cards;
  const layoutDefaults = DEFAULT_PRESET_VALUES.layout;
  const scale: BorderRadiusScale = borderRadiusScale ?? (DEFAULT_PRESET_VALUES.chrome.borderRadiusScale as BorderRadiusScale);
  const imageBorderRadius: ImageBorderRadius = cards.imageBorderRadius ?? (cardDefaults.imageBorderRadius as ImageBorderRadius);
  const cardPadding: CardPadding = layoutDefaults.cardPadding as CardPadding;
  const baseValue = BORDER_RADIUS_SCALE_MAP[scale];

  return {
    "--t-radius-base": baseValue,
    "--t-radius-sm": "calc(var(--t-radius-base) * 0.5)",
    "--t-radius-lg": scale === "pill" ? "9999px" : "calc(var(--t-radius-base) * 2)",
    "--t-radius-image": IMAGE_BORDER_RADIUS_MAP[imageBorderRadius],
    "--t-card-padding": CARD_PADDING_MAP[cardPadding],
  };
}

const CONTAINER_MAX_WIDTH_MAP: Record<ContainerMaxWidth, string> = {
  narrow: "960px",
  medium: "1152px",
  wide: "1344px",
  full: "100%",
};

const IMAGE_FIT_VAR_MAP: Record<ImageFit, string> = {
  cover: "cover",
  contain: "contain",
};

function buildLayoutVars(layout: LayoutTokens): Record<string, string> {
  const defaults = DEFAULT_PRESET_VALUES.layout;
  const cardDefaults = DEFAULT_PRESET_VALUES.cards;
  const colsMobile: GridColumnsMobile = layout.gridColumnsMobile ?? (defaults.gridColumnsMobile as GridColumnsMobile);
  const colsDesktop: GridColumnsDesktop = layout.gridColumnsDesktop ?? (defaults.gridColumnsDesktop as GridColumnsDesktop);
  const containerMaxWidth: ContainerMaxWidth = layout.containerMaxWidth ?? (defaults.containerMaxWidth as ContainerMaxWidth);
  const imageFit: ImageFit = (cardDefaults.imageFit as ImageFit);

  return {
    "--t-grid-cols-mobile": String(colsMobile),
    "--t-grid-cols-desktop": String(colsDesktop),
    "--t-container-max": CONTAINER_MAX_WIDTH_MAP[containerMaxWidth],
    "--t-image-fit": IMAGE_FIT_VAR_MAP[imageFit],
  };
}

const CARD_BACKGROUND_MAP: Record<CardBackground, string> = {
  white: "white",
  surface: "surface",
  transparent: "transparent",
  "primary-tint": "primary-tint",
};

function buildColorVars(color: ColorTokens): Record<string, string> {
  const defaults = DEFAULT_PRESET_VALUES.color;
  const cardBackground: CardBackground = color.cardBackground ?? (defaults.cardBackground as CardBackground);

  return {
    "--t-card-bg-mode": CARD_BACKGROUND_MAP[cardBackground],
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
  if (config.font) {
    vars["--font-body"] = config.font;
    // --font-sans mirrors --font-body so fashion components that reference
    // var(--font-sans) pick up font-pair changes from the ThemeCustomizer.
    vars["--font-sans"] = config.font;
  }

  if (config.headingFont) {
    vars["--font-heading"] = config.headingFont;
    vars["--template-heading-font"] = config.headingFont;
  }

  // ── Typography tokens → --t-type-* ────────────────────────────────────────
  // Set by presets; fine-tunable per-field. Absent when no preset has been applied.
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

    // Extended body/display fields live directly on ThemeCustomization, not inside typography.
    const extendedTokens: TypographyTokens = {
      headingWeight: typography.headingWeight,
      headingTracking: typography.headingTracking,
      bodyFontSize: config.theme?.bodyFontSize,
      bodyLineHeight: config.theme?.bodyLineHeight,
      displaySize: config.theme?.displaySize,
      cardTextAlign: config.theme?.cardTextAlign,
      headingFontStyle: config.theme?.headingFontStyle,
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

  // spacingDensity — overrides the layoutDensity values above so the merchant
  // fine-tune control wins over the coarser preset-level density setting.
  // Writes to the SAME --t-space-* vars that components already consume.
  const spacingDensity = config.layout?.spacingDensity ?? 'normal';
  const spacingDensityMap: Record<string, Record<string, string>> = {
    tight:  { section: '1.5rem', card: '0.5rem',  item: '0.375rem', gap: '0.5rem'  },
    normal: { section: '2.5rem', card: '1rem',    item: '0.75rem',  gap: '1rem'    },
    airy:   { section: '4rem',   card: '1.5rem',  item: '1rem',     gap: '1.5rem'  },
  };
  const sd = spacingDensityMap[spacingDensity] ?? spacingDensityMap['normal'];
  vars['--t-space-section'] = sd.section;
  vars['--t-space-card']    = sd.card;
  vars['--t-space-item']    = sd.item;
  vars['--t-space-gap']     = sd.gap;

  // structural variants (passed as CSS vars for components to read)
  vars['--t-hero-variant'] = config.layout?.heroVariant ?? 'minimal';
  vars['--t-card-variant'] = config.layout?.cardVariant ?? 'detailed';
  vars['--t-category-variant'] = config.layout?.categoryVariant ?? 'horizontal-scroll';

  // ── Effect tokens → --t-fx-* ──────────────────────────────────────────────
  // Motion/interaction personality tokens. Read from config.effects (assembled
  // by resolveTemplateConfig from preset-applied layout fields) and falling back
  // to DEFAULT_PRESET_VALUES.effects for all undefined fields.
  const effectInput: EffectTokens = {
    ...config.effects,
  };
  Object.assign(vars, buildEffectVars(effectInput));

  // ── Card tokens → --t-radius-*, --t-card-padding ──────────────────────────
  // Read from config.layout (the merged TemplateLayoutConfig) where applyPreset
  // writes card/chrome fields, then resolve through buildCardVars.
  const cardInput: CardTokens = {
    cardBorderTreatment: config.layout?.cardBorderTreatment,
    imageFit: config.layout?.imageFit,
    imageBorderRadius: config.layout?.imageBorderRadius,
    imageHoverEffect: config.layout?.imageHoverEffect,
  };
  const chromeRadiusScale = config.layout?.borderRadiusScale;
  Object.assign(vars, buildCardVars(cardInput, chromeRadiusScale));

  // ── Layout tokens → --t-grid-cols-*, --t-container-max, --t-image-fit ─────
  const layoutInput: LayoutTokens = {
    gridColumnsMobile: config.layout?.gridColumnsMobile,
    gridColumnsDesktop: config.layout?.gridColumnsDesktop,
    containerMaxWidth: config.layout?.containerMaxWidth,
    cardImageRatio: config.layout?.cardImageRatio,
    cardPadding: config.layout?.cardPadding,
  };
  Object.assign(vars, buildLayoutVars(layoutInput));

  // ── Color tokens → --t-card-bg-mode ──────────────────────────────────────
  // Color personality fields live on config.theme (set by applyPreset → theme.*)
  const colorInput: ColorTokens = {
    colorStrategy: config.theme?.colorStrategy,
    backgroundTreatment: config.theme?.backgroundTreatment,
    cardBackground: config.theme?.cardBackground,
    imageOverlayHover: config.theme?.imageOverlayHover,
    accentDistribution: config.theme?.accentDistribution,
  };
  Object.assign(vars, buildColorVars(colorInput));

  return vars;
}
