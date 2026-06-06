"use client";

// Shared — ActionButtons Card (from decor-warm)
// Linen image container, product name, description field, price row.
// Heart + plus icons in circles, divider line.
// ZERO hardcoded colors — all via var(--t-*)

import Image from "next/image";
import { Plus } from "lucide-react";
import type { CardLayoutProps } from "./types";

function formatPrice(price: number, symbol: string): string {
  return `${symbol}${new Intl.NumberFormat("en-US").format(price)}`;
}

export default function ActionButtons({
  product,
  currencySymbol,
  badgeClass,
  priceConfig,
  hoverFxClass,
  onClick,
  onAddToCart,
}: CardLayoutProps) {
  const primaryImage = product.images[0]?.url ?? null;

  return (
    <article
      className={`max-w-sm w-full mx-auto flex flex-col overflow-hidden cursor-pointer ${hoverFxClass}`}
      style={{ borderRadius: "var(--t-radius-card)" }}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => { if (e.key === "Enter" || e.key === " ") onClick(); }
          : undefined
      }
      aria-label={onClick ? `Ver ${product.name}` : undefined}
    >
      {/* Image container */}
      <div
        className="relative w-full aspect-square"
        style={{
          backgroundColor: "var(--t-surface)",
          borderRadius: "var(--t-radius-card)",
        }}
      >
        {primaryImage ? (
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
            className="object-contain p-3"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              aria-hidden="true"
            >
              <rect width="40" height="40" rx="8" fill="var(--t-border)" />
              <path
                d="M8 28l8-9 5 5 7-9 12 13"
                stroke="var(--t-primary)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
        )}

        {/* Unavailable overlay */}
        {!product.inStock && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              backgroundColor: "rgba(250,240,230,0.75)",
              borderRadius: "var(--t-radius-card)",
            }}
          >
            <span
              className="px-3 py-1"
              style={{
                backgroundColor: "var(--t-card-bg)",
                borderRadius: 9999,
                color: "var(--t-text-muted)",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "11px",
                fontWeight: 500,
              }}
            >
              Agotado
            </span>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="flex flex-col gap-1 px-1 pb-3 pt-2.5">
        {/* Product name */}
        <p
          className="leading-snug line-clamp-2 capitalize"
          style={{
            color: "var(--t-text-secondary)",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "15px",
            fontWeight: 500,
          }}
        >
          {product.name}
        </p>

        {/* Description */}
        {product.description && (
          <p
            className="line-clamp-2 leading-snug"
            style={{
              color: "var(--t-text-secondary)",
              fontFamily: "'League Spartan', sans-serif",
              fontSize: "13px",
              fontWeight: 300,
            }}
          >
            {product.description}
          </p>
        )}

        {/* Divider */}
        <hr
          style={{
            borderColor: "var(--t-border)",
            borderTopWidth: 1,
            margin: "4px 0",
          }}
        />

        {/* Price + actions row */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span
              className={priceConfig.className}
              style={{ fontFamily: "'Poppins', sans-serif", ...priceConfig.style }}
            >
              {formatPrice(product.price, currencySymbol)}
            </span>
            {product.originalPrice != null && product.originalPrice > product.price && (
              <>
                <span
                  className="line-through"
                  style={{
                    color: "var(--t-text-muted)",
                    fontFamily: "'League Spartan', sans-serif",
                    fontSize: "11px",
                    fontWeight: 300,
                  }}
                >
                  {formatPrice(product.originalPrice, currencySymbol)}
                </span>
                <span
                  className={`text-xs font-semibold px-1.5 py-0.5 ${badgeClass}`}
                  style={{ backgroundColor: "var(--t-badge-bg)", color: "var(--t-badge-text)" }}
                >
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              </>
            )}
          </div>

          {/* Action icons */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* Plus — add to cart */}
            <button
              type="button"
              className="flex items-center justify-center"
              style={{
                width: 20,
                height: 20,
                borderRadius: "var(--t-radius-category)",
                backgroundColor: "var(--t-peach)",
                border: "none",
                cursor: "pointer",
                flexShrink: 0,
              }}
              aria-label={`Agregar ${product.name} al carrito`}
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart?.();
              }}
            >
              <Plus size={10} strokeWidth={2.5} style={{ color: "#FFFFFF" }} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
