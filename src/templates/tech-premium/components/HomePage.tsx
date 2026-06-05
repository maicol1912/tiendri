// Tech Premium Template — Home Page Assembly
// "cyber" E-Store — Figma desktop (1440px) + mobile (375px)
//
// Desktop layout (top to bottom):
// 1. Header (sticky) — logo, search, nav, icons
// 2. Hero banner — dark bg, "IPhone 14 Pro Max", phone image right
// 3. Secondary banners grid — PS5 wide, Macbook tall, AirPods + Vision Pro small
// 4. "Browse By Category" — title + nav arrows + 6 category cards row
// 5. Products — Tabs (New Arrival | Bestseller | Featured Products) + 4-col grid (2 rows = 8)
// 6. "Popular Products" — 4 horizontal banner cards
// 7. "Discounts up to -50%" — 4-col product grid
// 8. "Gran Remate de Verano" — full-width dark banner
// 9. Footer
//
// Mobile: same content reordered per Figma mobile frames.
// Visual only — all handlers come as props for the shell.

import { Fragment } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { HeroBanner } from "./HeroBanner";
import { BannerGrid } from "./BannerGrid";
import { CategorySection } from "./CategorySection";
import { ProductCard } from "./ProductCard";
import { PopularProductCard } from "./PopularProductCard";
import { gridColsClass } from "../utils/grid-classes";
import { tabStyleClasses, bannerHeightClass } from "../utils/layout-classes";
import { techPremiumConfig } from "../config";
import type { TechPremiumConfig } from "../config";
import type {
  StoreInfo,
  Category,
  StorefrontProduct,
  PopularProduct,
  NavTab,
  ProductTab,
  HeroBannerData,
  BannerGrid as BannerGridData,
  SummerSaleBanner,
  HomeSectionConfig,
} from "../types";

interface NavLink {
  label: string;
  href: string;
}

interface ProductTabItem {
  id: ProductTab;
  label: string;
}

interface HomePageProps {
  store: StoreInfo;
  navLinks: readonly NavLink[];
  productTabs: readonly ProductTabItem[];
  footerServices: readonly string[];
  footerAssistance: readonly string[];
  categories: Category[];
  products: StorefrontProduct[];
  discountProducts: StorefrontProduct[];
  popularProducts: PopularProduct[];
  heroBanner: HeroBannerData;
  bannerGrid: BannerGridData;
  summerSaleBanner: SummerSaleBanner;
  sections?: readonly HomeSectionConfig[];
  layout?: TechPremiumConfig["layout"];
  grid?: TechPremiumConfig["grid"];
  activeTab?: NavTab;
  activeProductTab?: ProductTab;
  activeCategoryId?: string | null;
  cartItemCount?: number;
  currencySymbol?: string;
  // Handlers — wired in the shell
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onWishlistClick?: () => void;
  onMenuClick?: () => void;
  onCategoryClick?: (id: string) => void;
  onProductClick?: (productId: string) => void;
  onWishlistToggle?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
  onProductTabChange?: (tab: ProductTab) => void;
  onTabChange?: (tab: NavTab) => void;
  onHeroCtaClick?: () => void;
  onBannerClick?: (title: string) => void;
  onSummerSaleClick?: () => void;
  onPopularProductClick?: () => void;
  onNavLinkClick?: (href: string) => void;
}

