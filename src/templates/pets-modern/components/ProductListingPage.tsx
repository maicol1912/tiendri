"use client";

// Pets Modern Template — Product Listing Page
// Grid of product cards with category filter row at top.
// Back button navigates to home. Uses sectionRenderers pattern.
// ZERO hardcoded colors — all via CSS variables.

import { ArrowLeft } from "lucide-react";
import { Header } from "./Header";
import { ProductCard } from "./ProductCard";
import { BottomNav } from "./BottomNav";
import { gridColsClass } from "../utils/grid-classes";
import { petsModernConfig } from "../config";
import type { PetsModernConfig } from "../config";
import type {
  StoreInfo,
  StorefrontProduct,
  PetCategory,
  NavTab,
} from "../types";

interface ProductListingPageProps {
  store: StoreInfo;
  categories: PetCategory[];
  products: StorefrontProduct[];
  layout?: PetsModernConfig["layout"];
  grid?: PetsModernConfig["grid"];
  activeTab?: NavTab;
  activeCategoryId?: string | null;
  cartItemCount?: number;
  currencySymbol?: string;
  onBack?: () => void;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onTabChange?: (tab: NavTab) => void;
  onCategoryChange?: (id: string | null) => void;
  onProductClick?: (productId: string) => void;
  onAddToCart?: (product: StorefrontProduct) => void;
}

function formatPrice(price: number, symbol: string): string {
  return `${symbol}${new Intl.NumberFormat("en-US").format(price)}`;
}

export function ProductListingPage({
  store,
  categories,
  products,
  layout,
  grid = petsModernConfig.grid,
  activeTab = "shop",
  activeCategoryId = null,
  cartItemCount = 0,
  currencySymbol = "$",
  onBack,
  onSearchClick,
  onCartClick,
  onTabChange,
  onCategoryChange,
  onProductClick,
  onAddToCart,
}: ProductListingPageProps) {
  const listingGrid = (grid as Record<string, { mobile: number; desktop: number }>)?.listing ??
    { mobile: 2, desktop: 4 };

  const filteredProducts = activeCategoryId
    ? products.filter((p) => p.categoryId === activeCategoryId)
    : products;

  const activeCategory = activeCategoryId
    ? categories.find((c) => c.id === activeCategoryId)
    : null;

  return (
    <div
      className="min-h-screen pb-24 lg:pb-8"
      style={{ backgroundColor: "var(--t-background)" }}
    >
      <Header
        storeName={store.name}
        logoUrl={store.logo}
        cartItemCount={cartItemCount}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
        onHomeClick={onBack}
        layout={layout}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Back + Page title */}
        <div className="flex items-center gap-3 pt-4 pb-2">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center justify-center w-9 h-9 rounded-[var(--t-radius-button)] transition-colors hover:bg-[var(--t-surface)]"
            aria-label="Volver"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--t-text-primary)]" strokeWidth={2} />
          </button>
          <div>
            <h1
              className="text-lg font-bold text-[var(--t-text-primary)] m-0 leading-tight"
            >
              {activeCategory ? activeCategory.name : "Catálogo"}
            </h1>
            <p className="text-xs text-[var(--t-text-muted)] m-0">
              {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Category filter pills */}
        {categories.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0 mt-2 mb-4">
            {/* "Todos" pill */}
            <button
              type="button"
              onClick={() => onCategoryChange?.(null)}
              className="flex-shrink-0 px-4 py-1.5 text-sm font-medium rounded-full border transition-all duration-200"
              style={{
                backgroundColor: activeCategoryId === null
                  ? "var(--t-primary)"
                  : "var(--t-surface)",
                color: activeCategoryId === null
                  ? "var(--t-button-text)"
                  : "var(--t-text-secondary)",
                borderColor: activeCategoryId === null
                  ? "var(--t-primary)"
                  : "var(--t-border)",
              }}
            >
              Todos
            </button>

            {categories.map((cat) => {
              const isActive = activeCategoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onCategoryChange?.(cat.id)}
                  className="flex-shrink-0 px-4 py-1.5 text-sm font-medium rounded-full border transition-all duration-200"
                  style={{
                    backgroundColor: isActive ? "var(--t-primary)" : "var(--t-surface)",
                    color: isActive ? "var(--t-button-text)" : "var(--t-text-secondary)",
                    borderColor: isActive ? "var(--t-primary)" : "var(--t-border)",
                  }}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        )}

        {/* Product grid */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <span className="text-5xl" aria-hidden="true">🐾</span>
            <div className="text-center">
              <p className="text-[var(--t-text-primary)] font-semibold text-base">
                Sin productos en esta categoría
              </p>
              <p className="text-[var(--t-text-muted)] text-sm mt-1">
                Probá seleccionando otra categoría.
              </p>
            </div>
            {activeCategoryId && (
              <button
                type="button"
                onClick={() => onCategoryChange?.(null)}
                className="px-5 py-2 text-sm font-semibold rounded-[var(--t-radius-button)] transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: "var(--t-button-bg)",
                  color: "var(--t-button-text)",
                  border: "none",
                }}
              >
                Ver todos
              </button>
            )}
          </div>
        ) : (
          <div
            className={`grid ${gridColsClass(listingGrid.mobile, listingGrid.desktop)}`}
            style={{ gap: "var(--t-space-gap, 0.75rem)" }}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currencySymbol={currencySymbol}
                layout={layout}
                onClick={() => onProductClick?.(product.id)}
                onAddToCart={() => onAddToCart?.(product)}
              />
            ))}
          </div>
        )}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
