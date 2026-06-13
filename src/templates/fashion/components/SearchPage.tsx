// Fashion Template — Search Page
// SearchBar → Results grid (or empty states).
// Empty states: no query → "BUSCAR" + subtitle. No results → "SIN RESULTADOS".
// Monochromatic B&W. Background: var(--t-background).

import { Header } from "./Header";
import { SearchBar } from "./SearchBar";
import { ProductCard } from "./ProductCard";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { gridColsClass } from "../utils/grid-classes";
import type { StoreInfo, StorefrontProduct, NavTab } from "../types";

interface SearchPageProps {
  store: StoreInfo;
  searchQuery: string;
  results: StorefrontProduct[];
  activeTab: NavTab;
  cartItemCount?: number;
  currencySymbol?: string;
  grid?: { mobile: number; desktop: number };
  layout?: {
    cardStyle?: string;
    cardHoverEffect?: string;
    cardImageRatio?: string;
  };
  onSearchChange?: (value: string) => void;
  onCartClick?: () => void;
  onProductClick?: (id: string) => void;
  onTabChange?: (tab: NavTab) => void;
}

export function SearchPage({
  store,
  searchQuery,
  results,
  activeTab,
  cartItemCount = 0,
  currencySymbol = "$",
  grid,
  layout,
  onSearchChange,
  onCartClick,
  onProductClick,
  onTabChange,
}: SearchPageProps) {
  const hasQuery = searchQuery.trim().length > 0;
  const gridClass = gridColsClass(grid?.mobile ?? 2, grid?.desktop ?? 4);

  return (
    <div
      className="min-h-screen bg-[var(--t-background)]"
      style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
    >
      <Header
        store={store}
        cartItemCount={cartItemCount}
        onCartClick={onCartClick}
      />

      <main className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 pt-6 md:pt-8 pb-28 md:pb-12">
        {/* Search bar */}
        <div className="mb-6 lg:mb-8 max-w-xl">
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Buscar productos..."
          />
        </div>

        {/* Results count */}
        {hasQuery && (
          <div className="mb-6">
            <p
              className="text-[11px] uppercase tracking-wider text-[var(--t-muted)]"
              style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)", fontWeight: 400 }}
            >
              {results.length > 0
                ? `${results.length} resultado${results.length !== 1 ? "s" : ""} para "${searchQuery}"`
                : `Sin resultados para "${searchQuery}"`}
            </p>
          </div>
        )}

        {/* Results */}
        {!hasQuery ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <h2
              className="mb-2 text-xl font-bold uppercase tracking-wider text-[var(--t-foreground)]"
              style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
            >
              BUSCAR
            </h2>
            <p
              className="text-sm text-[var(--t-muted)]"
              style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)", fontWeight: 400 }}
            >
              Escribe el nombre de un producto o colección.
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p
              className="mb-1 text-lg font-bold uppercase tracking-wider text-[var(--t-foreground)]"
              style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
            >
              SIN RESULTADOS
            </p>
            <p
              className="text-sm text-[var(--t-muted)]"
              style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)", fontWeight: 400 }}
            >
              Intenta con otros términos de búsqueda.
            </p>
          </div>
        ) : (
          <div className={`grid ${gridClass} gap-3 md:gap-5 lg:gap-6`}>
            {results.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currencySymbol={currencySymbol}
                onProductClick={onProductClick}
                layout={layout}
              />
            ))}
          </div>
        )}
      </main>

      <Footer store={store} />

      <BottomNav
        activeTab={activeTab}
        cartItemCount={cartItemCount}
        onTabChange={onTabChange}
      />
    </div>
  );
}
