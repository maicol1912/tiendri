import { BOTTOM_NAV_REGISTRY } from '@/templates/_shared/bottom-nav-variants';
import type { BottomNavVariant } from '@/types/templates/primitives';
import type { BottomNavTab } from '@/templates/_shared/bottom-nav-variants';
import type { StructuralVariants, TemplateRecipe } from '@/types/templates/structural-variants';
import type { DecorWarmNavTab } from '../types';
import { decorWarmConfig } from '../config';

interface BottomNavRouterProps {
  activeTab?: DecorWarmNavTab;
  cartItemCount?: number;
  structuralVariants?: StructuralVariants;
  recipe?: TemplateRecipe;
  onTabChange?: (tab: DecorWarmNavTab) => void;
}

const VALID_VARIANTS = new Set<BottomNavVariant>(['flat-solid', 'frosted-glass', 'rounded-top']);

const TAB_MAP: Partial<Record<DecorWarmNavTab, BottomNavTab>> = {
  home: 'home',
  cart: 'cart',
  categories: 'search',
  info: 'info',
};

export function BottomNavRouter({
  activeTab,
  cartItemCount,
  structuralVariants,
  recipe,
  onTabChange,
}: BottomNavRouterProps) {
  const raw =
    structuralVariants?.bottomNavVariant ??
    recipe?.defaultBottomNavVariant ??
    decorWarmConfig.recipe.defaultBottomNavVariant;
  const variant: BottomNavVariant = VALID_VARIANTS.has(raw as BottomNavVariant)
    ? (raw as BottomNavVariant)
    : 'flat-solid';

  const BottomNavComponent = BOTTOM_NAV_REGISTRY[variant];
  const mappedTab: BottomNavTab | undefined = activeTab ? TAB_MAP[activeTab] : undefined;

  const handleTabChange = onTabChange
    ? (sharedTab: BottomNavTab) => {
        const reverseMap: Partial<Record<BottomNavTab, DecorWarmNavTab>> = {
          home: 'home',
          search: 'categories',
          cart: 'cart',
          info: 'info',
        };
        const mapped = reverseMap[sharedTab];
        if (mapped) onTabChange(mapped);
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
