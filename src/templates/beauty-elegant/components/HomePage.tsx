"use client";

// Beauty Elegant Template — Home Page Layout
// Purple blurred background image, brand name, search bar, category tabs,
// product grid, footer, bottom nav. sectionRenderers pattern for reordering.

import React, { Fragment } from "react";
import { SearchBar } from "./SearchBar";
import { ProductCard } from "./ProductCard";
import { HeaderRouter } from "./HeaderRouter";
import { HeroRouter } from "./HeroRouter";
import { CategoryNavRouter } from "./CategoryNavRouter";
import { FooterRouter } from "./FooterRouter";
import { BottomNavRouter } from "./BottomNavRouter";
import { beautyElegantConfig } from "../config";
import { gridColsClass } from "../utils/grid-classes";
import type { BeautyElegantProduct, BeautyElegantCategory, NavTab } from "../types";
import type { StoreInfo } from "../types";
import type { StructuralVariants } from "@/types/templates/structural-variants";

interface HomePageProps {
  store: StoreInfo;
  categories: BeautyElegantCategory[];
  products: BeautyElegantProduct[];
  activeCategoryId?: string | null;
  activeTab?: NavTab;
  cartItemCount?: number;
  currencySymbol?: string;
  heroBanner?: {
    title?: string;
    subtitle?: string;
    ctaText?: string;
    imageUrl?: string;
  };
  layout?: {
    cardStyle?: string;
    cardHoverEffect?: string;
    cardImageRatio?: string;
    headerStyle?: string;
    footerStyle?: string;
  };
  grid?: {
    products?: { mobile: number; desktop: number };
  };
  sections?: Array<{ id: string; visible: boolean }>;
  structuralVariants?: StructuralVariants;
  onCategoryChange?: (id: string | null) => void;
  onProductClick?: (productId: string) => void;
  onSearchOpen?: () => void;
  onCartOpen?: () => void;
  onTabChange?: (tab: NavTab) => void;
  onSeeAll?: () => void;
}

export function HomePage({
  store,
  categories,
  products,
  activeCategoryId = null,
  activeTab = "home",
  cartItemCount = 0,
  currencySymbol = "$",
  heroBanner,
  layout,
  grid,
  sections,
  structuralVariants,
  onCategoryChange,
  onProductClick,
  onSearchOpen,
  onCartOpen,
  onTabChange,
  onSeeAll,
}: HomePageProps) {
  const productGrid = grid?.products ?? { mobile: 2, desktop: 4 };
  const gridClass = gridColsClass(productGrid.mobile, productGrid.desktop);

  const defaultSections = [
    { id: "hero", visible: true },
    { id: "categories", visible: true },
    { id: "products", visible: true },
  ];
  const activeSections = sections ?? defaultSections;

  const sectionRenderers: Record<string, () => React.ReactNode> = {
    hero: () => (
      <section aria-label="Banner principal">
        <HeroRouter
          heroBanner={heroBanner}
          storeName={store.name}
          structuralVariants={structuralVariants}
          recipe={beautyElegantConfig.recipe}
          onCtaClick={onSeeAll}
        />
      </section>
    ),

    categories: () => (
      <CategoryNavRouter
        categories={categories}
        activeCategoryId={activeCategoryId}
        structuralVariants={structuralVariants}
        recipe={beautyElegantConfig.recipe}
        onCategoryClick={(id) => onCategoryChange?.(id)}
      />
    ),

    products: () => (
      <section
        aria-labelledby="products-heading"
        style={{ paddingTop: "var(--t-space-section, 2rem)", paddingBottom: "var(--t-space-section, 2rem)" }}
      >
        <h2 id="products-heading" className="sr-only">Productos</h2>
        <div
          className={`grid ${gridClass}`}
          style={{ gap: "var(--t-space-gap, 1rem)" }}
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
      </section>
    ),
  };

  return (
    <div
      className="min-h-screen relative"
      style={{ backgroundColor: "var(--t-background)" }}
    >
      {/* Purple blurred background overlay — mobile only */}
      <div
        className="fixed inset-0 z-0 pointer-events-none md:hidden"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 70% 20%, rgba(119,0,207,0.12) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Desktop Header */}
      <HeaderRouter
        store={store}
        structuralVariants={structuralVariants}
        recipe={beautyElegantConfig.recipe}
        cartItemCount={cartItemCount}
        onSearchClick={onSearchOpen}
        onCartClick={onCartOpen}
      />

      {/* Main content */}
      <main
        className="relative z-10 max-w-7xl mx-auto px-5 md:px-6 lg:px-8 pt-4 lg:pt-6 pb-[calc(80px+env(safe-area-inset-bottom,0px))] md:pb-8 flex flex-col gap-5"
      >
        {/* Search Bar — always visible */}
        <SearchBar placeholder="Buscar productos..." onFocus={onSearchOpen} />

        {/* Dynamic sections */}
        {activeSections
          .filter((s) => s.visible)
          .map((s) => (
            <Fragment key={s.id}>{sectionRenderers[s.id]?.()}</Fragment>
          ))}
      </main>

      {/* Footer */}
      <FooterRouter
        store={store}
        structuralVariants={structuralVariants}
        recipe={beautyElegantConfig.recipe}
      />

      {/* Bottom Navigation — mobile only */}
      <BottomNavRouter
        activeTab={activeTab}
        cartItemCount={cartItemCount}
        structuralVariants={structuralVariants}
        recipe={beautyElegantConfig.recipe}
        onTabChange={(tab) => {
          if (tab === "cart") onCartOpen?.();
          else onTabChange?.(tab);
        }}
      />
    </div>
  );
}
