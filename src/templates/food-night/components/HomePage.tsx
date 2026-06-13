"use client";

// Food Night — Home Page Assembly
// Sections: search (mobile), categories, products grid (masonry stagger).
// sectionRenderers pattern for reorderability.

import { Fragment } from "react";
import { Header } from "./Header";
import { SearchBar } from "./SearchBar";
import { CategorySection } from "./CategorySection";
import { HeroBanner } from "./HeroBanner";
import { ProductCard } from "./ProductCard";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { gridColsClass } from "../utils/grid-classes";
import type { StoreInfo, Category, StorefrontProduct, NavTab, HomeSectionConfig } from "../types";

interface HomePageProps {
  store: StoreInfo;
  categories: Category[];
  products: StorefrontProduct[];
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
  sections?: readonly HomeSectionConfig[];
  layout?: {
    cardStyle?: string;
    cardHoverEffect?: string;
    cardImageRatio?: string;
    headerStyle?: string;
    footerStyle?: string;
  };
  grid?: {
    products?: { mobile: number; desktop: number };
    categories?: { mobile: number; desktop: number };
  };
  onSearchClick?: () => void;
  onFilterClick?: () => void;
  onCartClick?: () => void;
  onCategoryChange?: (id: string | null) => void;
  onProductClick?: (productId: string) => void;
  onTabChange?: (tab: NavTab) => void;
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
  sections,
  layout,
  grid,
  onSearchClick,
  onFilterClick,
  onCartClick,
  onCategoryChange,
  onProductClick,
  onTabChange,
}: HomePageProps) {
  const productsMobile = grid?.products?.mobile ?? 2;
  const productsDesktop = grid?.products?.desktop ?? 4;

  const sectionRenderers: Record<string, () => React.ReactNode> = {
    hero: () => (
      <section className="mb-5" aria-label="Banner principal" key="hero">
        <HeroBanner
          title={heroBanner?.title}
          subtitle={heroBanner?.subtitle}
          ctaText={heroBanner?.ctaText}
          imageUrl={heroBanner?.imageUrl}
          onCtaClick={onSearchClick}
        />
      </section>
    ),

    categories: () =>
      categories.length > 0 ? (
        <section
          className="mb-5"
          aria-label="Categorías"
          key="categories"
          style={{ paddingTop: "var(--t-space-section, 1.25rem)", paddingBottom: "var(--t-space-section, 1.25rem)" }}
        >
          <CategorySection
            categories={categories}
            activeCategoryId={activeCategoryId}
            onCategoryChange={onCategoryChange}
          />
        </section>
      ) : null,

    products: () =>
      products.length > 0 ? (
        <section aria-label="Productos" key="products">
          <div
            className={`grid ${gridColsClass(productsMobile, productsDesktop)} items-start`}
            style={{ gap: "var(--t-space-gap, 0.75rem)" }}
          >
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                currencySymbol={currencySymbol}
                variant={index % 2 === 0 ? "tall" : "short"}
                layout={layout}
                onClick={() => onProductClick?.(product.id)}
              />
            ))}
          </div>
        </section>
      ) : (
        <div
          className="flex flex-col items-center justify-center py-20 gap-3"
          role="status"
          aria-label="Sin productos"
          key="products-empty"
        >
          <span style={{ fontSize: "40px" }} aria-hidden="true">🍕</span>
          <p className="text-[14px] font-normal" style={{ color: "var(--t-muted)" }}>
            No hay platos en esta categoría
          </p>
        </div>
      ),
  };

  const activeSections = sections ?? [
    { id: "hero", visible: true },
    { id: "categories", visible: true },
    { id: "products", visible: true },
  ];

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
        {/* Search bar — mobile only */}
        <div className="mb-4 lg:hidden">
          <SearchBar onClick={onSearchClick} onFilterClick={onFilterClick} />
        </div>

        {activeSections
          .filter((s) => s.visible)
          .map((s) => (
            <Fragment key={s.id}>{sectionRenderers[s.id]?.()}</Fragment>
          ))}
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
