import type {
  StylePreset,
  TypographyTokens,
  LayoutTokens,
  CardTokens,
  EffectTokens,
  ColorTokens,
  ChromeTokens,
} from "./preset-types";

export const DEFAULT_PRESET_VALUES: Required<
  Omit<StylePreset, "id" | "name" | "description" | "targetStores" | "genes">
> = {
  typography: {
    fontPair: "modern",
    headingWeight: 600,
    headingScale: "lg",
    headingTracking: "-0.01em",
    headingTransform: "none",
    headingFontStyle: "normal",
    headingDecoration: "none",
    bodyFontSize: "base",
    bodyLineHeight: "normal",
    displaySize: "lg",
    cardTextAlign: "left",
  } satisfies Required<TypographyTokens>,
  layout: {
    density: "balanced",
    gridColumnsMobile: 2,
    gridColumnsDesktop: 3,
    containerMaxWidth: "medium",
    cardImageRatio: "square",
    cardPadding: "normal",
    headerStyle: "standard",
    bannerHeight: "normal",
  } satisfies Required<LayoutTokens>,
  cards: {
    cardStyle: "elevated",
    cardHover: "lift",
    cardBorderTreatment: "none",
    imageFit: "cover",
    imageBorderRadius: "same-as-card",
    imageHoverEffect: "zoom",
  } satisfies Required<CardTokens>,
  effects: {
    animationLevel: "subtle",
    shadowStyle: "neutral",
    shadowElevation: "sm",
    transitionSpeed: "normal",
    transitionEasing: "ease",
  } satisfies Required<EffectTokens>,
  color: {
    colorStrategy: "accent-pop",
    backgroundTreatment: "solid",
    cardBackground: "white",
    imageOverlayHover: "none",
    accentDistribution: "badges-and-buttons",
  } satisfies Required<ColorTokens>,
  chrome: {
    buttonStyle: "filled",
    badgeStyle: "pill",
    priceDisplay: "standard",
    borderRadiusScale: "md",
    dividerStyle: "none",
  } satisfies Required<ChromeTokens>,
};
