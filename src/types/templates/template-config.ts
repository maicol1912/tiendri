// Template System — TemplateConfig
// What a template OFFERS: its metadata, defaults, and supported options.
// Every template must export an object that satisfies this interface.

import type {
  CardStyle,
  HoverEffect,
  ImageRatio,
  NavStyle,
  TabStyle,
  BannerHeight,
  HeaderStyle,
  FooterStyle,
  GridBreakpoint,
  AnimationLevel,
} from "./primitives";
import type { SectionConfig } from "./sections";
import type { BrandingConfig, ContentConfig, BusinessConfig } from "./customization-sections";

// Color design tokens a template defines.
// Core tokens are required; templates can add extras via the index signature.
export interface TemplateColorTokens {
  primary: string;
  secondary: string;
  background: string;
  cardBg: string;
  border: string;
  surface: string;
  textMuted: string;
  buttonBg: string;
  buttonText: string;
  footerBg: string;
  [key: string]: string; // template-specific extra tokens (e.g. badgeBg, ratingStar)
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
  cardStyle: CardStyle;
  cardHoverEffect: HoverEffect;
  cardImageRatio: ImageRatio;
  navStyle: NavStyle;
  tabStyle: TabStyle;
  bannerHeight: BannerHeight;
  headerStyle: HeaderStyle;
  footerStyle: FooterStyle;
  shadowStyle?: "neutral" | "hue-tinted";
  animationLevel?: AnimationLevel;
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

  // Template-specific data (nav links, footer content, tabs, searches, etc.)
  [key: string]: unknown;
}
