// Furniture Dark — SearchPage
// Real <input> with autofocus; empty state / results / no-results
// ALL colors via var(--t-*)

import { useRef, useEffect } from "react";
import { ChevronLeft, Search, X } from "lucide-react";
import type { StorefrontStore, StorefrontProduct } from "../types";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";
import { ProductCard } from "./ProductCard";
import { gridColsClass } from "../utils/grid-classes";

interface SearchPageProps {
  store: StorefrontStore;
  query: string;
  results: StorefrontProduct[];
  cartItemCount?: number;
  gridMobile?: number;
  gridDesktop?: number;
  onQueryChange: (q: string) => void;
  onProductClick: (productId: string) => void;
  onBack: () => void;
  onCartClick: () => void;
  onBottomNavTab: (tab: "home" | "cart" | "search" | "info") => void;
}

export function SearchPage({
  store,
  query,
  results,
  cartItemCount = 0,
  gridMobile = 2,
  gridDesktop = 4,
  onQueryChange,
  onProductClick,
  onBack,
  onCartClick,
  onBottomNavTab,
}: SearchPageProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Autofocus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const hasQuery = query.trim().length > 0;
  const hasResults = results.length > 0;

  return (
    <div
      className="min-h-screen pb-28 lg:pb-12"
      style={{ backgroundColor: "var(--t-background)" }}
    >
      <Header
        store={store}
        cartItemCount={cartItemCount}
        onSearchClick={() => inputRef.current?.focus()}
        onCartClick={onCartClick}
      />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-4">
        {/* Search bar row */}
        <div className="flex items-center gap-3 mb-6">
          <button
            type="button"
            className="flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0"
            style={{ backgroundColor: "var(--t-surface)" }}
            onClick={onBack}
            aria-label="Volver"
          >
            <ChevronLeft size={18} strokeWidth={2} className="text-[var(--t-foreground)]" />
          </button>

          <div
            className="flex-1 flex items-center gap-3 px-4 py-3 rounded-[var(--t-radius-button)]"
            style={{
              backgroundColor: "var(--t-search-bg)",
              border: "1px solid var(--t-border)",
            }}
          >
            <Search size={16} strokeWidth={2} className="text-[var(--t-muted)] flex-shrink-0" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder={`Buscar en ${store.name}`}
              className="flex-1 bg-transparent outline-none text-[var(--t-foreground)] placeholder:text-[var(--t-muted)]"
              style={{
                fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                fontSize: "15px",
              }}
              autoComplete="off"
              aria-label="Buscar productos"
            />
            {hasQuery && (
              <button
                type="button"
                onClick={() => onQueryChange("")}
                className="flex-shrink-0"
                aria-label="Limpiar búsqueda"
              >
                <X size={14} strokeWidth={2} className="text-[var(--t-muted)]" />
              </button>
            )}
          </div>
        </div>

        {/* State: empty (no query yet) */}
        {!hasQuery && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--t-surface)" }}
            >
              <Search size={26} strokeWidth={1.5} className="text-[var(--t-muted)]" />
            </div>
            <p
              className="text-[var(--t-muted)] text-center"
              style={{
                fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                fontSize: "15px",
              }}
            >
              Escribí para buscar productos
            </p>
          </div>
        )}

        {/* State: no results */}
        {hasQuery && !hasResults && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <p
              className="text-[var(--t-foreground)] font-semibold"
              style={{
                fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                fontSize: "16px",
                fontWeight: 600,
              }}
            >
              Sin resultados para &quot;{query}&quot;
            </p>
            <p
              className="text-[var(--t-muted)]"
              style={{
                fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                fontSize: "14px",
              }}
            >
              Intentá con otra búsqueda
            </p>
          </div>
        )}

        {/* State: results */}
        {hasQuery && hasResults && (
          <>
            <p
              className="text-[var(--t-muted)] mb-4"
              style={{
                fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                fontSize: "13px",
              }}
            >
              {results.length} resultado{results.length !== 1 ? "s" : ""} para &quot;{query}&quot;
            </p>
            <div className={`grid gap-4 ${gridColsClass(gridMobile, gridDesktop)}`}>
              {results.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={onProductClick}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <BottomNav
        activeTab="home"
        cartItemCount={cartItemCount}
        onTab={onBottomNavTab}
      />
    </div>
  );
}
