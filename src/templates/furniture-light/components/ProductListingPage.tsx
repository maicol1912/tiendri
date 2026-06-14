// Furniture Light — Listing / Catalog Page
// Header + search/sort bar + filter sidebar + products grid
// ZERO hardcoded colors

import React from "react";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { FilterSidebar } from "./FilterSidebar";
import { ProductCard } from "./ProductCard";
import { gridColsClass } from "../utils/grid-classes";
import type { FurnitureLightConfig } from "../config";
import type {
  FurnitureProduct,
  FurnitureCategory,
  FurnitureStoreInfo,
  FurnitureNavTab,
  FurnitureLightFilterGroup,
  FurnitureLightSortOption,
} from "../types";

const SORT_LABELS: Record<FurnitureLightSortOption, string> = {
  recent: "Más recientes",
  "price-asc": "Precio: menor a mayor",
  "price-desc": "Precio: mayor a menor",
  rating: "Mejor valorados",
};

interface ProductListingPageProps {
  store: FurnitureStoreInfo;
  navLinks?: readonly { label: string; href: string }[];
  products: FurnitureProduct[];
  categories?: FurnitureCategory[];
  layout?: FurnitureLightConfig["layout"];
  grid?: FurnitureLightConfig["grid"];
  activeTab?: FurnitureNavTab;
  cartItemCount?: number;
  currencySymbol?: string;
  // Filter props
  filterGroups: FurnitureLightFilterGroup[];
  activeFilters: Record<string, string[]>;
  searchQuery: string;
  sortOption: FurnitureLightSortOption;
  isFilterDrawerOpen: boolean;
  // Handlers
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onNavLinkClick?: (href: string) => void;
  onProductClick?: (productId: string) => void;
  onWishlistToggle?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
  onTabChange?: (tab: FurnitureNavTab) => void;
  onFilterChange: (groupId: string, value: string) => void;
  onClearAll: () => void;
  onSearchChange: (q: string) => void;
  onSortChange: (s: FurnitureLightSortOption) => void;
  onFilterDrawerToggle: () => void;
  onFilterDrawerClose: () => void;
}

