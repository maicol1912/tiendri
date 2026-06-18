// Furniture Light — Search Page
// Back + title bar, search input with sliders button, category pills, results count, product grid
// ZERO hardcoded colors

import { useRef } from "react";
import { SlidersHorizontal, X, Search, ArrowLeft } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { CategorySection } from "./CategorySection";
import { ProductCard } from "./ProductCard";
import { gridColsClass } from "../../_shared/utils/grid-classes";
import type { FurnitureLightConfig } from "../config";
import type { StorefrontProduct, FurnitureCategory, StoreInfo, FurnitureNavTab } from "../types";

interface SearchPageProps {
  store: StoreInfo;
  navLinks?: readonly { label: string; href: string }[];
  layout?: FurnitureLightConfig["layout"];
  grid?: FurnitureLightConfig["grid"];
  searchQuery?: string;
  results?: StorefrontProduct[];
  allProducts?: StorefrontProduct[];
  categories?: FurnitureCategory[];
  activeCategoryId?: string | null;
  activeTab?: FurnitureNavTab;
  cartItemCount?: number;
  currencySymbol?: string;
  suggestions?: readonly string[];
  inputRef?: React.RefObject<HTMLInputElement | null>;
  onSearchChange?: (q: string) => void;
  onSearchClear?: () => void;
  onSuggestionClick?: (s: string) => void;
  onCategoryChange?: (id: string | null) => void;
  onProductClick?: (productId: string) => void;
  onWishlistToggle?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
  onCartClick?: () => void;
  onSearchClick?: () => void;
  onNavLinkClick?: (href: string) => void;
  onBack?: () => void;
  onTabChange?: (tab: FurnitureNavTab) => void;
}

export function SearchPage({
  store,
  navLinks = [],
  layout,
  grid,
  searchQuery = "",
  results = [],
  allProducts = [],
  categories = [],
  activeCategoryId = null,
  activeTab = "search",
  cartItemCount = 0,
  currencySymbol = "$",
  suggestions = [],
  inputRef: externalRef,
  onSearchChange,
  onSearchClear,
  onSuggestionClick,
  onCategoryChange,
  onProductClick,
  onWishlistToggle,
  onAddToCart,
  onCartClick,
  onSearchClick,
  onNavLinkClick,
  onBack,
  onTabChange,
}: SearchPageProps) {
  const internalRef = useRef<HTMLInputElement>(null);
  const inputRef = externalRef ?? internalRef;

  const hasQuery = searchQuery.trim().length > 0;
  const displayProducts = hasQuery ? results : allProducts;
  const gridCols = grid?.search ?? { mobile: 2, desktop: 4 };

  return (
    <div className="min-h-screen bg-[var(--t-background)]">
      <Header
        store={store}
        navLinks={navLinks as { label: string; href: string }[]}
        cartItemCount={cartItemCount}
        onNavLinkClick={onNavLinkClick}
        onCartClick={onCartClick}
        onSearchClick={onSearchClick}
      />

      <main className="pt-[60px] lg:pt-[72px] pb-28 lg:pb-8 max-w-6xl mx-auto">
        {/* Search bar */}
        <div className="sticky top-[60px] lg:top-[72px] z-30 bg-[var(--t-background)] px-5 md:px-6 lg:px-8 py-3 border-b border-[var(--t-border)]">
          <div className="flex items-center gap-2">
            {/* Back button */}
            <button
              onClick={onBack}
              className="shrink-0 flex items-center justify-center w-9 h-9 rounded-[var(--t-radius-button)] transition-colors"
              style={{ backgroundColor: "var(--t-background)", color: "var(--t-foreground)" }}
              aria-label="Volver"
            >
              <ArrowLeft size={18} />
            </button>

            {/* Input */}
            <div
              className="flex items-center gap-2 flex-1 px-3 py-2.5"
              style={{
                borderRadius: "var(--t-radius-button)",
                backgroundColor: "var(--t-card)",
                border: "1px solid var(--t-border)",
              }}
            >
              <Search size={16} style={{ color: "var(--t-muted)" }} />
              <input
                ref={inputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder="Buscar muebles..."
                className="flex-1 bg-transparent text-sm text-[var(--t-foreground)] placeholder-[var(--t-muted)] outline-none"
                autoComplete="off"
                aria-label="Buscar productos"
              />
              {hasQuery && (
                <button
                  onClick={onSearchClear}
                  aria-label="Limpiar búsqueda"
                  className="text-[var(--t-muted)] hover:text-[var(--t-foreground)] transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Sliders button */}
            <button
              className="shrink-0 flex items-center justify-center w-9 h-9 rounded-[var(--t-radius-button)]"
              style={{ backgroundColor: "var(--t-primary)" }}
              aria-label="Filtros"
            >
              <SlidersHorizontal size={16} style={{ color: "var(--t-on-primary)" }} />
            </button>
          </div>
        </div>

        {/* Category pills */}
        {categories.length > 0 && (
          <div className="py-3 border-b border-[var(--t-border)]">
            <CategorySection
              categories={categories}
              activeCategoryId={activeCategoryId}
              onCategoryChange={onCategoryChange}
            />
          </div>
        )}

        <div className="px-5 md:px-6 lg:px-8 mt-4">
          {/* Suggestions */}
          {!hasQuery && suggestions.length > 0 && (
            <div className="mb-6">
              <p className="text-xs font-bold text-[var(--t-muted)] uppercase tracking-wider mb-3">
                Búsquedas populares
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => onSuggestionClick?.(s)}
                    className="px-3 py-1.5 text-xs font-medium transition-all"
                    style={{
                      borderRadius: "var(--t-radius-category)",
                      border: "1px solid var(--t-border)",
                      backgroundColor: "var(--t-background)",
                      color: "var(--t-foreground)",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results count */}
          {hasQuery && (
            <p className="text-xs text-[var(--t-muted)] mb-3">
              {results.length === 0
                ? `Sin resultados para "${searchQuery}"`
                : `${results.length} resultado${results.length !== 1 ? "s" : ""} para "${searchQuery}"`}
            </p>
          )}

          {/* Product grid */}
          <div className={`grid ${gridColsClass(gridCols.mobile, gridCols.desktop)} gap-3`}>
            {displayProducts.map((product) => (
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
