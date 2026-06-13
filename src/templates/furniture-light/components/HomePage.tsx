// Furniture Light — Home Page Assembly
// Wallet bar (mobile), hero, categories (icon pills), flash sale, room styles, products
// Visual only — all handlers come as props from the shell
// sectionRenderers pattern follows tech-premium model

import React, { Fragment } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { HeroBanner } from "./HeroBanner";
import { WalletBar } from "./WalletBar";
import { CategorySection } from "./CategorySection";
import { RoomStylesSection } from "./RoomStylesSection";
import { ProductCard } from "./ProductCard";
import { gridColsClass } from "../utils/grid-classes";
import { furnitureLightConfig } from "../config";
import type { FurnitureLightConfig } from "../config";
import type {
  FurnitureProduct,
  FurnitureCategory,
  FurnitureStoreInfo,
  FurnitureNavTab,
  StyleCard,
} from "../types";

interface NavLink {
  label: string;
  href: string;
}

interface HomePageProps {
  store: FurnitureStoreInfo;
  navLinks?: readonly NavLink[];
  categories: FurnitureCategory[];
  products: FurnitureProduct[];
  featuredCard?: { title: string; subtitle: string; image: string };
  styleCards?: StyleCard[];
  heroBannerImage?: string;
  heroBannerTitle?: string;
  heroBannerSubtitle?: string;
  roomBannerImage?: string;
  sections?: FurnitureLightConfig["sections"];
  layout?: FurnitureLightConfig["layout"];
  grid?: FurnitureLightConfig["grid"];
  activeTab?: FurnitureNavTab;
  activeCategoryId?: string | null;
  cartItemCount?: number;
  currencySymbol?: string;
  // Handlers
  onCartClick?: () => void;
  onSearchClick?: () => void;
  onCategoryChange?: (id: string | null) => void;
  onProductClick?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
  onTabChange?: (tab: FurnitureNavTab) => void;
  onStyleClick?: (id: string) => void;
  onSeeAll?: () => void;
}

