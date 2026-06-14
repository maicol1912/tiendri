import type {
  CustomizerColorField,
  CustomizerGridField,
  CustomizerLayoutOption,
  CustomizerPalette,
  CustomizerSectionLabel,
} from "@/components/customizer/ThemeCustomizer";

export type {
  CustomizerColorField,
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
}
