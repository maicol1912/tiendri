"use client";

// Shared — GlassmorphicDiscount Card (from beauty-elegant)
// Portrait image with rounded corners, glassmorphic discount badge (dark pill with blur).
// ZERO hardcoded colors — all via var(--t-*)

import Image from "next/image";
import type { CardLayoutProps } from "./types";

function formatPrice(price: number, symbol: string): string {
  return `${symbol}${new Intl.NumberFormat("en-US").format(price)}`;
}

export default function GlassmorphicDiscount({
  product,
  currencySymbol,
  badgeClass,
  priceConfig,
  hoverFxClass,
  onClick,
}: CardLayoutProps) {
  const primaryImage = product.images[0]?.url ?? null;
  const hasDiscount =
    product.originalPrice != null && product.originalPrice > product.price;

  const discountPercent = hasDiscount && product.originalPrice != null
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <article
      className={`max-w-sm w-full mx-auto flex flex-col gap-2 cursor-pointer group ${hoverFxClass}`}
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
        className="relative w-full overflow-hidden aspect-[3/4]"
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

        {/* Discount badge — glassmorphic */}
        {hasDiscount && (
          <span
            className={`absolute top-2 right-2 flex items-center justify-center px-2.5 py-1 text-[11px] font-medium ${badgeClass}`}
            style={{
              backgroundColor: "var(--t-discount-bg)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              color: "var(--t-discount-text)",
            }}
          >
            {discountPercent}% Off
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
          className={priceConfig.className}
          style={{ lineHeight: "18px", ...priceConfig.style }}
        >
          {formatPrice(product.price, currencySymbol)}
        </span>
      </div>
    </article>
  );
}
