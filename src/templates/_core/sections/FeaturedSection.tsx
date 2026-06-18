"use client";
import React, { memo } from "react";
import { ArrowRight } from "lucide-react";
import { PRODUCT_CARD_REGISTRY } from "@/templates/_variants/product-card";
import { gridColsClass } from "@/templates/_shared/utils/grid-classes";
import type { SectionRendererProps } from "./types";

export const FeaturedSection = memo(function FeaturedSection({
  products,
  variants,
  config,
  currencySymbol,
  styleTokens,
  onProductClick,
  onAddToCart,
  onCtaClick,
  heroData,
  heroFeaturedCount,
  aspectRatioClass,
  showRating,
}: SectionRendererProps) {
  if (!heroFeaturedCount || heroFeaturedCount <= 0) return null;

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

  const grid = config.grid;
  const productsMobile = grid?.products?.mobile ?? 2;
  const productsDesktop = grid?.products?.desktop ?? 4;

  const featuredProducts = products.slice(0, heroFeaturedCount);

  // Resolve CTA text the same way CoreHomePage does (via hero object)
  const ctaText = heroData?.ctaText ?? "Ver catálogo";

  return (
    <>
      {/* ── Featured products (heroFeaturedCount mode) ───────────────────── */}
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

      {/* ── External CTA (heroFeaturedCount mode) ────────────────────────── */}
      <div className="max-w-[92%] lg:max-w-[65%] mx-auto pb-8 md:pb-10">
        <button
          type="button"
          className="flex items-center gap-2 px-6 md:px-8 py-3 md:py-3.5 cursor-pointer transition-opacity hover:opacity-80 border-none"
          style={{
            backgroundColor: "var(--t-secondary)",
            borderRadius: "var(--t-radius-button)",
          }}
          onClick={onCtaClick}
          aria-label={ctaText}
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
            {ctaText}
          </span>
          <ArrowRight
            size={16}
            strokeWidth={2}
            style={{ color: "var(--t-foreground)" }}
          />
        </button>
      </div>
    </>
  );
});
