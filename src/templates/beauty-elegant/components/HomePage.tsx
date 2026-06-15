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
import { HeroBanner } from "./HeroBanner";
import { gridColsClass } from "../../_shared/utils/grid-classes";
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
  activeHref?: string;
  onCategoryChange?: (id: string | null) => void;
  onProductClick?: (productId: string) => void;
  onSearchOpen?: () => void;
  onCartOpen?: () => void;
  onNavLinkClick?: (href: string) => void;
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
  activeHref,
  onCategoryChange,
  onProductClick,
  onSearchOpen,
  onCartOpen,
  onNavLinkClick,
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
        <HeroBanner
          title={heroBanner?.title}
          subtitle={heroBanner?.subtitle}
          ctaText={heroBanner?.ctaText}
          imageUrl={heroBanner?.imageUrl}
          storeName={store.name}
          onCtaClick={onSeeAll}
        />
      </section>
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
            background: "radial-gradient(ellipse at 70% 20%, color-mix(in srgb, var(--t-primary) 12%, transparent) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Desktop Header */}
      <Header
        store={store}
        cartItemCount={cartItemCount}
        layout={layout}
        activeHref={activeHref}
        onSearchOpen={onSearchOpen}
        onCartOpen={onCartOpen}
        onNavLinkClick={onNavLinkClick}
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
        cartItemCount={cartItemCount}
        onTabChange={onTabChange}
      />
    </div>
  );
}