export function HomePage({
  store,
  navLinks = furnitureLightConfig.content.navLinks,
  categories,
  products,
  featuredCard,
  styleCards = [],
  heroBannerImage,
  heroBannerTitle,
  heroBannerSubtitle,
  sections = furnitureLightConfig.sections,
  layout,
  grid = furnitureLightConfig.grid,
  activeTab = "home",
  activeCategoryId = null,
  cartItemCount = 0,
  currencySymbol = "$",
  onCartClick,
  onSearchClick,
  onCategoryChange,
  onProductClick,
  onAddToCart,
  onTabChange,
  onStyleClick,
  onSeeAll,
}: HomePageProps) {
  // Flash sale products — discounted items or first 4 products
  const flashSaleProducts = products
    .filter((p) => (p.discountPercent ?? 0) > 0 || !!p.compare_at_price)
    .slice(0, 6)
    .concat(products.slice(0, 6))
    .slice(0, 6);

  // All-products filtered by activeCategoryId
  const visibleProducts =
    activeCategoryId === null
      ? products
      : products.filter((p) => p.categoryId === activeCategoryId);

  // ── Section renderers ──────────────────────────────────────────────────────

  function renderHero() {
    return (
      <div className="px-4 md:px-6 lg:px-8 mb-4">
        <HeroBanner
          title={heroBannerTitle ?? furnitureLightConfig.content.heroBanner.title}
          subtitle={heroBannerSubtitle ?? furnitureLightConfig.content.heroBanner.subtitle}
          bannerImage={heroBannerImage}
        />
      </div>
    );
  }

  function renderCategories() {
    return (
      <div className="mb-4">
        <CategorySection
          categories={categories}
          activeCategoryId={activeCategoryId}
          onCategoryChange={onCategoryChange}
          onSeeAll={onSeeAll}
        />
      </div>
    );
  }

  function renderFlashSale() {
    return (
      <section className="mb-4 px-4 md:px-6 lg:px-8" aria-labelledby="flash-sale-heading" style={{ paddingTop: "var(--t-space-section, 1rem)", paddingBottom: "var(--t-space-section, 1rem)" }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h2
              id="flash-sale-heading"
              className="text-[var(--t-foreground)]"
              style={{
                fontFamily: "var(--font-display, var(--font-sans, 'Inter', sans-serif))",
                fontWeight: "var(--t-type-heading-weight, 700)" as React.CSSProperties["fontWeight"],
                fontSize: "var(--t-type-heading-size, 1rem)",
                letterSpacing: "var(--t-type-heading-tracking, 0em)",
                textTransform: "var(--t-type-heading-transform, none)" as React.CSSProperties["textTransform"],
              }}
            >
              Flash Sale
            </h2>
            {/* Timer badge */}
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--t-primary)]">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--t-on-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="text-[10px] font-bold text-[var(--t-on-primary)]">02:45:30</span>
            </div>
          </div>
          <button
            type="button"
            className="text-xs text-[var(--t-primary)] font-medium flex items-center gap-1"
            onClick={onSeeAll}
          >
            Ver todos
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Flash Sale uses 3 columns on desktop (original KASA design) */}
        <div className={`grid ${gridColsClass(grid.products.mobile, 3)}`} style={{ gap: "var(--t-space-gap, 0.75rem)" }}>
          {flashSaleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currencySymbol={currencySymbol}
              layout={layout}
              onProductClick={onProductClick}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </section>
    );
  }

  function renderRoomStyles() {
    if (!featuredCard && styleCards.length === 0) return null;
    return (
      <div className="mb-4">
        <RoomStylesSection
          title="Estilos para tu hogar"
          featuredCard={featuredCard}
          styleCards={styleCards}
          onStyleClick={onStyleClick}
          onSeeAll={onSeeAll}
        />
      </div>
    );
  }

  function renderProducts() {
    return (
      <section className="px-4 md:px-6 lg:px-8 mb-6" aria-labelledby="products-heading" style={{ paddingTop: "var(--t-space-section, 1.5rem)", paddingBottom: "var(--t-space-section, 1.5rem)" }}>
        <div className="flex items-center justify-between mb-3">
          <h2
            id="products-heading"
            className="text-[var(--t-foreground)]"
            style={{
              fontFamily: "var(--font-display, var(--font-sans, 'Inter', sans-serif))",
              fontWeight: "var(--t-type-heading-weight, 700)" as React.CSSProperties["fontWeight"],
              fontSize: "var(--t-type-heading-size, 1rem)",
              letterSpacing: "var(--t-type-heading-tracking, 0em)",
              textTransform: "var(--t-type-heading-transform, none)" as React.CSSProperties["textTransform"],
            }}
          >
            Todos los productos
          </h2>
          <span className="text-xs text-[var(--t-muted)]">{visibleProducts.length} artículos</span>
        </div>

        <div className={`grid ${gridColsClass(grid.products.mobile, grid.products.desktop)}`} style={{ gap: "var(--t-space-gap, 0.75rem)" }}>
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currencySymbol={currencySymbol}
              layout={layout}
              onProductClick={onProductClick}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </section>
    );
  }

  // ── Section registry ────────────────────────────────────────────────────────
  const sectionRenderers: Record<string, () => React.ReactNode> = {
    hero: renderHero,
    categories: renderCategories,
    "flash-sale": renderFlashSale,
    "room-styles": renderRoomStyles,
    products: renderProducts,
  };

  // ── JSON-LD ─────────────────────────────────────────────────────────────────
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: store.name,
    url: `https://tiendri.com/template/${store.slug}`,
    telephone: store.whatsapp ? `+${store.whatsapp}` : undefined,
  };

  return (
    <div className="min-h-screen bg-[var(--t-background)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />

      {/* Sticky Header */}
      <Header
        store={store}
        navLinks={navLinks as NavLink[]}
        cartItemCount={cartItemCount}
        onCartClick={onCartClick}
        onSearchClick={onSearchClick}
      />

      {/* Main content */}
      <main className="max-w-6xl mx-auto pt-[60px] lg:pt-[72px] pb-6">
        {/* Wallet bar — mobile only, always rendered above sections */}
        <div className="mt-3 px-4 md:px-6 lg:px-8">
          <WalletBar />
        </div>

        {sections
          .filter((s) => s.visible)
          .map((s) => (
            <Fragment key={s.id}>{sectionRenderers[s.id]?.()}</Fragment>
          ))}
      </main>

      {/* Footer */}
      <Footer store={store} layout={layout} />

      {/* Bottom nav — mobile only */}
      <BottomNav
        activeTab={activeTab}
        cartItemCount={cartItemCount}
        onTabChange={(tab) => {
          if (tab === "search") onSearchClick?.();
          else if (tab === "cart") onCartClick?.();
          else onTabChange?.(tab);
        }}
      />
    </div>
  );
}
