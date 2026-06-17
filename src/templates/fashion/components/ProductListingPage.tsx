// Fashion Template — Product Listing Page
// Header → (sidebar + grid) layout on desktop, drawer on mobile
// Monochromatic B&W. Background: var(--t-background).
// ZERO border-radius everywhere. Sharp editorial edges.

import { Search, SlidersHorizontal } from "lucide-react";
import { Header } from "./Header";
import { FilterSidebar } from "../../_shared/FilterSidebar";
import { ProductCard } from "./ProductCard";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { gridColsClass } from "../../_shared/utils/grid-classes";
import type { StoreInfo, Category, StorefrontProduct, NavTab } from "../types";
import type { FilterGroup, SortOption } from "../types";

interface ProductListingPageProps {
  store: StoreInfo;
  products: StorefrontProduct[];          // already filtered
  allProductsCount: number;               // total before filters
  categories: Category[];
  filterGroups: FilterGroup[];
  activeFilters: Record<string, string[]>;
  searchQuery: string;
  sortOption: SortOption;
  isFilterDrawerOpen: boolean;
  activeTab: NavTab;
  cartItemCount?: number;
  currencySymbol?: string;
  grid?: { mobile: number; desktop: number };
  layout?: {
    cardStyle?: string;
    cardHoverEffect?: string;
    cardImageRatio?: string;
  };
  activeHref?: string;
  onSearchChange?: (q: string) => void;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onMenuClick?: () => void;
  onNavLinkClick?: (href: string) => void;
  onProductClick?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  onFilterChange?: (groupId: string, optionId: string, checked: boolean) => void;
  onClearAllFilters?: () => void;
  onSortChange?: (sort: SortOption) => void;
  onFilterDrawerOpen?: () => void;
  onFilterDrawerClose?: () => void;
  onTabChange?: (tab: NavTab) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "recent", label: "Más recientes" },
  { value: "price-asc", label: "Menor precio" },
  { value: "price-desc", label: "Mayor precio" },
  { value: "rating", label: "Mejor valorados" },
];

export function ProductListingPage({
  store,
  products,
  allProductsCount,
  categories: _categories,
  filterGroups,
  activeFilters,
  searchQuery,
  sortOption,
  isFilterDrawerOpen,
  activeTab,
  cartItemCount = 0,
  currencySymbol = "$",
  grid,
  layout,
  activeHref,
  onSearchChange,
  onSearchClick,
  onCartClick,
  onMenuClick,
  onNavLinkClick,
  onProductClick,
  onAddToCart,
  onFilterChange,
  onClearAllFilters,
  onSortChange,
  onFilterDrawerOpen,
  onFilterDrawerClose,
  onTabChange,
}: ProductListingPageProps) {
  const gridClass = gridColsClass(grid?.mobile ?? 2, grid?.desktop ?? 3);

  const activeFilterCount = Object.values(activeFilters).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--t-background)", fontFamily: "Inter, sans-serif" }}
    >
      <Header
        store={store}
        cartItemCount={cartItemCount}
        activeHref={activeHref}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
        onMenuClick={onMenuClick}
        onNavLinkClick={onNavLinkClick}
      />

      <main className="px-4 md:px-6 lg:px-8 pt-4 pb-28 md:pb-12 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <p
          style={{
            fontSize: "11px",
            letterSpacing: "1px",
            textTransform: "uppercase",
            color: "var(--t-muted)",
            marginBottom: "12px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Inicio / Productos
        </p>

        {/* Page heading */}
        <h1
          style={{
            fontSize: "clamp(24px, 4vw, 36px)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "2px",
            color: "var(--t-foreground)",
            marginBottom: "24px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          PRODUCTOS
        </h1>

        {/* Search + Sort bar */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "16px",
            alignItems: "center",
          }}
        >
          {/* Search input */}
          <div style={{ position: "relative", flex: 1 }}>
            <Search
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "14px",
                height: "14px",
                color: "var(--t-muted)",
                pointerEvents: "none",
              }}
            />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              onFocus={onSearchClick}
              style={{
                width: "100%",
                paddingLeft: "36px",
                paddingRight: "12px",
                paddingTop: "10px",
                paddingBottom: "10px",
                border: "1px solid var(--t-border)",
                borderRadius: 0,
                background: "var(--t-card)",
                color: "var(--t-foreground)",
                fontSize: "13px",
                fontFamily: "Inter, sans-serif",
                outline: "none",
              }}
            />
          </div>

          {/* Sort dropdown */}
          <select
            value={sortOption}
            onChange={(e) => onSortChange?.(e.target.value as SortOption)}
            style={{
              padding: "10px 28px 10px 12px",
              border: "1px solid var(--t-border)",
              borderRadius: 0,
              background: "var(--t-card)",
              color: "var(--t-foreground)",
              fontSize: "12px",
              fontFamily: "Inter, sans-serif",
              cursor: "pointer",
              outline: "none",
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238A8A8A' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 10px center",
              minWidth: "140px",
            }}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Result count + mobile filter button */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          {/* Result count */}
          <span
            style={{
              fontSize: "12px",
              color: "var(--t-muted)",
              letterSpacing: "0.5px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {products.length}{" "}
            {products.length === 1 ? "producto" : "productos"}
            {activeFilterCount > 0 && ` (de ${allProductsCount})`}
          </span>

          {/* Filter button — mobile only */}
          <button
            type="button"
            onClick={onFilterDrawerOpen}
            className="lg:hidden"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              border: "1px solid var(--t-border)",
              borderRadius: 0,
              background:
                activeFilterCount > 0
                  ? "var(--t-foreground)"
                  : "transparent",
              color:
                activeFilterCount > 0
                  ? "var(--t-background)"
                  : "var(--t-foreground)",
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1px",
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <SlidersHorizontal style={{ width: "13px", height: "13px" }} />
            Filtros
            {activeFilterCount > 0 && (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "16px",
                  height: "16px",
                  borderRadius: 0,
                  background: "var(--t-background)",
                  color: "var(--t-foreground)",
                  fontSize: "9px",
                  fontWeight: 700,
                }}
              >
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Main content: sidebar (desktop) + product grid */}
        <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
          {/* FilterSidebar — handles desktop sidebar AND mobile drawer internally */}
          <FilterSidebar
            filterGroups={filterGroups}
            activeFilters={activeFilters}
            onFilterChange={(groupId, optionId, checked) =>
              onFilterChange?.(groupId, optionId, checked)
            }
            onClearAll={() => onClearAllFilters?.()}
            isOpen={isFilterDrawerOpen}
            onClose={() => onFilterDrawerClose?.()}
          />

          {/* Product grid */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {products.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "80px 0",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    color: "var(--t-foreground)",
                    marginBottom: "8px",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  SIN RESULTADOS
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--t-muted)",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Probá con otros filtros o términos de búsqueda.
                </p>
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={onClearAllFilters}
                    style={{
                      marginTop: "16px",
                      padding: "10px 20px",
                      border: "1px solid var(--t-foreground)",
                      borderRadius: 0,
                      background: "transparent",
                      color: "var(--t-foreground)",
                      fontSize: "11px",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      cursor: "pointer",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            ) : (
              <div
                className={`grid ${gridClass}`}
                style={{ gap: "var(--t-space-gap, 0.75rem)" }}
              >
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    currencySymbol={currencySymbol}
                    onProductClick={onProductClick}
                    onAddToCart={onAddToCart}
                    layout={layout}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
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
