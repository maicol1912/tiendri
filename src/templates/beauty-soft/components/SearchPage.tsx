// Beauty Soft Template — Search Page (Presentational)
// Debounced search input, recommendations, results grid.
// ZERO hardcoded colors — all via var(--t-*).

import { ChevronLeft, Search, X } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { BottomNav } from "./BottomNav";
import type { BeautySoftProduct, NavTab } from "../types";
import type { BeautySoftConfig } from "../config";

type LayoutConfig = BeautySoftConfig["layout"];
type GridConfig = BeautySoftConfig["grid"];

interface SearchPageProps {
  query: string;
  results: BeautySoftProduct[];
  recommendations: BeautySoftProduct[];
  isSearching: boolean;
  currencySymbol?: string;
  favorites?: Set<string>;
  layout?: LayoutConfig;
  grid?: GridConfig;
  onBack?: () => void;
  onQueryChange?: (query: string) => void;
  onClear?: () => void;
  onProductClick?: (productId: string) => void;
  onFavoriteToggle?: (productId: string) => void;
  onTabChange?: (tab: NavTab) => void;
}

export function SearchPage({
  query,
  results,
  recommendations,
  isSearching,
  currencySymbol = "$",
  favorites = new Set(),
  layout,
  grid,
  onBack,
  onQueryChange,
  onClear,
  onProductClick,
  onFavoriteToggle,
  onTabChange,
}: SearchPageProps) {
  const hasQuery = query.trim().length > 0;
  const hasResults = results.length > 0;

  const mobileGrid = grid?.products?.mobile ?? 2;
  const desktopGrid = grid?.products?.desktop ?? 4;
  const gridClass = `grid grid-cols-${mobileGrid} lg:grid-cols-${desktopGrid} gap-3`;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--t-background)" }}
    >
      {/* Header */}
      <header className="px-5 pt-[12px] pb-3 sticky top-0 z-40" style={{ backgroundColor: "var(--t-background)" }}>
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <button
            type="button"
            className="flex items-center justify-center flex-shrink-0 border-0 cursor-pointer"
            style={{
              width: "47px",
              height: "47px",
              borderRadius: "37px",
              backgroundColor: "var(--t-section-bg)",
            }}
            aria-label="Volver"
            onClick={onBack}
          >
            <ChevronLeft size={24} strokeWidth={2} className="text-[var(--t-text-primary)]" />
          </button>

          {/* Search input */}
          <div
            className="flex-1 flex items-center gap-2 px-4"
            style={{
              height: "47px",
              borderRadius: "37px",
              backgroundColor: "var(--t-search-bg)",
              border: "1.5px solid var(--t-border-input)",
            }}
          >
            <Search size={16} strokeWidth={2} className="flex-shrink-0 text-[var(--t-text-muted)]" />
            <input
              type="search"
              value={query}
              placeholder="Buscar productos..."
              autoFocus
              onChange={(e) => onQueryChange?.(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-[var(--t-text-primary)] placeholder:text-[var(--t-text-muted)]"
              style={{ fontFamily: "var(--font-sans)", fontSize: "14px", lineHeight: "22px" }}
            />
            {hasQuery && (
              <button
                type="button"
                aria-label="Limpiar búsqueda"
                className="flex items-center justify-center flex-shrink-0 border-0 cursor-pointer"
                style={{ background: "none", padding: 0 }}
                onClick={onClear}
              >
                <X size={16} strokeWidth={2} className="text-[var(--t-text-muted)]" />
              </button>
            )}
          </div>
        </div>
      </header>

      <main
        className="flex-1 max-w-5xl mx-auto w-full px-5 pt-2"
        style={{ paddingBottom: "calc(100px + env(safe-area-inset-bottom, 0px))" }}
      >
        {!hasQuery ? (
          /* Recommendations */
          <div className="flex flex-col gap-4">
            {recommendations.length > 0 && (
              <>
                <p
                  className="m-0 text-sm font-semibold text-[var(--t-text-primary)] leading-[22px] tracking-[-0.408px]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Recomendados
                </p>
                <div className={gridClass}>
                  {recommendations.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      currencySymbol={currencySymbol}
                      isFavorite={favorites.has(product.id)}
                      layout={layout}
                      onClick={() => onProductClick?.(product.id)}
                      onFavoriteToggle={() => onFavoriteToggle?.(product.id)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : isSearching ? (
          /* Loading state */
          <div className="flex items-center justify-center py-16">
            <div
              className="w-8 h-8 border-2 rounded-full animate-spin"
              style={{
                borderColor: "var(--t-border)",
                borderTopColor: "var(--t-primary)",
              }}
            />
          </div>
        ) : !hasResults ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <p
              className="m-0 text-base font-semibold text-[var(--t-text-primary)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Sin resultados para &ldquo;{query}&rdquo;
            </p>
            <p
              className="m-0 text-sm text-[var(--t-text-muted)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Intenta con otro término de búsqueda
            </p>
          </div>
        ) : (
          /* Results */
          <div className="flex flex-col gap-4">
            <p
              className="m-0 text-sm font-semibold text-[var(--t-text-primary)] leading-[22px] tracking-[-0.408px]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {results.length} resultado{results.length !== 1 ? "s" : ""} para &ldquo;{query}&rdquo;
            </p>
            <div className={gridClass}>
              {results.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currencySymbol={currencySymbol}
                  isFavorite={favorites.has(product.id)}
                  layout={layout}
                  onClick={() => onProductClick?.(product.id)}
                  onFavoriteToggle={() => onFavoriteToggle?.(product.id)}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <BottomNav activeTab="home" onTabChange={onTabChange} />
    </div>
  );
}
