"use client";

// Beauty Elegant Template — Product Listing Page (Presentational)
// Desktop: sidebar filters (left) + product grid (right) + search + sort.
// Mobile: filter drawer button + search + grid.
// ZERO hardcoded colors — all via var(--t-*).

import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { FilterSidebar } from "../../_shared/FilterSidebar";
import { Header } from "./Header";
import { gridColsClass } from "../../_shared/utils/grid-classes";
import type {
  BeautyElegantProduct,
  BeautyElegantCategory,
  BeautyElegantSortOption,
  NavTab,
} from "../types";
import type { FilterGroup } from "@/types/templates/filter";
import type { StoreInfo } from "../types";

interface ProductListingPageProps {
  store: StoreInfo;
  categories: BeautyElegantCategory[];
  products: BeautyElegantProduct[];
  filteredProducts: BeautyElegantProduct[];
  currencySymbol?: string;
  layout?: {
    cardStyle?: string;
    cardHoverEffect?: string;
    cardImageRatio?: string;
    footerStyle?: string;
  };
  grid?: {
    listing?: { mobile: number; desktop: number };
  };
  // Filter props
  filterGroups: FilterGroup[];
  activeFilters: Record<string, string[]>;
  activeFilterCount: number;
  searchQuery: string;
  sortOption: BeautyElegantSortOption;
  isFilterDrawerOpen: boolean;
  // Handlers
  onFilterChange: (groupId: string, optionId: string, checked: boolean) => void;
  onClearAll: () => void;
  onSearchChange: (q: string) => void;
  onSortChange: (sort: BeautyElegantSortOption) => void;
  onOpenFilterDrawer: () => void;
  onCloseFilterDrawer: () => void;
  onProductClick?: (productId: string) => void;
  onBack?: () => void;
  onTabChange?: (tab: NavTab) => void;
  onNavLinkClick?: (href: string) => void;
  onSearchOpen?: () => void;
  onCartOpen?: () => void;
  cartItemCount?: number;
}

const SORT_OPTIONS: { value: BeautyElegantSortOption; label: string }[] = [
  { value: "recent", label: "Más recientes" },
  { value: "price-asc", label: "Menor precio" },
  { value: "price-desc", label: "Mayor precio" },
];

