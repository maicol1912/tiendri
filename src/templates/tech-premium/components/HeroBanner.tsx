import { HeroRouter } from './HeroRouter';
import type { HeroBannerData } from '../types';
import type { HeroVariant } from '@/types/templates/primitives';

interface HeroBannerProps {
  data: HeroBannerData;
  heroVariant?: HeroVariant;
  onCtaClick?: () => void;
}

export function HeroBanner({ data, heroVariant = 'contained', onCtaClick }: HeroBannerProps) {
  return (
    <HeroRouter
      data={data}
      structuralVariants={{ heroVariant }}
      onCtaClick={onCtaClick}
    />
  );
}
