"use client";

// Beauty Elegant Template — Product Listing Page
// Full catalog with category filter + product grid.

import { useState, useCallback } from "react";
import { ChevronLeft } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { CategorySection } from "./CategorySection";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { gridColsClass } from "../utils/grid-classes";
import type { BeautyElegantProduct, BeautyElegantCategory } from "../types";
import type { StoreInfo } from "../types";

interface ProductListingPageProps {
  store: StoreInfo;
  categories: BeautyElegantCategory[];
  products: BeautyElegantProduct[];
  currencySymbol?: string;
  layout?: {
    cardStyle?: string;
    cardHoverEffect?: string;
    cardImageRatio?: string;
    footerStyle?: string;
  };
  grid?: {
    listing?: { mobile: number; desktop: number };
  };
  onProductClick?: (productId: string) => void;
  onBack?: () => void;
}

export function ProductListingPage({
  store,
  categories,
  products,
  currencySymbol = "$",
  layout,
  grid,
  onProductClick,
  onBack,
}: ProductListingPageProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const handleCategoryChange = useCallback((id: string | null) => {
    setActiveCategoryId(id);
  }, []);

  const listingGrid = grid?.listing ?? { mobile: 2, desktop: 4 };
  const gridClass = gridColsClass(listingGrid.mobile, listingGrid.desktop);

  const visibleProducts =
    activeCategoryId === null
      ? products
      : products.filter((p) => p.categoryId === activeCategoryId);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--t-background)" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-40"
        style={{
          backgroundColor: "var(--t-header-bg)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--t-nav-border)",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center gap-3 px-5 h-14">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center justify-center w-9 h-9 flex-shrink-0"
            style={{ background: "none", border: "none", cursor: "pointer" }}
            aria-label="Volver"
          >
            <ChevronLeft size={20} strokeWidth={2} color="var(--t-text-primary)" />
          </button>
          <h1 className="text-lg font-bold" style={{ color: "var(--t-text-primary)", margin: 0 }}>
            Catálogo
          </h1>
        </div>
      </header>

      {/* Categories */}
      <div
        className="sticky top-14 z-30 px-5 md:px-6 lg:px-8 py-3"
        style={{
          backgroundColor: "var(--t-header-bg)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--t-nav-border)",
        }}
      >
        <CategorySection
          categories={categories}
          activeCategoryId={activeCategoryId}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Main */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-5 md:px-6 lg:px-8 pt-6 pb-[calc(80px+env(safe-area-inset-bottom,0px))] md:pb-8">
        {visibleProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <p className="text-base font-semibold" style={{ color: "var(--t-text-primary)" }}>
              Sin productos en esta categoría
            </p>
          </div>
        ) : (
          <div
            className={`grid ${gridClass}`}
            style={{ gap: "var(--t-space-gap, 1rem)" }}
          >
            {visibleProducts.map((product) => (
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

      <Footer store={store} layout={layout} />
      <BottomNav activeTab="home" />
    </div>
  );
}
