// Template System — StoreCustomization
// What a MERCHANT has overridden from the template defaults.
// This is the JSONB blob saved to Supabase — all fields are optional
// because merchants only configure what they actually want to change.

import type {
  TemplateColorTokens,
  TemplateRadiusTokens,
  TemplateGridConfig,
  TemplateLayoutConfig,
} from "./template-config";
import type {
  Appearance,
  DensityLevel,
  BodyFontSize,
  BodyLineHeight,
  DisplaySize,
  CardTextAlign,
  HeadingDecoration,
  ColorStrategy,
  BackgroundTreatment,
  CardBackground,
  ImageOverlayHover,
  AccentDistribution,
} from "./primitives";
import type { SectionConfig } from "./sections";
import type { BrandingConfig, ContentConfig, BusinessConfig } from "./customization-sections";
import type { TypographyConfig } from "./typography";
import type { StructuralVariants } from "./structural-variants";

// Re-export the shared section types so consumers only need to import from this module
export type { BrandingConfig, ContentConfig, BusinessConfig } from "./customization-sections";

// Partial color/radius overrides — merchant changes only what they need.
export interface ThemeCustomization {
  /** Selected palette ID — e.g. "obsidian", "midnight-luxury". */
  paletteId?: string;
  colors?: Partial<TemplateColorTokens>;
  radius?: Partial<TemplateRadiusTokens>;
  /** Font pair key — e.g. "modern" | "warm" | "elegant" | "functional" */
  fontPair?: string;
  /** ID of the active style preset — e.g. "minimalista", "directo" */
  presetId?: string;
  /** Typography personality — set by presets, fine-tunable by merchant */
  typography?: TypographyConfig;
  bodyFontSize?: BodyFontSize;
  bodyLineHeight?: BodyLineHeight;
  displaySize?: DisplaySize;
  cardTextAlign?: CardTextAlign;
  headingFontStyle?: "normal" | "italic";
  headingDecoration?: HeadingDecoration;
  /** Color personality tokens — set by presets, fine-tunable by merchant */
  colorStrategy?: ColorStrategy;
  backgroundTreatment?: BackgroundTreatment;
  cardBackground?: CardBackground;
  imageOverlayHover?: ImageOverlayHover;
  accentDistribution?: AccentDistribution;
}

// Partial layout overrides — grid columns, section order/visibility, and UI style options.
export interface LayoutCustomization {
  grid?: Partial<TemplateGridConfig>;
  layout?: Partial<TemplateLayoutConfig>;
  // Full section array when provided — replaces the template default entirely
  // (order matters: array position = render position).
  sections?: SectionConfig[];
  /** Spacing density level — set by presets, controls spacing multiplier tokens */
  density?: DensityLevel;
  structuralVariants?: StructuralVariants;
}

// The complete customization blob saved to Supabase as JSONB.
// templateId ties the customization to a specific template so the resolver
// can validate compatibility and apply the right defaults.
export interface StoreCustomization {
  templateId: string;
  theme?: ThemeCustomization;
  layout?: LayoutCustomization;
  /** Merchant branding identity overrides */
  branding?: BrandingConfig;
  /** Visual content overrides — banners, product selections, navigation */
  content?: ContentConfig;
  /** Business information — address, hours, payments, shipping */
  business?: BusinessConfig;
  /** Appearance (light/dark) — type ready, UI deferred to post-MVP */
  appearance?: Appearance;
}
