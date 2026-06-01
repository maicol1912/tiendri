// Furniture Dark — ProductSection
// Section title + gradient "Ver todo" button + grid using gridColsClass()
// ALL colors via var(--t-*)

import { ChevronRight } from "lucide-react";
import type { StorefrontProduct } from "../types";
import { ProductCard } from "./ProductCard";
import { gridColsClass } from "../utils/grid-classes";

interface ProductSectionProps {
  title: string;
  products: StorefrontProduct[];
  onProductClick?: (productId: string) => void;
  onViewAll?: () => void;
  wishlistedIds?: Set<string>;
  onWishlistToggle?: (productId: string) => void;
  gridMobile?: number;
  gridDesktop?: number;
  cardStyle?: string;
  hoverEffect?: string;
  imageRatio?: string;
}

export function ProductSection({
  title,
  products,
  onProductClick,
  onViewAll,
  wishlistedIds,
  onWishlistToggle,
  gridMobile = 2,
  gridDesktop = 4,
  cardStyle,
  hoverEffect,
  imageRatio,
}: ProductSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className="px-5" aria-labelledby={`section-${title.toLowerCase().replace(/\s+/g, "-")}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2
          id={`section-${title.toLowerCase().replace(/\s+/g, "-")}`}
          className="text-[var(--t-text-primary)]"
          style={{
            fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
            fontSize: "20px",
            fontWeight: 600,
            letterSpacing: "-0.6px",
          }}
        >
          {title}
        </h2>

        {onViewAll && (
          <button
            type="button"
            className="flex items-center gap-1 px-3.5 py-2 rounded-[var(--t-radius-button)]"
            style={{
              background: "linear-gradient(to right, var(--t-primary), rgba(239,244,34,0.7))",
            }}
            onClick={onViewAll}
            aria-label={`Ver todos — ${title}`}
          >
            <span
              style={{
                fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--t-button-text)",
                letterSpacing: "-0.24px",
              }}
            >
              Ver todo
            </span>
            <ChevronRight size={13} strokeWidth={2.5} style={{ color: "var(--t-button-text)" }} />
          </button>
        )}
      </div>

      {/* Product grid */}
      <div className={`grid gap-3 ${gridColsClass(gridMobile, gridDesktop)}`}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isWishlisted={wishlistedIds?.has(product.id)}
            onWishlistToggle={onWishlistToggle}
            onClick={onProductClick}
            cardStyle={cardStyle}
            hoverEffect={hoverEffect}
            imageRatio={imageRatio}
          />
        ))}
      </div>
    </section>
  );
}
