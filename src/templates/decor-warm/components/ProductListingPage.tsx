// Decor Warm Template — Product Listing Page (Presentational)
// Header with back + title + search icon.
// Category tab bar filter.
// Product grid.
// ZERO hardcoded colors — all via var(--t-*).

import { ArrowLeft, Search } from "lucide-react";
import { CategoryTabBar } from "./CategoryTabBar";
import { ProductCard } from "./ProductCard";
import { BottomNav } from "./BottomNav";
import { gridColsClass } from "../utils/grid-classes";
import type { DecorWarmProduct, DecorWarmCategory, DecorWarmNavTab } from "../types";
import type { DecorWarmConfig } from "../config";

interface ProductListingPageProps {
  categories: DecorWarmCategory[];
  products: DecorWarmProduct[];
  activeCategoryId?: string | null;
  cartItemCount?: number;
  wishlistCount?: number;
  currencySymbol?: string;
  wishlistedIds?: Set<string>;
  layout?: DecorWarmConfig["layout"];
  grid?: DecorWarmConfig["grid"];
  onBack?: () => void;
  onSearchOpen?: () => void;
  onCategoryChange?: (id: string | null) => void;
  onProductClick?: (productId: string) => void;
  onWishlistToggle?: (productId: string) => void;
  onAddToCart?: (product: DecorWarmProduct) => void;
  onTabChange?: (tab: DecorWarmNavTab) => void;
}

export function ProductListingPage({
  categories,
  products,
  activeCategoryId = null,
  cartItemCount = 0,
  wishlistCount = 0,
  currencySymbol = "$",
  wishlistedIds,
  layout,
  grid,
  onBack,
  onSearchOpen,
  onCategoryChange,
  onProductClick,
  onWishlistToggle,
  onAddToCart,
  onTabChange,
}: ProductListingPageProps) {
  const listingGridClass = gridColsClass(
    grid?.listing?.mobile ?? 2,
    grid?.listing?.desktop ?? 4
  );

  const activeCategory = categories.find((c) => c.id === activeCategoryId);
  const title = activeCategory?.name ?? "Catálogo";

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--t-background)" }}>
      {/* ── Top bar ── */}
      <div
        className="sticky top-0 z-10 flex items-center justify-between px-4 md:px-6 lg:px-8 py-3"
        style={{
          backgroundColor: "var(--t-header-bg)",
          borderBottom: "1px solid var(--t-nav-border)",
        }}
      >
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center"
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            backgroundColor: "var(--t-surface)",
            border: "none",
            cursor: "pointer",
          }}
          aria-label="Volver"
        >
          <ArrowLeft size={18} style={{ color: "var(--t-dark-mode)" }} />
        </button>

        <span
          style={{
            color: "var(--t-dark-mode)",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          {title}
        </span>

        <button
          type="button"
          onClick={onSearchOpen}
          className="flex items-center justify-center"
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            backgroundColor: "var(--t-surface)",
            border: "none",
            cursor: "pointer",
          }}
          aria-label="Buscar"
        >
          <Search size={18} style={{ color: "var(--t-dark-mode)" }} />
        </button>
      </div>

      {/* ── Category tab bar ── */}
      {categories.length > 0 && (
        <div className="py-2" style={{ borderBottom: "1px solid var(--t-border)" }}>
          <CategoryTabBar
            categories={categories}
            activeCategoryId={activeCategoryId}
            onCategoryChange={onCategoryChange}
          />
        </div>
      )}

      {/* ── Products ── */}
      <main
        className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8 py-4"
        style={{ paddingBottom: "calc(80px + env(safe-area-inset-bottom, 0px))" }}
      >
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <p
              style={{
                color: "var(--t-text-muted)",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "14px",
                margin: 0,
              }}
            >
              No hay productos en esta categoría
            </p>
          </div>
        ) : (
          <div className={`grid ${listingGridClass} gap-4`} aria-label="Listado de productos">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={{ ...product, inWishlist: wishlistedIds?.has(product.id) ?? product.inWishlist }}
                currencySymbol={currencySymbol}
                layout={layout}
                onClick={onProductClick ? () => onProductClick(product.id) : undefined}
                onWishlistToggle={onWishlistToggle ? () => onWishlistToggle(product.id) : undefined}
                onAddToCart={onAddToCart ? () => onAddToCart(product) : undefined}
              />
            ))}
          </div>
        )}
      </main>

      <BottomNav
        activeTab="categories"
        cartItemCount={cartItemCount}
        wishlistCount={wishlistCount}
        onTabChange={onTabChange}
      />
    </div>
  );
}
