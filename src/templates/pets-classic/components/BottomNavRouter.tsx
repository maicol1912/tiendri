import { BOTTOM_NAV_REGISTRY } from '@/templates/_shared/bottom-nav-variants';
import type { BottomNavVariant } from '@/types/templates/primitives';
import type { BottomNavTab } from '@/templates/_shared/bottom-nav-variants';
import type { StructuralVariants, TemplateRecipe } from '@/types/templates/structural-variants';
import type { NavTab } from '../types';

interface BottomNavRouterProps {
  activeTab?: NavTab;
  cartItemCount?: number;
  structuralVariants?: StructuralVariants;
  recipe?: TemplateRecipe;
  onTabChange?: (tab: NavTab) => void;
}

const VALID_VARIANTS = new Set<BottomNavVariant>(['flat-solid', 'frosted-glass', 'rounded-top']);

const TAB_MAP: Record<NavTab, BottomNavTab> = {
  home: 'home',
  cart: 'cart',
  listing: 'search',
  info: 'info',
};

export function BottomNavRouter({
  activeTab,
  cartItemCount,
  structuralVariants,
  recipe,
  onTabChange,
}: BottomNavRouterProps) {
  const raw = structuralVariants?.bottomNavVariant ?? recipe?.defaultBottomNavVariant ?? 'rounded-top';
  const variant: BottomNavVariant = VALID_VARIANTS.has(raw as BottomNavVariant)
    ? (raw as BottomNavVariant)
    : 'rounded-top';

  const BottomNavComponent = BOTTOM_NAV_REGISTRY[variant];
  const mappedTab: BottomNavTab | undefined = activeTab ? TAB_MAP[activeTab] : undefined;

  const handleTabChange = onTabChange
    ? (sharedTab: BottomNavTab) => {
        const reverseMap: Record<BottomNavTab, NavTab> = {
          home: 'home',
          search: 'listing',
          cart: 'cart',
          info: 'info',
        };
        onTabChange(reverseMap[sharedTab]);
      }
    : undefined;

  return (
    <BottomNavComponent
      activeTab={mappedTab}
      cartItemCount={cartItemCount}
      onTabChange={handleTabChange}
    />
  );
}
