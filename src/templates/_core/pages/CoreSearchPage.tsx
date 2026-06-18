"use client";

// _core/pages/CoreSearchPage.tsx
// Layout estructural de la página de búsqueda.
// SearchBar variant + grilla de resultados (o estado vacío + búsquedas populares).
// NO gestiona estado — todo viene como props del shell.

import React, { memo } from "react";
import { SEARCH_BAR_REGISTRY } from "@/templates/_variants/search-bar";
import { PRODUCT_CARD_REGISTRY } from "@/templates/_variants/product-card";
import { gridColsClass } from "@/templates/_shared/utils/grid-classes";
import { resolveStyleTokens } from "./style-tokens";
import type { ResolvedStoreConfig } from "@/types/templates/resolved-config";
import type { StorefrontProduct } from "@/types/store";
import type { ProductCardVariant } from "@/templates/_variants/product-card";
import type { SearchBarVariant } from "@/templates/_variants/search-bar";

interface CoreSearchPageProps {
  config: ResolvedStoreConfig;
  variants: { productCard: ProductCardVariant; searchBar: SearchBarVariant };
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  searchResults: StorefrontProduct[];
  resultCount: number;
  hasNoResults: boolean;
  onProductClick: (slug: string) => void;
  onAddToCart: (productId: string) => void;
  popularSearches?: string[];
  currencySymbol?: string;
}

export const CoreSearchPage = memo(function CoreSearchPage({
  config,
  variants,
  searchQuery,
  setSearchQuery,
  searchResults,
  resultCount,
  hasNoResults,
  onProductClick,
  onAddToCart,
  popularSearches = [],
  currencySymbol = "$",
}: CoreSearchPageProps) {
  const SearchBarComponent = SEARCH_BAR_REGISTRY[variants.searchBar];
  const ProductCardComponent = PRODUCT_CARD_REGISTRY[variants.productCard];

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

  const configAny = config as Record<string, unknown>;
  const showAddToCartInGrid = configAny.showAddToCartInGrid !== false;
  const showDiscountBadge = configAny.showDiscountBadge !== false;
  const showOriginalPrice = configAny.showOriginalPrice !== false;

  const grid = config.grid;
  const searchMobile = grid?.search?.mobile ?? 2;
  const searchDesktop = grid?.search?.desktop ?? 4;

  const hasQuery = searchQuery.trim().length > 0;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--t-background)" }}
    >
      <main
        className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8 pt-5 pb-[calc(80px+env(safe-area-inset-bottom,0px))] md:pb-10"
      >
        {/* ── Barra de búsqueda ──────────────────────────────────────────── */}
        <div className="mb-5">
          <SearchBarComponent
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Buscar productos..."
          />
        </div>

        {/* ── Sin query: populares + descubrir ──────────────────────────── */}
        {!hasQuery && (
          <div className="flex flex-col gap-7">
            {popularSearches.length > 0 && (
              <section aria-labelledby="popular-searches-heading">
                <h2
                  id="popular-searches-heading"
                  className="text-sm font-bold mb-3"
                  style={{ color: "var(--t-foreground)", margin: "0 0 10px 0" }}
                >
                  Búsquedas populares
                </h2>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setSearchQuery(term)}
                      className="text-xs px-3 py-1.5"
                      style={{
                        color: "var(--t-foreground)",
                        backgroundColor: "var(--t-secondary)",
                        border: "1px solid var(--t-border)",
                        borderRadius: "9999px",
                        cursor: "pointer",
                      }}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {searchResults.length > 0 && (
              <section aria-labelledby="discover-heading">
                <h2
                  id="discover-heading"
                  className="text-sm font-bold"
                  style={{ color: "var(--t-foreground)", margin: "0 0 12px 0" }}
                >
                  Descubrir
                </h2>
                <div
                  className={`grid ${gridColsClass(searchMobile, searchDesktop)}`}
                  style={{ gap: "var(--t-space-gap, 1rem)" }}
                >
                  {searchResults.slice(0, 8).map((product) => (
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
                      showDiscountBadge={showDiscountBadge}
                      showOriginalPrice={showOriginalPrice}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* ── Sin resultados ────────────────────────────────────────────── */}
        {hasQuery && hasNoResults && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: "var(--t-secondary)" }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="8" stroke="var(--t-primary)" strokeWidth="1.75" />
                <path d="M21 21l-4.35-4.35" stroke="var(--t-primary)" strokeWidth="1.75" strokeLinecap="round" />
                <path d="M8 8l6 6M14 8l-6 6" stroke="var(--t-primary)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="text-center flex flex-col gap-1">
              <p className="text-base font-semibold" style={{ color: "var(--t-foreground)", margin: 0 }}>
                Sin resultados
              </p>
              <p className="text-sm" style={{ color: "var(--t-muted)", margin: 0 }}>
                No encontramos productos para{" "}
                <strong style={{ color: "var(--t-foreground)" }}>
                  &quot;{searchQuery}&quot;
                </strong>
              </p>
            </div>
            {popularSearches.length > 0 && (
              <div className="flex flex-col items-center gap-2 mt-2">
                <p className="text-sm" style={{ color: "var(--t-muted)" }}>
                  Probá con:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {popularSearches.slice(0, 4).map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setSearchQuery(term)}
                      className="text-xs px-3 py-1.5"
                      style={{
                        color: "var(--t-foreground)",
                        background: "var(--t-secondary)",
                        border: "1px solid var(--t-border)",
                        borderRadius: "9999px",
                        cursor: "pointer",
                      }}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Resultados ────────────────────────────────────────────────── */}
        {hasQuery && !hasNoResults && (
          <div className="flex flex-col gap-4">
            <p className="text-xs font-medium" style={{ color: "var(--t-muted)", margin: 0 }}>
              <span style={{ color: "var(--t-foreground)", fontWeight: 600 }}>{resultCount}</span>{" "}
              {resultCount === 1 ? "resultado" : "resultados"} para{" "}
              <span style={{ color: "var(--t-primary)" }}>&quot;{searchQuery}&quot;</span>
            </p>
            <div
              className={`grid ${gridColsClass(searchMobile, searchDesktop)}`}
              style={{ gap: "var(--t-space-gap, 1rem)" }}
              aria-label={`Resultados de búsqueda para ${searchQuery}`}
            >
              {searchResults.map((product) => (
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
                  showDiscountBadge={showDiscountBadge}
                  showOriginalPrice={showOriginalPrice}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
});
