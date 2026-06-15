"use client";

// Beauty Elegant Template — Search Page
// Real-time filtering with 300ms debounce. Purple theme.

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { SearchBar } from "./SearchBar";
import { ProductCard } from "./ProductCard";
import { BottomNav } from "./BottomNav";
import { Header } from "./Header";
import { gridColsClass } from "../../_shared/utils/grid-classes";
import type { BeautyElegantProduct } from "../types";
import type { StoreInfo } from "../types";

interface SearchPageProps {
  store: StoreInfo;
  allProducts: BeautyElegantProduct[];
  currencySymbol?: string;
  layout?: {
    cardStyle?: string;
    cardHoverEffect?: string;
    cardImageRatio?: string;
  };
  grid?: {
    search?: { mobile: number; desktop: number };
  };
  cartItemCount?: number;
  onProductClick?: (productId: string) => void;
  onBack?: () => void;
  onNavLinkClick?: (href: string) => void;
  onSearchOpen?: () => void;
  onCartOpen?: () => void;
}

export function SearchPage({
  store,
  allProducts,
  currencySymbol = "$",
  layout,
  grid,
  cartItemCount = 0,
  onProductClick,
  onBack,
  onNavLinkClick,
  onSearchOpen,
  onCartOpen,
}: SearchPageProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(value);
    }, 300);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const searchGrid = grid?.search ?? { mobile: 2, desktop: 4 };
  const gridClass = gridColsClass(searchGrid.mobile, searchGrid.desktop);

  const results = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return [];
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.description?.toLowerCase().includes(q) ?? false)
    );
  }, [allProducts, debouncedQuery]);

  const hasQuery = query.trim().length > 0;
  const hasResults = results.length > 0;

  const popularSearches = [
    "Crema Facial",
    "Sérum",
    "Loción Corporal",
    "Protector Solar",
    "Mascarilla",
    "Aceite Capilar",
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--t-background)" }}
    >
      {/* Desktop shared header */}
      <Header
        store={store}
        cartItemCount={cartItemCount}
        onSearchOpen={onSearchOpen}
        onCartOpen={onCartOpen}
        onNavLinkClick={onNavLinkClick}
      />

      {/* Mobile search header — back button + inline search bar */}
      <header
        className="md:hidden sticky top-0 z-40"
        style={{
          backgroundColor: "var(--t-background)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--t-nav-border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <button
              type="button"
              className="flex items-center justify-center w-9 h-9 rounded-[var(--t-radius-button)] flex-shrink-0"
              style={{ background: "none", border: "none", cursor: "pointer" }}
              aria-label="Volver"
              onClick={onBack}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 12H5M12 19l-7-7 7-7"
                  stroke="var(--t-foreground)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <span className="text-xs font-medium" style={{ color: "var(--t-muted)" }}>
              {store.name}
            </span>
          </div>
          <SearchBar
            query={query}
            placeholder="Buscar productos..."
            onQueryChange={handleQueryChange}
          />
        </div>
      </header>

      {/* Desktop search bar — below the shared Header */}
      <div className="hidden md:block max-w-7xl mx-auto w-full px-6 lg:px-8 pt-5 pb-2">
        <SearchBar
          query={query}
          placeholder="Buscar productos..."
          onQueryChange={handleQueryChange}
        />
      </div>

      {/* Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8 pt-4 pb-[calc(80px+env(safe-area-inset-bottom,0px))] md:pb-8">
        {/* No query */}
        {!hasQuery && (
          <div className="flex flex-col gap-6 pt-2">
            <section aria-labelledby="popular-heading">
              <h2
                id="popular-heading"
                className="text-[15px] font-bold mb-3"
                style={{ color: "var(--t-foreground)", margin: "0 0 12px 0" }}
              >
                Búsquedas populares
              </h2>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => handleQueryChange(term)}
                    className="text-[13px] px-3 py-1.5 transition-colors"
                    style={{
                      color: "var(--t-primary)",
                      backgroundColor: "var(--t-icon-pill-bg)",
                      border: "1px solid var(--t-border-light)",
                      borderRadius: "20px",
                      cursor: "pointer",
                    }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </section>

            {allProducts.length > 0 && (
              <section aria-labelledby="discover-heading">
                <h2
                  id="discover-heading"
                  className="text-[15px] font-bold"
                  style={{ color: "var(--t-foreground)", margin: "0 0 12px 0" }}
                >
                  Descubrir
                </h2>
                <div className={`grid gap-4 md:gap-5 ${gridClass}`}>
                  {allProducts.slice(0, 8).map((product) => (
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
          </div>
        )}

        {/* No results */}
        {hasQuery && !hasResults && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--t-icon-pill-bg)" }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="var(--t-primary)" strokeWidth="1.75" />
                <path d="M21 21l-4.35-4.35" stroke="var(--t-primary)" strokeWidth="1.75" strokeLinecap="round" />
                <path d="M8 8l6 6M14 8l-6 6" stroke="var(--t-primary)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-[15px] font-semibold" style={{ color: "var(--t-foreground)", margin: 0 }}>
              Sin resultados
            </p>
            <p className="text-[13px] text-center" style={{ color: "var(--t-muted)", margin: 0 }}>
              No encontramos productos para{" "}
              <strong style={{ color: "var(--t-foreground)" }}>&quot;{query}&quot;</strong>
            </p>
          </div>
        )}

        {/* Results */}
        {hasQuery && hasResults && (
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium" style={{ color: "var(--t-muted)", margin: 0 }}>
              {results.length} {results.length === 1 ? "resultado" : "resultados"}
            </p>
            <div className={`grid gap-4 md:gap-5 ${gridClass}`}>
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

      <BottomNav activeTab="home" />
    </div>
  );
}
