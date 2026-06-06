"use client";

// Shared — LifestyleBackground Card (from furniture-light)
// Per-product colored background, orange "+" button, rating badge.
// ZERO hardcoded colors — all via var(--t-*) or CSS variables.

import Image from "next/image";
import { Star, Plus } from "lucide-react";
import type { CardLayoutProps } from "./types";

function formatPrice(price: number, symbol: string): string {
  return `${symbol}${new Intl.NumberFormat("en-US").format(price)}`;
}

export default function LifestyleBackground({
  product,
  currencySymbol,
  layout,
  badgeClass,
  priceConfig,
  buttonClass,
  onClick,
  onAddToCart,
}: CardLayoutProps) {
  const primaryImage = product.images[0]?.url ?? null;
  const rating = product.rating ?? 0;
  const discountPercent =
    product.originalPrice != null && product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : 0;

  return (
    <article
      className="max-w-sm w-full mx-auto flex flex-col cursor-pointer group"
      style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
      onClick={onClick}
    >
      {/* Image area */}
      <div
        className="relative w-full overflow-hidden aspect-square"
        style={{
          borderRadius: "var(--t-radius-card)",
          backgroundColor: "var(--t-card-bg)",
        }}
      >
        {/* Discount badge */}
        {discountPercent > 0 && (
          <div
            className={`absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2 py-1 ${badgeClass} bg-[var(--t-badge-bg)]`}
          >
            <span className="text-[var(--t-badge-text)] text-[10px] font-bold">
              {discountPercent}%
            </span>
          </div>
        )}

        {/* Star rating badge */}
        {rating > 0 && (
          <div
            className="absolute bottom-2.5 left-2.5 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm"
            style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}
          >
            <Star size={10} strokeWidth={0} fill="var(--t-rating-star)" color="var(--t-rating-star)" />
            <span className="text-[10px] font-bold text-[var(--t-text-primary)]">
              {rating.toFixed(1)}
            </span>
          </div>
        )}

        {/* Product image */}
        {primaryImage ? (
          <div className="absolute inset-0 flex items-center justify-center p-5">
            <div className="relative w-full h-full">
              <Image
                src={primaryImage}
                alt={product.name}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-[var(--t-radius-card)] bg-white/40" />
          </div>
        )}

        {/* Unavailable overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <span className="px-3 py-1.5 rounded-[var(--t-radius-button)] bg-white text-xs font-semibold text-[var(--t-text-muted)]">
              Agotado
            </span>
          </div>
        )}
      </div>

      {/* Name + price */}
      <div className="mt-2.5 px-0.5">
        <p className="text-[13px] font-semibold text-[var(--t-text-primary)] leading-tight line-clamp-1">
          {product.name}
        </p>
        <div className="flex items-center justify-between mt-1.5">
          <div className="flex items-center gap-1.5">
            <span className={priceConfig.className} style={priceConfig.style}>
              {formatPrice(product.price, currencySymbol)}
            </span>
            {product.originalPrice != null && product.originalPrice > product.price && (
              <span className="text-[11px] text-[var(--t-text-muted)] line-through">
                {formatPrice(product.originalPrice, currencySymbol)}
              </span>
            )}
          </div>

          {/* Add to cart button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.();
            }}
            aria-label={`Agregar ${product.name} al carrito`}
            className={`flex items-center justify-center w-7 h-7 rounded-[var(--t-radius-button)] transition-all hover:scale-110 active:scale-95 border ${buttonClass}`}
          >
            <Plus size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </article>
  );
}
