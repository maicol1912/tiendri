// Electronics Classic — Product Card
// White bg, product image, star rating, name, price.
// All colors via var(--t-*). Grid driven by config.
// Satisfies Rule 14 (radius), Rule 15 (layout props), Rule 21 (3-line layout).

import Image from "next/image";
import { Star } from "lucide-react";
import type { StorefrontProduct } from "../types";
import { cardStyleClass, hoverEffectClass, imageRatioClass } from "../utils/layout-classes";

interface ProductCardProps {
  product: StorefrontProduct;
  currencySymbol?: string;
  layout?: {
    cardStyle?: string;
    cardHoverEffect?: string;
    cardImageRatio?: string;
  };
  onProductClick?: (productId: string) => void;
}

export function ProductCard({
  product,
  currencySymbol = "$",
  layout,
  onProductClick,
}: ProductCardProps) {
  const mainImage = product.images[0]?.url ?? "/placeholder.svg";
  const hasDiscount =
    product.compare_at_price !== null &&
    product.compare_at_price > product.price;

  const formattedPrice = new Intl.NumberFormat("en-US").format(product.price);
  const formattedCompare = product.compare_at_price
    ? new Intl.NumberFormat("en-US").format(product.compare_at_price)
    : null;

  const cardClass = cardStyleClass(layout?.cardStyle ?? "flat");
  const hoverClass = hoverEffectClass(layout?.cardHoverEffect ?? "scale");
  const ratioClass = imageRatioClass(layout?.cardImageRatio ?? "square");

  return (
    <article
      className={`group overflow-hidden cursor-pointer max-w-sm w-full mx-auto rounded-[var(--t-radius-card)] ${cardClass} ${hoverClass}`}
      onClick={() => onProductClick?.(product.id)}
      aria-label={product.name}
    >
      {/* Product image */}
      <div
        className={`relative w-full overflow-hidden ${ratioClass}`}
        style={{ backgroundColor: "var(--t-surface)" }}
      >
        <Image
          src={mainImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {hasDiscount && (
          <div
            className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-[var(--t-radius-button)] text-[10px] font-bold"
            style={{
              backgroundColor: "var(--t-badge-bg)",
              color: "var(--t-badge-text)",
            }}
          >
            Oferta
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="p-3 space-y-1.5">
        {/* Star rating — Line 1 */}
        {product.rating !== undefined && (
          <div className="flex items-center gap-0.5" aria-label={`Calificación: ${product.rating} de 5`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.round(product.rating ?? 0)
                    ? "fill-[var(--t-rating-star)] text-[var(--t-rating-star)]"
                    : "fill-[var(--t-rating-bar-bg)] text-[var(--t-rating-bar-bg)]"
                }`}
                aria-hidden="true"
              />
            ))}
            {product.reviewCount !== undefined && (
              <span className="text-[var(--t-text-muted)] text-[10px] ml-1">
                ({product.reviewCount})
              </span>
            )}
          </div>
        )}

        {/* Product name — Line 2 */}
        <h3 className="text-xs md:text-sm font-normal text-[var(--t-text-primary)] leading-snug line-clamp-3">
          {product.name}
        </h3>

        {/* Price — Line 3 */}
        <div className="flex items-center gap-2">
          <span className="text-sm md:text-base font-semibold text-[var(--t-text-primary)]">
            {currencySymbol}{formattedPrice}
          </span>
          {hasDiscount && formattedCompare && (
            <span className="text-xs text-[var(--t-text-muted)] line-through">
              {currencySymbol}{formattedCompare}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
