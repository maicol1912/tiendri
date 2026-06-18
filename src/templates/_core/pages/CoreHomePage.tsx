"use client";

// _core/pages/CoreHomePage.tsx
// Layout estructural del Home. NO gestiona estado.
// Recibe todo como props, resuelve variantes desde los registries y arma el layout.

import React, { memo } from "react";
import { HERO_REGISTRY } from "@/templates/_variants/hero";
import { CATEGORY_NAV_REGISTRY } from "@/templates/_variants/category-nav";
import { PRODUCT_CARD_REGISTRY } from "@/templates/_variants/product-card";
import { SEARCH_BAR_REGISTRY } from "@/templates/_variants/search-bar";
import { gridColsClass } from "@/templates/_shared/utils/grid-classes";
import { resolveStyleTokens } from "./style-tokens";
import type { ResolvedStoreConfig } from "@/types/templates/resolved-config";
import type { StorefrontProduct, StoreInfo, Category } from "@/types/store";
import type { HeroVariant } from "@/templates/_variants/hero";
import type { CategoryNavVariant } from "@/templates/_variants/category-nav";
import type { ProductCardVariant } from "@/templates/_variants/product-card";
import type { SearchBarVariant } from "@/templates/_variants/search-bar";

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
  };
  /** Si es true, renderiza un search bar entre el header y el hero */
  showSearchBar?: boolean;
  searchBarVariant?: SearchBarVariant;
  searchBarPlaceholder?: string;
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

  const grid = config.grid;
  // Template-level opt-out of the "Comprar" button in the home grid
  const showAddToCartInGrid = (config as Record<string, unknown>).showAddToCartInGrid !== false;
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
  };

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
      <section aria-label="Banner principal">
        <HeroComponent {...hero} />
      </section>

      {/* ── Categorías ───────────────────────────────────────────────────── */}
      {categories.length > 0 && (
        <section
          aria-labelledby="home-categories-heading"
          style={{
            paddingTop: "1rem",
            paddingBottom: "0.5rem",
          }}
          className="max-w-[92%] lg:max-w-[65%] mx-auto"
        >
          <h2 id="home-categories-heading" className="sr-only">
            Categorías
          </h2>
          <CategoryNavComponent
            categories={categories}
            onCategoryClick={onCategoryClick}
            gridMobile={categoriesMobile}
            gridDesktop={categoriesDesktop}
          />
        </section>
      )}

      {/* ── Productos ────────────────────────────────────────────────────── */}
      {products.length > 0 && (
        <section
          aria-labelledby="home-products-heading"
          style={{
            paddingTop: "0.5rem",
            paddingBottom: "var(--t-space-section, 2.5rem)",
          }}
          className="max-w-[92%] lg:max-w-[65%] mx-auto"
        >
          <h2
            id="home-products-heading"
            className="sr-only"
          >
            Productos
          </h2>
          <div
            className={`grid ${gridColsClass(productsMobile, productsDesktop)}`}
            style={{ gap: "var(--t-space-gap, 1rem)" }}
          >
            {products.map((product) => {
              const discount =
                product.originalPrice && product.originalPrice > product.price
                  ? Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )
                  : undefined;
              void discount; // descuento calculado, disponible para las variantes que lo necesiten
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
                  showAddToCart={showAddToCartInGrid}
                />
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
});
