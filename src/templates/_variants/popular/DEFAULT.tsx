"use client";
import React, { memo } from "react";
import Image from "next/image";
import { formatPrice } from "@/shared/format";
import { getSectionField } from "@/templates/_core/sections/get-section-field";
import type { PopularSlotProps } from "./types";

const cardBgTokens = [
  "var(--t-popular-bg0)",
  "var(--t-popular-bg1)",
  "var(--t-popular-bg2)",
  "var(--t-popular-bg3)",
] as const;

const PopularDefault = memo(function PopularDefault({
  products,
  featuredProducts,
  sectionConfig,
  currencySymbol,
  onProductClick,
}: PopularSlotProps) {
  const title = getSectionField<string | undefined>("title", sectionConfig, undefined, undefined);
  const subtitle = getSectionField<string | undefined>("subtitle", sectionConfig, undefined, undefined);
  const limit = getSectionField<number>("popularLimit", sectionConfig, undefined, 4);

  const source = featuredProducts && featuredProducts.length > 0 ? featuredProducts : products;
  const popularProducts = source.slice(0, limit);
  if (!featuredProducts || featuredProducts.length === 0) return null;

  return (
    <section aria-labelledby="popular-section-heading" style={{ marginTop: "var(--t-space-section, 2.5rem)" }}>
      {title && (
        <div className="px-4 lg:px-[160px] py-6">
          <h2
            id="popular-section-heading"
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
            <p className="mt-1 text-sm" style={{ color: "var(--t-muted)" }}>
              {subtitle}
            </p>
          )}
        </div>
      )}
      {!title && <h2 id="popular-section-heading" className="sr-only">Productos populares</h2>}

      {/* Desktop: horizontal cards row */}
      <div className="hidden lg:flex w-full justify-start">
        {popularProducts.map((product, i) => {
          const safeIndex = i % cardBgTokens.length;
          const cardBg = cardBgTokens[safeIndex];
          const imageSrc = product.images?.[0]?.url ?? "";

          return (
            <article
              key={product.id}
              className="relative flex flex-col items-start gap-6 overflow-hidden px-8 pt-[376px] pb-14 min-w-0 flex-1 max-w-[360px] border-r last:border-r-0"
              style={{
                backgroundColor: cardBg,
                borderColor: "var(--t-border)",
              }}
            >
              <div className="absolute top-0 left-0 w-full h-[360px]">
                <Image
                  src={imageSrc}
                  alt={product.name}
                  fill
                  className="object-contain object-bottom"
                  sizes="(max-width: 1024px) 100vw, 360px"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-col flex-grow gap-4 items-start relative z-10 w-full">
                <h3
                  className="text-[33px] font-light leading-[48px]"
                  style={{ color: "var(--t-foreground)" }}
                >
                  {product.name}
                </h3>
                {product.description && (
                  <p
                    className="text-sm font-medium leading-6 max-w-full opacity-75"
                    style={{ color: "var(--t-foreground)" }}
                  >
                    {product.description}
                  </p>
                )}
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-base font-semibold"
                    style={{ color: "var(--t-foreground)" }}
                  >
                    {formatPrice(product.price, currencySymbol)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span
                      className="text-sm line-through opacity-50"
                      style={{ color: "var(--t-foreground)" }}
                    >
                      {formatPrice(product.originalPrice, currencySymbol)}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  className="mt-auto rounded-md px-14 py-4 text-base font-medium bg-transparent cursor-pointer hover:opacity-70 transition-opacity"
                  style={{
                    color: "var(--t-foreground)",
                    borderColor: "var(--t-foreground)",
                    borderWidth: "1px",
                    borderStyle: "solid",
                  }}
                  onClick={() => onProductClick(product.slug)}
                  aria-label={`Ver ${product.name}`}
                >
                  Ver producto
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Mobile: horizontal snap carousel with dots */}
      <div className="lg:hidden">
        <div
          className="flex overflow-x-auto snap-x snap-mandatory"
          style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
        >
          {popularProducts.map((product, i) => {
            const safeIndex = i % cardBgTokens.length;
            const cardBg = cardBgTokens[safeIndex];
            const imageSrc = product.images?.[0]?.url ?? "";

            return (
              <div key={product.id} className="snap-center shrink-0 w-full">
                <article
                  className="relative flex flex-col items-start gap-6 overflow-hidden px-8 pt-[320px] pb-12"
                  style={{ backgroundColor: cardBg }}
                >
                  <div className="absolute top-0 left-0 w-full h-[280px]">
                    <Image
                      src={imageSrc}
                      alt={product.name}
                      fill
                      className="object-contain object-bottom"
                      sizes="100vw"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex flex-col gap-4 items-start relative z-10 w-full">
                    <h3
                      className="text-[28px] font-light leading-[40px]"
                      style={{ color: "var(--t-foreground)" }}
                    >
                      {product.name}
                    </h3>
                    {product.description && (
                      <p
                        className="text-sm font-medium leading-6 opacity-75"
                        style={{ color: "var(--t-foreground)" }}
                      >
                        {product.description}
                      </p>
                    )}
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-semibold" style={{ color: "var(--t-foreground)" }}>
                        {formatPrice(product.price, currencySymbol)}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-sm line-through opacity-50" style={{ color: "var(--t-foreground)" }}>
                          {formatPrice(product.originalPrice, currencySymbol)}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      className="rounded-md px-10 py-3 text-sm font-medium bg-transparent cursor-pointer hover:opacity-70 transition-opacity"
                      style={{
                        color: "var(--t-foreground)",
                        borderColor: "var(--t-foreground)",
                        borderWidth: "1px",
                        borderStyle: "solid",
                      }}
                      onClick={() => onProductClick(product.slug)}
                      aria-label={`Ver ${product.name}`}
                    >
                      Ver producto
                    </button>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center gap-2 py-4">
          {popularProducts.map((_, i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: i === 0 ? "var(--t-primary)" : "color-mix(in srgb, var(--t-primary) 20%, transparent)" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

export default PopularDefault;
