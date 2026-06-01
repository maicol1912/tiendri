// Build CSS custom properties from a resolved store config.
// Automates the manual mapping in TemplateLayoutClient.tsx — same output,
// data-driven instead of hardcoded per-key entries.
//
// Output:
//   colors:  camelCase key → --t-{kebab-case-key}   e.g. cardBg → --t-card-bg
//   radius:  key → --t-radius-{key}                  e.g. card → --t-radius-card
//   fonts:   --font-body, --font-heading, --template-heading-font
//
// Grid and layout values are NOT CSS vars — they're consumed as props by
// components (e.g. grid-cols-{n} classes built from config.grid.products.mobile).

import type { ResolvedStoreConfig } from "@/types/templates";

/**
 * Convert a camelCase string to kebab-case.
 * "cardBg" → "card-bg", "searchBg" → "search-bg"
 */
function toKebabCase(str: string): string {
  return str.replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`);
}

/**
 * Build a flat Record of CSS custom property key → value pairs from a
 * resolved store config. The returned object is safe to spread into a
 * React `style` prop (cast to React.CSSProperties on the call site).
 *
 * No value will be undefined — keys with undefined color/radius tokens are
 * excluded from the output entirely to keep the CSS vars map clean.
 */
export function buildCssVars(config: ResolvedStoreConfig): Record<string, string> {
  const vars: Record<string, string> = {};

  // ── Colors → --t-{kebab-case-key} ─────────────────────────────────────────
  for (const [key, value] of Object.entries(config.colors)) {
    if (typeof value === "string" && value.length > 0) {
      vars[`--t-${toKebabCase(key)}`] = value;
    }
  }

  // ── Radius → --t-radius-{key} ─────────────────────────────────────────────
  for (const [key, value] of Object.entries(config.radius)) {
    if (typeof value === "string" && value.length > 0) {
      vars[`--t-radius-${toKebabCase(key)}`] = value;
    }
  }

  // ── Fonts ─────────────────────────────────────────────────────────────────
  // --font-body / --font-heading are consumed by next/font CSS variable classes.
  // --font-sans is the alias used by the fashion template components (style={{ fontFamily: "var(--font-sans)" }}).
  // --template-heading-font is the raw font-family string used by components
  // that set font-family directly (e.g. headings with a display font).
  if (config.font) {
    vars["--font-body"] = config.font;
    // --font-sans mirrors --font-body so fashion components that reference
    // var(--font-sans) pick up font-pair changes from the ThemeCustomizer.
    vars["--font-sans"] = config.font;
  }

  if (config.headingFont) {
    vars["--font-heading"] = config.headingFont;
    vars["--template-heading-font"] = config.headingFont;
  }

  return vars;
}
