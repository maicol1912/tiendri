// Pet V3 Template — Search Page
// Search with results grid.
// ZERO hardcoded colors — all via CSS variables.

import { ArrowLeft } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { ProductCard } from "./ProductCard";
import { BottomNav } from "./BottomNav";
import { gridColsClass } from "../utils/grid-classes";
import type { StorefrontProduct, NavTab } from "../types";

interface SearchPageProps {
  query: string;
  results: StorefrontProduct[];
  activeTab: NavTab;
  currencySymbol?: string;
  onBack?: () => void;
  onQueryChange?: (query: string) => void;
  onProductClick?: (productId: string) => void;
  onAddToCart?: (product: StorefrontProduct) => void;
  onTabChange?: (tab: NavTab) => void;
  layout?: {
    cardStyle?: string;
    cardHoverEffect?: string;
    cardImageRatio?: string;
  };
  grid?: {
    search?: { mobile: number; desktop: number };
  };
}

export function SearchPage({
  query,
  results,
  activeTab,
  currencySymbol = "$",
  onBack,
  onQueryChange,
  onProductClick,
  onAddToCart,
  onTabChange,
  layout,
  grid,
}: SearchPageProps) {
  const searchGrid = grid?.search ?? { mobile: 2, desktop: 4 };

  return (
    <div className="min-h-screen bg-[var(--t-background)] pb-24 lg:pb-8">
      {/* Search header */}
      <div className="sticky top-0 z-40 bg-[var(--t-header-bg)]/95 backdrop-blur-sm border-b border-[var(--t-border-light)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center gap-3 py-3">
          <button onClick={onBack} className="p-1 flex-shrink-0" aria-label="Volver">
            <ArrowLeft className="w-5 h-5 text-[var(--t-text-primary)]" />
          </button>
          <div className="flex-1">
            <SearchBar
              value={query}
              onChange={onQueryChange}
              placeholder="Buscar producto o marca"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-4">
        {query && results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-[var(--t-text-muted)] text-lg font-medium">
              No se encontraron resultados para &quot;{query}&quot;
            </p>
          </div>
        ) : results.length > 0 ? (
          <>
            <p className="text-[var(--t-text-muted)] text-sm mb-4">
              {results.length} resultado{results.length !== 1 ? "s" : ""}{" "}
              {query ? `para "${query}"` : ""}
            </p>
            <div className={`grid ${gridColsClass(searchGrid.mobile, searchGrid.desktop)} gap-4 md:gap-6`}>
              {results.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currencySymbol={currencySymbol}
                  onClick={() => onProductClick?.(product.id)}
                  onAddToCart={() => onAddToCart?.(product)}
                  layout={layout}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-[var(--t-text-muted)] text-lg font-medium">
              Busca productos para mascotas
            </p>
          </div>
        )}
      </div>

      {/* Bottom Nav — mobile only */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
