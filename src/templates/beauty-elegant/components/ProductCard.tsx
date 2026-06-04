"use client";

// Beauty Elegant Template — Product Card
// Portrait image with rounded corners, discount badge (glassmorphic dark pill),
// product name, price in muted. Zero hardcoded colors.

import Image from "next/image";
import type { BeautyElegantProduct } from "../types";
import { imageRatioClass, hoverEffectClass, cardStyleClass } from "../utils/layout-classes";

interface ProductCardProps {
  product: BeautyElegantProduct;
  currencySymbol?: string;
  layout?: {
    cardStyle?: string;
    cardHoverEffect?: string;
    cardImageRatio?: string;
  };
  onClick?: () => void;
}

function formatPrice(price: number, symbol: string = "$"): string {
  return `${symbol}${new Intl.NumberFormat("en-US").format(price)}`;
}

export function ProductCard({
  product,
  currencySymbol = "$",
  layout,
  onClick,
}: ProductCardProps) {
  const primaryImage = product.images[0]?.url ?? null;
  const hasDiscount =
    product.originalPrice !== null &&
    product.originalPrice !== undefined &&
    product.originalPrice > product.price;

  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.originalPrice!) * 100)
    : 0;

  const cardStyle = cardStyleClass(layout?.cardStyle ?? "flat");
  const hoverEffect = hoverEffectClass(layout?.cardHoverEffect ?? "none");
  const imageRatio = imageRatioClass(layout?.cardImageRatio ?? "portrait");

  return (
    <article
      className={`max-w-sm w-full mx-auto flex flex-col gap-2 cursor-pointer group ${hoverEffect}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") onClick();
            }
          : undefined
      }
      aria-label={onClick ? `Ver ${product.name}` : undefined}
    >
      {/* Product image container */}
      <div
        className={`relative w-full overflow-hidden ${imageRatio} ${cardStyle}`}
        style={{ borderRadius: "var(--t-radius-card)" }}
      >
        {primaryImage ? (
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
            loading="lazy"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: "var(--t-surface)" }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <rect width="40" height="40" rx="8" fill="var(--t-border)" />
              <path
                d="M8 28l8-8 5 5 7-9 12 12"
                stroke="var(--t-text-muted)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <circle cx="14" cy="16" r="3" fill="var(--t-text-muted)" />
            </svg>
          </div>
        )}

        {/* Discount badge — glassmorphic dark pill */}
        {hasDiscount && (
          <span
            className="absolute top-2 right-2 flex items-center justify-center px-2.5 py-1 text-[11px] font-medium"
            style={{
              backgroundColor: "var(--t-discount-bg)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              borderRadius: "9999px",
              color: "var(--t-discount-text)",
            }}
          >
            {product.discountLabel ?? `${discountPercent}% Off`}
          </span>
        )}

        {/* Unavailable overlay */}
        {!product.inStock && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.7)", borderRadius: "var(--t-radius-card)" }}
          >
            <span
              className="text-xs font-medium px-3 py-1 rounded-[var(--t-radius-button)]"
              style={{
                backgroundColor: "var(--t-surface)",
                color: "var(--t-text-muted)",
              }}
            >
              Agotado
            </span>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="flex flex-col gap-0.5 px-0.5">
        <p
          className="line-clamp-1 text-sm font-bold"
          style={{ color: "var(--t-text-primary)", lineHeight: "20px", margin: 0 }}
        >
          {product.name}
        </p>
        <span
          className="text-[13px] font-medium"
          style={{ color: "var(--t-text-muted)", lineHeight: "18px" }}
        >
          {formatPrice(product.price, currencySymbol)}
        </span>
      </div>
    </article>
  );
}
