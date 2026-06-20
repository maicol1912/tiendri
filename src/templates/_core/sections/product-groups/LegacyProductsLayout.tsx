"use client";
import React, { memo } from "react";
import { PRODUCT_CARD_REGISTRY } from "@/templates/_variants/product-card";
import { gridColsClass } from "@/templates/_shared/utils/grid-classes";
import { getSectionField } from "../get-section-field";
import type { SectionRendererProps } from "../types";
import type { StorefrontProduct } from "@/types/domain/store";

export const LegacyProductsLayout = memo(function LegacyProductsLayout({
  products,
  config,
  variants,
  currencySymbol,
  styleTokens,
  aspectRatioClass,
  onProductClick,
  onAddToCart,
  onCtaClick,
  showAddToCartInGrid = true,
  showDiscountBadge = true,
  showOriginalPrice = true,
  showRating = false,
  categoriesWide = false,
  productsHeading,
  secondProductsHeading,
  productsLimit,
  productTabs,
  sectionConfig,
}: SectionRendererProps) {
  const grid = config.grid;
  const productsMobile = getSectionField("gridColumnsMobile", sectionConfig, grid?.products?.mobile, 2);
  const productsDesktop = getSectionField("gridColumnsDesktop", sectionConfig, grid?.products?.desktop, 4);
  const textAlignment = getSectionField("textAlignment", sectionConfig, undefined, "left" as const);
  const fontOverride = getSectionField<string | undefined>("fontFamily", sectionConfig, undefined, undefined);
  const curatedProductIds = getSectionField<string[]>("curatedProductIds", sectionConfig, undefined, []);
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
  } = styleTokens;

  const widthClass = categoriesWide
    ? "max-w-[92%] lg:max-w-[80%] mx-auto"
    : "max-w-[92%] lg:max-w-[65%] mx-auto";

  const displayProducts =
    curatedProductIds.length > 0
      ? (curatedProductIds
          .map((id) => products.find((p) => p.id === id))
          .filter(Boolean) as StorefrontProduct[])
      : products;

  const firstSectionProducts =
    productsLimit !== undefined
      ? displayProducts.slice(0, productsLimit)
      : displayProducts;
  const secondSectionProducts =
    productsLimit !== undefined ? displayProducts.slice(productsLimit) : [];

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
        className={widthClass}
      >
        {headingText ? (
          <div
            className="flex items-center justify-between mb-4"
            style={{ textAlign: textAlignment as React.CSSProperties["textAlign"] }}
          >
            <h2
              id={headingId}
              className="text-[var(--t-foreground)] tracking-[0.24px]"
              style={{
                fontWeight:
                  "var(--t-type-heading-weight, 500)" as React.CSSProperties["fontWeight"],
                fontSize: "var(--t-type-heading-size, 1.5rem)",
                letterSpacing: "var(--t-type-heading-tracking, 0.24px)",
                textTransform:
                  "var(--t-type-heading-transform, none)" as React.CSSProperties["textTransform"],
                ...(fontOverride ? { fontFamily: fontOverride } : {}),
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

  if (displayProducts.length === 0) return null;

  return (
    <section aria-labelledby="home-products-heading">
      {/* ── Product tab navigation (mock — first tab always active) ─────────── */}
      {productTabs && productTabs.length > 0 && (
        <div
          className={widthClass}
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
                  borderBottomColor:
                    i === 0 ? "var(--t-foreground)" : "transparent",
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

      {/* ── Products grids ──────────────────────────────────────────────────── */}
      {renderProductGrid(firstSectionProducts, productsHeading, "home-products-heading")}
      {secondProductsHeading &&
        renderProductGrid(
          secondSectionProducts,
          secondProductsHeading,
          "home-products-heading-2",
        )}
    </section>
  );
});
