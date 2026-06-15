"use client";

// Food Night — Product Listing Page
// Full catalog with filter sidebar + search + sort

import { Header } from "./Header";
import { ProductCard } from "./ProductCard";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { FilterSidebar } from "../../_shared/FilterSidebar";
import { SlidersHorizontal, Search, ChevronDown } from "lucide-react";
import { gridColsClass } from "../../_shared/utils/grid-classes";
import type { StoreInfo, Category, StorefrontProduct, NavTab, FilterGroup, SortOption } from "../types";

interface ProductListingPageProps {
  store: StoreInfo;
  categories: Category[];
  products: StorefrontProduct[];
  filterGroups: FilterGroup[];
  activeFilters: Record<string, string[]>;
  searchQuery: string;
  sortOption: SortOption;
  isFilterOpen: boolean;
  activeTab?: NavTab;
  cartItemCount?: number;
  currencySymbol?: string;
  layout?: {
    cardStyle?: string;
    cardHoverEffect?: string;
    cardImageRatio?: string;
    headerStyle?: string;
    footerStyle?: string;
  };
  grid?: {
    listing?: { mobile: number; desktop: number };
  };
  onSearchChange: (q: string) => void;
  onSortChange: (sort: SortOption) => void;
  onFilterChange: (groupId: string, optionId: string, checked: boolean) => void;
  onClearAllFilters: () => void;
  onFilterOpen: () => void;
  onFilterClose: () => void;
  activeHref?: string;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onProductClick?: (productId: string) => void;
  onWishlistToggle?: (productId: string) => void;
  onTabChange?: (tab: NavTab) => void;
  onNavLinkClick?: (href: string) => void;
}

export function ProductListingPage({
  store,
  categories,
  products,
  filterGroups,
  activeFilters,
  searchQuery,
  sortOption,
  isFilterOpen,
  activeTab = "home",
  cartItemCount = 0,
  currencySymbol = "$",
  layout,
  grid,
  onSearchChange,
  onSortChange,
  onFilterChange,
  onClearAllFilters,
  onFilterOpen,
  onFilterClose,
  activeHref,
  onSearchClick,
  onCartClick,
  onProductClick,
  onWishlistToggle,
  onTabChange,
  onNavLinkClick,
}: ProductListingPageProps) {
  const listingMobile = grid?.listing?.mobile ?? 2;
  const listingDesktop = grid?.listing?.desktop ?? 3;

  const activeFilterCount = Object.values(activeFilters).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--t-background)" }}>
      <Header
        store={store}
        cartItemCount={cartItemCount}
        layout={layout}
        activeHref={activeHref}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
        onNavLinkClick={onNavLinkClick}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-24 md:pb-12 pt-6">
        <h1 className="text-[20px] font-bold mb-6" style={{ color: "var(--t-foreground)" }}>
          Catálogo completo
        </h1>

        {/* Search + Sort + Filter bar */}
        <div className="flex gap-3 mb-6 items-center">
          {/* Search bar */}
          <div
            style={{
              flex: 1,
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Search
              className="absolute left-3 w-4 h-4"
              style={{ color: "var(--t-muted)" }}
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Buscar platos..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{
                width: "100%",
                paddingLeft: "36px",
                paddingRight: "12px",
                paddingTop: "10px",
                paddingBottom: "10px",
                background: "var(--t-card)",
                border: "1px solid var(--t-border)",
                borderRadius: "var(--t-radius-category, 8px)",
                color: "var(--t-foreground)",
                fontSize: "14px",
                outline: "none",
              }}
              aria-label="Buscar productos"
            />
          </div>

          {/* Sort dropdown */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              style={{
                appearance: "none",
                paddingLeft: "12px",
                paddingRight: "32px",
                paddingTop: "10px",
                paddingBottom: "10px",
                background: "var(--t-card)",
                border: "1px solid var(--t-border)",
                borderRadius: "var(--t-radius-category, 8px)",
                color: "var(--t-foreground)",
                fontSize: "13px",
                cursor: "pointer",
                outline: "none",
              }}
              aria-label="Ordenar productos"
            >
              <option value="recent">Más recientes</option>
              <option value="price-asc">Menor precio</option>
              <option value="price-desc">Mayor precio</option>
              <option value="rating">Mejor valorados</option>
            </select>
            <ChevronDown
              className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              style={{ color: "var(--t-muted)" }}
              aria-hidden="true"
            />
          </div>

          {/* Mobile filter button */}
          <button
            type="button"
            onClick={onFilterOpen}
            className="lg:hidden flex items-center gap-2"
            style={{
              position: "relative",
              padding: "10px 14px",
              background: "var(--t-card)",
              border: "1px solid var(--t-border)",
              borderRadius: "var(--t-radius-category, 8px)",
              color: "var(--t-foreground)",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              flexShrink: 0,
            }}
            aria-label="Abrir filtros"
          >
            <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Filtros</span>
            {activeFilterCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-6px",
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  background: "var(--t-primary)",
                  color: "var(--t-on-primary, #fff)",
                  fontSize: "10px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label={`${activeFilterCount} filtros activos`}
              >
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Result counter */}
        <p
          className="text-[13px] mb-4"
          style={{ color: "var(--t-muted)" }}
          aria-live="polite"
        >
          {products.length === 1
            ? "1 plato encontrado"
            : `${products.length} platos encontrados`}
        </p>

        {/* Sidebar + Grid layout */}
        <div className="flex gap-6 items-start">
          {/* Filter Sidebar */}
          <FilterSidebar
            filterGroups={filterGroups}
            activeFilters={activeFilters}
            onFilterChange={onFilterChange}
            onClearAll={onClearAllFilters}
            isOpen={isFilterOpen}
            onClose={onFilterClose}
          />

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {products.length > 0 ? (
              <section aria-label="Todos los productos">
                <div
                  className={`grid ${gridColsClass(listingMobile, listingDesktop)} items-start`}
                  style={{ gap: "var(--t-space-gap, 0.75rem)" }}
                >
                  {products.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      currencySymbol={currencySymbol}
                      variant={index % 2 === 0 ? "tall" : "short"}
                      layout={layout}
                      onClick={() => onProductClick?.(product.id)}
                    />
                  ))}
                </div>
              </section>
            ) : (
              <div
                className="flex flex-col items-center justify-center py-20 gap-3"
                role="status"
                aria-label="Sin productos"
              >
                <span style={{ fontSize: "40px" }} aria-hidden="true">🍕</span>
                <p
                  className="text-[15px] font-semibold"
                  style={{ color: "var(--t-foreground)" }}
                >
                  No encontramos platos
                </p>
                <p className="text-[13px]" style={{ color: "var(--t-muted)" }}>
                  Probá con otros filtros o términos de búsqueda
                </p>
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={onClearAllFilters}
                    style={{
                      marginTop: "8px",
                      padding: "10px 20px",
                      background: "var(--t-primary)",
                      border: "none",
                      borderRadius: "var(--t-radius-button, 45px)",
                      color: "var(--t-on-primary, #fff)",
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer store={store} layout={layout} />

      <BottomNav
        activeTab={activeTab}
        cartItemCount={cartItemCount}
        onTabChange={(tab) => {
          if (tab === "cart") onCartClick?.();
          else onTabChange?.(tab);
        }}
      />
    </div>
  );
}
