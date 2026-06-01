// Pet V3 Template — Home Page
// Assembly: header -> promo banner -> trending -> pet types -> products -> bottom nav.
// Uses sectionRenderers pattern for dynamic section ordering.
// ZERO hardcoded colors — all via CSS variables.

import { Fragment } from "react";
import { Header } from "./Header";
import { PromoBanner } from "./PromoBanner";
import { TrendingCard } from "./TrendingCard";
import { PetTypeCard } from "./PetTypeCard";
import { ProductCard } from "./ProductCard";
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
        <PromoBanner banner={promoBanner} />
      </section>
    ),
    trending: () => (
      <section className="mt-8 md:mt-10" key="trending">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[var(--t-text-primary)] text-2xl md:text-3xl font-bold">
            Tendencias
          </h2>
          <button className="text-[var(--t-primary)] text-base font-medium hover:underline">
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
        <div className={`hidden lg:grid ${gridColsClass(trendingGrid.mobile, trendingGrid.desktop)} gap-6`}>
          {trendingItems.map((item) => (
            <TrendingCard key={item.id} item={item} layout={layout} />
          ))}
        </div>
      </section>
    ),
    "pet-types": () => (
      <section className="mt-8 md:mt-10" key="pet-types">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[var(--t-text-primary)] text-2xl md:text-3xl font-bold">
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
            <PetTypeCard key={pt.id} petType={pt} onClick={onExploreClick} />
          ))}
        </div>

        {/* Desktop: grid */}
        <div className={`hidden lg:grid ${gridColsClass(petTypesGrid.mobile, petTypesGrid.desktop)} gap-6`}>
          {petTypes.map((pt) => (
            <PetTypeCard key={pt.id} petType={pt} onClick={onExploreClick} />
          ))}
        </div>
      </section>
    ),
    products: () =>
      products.length > 0 ? (
        <section className="mt-8 md:mt-10" key="products">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[var(--t-text-primary)] text-2xl md:text-3xl font-bold">
              Productos destacados
            </h2>
            <button className="text-[var(--t-primary)] text-base font-medium hover:underline">
              Ver todo
            </button>
          </div>

          <div className={`grid ${gridColsClass(productsGrid.mobile, productsGrid.desktop)} gap-4 md:gap-6`}>
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
    <div className="min-h-screen bg-[var(--t-background)] pb-24 lg:pb-8">
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

      {/* Bottom Nav — mobile only */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
