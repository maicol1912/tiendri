// Shared Style Maps — Preset System Phase 1c
// These maps translate config values into Tailwind classes.
// Used by all templates that support the preset system.
// ALL classes must be written in full for Tailwind JIT scanner.

import type { ButtonStyle, BadgeStyle, PriceDisplay, CardStyle, HoverEffect } from "@/types/templates";

// ── Button style ──────────────────────────────────────────────────────────────
// "filled" reproduces the original button look (bg-[--t-button-bg]).
// The map only covers background / border / text-color — keep existing padding/size.
export const BUTTON_STYLE_MAP: Record<ButtonStyle, string> = {
  filled: "bg-[var(--t-button-bg)] text-[var(--t-button-text)] border-transparent",
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
    style: { fontSize: "15px", color: "var(--t-text-primary)" },
  },
  subtle: {
    className: "font-medium",
    style: { fontSize: "13px", color: "var(--t-text-secondary)" },
  },
};

// ── Card style ────────────────────────────────────────────────────────────────
// Shared card style map — same values as each template's local layout-classes.ts.
// Templates can use this instead of duplicating the map locally.
export const CARD_STYLE_MAP: Record<CardStyle, string> = {
  flat: "bg-[var(--t-card-bg)]",
  shadow: "bg-[var(--t-card-bg)] shadow-md",
  bordered: "bg-[var(--t-section-bg)] border border-[var(--t-border)]",
  elevated: "bg-[var(--t-section-bg)] shadow-lg",
};

// ── Hover effect ──────────────────────────────────────────────────────────────
// Shared hover effect map.
export const HOVER_EFFECT_MAP: Record<HoverEffect, string> = {
  none: "",
  lift: "transition-transform duration-200 hover:-translate-y-1",
  scale: "transition-transform duration-200 hover:scale-[1.02]",
  glow: "transition-shadow duration-200 hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]",
};
