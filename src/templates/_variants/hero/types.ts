export interface HeroSlotProps {
  subtitle: string;
  titleLight: string;
  titleBold: string;
  description: string;
  ctaText: string;
  image: string;
  bgColor: string;
  onCtaClick?: () => void;
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
