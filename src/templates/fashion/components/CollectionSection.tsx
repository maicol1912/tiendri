"use client";

// Fashion Template — Collection Section
// Product carousel with bordered cards.
// Mobile: horizontal scroll. Desktop: grid.
// Has ref for carousel scroll, so requires "use client".

import { useRef } from "react";
import { ProductCard } from "./ProductCard";
import { gridColsClass } from "../utils/grid-classes";
import type { StorefrontProduct } from "../types";

interface CollectionSectionProps {
  title: string;
  subtitle?: string;
  products: StorefrontProduct[];
  currencySymbol?: string;
  /** Show as horizontal scroll carousel (true) or full grid (false) */
  carousel?: boolean;
  mobileColumns?: number;
  desktopColumns?: number;
  grid?: { mobile: number; desktop: number };
  layout?: {
    cardStyle?: string;
    cardHoverEffect?: string;
    cardImageRatio?: string;
  };
  onSeeAllClick?: () => void;
  onProductClick?: (id: string) => void;
}

export function CollectionSection({
  title,
  subtitle,
  products,
  currencySymbol = "$",
  carousel = true,
  mobileColumns = 2,
  desktopColumns = 4,
  grid,
  layout,
  onSeeAllClick,
  onProductClick,
}: CollectionSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // grid prop takes precedence over legacy mobileColumns/desktopColumns
  const resolvedMobile = grid?.mobile ?? mobileColumns;
  const resolvedDesktop = grid?.desktop ?? desktopColumns;

  return (
    <section className="py-8 lg:py-12" aria-labelledby={`collection-${title}`}>
      {/* Section header */}
      <div className="px-5 md:px-10 lg:px-16 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-5 lg:mb-6">
          <div>
            <h2
              id={`collection-${title}`}
              className="leading-none text-[22px] md:text-2xl lg:text-3xl text-[var(--t-text-primary)]"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              {title}
            </h2>
            {subtitle && (
              <p
                className="mt-1 text-xs md:text-sm text-[var(--t-text-muted)]"
                style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}
              >
                {subtitle}
              </p>
            )}
          </div>

          {onSeeAllClick && (
            <button
              type="button"
              className="transition-opacity hover:opacity-60 flex-shrink-0 ml-4 text-[11px] font-medium uppercase tracking-wider text-[var(--t-text-primary)] underline underline-offset-2 bg-transparent border-none cursor-pointer"
              onClick={onSeeAllClick}
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Ver todo
            </button>
          )}
        </div>
      </div>

      {/* Product display */}
      {carousel ? (
        <>
          {/* Mobile: horizontal scroll carousel */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-3 px-5 md:hidden"
            style={{ scrollbarWidth: "none" }}
            aria-label={`Colección ${title}`}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0"
                style={{ width: "169px" }}
              >
                <ProductCard
                  product={product}
                  currencySymbol={currencySymbol}
                  onProductClick={onProductClick}
                  layout={layout}
                />
              </div>
            ))}
          </div>
          {/* Desktop: grid layout */}
          <div className="hidden md:block px-5 md:px-10 lg:px-16 max-w-7xl mx-auto">
            <div className={`grid ${gridColsClass(resolvedMobile, resolvedDesktop)} gap-5 lg:gap-6`}>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currencySymbol={currencySymbol}
                  onProductClick={onProductClick}
                  layout={layout}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="px-5 md:px-10 lg:px-16 max-w-7xl mx-auto">
          <div className={`grid ${gridColsClass(resolvedMobile, resolvedDesktop)} gap-3 md:gap-5 lg:gap-6`}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currencySymbol={currencySymbol}
                onProductClick={onProductClick}
                layout={layout}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