export function HomePage({
  store,
  navLinks,
  productTabs,
  footerServices,
  footerAssistance,
  categories,
  products,
  discountProducts,
  popularProducts,
  heroBanner,
  bannerGrid,
  summerSaleBanner,
  sections = techPremiumConfig.sections,
  layout,
  grid = techPremiumConfig.grid,
  activeTab = "home",
  activeProductTab = "new-arrival",
  activeCategoryId = null,
  cartItemCount = 0,
  currencySymbol = "$",
  onSearchClick,
  onCartClick,
  onWishlistClick,
  onMenuClick,
  onCategoryClick,
  onProductClick,
  onWishlistToggle,
  onAddToCart,
  onProductTabChange,
  onTabChange,
  onHeroCtaClick,
  onBannerClick,
  onSummerSaleClick,
  onPopularProductClick,
  onNavLinkClick,
}: HomePageProps) {
  // ── Local render functions — one per configurable section ──────────────────

  function renderHero() {
    return <HeroBanner data={heroBanner} onCtaClick={onHeroCtaClick} />;
  }

  function renderBanners() {
    return <BannerGrid banners={bannerGrid} onBannerClick={onBannerClick} />;
  }

  function renderCategories() {
    return (
      <section
        className="bg-[var(--t-background)] px-6 lg:px-[160px] py-10 lg:py-20"
        aria-labelledby="categories-heading"
      >
        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <h2
            id="categories-heading"
            className="text-xl lg:text-2xl font-medium text-[var(--t-text-primary)] tracking-[0.24px]"
          >
            Explorar por categoría
          </h2>
          <div className="flex gap-4">
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center bg-transparent border-none cursor-pointer text-[var(--t-text-primary)]/40 hover:text-[var(--t-text-primary)] transition-colors"
              aria-label="Categorías anteriores"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center bg-transparent border-none cursor-pointer text-[var(--t-text-primary)]/40 hover:text-[var(--t-text-primary)] transition-colors"
              aria-label="Siguientes categorías"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category cards — mobile: 3x2 grid, desktop: single row */}
        <div className={`grid ${gridColsClass(grid.categories.mobile, grid.categories.desktop)} gap-4 lg:gap-8`}>
          {categories.map((cat) => (
            <CategorySection
              key={cat.id}
              category={cat}
              isActive={activeCategoryId === cat.id}
              onClick={() => onCategoryClick?.(cat.id)}
            />
          ))}
        </div>
      </section>
    );
  }

  function renderProducts() {
    return (
      <section
        className="bg-[var(--t-section-bg)] px-6 lg:px-[160px] py-10 lg:py-14"
        aria-labelledby="products-heading"
      >
        {/* Product tabs */}
        <div
          className="flex items-center gap-6 lg:gap-8 mb-8"
          role="tablist"
          aria-label="Categorías de productos"
        >
          {productTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeProductTab === tab.id}
              className={`bg-transparent border-0 cursor-pointer text-sm lg:text-lg font-medium leading-8 transition-colors pb-1 whitespace-nowrap ${tabStyleClasses(layout?.tabStyle ?? "underline", activeProductTab === tab.id)}`}
              onClick={() => onProductTabChange?.(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product grid: mobile 2-col, desktop 4-col, 2 rows = 8 products */}
        <h2 id="products-heading" className="sr-only">
          {productTabs.find((t) => t.id === activeProductTab)?.label ?? "Productos"}
        </h2>
        <div className={`grid ${gridColsClass(grid.products.mobile, grid.products.desktop)} gap-4`}>
          {products.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currencySymbol={currencySymbol}
              layout={layout}
              onClick={() => onProductClick?.(product.id)}
              onAddToCart={() => onAddToCart?.(product.id)}
            />
          ))}
        </div>
      </section>
    );
  }

  function renderPopular() {
    return (
      <section aria-labelledby="popular-heading">
        <h2 id="popular-heading" className="sr-only">
          Productos populares
        </h2>
        {/* Desktop: 4 horizontal cards in a row */}
        <div className="hidden lg:flex w-full">
          {popularProducts.map((p, i) => (
            <PopularProductCard
              key={p.id}
              product={p}
              index={i}
              onClick={onPopularProductClick}
            />
          ))}
        </div>
        {/* Mobile: horizontal snap carousel with dots */}
        <div className="lg:hidden">
          <div
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {popularProducts.map((p, i) => (
              <div key={p.id} className="snap-center shrink-0 w-full">
                <PopularProductCard product={p} index={i} onClick={onPopularProductClick} />
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 py-4">
            {popularProducts.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${i === 0 ? "bg-[var(--t-primary)]" : "bg-[var(--t-primary)]/20"}`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  function renderDiscounts() {
    return (
      <section
        className="bg-[var(--t-section-bg)] px-6 lg:px-[160px] py-10 lg:py-20"
        aria-labelledby="discounts-heading"
      >
        <h2
          id="discounts-heading"
          className="text-xl lg:text-2xl font-medium text-[var(--t-text-primary)] text-left mb-8"
        >
          Descuentos de hasta -50%
        </h2>
        <div className={`grid ${gridColsClass(grid.products.mobile, grid.products.desktop)} gap-4`}>
          {discountProducts.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currencySymbol={currencySymbol}
              layout={layout}
              onClick={() => onProductClick?.(product.id)}
              onAddToCart={() => onAddToCart?.(product.id)}
            />
          ))}
        </div>
      </section>
    );
  }

  function renderSummerSale() {
    return (
      <>
        {/* Mobile: full image (text baked into image) */}
        {summerSaleBanner.imageMobile && (
          <section className="lg:hidden w-full" aria-label="Gran Remate de Verano">
            <div className="relative w-full aspect-[3/4]">
              <Image
                src={summerSaleBanner.imageMobile}
                alt="Banner promocional Gran Remate de Verano"
                fill
                className="object-cover"
                sizes="100vw"
                loading="lazy"
              />
            </div>
          </section>
        )}
        {/* Desktop: background image + text overlay */}
        <section
          className={`relative hidden lg:flex items-center justify-center w-full overflow-hidden ${bannerHeightClass(layout?.bannerHeight ?? "normal")}`}
          aria-labelledby="summer-sale-heading"
        >
          <Image
            src={summerSaleBanner.image}
            alt="Banner promocional Gran Remate de Verano"
            fill
            className="object-cover"
            sizes="100vw"
            loading="lazy"
          />
          <div className="relative z-10 flex flex-col items-center gap-10 text-center">
            <div className="flex flex-col items-center">
              <h2 id="summer-sale-heading" className="text-white">
                <span className="text-[72px] font-thin leading-[72px] tracking-[-0.72px]">
                  {summerSaleBanner.titleLight}
                </span>
                <span className="text-[72px] font-medium leading-[72px]">
                  {summerSaleBanner.titleBold}
                </span>
              </h2>
              <p className="text-[var(--t-text-summer-sale)] text-base font-normal leading-8 mt-1">
                {summerSaleBanner.description}
              </p>
            </div>
            <button
              type="button"
              className="border border-white text-white bg-transparent rounded-md px-14 py-4 text-base font-medium cursor-pointer hover:bg-white/10 transition-colors"
              onClick={onSummerSaleClick}
            >
              {summerSaleBanner.ctaText}
            </button>
          </div>
        </section>
      </>
    );
  }

  // ── Local Business JSON-LD ─────────────────────────────────────────────────

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: store.name,
    description: store.description,
    url: `https://tiendri.com/template/${store.slug}`,
    telephone: store.whatsapp ? `+${store.whatsapp}` : undefined,
    sameAs: store.social_links
      ? Object.values(store.social_links).filter(Boolean)
      : [],
  };

  // ── Section registry — maps each id to its render function ─────────────────

  const sectionRenderers: Record<string, () => React.ReactNode> = {
    "hero": renderHero,
    "banners": renderBanners,
    "categories": renderCategories,
    "products": renderProducts,
    "popular": renderPopular,
    "discounts": renderDiscounts,
    "summer-sale": renderSummerSale,
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[var(--t-background)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      {/* ── Sticky Header — structural, always rendered ── */}
      <Header
        store={store}
        navLinks={navLinks}
        cartItemCount={cartItemCount}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
        onMenuClick={onMenuClick}
        onNavLinkClick={onNavLinkClick}
      />

      {/* ── Main scrollable content — dynamic section order + visibility ── */}
      <main>
        {sections
          .filter((s) => s.visible)
          .map((s) => (
            <Fragment key={s.id}>{sectionRenderers[s.id]?.()}</Fragment>
          ))}
      </main>

      {/* ── Footer — structural, always rendered ── */}
      <Footer
        store={store}
        services={footerServices}
        assistance={footerAssistance}
      />

      {/* ── Bottom navigation — mobile only, structural ── */}
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
