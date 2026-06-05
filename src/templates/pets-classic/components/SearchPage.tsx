"use client";

// Pets Classic — Search Page
// SearchBar + grid of results. Empty state shows popular products.
// No results shows paw emoji message.
// All colors via var(--t-*). ZERO hardcoded hex.

import { useRef } from "react";
import { SearchBar } from "./SearchBar";
import { ProductCard } from "./ProductCard";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { gridColsClass } from "../utils/grid-classes";
import type { PetsClassicConfig } from "../config";
import { petsClassicConfig } from "../config";
import type {
  StoreInfo,
  PetsClassicProduct,
  NavTab,
} from "../types";

interface SearchPageProps {
  store: StoreInfo;
  allProducts: PetsClassicProduct[];
  popularProducts?: PetsClassicProduct[];
  popularSearches?: readonly string[];
  layout?: PetsClassicConfig["layout"];
  grid?: PetsClassicConfig["grid"];
  searchQuery?: string;
  activeTab?: NavTab;
  cartItemCount?: number;
  currencySymbol?: string;
  onSearchChange?: (value: string) => void;
  onSearchClear?: () => void;
  onProductClick?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
  onCartClick?: () => void;
  onSearchClick?: () => void;
  onMenuClick?: () => void;
  onTabChange?: (tab: NavTab) => void;
  onPopularSearchClick?: (query: string) => void;
}

export function SearchPage({
  store,
  allProducts,
  popularProducts,
  popularSearches = petsClassicConfig.popularSearches,
  layout,
  grid = petsClassicConfig.grid,
  searchQuery = "",
  activeTab = "home",
  cartItemCount = 0,
  currencySymbol = "$",
  onSearchChange,
  onSearchClear,
  onProductClick,
  onAddToCart,
  onCartClick,
  onSearchClick,
  onMenuClick,
  onTabChange,
  onPopularSearchClick,
}: SearchPageProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const query = searchQuery.trim().toLowerCase();
  const searchResults = query
    ? allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.tags?.some((t) => t.toLowerCase().includes(query))
      )
    : [];

  const displayProducts = popularProducts ?? allProducts.slice(0, 6);
  const hasResults = searchResults.length > 0;
  const noResults = query.length > 0 && !hasResults;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--t-background)", fontFamily: "var(--t-font, Poppins, sans-serif)" }}
    >
      <Header
        store={store}
        cartItemCount={cartItemCount}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
        onMenuClick={onMenuClick}
      />

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-4 pb-32 lg:pb-8">
        {/* Search bar */}
        <div className="mb-4">
          <SearchBar
            value={searchQuery}
            placeholder="Buscar productos para mascotas..."
            readOnly={false}
            inputRef={inputRef}
            onChange={onSearchChange}
            onClear={onSearchClear}
          />
        </div>

        {/* Popular searches */}
        {!query && popularSearches.length > 0 && (
          <div className="mb-6">
            <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--t-text-muted)", marginBottom: 8 }}>
              Búsquedas populares
            </p>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => onPopularSearchClick?.(term)}
                  className="px-3 py-1.5"
                  style={{
                    borderRadius: "var(--t-radius-button)",
                    border: "1px solid var(--t-border)",
                    backgroundColor: "var(--t-surface)",
                    color: "var(--t-text-secondary)",
                    fontSize: "12px",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* No results */}
        {noResults && (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <span style={{ fontSize: "48px" }}>🐾</span>
            <p style={{ fontSize: "16px", fontWeight: 700, color: "var(--t-text-primary)" }}>
              Sin resultados
            </p>
            <p style={{ fontSize: "13px", color: "var(--t-text-muted)" }}>
              No encontramos productos para{" "}
              <strong>&ldquo;{searchQuery}&rdquo;</strong>.
              <br />
              Intenta con otro término.
            </p>
          </div>
        )}

        {/* Search results */}
        {hasResults && (
          <section aria-label="Resultados de búsqueda">
            <p style={{ fontSize: "13px", color: "var(--t-text-muted)", marginBottom: 12 }}>
              {searchResults.length} resultado{searchResults.length !== 1 ? "s" : ""} para{" "}
              <strong>&ldquo;{searchQuery}&rdquo;</strong>
            </p>
            <div className={`grid ${gridColsClass(grid.search.mobile, grid.search.desktop)} gap-3`}>
              {searchResults.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currencySymbol={currencySymbol}
                  layout={layout}
                  onClick={() => onProductClick?.(product.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Popular / empty state */}
        {!query && (
          <section aria-labelledby="popular-search-heading">
            <h2
              id="popular-search-heading"
              style={{ fontSize: "15px", fontWeight: 700, color: "var(--t-text-primary)", marginBottom: 12 }}
            >
              Productos populares
            </h2>
            <div className={`grid ${gridColsClass(grid.search.mobile, grid.search.desktop)} gap-3`}>
              {displayProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currencySymbol={currencySymbol}
                  layout={layout}
                  onClick={() => onProductClick?.(product.id)}
                />
              ))}
            </div>
          </section>
        )}
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
