import { HERO_REGISTRY } from '@/templates/_shared/hero-variants';
import type { HeroVariant } from '@/types/templates';
import type { StructuralVariants, TemplateRecipe } from '@/types/templates/structural-variants';
import { beautyElegantConfig } from '../config';

interface HeroRouterProps {
  heroBanner?: {
    title?: string;
    subtitle?: string;
    ctaText?: string;
    imageUrl?: string;
  };
  storeName?: string;
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
  storeName,
  structuralVariants,
  recipe,
  onCtaClick,
}: HeroRouterProps) {
  const raw =
    structuralVariants?.heroVariant ??
    recipe?.defaultHeroVariant ??
    beautyElegantConfig.recipe.defaultHeroVariant;
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
      titleLight={heroBanner?.title ?? beautyElegantConfig.content.heroBanner.title}
      titleBold=""
      description={heroBanner?.subtitle ?? beautyElegantConfig.content.heroBanner.subtitle}
      image={heroBanner?.imageUrl}
      ctaText={heroBanner?.ctaText ?? beautyElegantConfig.content.heroBanner.ctaText}
      onCtaClick={onCtaClick}
    />
  );
}
