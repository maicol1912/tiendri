import { HERO_REGISTRY } from '@/templates/_shared/hero-variants';
import type { HeroVariant } from '@/types/templates';
import type { DecorWarmPromoSlide } from '../types';
import type { StructuralVariants, TemplateRecipe } from '@/types/templates/structural-variants';
import { decorWarmConfig } from '../config';

interface HeroRouterProps {
  slides?: DecorWarmPromoSlide[];
  activeSlide?: number;
  structuralVariants?: StructuralVariants;
  recipe?: TemplateRecipe;
  onSlideChange?: (index: number) => void;
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
  slides = [],
  activeSlide = 0,
  structuralVariants,
  recipe,
  onCtaClick,
}: HeroRouterProps) {
  const raw =
    structuralVariants?.heroVariant ??
    recipe?.defaultHeroVariant ??
    decorWarmConfig.recipe.defaultHeroVariant;
  const variant: HeroVariant = VALID_VARIANTS.has(raw as HeroVariant)
    ? (raw as HeroVariant)
    : 'promo-carousel';

  const HeroComponent = HERO_REGISTRY[variant];

  if (variant === 'promo-carousel' || variant === 'split-carousel') {
    const cards = slides.map((s, i) => ({
      id: String(i),
      title: s.heading,
      image: s.imageUrl,
      tag: s.badge,
    }));
    return <HeroComponent mode="carousel" cards={cards} />;
  }

  const first = slides[0];
  return (
    <HeroComponent
      mode="static"
      titleLight={first?.heading ?? decorWarmConfig.content.heroBanner.title}
      titleBold=""
      description={decorWarmConfig.content.heroBanner.subtitle}
      image={first?.imageUrl}
      ctaText={decorWarmConfig.content.heroBanner.ctaText}
      onCtaClick={onCtaClick}
    />
  );
}
