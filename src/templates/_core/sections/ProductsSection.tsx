"use client";
import React, { memo } from "react";
import { PRODUCT_CARD_REGISTRY } from "@/templates/_variants/product-card";
import { gridColsClass } from "@/templates/_shared/utils/grid-classes";
import type { SectionRendererProps } from "./types";

export const ProductsSection = memo(function ProductsSection({
  products,
  config,
  variants,
  currencySymbol,
  styleTokens,
  onProductClick,
  onAddToCart,
}: SectionRendererProps) {
  if (products.length === 0) return null;

  const grid = config.grid;
  const productsMobile = grid?.products?.mobile ?? 2;
  const productsDesktop = grid?.products?.desktop ?? 4;
  const ProductCardComponent = PRODUCT_CARD_REGISTRY[variants.productCard];
  const { buttonClass, badgeClass, priceConfig, cardBgClass, hoverFxClass, imageFitClass, imageHoverClass, cardBorderClass } = styleTokens;

  // Template-level overrides for card display
  const extendedConfig = config as unknown as { showOriginalPrice?: boolean; cardTextCenter?: boolean };
  const showOriginalPrice = extendedConfig.showOriginalPrice !== false;
  const textCenter = extendedConfig.cardTextCenter === true;

  return (
    <section
      aria-labelledby="home-products-heading"
      style={{
        paddingTop: "var(--t-space-section, 2.5rem)",
        paddingBottom: "var(--t-space-section, 2.5rem)",
      }}
      className="px-4 lg:px-[160px]"
    >
      <h2
        id="home-products-heading"
        className="mb-6"
        style={{
          color: "var(--t-foreground)",
          fontWeight: "var(--t-type-heading-weight, 600)" as React.CSSProperties["fontWeight"],
          fontSize: "var(--t-type-heading-size, 1.5rem)",
          letterSpacing: "var(--t-type-heading-tracking, 0em)",
          textTransform: "var(--t-type-heading-transform, none)" as React.CSSProperties["textTransform"],
        }}
      >
        Productos
      </h2>
      <div
        className={`grid ${gridColsClass(productsMobile, productsDesktop)}`}
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
            showOriginalPrice={showOriginalPrice}
            {...(textCenter ? { textCenter } : {})}
          />
        ))}
      </div>
    </section>
  );
});
