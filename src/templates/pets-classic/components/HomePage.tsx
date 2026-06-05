// Pets Classic — Home Page Assembly
// Sections: promo-banner, categories, featured, popular
// sectionRenderers pattern: config-driven visibility & order.
// All colors via var(--t-*), ZERO hardcoded hex.

import { Fragment } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { HeroBanner } from "./HeroBanner";
import { CategoryRow } from "./CategorySection";
import { ProductCard } from "./ProductCard";
import { gridColsClass } from "../utils/grid-classes";
import { petsClassicConfig } from "../config";
import type { PetsClassicConfig } from "../config";
import { BUTTON_STYLE_MAP } from "@/templates/_shared/style-maps";
import type {
  StoreInfo,
  PetsClassicCategory,
  PetsClassicProduct,
  PromoSlide,
  NavTab,
} from "../types";

interface HomeSectionConfig {
  id: string;
  visible: boolean;
}

interface HomePageProps {
  store: StoreInfo;
  categories: PetsClassicCategory[];
  products: PetsClassicProduct[];
  promoSlides: PromoSlide[];
  sections?: readonly HomeSectionConfig[];
  layout?: PetsClassicConfig["layout"];
  grid?: PetsClassicConfig["grid"];
  activeTab?: NavTab;
  activePromoIndex?: number;
  activeCategoryId?: string | null;
  cartItemCount?: number;
  currencySymbol?: string;
  // Handlers
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onMenuClick?: () => void;
  onCatalogClick?: () => void;
  onCategoryChange?: (id: string | null) => void;
  onProductClick?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
  onTabChange?: (tab: NavTab) => void;
  onPromoDotClick?: (index: number) => void;
  onSeeAll?: () => void;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US").format(price);
}

