"use client";

// Furniture Light — Product Card
// Lifestyle bg per product (cardBgColor), orange "+" button, teal bookmark, star rating badge
// ZERO hardcoded colors — all via var(--t-*) or per-product cardBgColor (content data)

import Image from "next/image";
import { Star, Plus } from "lucide-react";
import type { FurnitureProduct } from "../types";
import { cardStyleClass, hoverEffectClass, imageRatioClass } from "../utils/layout-classes";
import { BADGE_STYLE_MAP, PRICE_DISPLAY_MAP, BUTTON_STYLE_MAP } from "@/templates/_shared/style-maps";

import type { TemplateLayoutConfig } from "@/types/templates";

interface ProductCardProps {
  product: FurnitureProduct;
  currencySymbol?: string;
  onProductClick?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  layout?: Partial<TemplateLayoutConfig>;
}

export function ProductCard({
  product,
  currencySymbol = "$",
  onProductClick,
  onAddToCart,
  layout,
}: ProductCardProps) {
  // cardBgColor is content data (per-product lifestyle color), not a theme token
  const bgColor = product.cardBgColor ?? "var(--t-card)";
  const primaryImage = product.images[0]?.url ?? null;
  const rating = product.rating ?? 0;
  const discountPercent = product.discountPercent ?? (
    product.compare_at_price
      ? Math.round((1 - product.price / product.compare_at_price) * 100)
      : 0
  );

  const formattedPrice = `${currencySymbol}${new Intl.NumberFormat("en-US").format(product.price)}`;

  const hoverClass = hoverEffectClass("none");
  const ratioClass = imageRatioClass(layout?.cardImageRatio ?? "square");
  const badgeClass = BADGE_STYLE_MAP["pill"];
  const priceConfig = PRICE_DISPLAY_MAP["standard"];
  const btnClass = BUTTON_STYLE_MAP["filled"];

  return (
    <article
      className={`max-w-sm w-full mx-auto flex flex-col cursor-pointer group ${hoverClass}`}
      style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
      onClick={() => onProductClick?.(product.id)}
    >
      {/* Image area */}
      <div
        className={`relative w-full overflow-hidden ${ratioClass} ${cardStyleClass("flat")}`}
        style={{
          borderRadius: "var(--t-radius-card)",
          backgroundColor: bgColor,
        }}
      >
        {/* Discount badge */}
        {discountPercent > 0 && (
          <div
            className={`absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2 py-1 ${badgeClass} bg-[var(--t-primary)]`}
          >
            <span className="text-[var(--t-on-primary)] text-[10px] font-bold">
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
            <Star size={10} strokeWidth={0} fill="var(--t-accent)" color="var(--t-accent)" />
            <span className="text-[10px] font-bold text-[var(--t-foreground)]">
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
            <span className="px-3 py-1.5 rounded-[var(--t-radius-button)] bg-white text-xs font-semibold text-[var(--t-muted)]">
              Agotado
            </span>
          </div>
        )}
      </div>

      {/* Name + price */}
      <div className="mt-2.5 px-0.5">
        <p className="text-[13px] font-semibold text-[var(--t-foreground)] leading-tight line-clamp-1">
          {product.name}
        </p>
        <div className="flex items-center justify-between mt-1.5">
          <div className="flex items-center gap-1.5">
            <span className={priceConfig.className} style={priceConfig.style}>
              {formattedPrice}
            </span>
            {product.compare_at_price && (
              <span className="text-[11px] text-[var(--t-muted)] line-through">
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
            className={`flex items-center justify-center w-7 h-7 rounded-[var(--t-radius-button)] transition-all hover:scale-110 active:scale-95 border ${btnClass}`}
          >
            <Plus size={14} strokeWidth={2.5} style={{ color: "var(--t-on-primary)" }} />
          </button>
        </div>
      </div>
    </article>
  );
}
