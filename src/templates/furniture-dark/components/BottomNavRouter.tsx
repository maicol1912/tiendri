import { BOTTOM_NAV_REGISTRY } from '@/templates/_shared/bottom-nav-variants';
import type { BottomNavVariant } from '@/types/templates/primitives';
import type { StructuralVariants } from '@/types/templates/structural-variants';
import type { TemplateRecipe } from '@/types/templates/structural-variants';

type TabId = 'home' | 'search' | 'cart' | 'info';

interface BottomNavRouterProps {
  activeTab?: TabId;
  cartItemCount?: number;
  structuralVariants?: StructuralVariants;
  recipe?: TemplateRecipe;
  onTab?: (tab: TabId) => void;
}

const VALID_VARIANTS = new Set<BottomNavVariant>(['flat-solid', 'frosted-glass']);

export function BottomNavRouter({
  activeTab,
  cartItemCount,
  structuralVariants,
  recipe,
  onTab,
}: BottomNavRouterProps) {
  const raw = structuralVariants?.bottomNavVariant ?? recipe?.defaultBottomNavVariant ?? 'frosted-glass';
  const variant: BottomNavVariant = VALID_VARIANTS.has(raw as BottomNavVariant)
    ? (raw as BottomNavVariant)
    : 'frosted-glass';

  const BottomNavComponent = BOTTOM_NAV_REGISTRY[variant];

  return (
    <BottomNavComponent
      activeTab={activeTab}
      cartItemCount={cartItemCount}
      onTabChange={onTab}
    />
  );
}
