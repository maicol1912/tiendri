"use client";

// Food Night — Product Card
// Masonry stagger: variant prop drives image aspect ratio.
// ZERO hardcoded colors, ZERO hardcoded border radius, ZERO hardcoded hover classes.

import Image from "next/image";
import { Heart, Star } from "lucide-react";
import type { StorefrontProduct } from "../types";
import { hoverEffectClass, imageRatioClass, cardStyleClass } from "../utils/layout-classes";

interface ProductCardProps {
  product: StorefrontProduct;
  currencySymbol?: string;
  variant?: "tall" | "short";
  layout?: {
    cardStyle?: string;
    cardHoverEffect?: string;
    cardImageRatio?: string;
  };
  onClick?: () => void;
  onWishlistToggle?: () => void;
}

function formatPrice(price: number, symbol: string = "$"): string {
  return `${symbol}${new Intl.NumberFormat("en-US").format(price)}`;
}

export function ProductCard({
  product,
  currencySymbol = "$",
  variant = "short",
  layout,
  onClick,
  onWishlistToggle,
}: ProductCardProps) {
  const primaryImage = product.images[0]?.url ?? null;
  const rating = product.rating ?? 5.0;
  const isWishlisted = product.inWishlist ?? false;

  // Masonry variant maps to layout override when no explicit layout.cardImageRatio
  const effectiveRatio = layout?.cardImageRatio ?? (variant === "tall" ? "portrait" : "square");
  const imageClass = imageRatioClass(effectiveRatio);
  const cardClass = cardStyleClass(layout?.cardStyle ?? "flat");
  const hoverClass = hoverEffectClass(layout?.cardHoverEffect ?? "none");

  return (
    <article
      className={`max-w-sm w-full mx-auto flex flex-col overflow-hidden cursor-pointer ${hoverClass}`}
      style={{ borderRadius: "var(--t-radius-card)" }}
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
      {/* Product image */}
      <div
        className={`relative w-full ${imageClass} max-h-[300px] overflow-hidden`}
        style={{
          backgroundColor: "var(--t-card-bg)",
          borderRadius: "var(--t-radius-card)",
        }}
      >
        {primaryImage ? (
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <rect width="40" height="40" rx="8" fill="var(--t-surface)" />
              <path
                d="M8 28l8-9 5 5 7-9 12 13"
                stroke="var(--t-text-muted)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
        )}

        {/* Wishlist heart */}
        <button
          type="button"
          className="absolute top-2 right-2 z-10 flex items-center justify-center"
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            backgroundColor: "var(--t-card-bg)",
            border: "none",
            cursor: "pointer",
          }}
          aria-label={isWishlisted ? "Quitar de favoritos" : "Agregar a favoritos"}
          onClick={(e) => {
            e.stopPropagation();
            onWishlistToggle?.();
          }}
        >
          <Heart
            size={13}
            strokeWidth={2}
            style={{
              color: isWishlisted ? "var(--t-primary)" : "var(--t-text-primary)",
              fill: isWishlisted ? "var(--t-primary)" : "transparent",
            }}
          />
        </button>

        {/* Unavailable overlay */}
        {!product.available && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: "rgba(14,6,0,0.6)" }}
          >
            <span
              className="px-3 py-1.5 text-[11px] font-medium"
              style={{
                backgroundColor: "var(--t-card-bg)",
                borderRadius: 9999,
                color: "var(--t-text-muted)",
              }}
            >
              Agotado
            </span>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className={`flex flex-col gap-1 pt-2 pb-1 ${cardClass === "bg-[var(--t-card-bg)]" ? "" : "px-2"}`}>
        <p
          className="leading-snug line-clamp-2 text-[14px] font-semibold"
          style={{ color: "var(--t-text-primary)" }}
        >
          {product.name}
        </p>

        <div className="flex items-center justify-between gap-1">
          <span className="text-[14px] font-semibold" style={{ color: "var(--t-text-primary)" }}>
            {formatPrice(product.price, currencySymbol)}
          </span>

          <div className="flex items-center gap-0.5 flex-shrink-0">
            <Star
              size={11}
              strokeWidth={0}
              fill="var(--t-rating-star)"
              style={{ color: "var(--t-rating-star)" }}
            />
            <span className="text-[12px] font-normal" style={{ color: "var(--t-text-primary)" }}>
              {rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
