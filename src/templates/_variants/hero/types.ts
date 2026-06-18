export interface HeroSlotProps {
  subtitle: string;
  titleLight: string;
  titleBold: string;
  description: string;
  ctaText: string;
  image: string;
  bgColor: string;
  onCtaClick?: () => void;
  /** When true, the hero does not render its CTA button (CoreHomePage renders it externally). */
  hideCta?: boolean;
  /** When true, uses a compact height — clamp(160px, 22vw, 240px) instead of the default clamp(320px, 45vw, 520px). */
  compact?: boolean;
  /** CTA text for the second banner slide (used by CAROUSEL variant). */
  secondCtaText?: string;
}

export type HeroVariant =
  | "FULL_BLEED"
  | "CONTAINED"
  | "SPLIT"
  | "TEXT_ONLY"
  | "CAROUSEL"
  | "CARD_SPLIT"
  | "EDITORIAL"
  | "PROMO_STRIP"
  | "PROMO_CARD";
