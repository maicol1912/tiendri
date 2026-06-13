// Pet V3 Template — Home Page
// Assembly: header -> promo banner -> trending -> pet types -> products -> bottom nav.
// Uses sectionRenderers pattern for dynamic section ordering.
// ZERO hardcoded colors — all via CSS variables.

import React, { Fragment } from "react";
import { Header } from "./Header";
import { HeroBanner } from "./HeroBanner";
import { TrendingCard } from "./TrendingCard";
import { CategorySection } from "./CategorySection";
import { ProductCard } from "./ProductCard";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { gridColsClass } from "../utils/grid-classes";
import type {
  StoreInfo,
  PromoBannerData,
  TrendingItem,
  PetType,
  StorefrontProduct,
  NavTab,
  HomeSectionConfig,
} from "../types";

interface HomePageProps {
  store: StoreInfo;
  promoBanner: PromoBannerData;
  trendingItems: TrendingItem[];
  petTypes: PetType[];
  products: StorefrontProduct[];
  activeTab: NavTab;
  cartItemCount?: number;
  currencySymbol?: string;
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
    trending?: { mobile: number; desktop: number };
    petTypes?: { mobile: number; desktop: number };
  };
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onExploreClick?: () => void;
  onProductClick?: (productId: string) => void;
  onAddToCart?: (product: StorefrontProduct) => void;
  onTabChange?: (tab: NavTab) => void;
  onSeeAll?: () => void;
}

export function HomePage({
  store,
  promoBanner,
  trendingItems,
  petTypes,
  products,
  activeTab,
  cartItemCount = 0,
  currencySymbol = "$",
  sections,
  layout,
  grid,
  onSearchClick,
  onCartClick,
  onExploreClick,
  onProductClick,
  onAddToCart,
  onTabChange,
  onSeeAll,
}: HomePageProps) {
  const defaultSections: readonly HomeSectionConfig[] = [
    { id: "promo-banner", visible: true },
    { id: "trending", visible: true },
    { id: "pet-types", visible: true },
    { id: "products", visible: true },
  ];

  const resolvedSections = sections ?? defaultSections;

  const trendingGrid = grid?.trending ?? { mobile: 2, desktop: 4 };
  const petTypesGrid = grid?.petTypes ?? { mobile: 2, desktop: 4 };
  const productsGrid = grid?.products ?? { mobile: 2, desktop: 4 };

  const sectionRenderers: Record<string, () => React.ReactNode> = {
    "promo-banner": () => (
      <section className="mt-4 md:mt-6" key="promo-banner">
        <HeroBanner banner={promoBanner} />
      </section>
    ),
    trending: () => (
      <section
        key="trending"
        style={{ paddingTop: "var(--t-space-section, 2rem)", paddingBottom: "var(--t-space-section, 2rem)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-[var(--t-text-primary)]"
            style={{
              fontWeight: "var(--t-type-heading-weight, 700)" as React.CSSProperties["fontWeight"],
              fontSize: "var(--t-type-heading-size, 1.5rem)",
              letterSpacing: "var(--t-type-heading-tracking, 0em)",
              textTransform: "var(--t-type-heading-transform, none)" as React.CSSProperties["textTransform"],
            }}
          >
            Tendencias
          </h2>
          <button
            type="button"
            className="text-[var(--t-primary)] text-base font-medium hover:underline"
            onClick={onSeeAll}
          >
            Ver todo
          </button>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide lg:hidden -mx-4 px-4">
          {trendingItems.map((item) => (
            <TrendingCard key={item.id} item={item} layout={layout} />
          ))}
        </div>

        {/* Desktop: grid */}
        <div
          className={`hidden lg:grid ${gridColsClass(trendingGrid.mobile, trendingGrid.desktop)}`}
          style={{ gap: "var(--t-space-gap, 1.5rem)" }}
        >
          {trendingItems.map((item) => (
            <TrendingCard key={item.id} item={item} layout={layout} />
          ))}
        </div>
      </section>
    ),
    "pet-types": () => (
      <section
        key="pet-types"
        style={{ paddingTop: "var(--t-space-section, 2rem)", paddingBottom: "var(--t-space-section, 2rem)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-[var(--t-text-primary)]"
            style={{
              fontWeight: "var(--t-type-heading-weight, 700)" as React.CSSProperties["fontWeight"],
              fontSize: "var(--t-type-heading-size, 1.5rem)",
              letterSpacing: "var(--t-type-heading-tracking, 0em)",
              textTransform: "var(--t-type-heading-transform, none)" as React.CSSProperties["textTransform"],
            }}
          >
            Tipos de mascota
          </h2>
          <button
            onClick={onExploreClick}
            className="text-[var(--t-primary)] text-base font-medium hover:underline"
          >
            Ver todo
          </button>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide lg:hidden -mx-4 px-4">
          {petTypes.map((pt) => (
            <CategorySection key={pt.id} petType={pt} onClick={onExploreClick} />
          ))}
        </div>

        {/* Desktop: grid */}
        <div
          className={`hidden lg:grid ${gridColsClass(petTypesGrid.mobile, petTypesGrid.desktop)}`}
          style={{ gap: "var(--t-space-gap, 1.5rem)" }}
        >
          {petTypes.map((pt) => (
            <CategorySection key={pt.id} petType={pt} onClick={onExploreClick} />
          ))}
        </div>
      </section>
    ),
    products: () =>
      products.length > 0 ? (
        <section
          key="products"
          style={{ paddingTop: "var(--t-space-section, 2rem)", paddingBottom: "var(--t-space-section, 2rem)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-[var(--t-text-primary)]"
              style={{
                fontWeight: "var(--t-type-heading-weight, 700)" as React.CSSProperties["fontWeight"],
                fontSize: "var(--t-type-heading-size, 1.5rem)",
                letterSpacing: "var(--t-type-heading-tracking, 0em)",
                textTransform: "var(--t-type-heading-transform, none)" as React.CSSProperties["textTransform"],
              }}
            >
              Productos destacados
            </h2>
            <button
              type="button"
              className="text-[var(--t-primary)] text-base font-medium hover:underline"
              onClick={onSeeAll}
            >
              Ver todo
            </button>
          </div>

          <div
            className={`grid ${gridColsClass(productsGrid.mobile, productsGrid.desktop)}`}
            style={{ gap: "var(--t-space-gap, 1rem)" }}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currencySymbol={currencySymbol}
                onClick={() => onProductClick?.(product.id)}
                onAddToCart={() => onAddToCart?.(product)}
                layout={layout}
              />
            ))}
          </div>
        </section>
      ) : null,
  };

  return (
    <div className="min-h-screen bg-[var(--t-background)]">
      {/* Header */}
      <Header
        storeName={store.name}
        logoUrl={store.logo}
        cartItemCount={cartItemCount}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
        onExploreClick={onExploreClick}
        onHomeClick={() => onTabChange?.("shop")}
        layout={layout}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {resolvedSections
          .filter((s) => s.visible)
          .map((s) => (
            <Fragment key={s.id}>{sectionRenderers[s.id]?.()}</Fragment>
          ))}
      </main>

      {/* Footer */}
      <Footer store={store} layout={layout} />

      {/* Bottom Nav — mobile only */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
