// Electronics Classic — Product Section
// Section title + "Ver todos" + product grid.
// Grid driven by config via gridColsClass (Rule 16).

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
    <section className="py-6 md:py-8" aria-labelledby={`section-${title}`}>
      {/* Section header */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2
          id={`section-${title}`}
          className="text-lg md:text-xl lg:text-2xl font-bold text-[var(--t-text-primary)]"
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
        className={`grid gap-4 md:gap-5 lg:gap-6 ${gridColsClass(grid.mobile, grid.desktop)}`}
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
