"use client";

// Food Night — Product Listing Page
// Full catalog with category filter pills + masonry stagger grid

import { Header } from "./Header";
import { CategorySection } from "./CategorySection";
import { ProductCard } from "./ProductCard";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { gridColsClass } from "../utils/grid-classes";
import type { StoreInfo, Category, StorefrontProduct, NavTab } from "../types";

interface ProductListingPageProps {
  store: StoreInfo;
  categories: Category[];
  products: StorefrontProduct[];
  activeCategoryId?: string | null;
  activeTab?: NavTab;
  cartItemCount?: number;
  currencySymbol?: string;
  layout?: {
    cardStyle?: string;
    cardHoverEffect?: string;
    cardImageRatio?: string;
    headerStyle?: string;
    footerStyle?: string;
  };
  grid?: {
    listing?: { mobile: number; desktop: number };
  };
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onCategoryChange?: (id: string | null) => void;
  onProductClick?: (productId: string) => void;
  onWishlistToggle?: (productId: string) => void;
  onTabChange?: (tab: NavTab) => void;
}

export function ProductListingPage({
  store,
  categories,
  products,
  activeCategoryId = null,
  activeTab = "home",
  cartItemCount = 0,
  currencySymbol = "$",
  layout,
  grid,
  onSearchClick,
  onCartClick,
  onCategoryChange,
  onProductClick,
  onWishlistToggle,
  onTabChange,
}: ProductListingPageProps) {
  const listingMobile = grid?.listing?.mobile ?? 2;
  const listingDesktop = grid?.listing?.desktop ?? 3;

  const filteredProducts =
    activeCategoryId === null
      ? products
      : products.filter((p) => p.categoryId === activeCategoryId);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--t-background)" }}>
      <Header
        store={store}
        cartItemCount={cartItemCount}
        layout={layout}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-24 md:pb-12 pt-4">
        <h1 className="text-[18px] font-bold mb-4" style={{ color: "var(--t-text-primary)" }}>
          Catálogo completo
        </h1>

        {/* Category filter */}
        {categories.length > 0 && (
          <section className="mb-5" aria-label="Filtrar por categoría">
            <CategorySection
              categories={categories}
              activeCategoryId={activeCategoryId}
              onCategoryChange={onCategoryChange}
            />
          </section>
        )}

        {/* Product grid */}
        {filteredProducts.length > 0 ? (
          <section aria-label="Todos los productos">
            <div className={`grid ${gridColsClass(listingMobile, listingDesktop)} gap-3 md:gap-4 lg:gap-5 items-start`}>
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currencySymbol={currencySymbol}
                  variant={index % 2 === 0 ? "tall" : "short"}
                  layout={layout}
                  onClick={() => onProductClick?.(product.id)}
                  onWishlistToggle={() => onWishlistToggle?.(product.id)}
                />
              ))}
            </div>
          </section>
        ) : (
          <div
            className="flex flex-col items-center justify-center py-20 gap-3"
            role="status"
            aria-label="Sin productos"
          >
            <span style={{ fontSize: "40px" }} aria-hidden="true">🍕</span>
            <p className="text-[14px] font-normal" style={{ color: "var(--t-text-muted)" }}>
              No hay platos en esta categoría
            </p>
          </div>
        )}
      </main>

      <Footer store={store} layout={layout} />

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
