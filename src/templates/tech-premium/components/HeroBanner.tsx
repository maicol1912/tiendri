import type { HeroBannerData } from '../types';
import type { HeroVariant } from '@/types/templates/primitives';
import { HERO_REGISTRY } from '@/templates/_shared/hero-variants';

interface HeroBannerProps {
  data: HeroBannerData;
  heroVariant?: HeroVariant;
  onCtaClick?: () => void;
}

export function HeroBanner({ data, heroVariant = 'contained', onCtaClick }: HeroBannerProps) {
  const { subtitle, titleLight, titleBold, description, ctaText, image, bgColor } = data;
  const HeroLayout = HERO_REGISTRY[heroVariant];

  return (
    <HeroLayout
      subtitle={subtitle}
      titleLight={titleLight}
      titleBold={titleBold}
      description={description}
      ctaText={ctaText}
      image={image}
      bgColor={bgColor}
      onCtaClick={onCtaClick}
    />
  );
}
