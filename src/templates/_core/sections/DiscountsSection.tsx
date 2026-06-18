"use client";
import React, { memo } from "react";
import { PRODUCT_CARD_REGISTRY } from "@/templates/_variants/product-card";
import { gridColsClass } from "@/templates/_shared/utils/grid-classes";
import type { SectionRendererProps } from "./types";

export const DiscountsSection = memo(function DiscountsSection({
  discountProducts,
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
}: SectionRendererProps) {
  if (!discountProducts || discountProducts.length === 0) return null;

  const grid = config.grid;
  const productsMobile = grid?.products?.mobile ?? 2;
  const productsDesktop = grid?.products?.desktop ?? 4;
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

  return (
    <section
      aria-labelledby="discount-products-heading"
      style={{
        paddingTop: "0.5rem",
        paddingBottom: "var(--t-space-section, 2.5rem)",
      }}
      className={widthClass}
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
  );
});
