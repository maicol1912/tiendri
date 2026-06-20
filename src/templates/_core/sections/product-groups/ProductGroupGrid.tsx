"use client";
import React, { memo } from "react";
import { PRODUCT_CARD_REGISTRY } from "@/templates/_variants/product-card";
import { gridColsClass } from "@/templates/_shared/utils/grid-classes";
import type { ProductCardVariant } from "@/templates/_variants/product-card";
import type { ResolvedStyleTokens } from "@/templates/_core/pages/style-tokens";
import type { StorefrontProduct } from "@/types/domain/store";

export interface ProductGroupGridProps {
  products: StorefrontProduct[];
  gridColumnsMobile?: number;
  gridColumnsDesktop?: number;
  currencySymbol: string;
  productCardVariant: ProductCardVariant;
  styleTokens: ResolvedStyleTokens;
  aspectRatioClass?: string;
  showAddToCartInGrid?: boolean;
  showDiscountBadge?: boolean;
  showOriginalPrice?: boolean;
  showRating?: boolean;
  onProductClick: (slug: string) => void;
  onAddToCart: (productId: string) => void;
  widthClass?: string;
}

export const ProductGroupGrid = memo(function ProductGroupGrid({
  products,
  gridColumnsMobile = 2,
  gridColumnsDesktop = 4,
  currencySymbol,
  productCardVariant,
  styleTokens,
  aspectRatioClass,
  showAddToCartInGrid = true,
  showDiscountBadge = true,
  showOriginalPrice = true,
  showRating = false,
  onProductClick,
  onAddToCart,
  widthClass = "max-w-[92%] lg:max-w-[65%] mx-auto",
}: ProductGroupGridProps) {
  if (products.length === 0) return null;

  const ProductCardComponent = PRODUCT_CARD_REGISTRY[productCardVariant];
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

  return (
    <div
      className={widthClass}
      style={{
        paddingTop: "0.5rem",
        paddingBottom: "var(--t-space-section, 2.5rem)",
      }}
    >
      <div
        className={`grid ${gridColsClass(gridColumnsMobile, gridColumnsDesktop)}`}
        style={{ gap: "var(--t-space-gap, 1rem)" }}
      >
        {products.map((product) => (
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
    </div>
  );
});
