"use client";

// Food Night — Search Page
// Real <input> with debounce + popular products grid when no query + "no results" state

import { useEffect, useRef, useCallback, useState } from "react";
import { Search, ArrowLeft } from "lucide-react";
import { Header } from "./Header";
import { ProductCard } from "./ProductCard";
import { BottomNav } from "./BottomNav";
import { gridColsClass } from "../utils/grid-classes";
import type { StoreInfo, StorefrontProduct, NavTab } from "../types";

interface SearchPageProps {
  store: StoreInfo;
  allProducts: StorefrontProduct[];
  popularProducts?: StorefrontProduct[];
  currencySymbol?: string;
  activeTab?: NavTab;
  cartItemCount?: number;
  layout?: {
    cardStyle?: string;
    cardHoverEffect?: string;
    cardImageRatio?: string;
    headerStyle?: string;
    footerStyle?: string;
  };
  grid?: {
    search?: { mobile: number; desktop: number };
  };
  onBack?: () => void;
  onProductClick?: (productId: string) => void;
  onCartClick?: () => void;
  onTabChange?: (tab: NavTab) => void;
}

function useDebounce<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);
  return debounced;
}

export function SearchPage({
  store,
  allProducts,
  popularProducts,
  currencySymbol = "$",
  activeTab = "search",
  cartItemCount = 0,
  layout,
  grid,
  onBack,
  onProductClick,
  onCartClick,
  onTabChange,
}: SearchPageProps) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query.trim().toLowerCase(), 280);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchMobile = grid?.search?.mobile ?? 2;
  const searchDesktop = grid?.search?.desktop ?? 4;

  const searchResults = debouncedQuery
    ? allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(debouncedQuery) ||
          (p.description ?? "").toLowerCase().includes(debouncedQuery)
      )
    : [];

  const popular = popularProducts ?? allProducts.slice(0, 8);
  const hasQuery = debouncedQuery.length > 0;
  const noResults = hasQuery && searchResults.length === 0;

  // Auto-focus on mount
  useEffect(() => {
    const id = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(id);
  }, []);

  const handleClear = useCallback(() => {
    setQuery("");
    inputRef.current?.focus();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--t-background)" }}>
      <Header
        store={store}
        cartItemCount={cartItemCount}
        layout={layout}
        onCartClick={onCartClick}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-24 md:pb-12 pt-4">
        {/* Search input bar */}
        <div className="flex items-center gap-3 mb-6">
          <button
            type="button"
            onClick={onBack}
            className="flex-shrink-0 flex items-center justify-center transition-opacity hover:opacity-70"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              backgroundColor: "var(--t-card-bg)",
              border: "none",
              cursor: "pointer",
            }}
            aria-label="Volver"
          >
            <ArrowLeft size={18} strokeWidth={2} style={{ color: "var(--t-text-primary)" }} />
          </button>

          <div
            className="flex-1 flex items-center gap-2 px-3"
            style={{
              height: 44,
              borderRadius: "var(--t-radius-button)",
              backgroundColor: "var(--t-card-bg)",
              border: "1px solid var(--t-border-light)",
            }}
          >
            <Search size={16} strokeWidth={2} style={{ color: "var(--t-text-muted)", flexShrink: 0 }} />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar platos, combos..."
              aria-label="Buscar productos"
              className="flex-1 bg-transparent outline-none text-[13px] font-normal"
              style={{ color: "var(--t-text-primary)" }}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
            />
            {query.length > 0 && (
              <button
                type="button"
                onClick={handleClear}
                className="flex-shrink-0 text-[11px] font-normal transition-opacity hover:opacity-70"
                style={{
                  color: "var(--t-text-muted)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                aria-label="Limpiar búsqueda"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        {/* No results */}
        {noResults && (
          <div
            className="flex flex-col items-center justify-center py-20 gap-3"
            role="status"
            aria-label="Sin resultados"
          >
            <span style={{ fontSize: "40px" }} aria-hidden="true">🔍</span>
            <p className="text-[14px] font-semibold" style={{ color: "var(--t-text-primary)" }}>
              Sin resultados para &ldquo;{debouncedQuery}&rdquo;
            </p>
            <p className="text-[12px] font-normal" style={{ color: "var(--t-text-muted)" }}>
              Intentá con otro término de búsqueda
            </p>
          </div>
        )}

        {/* Search results */}
        {hasQuery && !noResults && (
          <section aria-label="Resultados de búsqueda">
            <p className="text-[12px] font-normal mb-4" style={{ color: "var(--t-text-muted)" }}>
              {searchResults.length} resultado{searchResults.length !== 1 ? "s" : ""} para &ldquo;{debouncedQuery}&rdquo;
            </p>
            <div className={`grid ${gridColsClass(searchMobile, searchDesktop)} gap-3 md:gap-4 items-start`}>
              {searchResults.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currencySymbol={currencySymbol}
                  variant={index % 2 === 0 ? "tall" : "short"}
                  layout={layout}
                  onClick={() => onProductClick?.(product.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Popular products (no query) */}
        {!hasQuery && popular.length > 0 && (
          <section aria-label="Populares">
            <h2
              className="text-[14px] font-semibold mb-4"
              style={{ color: "var(--t-text-primary)" }}
            >
              Más pedidos
            </h2>
            <div className={`grid ${gridColsClass(searchMobile, searchDesktop)} gap-3 md:gap-4 items-start`}>
              {popular.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currencySymbol={currencySymbol}
                  variant={index % 2 === 0 ? "tall" : "short"}
                  layout={layout}
                  onClick={() => onProductClick?.(product.id)}
                />
              ))}
            </div>
          </section>
        )}
      </main>

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
