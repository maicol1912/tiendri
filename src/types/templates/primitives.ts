// Template System — Primitive Types
// Union types used across all layers of the template type system.

// Card visual styles
export type CardStyle = "flat" | "shadow" | "bordered" | "elevated" | "transparent";
export type HoverEffect = "none" | "lift" | "scale" | "glow";
export type ImageRatio = "square" | "portrait" | "wide" | "tall";

// Aliases used by the preset system
export type CardHover = HoverEffect;
export type CardImageRatio = ImageRatio;
export type DensityPreset = DensityLevel;
export type ShadowStyle = "neutral" | "hue-tinted";

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

// Button visual style — filled, outlined (border only), or ghost (text only)
export type ButtonStyle = "filled" | "outlined" | "ghost";

// Badge shape style — pill (fully rounded) or square (slight radius)
export type BadgeStyle = "pill" | "square";

// Price display prominence — how visually dominant the price is
export type PriceDisplay = "prominent" | "standard" | "subtle";

// Layout density level — controls spacing multipliers throughout the template
export type DensityLevel = "compact" | "balanced" | "spacious";

// Font pair key — identifies a typographic personality bundle (15 pairs)
export type FontPairKey =
  | "elegante"
  | "editorial"
  | "atemporal"
  | "minimalista"
  | "preciso"
  | "contemporaneo"
  | "audaz"
  | "urbano"
  | "dramatico"
  | "llamativo"
  | "amigable"
  | "artesanal"
  | "jugueton"
  | "clasico"
  | "profesional";

// Font group — thematic family that groups related font pairs
export type FontGroupKey = "sofisticados" | "modernos" | "expresivos" | "calidos" | "clasicos";

// Heading letter-spacing bucket — resolves to a tracking value in buildCssVars
export type HeadingSpacing = "tight" | "normal" | "wide";

// Font size contrast — ratio between heading and body font sizes
export type FontSizeContrast = "low" | "medium" | "high" | "extreme";

// Body font weight — controls paragraph text weight
export type BodyFontWeight = 300 | 400 | 500;

// Grid breakpoint — number of columns per viewport
export interface GridBreakpoint {
  mobile: number; // 1–6
  desktop: number; // 1–6
}

// Template identification — e.g. "tech-premium", "flavor"
export type TemplateId = string;

// Preset system — Phase 0 new union types

export type CardContentLayout = "below-image" | "overlay-bottom" | "overlay-full" | "side-by-side";
export type HeroVariant = "full-bleed" | "contained" | "split" | "text-only";
export type CategoryNavPattern = "horizontal-scroll" | "grid" | "tabs" | "chips";
export type AddToCartStyle = "full-width" | "icon-button" | "floating-fab" | "on-hover-only";
export type CategoryDisplayType = "text-only" | "icon-text" | "image-text";
export type TransitionSpeed = "instant" | "fast" | "normal" | "slow" | "very-slow";
export type TransitionEasing = "linear" | "ease" | "ease-in-out" | "spring";
export type ShadowElevation = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type BodyFontSize = "sm" | "base" | "lg";
export type ColorStrategy = "monotone" | "duotone" | "accent-pop" | "gradient";
export type BackgroundTreatment = "solid" | "subtle-gradient" | "pattern";
export type CardBackground = "white" | "surface" | "transparent" | "primary-tint";
export type ImageOverlayHover = "none" | "dark-scrim" | "color-tint" | "blur";
export type AccentDistribution = "buttons-only" | "badges-and-buttons" | "everywhere" | "minimal";
export type BorderRadiusScale = "sharp" | "xs" | "sm" | "md" | "lg" | "xl" | "pill";
export type CardBorderTreatment = "none" | "subtle" | "prominent" | "left-accent" | "top-accent";
export type ImageBorderRadius = "same-as-card" | "none" | "rounded" | "circle";
export type DividerStyle = "none" | "line" | "dots" | "dash";
export type ImageHoverEffect = "none" | "zoom" | "slide-up" | "grayscale-to-color" | "brightness";
export type SectionSeparator = "none" | "line" | "gradient" | "thick-block";
export type GridColumnsMobile = 1 | 2;
export type GridColumnsDesktop = 2 | 3 | 4 | 5;
export type ContainerMaxWidth = "narrow" | "medium" | "wide" | "full";
export type ImageFit = "cover" | "contain";
export type CardPadding = "none" | "tight" | "normal" | "spacious";
