// Furniture Dark — HomePage
// Presentational: receives all data + callbacks as props
// Uses sectionRenderers pattern for dynamic section ordering/visibility
// ALL colors via var(--t-*)

import type { ReactNode } from "react";
import type {
  StorefrontStore,
  StorefrontCategory,
  StorefrontProduct,
  PromoCard,
  VideoData,
} from "../types";
import type { FurnitureDarkConfig } from "../config";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { HeroBanner } from "./HeroBanner";
import { CategorySection } from "./CategorySection";
import { VideoSection } from "./VideoSection";
import { ProductSection } from "./ProductSection";

// ── Types ─────────────────────────────────────────────────────────────────────

interface HomePageSection {
  id: string;
  visible: boolean;
}

interface HomePageProps {
  store: StorefrontStore;
  config: FurnitureDarkConfig;
  categories: StorefrontCategory[];
  bestSellers: StorefrontProduct[];
  featuredProducts: StorefrontProduct[];
  promoCards: PromoCard[];
  videoData?: VideoData | null;
  sections: HomePageSection[];
  activeCategoryId?: string;
  cartItemCount?: number;
  onCategoryClick: (categoryId: string) => void;
  onProductClick: (productId: string) => void;
  onViewAllClick: () => void;
  onSearchClick: () => void;
  onCartClick: () => void;
  onBottomNavTab: (tab: "home" | "cart" | "search" | "info") => void;
  onPromoCardClick?: (card: PromoCard) => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function HomePage({
  store,
  config,
  categories,
  bestSellers,
  featuredProducts,
  promoCards,
  videoData,
  sections,
  activeCategoryId,
  cartItemCount = 0,
  onCategoryClick,
  onProductClick,
  onViewAllClick,
  onSearchClick,
  onCartClick,
  onBottomNavTab,
  onPromoCardClick,
}: HomePageProps) {
  const gridMobile = config.grid.products.mobile;
  const gridDesktop = config.grid.products.desktop;
  const cardStyle = config.layout.cardStyle;
  const hoverEffect = config.layout.cardHoverEffect;
  const imageRatio = config.layout.cardImageRatio;

  // Section renderers map
  const sectionRenderers: Record<string, () => ReactNode> = {
    "promo-carousel": () =>
      promoCards.length > 0 ? (
        <HeroBanner key="promo-carousel" cards={promoCards} onCardClick={onPromoCardClick} />
      ) : null,

    categories: () =>
      categories.length > 0 ? (
        <div key="categories" className="px-5">
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none" style={{ scrollbarWidth: "none" }}>
            {categories.map((cat) => (
              <CategorySection
                key={cat.id}
                category={cat}
                isActive={activeCategoryId === cat.id}
                onClick={onCategoryClick}
              />
            ))}
          </div>
        </div>
      ) : null,

    video: () =>
      videoData ? <VideoSection key="video" video={videoData} /> : null,

    "best-sellers": () =>
      bestSellers.length > 0 ? (
        <ProductSection
          key="best-sellers"
          title="Más vendidos"
          products={bestSellers}
          onProductClick={onProductClick}
          onViewAll={onViewAllClick}
          gridMobile={gridMobile}
          gridDesktop={gridDesktop}
          cardStyle={cardStyle}
          hoverEffect={hoverEffect}
          imageRatio={imageRatio}
        />
      ) : null,

    featured: () =>
      featuredProducts.length > 0 ? (
        <ProductSection
          key="featured"
          title="Destacados"
          products={featuredProducts}
          onProductClick={onProductClick}
          onViewAll={onViewAllClick}
          gridMobile={gridMobile}
          gridDesktop={gridDesktop}
          cardStyle={cardStyle}
          hoverEffect={hoverEffect}
          imageRatio={imageRatio}
        />
      ) : null,
  };

  // Filter and order visible sections
  const visibleSections = sections
    .filter((s) => s.visible)
    .map((s) => sectionRenderers[s.id]?.() ?? null);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--t-background)" }}
    >
      {/* Header */}
      <Header
        store={store}
        cartItemCount={cartItemCount}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
      />

      {/* Mobile search bar (below greeting) */}
      <div className="lg:hidden px-5 pb-5">
        <button
          type="button"
          className="flex items-center gap-3 w-full px-5 py-3.5 rounded-[var(--t-radius-button)] cursor-text"
          style={{ backgroundColor: "var(--t-search-bg)" }}
          onClick={onSearchClick}
          aria-label="Buscar productos"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--t-text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <span
            className="text-[var(--t-text-secondary)]"
            style={{
              fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
              fontSize: "14px",
              fontWeight: 400,
              letterSpacing: "-0.42px",
            }}
          >
            Buscar en {store.name}
          </span>
        </button>
      </div>

      {/* Dynamic sections */}
      <main className="flex flex-col gap-8 pb-6 max-w-7xl mx-auto w-full">
        {visibleSections}
      </main>

      {/* Footer */}
      <Footer store={store} />

      {/* Mobile bottom navigation */}
      <BottomNav
        activeTab="home"
        cartItemCount={cartItemCount}
        onTab={onBottomNavTab}
      />
    </div>
  );
}
