"use client";

// Furniture Dark — ListingPage
// Full filter + sort system. Desktop: sidebar + grid. Mobile: filter drawer + grid.
// ALL colors via var(--t-*). ZERO hardcoded colors.

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, SlidersHorizontal, Search, X } from "lucide-react";
import type { StoreInfo, StorefrontProduct, CategoryBannerData, FilterGroup, SortOption } from "../types";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";
import { FilterSidebar } from "../../_shared/FilterSidebar";
import { ProductCard } from "./ProductCard";
import { gridColsClass } from "../../_shared/utils/grid-classes";
import { bannerHeightClass } from "../utils/layout-classes";

interface ProductListingPageProps {
  store: StoreInfo;
  products: StorefrontProduct[];
  categoryBanner?: CategoryBannerData | null;
  cartItemCount?: number;
  activeHref?: string;
  gridMobile?: number;
  gridDesktop?: number;
  bannerHeight?: string;
  cardStyle?: string;
  hoverEffect?: string;
  imageRatio?: string;
  // Filter + sort props
  filters: FilterGroup[];
  activeFilters: Record<string, string[]>;
  sortOption: SortOption;
  sortOptions: { value: SortOption; label: string }[];
  searchQuery: string;
  isFilterOpen: boolean;
  totalCount: number;
  onFilterChange: (groupId: string, optionId: string, checked: boolean) => void;
  onClearAll: () => void;
  onSortChange: (sort: SortOption) => void;
  onSearchChange: (query: string) => void;
  onFilterToggle: () => void;
  onFilterClose: () => void;
  // Navigation props
  onBack: () => void;
  onProductClick: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
  onSearchClick: () => void;
  onCartClick: () => void;
  onNavLinkClick?: (href: string) => void;
  onBottomNavTab: (tab: "home" | "cart" | "search" | "info") => void;
}

