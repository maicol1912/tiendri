// Template System — Primitive Types
// Union types used across all layers of the template type system.

// Card visual styles
export type CardStyle = "flat" | "shadow" | "bordered" | "elevated";
export type HoverEffect = "none" | "lift" | "scale" | "glow";
export type ImageRatio = "square" | "portrait" | "wide";

// Navigation & tabs
export type NavStyle = "grid" | "pills" | "scroll";
export type TabStyle = "underline" | "pills" | "bordered";

// Layout variants
export type BannerHeight = "short" | "normal" | "tall";
export type HeaderStyle = "standard" | "centered" | "minimal";
export type FooterStyle = "columns" | "minimal" | "centered";
export type BorderRadius = "sharp" | "rounded" | "pill";
export type Appearance = "light" | "dark";
export type AnimationLevel = "none" | "subtle" | "full";

// Grid breakpoint — number of columns per viewport
export interface GridBreakpoint {
  mobile: number; // 1–6
  desktop: number; // 1–6
}

// Template identification — e.g. "tech-premium", "flavor"
export type TemplateId = string;
