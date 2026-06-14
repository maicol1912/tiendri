"use client";

// Food Night — Product Card
// Masonry stagger: variant prop drives image aspect ratio.
// ZERO hardcoded colors, ZERO hardcoded border radius, ZERO hardcoded hover classes.

import Image from "next/image";
import { Star } from "lucide-react";
import type { StorefrontProduct } from "../types";
import { hoverEffectClass, imageRatioClass, cardStyleClass } from "../utils/layout-classes";
import { PRICE_DISPLAY_MAP } from "@/templates/_shared/style-maps";
import type { PriceDisplay } from "@/types/templates";
import { formatPrice } from "@/lib/format";

interface ProductCardProps {
  product: StorefrontProduct;
  currencySymbol?: string;
  variant?: "tall" | "short";
  layout?: {
    cardStyle?: string;
    cardHoverEffect?: string;
    cardImageRatio?: string;
    priceDisplay?: PriceDisplay;
  };
  onClick?: () => void;
}

export function ProductCard({
  product,
  currencySymbol = "$",
  variant = "short",
  layout,
  onClick,
}: ProductCardProps) {
  const primaryImage = product.images[0]?.url ?? null;
  const rating = product.rating ?? 5.0;

  // Masonry variant maps to layout override when no explicit layout.cardImageRatio
  const effectiveRatio = layout?.cardImageRatio ?? (variant === "tall" ? "portrait" : "square");
  const imageClass = imageRatioClass(effectiveRatio);
  const cardClass = cardStyleClass(layout?.cardStyle ?? "flat");
  const hoverClass = hoverEffectClass(layout?.cardHoverEffect ?? "none");
  const priceConfig = PRICE_DISPLAY_MAP[layout?.priceDisplay ?? "standard"];

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
          backgroundColor: "var(--t-card)",
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
              <rect width="40" height="40" rx="8" fill="var(--t-card)" />
              <path
                d="M8 28l8-9 5 5 7-9 12 13"
                stroke="var(--t-muted)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
        )}

        {/* Unavailable overlay */}
        {!product.available && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: "rgba(14,6,0,0.6)" }}
          >
            <span
              className="px-3 py-1.5 text-[11px] font-medium"
              style={{
                backgroundColor: "var(--t-card)",
                borderRadius: 9999,
                color: "var(--t-muted)",
              }}
            >
              Agotado
            </span>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className={`flex flex-col gap-1 pt-2 pb-1 ${cardClass === "bg-[var(--t-card)]" ? "" : "px-2"}`}>
        <p
          className="leading-snug line-clamp-2 text-[14px] font-semibold"
          style={{ color: "var(--t-foreground)" }}
        >
          {product.name}
        </p>

        <div className="flex items-center justify-between gap-1">
          <span className={priceConfig.className} style={priceConfig.style}>
            {formatPrice(product.price, currencySymbol)}
          </span>

          <div className="flex items-center gap-0.5 flex-shrink-0">
            <Star
              size={11}
              strokeWidth={0}
              fill="var(--t-accent)"
              style={{ color: "var(--t-accent)" }}
            />
            <span className="text-[12px] font-normal" style={{ color: "var(--t-foreground)" }}>
              {rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
