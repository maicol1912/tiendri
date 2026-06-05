// Electronics Classic — Product Section
// Section title + "Ver todos" + product grid.
// Grid driven by config via gridColsClass (Rule 16).

import React from "react";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { gridColsClass } from "../utils/grid-classes";
import type { StorefrontProduct } from "../types";

interface ProductSectionProps {
  title: string;
  products: StorefrontProduct[];
  currencySymbol?: string;
  grid?: { mobile: number; desktop: number };
  layout?: {
    cardStyle?: string;
    cardHoverEffect?: string;
    cardImageRatio?: string;
  };
  onSeeAllClick?: () => void;
  onProductClick?: (productId: string) => void;
}

export function ProductSection({
  title,
  products,
  currencySymbol = "$",
  grid = { mobile: 2, desktop: 4 },
  layout,
  onSeeAllClick,
  onProductClick,
}: ProductSectionProps) {
  return (
    <section aria-labelledby={`section-${title}`} style={{ paddingTop: "var(--t-space-section, 1.5rem)", paddingBottom: "var(--t-space-section, 1.5rem)" }}>
      {/* Section header */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2
          id={`section-${title}`}
          className="text-[var(--t-text-primary)]"
          style={{
            fontWeight: "var(--t-type-heading-weight, 700)" as React.CSSProperties["fontWeight"],
            fontSize: "var(--t-type-heading-size, 1.5rem)",
            letterSpacing: "var(--t-type-heading-tracking, 0em)",
            textTransform: "var(--t-type-heading-transform, none)" as React.CSSProperties["textTransform"],
          }}
        >
          {title}
        </h2>
        {onSeeAllClick && (
          <button
            onClick={onSeeAllClick}
            className="flex items-center gap-1 text-[var(--t-primary)] text-sm font-semibold hover:underline transition-colors"
            aria-label={`Ver todos los productos de ${title}`}
          >
            <span>Ver todos</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Product grid — config-driven */}
      <div
        className={`grid ${gridColsClass(grid.mobile, grid.desktop)}`}
        style={{ gap: "var(--t-space-gap, 1rem)" }}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            currencySymbol={currencySymbol}
            layout={layout}
            onProductClick={onProductClick}
          />
        ))}
      </div>
    </section>
  );
}
