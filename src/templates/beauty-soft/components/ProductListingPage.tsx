"use client";

// Beauty Soft Template — Product Listing Page (Presentational)
// Desktop: filter sidebar (left) + search/sort + product grid (right).
// Mobile: filter drawer button + search bar + product grid.
// ZERO hardcoded colors — all via var(--t-*).

import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { Header } from "./Header";
import { ProductCard } from "./ProductCard";
import { BottomNav } from "./BottomNav";
import { FilterSidebar } from "./FilterSidebar";
import { gridColsClass } from "../utils/grid-classes";
import type { BeautySoftProduct, BeautySoftCategory, NavTab, FilterGroup, SortOption } from "../types";
import type { BeautySoftConfig } from "../config";
import type { StoreInfo } from "@/types/store";

type LayoutConfig = BeautySoftConfig["layout"];
type GridConfig = BeautySoftConfig["grid"];

interface ProductListingPageProps {
  store: StoreInfo;
  categories: BeautySoftCategory[];
  products: BeautySoftProduct[];
  filteredProducts: BeautySoftProduct[];
  activeCategoryId?: string | null;
  activeTab?: NavTab;
  cartItemCount?: number;
  currencySymbol?: string;
  layout?: LayoutConfig;
  grid?: GridConfig;
  activeHref?: string;
  // Filter props
  filterGroups: FilterGroup[];
  activeFilters: Record<string, string[]>;
  activeFilterCount: number;
  searchQuery: string;
  sortOption: SortOption;
  isFilterDrawerOpen: boolean;
  // Handlers
  onFilterChange: (groupId: string, optionId: string, checked: boolean) => void;
  onClearAll: () => void;
  onSearchChange: (q: string) => void;
  onSortChange: (sort: SortOption) => void;
  onOpenFilterDrawer: () => void;
  onCloseFilterDrawer: () => void;
  onBack?: () => void;
  onSearchOpen?: () => void;
  onCartClick?: () => void;
  onProductClick?: (productId: string) => void;
  onTabChange?: (tab: NavTab) => void;
  onNavLinkClick?: (href: string) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "recent", label: "Más recientes" },
  { value: "price-asc", label: "Menor precio" },
  { value: "price-desc", label: "Mayor precio" },
  { value: "rating", label: "Mejor valorados" },
];

export function ProductListingPage({
  store,
  filteredProducts,
  currencySymbol = "$",
  layout,
  grid,
  activeTab = "home",
  cartItemCount = 0,
  activeHref,
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
  onSearchOpen,
  onCartClick,
  onProductClick,
  onTabChange,
  onNavLinkClick,
}: ProductListingPageProps) {
  const listingGrid = grid?.listing ?? { mobile: 2, desktop: 3 };
  const gridClass = gridColsClass(listingGrid.mobile, listingGrid.desktop);

  const displayCount = filteredProducts.length;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--t-background)" }}
    >
      <Header
        store={store}
        cartItemCount={cartItemCount}
        activeHref={activeHref}
        onSearchClick={onSearchOpen}
        onCartClick={onCartClick}
        onNavLinkClick={onNavLinkClick}
      />

      <main
        className="flex-1 max-w-6xl mx-auto w-full px-5 md:px-6 lg:px-8 pt-6"
        style={{ paddingBottom: "calc(100px + env(safe-area-inset-bottom, 0px))" }}
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
            <path
              d="M10.5 10.5L13.5 13.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
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
              borderRadius: "20px",
              fontSize: "14px",
              color: "var(--t-foreground)",
              outline: "none",
              fontFamily: "'Inter', var(--font-sans), sans-serif",
              boxSizing: "border-box",
              transition: "border-color 200ms ease, box-shadow 200ms ease",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--t-primary)";
              e.currentTarget.style.boxShadow =
                "0 0 0 3px color-mix(in srgb, var(--t-primary) 12%, transparent)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--t-border)";
              e.currentTarget.style.boxShadow = "none";
            }}
            aria-label="Buscar productos"
          />
        </div>

        {/* ── Mobile: filter button + sort dropdown ── */}
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
              padding: "9px 16px",
              background: activeFilterCount > 0 ? "var(--t-primary)" : "var(--t-card)",
              border: "1px solid var(--t-border)",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 600,
              color: activeFilterCount > 0 ? "var(--t-on-primary)" : "var(--t-foreground)",
              transition: "background 200ms ease, color 200ms ease",
              flexShrink: 0,
              fontFamily: "'Inter', var(--font-sans), sans-serif",
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

          {/* Sort dropdown — mobile */}
          <div style={{ position: "relative", flex: 1 }}>
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              style={{
                width: "100%",
                padding: "9px 36px 9px 12px",
                background: "var(--t-card)",
                border: "1px solid var(--t-border)",
                borderRadius: "20px",
                fontSize: "13px",
                color: "var(--t-foreground)",
                cursor: "pointer",
                appearance: "none",
                outline: "none",
                fontFamily: "'Inter', var(--font-sans), sans-serif",
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
            fontFamily: "'Inter', var(--font-sans), sans-serif",
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

        {/* ── Main layout: sidebar + product area ── */}
        <div className="flex gap-6 items-start">
          {/* Filter sidebar — desktop static / mobile drawer */}
          <FilterSidebar
            filterGroups={filterGroups}
            activeFilters={activeFilters}
            onFilterChange={onFilterChange}
            onClearAll={onClearAll}
            activeFilterCount={activeFilterCount}
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
                  fontFamily: "'Inter', var(--font-sans), sans-serif",
                }}
              >
                Ordenar por:
              </span>
              <div style={{ position: "relative" }}>
                <select
                  value={sortOption}
                  onChange={(e) => onSortChange(e.target.value as SortOption)}
                  style={{
                    padding: "8px 36px 8px 12px",
                    background: "var(--t-card)",
                    border: "1px solid var(--t-border)",
                    borderRadius: "20px",
                    fontSize: "13px",
                    color: "var(--t-foreground)",
                    cursor: "pointer",
                    appearance: "none",
                    outline: "none",
                    fontFamily: "'Inter', var(--font-sans), sans-serif",
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
                {/* Empty icon — soft circle */}
                <svg
                  width="52"
                  height="52"
                  viewBox="0 0 52 52"
                  fill="none"
                  aria-hidden="true"
                  style={{ color: "var(--t-border)" }}
                >
                  <circle cx="26" cy="26" r="22" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M18 26h16M26 18v16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <p
                  style={{
                    color: "var(--t-muted)",
                    fontFamily: "'Inter', var(--font-sans), sans-serif",
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
                      borderRadius: "29px",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: 600,
                      fontFamily: "'Inter', var(--font-sans), sans-serif",
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
                style={{ gap: "var(--t-space-gap, 0.75rem)" }}
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

      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
