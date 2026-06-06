import { HEADER_REGISTRY } from '@/templates/_shared/header-variants';
import { toSharedStore } from '../adapters';
import type { HeaderVariant } from '@/types/templates';
import type { StructuralVariants, TemplateRecipe } from '@/types/templates/structural-variants';
import type { StoreInfo } from '../types';

interface HeaderRouterProps {
  store: StoreInfo;
  structuralVariants?: StructuralVariants;
  recipe?: TemplateRecipe;
  cartItemCount?: number;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onMenuClick?: () => void;
  navLinks?: readonly { label: string; href: string }[];
  onNavLinkClick?: (href: string) => void;
}

const VALID_VARIANTS = new Set<HeaderVariant>(['minimal-dark', 'location-greeting']);

export function HeaderRouter({
  store,
  structuralVariants,
  recipe,
  cartItemCount,
  onSearchClick,
  onCartClick,
  onMenuClick,
  navLinks,
  onNavLinkClick,
}: HeaderRouterProps) {
  const raw = structuralVariants?.headerVariant ?? recipe?.defaultHeaderVariant ?? 'minimal-dark';
  const variant: HeaderVariant = VALID_VARIANTS.has(raw as HeaderVariant)
    ? (raw as HeaderVariant)
    : 'minimal-dark';

  const HeaderComponent = HEADER_REGISTRY[variant];
  const sharedStore = toSharedStore(store);

  return (
    <HeaderComponent
      store={sharedStore}
      cartItemCount={cartItemCount}
      onSearchClick={onSearchClick}
      onCartClick={onCartClick}
      onMenuClick={onMenuClick}
      navLinks={navLinks}
      onNavLinkClick={onNavLinkClick}
    />
  );
}
