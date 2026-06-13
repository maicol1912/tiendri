// Tech Premium Template — Search Page
// Full-width search bar with autofocus, popular search suggestions,
// and a results grid. Visual only — handlers come as props.

import { type RefObject } from "react";
import { Search, X } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { ProductCard } from "./ProductCard";
import { gridColsClass } from "../utils/grid-classes";
import type { TechPremiumConfig } from "../config";
import type { StoreInfo, StorefrontProduct, NavTab } from "../types";

interface SearchPageProps {
  store: StoreInfo;
  navLinks: readonly { label: string; href: string }[];
  footerServices: readonly string[];
  footerAssistance: readonly string[];
  searchQuery: string;
  results: StorefrontProduct[];
  activeTab?: NavTab;
  cartItemCount?: number;
  currencySymbol?: string;
  suggestions?: readonly string[];
  grid: TechPremiumConfig["grid"];
  onSearchChange?: (query: string) => void;
  onSearchClear?: () => void;
  onSuggestionClick?: (suggestion: string) => void;
  onProductClick?: (productId: string) => void;
  onWishlistToggle?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
  onCartClick?: () => void;
  onTabChange?: (tab: NavTab) => void;
  onNavLinkClick?: (href: string) => void;
  inputRef?: RefObject<HTMLInputElement | null>;
}

export function SearchPage({
  store,
  navLinks,
  footerServices,
  footerAssistance,
  searchQuery,
  results,
  activeTab = "search",
  cartItemCount = 0,
  currencySymbol = "$",
  suggestions = [],
  grid,
  onSearchChange,
  onSearchClear,
  onSuggestionClick,
  onProductClick,
  onWishlistToggle,
  onAddToCart,
  onCartClick,
  onTabChange,
  onNavLinkClick,
  inputRef,
}: SearchPageProps) {
  const isEmpty = searchQuery.trim() === "";
  const noResults = !isEmpty && results.length === 0;

  return (
    <div className="bg-[var(--t-section-bg)] min-h-screen font-['Inter',sans-serif] flex flex-col">
      {/* Header */}
      <Header
        store={store}
        navLinks={navLinks}
        cartItemCount={cartItemCount}
        onCartClick={onCartClick}
        onNavLinkClick={onNavLinkClick}
      />

      {/* Search bar */}
      <div className="px-4 pt-6 pb-4 lg:px-[160px] lg:pt-10 lg:pb-6">
        <div className="bg-[var(--t-search-bg)] rounded-lg flex items-center gap-3 px-4 py-3 lg:py-4 lg:max-w-2xl">
          <Search className="w-5 h-5 text-[var(--t-text-muted)] shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Buscar productos..."
            className="flex-1 bg-transparent border-none outline-none text-base text-[var(--t-text-primary)] placeholder:text-[var(--t-text-muted)]/50 font-medium"
            aria-label="Buscar productos"
            role="searchbox"
          />
          {!isEmpty && (
            <button
              type="button"
              className="p-0 bg-transparent border-none cursor-pointer"
              onClick={onSearchClear}
              aria-label="Limpiar búsqueda"
            >
              <X className="w-5 h-5 text-[var(--t-text-muted)]" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-10 lg:px-[160px] lg:pb-20">
        {isEmpty ? (
          /* Empty state: popular searches */
          <div className="flex flex-col gap-6 pt-8">
            <h2 className="text-lg font-medium text-[var(--t-text-primary)]">Búsquedas populares</h2>
            <div className="flex flex-wrap gap-3">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="px-5 py-2.5 bg-[var(--t-card-bg)] rounded-lg text-sm font-medium text-[var(--t-text-primary)] border-none cursor-pointer hover:bg-[var(--t-surface)] transition-colors"
                  onClick={() => onSuggestionClick?.(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : noResults ? (
          /* No results */
          <div className="flex flex-col items-center justify-center gap-4 py-20">
            <Search className="w-12 h-12 text-[var(--t-border-mid)]" aria-hidden="true" />
            <p className="text-lg font-medium text-[var(--t-text-primary)]">No se encontraron resultados</p>
            <p className="text-sm text-[var(--t-text-secondary)]">
              Intentá con otro término o explorá nuestras categorías
            </p>
          </div>
        ) : (
          /* Results grid */
          <div className="flex flex-col gap-4">
            <p className="text-sm text-[var(--t-text-secondary)]">
              {results.length} resultado{results.length !== 1 ? "s" : ""} para &ldquo;{searchQuery}&rdquo;
            </p>
            <div className={`grid ${gridColsClass(grid.search.mobile, grid.search.desktop)} gap-4`}>
              {results.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currencySymbol={currencySymbol}
                  onClick={() => onProductClick?.(product.id)}
                  onAddToCart={() => onAddToCart?.(product.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer store={store} services={footerServices} assistance={footerAssistance} />

      {/* Bottom nav — mobile */}
      <BottomNav
        activeTab={activeTab}
        cartItemCount={cartItemCount}
        onTabChange={onTabChange}
      />
      <div className="h-16 lg:hidden" />
    </div>
  );
}
