"use client";

// Beauty Elegant Template — Home Page Layout
// Purple blurred background image, brand name, search bar, category tabs,
// product grid, footer, bottom nav. sectionRenderers pattern for reordering.

import React, { Fragment } from "react";
import { SearchBar } from "./SearchBar";
import { CategorySection } from "./CategorySection";
import { ProductCard } from "./ProductCard";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { Header } from "./Header";
import { gridColsClass } from "../utils/grid-classes";
import type { BeautyElegantProduct, BeautyElegantCategory, NavTab } from "../types";
import type { StoreInfo } from "../types";

interface HomePageProps {
  store: StoreInfo;
  categories: BeautyElegantCategory[];
  products: BeautyElegantProduct[];
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
    products?: { mobile: number; desktop: number };
  };
  sections?: Array<{ id: string; visible: boolean }>;
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
  layout,
  grid,
  sections,
  onCategoryChange,
  onProductClick,
  onSearchOpen,
  onCartOpen,
  onTabChange,
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
      /* Mobile-only brand welcome header */
      <div className="md:hidden">
        <h1
          className="text-[28px] font-extrabold leading-tight m-0"
          style={{ color: "var(--t-text-primary)" }}
        >
          {store.name}
        </h1>
        <p
          className="text-sm mt-1"
          style={{ color: "var(--t-text-muted)", margin: "4px 0 0 0" }}
        >
          Bienvenida, explora nuestros productos
        </p>
      </div>
    ),

    categories: () => (
      <section aria-labelledby="categories-heading">
        <h2 id="categories-heading" className="sr-only">Categorías</h2>
        <CategorySection
          categories={categories}
          activeCategoryId={activeCategoryId}
          onCategoryChange={onCategoryChange}
        />
      </section>
    ),

    products: () => (
      <section aria-labelledby="products-heading">
        <h2 id="products-heading" className="sr-only">Productos</h2>
        <div className={`grid gap-4 md:gap-5 lg:gap-6 ${gridClass}`}>
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
      <Header
        store={store}
        cartItemCount={cartItemCount}
        layout={layout}
        onSearchOpen={onSearchOpen}
        onCartOpen={onCartOpen}
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
      <Footer store={store} layout={layout} />

      {/* Bottom Navigation — mobile only */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
    </div>
  );
}
