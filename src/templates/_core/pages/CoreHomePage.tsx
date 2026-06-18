"use client";

// _core/pages/CoreHomePage.tsx
// Layout estructural del Home. NO gestiona estado.
// Recibe todo como props, resuelve variantes desde los registries y arma el layout.

import React, { memo } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { HERO_REGISTRY } from "@/templates/_variants/hero";
import { CATEGORY_NAV_REGISTRY } from "@/templates/_variants/category-nav";
import { PRODUCT_CARD_REGISTRY } from "@/templates/_variants/product-card";
import { SEARCH_BAR_REGISTRY } from "@/templates/_variants/search-bar";
import { BestSellersSection } from "@/templates/_core/sections/BestSellersSection";
import { VideoSection } from "@/templates/_core/sections/VideoSection";
import type { BestSellerItem } from "@/templates/_core/sections/BestSellersSection";
import { gridColsClass } from "@/templates/_shared/utils/grid-classes";
import { imageRatioClass } from "@/templates/_shared/utils/image-classes";
import { resolveStyleTokens } from "./style-tokens";
import type { ResolvedStoreConfig } from "@/types/templates/resolved-config";
import type { StorefrontProduct, StoreInfo, Category } from "@/types/store";
import type { HeroVariant } from "@/templates/_variants/hero";
import type { CategoryNavVariant } from "@/templates/_variants/category-nav";
import type { ProductCardVariant } from "@/templates/_variants/product-card";
import type { SearchBarVariant } from "@/templates/_variants/search-bar";
import type { PopularProductItem } from "@/templates/mock-loader";

interface CoreHomePageProps {
  store: StoreInfo;
  products: StorefrontProduct[];
  categories: Category[];
  config: ResolvedStoreConfig;
  variants: {
    hero: HeroVariant;
    categoryNav: CategoryNavVariant;
    productCard: ProductCardVariant;
  };
  onProductClick: (slug: string) => void;
  onAddToCart: (productId: string) => void;
  onCategoryClick: (categoryId: string) => void;
  onCtaClick?: () => void;
  currencySymbol?: string;
  heroData?: {
    subtitle?: string;
    titleLight?: string;
    titleBold?: string;
    description?: string;
    ctaText?: string;
    image?: string;
    /** CTA text for the second banner slide (CAROUSEL variant). */
    secondCtaText?: string;
  };
  /** Si es true, renderiza un search bar entre el header y el hero */
  showSearchBar?: boolean;
  searchBarVariant?: SearchBarVariant;
  searchBarPlaceholder?: string;
  /** Lista de productos más vendidos — renderiza la sección "Más Vendidos" si no está vacía */
  bestSellers?: BestSellerItem[];
  /** Productos populares — renderiza sección de banner cards si existe y tiene ítems */
  popularProducts?: PopularProductItem[];
  /** Productos con descuento — renderiza sección "Descuentos" usando el ProductCardComponent */
  discountProducts?: StorefrontProduct[];
}

