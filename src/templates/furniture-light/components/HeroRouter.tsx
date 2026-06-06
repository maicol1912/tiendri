import { HERO_REGISTRY } from '@/templates/_shared/hero-variants';
import type { HeroVariant } from '@/types/templates';
import type { StructuralVariants, TemplateRecipe } from '@/types/templates/structural-variants';

interface HeroRouterProps {
  title?: string;
  subtitle?: string;
  bannerImage?: string;
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
  title,
  subtitle,
  bannerImage,
  structuralVariants,
  recipe,
  onCtaClick,
}: HeroRouterProps) {
  const raw = structuralVariants?.heroVariant ?? recipe?.defaultHeroVariant ?? 'split';
  const variant: HeroVariant = VALID_VARIANTS.has(raw as HeroVariant) ? (raw as HeroVariant) : 'split';

  const HeroComponent = HERO_REGISTRY[variant];

  if (variant === 'promo-carousel' || variant === 'split-carousel') {
    return <HeroComponent mode="carousel" cards={[]} />;
  }

  return (
    <HeroComponent
      mode="static"
      titleLight={title ?? ''}
      titleBold=""
      description={subtitle}
      image={bannerImage}
      ctaText="Ver catálogo"
      onCtaClick={onCtaClick}
    />
  );
}
