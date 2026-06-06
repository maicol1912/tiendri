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

const TAB_MAP: Partial<Record<NavTab, BottomNavTab>> = {
  home: 'home',
  search: 'search',
  cart: 'cart',
  info: 'info',
};

export function BottomNavRouter({
  activeTab,
  cartItemCount,
  structuralVariants,
  recipe,
  onTabChange,
}: BottomNavRouterProps) {
  const raw = structuralVariants?.bottomNavVariant ?? recipe?.defaultBottomNavVariant ?? 'flat-solid';
  const variant: BottomNavVariant = VALID_VARIANTS.has(raw as BottomNavVariant)
    ? (raw as BottomNavVariant)
    : 'flat-solid';

  const BottomNavComponent = BOTTOM_NAV_REGISTRY[variant];
  const mappedTab: BottomNavTab | undefined = activeTab ? TAB_MAP[activeTab] : undefined;

  const handleTabChange = onTabChange
    ? (sharedTab: BottomNavTab) => {
        const reverseMap: Record<BottomNavTab, NavTab> = {
          home: 'home',
          search: 'search',
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