export function ProductListingPage({
  store,
  navLinks = [],
  products,
  categories = [],
  layout,
  grid,
  activeTab = "home",
  cartItemCount = 0,
  currencySymbol = "$",
  filterGroups,
  activeFilters,
  searchQuery,
  sortOption,
  isFilterDrawerOpen,
  onSearchClick,
  onCartClick,
  onNavLinkClick,
  onProductClick,
  onWishlistToggle,
  onAddToCart,
  onTabChange,
  onFilterChange,
  onClearAll,
  onSearchChange,
  onSortChange,
  onFilterDrawerToggle,
  onFilterDrawerClose,
}: ProductListingPageProps) {
  const gridCols = grid?.listing ?? { mobile: 2, desktop: 3 };

  const activeFilterCount = Object.values(activeFilters).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  return (
    <div className="min-h-screen" style={{ background: "var(--t-background)" }}>
      <Header
        store={store}
        navLinks={navLinks as { label: string; href: string }[]}
        cartItemCount={cartItemCount}
        activeHref="/catalogo"
        onNavLinkClick={onNavLinkClick}
        onCartClick={onCartClick}
        onSearchClick={onSearchClick}
      />

      <main className="pt-[60px] lg:pt-[72px] pb-28 lg:pb-8 max-w-6xl mx-auto">
        {/* Page title */}
        <div
          className="px-5 md:px-6 lg:px-8 py-4"
          style={{ borderBottom: "1px solid var(--t-border)" }}
        >
          <h1
            style={{
              fontFamily: "var(--font-display, Inter, sans-serif)",
              fontWeight: 700,
              fontSize: "1.25rem",
              color: "var(--t-foreground)",
            }}
          >
            Catálogo
          </h1>
        </div>

        {/* Search + sort bar */}
        <div
          className="px-5 md:px-6 lg:px-8 py-3 flex items-center gap-3"
          style={{ borderBottom: "1px solid var(--t-border)" }}
        >
          {/* Search input */}
          <div style={{ position: "relative", flex: 1 }}>
            <Search
              className="w-4 h-4"
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--t-muted)",
                pointerEvents: "none",
              }}
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar productos..."
              aria-label="Buscar productos"
              style={{
                width: "100%",
                paddingLeft: "36px",
                paddingRight: "12px",
                paddingTop: "9px",
                paddingBottom: "9px",
                fontSize: "13px",
                fontFamily: "Inter, sans-serif",
                color: "var(--t-foreground)",
                background: "var(--t-card)",
                border: "1px solid var(--t-border)",
                borderRadius: "12px",
                outline: "none",
              }}
            />
          </div>

          {/* Sort dropdown */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value as FurnitureLightSortOption)}
              aria-label="Ordenar productos"
              style={{
                appearance: "none",
                paddingLeft: "12px",
                paddingRight: "32px",
                paddingTop: "9px",
                paddingBottom: "9px",
                fontSize: "13px",
                fontFamily: "Inter, sans-serif",
                color: "var(--t-foreground)",
                background: "var(--t-card)",
                border: "1px solid var(--t-border)",
                borderRadius: "12px",
                cursor: "pointer",
                outline: "none",
              }}
            >
              {(Object.entries(SORT_LABELS) as [FurnitureLightSortOption, string][]).map(
                ([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                )
              )}
            </select>
            <ChevronDown
              className="w-3.5 h-3.5"
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--t-muted)",
                pointerEvents: "none",
              }}
              aria-hidden="true"
            />
          </div>

          {/* Mobile filter toggle button */}
          <button
            type="button"
            onClick={onFilterDrawerToggle}
            className="lg:hidden"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "9px 14px",
              background: activeFilterCount > 0 ? "var(--t-primary)" : "var(--t-card)",
              color: activeFilterCount > 0 ? "var(--t-on-primary, #fff)" : "var(--t-foreground)",
              border: "1px solid var(--t-border)",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 600,
              fontFamily: "Inter, sans-serif",
              flexShrink: 0,
            }}
            aria-label={`Filtros${activeFilterCount > 0 ? ` (${activeFilterCount} activos)` : ""}`}
          >
            <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
            {activeFilterCount > 0 && (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  background: "var(--t-on-primary, #fff)",
                  color: "var(--t-primary)",
                  fontSize: "10px",
                  fontWeight: 700,
                  padding: "0 4px",
                }}
                aria-hidden="true"
              >
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Main content: sidebar + grid */}
        <div className="px-5 md:px-6 lg:px-8 mt-4 flex gap-6 items-start">
          {/* Filter sidebar (desktop: left column) */}
          <FilterSidebar
            filterGroups={filterGroups}
            activeFilters={activeFilters}
            onFilterChange={onFilterChange}
            onClearAll={onClearAll}
            isOpen={isFilterDrawerOpen}
            onClose={onFilterDrawerClose}
          />

          {/* Products area */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Result count */}
            <p
              className="mb-3 text-xs"
              style={{ color: "var(--t-muted)", fontFamily: "Inter, sans-serif" }}
            >
              {products.length} producto{products.length !== 1 ? "s" : ""} encontrado
              {products.length !== 1 ? "s" : ""}
            </p>

            {products.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  padding: "80px 20px",
                  background: "var(--t-card)",
                  borderRadius: "16px",
                  border: "1px solid var(--t-border)",
                }}
              >
                <Search
                  className="w-10 h-10"
                  style={{ color: "var(--t-muted)" }}
                  aria-hidden="true"
                />
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "var(--t-foreground)",
                    fontFamily: "Inter, sans-serif",
                    textAlign: "center",
                  }}
                >
                  Sin productos para esta búsqueda
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--t-muted)",
                    fontFamily: "Inter, sans-serif",
                    textAlign: "center",
                  }}
                >
                  Intentá ajustar los filtros o la búsqueda
                </p>
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={onClearAll}
                    style={{
                      padding: "10px 20px",
                      background: "transparent",
                      border: "1.5px solid var(--t-primary)",
                      borderRadius: "12px",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "var(--t-primary)",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            ) : (
              <div
                className={`grid ${gridColsClass(gridCols.mobile, gridCols.desktop)}`}
                style={{ gap: "var(--t-space-gap, 0.75rem)" }}
              >
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    currencySymbol={currencySymbol}
                    layout={layout}
                    onProductClick={onProductClick}
                    onAddToCart={onAddToCart}
                  />
                ))}
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
          if (tab === "search") onSearchClick?.();
          else if (tab === "cart") onCartClick?.();
          else onTabChange?.(tab);
        }}
      />
    </div>
  );
}
