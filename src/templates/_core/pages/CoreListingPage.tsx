"use client";

// _core/pages/CoreListingPage.tsx
// Layout estructural de la página de catálogo/listado.
// FilterSidebar + sort selector + product grid + paginación.
// NO gestiona estado — todo viene como props.

import React, { memo } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { FilterSidebar } from "@/templates/_shared/FilterSidebar";
import { PRODUCT_CARD_REGISTRY } from "@/templates/_variants/product-card";
import { gridColsClass } from "@/templates/_shared/utils/grid-classes";
import { resolveStyleTokens } from "./style-tokens";
import { extractSectionProps } from "./extract-section-props";
import type { ResolvedStoreConfig } from "@/types/templates/resolved-config";
import type { StorefrontProduct } from "@/types/domain/store";
import type { ProductCardVariant } from "@/templates/_variants/product-card";
import type { FilterGroup } from "@/types/templates/filter";

const SORT_OPTIONS = [
  { value: "default", label: "Por calificación" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "recent", label: "Más recientes" },
] as const;

function getPageNumbers(currentPage: number, totalPages: number): (number | "...")[] {
  const pages: (number | "...")[] = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1, 2, 3);
    if (currentPage > 4) pages.push("...");
    if (currentPage > 3 && currentPage < totalPages - 2) pages.push(currentPage);
    if (currentPage < totalPages - 3) pages.push("...");
    pages.push(totalPages);
  }
  return pages;
}

