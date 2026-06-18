// Decor Warm Template — Product Listing Page (Presentational)
// Desktop: sidebar filters (left) + product grid (right) + search + sort.
// Mobile: filter drawer button + search + grid.
// ZERO hardcoded colors — all via var(--t-*).

import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Header } from "./Header";
import { ProductCard } from "./ProductCard";
import { BottomNav } from "./BottomNav";
import { FilterSidebar } from "../../_shared/FilterSidebar";
import { gridColsClass } from "../../_shared/utils/grid-classes";
import type { StorefrontProduct, DecorWarmNavTab, FilterGroup, SortOption } from "../types";
import type { DecorWarmConfig } from "../config";
import type { StoreInfo } from "@/types/store";

interface ProductListingPageProps {
  store: StoreInfo;
  products: StorefrontProduct[];
  cartItemCount?: number;
  currencySymbol?: string;
  layout?: DecorWarmConfig["layout"];
  grid?: DecorWarmConfig["grid"];
  filters?: FilterGroup[];
  activeFilters?: Record<string, string[]>;
  searchQuery?: string;
  sortOption?: SortOption;
  filteredCount?: number;
  activeFilterCount?: number;
  isFilterDrawerOpen?: boolean;
  onSearchOpen?: () => void;
  onCartOpen?: () => void;
  onNavLinkClick?: (href: string) => void;
  onProductClick?: (productId: string) => void;
  onAddToCart?: (product: StorefrontProduct) => void;
  onTabChange?: (tab: DecorWarmNavTab) => void;
  onFilterChange?: (groupId: string, optionId: string, checked: boolean) => void;
  onClearAll?: () => void;
  onFilterDrawerToggle?: () => void;
  onFilterDrawerClose?: () => void;
  onSearchQueryChange?: (q: string) => void;
  onSortChange?: (sort: SortOption) => void;
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
  cartItemCount = 0,
  currencySymbol = "$",
  layout,
  grid,
  filters = [],
  activeFilters = {},
  searchQuery = "",
  sortOption = "recent",
  filteredCount,
  activeFilterCount = 0,
  isFilterDrawerOpen = false,
  onSearchOpen,
  onCartOpen,
  onNavLinkClick,
  onProductClick,
  onAddToCart,
  onTabChange,
  onFilterChange,
  onClearAll,
  onFilterDrawerToggle,
  onFilterDrawerClose,
  onSearchQueryChange,
  onSortChange,
}: ProductListingPageProps) {
  const listingGridClass = gridColsClass(
    grid?.listing?.mobile ?? 2,
    grid?.listing?.desktop ?? 3
  );

  const displayCount = filteredCount ?? products.length;
  const currentSortLabel =
    SORT_OPTIONS.find((o) => o.value === sortOption)?.label ?? "Más recientes";

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--t-background)" }}>
      <Header
        store={store}
        cartItemCount={cartItemCount}
        activeHref="/catalogo"
        onSearchClick={onSearchOpen}
        onCartClick={onCartOpen}
        onNavLinkClick={onNavLinkClick}
      />

      <main
        className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8 py-4"
        style={{ paddingBottom: "calc(80px + env(safe-area-inset-bottom, 0px))" }}
      >
        {/* ── Search bar (full width, above layout) ── */}
        <div style={{ position: "relative", marginBottom: "20px" }}>
          <Search
            className="w-4 h-4"
            style={{
              position: "absolute",
              left: "14px",
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
            onChange={(e) => onSearchQueryChange?.(e.target.value)}
            placeholder="Buscar productos..."
            style={{
              width: "100%",
              paddingLeft: "40px",
              paddingRight: "16px",
              paddingTop: "11px",
              paddingBottom: "11px",
              background: "var(--t-card)",
              border: "1px solid var(--t-border)",
              borderRadius: "var(--t-radius-card, 14px)",
              fontSize: "14px",
              color: "var(--t-foreground)",
              outline: "none",
              fontFamily: "inherit",
              boxSizing: "border-box",
              transition: "border-color 200ms ease, box-shadow 200ms ease",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--t-primary)";
              e.currentTarget.style.boxShadow = "0 0 0 3px color-mix(in srgb, var(--t-primary) 15%, transparent)";
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
          <button
            type="button"
            onClick={onFilterDrawerToggle}
            aria-expanded={isFilterDrawerOpen}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              background: activeFilterCount > 0 ? "var(--t-primary)" : "var(--t-card)",
              border: "1px solid var(--t-border)",
              borderRadius: "var(--t-radius-button, 30px)",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 600,
              color: activeFilterCount > 0 ? "var(--t-on-primary, #fff)" : "var(--t-foreground)",
              transition: "background 200ms ease, color 200ms ease",
              flexShrink: 0,
            }}
          >
            <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
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
                  background: "var(--t-on-primary, #fff)",
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
              onChange={(e) => onSortChange?.(e.target.value as SortOption)}
              style={{
                width: "100%",
                padding: "8px 36px 8px 12px",
                background: "var(--t-card)",
                border: "1px solid var(--t-border)",
                borderRadius: "var(--t-radius-card, 14px)",
                fontSize: "13px",
                color: "var(--t-foreground)",
                cursor: "pointer",
                appearance: "none",
                outline: "none",
                fontFamily: "inherit",
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
              className="w-4 h-4"
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

        {/* ── Desktop + mobile: result counter ── */}
        <div
          style={{
            marginBottom: "16px",
            fontSize: "13px",
            color: "var(--t-muted)",
          }}
        >
          <span style={{ fontWeight: 500, color: "var(--t-foreground)" }}>
            {displayCount}
          </span>{" "}
          {displayCount === 1 ? "producto" : "productos"}
          {searchQuery && (
            <span>
              {" "}para{" "}
              <span style={{ color: "var(--t-primary)", fontWeight: 500 }}>
                &ldquo;{searchQuery}&rdquo;
              </span>
            </span>
          )}
        </div>

        {/* ── Main layout: sidebar + grid ── */}
        <div className="flex gap-6 items-start">
          {/* Filter sidebar (desktop inside layout, mobile uses drawer) */}
          <FilterSidebar
            filterGroups={filters ?? []}
            activeFilters={activeFilters ?? {}}
            onFilterChange={onFilterChange ?? (() => {})}
            onClearAll={onClearAll ?? (() => {})}
            isOpen={isFilterDrawerOpen ?? false}
            onClose={onFilterDrawerClose ?? (() => {})}
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
              <span style={{ fontSize: "13px", color: "var(--t-muted)" }}>
                Ordenar por:
              </span>
              <div style={{ position: "relative" }}>
                <select
                  value={sortOption}
                  onChange={(e) => onSortChange?.(e.target.value as SortOption)}
                  style={{
                    padding: "8px 36px 8px 12px",
                    background: "var(--t-card)",
                    border: "1px solid var(--t-border)",
                    borderRadius: "var(--t-radius-card, 14px)",
                    fontSize: "13px",
                    color: "var(--t-foreground)",
                    cursor: "pointer",
                    appearance: "none",
                    outline: "none",
                    fontFamily: "inherit",
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
                  className="w-4 h-4"
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
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <p
                  style={{
                    color: "var(--t-muted)",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "14px",
                    margin: 0,
                    textAlign: "center",
                  }}
                >
                  {searchQuery
                    ? `No se encontraron productos para "${searchQuery}"`
                    : "No hay productos con los filtros seleccionados"}
                </p>
                {(activeFilterCount > 0 || searchQuery) && (
                  <button
                    type="button"
                    onClick={onClearAll}
                    style={{
                      padding: "8px 20px",
                      background: "var(--t-primary)",
                      color: "var(--t-on-primary, #fff)",
                      border: "none",
                      borderRadius: "var(--t-radius-button, 30px)",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: 600,
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            ) : (
              <div
                className={`grid ${listingGridClass}`}
                style={{ gap: "var(--t-space-gap, 1rem)" }}
                aria-label="Listado de productos"
              >
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    currencySymbol={currencySymbol}
                    layout={layout}
                    onClick={onProductClick ? () => onProductClick(product.id) : undefined}
                    onAddToCart={onAddToCart ? () => onAddToCart(product) : undefined}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <BottomNav
        activeTab="categories"
        cartItemCount={cartItemCount}
        onTabChange={onTabChange}
      />
    </div>
  );
}
