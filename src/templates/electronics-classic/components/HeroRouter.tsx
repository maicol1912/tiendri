import { HERO_REGISTRY } from '@/templates/_shared/hero-variants';
import type { HeroVariant } from '@/types/templates';
import type { HeroBanner } from '../types';
import type { StructuralVariants, TemplateRecipe } from '@/types/templates/structural-variants';

interface HeroRouterProps {
  banner: HeroBanner;
  structuralVariants?: StructuralVariants;
  recipe?: TemplateRecipe;
  onCtaClick?: () => void;
}

const VALID_VARIANTS = new Set<HeroVariant>([
  'contained',
  'full-bleed',
  'split',
  'text-only',
  'promo-carousel',
  'gradient-promo',
  'split-carousel',
]);

export function HeroRouter({ banner, structuralVariants, recipe, onCtaClick }: HeroRouterProps) {
  const raw = structuralVariants?.heroVariant ?? recipe?.defaultHeroVariant ?? 'contained';
  const variant: HeroVariant = VALID_VARIANTS.has(raw as HeroVariant) ? (raw as HeroVariant) : 'contained';

  const HeroComponent = HERO_REGISTRY[variant];

  if (variant === 'promo-carousel' || variant === 'split-carousel') {
    return <HeroComponent mode="carousel" cards={[]} />;
  }

  return (
    <HeroComponent
      mode="static"
      titleLight={banner.headline}
      titleBold=""
      description={banner.subtext}
      image={banner.image}
      ctaText={banner.ctaLabel}
      onCtaClick={onCtaClick}
    />
  );
}