interface CoreListingPageProps {
  config: ResolvedStoreConfig;
  variants: { productCard: ProductCardVariant };
  // Del useListingController
  filteredProducts: StorefrontProduct[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortOption: string;
  setSortOption: (s: string) => void;
  activeFilters: Record<string, string[]>;
  activeFilterCount: number;
  handleFilterChange: (groupId: string, optionId: string, checked: boolean) => void;
  handleClearAll: () => void;
  paginatedProducts: StorefrontProduct[];
  currentPage: number;
  setCurrentPage: (p: number) => void;
  totalPages: number;
  // Handlers
  onProductClick: (slug: string) => void;
  onAddToCart: (productId: string) => void;
  // Filter sidebar
  filterGroups: FilterGroup[];
  currencySymbol?: string;
  // Estado del drawer de filtros
  isFilterDrawerOpen?: boolean;
  onOpenFilterDrawer?: () => void;
  onCloseFilterDrawer?: () => void;
}

export const CoreListingPage = memo(function CoreListingPage({
  config,
  variants,
  filteredProducts,
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
  activeFilters,
  activeFilterCount,
  handleFilterChange,
  handleClearAll,
  paginatedProducts,
  currentPage,
  setCurrentPage,
  totalPages,
  onProductClick,
  onAddToCart,
  filterGroups,
  isFilterDrawerOpen = false,
  onOpenFilterDrawer,
  onCloseFilterDrawer,
  currencySymbol = "$",
}: CoreListingPageProps) {
  const ProductCardComponent = PRODUCT_CARD_REGISTRY[variants.productCard];

  const {
    buttonClass,
    badgeClass,
    priceConfig,
    cardBgClass,
    hoverFxClass,
    imageFitClass,
    imageHoverClass,
    cardBorderClass,
  } = resolveStyleTokens(config);

  const { showAddToCartInGrid, showDiscountBadge, showOriginalPrice } =
    extractSectionProps(config);
  const textCenter = (config as Record<string, unknown>).cardTextCenter === true;

  const grid = config.grid;
  const listingMobile = grid?.listing?.mobile ?? 2;
  const listingDesktop = grid?.listing?.desktop ?? 3;

  const pageNumbers = getPageNumbers(currentPage, totalPages);
  const displayCount = filteredProducts.length;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--t-background)" }}
    >
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8 pt-6 pb-[calc(80px+env(safe-area-inset-bottom,0px))] md:pb-10">
        <h1 className="sr-only">Catálogo</h1>

        {/* ── Barra de búsqueda ──────────────────────────────────────────── */}
        <div className="relative mb-5">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "var(--t-muted)" }}
          >
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full placeholder:text-[var(--t-muted)]"
            style={{
              paddingLeft: "40px",
              paddingRight: "16px",
              paddingTop: "11px",
              paddingBottom: "11px",
              background: "var(--t-background)",
              border: "1px solid var(--t-border)",
              borderRadius: "var(--t-radius-card, 12px)",
              fontSize: "14px",
              color: "var(--t-foreground)",
              outline: "none",
              boxSizing: "border-box",
            }}
            aria-label="Buscar productos"
          />
        </div>

        {/* ── Mobile: filtros + sort ─────────────────────────────────────── */}
        <div className="lg:hidden flex items-center gap-3 mb-4">
          <button
            type="button"
            onClick={onOpenFilterDrawer}
            aria-expanded={isFilterDrawerOpen}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold relative flex-shrink-0"
            style={{
              background: activeFilterCount > 0 ? "var(--t-primary)" : "var(--t-card)",
              border: "1px solid var(--t-border)",
              borderRadius: "var(--t-radius-button, 9999px)",
              color: activeFilterCount > 0 ? "var(--t-on-primary)" : "var(--t-foreground)",
              cursor: "pointer",
            }}
          >
            <SlidersHorizontal size={15} aria-hidden="true" />
            Filtrar
            {activeFilterCount > 0 && (
              <span
                className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full text-[10px] font-bold"
                style={{ background: "var(--t-on-primary)", color: "var(--t-primary)" }}
              >
                {activeFilterCount}
              </span>
            )}
          </button>
          <div className="relative flex-1">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full appearance-none pr-8 py-2 pl-3 text-sm"
              style={{
                background: "var(--t-background)",
                border: "1px solid var(--t-border)",
                borderRadius: "var(--t-radius-card, 12px)",
                color: "var(--t-foreground)",
                cursor: "pointer",
                outline: "none",
              }}
              aria-label="Ordenar productos"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "var(--t-muted)" }}
              aria-hidden="true"
            />
          </div>
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="flex items-center gap-1 px-2.5 py-2 text-xs flex-shrink-0"
              style={{
                border: "1px solid var(--t-border)",
                borderRadius: "var(--t-radius-button, 9999px)",
                background: "transparent",
                color: "var(--t-muted)",
                cursor: "pointer",
              }}
            >
              <X size={12} aria-hidden="true" />
              Limpiar
            </button>
          )}
        </div>

        {/* ── Conteo de resultados ───────────────────────────────────────── */}
        <p className="mb-4 text-sm" style={{ color: "var(--t-muted)" }}>
          <span className="font-semibold" style={{ color: "var(--t-foreground)" }}>
            {displayCount}
          </span>{" "}
          {displayCount === 1 ? "producto" : "productos"}
          {searchQuery.trim() && (
            <span>
              {" "}para{" "}
              <span className="font-medium" style={{ color: "var(--t-primary)" }}>
                &ldquo;{searchQuery}&rdquo;
              </span>
            </span>
          )}
        </p>

        {/* ── Layout principal: sidebar + grilla ────────────────────────── */}
        <div className="flex gap-6 items-start">
          <FilterSidebar
            filterGroups={filterGroups}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAll}
            isOpen={isFilterDrawerOpen}
            onClose={onCloseFilterDrawer ?? (() => {})}
          />

          {/* Área de productos */}
          <div className="flex flex-col gap-6 flex-1 min-w-0">
            {/* Sort desktop */}
            <div className="hidden lg:flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm"
                    style={{
                      border: "1px solid var(--t-border)",
                      borderRadius: "var(--t-radius-button, 9999px)",
                      background: "transparent",
                      color: "var(--t-muted)",
                      cursor: "pointer",
                    }}
                  >
                    <X size={13} aria-hidden="true" />
                    Limpiar filtros
                    <span
                      className="inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold ml-0.5"
                      style={{ background: "var(--t-primary)", color: "var(--t-on-primary)" }}
                    >
                      {activeFilterCount}
                    </span>
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm" style={{ color: "var(--t-muted)" }}>Ordenar por:</span>
                <div className="relative">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="appearance-none pr-8 py-2 pl-3 text-sm min-w-[160px]"
                    style={{
                      background: "var(--t-background)",
                      border: "1px solid var(--t-border)",
                      borderRadius: "var(--t-radius-card, 12px)",
                      color: "var(--t-foreground)",
                      cursor: "pointer",
                      outline: "none",
                    }}
                    aria-label="Ordenar productos"
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: "var(--t-muted)" }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            {/* Grid de productos o estado vacío */}
            {paginatedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  aria-hidden="true"
                  style={{ color: "var(--t-border)" }}
                >
                  <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" />
                  <path d="M16 24h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <p className="text-sm text-center" style={{ color: "var(--t-muted)" }}>
                  {searchQuery.trim()
                    ? `No se encontraron productos para "${searchQuery}"`
                    : "No hay productos con los filtros seleccionados"}
                </p>
                {(activeFilterCount > 0 || searchQuery.trim()) && (
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="px-5 py-2.5 text-sm font-semibold"
                    style={{
                      background: "var(--t-primary)",
                      color: "var(--t-on-primary)",
                      border: "none",
                      borderRadius: "var(--t-radius-button, 9999px)",
                      cursor: "pointer",
                    }}
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            ) : (
              <div
                className={`grid ${gridColsClass(listingMobile, listingDesktop)}`}
                style={{ gap: "var(--t-space-gap, 1rem)" }}
                aria-label="Listado de productos"
              >
                {paginatedProducts.map((product) => (
                  <ProductCardComponent
                    key={product.id}
                    product={product}
                    currencySymbol={currencySymbol}
                    onClick={onProductClick}
                    onAddToCart={onAddToCart}
                    buttonClass={buttonClass}
                    badgeClass={badgeClass}
                    priceConfig={priceConfig}
                    cardBgClass={cardBgClass}
                    cardBorderClass={cardBorderClass}
                    hoverFxClass={hoverFxClass}
                    imageHoverClass={imageHoverClass}
                    imageFitClass={imageFitClass}
                    showAddToCart={showAddToCartInGrid}
                    showDiscountBadge={showDiscountBadge}
                    showOriginalPrice={showOriginalPrice}
                    {...(textCenter ? { textCenter } : {})}
                  />
                ))}
              </div>
            )}

            {/* ── Paginación ─────────────────────────────────────────────── */}
            {totalPages > 1 && (
              <nav
                aria-label="Paginación"
                className="flex items-center justify-center gap-3 mt-2"
              >
                <button
                  type="button"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Página anterior"
                  className="w-7 h-7 flex items-center justify-center disabled:opacity-30"
                  style={{ background: "transparent", border: "none", cursor: "pointer" }}
                >
                  <ChevronLeft className="w-5 h-5" style={{ color: "var(--t-foreground)" }} />
                </button>

                <div className="flex items-center gap-1.5">
                  {pageNumbers.map((page, idx) =>
                    page === "..." ? (
                      <span
                        key={`dots-${idx}`}
                        className="px-1 text-sm"
                        style={{ color: "var(--t-muted)" }}
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page as number)}
                        aria-current={page === currentPage ? "page" : undefined}
                        className="px-3 py-1 rounded text-sm font-medium"
                        style={{
                          background:
                            page === currentPage
                              ? "var(--t-primary)"
                              : "var(--t-card)",
                          color:
                            page === currentPage
                              ? "var(--t-on-primary)"
                              : "var(--t-foreground)",
                          border: "none",
                          cursor: "pointer",
                          borderRadius: "var(--t-radius-button, 6px)",
                        }}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Página siguiente"
                  className="w-7 h-7 flex items-center justify-center disabled:opacity-30"
                  style={{ background: "transparent", border: "none", cursor: "pointer" }}
                >
                  <ChevronRight className="w-5 h-5" style={{ color: "var(--t-foreground)" }} />
                </button>
              </nav>
            )}
          </div>
        </div>
      </main>
    </div>
  );
});
