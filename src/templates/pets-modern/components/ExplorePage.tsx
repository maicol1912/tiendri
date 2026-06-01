// Pet V3 Template — Explore Page
// "Explorar categorias" title, search bar, pet type tab pills,
// category cards grid. Desktop: 3-4 col grid.
// ZERO hardcoded colors — all via CSS variables.

import { SearchBar } from "./SearchBar";
import { CategoryCard } from "./CategoryCard";
import { BottomNav } from "./BottomNav";
import { gridColsClass } from "../utils/grid-classes";
import { tabStyleClasses } from "../utils/layout-classes";
import type { PetCategory, PetFilter, NavTab } from "../types";

interface ExplorePageProps {
  categories: PetCategory[];
  activeFilter: PetFilter;
  activeTab: NavTab;
  onFilterChange?: (filter: PetFilter) => void;
  onCategoryClick?: (categoryId: string) => void;
  onSearchClick?: () => void;
  onTabChange?: (tab: NavTab) => void;
  layout?: {
    cardHoverEffect?: string;
    tabStyle?: string;
  };
  grid?: {
    categories?: { mobile: number; desktop: number };
  };
}

const filters: Array<{ id: PetFilter; label: string }> = [
  { id: "all", label: "Todos" },
  { id: "dog", label: "Perros" },
  { id: "cat", label: "Gatos" },
  { id: "small-animal", label: "Pequenos" },
  { id: "bird", label: "Aves" },
];

export function ExplorePage({
  categories,
  activeFilter,
  activeTab,
  onFilterChange,
  onCategoryClick,
  onSearchClick,
  onTabChange,
  layout,
  grid,
}: ExplorePageProps) {
  const categoriesGrid = grid?.categories ?? { mobile: 2, desktop: 4 };
  const filterStyle = layout?.tabStyle ?? "pills";

  return (
    <div className="min-h-screen bg-[var(--t-background)] pb-24 lg:pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Title */}
        <div className="pt-6 lg:pt-8">
          <h1 className="text-[var(--t-text-primary)] text-xl md:text-2xl lg:text-3xl font-bold text-center lg:text-left">
            Explorar categorias
          </h1>
        </div>

        {/* Search bar */}
        <div className="mt-4 lg:mt-6 lg:max-w-md">
          <SearchBar readOnly onSearchClick={onSearchClick} />
        </div>

        {/* Filter pills */}
        <div className="mt-5 flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0 lg:flex-wrap">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;
            const filterClass = tabStyleClasses(filterStyle, isActive);
            return (
              <button
                key={filter.id}
                onClick={() => onFilterChange?.(filter.id)}
                className={`flex-shrink-0 px-5 py-3.5 text-lg font-medium transition-all duration-200 ${filterClass}`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Category grid */}
        <div className={`mt-6 grid ${gridColsClass(categoriesGrid.mobile, categoriesGrid.desktop)} gap-4 md:gap-5 lg:gap-6`}>
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={() => onCategoryClick?.(category.id)}
              layout={layout}
            />
          ))}
        </div>
      </div>

      {/* Bottom Nav — mobile only */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
