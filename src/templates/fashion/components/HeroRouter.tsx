import { HERO_REGISTRY } from '@/templates/_shared/hero-variants';
import type { HeroVariant } from '@/types/templates';
import type { StructuralVariants, TemplateRecipe } from '@/types/templates/structural-variants';

interface HeroRouterProps {
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

export function HeroRouter({ structuralVariants, recipe, onCtaClick }: HeroRouterProps) {
  const raw = structuralVariants?.heroVariant ?? recipe?.defaultHeroVariant ?? 'text-only';
  const variant: HeroVariant = VALID_VARIANTS.has(raw as HeroVariant) ? (raw as HeroVariant) : 'text-only';

  const HeroComponent = HERO_REGISTRY[variant];

  if (variant === 'promo-carousel' || variant === 'split-carousel') {
    return <HeroComponent mode="carousel" cards={[]} />;
  }

  return (
    <HeroComponent
      mode="static"
      titleLight="Nueva"
      titleBold="Colección"
      subtitle={`Verano ${new Date().getFullYear()}`}
      description="Piezas esenciales para el guardarropa moderno."
      ctaText="Ir a la tienda"
      onCtaClick={onCtaClick}
    />
  );
}
