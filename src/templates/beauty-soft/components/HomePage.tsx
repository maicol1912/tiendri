// Beauty Soft Template — Home Page Layout
// Assembly: Header > HeroBanner > SearchBar > CategoryNav > ProductGrid > Footer > BottomNav
// Uses sectionRenderers pattern for dynamic section ordering/visibility.
// ZERO hardcoded colors.

import React, { Fragment } from "react";
import { Header } from "./Header";
import { HeroBanner } from "./HeroBanner";
import { SearchBar } from "./SearchBar";
import { CategorySection } from "./CategorySection";
import { ProductCard } from "./ProductCard";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { HeaderRouter } from "./HeaderRouter";
import { HeroRouter } from "./HeroRouter";
import { FooterRouter } from "./FooterRouter";
import { BottomNavRouter } from "./BottomNavRouter";
import { beautySoftConfig } from "../config";
import type { StructuralVariants } from "@/types/templates/structural-variants";
import { gridColsClass } from "../utils/grid-classes";
import type { BeautySoftProduct, BeautySoftCategory, HeroBannerData, NavTab } from "../types";
import type { StoreInfo } from "@/types/store";
import type { BeautySoftConfig } from "../config";

interface HomePageProps {
  store: StoreInfo;
  categories: BeautySoftCategory[];
  products: BeautySoftProduct[];
  activeCategoryId?: string | null;
  activeTab?: NavTab;
  cartItemCount?: number;
  currencySymbol?: string;
  heroBanner?: HeroBannerData | null;
  layout?: BeautySoftConfig["layout"];
  grid?: BeautySoftConfig["grid"];
  sections?: Array<{ id: string; visible: boolean }>;
  onCategoryChange?: (id: string | null) => void;
  onProductClick?: (productId: string) => void;
  onSearchOpen?: () => void;
  onCartOpen?: () => void;
  onTabChange?: (tab: NavTab) => void;
  onSeeAll?: () => void;
  structuralVariants?: StructuralVariants;
}

export function HomePage({
  store,
  categories,
  products,
  activeCategoryId = null,
  activeTab = "home",
  cartItemCount = 0,
  currencySymbol = "$",
  heroBanner = null,
  layout,
  grid,
  sections,
  onCategoryChange,
  onProductClick,
  onSearchOpen,
  onCartOpen,
  onTabChange,
  onSeeAll,
  structuralVariants,
}: HomePageProps) {
  const productGridClass = gridColsClass(
    grid?.products?.mobile ?? 2,
    grid?.products?.desktop ?? 4
  );

  const sectionRenderers: Record<string, () => React.ReactNode> = {
    hero: () =>
      heroBanner ? (
        <HeroRouter
          banner={heroBanner}
          structuralVariants={structuralVariants}
          recipe={beautySoftConfig.recipe}
          onCtaClick={onSearchOpen}
        />
      ) : null,

    search: () => (
      <SearchBar placeholder="Buscar productos..." onFocus={onSearchOpen} />
    ),

    categories: () => (
      <CategorySection
        categories={categories}
        activeCategoryId={activeCategoryId}
        onCategoryChange={onCategoryChange}
        onSeeAll={onSeeAll}
      />
    ),

    products: () => (
      <section
        className="flex flex-col gap-[11px]"
        style={{ paddingTop: "var(--t-space-section, 2rem)", paddingBottom: "var(--t-space-section, 2rem)" }}
      >
        <div className="flex items-center justify-between">
          <h2
            className="m-0 text-[var(--t-text-primary)] leading-[22px]"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: "var(--t-type-heading-weight, 500)" as React.CSSProperties["fontWeight"],
              fontSize: "var(--t-type-heading-size, 1rem)",
              letterSpacing: "var(--t-type-heading-tracking, -0.025em)",
              textTransform: "var(--t-type-heading-transform, none)" as React.CSSProperties["textTransform"],
            }}
          >
            Para vos
          </h2>
          <button
            type="button"
            className="text-sm text-[var(--t-text-muted)] bg-transparent border-none cursor-pointer p-0 leading-[22px] tracking-[-0.408px]"
            style={{ fontFamily: "var(--font-sans)" }}
            onClick={onSeeAll}
          >
            Ver todo
          </button>
        </div>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--t-card-bg)" }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
                  stroke="var(--t-text-muted)"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line x1="3" y1="6" x2="21" y2="6" stroke="var(--t-text-muted)" strokeWidth="1.75" />
                <path
                  d="M16 10a4 4 0 0 1-8 0"
                  stroke="var(--t-text-muted)"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p
              className="text-sm text-center m-0"
              style={{ color: "var(--t-text-secondary)", fontFamily: "var(--font-sans)" }}
            >
              No hay productos disponibles
            </p>
          </div>
        ) : (
          <div
            className={`grid ${productGridClass}`}
            style={{ gap: "var(--t-space-gap, 1.25rem)" }}
            aria-label="Catálogo de productos"
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currencySymbol={currencySymbol}
                layout={layout}
                onClick={onProductClick ? () => onProductClick(product.id) : undefined}
              />
            ))}
          </div>
        )}
      </section>
    ),
  };

  const activeSections = sections ?? [
    { id: "hero", visible: true },
    { id: "search", visible: true },
    { id: "categories", visible: true },
    { id: "products", visible: true },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--t-background)" }}
    >
      <HeaderRouter
        store={store}
        structuralVariants={structuralVariants}
        recipe={beautySoftConfig.recipe}
        cartItemCount={cartItemCount}
        onSearchClick={onSearchOpen}
        onCartClick={onCartOpen}
      />

      <main
        className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 pt-4 pb-[calc(80px+env(safe-area-inset-bottom,0px))] lg:pb-8 flex flex-col gap-5"
        aria-label="Contenido principal"
      >
        {activeSections
          .filter((s) => s.visible)
          .map((s) => (
            <Fragment key={s.id}>{sectionRenderers[s.id]?.()}</Fragment>
          ))}
      </main>

      <FooterRouter
        store={store}
        structuralVariants={structuralVariants}
        recipe={beautySoftConfig.recipe}
      />

      <BottomNavRouter
        activeTab={activeTab}
        cartItemCount={cartItemCount}
        structuralVariants={structuralVariants}
        recipe={beautySoftConfig.recipe}
        onTabChange={(tab) => {
          if (tab === "cart") onCartOpen?.();
          else onTabChange?.(tab);
        }}
      />
    </div>
  );
}
