"use client";
import React, { memo, useRef } from "react";
import { PRODUCT_CARD_REGISTRY } from "@/templates/_variants/product-card";
import { gridColsClass } from "@/templates/_shared/utils/grid-classes";
import type { SectionRendererProps } from "./types";

export const CollectionsSection = memo(function CollectionsSection({
  products,
  config,
  variants,
  currencySymbol,
  styleTokens,
  onProductClick,
  onAddToCart,
}: SectionRendererProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  if (products.length === 0) return null;

  const content = config as unknown as { content?: { collectionsTitle?: string; collectionsSubtitle?: string } };
  const title = content.content?.collectionsTitle ?? "Colección";
  const subtitle = content.content?.collectionsSubtitle;

  const grid = config.grid;
  const mobile = grid?.products?.mobile ?? 2;
  const desktop = grid?.products?.desktop ?? 4;

  const ProductCardComponent = PRODUCT_CARD_REGISTRY[variants.productCard];
  const { buttonClass, badgeClass, priceConfig, cardBgClass, hoverFxClass, imageFitClass, imageHoverClass, cardBorderClass } = styleTokens;

  // Template-level overrides for card display
  const extendedConfig = config as unknown as { showOriginalPrice?: boolean; cardTextCenter?: boolean };
  const showOriginalPrice = extendedConfig.showOriginalPrice !== false;
  const textCenter = extendedConfig.cardTextCenter === true;

  return (
    <section
      aria-labelledby="home-collections-heading"
      style={{
        paddingTop: "var(--t-space-section, 2rem)",
        paddingBottom: "var(--t-space-section, 3rem)",
      }}
    >
      <div className="px-4 lg:px-[160px] mb-5">
        <h2
          id="home-collections-heading"
          className="leading-none"
          style={{
            color: "var(--t-foreground)",
            fontWeight: "var(--t-type-heading-weight, 700)" as React.CSSProperties["fontWeight"],
            fontSize: "var(--t-type-heading-size, 1.375rem)",
            textTransform: "var(--t-type-heading-transform, uppercase)" as React.CSSProperties["textTransform"],
            letterSpacing: "var(--t-type-heading-tracking, 0.1em)",
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className="mt-1 text-xs md:text-sm"
            style={{ color: "var(--t-muted)" }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Mobile: horizontal scroll carousel */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-3 px-4 md:hidden"
        style={{ scrollbarWidth: "none" }}
        aria-label={`Colección ${title}`}
      >
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0" style={{ width: "169px" }}>
            <ProductCardComponent
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
          </div>
        ))}
      </div>

      {/* Desktop: grid layout */}
      <div className="hidden md:block px-4 lg:px-[160px]">
        <div
          className={`grid ${gridColsClass(mobile, desktop)}`}
          style={{ gap: "var(--t-space-gap, 1.25rem)" }}
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
      </div>
    </section>
  );
});
