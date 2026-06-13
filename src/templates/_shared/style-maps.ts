// Shared Style Maps — Preset System Phase 1c + Phase 3
// These maps translate config values into Tailwind classes.
// Used by all templates that support the preset system.
// ALL classes must be written in full for Tailwind JIT scanner.

import type { ButtonStyle, BadgeStyle, PriceDisplay, CardStyle, HoverEffect, BackgroundTreatment, ColorStrategy, CardBorderTreatment, SectionSeparator, ImageFit, ImageHoverEffect } from "@/types/templates";

// ── Button style ──────────────────────────────────────────────────────────────
// "filled" reproduces the original button look (bg-[--t-button-bg]).
// The map only covers background / border / text-color — keep existing padding/size.
export const BUTTON_STYLE_MAP: Record<ButtonStyle, string> = {
  filled: "bg-[var(--t-primary)] text-[var(--t-on-primary)] border-transparent",
  outlined: "border-2 border-[var(--t-primary)] text-[var(--t-primary)] bg-transparent hover:bg-[var(--t-primary)]/5",
  ghost: "text-[var(--t-primary)] bg-transparent border-transparent hover:bg-[var(--t-primary)]/10",
};

// ── Badge style ───────────────────────────────────────────────────────────────
// Controls the border-radius of discount badges.
// "pill" is the default — fully rounded like a chip.
// "square" uses a small radius like a label.
export const BADGE_STYLE_MAP: Record<BadgeStyle, string> = {
  pill: "rounded-full",
  square: "rounded-sm",
};

// ── Price display ─────────────────────────────────────────────────────────────
// Controls visual weight and color of price labels.
// Each entry carries a className + optional inline style for properties
// not expressible cleanly as Tailwind utilities.
export const PRICE_DISPLAY_MAP: Record<PriceDisplay, { className: string; style?: Record<string, string> }> = {
  prominent: {
    className: "font-bold",
    style: { fontSize: "18px", color: "var(--t-primary)" },
  },
  standard: {
    className: "font-semibold",
    style: { fontSize: "15px", color: "var(--t-foreground)" },
  },
  subtle: {
    className: "font-medium",
    style: { fontSize: "13px", color: "var(--t-muted)" },
  },
};

// ── Card style ────────────────────────────────────────────────────────────────
// Shared card style map — same values as each template's local layout-classes.ts.
// Templates can use this instead of duplicating the map locally.
export const CARD_STYLE_MAP: Record<CardStyle, string> = {
  flat: "bg-[var(--t-card)]",
  shadow: "bg-[var(--t-card)] shadow-md",
  bordered: "bg-[var(--t-background)] border border-[var(--t-border)]",
  elevated: "bg-[var(--t-background)] shadow-lg",
};

// ── Hover effect ──────────────────────────────────────────────────────────────
// Shared hover effect map. Duration and magnitude come from --t-fx-* CSS vars
// so presets control motion personality without touching className strings.
export const HOVER_EFFECT_MAP: Record<HoverEffect, string> = {
  none: "",
  lift: "transition-transform hover:-translate-y-[var(--t-fx-hover-lift)] [transition-duration:var(--t-fx-duration)] [transition-timing-function:var(--t-fx-easing)]",
  scale: "transition-transform hover:scale-[var(--t-fx-hover-scale)] [transition-duration:var(--t-fx-duration)] [transition-timing-function:var(--t-fx-easing)]",
  glow: "transition-shadow hover:shadow-[0_0_var(--t-fx-hover-glow-spread)_rgba(var(--t-primary-rgb),var(--t-fx-hover-glow-opacity))] [transition-duration:var(--t-fx-duration)] [transition-timing-function:var(--t-fx-easing)]",
};

// ── Background treatment ──────────────────────────────────────────────────────
export const BACKGROUND_TREATMENT_MAP: Record<BackgroundTreatment, string> = {
  solid: "",
  "subtle-gradient": "bg-gradient-to-b from-transparent to-black/[0.02]",
  pattern: "bg-[url('/patterns/subtle-dots.svg')] bg-repeat",
};

// ── Color strategy ────────────────────────────────────────────────────────────
// Values are sparse — color strategy controls which tokens get applied at a higher
// level. This map provides base classes only.
export const COLOR_STRATEGY_MAP: Record<ColorStrategy, string> = {
  monotone: "",
  duotone: "",
  "accent-pop": "",
  gradient: "bg-gradient-to-br",
};

// ── Card border treatment ─────────────────────────────────────────────────────
export const CARD_BORDER_MAP: Record<CardBorderTreatment, string> = {
  none: "",
  subtle: "border border-black/5",
  prominent: "border-2 border-black/10",
  "left-accent": "border-l-4 border-l-[var(--t-primary)]",
  "top-accent": "border-t-4 border-t-[var(--t-primary)]",
};

// ── Section separator ─────────────────────────────────────────────────────────
export const SECTION_SEPARATOR_MAP: Record<SectionSeparator, string> = {
  none: "",
  line: "border-t border-black/10",
  gradient: "border-t border-gradient",
  "thick-block": "border-t-4 border-black/5",
};

// ── Image fit ─────────────────────────────────────────────────────────────────
export const IMAGE_FIT_MAP: Record<ImageFit, string> = {
  cover: "object-cover",
  contain: "object-contain",
};

// ── Image hover behavior ──────────────────────────────────────────────────────
export const IMAGE_HOVER_BEHAVIOR_MAP: Record<ImageHoverEffect, string> = {
  none: "",
  zoom: "transition-transform duration-[var(--t-fx-duration)] ease-[var(--t-fx-easing)] group-hover:scale-110",
  "slide-up": "transition-transform duration-[var(--t-fx-duration)] ease-[var(--t-fx-easing)] group-hover:-translate-y-2",
  "grayscale-to-color": "grayscale transition-[filter] duration-[var(--t-fx-duration)] ease-[var(--t-fx-easing)] group-hover:grayscale-0",
  brightness: "transition-[filter] duration-[var(--t-fx-duration)] ease-[var(--t-fx-easing)] group-hover:brightness-110",
};
