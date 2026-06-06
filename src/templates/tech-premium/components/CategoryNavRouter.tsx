import { CATEGORY_NAV_REGISTRY } from '@/templates/_shared/category-nav-variants';
import { toSharedCategories } from '../adapters';
import type { CategoryNavVariant, CategoryNavPattern } from '@/types/templates';
import type { StructuralVariants } from '@/types/templates/structural-variants';
import type { TemplateRecipe } from '@/types/templates/structural-variants';
import type { Category } from '../types';

interface CategoryNavRouterProps {
  categories: Category[];
  activeCategoryId?: string | null;
  structuralVariants?: StructuralVariants;
  recipe?: TemplateRecipe;
  onCategoryClick?: (categoryId: string) => void;
}

const LEGACY_MAP: Partial<Record<CategoryNavPattern, CategoryNavVariant>> = {
  'horizontal-scroll': 'horizontal-scroll',
  grid: 'icon-grid',
  tabs: 'tab-bar',
  chips: 'chips',
};

const VALID_VARIANTS = new Set<CategoryNavVariant>([
  'icon-grid',
  'image-pills',
  'horizontal-scroll',
  'tab-bar',
  'chips',
]);

export function CategoryNavRouter({
  categories,
  activeCategoryId,
  structuralVariants,
  recipe,
  onCategoryClick,
}: CategoryNavRouterProps) {
  const legacyStyle = structuralVariants?.categoryNavStyle;
  const legacyMapped = legacyStyle ? LEGACY_MAP[legacyStyle] : undefined;

  const raw =
    structuralVariants?.categoryNavVariant ??
    legacyMapped ??
    recipe?.defaultCategoryNavVariant ??
    'icon-grid';

  const variant: CategoryNavVariant = VALID_VARIANTS.has(raw as CategoryNavVariant)
    ? (raw as CategoryNavVariant)
    : 'icon-grid';

  const NavComponent = CATEGORY_NAV_REGISTRY[variant];
  const sharedCategories = toSharedCategories(categories);

  return (
    <NavComponent
      categories={sharedCategories}
      activeCategoryId={activeCategoryId}
      onCategoryClick={onCategoryClick}
    />
  );
}
