"use client";

// Pets Classic — Product Card
// max-w-sm w-full mx-auto. All colors via var(--t-*).
// ZERO hardcoded hex, ZERO hardcoded grid-cols, ZERO hardcoded border-radius.

import Image from "next/image";
import type { PetsClassicProduct } from "../types";
import { cardStyleClass, hoverEffectClass, imageRatioClass } from "../utils/layout-classes";

interface ProductCardProps {
  product: PetsClassicProduct;
  currencySymbol?: string;
  onClick?: () => void;
  layout?: {
    cardStyle?: string;
    cardHoverEffect?: string;
    cardImageRatio?: string;
  };
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US").format(price);
}

export function ProductCard({ product, currencySymbol = "$", onClick, layout }: ProductCardProps) {
  const primaryImage = product.images[0]?.url ?? null;
  const hasDiscount =
    product.compare_at_price !== null && product.compare_at_price > product.price;

  const styleClass = cardStyleClass(layout?.cardStyle ?? "flat");
  const hoverClass = hoverEffectClass(layout?.cardHoverEffect ?? "none");
  const ratioClass = imageRatioClass(layout?.cardImageRatio ?? "portrait");

  return (
    <article
      className={`max-w-sm w-full mx-auto relative flex flex-col cursor-pointer ${styleClass} ${hoverClass}`}
      style={{
        borderRadius: "var(--t-radius-card)",
        border: product.featured
          ? "2px solid var(--t-primary)"
          : "1px solid var(--t-border)",
        overflow: "hidden",
        boxShadow: product.featured
          ? "0 4px 14px rgba(0,0,0,0.1)"
          : "0 2px 8px rgba(0,0,0,0.04)",
      }}
      onClick={onClick}
      aria-label={`Ver ${product.name}`}
    >
      {/* Image area */}
      <div
        className={`relative w-full ${ratioClass} overflow-hidden flex items-center justify-center`}
        style={{ backgroundColor: "var(--t-surface)" }}
      >
        {primaryImage ? (
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            className="object-contain p-3"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="var(--t-border)" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="7" cy="5" rx="2" ry="2.5" />
              <ellipse cx="12" cy="3.5" rx="2" ry="2.5" />
              <ellipse cx="17" cy="5" rx="2" ry="2.5" />
              <ellipse cx="5" cy="10" rx="2" ry="2.5" />
              <path d="M8 14c0 0 1-3 4-3s4 3 4 3 1 4-1 5.5S11 18 9 16.5 8 14 8 14z" />
            </svg>
          </div>
        )}

        {!product.available && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.75)" }}
          >
            <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--t-text-muted)" }}>
              Agotado
            </span>
          </div>
        )}

        {hasDiscount && product.compare_at_price && (
          <span
            className="absolute top-2 left-2 px-2 py-0.5"
            style={{
              borderRadius: "var(--t-radius-button)",
              backgroundColor: "var(--t-badge-bg)",
              color: "var(--t-badge-text)",
              fontSize: "10px",
              fontWeight: 700,
            }}
          >
            -{Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)}%
          </span>
        )}
      </div>

      {/* Info area */}
      <div className="flex flex-col gap-0.5 p-3">
        <p
          style={{
            fontSize: "12px",
            fontWeight: 500,
            color: "var(--t-text-primary)",
            lineHeight: 1.3,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.name}
        </p>

        <div className="flex items-center gap-2 mt-1">
          <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--t-text-primary)" }}>
            {currencySymbol}{formatPrice(product.price)}
          </span>
          {hasDiscount && product.compare_at_price && (
            <span style={{ fontSize: "11px", color: "var(--t-text-muted)", textDecoration: "line-through" }}>
              {currencySymbol}{formatPrice(product.compare_at_price)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
