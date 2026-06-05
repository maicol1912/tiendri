"use client";

// Pets Classic — Product Listing / Catalog Page
// Grid with optional category filter. All colors via var(--t-*).

import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { ProductCard } from "./ProductCard";
import { CategoryRow } from "./CategorySection";
import { gridColsClass } from "../utils/grid-classes";
import { petsClassicConfig } from "../config";
import type { PetsClassicConfig } from "../config";
import type {
  StoreInfo,
  PetsClassicCategory,
  PetsClassicProduct,
  NavTab,
} from "../types";

interface ProductListingPageProps {
  store: StoreInfo;
  categories: PetsClassicCategory[];
  products: PetsClassicProduct[];
  layout?: PetsClassicConfig["layout"];
  grid?: PetsClassicConfig["grid"];
  activeTab?: NavTab;
  activeCategoryId?: string | null;
  cartItemCount?: number;
  currencySymbol?: string;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onMenuClick?: () => void;
  onTabChange?: (tab: NavTab) => void;
  onCategoryChange?: (id: string | null) => void;
  onProductClick?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
}

export function ProductListingPage({
  store,
  categories,
  products,
  layout,
  grid = petsClassicConfig.grid,
  activeTab = "home",
  activeCategoryId = null,
  cartItemCount = 0,
  currencySymbol = "$",
  onSearchClick,
  onCartClick,
  onMenuClick,
  onTabChange,
  onCategoryChange,
  onProductClick,
}: ProductListingPageProps) {
  const filteredProducts = activeCategoryId
    ? products.filter((p) => p.categoryId === activeCategoryId)
    : products;

  const activeCategory = activeCategoryId
    ? categories.find((c) => c.id === activeCategoryId)
    : null;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--t-background)", fontFamily: "var(--t-font, Poppins, sans-serif)" }}
    >
      <Header
        store={store}
        cartItemCount={cartItemCount}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
        onMenuClick={onMenuClick}
      />

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-4 pb-32 lg:pb-8">
        {/* Page heading */}
        <div className="flex items-center justify-between mb-4">
          <h1 style={{ fontSize: "18px", fontWeight: 700, color: "var(--t-text-primary)" }}>
            {activeCategory ? activeCategory.name : "Catálogo"}
          </h1>
          <span style={{ fontSize: "12px", color: "var(--t-text-muted)" }}>
            {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Category filter row */}
        {categories.length > 0 && (
          <div className="mb-6">
            <CategoryRow
              categories={categories}
              activeCategoryId={activeCategoryId}
              onCategoryChange={onCategoryChange}
            />
          </div>
        )}

        {/* Product grid */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <span style={{ fontSize: "40px" }}>🐾</span>
            <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--t-text-primary)" }}>
              Sin productos en esta categoría
            </p>
            <p style={{ fontSize: "13px", color: "var(--t-text-muted)" }}>
              Prueba seleccionando otra categoría.
            </p>
            {activeCategoryId && (
              <button
                type="button"
                onClick={() => onCategoryChange?.(null)}
                className="px-5 py-2"
                style={{
                  borderRadius: "var(--t-radius-button)",
                  backgroundColor: "var(--t-button-bg)",
                  color: "var(--t-button-text)",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                Ver todos
              </button>
            )}
          </div>
        ) : (
          <div className={`grid ${gridColsClass(grid.listing.mobile, grid.listing.desktop)} gap-3`}>
            {filteredProducts.map((product) => (
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
