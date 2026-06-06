import { HERO_REGISTRY } from '@/templates/_shared/hero-variants';
import type { HeroVariant } from '@/types/templates';
import type { HeroBannerData } from '../types';
import type { StructuralVariants } from '@/types/templates/structural-variants';
import type { TemplateRecipe } from '@/types/templates/structural-variants';

interface HeroRouterProps {
  data: HeroBannerData;
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
]);

export function HeroRouter({ data, structuralVariants, recipe, onCtaClick }: HeroRouterProps) {
  const raw = structuralVariants?.heroVariant ?? recipe?.defaultHeroVariant ?? 'contained';
  const variant: HeroVariant = VALID_VARIANTS.has(raw as HeroVariant) ? (raw as HeroVariant) : 'contained';

  const HeroComponent = HERO_REGISTRY[variant];

  if (variant === 'promo-carousel') {
    return (
      <HeroComponent
        mode="carousel"
        cards={[]}
      />
    );
  }

  return (
    <HeroComponent
      mode="static"
      subtitle={data.subtitle}
      titleLight={data.titleLight}
      titleBold={data.titleBold}
      description={data.description}
      ctaText={data.ctaText}
      image={data.image}
      bgColor={data.bgColor}
      onCtaClick={onCtaClick}
    />
  );
}