export function ProductListingPage({
  store,
  categories: _categories,
  products: _products,
  filteredProducts,
  currencySymbol = "$",
  layout,
  grid,
  filterGroups,
  activeFilters,
  activeFilterCount,
  searchQuery,
  sortOption,
  isFilterDrawerOpen,
  onFilterChange,
  onClearAll,
  onSearchChange,
  onSortChange,
  onOpenFilterDrawer,
  onCloseFilterDrawer,
  onProductClick,
  onBack,
  onTabChange,
  onNavLinkClick,
  onSearchOpen,
  onCartOpen,
  cartItemCount = 0,
}: ProductListingPageProps) {
  const listingGrid = grid?.listing ?? { mobile: 2, desktop: 4 };
  const gridClass = gridColsClass(listingGrid.mobile, listingGrid.desktop);

  const displayCount = filteredProducts.length;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--t-background)" }}>
      {/* Desktop shared header */}
      <Header
        store={store}
        cartItemCount={cartItemCount}
        activeHref="/catalogo"
        onSearchOpen={onSearchOpen}
        onCartOpen={onCartOpen}
        onNavLinkClick={onNavLinkClick}
      />

      {/* Main */}
      <main
        className="flex-1 max-w-7xl mx-auto w-full px-5 md:px-6 lg:px-8 pt-6"
        style={{ paddingBottom: "calc(80px + env(safe-area-inset-bottom, 0px))" }}
      >
        {/* ── Search bar (full width) ── */}
        <div style={{ position: "relative", marginBottom: "20px" }}>
          {/* Search icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--t-muted)",
              pointerEvents: "none",
            }}
          >
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar productos..."
            style={{
              width: "100%",
              paddingLeft: "40px",
              paddingRight: "16px",
              paddingTop: "11px",
              paddingBottom: "11px",
              background: "var(--t-card)",
              border: "1px solid var(--t-border)",
              borderRadius: "var(--t-radius-card, 16px)",
              fontSize: "14px",
              color: "var(--t-foreground)",
              outline: "none",
              fontFamily: "'Inter', sans-serif",
              boxSizing: "border-box",
              transition: "border-color 200ms ease, box-shadow 200ms ease",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--t-primary)";
              e.currentTarget.style.boxShadow =
                "0 0 0 3px color-mix(in srgb, var(--t-primary) 15%, transparent)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--t-border)";
              e.currentTarget.style.boxShadow = "none";
            }}
            aria-label="Buscar productos"
          />
        </div>

        {/* ── Mobile: filter + sort bar ── */}
        <div className="lg:hidden flex items-center gap-3 mb-4">
          {/* Filter button */}
          <button
            type="button"
            onClick={onOpenFilterDrawer}
            aria-expanded={isFilterDrawerOpen}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              background: activeFilterCount > 0 ? "var(--t-primary)" : "var(--t-card)",
              border: "1px solid var(--t-border)",
              borderRadius: "var(--t-radius-button, 9999px)",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 600,
              color: activeFilterCount > 0 ? "var(--t-on-primary)" : "var(--t-foreground)",
              transition: "background 200ms ease, color 200ms ease",
              flexShrink: 0,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <SlidersHorizontal size={15} aria-hidden="true" />
            Filtrar
            {activeFilterCount > 0 && (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  background: "var(--t-on-primary)",
                  color: "var(--t-primary)",
                  fontSize: "10px",
                  fontWeight: 700,
                }}
              >
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort dropdown mobile */}
          <div style={{ position: "relative", flex: 1 }}>
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value as BeautyElegantSortOption)}
              style={{
                width: "100%",
                padding: "8px 36px 8px 12px",
                background: "var(--t-card)",
                border: "1px solid var(--t-border)",
                borderRadius: "var(--t-radius-card, 16px)",
                fontSize: "13px",
                color: "var(--t-foreground)",
                cursor: "pointer",
                appearance: "none",
                outline: "none",
                fontFamily: "'Inter', sans-serif",
              }}
              aria-label="Ordenar productos"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
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
        </div>

        {/* ── Result counter ── */}
        <div
          style={{
            marginBottom: "16px",
            fontSize: "13px",
            color: "var(--t-muted)",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <span style={{ fontWeight: 500, color: "var(--t-foreground)" }}>
            {displayCount}
          </span>{" "}
          {displayCount === 1 ? "producto" : "productos"}
          {searchQuery.trim() && (
            <span>
              {" "}para{" "}
              <span style={{ color: "var(--t-primary)", fontWeight: 500 }}>
                &ldquo;{searchQuery}&rdquo;
              </span>
            </span>
          )}
          {activeFilterCount > 0 && !searchQuery.trim() && (
            <span style={{ color: "var(--t-muted)" }}> encontrados</span>
          )}
        </div>

        {/* ── Main layout: sidebar + products ── */}
        <div className="flex gap-6 items-start">
          {/* Filter sidebar (desktop inside layout, mobile uses drawer) */}
          <FilterSidebar
            filterGroups={filterGroups}
            activeFilters={activeFilters}
            onFilterChange={onFilterChange}
            onClearAll={onClearAll}
            isOpen={isFilterDrawerOpen}
            onClose={onCloseFilterDrawer}
          />

          {/* Products area */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Desktop sort bar */}
            <div
              className="hidden lg:flex"
              style={{
                alignItems: "center",
                justifyContent: "flex-end",
                marginBottom: "16px",
                gap: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  color: "var(--t-muted)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Ordenar por:
              </span>
              <div style={{ position: "relative" }}>
                <select
                  value={sortOption}
                  onChange={(e) => onSortChange(e.target.value as BeautyElegantSortOption)}
                  style={{
                    padding: "8px 36px 8px 12px",
                    background: "var(--t-card)",
                    border: "1px solid var(--t-border)",
                    borderRadius: "var(--t-radius-card, 16px)",
                    fontSize: "13px",
                    color: "var(--t-foreground)",
                    cursor: "pointer",
                    appearance: "none",
                    outline: "none",
                    fontFamily: "'Inter', sans-serif",
                    minWidth: "160px",
                  }}
                  aria-label="Ordenar productos"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
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
            </div>

            {/* Product grid or empty state */}
            {filteredProducts.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "80px 16px",
                  gap: "12px",
                }}
              >
                {/* Empty icon */}
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  aria-hidden="true"
                  style={{ color: "var(--t-border)" }}
                >
                  <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M16 24h16M24 16v16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <p
                  style={{
                    color: "var(--t-muted)",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    margin: 0,
                    textAlign: "center",
                  }}
                >
                  {searchQuery.trim()
                    ? `No se encontraron productos para "${searchQuery}"`
                    : "No hay productos con los filtros seleccionados"}
                </p>
                {(activeFilterCount > 0 || searchQuery.trim()) && (
                  <button
                    type="button"
                    onClick={onClearAll}
                    style={{
                      padding: "10px 24px",
                      background: "var(--t-primary)",
                      color: "var(--t-on-primary)",
                      border: "none",
                      borderRadius: "var(--t-radius-button, 9999px)",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: 600,
                      fontFamily: "'Inter', sans-serif",
                      transition: "opacity 200ms ease",
                    }}
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            ) : (
              <div
                className={`grid ${gridClass}`}
                style={{ gap: "var(--t-space-gap, 1rem)" }}
                aria-label="Listado de productos"
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    currencySymbol={currencySymbol}
                    layout={layout}
                    onClick={() => onProductClick?.(product.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer store={store} layout={layout} />
      <BottomNav
        activeTab="search"
        cartItemCount={cartItemCount}
        onTabChange={onTabChange}
      />
    </div>
  );
}
