// Beauty Soft Template — Product Listing Page (Presentational)
// Full catalog grid with category filter pills + header with back/search.
// ZERO hardcoded colors — all via var(--t-*).

import { ChevronLeft, Search } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { BottomNav } from "./BottomNav";
import type { BeautySoftProduct, BeautySoftCategory, NavTab } from "../types";
import type { BeautySoftConfig } from "../config";

type LayoutConfig = BeautySoftConfig["layout"];
type GridConfig = BeautySoftConfig["grid"];

interface ProductListingPageProps {
  categories: BeautySoftCategory[];
  products: BeautySoftProduct[];
  activeCategoryId: string | null;
  activeTab?: NavTab;
  currencySymbol?: string;
  /** @deprecated — removed from product cards, kept for API compat */
  favorites?: Set<string>;
  layout?: LayoutConfig;
  grid?: GridConfig;
  onBack?: () => void;
  onSearchOpen?: () => void;
  onCategoryChange?: (id: string | null) => void;
  onProductClick?: (productId: string) => void;
  /** @deprecated — removed from product cards, kept for API compat */
  onFavoriteToggle?: (productId: string) => void;
  onTabChange?: (tab: NavTab) => void;
}

export function ProductListingPage({
  categories,
  products,
  activeCategoryId,
  activeTab = "home",
  currencySymbol = "$",
  layout,
  grid,
  onBack,
  onSearchOpen,
  onCategoryChange,
  onProductClick,
  onTabChange,
}: ProductListingPageProps) {
  // favorites and onFavoriteToggle intentionally not used — removed from product cards
  const mobileGrid = grid?.products?.mobile ?? 2;
  const desktopGrid = grid?.products?.desktop ?? 4;

  const gridClass = (() => {
    const mobileClass = `grid-cols-${mobileGrid}`;
    const desktopClass = `lg:grid-cols-${desktopGrid}`;
    return `grid ${mobileClass} ${desktopClass} gap-3`;
  })();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--t-background)" }}
    >
      {/* Header */}
      <header className="px-5 pt-[12px] pb-0 sticky top-0 z-40" style={{ backgroundColor: "var(--t-background)" }}>
        <div className="max-w-5xl mx-auto flex items-center gap-[10px] h-[47px] relative">
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

          <p
            className="absolute left-1/2 -translate-x-1/2 m-0 text-[20px] font-medium text-[var(--t-text-primary)] leading-[22px] tracking-[-0.408px]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Catálogo
          </p>

          <button
            type="button"
            className="ml-auto flex items-center justify-center border-0 cursor-pointer"
            style={{
              width: "47px",
              height: "47px",
              borderRadius: "37px",
              backgroundColor: "var(--t-section-bg)",
            }}
            aria-label="Buscar"
            onClick={onSearchOpen}
          >
            <Search size={20} strokeWidth={2} className="text-[var(--t-text-primary)]" />
          </button>
        </div>

        {/* Category filter pills */}
        {categories.length > 0 && (
          <div className="mt-3 pb-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            <div className="flex items-center gap-2 max-w-5xl mx-auto" style={{ width: "max-content", minWidth: "100%" }}>
              <button
                type="button"
                className="flex-shrink-0 px-4 h-8 text-sm font-medium border-0 cursor-pointer transition-colors duration-200 leading-[22px] tracking-[-0.408px]"
                style={{
                  fontFamily: "var(--font-sans)",
                  borderRadius: "20px",
                  backgroundColor:
                    activeCategoryId === null
                      ? "var(--t-category-active-bg)"
                      : "var(--t-section-bg)",
                  color:
                    activeCategoryId === null
                      ? "var(--t-category-active-text)"
                      : "var(--t-text-primary)",
                }}
                onClick={() => onCategoryChange?.(null)}
              >
                Todos
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className="flex-shrink-0 px-4 h-8 text-sm font-medium border-0 cursor-pointer transition-colors duration-200 leading-[22px] tracking-[-0.408px]"
                  style={{
                    fontFamily: "var(--font-sans)",
                    borderRadius: "20px",
                    backgroundColor:
                      activeCategoryId === cat.id
                        ? "var(--t-category-active-bg)"
                        : "var(--t-section-bg)",
                    color:
                      activeCategoryId === cat.id
                        ? "var(--t-category-active-text)"
                        : "var(--t-text-primary)",
                  }}
                  onClick={() => onCategoryChange?.(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main
        className="flex-1 max-w-5xl mx-auto w-full px-5 pt-4"
        style={{ paddingBottom: "calc(100px + env(safe-area-inset-bottom, 0px))" }}
      >
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <p
              className="m-0 text-base font-semibold text-[var(--t-text-primary)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Sin productos en esta categoría
            </p>
            <button
              type="button"
              className="px-4 py-2 border-0 cursor-pointer text-sm font-medium text-[var(--t-primary)]"
              style={{ fontFamily: "var(--font-sans)", background: "none" }}
              onClick={() => onCategoryChange?.(null)}
            >
              Ver todos los productos
            </button>
          </div>
        ) : (
          <div className={gridClass}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currencySymbol={currencySymbol}
                layout={layout}
                onClick={() => onProductClick?.(product.id)}
              />
            ))}
          </div>
        )}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
