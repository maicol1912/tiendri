// Preset System — StylePreset type
// A StylePreset is a named bundle of visual tokens that collectively produce
// a coherent aesthetic for a storefront.
// Presets only write to StoreCustomization — they never modify template config.ts.

import type {
  FontPairKey,
  DensityPreset,
  CardStyle,
  CardHover,
  CardImageRatio,
  AnimationLevel,
  ShadowStyle,
  HeaderStyle,
  BannerHeight,
  ButtonStyle,
  BadgeStyle,
  PriceDisplay,
  ShadowElevation,
  TransitionSpeed,
  TransitionEasing,
  ColorStrategy,
  BackgroundTreatment,
  CardBackground,
  ImageOverlayHover,
  AccentDistribution,
  BorderRadiusScale,
  DividerStyle,
  CardBorderTreatment,
  ImageFit,
  ImageBorderRadius,
  ImageHoverEffect,
  GridColumnsMobile,
  GridColumnsDesktop,
  ContainerMaxWidth,
  CardPadding,
  HeadingDecoration,
  BodyFontSize,
  BodyLineHeight,
  DisplaySize,
  CardTextAlign,
} from "@/types/templates/primitives";
import type { HeadingScale } from "@/types/templates/typography";

export interface TypographyTokens {
  fontPair?: FontPairKey;
  headingWeight?: number;
  headingScale?: HeadingScale;
  headingTracking?: string;
  headingTransform?: "none" | "uppercase";
  headingFontStyle?: "normal" | "italic";
  headingDecoration?: HeadingDecoration;
  bodyFontSize?: BodyFontSize;
  bodyLineHeight?: BodyLineHeight;
  displaySize?: DisplaySize;
  cardTextAlign?: CardTextAlign;
}

export interface LayoutTokens {
  density?: DensityPreset;
  gridColumnsMobile?: GridColumnsMobile;
  gridColumnsDesktop?: GridColumnsDesktop;
  containerMaxWidth?: ContainerMaxWidth;
  cardImageRatio?: CardImageRatio;
  cardPadding?: CardPadding;
  headerStyle?: HeaderStyle;
  bannerHeight?: BannerHeight;
}

export interface CardTokens {
  cardStyle?: CardStyle;
  cardHover?: CardHover;
  cardBorderTreatment?: CardBorderTreatment;
  imageFit?: ImageFit;
  imageBorderRadius?: ImageBorderRadius;
  imageHoverEffect?: ImageHoverEffect;
}

export interface EffectTokens {
  animationLevel?: AnimationLevel;
  shadowStyle?: ShadowStyle;
  shadowElevation?: ShadowElevation;
  transitionSpeed?: TransitionSpeed;
  transitionEasing?: TransitionEasing;
}

export interface ColorTokens {
  colorStrategy?: ColorStrategy;
  backgroundTreatment?: BackgroundTreatment;
  cardBackground?: CardBackground;
  imageOverlayHover?: ImageOverlayHover;
  accentDistribution?: AccentDistribution;
}

export interface ChromeTokens {
  buttonStyle?: ButtonStyle;
  badgeStyle?: BadgeStyle;
  priceDisplay?: PriceDisplay;
  borderRadiusScale?: BorderRadiusScale;
  dividerStyle?: DividerStyle;
}

export interface StylePreset {
  id: string;
  name: string;
  description: string;
  targetStores: string[];
  typography: TypographyTokens;
  layout: LayoutTokens;
  cards: CardTokens;
  effects: EffectTokens;
  color: ColorTokens;
  chrome: ChromeTokens;
}
