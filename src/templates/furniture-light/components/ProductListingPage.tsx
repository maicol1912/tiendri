// Furniture Light — Listing / Catalog Page
// Header + category tabs + products grid with count
// ZERO hardcoded colors

import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { CategorySection } from "./CategorySection";
import { ProductCard } from "./ProductCard";
import { gridColsClass } from "../utils/grid-classes";
import type { FurnitureLightConfig } from "../config";
import type { FurnitureProduct, FurnitureCategory, FurnitureStoreInfo, FurnitureNavTab } from "../types";

interface ProductListingPageProps {
  store: FurnitureStoreInfo;
  navLinks?: readonly { label: string; href: string }[];
  products: FurnitureProduct[];
  categories?: FurnitureCategory[];
  layout?: FurnitureLightConfig["layout"];
  grid?: FurnitureLightConfig["grid"];
  activeCategoryId?: string | null;
  activeTab?: FurnitureNavTab;
  cartItemCount?: number;
  currencySymbol?: string;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onCategoryChange?: (id: string | null) => void;
  onProductClick?: (productId: string) => void;
  onWishlistToggle?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
  onTabChange?: (tab: FurnitureNavTab) => void;
}

export function ProductListingPage({
  store,
  navLinks = [],
  products,
  categories = [],
  layout,
  grid,
  activeCategoryId = null,
  activeTab = "home",
  cartItemCount = 0,
  currencySymbol = "$",
  onSearchClick,
  onCartClick,
  onCategoryChange,
  onProductClick,
  onWishlistToggle,
  onAddToCart,
  onTabChange,
}: ProductListingPageProps) {
  const gridCols = grid?.listing ?? { mobile: 2, desktop: 3 };

  return (
    <div className="min-h-screen bg-[var(--t-background)]">
      <Header
        store={store}
        navLinks={navLinks as { label: string; href: string }[]}
        cartItemCount={cartItemCount}
        onCartClick={onCartClick}
        onSearchClick={onSearchClick}
      />

      <main className="pt-[60px] lg:pt-[72px] pb-28 lg:pb-8 max-w-6xl mx-auto">
        {/* Page title */}
        <div className="px-5 md:px-6 lg:px-8 py-4 border-b border-[var(--t-border)]">
          <h1
            className="text-[var(--t-text-primary)]"
            style={{
              fontFamily: "var(--font-display, var(--font-sans, 'Inter', sans-serif))",
              fontWeight: "var(--t-type-heading-weight, 700)" as React.CSSProperties["fontWeight"],
              fontSize: "var(--t-type-heading-size, 1.25rem)",
              letterSpacing: "var(--t-type-heading-tracking, 0em)",
              textTransform: "var(--t-type-heading-transform, none)" as React.CSSProperties["textTransform"],
            }}
          >
            Catálogo
          </h1>
        </div>

        {/* Category tabs */}
        {categories.length > 0 && (
          <div className="py-3 border-b border-[var(--t-border)]">
            <CategorySection
              categories={categories}
              activeCategoryId={activeCategoryId}
              onCategoryChange={onCategoryChange}
            />
          </div>
        )}

        {/* Products */}
        <div className="px-5 md:px-6 lg:px-8 mt-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-[var(--t-text-muted)]">{products.length} productos</p>
          </div>

          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20">
              <p className="text-sm font-semibold text-[var(--t-text-primary)]">Sin productos en esta categoría</p>
            </div>
          ) : (
            <div className={`grid ${gridColsClass(gridCols.mobile, gridCols.desktop)}`} style={{ gap: "var(--t-space-gap, 0.75rem)" }}>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currencySymbol={currencySymbol}
                  layout={layout}
                  onProductClick={onProductClick}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer store={store} layout={layout} />

      <BottomNav
        activeTab={activeTab}
        cartItemCount={cartItemCount}
        onTabChange={(tab) => {
          if (tab === "search") onSearchClick?.();
          else if (tab === "cart") onCartClick?.();
          else onTabChange?.(tab);
        }}
      />
    </div>
  );
}
