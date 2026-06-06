import { HERO_REGISTRY } from '@/templates/_shared/hero-variants';
import type { HeroVariant } from '@/types/templates';
import type { StructuralVariants, TemplateRecipe } from '@/types/templates/structural-variants';
import { foodNightConfig } from '../config';

interface HeroRouterProps {
  heroBanner?: {
    title?: string;
    subtitle?: string;
    ctaText?: string;
    imageUrl?: string;
  };
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

export function HeroRouter({
  heroBanner,
  structuralVariants,
  recipe,
  onCtaClick,
}: HeroRouterProps) {
  const raw =
    structuralVariants?.heroVariant ??
    recipe?.defaultHeroVariant ??
    foodNightConfig.recipe.defaultHeroVariant;
  const variant: HeroVariant = VALID_VARIANTS.has(raw as HeroVariant)
    ? (raw as HeroVariant)
    : 'split';

  const HeroComponent = HERO_REGISTRY[variant];

  if (variant === 'promo-carousel' || variant === 'split-carousel') {
    return <HeroComponent mode="carousel" cards={[]} />;
  }

  return (
    <HeroComponent
      mode="static"
      titleLight={heroBanner?.title ?? foodNightConfig.content.heroBanner.title}
      titleBold=""
      description={heroBanner?.subtitle ?? foodNightConfig.content.heroBanner.subtitle}
      image={heroBanner?.imageUrl}
      ctaText={heroBanner?.ctaText ?? foodNightConfig.content.heroBanner.ctaText}
      onCtaClick={onCtaClick}
    />
  );
}
