import { HERO_REGISTRY } from '@/templates/_shared/hero-variants';
import type { HeroVariant } from '@/types/templates';
import type { StructuralVariants } from '@/types/templates/structural-variants';
import type { TemplateRecipe } from '@/types/templates/structural-variants';
import type { PromoCard } from '../types';

interface HeroRouterProps {
  promoCards?: PromoCard[];
  structuralVariants?: StructuralVariants;
  recipe?: TemplateRecipe;
  storeName?: string;
  storeDescription?: string;
  onCardClick?: (cardId: string) => void;
  onCtaClick?: () => void;
}

const VALID_VARIANTS = new Set<HeroVariant>([
  'contained',
  'full-bleed',
  'split',
  'text-only',
  'promo-carousel',
]);

export function HeroRouter({
  promoCards = [],
  structuralVariants,
  recipe,
  storeName = '',
  storeDescription = '',
  onCardClick,
  onCtaClick,
}: HeroRouterProps) {
  const raw = structuralVariants?.heroVariant ?? recipe?.defaultHeroVariant ?? 'promo-carousel';
  const variant: HeroVariant = VALID_VARIANTS.has(raw as HeroVariant) ? (raw as HeroVariant) : 'promo-carousel';

  const HeroComponent = HERO_REGISTRY[variant];

  if (variant === 'promo-carousel') {
    const cards = promoCards.map((c) => ({
      id: c.id,
      title: c.title,
      image: c.image,
      tag: c.tag,
      ctaLabel: c.ctaLabel,
      bgColor: c.bgColor,
    }));

    return (
      <HeroComponent
        mode="carousel"
        cards={cards}
        onCardClick={onCardClick}
      />
    );
  }

  return (
    <HeroComponent
      mode="static"
      titleLight={storeName}
      titleBold=""
      description={storeDescription}
      ctaText="Ver catálogo"
      onCtaClick={onCtaClick}
    />
  );
}
