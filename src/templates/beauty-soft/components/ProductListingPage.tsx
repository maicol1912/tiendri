// Beauty Soft Template — Product Listing Page (Presentational)
// Full catalog grid with category filter pills + shared Header.
// ZERO hardcoded colors — all via var(--t-*).

import { Header } from "./Header";
import { ProductCard } from "./ProductCard";
import { BottomNav } from "./BottomNav";
import type { BeautySoftProduct, BeautySoftCategory, NavTab } from "../types";
import type { BeautySoftConfig } from "../config";
import type { StoreInfo } from "@/types/store";

type LayoutConfig = BeautySoftConfig["layout"];
type GridConfig = BeautySoftConfig["grid"];

interface ProductListingPageProps {
  store: StoreInfo;
  categories: BeautySoftCategory[];
  products: BeautySoftProduct[];
  activeCategoryId: string | null;
  activeTab?: NavTab;
  cartItemCount?: number;
  currencySymbol?: string;
  /** @deprecated — removed from product cards, kept for API compat */
  favorites?: Set<string>;
  layout?: LayoutConfig;
  grid?: GridConfig;
  activeHref?: string;
  onBack?: () => void;
  onSearchOpen?: () => void;
  onCartClick?: () => void;
  onCategoryChange?: (id: string | null) => void;
  onProductClick?: (productId: string) => void;
  /** @deprecated — removed from product cards, kept for API compat */
  onFavoriteToggle?: (productId: string) => void;
  onTabChange?: (tab: NavTab) => void;
  onNavLinkClick?: (href: string) => void;
}

export function ProductListingPage({
  store,
  categories,
  products,
  activeCategoryId,
  activeTab = "home",
  cartItemCount = 0,
  currencySymbol = "$",
  layout,
  grid,
  activeHref,
  onBack: _onBack,
  onSearchOpen,
  onCartClick,
  onCategoryChange,
  onProductClick,
  onTabChange,
  onNavLinkClick,
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
      <Header
        store={store}
        cartItemCount={cartItemCount}
        activeHref={activeHref}
        onSearchClick={onSearchOpen}
        onCartClick={onCartClick}
        onNavLinkClick={onNavLinkClick}
      />

      {/* Category filter pills */}
      <div className="sticky top-[60px] z-30 px-5 pt-3 pb-2" style={{ backgroundColor: "var(--t-background)" }}>
        {categories.length > 0 && (
          <div className="pb-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            <div className="flex items-center gap-2 max-w-5xl mx-auto" style={{ width: "max-content", minWidth: "100%" }}>
              <button
                type="button"
                className="flex-shrink-0 px-4 h-8 text-sm font-medium border-0 cursor-pointer transition-colors duration-200 leading-[22px] tracking-[-0.408px]"
                style={{
                  fontFamily: "var(--font-sans)",
                  borderRadius: "20px",
                  backgroundColor:
                    activeCategoryId === null
                      ? "var(--t-primary)"
                      : "var(--t-background)",
                  color:
                    activeCategoryId === null
                      ? "var(--t-on-primary)"
                      : "var(--t-foreground)",
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
                        ? "var(--t-primary)"
                        : "var(--t-background)",
                    color:
                      activeCategoryId === cat.id
                        ? "var(--t-on-primary)"
                        : "var(--t-foreground)",
                  }}
                  onClick={() => onCategoryChange?.(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <main
        className="flex-1 max-w-5xl mx-auto w-full px-5 pt-4"
        style={{ paddingBottom: "calc(100px + env(safe-area-inset-bottom, 0px))" }}
      >
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <p
              className="m-0 text-base font-semibold text-[var(--t-foreground)]"
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
          <div
            className={gridClass}
            style={{ gap: "var(--t-space-gap, 0.75rem)" }}
          >
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
