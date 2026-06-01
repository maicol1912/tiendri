// Electronics Classic — Home Page (Presentational)
// Pure props, zero state, zero hooks.
// sectionRenderers pattern (Rule 17): accepts `sections` prop for reordering/visibility.
// ALL colors via var(--t-*). ZERO hardcoded hex.

import type {
  StorefrontStore,
  StorefrontCategory,
  HeroBanner,
  PromoBanner,
  Testimonial,
  BrandLogo,
  FeatureCard,
  ProductSection,
} from "../types";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { HeroSection } from "./HeroSection";
import { CategoryCard } from "./CategoryCard";
import { ProductSection as ProductSectionComponent } from "./ProductSection";
import { FeatureCards } from "./FeatureCards";
import { PromoBanner as PromoBannerComponent } from "./PromoBanner";
import { TestimonialSection } from "./TestimonialSection";
import { gridColsClass } from "../utils/grid-classes";

interface HomePageProps {
  store: StorefrontStore;
  heroBanner: HeroBanner;
  categories: StorefrontCategory[];
  productSections: ProductSection[];
  featureCards: FeatureCard[];
  promoBanner: PromoBanner;
  testimonials: Testimonial[];
  brands?: BrandLogo[];
  cartCount?: number;
  // Config-driven layout
  grid?: {
    categories?: { mobile: number; desktop: number };
    products?: { mobile: number; desktop: number };
  };
  layout?: {
    cardStyle?: string;
    cardHoverEffect?: string;
    cardImageRatio?: string;
    bannerHeight?: string;
    headerStyle?: string;
    footerStyle?: string;
  };
  sections?: string[];
  // Event handlers
  onNavigate?: (path: string) => void;
  onCategoryClick?: (categoryId: string) => void;
  onProductClick?: (productId: string) => void;
  onSearchSubmit?: (query: string) => void;
  onCartClick?: () => void;
  onHeroCtaClick?: () => void;
  onPromoCtaClick?: () => void;
}

// Section renderer map — Rule 17
type SectionRendererMap = Record<
  string,
  () => React.ReactNode
>;

const DEFAULT_SECTION_ORDER = [
  "hero",
  "categories",
  "feature-cards",
  "products",
  "promo-banner",
  "testimonials",
];

export function HomePage({
  store,
  heroBanner,
  categories,
  productSections,
  featureCards,
  promoBanner,
  testimonials,
  brands,
  cartCount = 0,
  grid = {},
  layout,
  sections = DEFAULT_SECTION_ORDER,
  onNavigate,
  onCategoryClick,
  onProductClick,
  onSearchSubmit,
  onCartClick,
  onHeroCtaClick,
  onPromoCtaClick,
}: HomePageProps) {
  const categoriesGrid = grid.categories ?? { mobile: 2, desktop: 4 };
  const productsGrid = grid.products ?? { mobile: 2, desktop: 4 };

  // Section renderers (Rule 17)
  const sectionRenderers: SectionRendererMap = {
    hero: () => (
      <HeroSection
        key="hero"
        banner={heroBanner}
        layout={layout}
        onCtaClick={onHeroCtaClick}
      />
    ),

    categories: () =>
      categories.length > 0 ? (
        <section key="categories" className="py-6 md:py-8" aria-labelledby="categories-heading">
          <h2
            id="categories-heading"
            className="text-lg md:text-xl lg:text-2xl font-bold text-[var(--t-text-primary)] mb-4 md:mb-6"
          >
            Categorías
          </h2>
          <div
            className={`grid gap-3 md:gap-4 ${gridColsClass(
              categoriesGrid.mobile,
              categoriesGrid.desktop
            )}`}
          >
            {categories.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                layout={layout}
                onCategoryClick={onCategoryClick}
              />
            ))}
          </div>
        </section>
      ) : null,

    "feature-cards": () =>
      featureCards.length > 0 ? (
        <FeatureCards
          key="feature-cards"
          cards={featureCards}
          onCardClick={(cardId) => {
            const card = featureCards.find((c) => c.id === cardId);
            if (card) onCategoryClick?.(card.id);
          }}
        />
      ) : null,

    products: () =>
      productSections.length > 0 ? (
        <div key="products" className="space-y-8 md:space-y-12">
          {productSections.map((section) => (
            <ProductSectionComponent
              key={section.id}
              title={section.title}
              products={section.products}
              grid={productsGrid}
              layout={layout}
              onSeeAllClick={() =>
                onNavigate?.(`/template/electronics-classic/catalogo?category=${section.id}`)
              }
              onProductClick={onProductClick}
            />
          ))}
        </div>
      ) : null,

    "promo-banner": () => (
      <PromoBannerComponent
        key="promo-banner"
        promo={promoBanner}
        onCtaClick={onPromoCtaClick}
      />
    ),

    testimonials: () =>
      testimonials.length > 0 ? (
        <TestimonialSection
          key="testimonials"
          testimonials={testimonials}
        />
      ) : null,
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--t-background)" }}
    >
      <Header
        store={store}
        cartCount={cartCount}
        layout={layout}
        onNavigate={onNavigate}
        onSearchSubmit={onSearchSubmit}
        onCartClick={onCartClick}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-24 md:pb-12 space-y-2 md:space-y-4">
        {/* Render sections in config-defined order */}
        {sections.map((sectionKey) => {
          const renderer = sectionRenderers[sectionKey];
          return renderer ? renderer() : null;
        })}
      </main>

      <Footer store={store} layout={layout} />
      <BottomNav cartCount={cartCount} onNavigate={onNavigate} />
    </div>
  );
}
