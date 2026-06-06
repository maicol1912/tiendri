import dynamic from 'next/dynamic';
import type { HeroVariant } from '@/types/templates';
import type { HeroProps } from './types';

const Contained = dynamic(() => import('./Contained')) as React.ComponentType<HeroProps>;
const FullBleed = dynamic(() => import('./FullBleed')) as React.ComponentType<HeroProps>;
const Split = dynamic(() => import('./Split')) as React.ComponentType<HeroProps>;
const TextOnly = dynamic(() => import('./TextOnly')) as React.ComponentType<HeroProps>;
const PromoCarousel = dynamic(() => import('./PromoCarousel')) as React.ComponentType<HeroProps>;

export const HERO_REGISTRY: Record<HeroVariant, React.ComponentType<HeroProps>> = {
  contained: Contained,
  'full-bleed': FullBleed,
  split: Split,
  'text-only': TextOnly,
  'promo-carousel': PromoCarousel,
};

export type { HeroProps, HeroStaticProps, HeroCarouselProps } from './types';