export function ProductListingPage({
  store,
  products,
  categoryBanner,
  cartItemCount = 0,
  activeHref,
  gridMobile = 2,
  gridDesktop = 3,
  bannerHeight = "normal",
  cardStyle,
  hoverEffect,
  imageRatio,
  filters,
  activeFilters,
  sortOption,
  sortOptions,
  searchQuery,
  isFilterOpen,
  totalCount,
  onFilterChange,
  onClearAll,
  onSortChange,
  onSearchChange,
  onFilterToggle,
  onFilterClose,
  onBack,
  onProductClick,
  onAddToCart,
  onSearchClick,
  onCartClick,
  onNavLinkClick,
  onBottomNavTab,
}: ProductListingPageProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const activeFilterCount = Object.values(activeFilters).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  function handleSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    setLocalSearch(e.target.value);
    onSearchChange(e.target.value);
  }

  function handleSearchClear() {
    setLocalSearch("");
    onSearchChange("");
  }

  // Collect active filter pills for display
  const activePills: { groupId: string; optionId: string; label: string }[] = [];
  for (const group of filters) {
    const selected = activeFilters[group.id] ?? [];
    for (const optId of selected) {
      const opt = group.options.find((o) => o.id === optId);
      if (opt) activePills.push({ groupId: group.id, optionId: optId, label: opt.label });
    }
  }

  return (
    <div
      className="min-h-screen pb-28 lg:pb-12"
      style={{ backgroundColor: "var(--t-background)" }}
    >
      <Header
        store={store}
        cartItemCount={cartItemCount}
        activeHref={activeHref}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
        onNavLinkClick={onNavLinkClick}
      />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-4">
        {/* Back + title row */}
        <div className="flex items-center gap-3 mb-5">
          <button
            type="button"
            className="flex items-center justify-center w-9 h-9 rounded-full transition-opacity hover:opacity-80"
            style={{ backgroundColor: "var(--t-surface)" }}
            onClick={onBack}
            aria-label="Volver"
          >
            <ChevronLeft size={18} strokeWidth={2} style={{ color: "var(--t-foreground)" }} />
          </button>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "var(--t-type-heading-size, 1.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "var(--t-foreground)",
            }}
          >
            Catálogo
          </h1>

          {/* Filter button (mobile only — desktop uses sidebar) */}
          <button
            type="button"
            onClick={onFilterToggle}
            className="lg:hidden ml-auto flex items-center gap-2 px-3.5 py-2 relative"
            style={{
              backgroundColor: "var(--t-surface)",
              borderRadius: "var(--t-radius-button, 28px)",
              border: "1px solid var(--t-border)",
            }}
            aria-label="Filtros"
          >
            <SlidersHorizontal size={14} strokeWidth={2} style={{ color: "var(--t-foreground)" }} />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                color: "var(--t-foreground)",
              }}
            >
              Filtros
            </span>
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
                  color: "var(--t-background)",
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

        {/* Search bar */}
        <div
          className="relative mb-4"
          style={{ maxWidth: "480px" }}
        >
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--t-muted)",
            }}
            aria-hidden="true"
          />
          <input
            type="text"
            value={localSearch}
            onChange={handleSearchInput}
            placeholder="Buscar productos..."
            style={{
              width: "100%",
              paddingLeft: "36px",
              paddingRight: localSearch ? "36px" : "12px",
              paddingTop: "10px",
              paddingBottom: "10px",
              background: "var(--t-surface)",
              color: "var(--t-foreground)",
              border: "1px solid var(--t-border)",
              borderRadius: "var(--t-radius-button, 28px)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              outline: "none",
            }}
            aria-label="Buscar productos"
          />
          {localSearch && (
            <button
              type="button"
              onClick={handleSearchClear}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "2px",
                display: "flex",
                alignItems: "center",
              }}
              aria-label="Limpiar búsqueda"
            >
              <X size={14} style={{ color: "var(--t-muted)" }} />
            </button>
          )}
        </div>

        {/* Sort + result count row */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              color: "var(--t-muted)",
            }}
          >
            {products.length} {products.length === 1 ? "producto" : "productos"}
            {products.length !== totalCount && (
              <span> de {totalCount}</span>
            )}
          </p>
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            style={{
              background: "var(--t-surface)",
              color: "var(--t-foreground)",
              border: "1px solid var(--t-border)",
              borderRadius: "var(--t-radius-button, 28px)",
              padding: "8px 12px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              cursor: "pointer",
              outline: "none",
            }}
            aria-label="Ordenar productos"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Active filter pills */}
        {activePills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {activePills.map((pill) => (
              <button
                key={`${pill.groupId}-${pill.optionId}`}
                type="button"
                onClick={() => onFilterChange(pill.groupId, pill.optionId, false)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 10px",
                  background: "var(--t-surface)",
                  border: "1px solid var(--t-primary)",
                  borderRadius: "var(--t-radius-category, 28px)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "var(--t-primary)",
                  cursor: "pointer",
                  transition: "opacity 200ms ease",
                }}
                aria-label={`Quitar filtro: ${pill.label}`}
              >
                {pill.label}
                <X size={12} aria-hidden="true" />
              </button>
            ))}
            <button
              type="button"
              onClick={onClearAll}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "5px 10px",
                background: "transparent",
                border: "1px solid var(--t-border)",
                borderRadius: "var(--t-radius-category, 28px)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                fontWeight: 500,
                color: "var(--t-muted)",
                cursor: "pointer",
              }}
              aria-label="Limpiar todos los filtros"
            >
              Limpiar todo
            </button>
          </div>
        )}

        {/* Category banner */}
        {categoryBanner && (
          <div
            className={`relative w-full overflow-hidden mb-6 ${bannerHeightClass(bannerHeight)}`}
            style={{ borderRadius: "var(--t-radius-card)" }}
          >
            <Image
              src={categoryBanner.image}
              alt={categoryBanner.title ?? "Banner de categoría"}
              fill
              sizes="(max-width: 768px) 100vw, 1280px"
              className="object-cover"
            />
            {categoryBanner.title && (
              <div className="absolute inset-0 flex items-end p-5" style={{ background: "rgba(0,0,0,0.4)" }}>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "24px",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    color: "var(--t-foreground)",
                  }}
                >
                  {categoryBanner.title}
                </h2>
              </div>
            )}
          </div>
        )}

        {/* Desktop: sidebar + grid layout */}
        <div className="lg:flex lg:gap-6 lg:items-start">
          {/* FilterSidebar — desktop static, mobile drawer */}
          <FilterSidebar
            filterGroups={filters}
            activeFilters={activeFilters}
            onFilterChange={onFilterChange}
            onClearAll={onClearAll}
            isOpen={isFilterOpen}
            onClose={onFilterClose}
          />

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "16px",
                    color: "var(--t-muted)",
                    textAlign: "center",
                  }}
                >
                  No se encontraron productos
                </p>
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={onClearAll}
                    style={{
                      padding: "10px 20px",
                      background: "var(--t-primary)",
                      color: "var(--t-background)",
                      border: "none",
                      borderRadius: "var(--t-radius-button, 28px)",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "opacity 200ms ease",
                    }}
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            ) : (
              <div
                className={`grid ${gridColsClass(gridMobile, gridDesktop)}`}
                style={{ gap: "var(--t-space-gap, 1rem)" }}
              >
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={onProductClick}
                    onAddToCart={onAddToCart}
                    cardStyle={cardStyle}
                    hoverEffect={hoverEffect}
                    imageRatio={imageRatio}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomNav
        activeTab="home"
        cartItemCount={cartItemCount}
        onTab={onBottomNavTab}
      />
    </div>
  );
}
