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
import type { SectionConfig } from "./sections";

// Partial color/radius overrides — merchant changes only what they need.
export interface ThemeCustomization {
  colors?: Partial<TemplateColorTokens>;
  radius?: Partial<TemplateRadiusTokens>;
}

// Partial layout overrides — grid columns, section order/visibility, and UI style options.
export interface LayoutCustomization {
  grid?: Partial<TemplateGridConfig>;
  layout?: Partial<TemplateLayoutConfig>;
  // Full section array when provided — replaces the template default entirely
  // (order matters: array position = render position).
  sections?: SectionConfig[];
}

// The complete customization blob saved to Supabase as JSONB.
// templateId ties the customization to a specific template so the resolver
// can validate compatibility and apply the right defaults.
export interface StoreCustomization {
  templateId: string;
  theme?: ThemeCustomization;
  layout?: LayoutCustomization;
}
