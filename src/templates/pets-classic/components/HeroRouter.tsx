import { HERO_REGISTRY } from '@/templates/_shared/hero-variants';
import type { HeroVariant } from '@/types/templates';
import type { PromoSlide } from '../types';
import type { StructuralVariants, TemplateRecipe } from '@/types/templates/structural-variants';

interface HeroRouterProps {
  slides: PromoSlide[];
  activeIndex?: number;
  onDotClick?: (index: number) => void;
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
  slides,
  structuralVariants,
  recipe,
  onCtaClick,
}: HeroRouterProps) {
  const raw = structuralVariants?.heroVariant ?? recipe?.defaultHeroVariant ?? 'promo-carousel';
  const variant: HeroVariant = VALID_VARIANTS.has(raw as HeroVariant) ? (raw as HeroVariant) : 'promo-carousel';

  const HeroComponent = HERO_REGISTRY[variant];

  if (variant === 'promo-carousel' || variant === 'split-carousel') {
    return (
      <HeroComponent
        mode="carousel"
        cards={slides.map((slide) => ({
          id: slide.id,
          title: slide.headline,
          image: slide.imageUrl,
          tag: slide.badge,
          ctaLabel: slide.ctaText,
          bgColor: slide.bgColor,
        }))}
      />
    );
  }

  const firstSlide = slides[0];
  return (
    <HeroComponent
      mode="static"
      titleLight={firstSlide?.headline ?? ''}
      titleBold=""
      description={firstSlide?.subtext}
      image={firstSlide?.imageUrl}
      ctaText={firstSlide?.ctaText ?? 'Ver catálogo'}
      onCtaClick={onCtaClick}
    />
  );
}
