import { FOOTER_REGISTRY } from '@/templates/_shared/footer-variants';
import { toSharedStore } from '../adapters';
import type { FooterVariant } from '@/types/templates';
import type { StructuralVariants, TemplateRecipe } from '@/types/templates/structural-variants';
import type { StoreInfo } from '../types';
import { foodNightConfig } from '../config';

interface FooterRouterProps {
  store: StoreInfo;
  services?: readonly string[];
  assistance?: readonly string[];
  structuralVariants?: StructuralVariants;
  recipe?: TemplateRecipe;
}

const VALID_VARIANTS = new Set<FooterVariant>(['three-column', 'compact-row', 'social-icons']);

export function FooterRouter({
  store,
  services = [],
  assistance = [],
  structuralVariants,
  recipe,
}: FooterRouterProps) {
  const raw =
    structuralVariants?.footerVariant ??
    recipe?.defaultFooterVariant ??
    foodNightConfig.recipe.defaultFooterVariant;
  const variant: FooterVariant = VALID_VARIANTS.has(raw as FooterVariant)
    ? (raw as FooterVariant)
    : 'compact-row';

  const FooterComponent = FOOTER_REGISTRY[variant];

  return (
    <FooterComponent
      store={toSharedStore(store)}
      services={services}
      assistance={assistance}
    />
  );
}
