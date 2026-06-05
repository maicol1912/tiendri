// Furniture Dark — ProductCard
// WHITE card bg (var(--t-card-bg) = #F5F5F4) for the IMAGE section only.
// Rating, name, and price sit BELOW the card on the dark page background.
// Wishlist heart + yellow discount badge inside the image card.
// MUST have max-w-sm w-full mx-auto per template rules
// ALL colors via var(--t-*)

import Image from "next/image";
import type { StorefrontProduct } from "../types";

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

interface ProductCardProps {
  product: StorefrontProduct;
  onClick?: (productId: string) => void;
  cardStyle?: string;
  hoverEffect?: string;
  imageRatio?: string;
}

export function ProductCard({
  product,
  onClick,
}: ProductCardProps) {
  const discountPct =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : null;

  const mainImage = product.images?.[0]?.url ?? product.image ?? "";

  return (
    <article
      className="max-w-sm w-full mx-auto flex flex-col cursor-pointer"
      onClick={() => onClick?.(product.id)}
      role="button"
      tabIndex={0}
      aria-label={product.name}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick?.(product.id); }}
    >
      {/* ── Image card — white/light background, rounded */}
      <div
        className="relative aspect-square w-full overflow-hidden rounded-[var(--t-radius-card)]"
        style={{ backgroundColor: "var(--t-card-bg)" }}
      >
        {mainImage ? (
          <Image
            src={mainImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-contain p-2"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: "var(--t-card-bg)" }}
          >
            <span className="text-[var(--t-text-muted)] text-sm">Sin imagen</span>
          </div>
        )}

        {/* Discount badge */}
        {discountPct !== null && (
          <div
            className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold leading-tight"
            style={{
              backgroundColor: "var(--t-badge-bg)",
              color: "var(--t-badge-text)",
              fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
            }}
          >
            -{discountPct}%
          </div>
        )}
      </div>

      {/* ── Text below card — on dark page background, no card bg */}
      <div className="mt-3 space-y-1">
        {/* Name */}
        <p
          className="line-clamp-2 leading-tight"
          style={{
            fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
            fontSize: "13px",
            fontWeight: 500,
            color: "var(--t-text-primary)",
            letterSpacing: "-0.26px",
          }}
        >
          {product.name}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span
            style={{
              fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
              fontSize: "14px",
              fontWeight: 700,
              color: "var(--t-text-primary)",
            }}
          >
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span
              className="line-through"
              style={{
                fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                fontSize: "11px",
                color: "var(--t-text-muted)",
              }}
            >
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
