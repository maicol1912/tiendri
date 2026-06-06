import { CATEGORY_NAV_REGISTRY } from '@/templates/_shared/category-nav-variants';
import { toSharedCategories } from '../adapters';
import type { CategoryNavVariant, CategoryNavPattern } from '@/types/templates';
import type { StructuralVariants, TemplateRecipe } from '@/types/templates/structural-variants';
import type { DecorWarmCategory } from '../types';
import { decorWarmConfig } from '../config';

interface CategoryNavRouterProps {
  categories: DecorWarmCategory[];
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
    decorWarmConfig.recipe.defaultCategoryNavVariant;

  const variant: CategoryNavVariant = VALID_VARIANTS.has(raw as CategoryNavVariant)
    ? (raw as CategoryNavVariant)
    : 'icon-grid';

  const NavComponent = CATEGORY_NAV_REGISTRY[variant];
  const sharedCategories = toSharedCategories(categories);

  return (
    <section
      className="bg-[var(--t-background)] px-4 md:px-6 lg:px-8"
      style={{ paddingTop: 'var(--t-space-section, 1rem)', paddingBottom: 'var(--t-space-section, 1rem)' }}
      aria-labelledby="categories-heading"
    >
      <NavComponent
        categories={sharedCategories}
        activeCategoryId={activeCategoryId}
        onCategoryClick={onCategoryClick}
      />
    </section>
  );
}