export const CoreHomePage = memo(function CoreHomePage({
  store,
  products,
  categories,
  config,
  variants,
  onProductClick,
  onAddToCart,
  onCategoryClick,
  onCtaClick,
  currencySymbol = "$",
  heroData,
  showSearchBar = false,
  searchBarVariant = "INLINE",
  searchBarPlaceholder = "Buscar productos...",
  bestSellers,
  popularProducts,
  discountProducts,
}: CoreHomePageProps) {
  const [searchValue, setSearchValue] = React.useState("");
  const HeroComponent = HERO_REGISTRY[variants.hero];
  const CategoryNavComponent = CATEGORY_NAV_REGISTRY[variants.categoryNav];
  const ProductCardComponent = PRODUCT_CARD_REGISTRY[variants.productCard];
  const SearchBarComponent = showSearchBar ? SEARCH_BAR_REGISTRY[searchBarVariant] : null;

  // Resolver tokens de estilo desde config + style-maps
  const {
    buttonClass,
    badgeClass,
    priceConfig,
    cardBgClass,
    hoverFxClass,
    imageFitClass,
    imageHoverClass,
    cardBorderClass,
  } = resolveStyleTokens(config);

  // Aspect ratio for product card images — resolved from layout.cardImageRatio
  const cardImageRatio = (config.layout as unknown as Record<string, unknown>)?.cardImageRatio as string | undefined;
  const aspectRatioClass = imageRatioClass(cardImageRatio ?? "square");

  const grid = config.grid;
  // Template-level opt-out of the "Comprar" button in the home grid
  const showAddToCartInGrid = (config as Record<string, unknown>).showAddToCartInGrid !== false;
  // Template-level opt-out of the discount badge over the product image
  const showDiscountBadge = (config as Record<string, unknown>).showDiscountBadge !== false;
  // Template-level opt-out of the strikethrough original price
  const showOriginalPrice = (config as Record<string, unknown>).showOriginalPrice !== false;
  // Template-level opt-in to show star rating next to price
  const showRating = (config as Record<string, unknown>).showRating === true;
  // Optional visible section headings (template-level config)
  const categoriesHeading = (config as Record<string, unknown>).categoriesHeading as string | undefined;
  const productsHeading = (config as Record<string, unknown>).productsHeading as string | undefined;
  // productTabs: horizontal tab bar above the products grid (mock — first tab is always active)
  const productTabsRaw = (config as Record<string, unknown>).productTabs as
    | string[]
    | Array<{ id: string; label: string }>
    | undefined;
  const productTabs: string[] | undefined = productTabsRaw?.map((t) =>
    typeof t === "string" ? t : t.label,
  );
  // chipStyle: visual style for CHIPS category nav variant
  const chipStyle = (config as Record<string, unknown>).chipStyle as string | undefined;
  // categoryIconColor: override icon color for category nav icon-text mode
  const categoryIconColor = (config as Record<string, unknown>).categoryIconColor as string | undefined;
  // categorySize: "large" renders bigger icon containers in HORIZONTAL_SCROLL variant
  const categorySize = (config as Record<string, unknown>).categorySize as "default" | "large" | undefined;
  // categoriesWide: when true, widens the categories section to ~85% desktop (closer to left edge)
  const categoriesWide = (config as Record<string, unknown>).categoriesWide === true;
  // productsLimit: when set, splits collectionProducts into two sections
  const productsLimit = (config as Record<string, unknown>).productsLimit as number | undefined;
  // secondProductsHeading: heading for the second products section (used with productsLimit)
  const secondProductsHeading = (config as Record<string, unknown>).secondProductsHeading as string | undefined;
  // heroFeaturedCount: when set, renders this many products between the hero and the CTA,
  // without discounts. The CTA button is rendered externally. Remaining products are the collection.
  const heroFeaturedCount = (config as Record<string, unknown>).heroFeaturedCount as number | undefined;
  // showCategories: false hides the categories section entirely (template opt-out)
  const showCategories = (config as Record<string, unknown>).showCategories !== false;
  // When true, the hero section is constrained to the same 65% width as the other sections
  const heroConstrained = (config as Record<string, unknown>).heroConstrained === true;
  // When true, the hero section is hidden on mobile (md:block)
  const heroDesktopOnly = (config as Record<string, unknown>).heroDesktopOnly === true;
  // Video section — visible when the template has videoPosterImage or videoTitle in content
  // and the sections array includes { id: "video", visible: true }
  const videoSectionVisible = (() => {
    const hasPoster = !!config.content?.videoPosterImage;
    const hasTitle = !!config.content?.videoTitle;
    if (!hasPoster && !hasTitle) return false;
    const sections = config.sections as readonly { id: string; visible: boolean }[] | undefined;
    if (!sections) return true; // no sections array → show if content is present
    const videoSection = sections.find((s) => s.id === "video");
    return videoSection ? videoSection.visible : false;
  })();
  // When true, PROMO_CARD hero uses compact height (clamp(160px, 22vw, 240px))
  const heroCompact = (config as Record<string, unknown>).heroCompact === true;
  // Optional editorial section — rendered when editorialHeading or editorialBody is defined in content
  const editorialHeading = config.content?.editorialHeading;
  const editorialSubheading = config.content?.editorialSubheading;
  const editorialBody = config.content?.editorialBody;
  const productsMobile = grid?.products?.mobile ?? 2;
  const productsDesktop = grid?.products?.desktop ?? 4;
  const categoriesMobile = grid?.categories?.mobile ?? 3;
  const categoriesDesktop = grid?.categories?.desktop ?? 6;

  // Hero data con fallbacks al store
  const hero = {
    subtitle: heroData?.subtitle ?? "",
    titleLight: heroData?.titleLight ?? store.name,
    titleBold: heroData?.titleBold ?? "",
    description: heroData?.description ?? store.description ?? "",
    ctaText: heroData?.ctaText ?? "Ver catálogo",
    image: heroData?.image ?? store.logo ?? "",
    bgColor: "var(--t-background)",
    onCtaClick,
    // When heroFeaturedCount is active, the hero does not render its CTA — CoreHomePage does it below the featured products
    hideCta: heroFeaturedCount !== undefined && heroFeaturedCount > 0,
    compact: heroCompact,
    secondCtaText: heroData?.secondCtaText,
  };

  // When heroFeaturedCount is set, split products into featured (clean, no discounts) and collection (with discounts)
  const featuredProducts = heroFeaturedCount !== undefined && heroFeaturedCount > 0
    ? products.slice(0, heroFeaturedCount)
    : [];
  const collectionProducts = products;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--t-background)" }}
    >
      {/* ── Search bar (opcional) — entre header y hero ───────────────────── */}
      {showSearchBar && SearchBarComponent && (
        <div className="max-w-[92%] lg:max-w-[65%] mx-auto py-3">
          <SearchBarComponent
            value={searchValue}
            onChange={setSearchValue}
            placeholder={searchBarPlaceholder}
          />
        </div>
      )}

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        aria-label="Banner principal"
        className={[
          heroConstrained ? "max-w-[92%] lg:max-w-[65%] mx-auto pt-4" : "",
          heroDesktopOnly ? "hidden md:block" : "",
        ].filter(Boolean).join(" ") || undefined}
      >
        <HeroComponent {...hero} />
      </section>

      {/* ── Featured products (heroFeaturedCount mode) ───────────────────── */}
      {featuredProducts.length > 0 && (
        <section
          aria-label="Productos destacados"
          style={{
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
          }}
          className="max-w-[92%] lg:max-w-[65%] mx-auto"
        >
          <div
            className={`grid ${gridColsClass(productsMobile, productsDesktop)}`}
            style={{ gap: "var(--t-space-gap, 1rem)" }}
          >
            {featuredProducts.map((product) => (
              <ProductCardComponent
                key={product.id}
                product={product}
                currencySymbol={currencySymbol}
                onClick={onProductClick}
                onAddToCart={onAddToCart}
                buttonClass={buttonClass}
                badgeClass={badgeClass}
                priceConfig={priceConfig}
                cardBgClass={cardBgClass}
                cardBorderClass={cardBorderClass}
                hoverFxClass={hoverFxClass}
                imageHoverClass={imageHoverClass}
                imageFitClass={imageFitClass}
                aspectRatioClass={aspectRatioClass}
                showAddToCart={false}
                showDiscountBadge={false}
                showOriginalPrice={false}
                showRating={showRating}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── External CTA (heroFeaturedCount mode) ────────────────────────── */}
      {featuredProducts.length > 0 && (
        <div className="max-w-[92%] lg:max-w-[65%] mx-auto pb-8 md:pb-10">
          <button
            type="button"
            className="flex items-center gap-2 px-6 md:px-8 py-3 md:py-3.5 cursor-pointer transition-opacity hover:opacity-80 border-none"
            style={{
              backgroundColor: "var(--t-secondary)",
              borderRadius: "var(--t-radius-button)",
            }}
            onClick={onCtaClick}
            aria-label={hero.ctaText}
          >
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "1px",
                color: "var(--t-foreground)",
              }}
            >
              {hero.ctaText}
            </span>
            <ArrowRight
              size={16}
              strokeWidth={2}
              style={{ color: "var(--t-foreground)" }}
            />
          </button>
        </div>
      )}

      {/* ── Categorías ───────────────────────────────────────────────────── */}
      {showCategories && categories.length > 0 && (
        <section
          aria-labelledby="home-categories-heading"
          style={{
            paddingTop: "1rem",
            paddingBottom: "0.5rem",
          }}
          className={categoriesWide ? "max-w-[92%] lg:max-w-[80%] mx-auto" : "max-w-[92%] lg:max-w-[65%] mx-auto"}
        >
          <h2 id="home-categories-heading" className="sr-only">
            Categorías
          </h2>
          <CategoryNavComponent
            categories={categories}
            onCategoryClick={onCategoryClick}
            gridMobile={categoriesMobile}
            gridDesktop={categoriesDesktop}
            heading={categoriesHeading}
            showViewAll={!!categoriesHeading}
            onViewAll={onCtaClick}
            chipStyle={chipStyle as "underline" | "pills" | "bordered" | undefined}
            iconColor={categoryIconColor}
            size={categorySize}
          />
        </section>
      )}

      {/* ── Video (opcional) ─────────────────────────────────────────────── */}
      {videoSectionVisible && (
        <div className="max-w-[92%] lg:max-w-[65%] mx-auto">
          <VideoSection config={config} />
        </div>
      )}

      {/* ── Más Vendidos (opcional) ──────────────────────────────────────── */}
      {bestSellers && bestSellers.length > 0 && (
        <BestSellersSection
          bestSellers={bestSellers}
          currencySymbol={currencySymbol}
        />
      )}

      {/* ── Product tab navigation (mock — first tab always active) ─────────── */}
      {productTabs && productTabs.length > 0 && (
        <div
          className={categoriesWide ? "max-w-[92%] lg:max-w-[80%] mx-auto" : "max-w-[92%] lg:max-w-[65%] mx-auto"}
          style={{ paddingTop: "2.5rem", paddingBottom: "0.5rem" }}
        >
          <div className="flex gap-6" role="tablist" aria-label="Filtrar productos">
            {productTabs.map((tab, i) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={i === 0}
                style={{
                  color: i === 0 ? "var(--t-foreground)" : "var(--t-muted)",
                  fontWeight: i === 0 ? 600 : 400,
                  fontSize: "0.95rem",
                  paddingBottom: "0.5rem",
                  paddingTop: 0,
                  paddingLeft: 0,
                  paddingRight: 0,
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottomWidth: "2px",
                  borderBottomStyle: "solid",
                  borderBottomColor: i === 0 ? "var(--t-foreground)" : "transparent",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Productos ────────────────────────────────────────────────────── */}
      {(() => {
        const firstSectionProducts = productsLimit !== undefined
          ? collectionProducts.slice(0, productsLimit)
          : collectionProducts;
        const secondSectionProducts = productsLimit !== undefined
          ? collectionProducts.slice(productsLimit)
          : [];

        const renderProductGrid = (
          productList: StorefrontProduct[],
          headingText: string | undefined,
          headingId: string,
        ) => {
          if (productList.length === 0) return null;
          return (
            <section
              aria-labelledby={headingId}
              style={{
                paddingTop: "0.5rem",
                paddingBottom: "var(--t-space-section, 2.5rem)",
              }}
              className={categoriesWide ? "max-w-[92%] lg:max-w-[80%] mx-auto" : "max-w-[92%] lg:max-w-[65%] mx-auto"}
            >
              {headingText ? (
                <div className="flex items-center justify-between mb-4">
                  <h2
                    id={headingId}
                    className="text-[var(--t-foreground)] tracking-[0.24px]"
                    style={{
                      fontWeight: "var(--t-type-heading-weight, 500)" as React.CSSProperties["fontWeight"],
                      fontSize: "var(--t-type-heading-size, 1.5rem)",
                      letterSpacing: "var(--t-type-heading-tracking, 0.24px)",
                      textTransform: "var(--t-type-heading-transform, none)" as React.CSSProperties["textTransform"],
                    }}
                  >
                    {headingText}
                  </h2>
                  <button
                    type="button"
                    className="bg-transparent border-none cursor-pointer text-sm font-medium hover:opacity-70 transition-opacity"
                    style={{ color: "var(--t-muted)" }}
                    onClick={onCtaClick}
                  >
                    Ver todo
                  </button>
                </div>
              ) : (
                <h2 id={headingId} className="sr-only">
                  Productos
                </h2>
              )}
              <div
                className={`grid ${gridColsClass(productsMobile, productsDesktop)}`}
                style={{ gap: "var(--t-space-gap, 1rem)" }}
              >
                {productList.map((product) => {
                  const discount =
                    product.originalPrice && product.originalPrice > product.price
                      ? Math.round(
                          ((product.originalPrice - product.price) /
                            product.originalPrice) *
                            100
                        )
                      : undefined;
                  void discount;
                  return (
                    <ProductCardComponent
                      key={product.id}
                      product={product}
                      currencySymbol={currencySymbol}
                      onClick={onProductClick}
                      onAddToCart={onAddToCart}
                      buttonClass={buttonClass}
                      badgeClass={badgeClass}
                      priceConfig={priceConfig}
                      cardBgClass={cardBgClass}
                      cardBorderClass={cardBorderClass}
                      hoverFxClass={hoverFxClass}
                      imageHoverClass={imageHoverClass}
                      imageFitClass={imageFitClass}
                      aspectRatioClass={aspectRatioClass}
                      showAddToCart={showAddToCartInGrid}
                      showDiscountBadge={showDiscountBadge}
                      showOriginalPrice={showOriginalPrice}
                      showRating={showRating}
                    />
                  );
                })}
              </div>
            </section>
          );
        };

        return (
          <>
            {renderProductGrid(firstSectionProducts, productsHeading, "home-products-heading")}
            {secondProductsHeading && renderProductGrid(secondSectionProducts, secondProductsHeading, "home-products-heading-2")}
          </>
        );
      })()}

      {/* ── Productos populares (opcional) ──────────────────────────────── */}
      {popularProducts && popularProducts.length > 0 && (
        <section
          aria-labelledby="popular-products-heading"
          style={{
            paddingTop: "var(--t-space-section, 2.5rem)",
            paddingBottom: "var(--t-space-section, 2.5rem)",
          }}
          className={categoriesWide ? "max-w-[92%] lg:max-w-[80%] mx-auto" : "max-w-[92%] lg:max-w-[65%] mx-auto"}
        >
          <div className="flex items-center justify-between mb-4">
            <h2
              id="popular-products-heading"
              style={{
                color: "var(--t-foreground)",
                fontWeight: "var(--t-type-heading-weight, 500)" as React.CSSProperties["fontWeight"],
                fontSize: "var(--t-type-heading-size, 1.5rem)",
                letterSpacing: "var(--t-type-heading-tracking, 0.24px)",
                textTransform: "var(--t-type-heading-transform, none)" as React.CSSProperties["textTransform"],
              }}
            >
              Productos populares
            </h2>
          </div>
          <div
            className={`grid grid-cols-2 md:grid-cols-4`}
            style={{ gap: "var(--t-space-gap, 1rem)" }}
          >
            {popularProducts.map((item) => (
              <div key={item.title} className="flex flex-col gap-3">
                <div
                  className="relative aspect-square overflow-hidden"
                  style={{
                    borderRadius: "var(--t-radius-card, 9px)",
                    backgroundColor: item.bgColor || "var(--t-card)",
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    loading="lazy"
                  />
                </div>
                <h3
                  style={{
                    color: "var(--t-foreground)",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    color: "var(--t-muted)",
                    fontSize: "0.8rem",
                    lineHeight: 1.5,
                  }}
                >
                  {item.description}
                </p>
                <button
                  type="button"
                  style={{
                    border: "1px solid var(--t-primary)",
                    color: "var(--t-primary)",
                    borderRadius: "var(--t-radius-button, 8px)",
                    padding: "8px 16px",
                    background: "transparent",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    alignSelf: "flex-start",
                  }}
                >
                  {item.ctaText}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Descuentos (opcional) ─────────────────────────────────────────── */}
      {discountProducts && discountProducts.length > 0 && (
        <section
          aria-labelledby="discount-products-heading"
          style={{
            paddingTop: "0.5rem",
            paddingBottom: "var(--t-space-section, 2.5rem)",
          }}
          className={categoriesWide ? "max-w-[92%] lg:max-w-[80%] mx-auto" : "max-w-[92%] lg:max-w-[65%] mx-auto"}
        >
          <div className="flex items-center justify-between mb-4">
            <h2
              id="discount-products-heading"
              style={{
                color: "var(--t-foreground)",
                fontWeight: "var(--t-type-heading-weight, 500)" as React.CSSProperties["fontWeight"],
                fontSize: "var(--t-type-heading-size, 1.5rem)",
                letterSpacing: "var(--t-type-heading-tracking, 0.24px)",
                textTransform: "var(--t-type-heading-transform, none)" as React.CSSProperties["textTransform"],
              }}
            >
              Descuentos de hasta -50%
            </h2>
            <button
              type="button"
              className="bg-transparent border-none cursor-pointer text-sm font-medium hover:opacity-70 transition-opacity"
              style={{ color: "var(--t-muted)" }}
              onClick={onCtaClick}
            >
              Ver todo
            </button>
          </div>
          <div
            className={`grid ${gridColsClass(productsMobile, productsDesktop)}`}
            style={{ gap: "var(--t-space-gap, 1rem)" }}
          >
            {discountProducts.map((product) => (
              <ProductCardComponent
                key={product.id}
                product={product}
                currencySymbol={currencySymbol}
                onClick={onProductClick}
                onAddToCart={onAddToCart}
                buttonClass={buttonClass}
                badgeClass={badgeClass}
                priceConfig={priceConfig}
                cardBgClass={cardBgClass}
                cardBorderClass={cardBorderClass}
                hoverFxClass={hoverFxClass}
                imageHoverClass={imageHoverClass}
                imageFitClass={imageFitClass}
                aspectRatioClass={aspectRatioClass}
                showAddToCart={showAddToCartInGrid}
                showDiscountBadge={showDiscountBadge}
                showOriginalPrice={showOriginalPrice}
                showRating={showRating}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── Editorial (opcional) ─────────────────────────────────────────── */}
      {(editorialHeading || editorialBody) && (
        <section
          className="py-12 md:py-16 lg:py-20"
          aria-labelledby="home-editorial-heading"
        >
          <div className="max-w-[92%] lg:max-w-[65%] mx-auto">
            <div className="text-center max-w-md md:max-w-lg lg:max-w-xl mx-auto">
              <h2
                id="home-editorial-heading"
                className="leading-none mb-4 md:mb-6 text-[28px] md:text-3xl lg:text-4xl"
                style={{
                  color: "var(--t-foreground)",
                  fontWeight: "var(--t-type-heading-weight, 800)" as React.CSSProperties["fontWeight"],
                  textTransform: "uppercase" as React.CSSProperties["textTransform"],
                  letterSpacing: "2px",
                }}
              >
                {editorialHeading}
                {editorialSubheading && (
                  <>
                    <br />
                    {editorialSubheading}
                  </>
                )}
              </h2>
              {editorialBody && (
                <p
                  className="text-[13px] md:text-sm lg:text-base"
                  style={{
                    color: "var(--t-muted)",
                    fontWeight: 400,
                    lineHeight: 1.75,
                  }}
                >
                  {editorialBody}
                </p>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
});
