// Preset System — StylePreset type
// A StylePreset is a named bundle of layout and typographic values that
// collectively produce a coherent visual character for a storefront.
// Presets only write to StoreCustomization — they never modify template config.ts.

import type { TypographyConfig } from "@/types/templates/typography";
import type { DensityLevel } from "@/types/templates/primitives";
import type { TemplateLayoutConfig } from "@/types/templates/template-config";

export interface StylePreset {
  id: string;
  name: string;
  description: string;
  /** Store types this preset is designed for */
  targetStores: string[];
  theme: {
    /** Universal font pair key: "elegant" | "warm" | "functional" | "modern" */
    fontPair: string;
    typography: TypographyConfig;
  };
  layout: {
    density: DensityLevel;
    /** Partial layout overrides — only preset-managed fields */
    layout: Pick<
      TemplateLayoutConfig,
      | "cardStyle"
      | "cardHoverEffect"
      | "cardImageRatio"
      | "animationLevel"
      | "shadowStyle"
      | "headerStyle"
      | "bannerHeight"
      | "buttonStyle"
      | "badgeStyle"
      | "priceDisplay"
    >;
  };
}
