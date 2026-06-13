// Fashion Template — Product Listing Page
// Breadcrumb → Category pills → Product grid → FilterSidebar (desktop)
// Monochromatic B&W. Background: var(--t-background).

import { ChevronRight } from "lucide-react";
import { Header } from "./Header";
import { SearchBar } from "./SearchBar";
import { ProductCard } from "./ProductCard";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { gridColsClass } from "../utils/grid-classes";
import type { StoreInfo, Category, StorefrontProduct, NavTab, SortOption } from "../types";

interface ProductListingPageProps {
  store: StoreInfo;
  products: StorefrontProduct[];
  categories: Category[];
  activeCategoryId: string | null;
  selectedSizes?: string[];
  sortOption?: SortOption;
  activeTab: NavTab;
  cartItemCount?: number;
  currencySymbol?: string;
  showFilterPanel?: boolean;
  grid?: { mobile: number; desktop: number };
  layout?: {
    cardStyle?: string;
    cardHoverEffect?: string;
    cardImageRatio?: string;
  };
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onMenuClick?: () => void;
  onProductClick?: (id: string) => void;
  onCategoryChange?: (id: string | null) => void;
  onSizeToggle?: (size: string) => void;
  onSortChange?: (sort: SortOption) => void;
  onFilterToggle?: () => void;
  onTabChange?: (tab: NavTab) => void;
}

interface PillCategory {
  id: string;
  name: string;
}

export function ProductListingPage({
  store,
  products,
  categories,
  activeCategoryId,
  activeTab,
  cartItemCount = 0,
  currencySymbol = "$",
  grid,
  layout,
  onSearchClick,
  onCartClick,
  onMenuClick,
  onProductClick,
  onCategoryChange,
  onFilterToggle,
  onTabChange,
}: ProductListingPageProps) {
  const allCategories: PillCategory[] = [
    { id: "__new__", name: "NUEVO" },
    ...categories.map((c) => ({ id: c.id, name: c.name })),
  ];

  const gridClass = gridColsClass(grid?.mobile ?? 2, grid?.desktop ?? 4);

  return (
    <div
      className="min-h-screen bg-[var(--t-background)]"
      style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
    >
      <Header
        store={store}
        cartItemCount={cartItemCount}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
        onMenuClick={onMenuClick}
      />

      <main className="px-5 md:px-6 lg:px-8 pt-4 md:pt-6 pb-28 md:pb-12 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <p
          className="text-center md:text-left mb-3 text-[11px] font-normal tracking-[1px] text-[var(--t-muted)] uppercase"
          style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
        >
          Inicio / Productos
        </p>

        {/* Page heading */}
        <h1
          className="text-center md:text-left mb-5 md:mb-6 text-[28px] md:text-3xl lg:text-4xl font-bold uppercase tracking-[2px] text-[var(--t-foreground)]"
          style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
        >
          PRODUCTOS
        </h1>

        {/* Search bar — mobile only */}
        <div className="mb-4 md:hidden">
          <SearchBar />
        </div>

        {/* Filters button — mobile only */}
        <button
          type="button"
          className="flex items-center gap-1 mb-4 md:hidden transition-opacity hover:opacity-60 bg-transparent border-0 p-0 cursor-pointer"
          onClick={onFilterToggle}
        >
          <span
            className="text-[13px] font-medium text-[var(--t-foreground)]"
            style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
          >
            Filtros
          </span>
          <ChevronRight size={14} strokeWidth={2} className="text-[var(--t-foreground)]" />
        </button>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
          {allCategories.map((cat) => {
            const isActive =
              activeCategoryId === null
                ? cat.id === "__new__"
                : activeCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() =>
                  onCategoryChange?.(cat.id === "__new__" ? null : cat.id)
                }
                className="px-3.5 py-1.5 transition-colors hover:border-[var(--t-primary)] bg-transparent cursor-pointer rounded-[var(--t-radius-category)]"
                style={{
                  border: isActive
                    ? `1.5px solid var(--t-primary)`
                    : `1px solid var(--t-border)`,
                  fontFamily: "var(--font-sans, 'Inter', sans-serif)",
                  fontSize: "10px",
                  fontWeight: isActive ? 600 : 400,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: isActive
                    ? "var(--t-foreground)"
                    : "var(--t-muted)",
                  whiteSpace: "nowrap",
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Product grid */}
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p
              className="text-lg md:text-xl font-bold uppercase tracking-wider text-[var(--t-foreground)] mb-2"
              style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
            >
              SIN RESULTADOS
            </p>
            <p
              className="text-sm md:text-base text-[var(--t-muted)]"
              style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)", fontWeight: 400 }}
            >
              No hay productos en esta categoría.
            </p>
          </div>
        ) : (
          <div className={`grid ${gridClass}`} style={{ gap: "var(--t-space-gap, 0.75rem)" }}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currencySymbol={currencySymbol}
                onProductClick={onProductClick}
                layout={layout}
              />
            ))}
          </div>
        )}
      </main>

      <Footer store={store} />

      <BottomNav
        activeTab={activeTab}
        cartItemCount={cartItemCount}
        onTabChange={onTabChange}
      />
    </div>
  );
}
