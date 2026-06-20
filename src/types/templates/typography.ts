// Template System — Typography Types
// Typography personality config controlled by presets, fine-tunable by merchant.
// All values produce CSS custom properties via buildCssVars.

import type { BodyFontSize, BodyFontWeight, FontSizeContrast, HeadingSpacing } from "./primitives";

// Heading size scale bucket — resolves to a rem font-size in buildCssVars.
// md=1.5rem, lg=2rem, xl=2.5rem, 2xl=3.5rem
export type HeadingScale = "md" | "lg" | "xl" | "2xl";

// Typography personality config — heading-level typographic personality.
// Set by presets; merchants can fine-tune individual fields after applying a preset.
export interface TypographyConfig {
  /** Heading font weight: 400 | 500 | 600 | 700 | 800 */
  headingWeight: number;
  /** Scale multiplier bucket for heading font-size relative to base */
  headingScale: HeadingScale;
  /** Letter-spacing bucket for headings */
  headingSpacing: HeadingSpacing;
  /** Text transform for headings */
  headingTransform: "none" | "uppercase" | "capitalize";
  // Body-level fields — written here by ThemeCustomizer's updateTypography handler
  bodyFontSize?: BodyFontSize;
  bodyFontWeight?: BodyFontWeight;
  fontSizeContrast?: FontSizeContrast;
}

// Extended typography display config — body and display-level fields.
// Fields are optional so existing TypographyConfig usage is unaffected.
export interface DisplayTypographyConfig {
  bodyFontSize?: BodyFontSize;
  bodyFontWeight?: BodyFontWeight;
  fontSizeContrast?: FontSizeContrast;
}
