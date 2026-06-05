"use client";

// Furniture Light — Product Card
// Lifestyle bg per product (cardBgColor), orange "+" button, teal bookmark, star rating badge
// ZERO hardcoded colors — all via var(--t-*) or per-product cardBgColor (content data)

import Image from "next/image";
import { Bookmark, Star, Plus } from "lucide-react";
import type { FurnitureProduct } from "../types";
import { cardStyleClass, hoverEffectClass, imageRatioClass } from "../utils/layout-classes";

interface ProductCardProps {
  product: FurnitureProduct;
  currencySymbol?: string;
  onProductClick?: (id: string) => void;
  onWishlistToggle?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  layout?: {
    cardStyle?: string;
    cardHoverEffect?: string;
    cardImageRatio?: string;
  };
}

export function ProductCard({
  product,
  currencySymbol = "$",
  onProductClick,
  onWishlistToggle,
  onAddToCart,
  layout,
}: ProductCardProps) {
  // cardBgColor is content data (per-product lifestyle color), not a theme token
  const bgColor = product.cardBgColor ?? "var(--t-card-bg)";
  const primaryImage = product.images[0]?.url ?? null;
  const rating = product.rating ?? 0;
  const discountPercent = product.discountPercent ?? (
    product.compare_at_price
      ? Math.round((1 - product.price / product.compare_at_price) * 100)
      : 0
  );

  const formattedPrice = `${currencySymbol}${new Intl.NumberFormat("en-US").format(product.price)}`;

  const hoverClass = hoverEffectClass(layout?.cardHoverEffect ?? "none");
  const ratioClass = imageRatioClass(layout?.cardImageRatio ?? "square");

  return (
    <article
      className={`max-w-sm w-full mx-auto flex flex-col cursor-pointer group ${hoverClass}`}
      style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
      onClick={() => onProductClick?.(product.id)}
    >
      {/* Image area */}
      <div
        className={`relative w-full overflow-hidden ${ratioClass} ${cardStyleClass(layout?.cardStyle ?? "flat")}`}
        style={{
          borderRadius: "var(--t-radius-card)",
          backgroundColor: bgColor,
        }}
      >
        {/* Discount badge */}
        {discountPercent > 0 && (
          <div
            className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--t-badge-bg)]"
          >
            <span className="text-[var(--t-badge-text)] text-[10px] font-bold">
              {discountPercent}%
            </span>
          </div>
        )}

        {/* Bookmark button */}
        <button
          aria-label={product.inWishlist ? "Quitar de favoritos" : "Agregar a favoritos"}
          onClick={(e) => {
            e.stopPropagation();
            onWishlistToggle?.(product.id);
          }}
          className="absolute top-2.5 right-2.5 z-10 flex items-center justify-center w-8 h-8 rounded-[var(--t-radius-button)] transition-transform hover:scale-110"
          style={{ backgroundColor: product.inWishlist ? "var(--t-bookmark-bg)" : "rgba(38, 166, 154, 0.85)" }}
        >
          <Bookmark size={14} strokeWidth={2} style={{ fill: "white", color: "white" }} />
        </button>

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
        {!product.available && (
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
            <span className="text-[15px] font-bold text-[var(--t-text-primary)]">
              {formattedPrice}
            </span>
            {product.compare_at_price && (
              <span className="text-[11px] text-[var(--t-text-muted)] line-through">
                {currencySymbol}{new Intl.NumberFormat("en-US").format(product.compare_at_price)}
              </span>
            )}
          </div>

          {/* Add to cart button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(product.id);
            }}
            aria-label={`Agregar ${product.name} al carrito`}
            className="flex items-center justify-center w-7 h-7 rounded-[var(--t-radius-button)] transition-all hover:scale-110 active:scale-95 bg-[var(--t-primary)]"
          >
            <Plus size={14} strokeWidth={2.5} style={{ color: "var(--t-button-text)" }} />
          </button>
        </div>
      </div>
    </article>
  );
}
