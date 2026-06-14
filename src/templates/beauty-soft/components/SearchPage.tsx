// Beauty Soft Template — Search Page (Presentational)
// Debounced search input, recommendations, results grid.
// ZERO hardcoded colors — all via var(--t-*).

import { Search, X } from "lucide-react";
import { Header } from "./Header";
import { ProductCard } from "./ProductCard";
import { BottomNav } from "./BottomNav";
import type { BeautySoftProduct, NavTab } from "../types";
import type { BeautySoftConfig } from "../config";
import type { StoreInfo } from "@/types/store";

type LayoutConfig = BeautySoftConfig["layout"];
type GridConfig = BeautySoftConfig["grid"];

interface SearchPageProps {
  store: StoreInfo;
  query: string;
  results: BeautySoftProduct[];
  recommendations: BeautySoftProduct[];
  isSearching: boolean;
  cartItemCount?: number;
  currencySymbol?: string;
  favorites?: Set<string>;
  onFavoriteToggle?: (productId: string) => void;
  layout?: LayoutConfig;
  grid?: GridConfig;
  onBack?: () => void;
  onQueryChange?: (query: string) => void;
  onClear?: () => void;
  onProductClick?: (productId: string) => void;
  onTabChange?: (tab: NavTab) => void;
  onNavLinkClick?: (href: string) => void;
}

export function SearchPage({
  store,
  query,
  results,
  recommendations,
  isSearching,
  cartItemCount = 0,
  currencySymbol = "$",
  layout,
  grid,
  onBack: _onBack,
  onQueryChange,
  onClear,
  onProductClick,
  onTabChange,
  onNavLinkClick,
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
      <Header
        store={store}
        cartItemCount={cartItemCount}
        onNavLinkClick={onNavLinkClick}
      />

      {/* Search input bar */}
      <div className="sticky top-[60px] z-30 px-5 pt-3 pb-3" style={{ backgroundColor: "var(--t-background)" }}>
        <div className="max-w-5xl mx-auto">
          <div
            className="flex items-center gap-2 px-4"
            style={{
              height: "47px",
              borderRadius: "37px",
              backgroundColor: "var(--t-surface)",
              border: "1.5px solid var(--t-border)",
            }}
          >
            <Search size={16} strokeWidth={2} className="flex-shrink-0 text-[var(--t-muted)]" />
            <input
              type="search"
              value={query}
              placeholder="Buscar productos..."
              autoFocus
              onChange={(e) => onQueryChange?.(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-[var(--t-foreground)] placeholder:text-[var(--t-muted)]"
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
                <X size={16} strokeWidth={2} className="text-[var(--t-muted)]" />
              </button>
            )}
          </div>
        </div>
      </div>

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
                  className="m-0 text-sm font-semibold text-[var(--t-foreground)] leading-[22px] tracking-[-0.408px]"
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
                      layout={layout}
                      onClick={() => onProductClick?.(product.id)}
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
              className="m-0 text-base font-semibold text-[var(--t-foreground)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Sin resultados para &ldquo;{query}&rdquo;
            </p>
            <p
              className="m-0 text-sm text-[var(--t-muted)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Intenta con otro término de búsqueda
            </p>
          </div>
        ) : (
          /* Results */
          <div className="flex flex-col gap-4">
            <p
              className="m-0 text-sm font-semibold text-[var(--t-foreground)] leading-[22px] tracking-[-0.408px]"
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
                  layout={layout}
                  onClick={() => onProductClick?.(product.id)}
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
