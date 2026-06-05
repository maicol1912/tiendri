// Furniture Dark — ListingPage
// Back + title + filter bar; optional category banner; product grid
// ALL colors via var(--t-*)

import React from "react";
import Image from "next/image";
import { ChevronLeft, SlidersHorizontal } from "lucide-react";
import type { StorefrontStore, StorefrontProduct, StorefrontCategory, CategoryBannerData } from "../types";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";
import { CategorySection } from "./CategorySection";
import { ProductCard } from "./ProductCard";
import { gridColsClass } from "../utils/grid-classes";
import { bannerHeightClass } from "../utils/layout-classes";

interface ProductListingPageProps {
  store: StorefrontStore;
  products: StorefrontProduct[];
  categories: StorefrontCategory[];
  categoryBanner?: CategoryBannerData | null;
  activeCategoryId?: string;
  cartItemCount?: number;
  gridMobile?: number;
  gridDesktop?: number;
  bannerHeight?: string;
  cardStyle?: string;
  hoverEffect?: string;
  imageRatio?: string;
  onBack: () => void;
  onCategoryClick: (categoryId: string) => void;
  onProductClick: (productId: string) => void;
  onSearchClick: () => void;
  onCartClick: () => void;
  onBottomNavTab: (tab: "home" | "cart" | "search" | "info") => void;
}

export function ProductListingPage({
  store,
  products,
  categories,
  categoryBanner,
  activeCategoryId,
  cartItemCount = 0,
  gridMobile = 2,
  gridDesktop = 4,
  bannerHeight = "normal",
  cardStyle,
  hoverEffect,
  imageRatio,
  onBack,
  onCategoryClick,
  onProductClick,
  onSearchClick,
  onCartClick,
  onBottomNavTab,
}: ProductListingPageProps) {
  return (
    <div
      className="min-h-screen pb-28 lg:pb-12"
      style={{ backgroundColor: "var(--t-background)" }}
    >
      <Header
        store={store}
        cartItemCount={cartItemCount}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
      />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-4">
        {/* Back + title row */}
        <div className="flex items-center gap-3 mb-5">
          <button
            type="button"
            className="flex items-center justify-center w-9 h-9 rounded-full transition-opacity hover:opacity-80"
            style={{ backgroundColor: "var(--t-surface)" }}
            onClick={onBack}
            aria-label="Volver"
          >
            <ChevronLeft size={18} strokeWidth={2} className="text-[var(--t-text-primary)]" />
          </button>
          <h1
            className="text-[var(--t-text-primary)]"
            style={{
              fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
              fontSize: "var(--t-type-heading-size, 1.375rem)",
              fontWeight: "var(--t-type-heading-weight, 700)" as React.CSSProperties["fontWeight"],
              letterSpacing: "var(--t-type-heading-tracking, -0.03em)",
              textTransform: "var(--t-type-heading-transform, none)" as React.CSSProperties["textTransform"],
            }}
          >
            Catálogo
          </h1>

          {/* Filter button */}
          <button
            type="button"
            className="ml-auto flex items-center gap-2 px-3.5 py-2 rounded-[var(--t-radius-button)]"
            style={{ backgroundColor: "var(--t-surface)" }}
            aria-label="Filtros"
          >
            <SlidersHorizontal size={14} strokeWidth={2} className="text-[var(--t-text-primary)]" />
            <span
              className="text-[var(--t-text-primary)]"
              style={{
                fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              Filtros
            </span>
          </button>
        </div>

        {/* Category pills */}
        {categories.length > 0 && (
          <div
            className="flex gap-3 overflow-x-auto pb-4 scrollbar-none"
            style={{ scrollbarWidth: "none" }}
          >
            {categories.map((cat) => (
              <CategorySection
                key={cat.id}
                category={cat}
                isActive={activeCategoryId === cat.id}
                onClick={onCategoryClick}
              />
            ))}
          </div>
        )}

        {/* Category banner */}
        {categoryBanner && (
          <div
            className={`relative w-full overflow-hidden mb-6 ${bannerHeightClass(bannerHeight)}`}
            style={{ borderRadius: "var(--t-radius-card)" }}
          >
            <Image
              src={categoryBanner.image}
              alt={categoryBanner.title ?? "Banner de categoría"}
              fill
              sizes="(max-width: 768px) 100vw, 1280px"
              className="object-cover"
            />
            {categoryBanner.title && (
              <div className="absolute inset-0 flex items-end p-5" style={{ background: "rgba(0,0,0,0.4)" }}>
                <h2
                  className="text-[var(--t-text-primary)]"
                  style={{
                    fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                    fontSize: "22px",
                    fontWeight: 700,
                    letterSpacing: "-0.66px",
                  }}
                >
                  {categoryBanner.title}
                </h2>
              </div>
            )}
          </div>
        )}

        {/* Product grid */}
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <p
              className="text-[var(--t-text-muted)]"
              style={{
                fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                fontSize: "16px",
              }}
            >
              No se encontraron productos
            </p>
          </div>
        ) : (
          <div className={`grid ${gridColsClass(gridMobile, gridDesktop)}`} style={{ gap: "var(--t-space-gap, 1rem)" }}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={onProductClick}
                cardStyle={cardStyle}
                hoverEffect={hoverEffect}
                imageRatio={imageRatio}
              />
            ))}
          </div>
        )}
      </div>

      <BottomNav
        activeTab="home"
        cartItemCount={cartItemCount}
        onTab={onBottomNavTab}
      />
    </div>
  );
}