export function HomePage({
  store,
  categories,
  products,
  promoSlides,
  sections = petsClassicConfig.sections,
  layout,
  grid = petsClassicConfig.grid,
  activeTab = "home",
  activePromoIndex = 0,
  activeCategoryId = null,
  cartItemCount = 0,
  currencySymbol = "$",
  onSearchClick,
  onCartClick,
  onMenuClick,
  onCatalogClick,
  onCategoryChange,
  onProductClick,
  onAddToCart,
  onTabChange,
  onPromoDotClick,
  onSeeAll,
}: HomePageProps) {
  const featuredProducts = products.filter((p) => p.featured);
  const popularProducts = products.filter((p) => !p.featured);

  // Products filtered by active category
  const filteredFeatured = activeCategoryId
    ? featuredProducts.filter((p) => p.categoryId === activeCategoryId)
    : featuredProducts;

  const filteredPopular = activeCategoryId
    ? popularProducts.filter((p) => p.categoryId === activeCategoryId)
    : popularProducts;

  // ── Section renderers ────────────────────────────────────────────────────

  function renderPromoBanner() {
    if (!promoSlides.length) return null;
    return (
      <section
        className="px-4 md:px-6 lg:px-8 max-w-6xl mx-auto w-full"
        style={{ paddingTop: "var(--t-space-section, 1rem)", paddingBottom: "0.5rem" }}
      >
        <HeroBanner
          slides={promoSlides}
          activeIndex={activePromoIndex}
          onDotClick={onPromoDotClick}
        />
      </section>
    );
  }

  function renderCategories() {
    if (!categories.length) return null;
    return (
      <section
        className="px-4 md:px-6 lg:px-8 max-w-6xl mx-auto w-full"
        style={{ paddingTop: "var(--t-space-card, 1rem)", paddingBottom: "var(--t-space-card, 1rem)" }}
        aria-labelledby="categories-heading"
      >
        <h2 id="categories-heading" className="sr-only">
          Categorías
        </h2>
        <CategoryRow
          categories={categories}
          activeCategoryId={activeCategoryId}
          animationLevel={layout?.animationLevel}
          onCategoryChange={onCategoryChange}
        />
      </section>
    );
  }

  function renderFeatured() {
    if (!filteredFeatured.length) return null;
    return (
      <section
        className="px-4 md:px-6 lg:px-8 max-w-6xl mx-auto w-full"
        style={{ paddingTop: "var(--t-space-section, 1.5rem)", paddingBottom: "var(--t-space-section, 1.5rem)" }}
        aria-labelledby="featured-heading"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2
              id="featured-heading"
              style={{
                fontSize: "var(--t-type-heading-size, 20px)",
                fontWeight: "var(--t-type-heading-weight, 800)" as React.CSSProperties["fontWeight"],
                color: "var(--t-text-primary)",
                letterSpacing: "var(--t-type-heading-tracking, -0.01em)",
                lineHeight: 1.2,
                fontFamily: "var(--t-font-heading, inherit)",
                textTransform: "var(--t-type-heading-transform, none)" as React.CSSProperties["textTransform"],
              }}
            >
              Destacados
            </h2>
            <div
              style={{
                width: 32,
                height: 3,
                borderRadius: 9999,
                backgroundColor: "var(--t-primary)",
                marginTop: 4,
              }}
              aria-hidden="true"
            />
          </div>
          <button
            type="button"
            onClick={onSeeAll}
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "var(--t-primary)",
              background: "none",
              border: "none",
              cursor: "pointer",
              letterSpacing: "0.03em",
              textTransform: "uppercase",
            }}
          >
            Ver todos ›
          </button>
        </div>
        <div
          className={`grid ${gridColsClass(grid.products.mobile, grid.products.desktop)}`}
          style={{ gap: "var(--t-space-gap, 1rem)" }}
        >
          {filteredFeatured.slice(0, 4).map((product) => (
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
    );
  }

  function renderPopular() {
    const popularBgs = [
      "var(--t-popular-bg-0)",
      "var(--t-popular-bg-1)",
      "var(--t-popular-bg-2)",
      "var(--t-popular-bg-3)",
    ];
    const popularTexts = [
      "var(--t-popular-text-0)",
      "var(--t-popular-text-1)",
      "var(--t-popular-text-2)",
      "var(--t-popular-text-3)",
    ];

    const displayPopular = filteredPopular.slice(0, 4);
    if (!displayPopular.length) return null;

    return (
      <section
        className="px-4 md:px-6 lg:px-8 max-w-6xl mx-auto w-full"
        style={{ paddingBottom: "var(--t-space-section, 1.5rem)" }}
        aria-labelledby="popular-heading"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2
              id="popular-heading"
              style={{
                fontSize: "var(--t-type-heading-size, 20px)",
                fontWeight: "var(--t-type-heading-weight, 800)" as React.CSSProperties["fontWeight"],
                color: "var(--t-text-primary)",
                letterSpacing: "var(--t-type-heading-tracking, -0.01em)",
                lineHeight: 1.2,
                fontFamily: "var(--t-font-heading, inherit)",
                textTransform: "var(--t-type-heading-transform, none)" as React.CSSProperties["textTransform"],
              }}
            >
              Más populares
            </h2>
            <div
              style={{
                width: 32,
                height: 3,
                borderRadius: 9999,
                backgroundColor: "var(--t-primary)",
                marginTop: 4,
              }}
              aria-hidden="true"
            />
          </div>
          <button
            type="button"
            onClick={onSeeAll}
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "var(--t-primary)",
              background: "none",
              border: "none",
              cursor: "pointer",
              letterSpacing: "0.03em",
              textTransform: "uppercase",
            }}
          >
            Ver todos ›
          </button>
        </div>

        <div className={`grid ${gridColsClass(2, 3)}`} style={{ gap: "var(--t-space-gap, 1rem)" }}>
          {displayPopular.map((product) => {
            return (
              <button
                key={product.id}
                type="button"
                className="flex flex-col text-left max-w-sm w-full mx-auto"
                style={{ border: "none", background: "none", cursor: "pointer", padding: 0 }}
                onClick={() => onProductClick?.(product.id)}
              >
                <div
                  className="w-full overflow-hidden mb-3"
                  style={{
                    borderRadius: "var(--t-radius-card)",
                    background: "var(--t-card-bg)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 6px 20px rgba(0,0,0,0.08)",
                    aspectRatio: "1",
                  }}
                >
                  {product.images[0]?.url && (
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      className="w-full h-full object-contain p-2"
                    />
                  )}
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "var(--t-text-primary)",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {product.name}
                </p>
                <p style={{ fontSize: "14px", fontWeight: 800, color: "var(--t-primary)", marginTop: 2 }}>
                  {currencySymbol}{formatPrice(product.price)}
                </p>
              </button>
            );
          })}
        </div>
      </section>
    );
  }

  // ── Section map ───────────────────────────────────────────────────────────

  const sectionRenderers: Record<string, () => React.ReactNode> = {
    "promo-banner": renderPromoBanner,
    categories: renderCategories,
    featured: renderFeatured,
    popular: renderPopular,
  };

  // ── JSON-LD ───────────────────────────────────────────────────────────────

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: store.name,
    url: `https://tiendri.com/tienda/${store.slug}`,
    telephone: store.whatsapp ? `+${store.whatsapp}` : undefined,
    sameAs: store.social_links
      ? Object.values(store.social_links).filter(Boolean)
      : [],
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--t-background)", fontFamily: "var(--t-font, Poppins, sans-serif)" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />

      <Header
        store={store}
        cartItemCount={cartItemCount}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
        onMenuClick={onMenuClick}
        onCatalogClick={onCatalogClick ?? onSeeAll}
      />

      <main className="pb-4">
        {sections
          .filter((s) => s.visible)
          .map((s) => (
            <Fragment key={s.id}>{sectionRenderers[s.id]?.()}</Fragment>
          ))}
      </main>

      <Footer store={store} layout={layout} />

      <BottomNav
        activeTab={activeTab}
        cartItemCount={cartItemCount}
        animationLevel={layout?.animationLevel}
        onTabChange={(tab) => {
          if (tab === "cart") onCartClick?.();
          else if (tab === "listing") (onCatalogClick ?? onSeeAll)?.();
          else onTabChange?.(tab);
        }}
      />
    </div>
  );
}
