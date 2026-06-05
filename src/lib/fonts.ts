// Font pair definitions for the Tiendri storefront.
// All next/font/google calls MUST be at module level — the Next.js font loader
// is a compile-time transform and cannot be called inside functions or hooks.
//
// Each pair defines a `body` font for body text and a `heading` font for titles.
// The `variable` option generates a CSS custom property class that can be applied
// to any element — fonts load only when their CSS variable is referenced in the DOM.
//
// Usage:
//   const pair = getFontPair(resolvedConfig.fontPair ?? "modern");
//   <div className={`${pair.body.variable} ${pair.heading.variable}`}>...</div>

import {
  Inter,
  Space_Grotesk,
  Poppins,
  Playfair_Display,
  DM_Sans,
  Cormorant_Garamond,
  IBM_Plex_Sans,
  IBM_Plex_Mono,
  Space_Mono,
  Bebas_Neue,
  Lato,
  Caveat,
  Nunito,
} from "next/font/google";
// NextFont type from next/dist/compiled/@next/font does not include `variable`
// because it's only present when the font is initialized with the `variable` option.
// We use our own interface that accurately reflects the runtime shape.
interface NextFontWithVariable {
  className: string;
  variable: string;
  style: { fontFamily: string; fontWeight?: number; fontStyle?: string };
}

// ── modern: Inter + Space Grotesk ─────────────────────────────────────────────
// Current default — Inter is already loaded in root layout, Space Grotesk adds
// a geometric personality to headings.

const modernBody = Inter({
  subsets: ["latin"],
  variable: "--font-body-modern",
  display: "swap",
});

const modernHeading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading-modern",
  display: "swap",
});

// ── warm: Poppins + Playfair Display ─────────────────────────────────────────
// Friendly rounded body + classical editorial heading — great for lifestyle,
// fashion, and general merchandise stores.

const warmBody = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-warm",
  display: "swap",
});

const warmHeading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading-warm",
  display: "swap",
});

// ── elegant: DM Sans + Cormorant Garamond ────────────────────────────────────
// Clean minimal body + high-contrast serif heading — luxury and premium brands.

const elegantBody = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body-elegant",
  display: "swap",
});

const elegantHeading = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading-elegant",
  display: "swap",
});

// ── functional: IBM Plex Sans + IBM Plex Mono ────────────────────────────────
// Technical, monospaced heading — ideal for tech, electronics, and dev-tool stores.

const functionalBody = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-functional",
  display: "swap",
});

const functionalHeading = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading-functional",
  display: "swap",
});

// ── mono-geometric: Space Mono + Inter ───────────────────────────────────────
// Techy monospaced heading + neutral body — ideal for electronics, gadgets,
// developer tools, and stores with a digital/code aesthetic.

const monoGeometricBody = Inter({
  subsets: ["latin"],
  variable: "--font-body-mono-geometric",
  display: "swap",
});

const monoGeometricHeading = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-heading-mono-geometric",
  display: "swap",
});

// ── display-impact: Bebas Neue + Inter ────────────────────────────────────────
// Bold condensed display heading + neutral body — high-energy stores: sports,
// streetwear, food, entertainment.

const displayImpactBody = Inter({
  subsets: ["latin"],
  variable: "--font-body-display-impact",
  display: "swap",
});

const displayImpactHeading = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-heading-display-impact",
  display: "swap",
});

// ── whisper-light: Cormorant Garamond + Lato ─────────────────────────────────
// High-contrast editorial serif heading + humanist body — luxury, jewelry,
// wedding, and high-end lifestyle brands.

const whisperLightBody = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-body-whisper-light",
  display: "swap",
});

const whisperLightHeading = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-heading-whisper-light",
  display: "swap",
});

// ── handcraft-mix: Caveat + Nunito ───────────────────────────────────────────
// Handwritten heading + friendly rounded body — artisan goods, bakeries,
// craft stores, and personal brands.

const handcraftMixBody = Nunito({
  subsets: ["latin"],
  variable: "--font-body-handcraft-mix",
  display: "swap",
});

const handcraftMixHeading = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-heading-handcraft-mix",
  display: "swap",
});

// ── Font pair map ─────────────────────────────────────────────────────────────

export interface FontPair {
  body: NextFontWithVariable;
  heading: NextFontWithVariable;
}

export const fontPairs: Record<string, FontPair> = {
  modern: { body: modernBody, heading: modernHeading },
  warm: { body: warmBody, heading: warmHeading },
  elegant: { body: elegantBody, heading: elegantHeading },
  functional: { body: functionalBody, heading: functionalHeading },
  "mono-geometric": { body: monoGeometricBody, heading: monoGeometricHeading },
  "display-impact": { body: displayImpactBody, heading: displayImpactHeading },
  "whisper-light": { body: whisperLightBody, heading: whisperLightHeading },
  "handcraft-mix": { body: handcraftMixBody, heading: handcraftMixHeading },
};

/**
 * Returns the font pair for the given key, falling back to `"modern"` if the
 * key is not found. Safe to call with any merchant-supplied string.
 */
export function getFontPair(pairName: string): FontPair {
  return fontPairs[pairName] ?? fontPairs["modern"]!;
}
