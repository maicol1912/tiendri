// Template System — TemplateConfig
// What a template OFFERS: its metadata, defaults, and supported options.
// Every template must export an object that satisfies this interface.

import type {
  ImageRatio,
  GridBreakpoint,
  ShadowElevation,
  TransitionSpeed,
  TransitionEasing,
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
} from "./primitives";
import type { SectionConfig } from "./sections";
import type { BrandingConfig, ContentConfig, BusinessConfig } from "./customization-sections";
import type { StructuralVariants } from "./structural-variants";

// Color design tokens a template defines.
// Core tokens are required; templates can add extras via the index signature.
export interface TemplateColorTokens {
  primary: string;
  secondary: string;
  background: string;
  foreground: string;     // Main text color (was textPrimary)
  card: string;           // Card/surface background (was cardBg)
  border: string;
  muted: string;          // Secondary/muted text (was textMuted)
  accent: string;         // Special accent color like rating stars (was ratingStar)
  onPrimary: string;      // Contrast text for primary backgrounds (was buttonText)
  [key: string]: string;  // Keep index signature for template-specific extras
}

// Border-radius tokens a template defines.
export interface TemplateRadiusTokens {
  card: string;
  category: string;
  button: string;
  [key: string]: string; // template-specific extras
}

// Grid column counts per viewport per content type.
export interface TemplateGridConfig {
  products: GridBreakpoint;
  categories: GridBreakpoint;
  listing: GridBreakpoint;
  search: GridBreakpoint;
  [key: string]: GridBreakpoint; // template-specific extra grids
}

// Visual style options for key UI regions.
export interface TemplateLayoutConfig {
  // Active — used for aspect ratios across card components
  cardImageRatio: ImageRatio;

  // Variant fields — drive visual differentiation between templates
  heroVariant: 'full-width' | 'split' | 'contained' | 'carousel' | 'minimal';
  cardVariant: 'minimal' | 'detailed' | 'overlay' | 'horizontal';
  categoryVariant: 'grid-icons' | 'horizontal-scroll' | 'cards-with-image' | 'text-list';
  gridDensity: 'compact' | 'standard' | 'spacious';
  spacingDensity: 'tight' | 'normal' | 'airy';

  // Effect tokens forwarded from presets
  shadowElevation?: ShadowElevation;
  transitionSpeed?: TransitionSpeed;
  transitionEasing?: TransitionEasing;
  // Chrome tokens
  borderRadiusScale?: BorderRadiusScale;
  dividerStyle?: DividerStyle;
  // Card tokens
  cardBorderTreatment?: CardBorderTreatment;
  imageFit?: ImageFit;
  imageBorderRadius?: ImageBorderRadius;
  imageHoverEffect?: ImageHoverEffect;
  // Layout tokens
  gridColumnsMobile?: GridColumnsMobile;
  gridColumnsDesktop?: GridColumnsDesktop;
  containerMaxWidth?: ContainerMaxWidth;
  cardPadding?: CardPadding;
}

// Full template config — what each template exposes as its default contract.
// Template-specific data (navLinks, footerServices, productTabs, etc.) lives in
// the index signature so templates can freely extend without breaking the shared type.
export interface TemplateConfig {
  id: string;
  name: string;
  description: string;

  // Typography
  font: string;
  headingFont: string;

  // Theme
  colors: TemplateColorTokens;
  radius: TemplateRadiusTokens;

  // Grid
  grid: TemplateGridConfig;

  // Layout
  layout: TemplateLayoutConfig;

  // Sections — array order determines render order; visible toggles show/hide
  sections: readonly SectionConfig[];

  // Default branding, content, and business values the template ships with.
  // resolveTemplateConfig shallow-merges merchant overrides on top of these.
  branding?: BrandingConfig;
  content?: ContentConfig;
  business?: BusinessConfig;

  /** Default structural variant overrides — templates can ship with structural defaults. */
  structuralVariants?: StructuralVariants;

  // Template-specific data (nav links, footer content, tabs, searches, etc.)
  [key: string]: unknown;
}
