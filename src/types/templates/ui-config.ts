import type {
  CustomizerColorField,
  CustomizerFontPair,
  CustomizerGridField,
  CustomizerLayoutOption,
  CustomizerPalette,
  CustomizerSectionLabel,
} from "@/components/customizer/ThemeCustomizer";

export type {
  CustomizerColorField,
  CustomizerFontPair,
  CustomizerGridField,
  CustomizerLayoutOption,
  CustomizerPalette,
  CustomizerSectionLabel,
};

export interface TemplateUIConfig {
  label: string;
  defaultConfig: Record<string, unknown>;
  colorFields: CustomizerColorField[];
  gridFields: CustomizerGridField[];
  layoutOptions: CustomizerLayoutOption[];
  sectionLabels: CustomizerSectionLabel[];
  palettes: CustomizerPalette[];
  defaultFontPairKey?: string;
  /**
   * Template-specific font pair subset shown in the ThemeCustomizer.
   * Keys MUST match keys in shared/fonts.ts `fontPairs` record so TemplateLayoutClient
   * can resolve the correct next/font CSS variable classes at runtime.
   * When omitted, ThemeCustomizer falls back to the full global font registry.
   */
  fontPairs?: CustomizerFontPair[];
}
