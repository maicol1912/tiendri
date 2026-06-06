import { FOOTER_REGISTRY } from '@/templates/_shared/footer-variants';
import type { FooterVariant } from '@/types/templates';
import type { StructuralVariants, TemplateRecipe } from '@/types/templates/structural-variants';
import type { StorefrontStore } from '../types';
import { toSharedStore } from '../adapters';

interface FooterRouterProps {
  store: StorefrontStore;
  structuralVariants?: StructuralVariants;
  recipe?: TemplateRecipe;
}

const VALID_VARIANTS = new Set<FooterVariant>(['three-column', 'compact-row']);

export function FooterRouter({
  store,
  structuralVariants,
  recipe,
}: FooterRouterProps) {
  const raw = structuralVariants?.footerVariant ?? recipe?.defaultFooterVariant ?? 'compact-row';
  const variant: FooterVariant = VALID_VARIANTS.has(raw as FooterVariant)
    ? (raw as FooterVariant)
    : 'compact-row';

  const FooterComponent = FOOTER_REGISTRY[variant];

  return (
    <FooterComponent
      store={toSharedStore(store)}
      showBranding
    />
  );
}
