// Decor Warm Template — Search Page (Presentational)
// Shared Header + search bar + popular suggestions pills + results grid.
// No-results state with empty illustration.
// ZERO hardcoded colors — all via var(--t-*).

import { Search, X } from "lucide-react";
import { Header } from "./Header";
import { ProductCard } from "./ProductCard";
import { BottomNav } from "./BottomNav";
import { gridColsClass } from "../utils/grid-classes";
import type { DecorWarmProduct, DecorWarmNavTab } from "../types";
import type { StoreInfo } from "@/types/store";
import type { DecorWarmConfig } from "../config";

interface SearchPageProps {
  store: StoreInfo;
  query: string;
  results: DecorWarmProduct[];
  recommendations?: DecorWarmProduct[];
  popularSearches?: string[];
  isSearching?: boolean;
  currencySymbol?: string;
  cartItemCount?: number;
  wishlistedIds?: Set<string>;
  layout?: DecorWarmConfig["layout"];
  grid?: DecorWarmConfig["grid"];
  onQueryChange?: (q: string) => void;
  onClear?: () => void;
  onCartOpen?: () => void;
  onNavLinkClick?: (href: string) => void;
  onProductClick?: (productId: string) => void;
  onWishlistToggle?: (productId: string) => void;
  onAddToCart?: (product: DecorWarmProduct) => void;
  onSuggestionClick?: (q: string) => void;
  onTabChange?: (tab: DecorWarmNavTab) => void;
}

export function SearchPage({
  store,
  query,
  results,
  recommendations = [],
  popularSearches = [],
  isSearching = false,
  currencySymbol = "$",
  cartItemCount = 0,
  layout,
  grid,
  onQueryChange,
  onClear,
  onCartOpen,
  onNavLinkClick,
  onProductClick,
  onAddToCart,
  onSuggestionClick,
  onTabChange,
}: SearchPageProps) {
  const searchGridClass = gridColsClass(
    grid?.search?.mobile ?? 2,
    grid?.search?.desktop ?? 4
  );

  const hasQuery = query.trim().length > 0;
  const showResults = hasQuery && !isSearching;
  const showRecommendations = !hasQuery && recommendations.length > 0;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--t-background)" }}>
      <Header
        store={store}
        cartItemCount={cartItemCount}
        onCartClick={onCartOpen}
        onNavLinkClick={onNavLinkClick}
      />

      {/* ── Search bar ── */}
      <div
        className="sticky top-16 z-10 px-4 md:px-6 py-3"
        style={{
          backgroundColor: "var(--t-background)",
          borderBottom: "1px solid var(--t-border)",
        }}
      >
        <div className="flex items-center gap-3 max-w-3xl mx-auto">
          {/* Search input */}
          <div
            className="flex items-center flex-1 gap-2 px-4"
            style={{
              height: 42,
              backgroundColor: "var(--t-card)",
              borderRadius: 15,
              border: "1px solid var(--t-border)",
            }}
          >
            <Search size={16} style={{ color: "var(--t-muted)", flexShrink: 0 }} />
            <input
              type="search"
              placeholder="Buscar productos..."
              value={query}
              onChange={(e) => onQueryChange?.(e.target.value)}
              autoFocus
              className="flex-1 bg-transparent border-none outline-none"
              style={{
                color: "var(--t-foreground)",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "14px",
                fontWeight: 400,
              }}
              aria-label="Buscar productos"
            />
            {hasQuery && (
              <button
                type="button"
                onClick={onClear}
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 2,
                }}
                aria-label="Limpiar búsqueda"
              >
                <X size={14} style={{ color: "var(--t-muted)" }} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <main
        className="flex-1 max-w-3xl mx-auto w-full px-4 md:px-6 py-5 flex flex-col gap-5"
        style={{ paddingBottom: "calc(80px + env(safe-area-inset-bottom, 0px))" }}
      >
        {/* Popular suggestions (shown when no query) */}
        {!hasQuery && popularSearches.length > 0 && (
          <section className="flex flex-col gap-3">
            <h3
              style={{
                color: "var(--t-foreground)",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                margin: 0,
              }}
            >
              Búsquedas populares
            </h3>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => onSuggestionClick?.(s)}
                  style={{
                    backgroundColor: "var(--t-card)",
                    color: "var(--t-muted)",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "12px",
                    fontWeight: 400,
                    borderRadius: "var(--t-radius-button)",
                    border: "1px solid var(--t-border)",
                    cursor: "pointer",
                    padding: "6px 14px",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Recommendations grid (no query) */}
        {showRecommendations && (
          <section className="flex flex-col gap-3">
            <h3
              style={{
                color: "var(--t-foreground)",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                margin: 0,
              }}
            >
              Sugerencias
            </h3>
            <div className={`grid ${searchGridClass} gap-4`}>
              {recommendations.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  currencySymbol={currencySymbol}
                  layout={layout}
                  onClick={onProductClick ? () => onProductClick(p.id) : undefined}
                  onAddToCart={onAddToCart ? () => onAddToCart(p) : undefined}
                />
              ))}
            </div>
          </section>
        )}

        {/* Searching indicator */}
        {isSearching && (
          <div className="flex justify-center py-8">
            <span
              style={{
                color: "var(--t-muted)",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "14px",
              }}
            >
              Buscando...
            </span>
          </div>
        )}

        {/* Results */}
        {showResults && results.length > 0 && (
          <section className="flex flex-col gap-3">
            <p
              style={{
                color: "var(--t-muted)",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "13px",
                margin: 0,
              }}
            >
              {results.length} resultado{results.length !== 1 ? "s" : ""} para &quot;{query}&quot;
            </p>
            <div className={`grid ${searchGridClass} gap-4`}>
              {results.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  currencySymbol={currencySymbol}
                  layout={layout}
                  onClick={onProductClick ? () => onProductClick(p.id) : undefined}
                  onAddToCart={onAddToCart ? () => onAddToCart(p) : undefined}
                />
              ))}
            </div>
          </section>
        )}

        {/* No results */}
        {showResults && results.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--t-card)" }}
            >
              <Search size={28} style={{ color: "var(--t-icon-inactive)" }} />
            </div>
            <p
              style={{
                color: "var(--t-foreground)",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "15px",
                fontWeight: 600,
                margin: 0,
              }}
            >
              Sin resultados
            </p>
            <p
              style={{
                color: "var(--t-muted)",
                fontFamily: "'League Spartan', sans-serif",
                fontSize: "13px",
                margin: 0,
                textAlign: "center",
              }}
            >
              No encontramos productos para &quot;{query}&quot;
            </p>
          </div>
        )}
      </main>

      <BottomNav activeTab="categories" onTabChange={onTabChange} />
    </div>
  );
}
