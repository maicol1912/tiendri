// Template System — Typography Types
// Typography personality config controlled by presets, fine-tunable by merchant.
// All values produce CSS custom properties via buildCssVars.

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
  /** Letter-spacing for headings: e.g. "-0.03em" | "-0.02em" | "-0.01em" | "0em" */
  headingTracking: string;
  /** Text transform for headings */
  headingTransform: "none" | "uppercase" | "capitalize";
}
