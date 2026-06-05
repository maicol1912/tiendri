// Beauty Soft Template — Product Card
// Rounded card with white image container, name, price.
// ZERO hardcoded colors — all via var(--t-*). Layout props via config.
// max-w-sm w-full mx-auto as required.

import Image from "next/image";
import type { BeautySoftProduct } from "../types";
import {
  cardStyleClass,
  hoverEffectClass,
  imageRatioClass,
} from "../utils/layout-classes";
import { PRICE_DISPLAY_MAP } from "@/templates/_shared/style-maps";
import type { TemplateLayoutConfig } from "@/types/templates";

interface ProductCardProps {
  product: BeautySoftProduct;
  currencySymbol?: string;
  layout?: Partial<TemplateLayoutConfig>;
  onClick?: () => void;
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

  const cardBg = cardStyleClass(layout?.cardStyle ?? "flat");
  const hoverFx = hoverEffectClass(layout?.cardHoverEffect ?? "none");
  const imgRatio = imageRatioClass(layout?.cardImageRatio ?? "square");
  const priceConfig = PRICE_DISPLAY_MAP[layout?.priceDisplay ?? "standard"];

  const formattedPrice = `${currencySymbol}${new Intl.NumberFormat("en-US").format(product.price)}`;
  const formattedOriginalPrice =
    hasDiscount && product.originalPrice
      ? `${currencySymbol}${new Intl.NumberFormat("en-US").format(product.originalPrice)}`
      : null;

  return (
    <article
      className={`${cardBg} ${hoverFx} flex flex-col gap-[8px] cursor-pointer max-w-sm w-full mx-auto rounded-[var(--t-radius-card)]`}
      style={{ padding: "8px" }}
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
        className={`relative w-full overflow-hidden rounded-[var(--t-radius-card)] ${imgRatio}`}
        style={{ backgroundColor: "var(--t-section-bg)" }}
      >
        {primaryImage ? (
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 280px, 50vw"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <rect width="40" height="40" rx="8" fill="var(--t-card-bg)" />
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

        {/* Unavailable overlay */}
        {!product.inStock && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
          >
            <span
              className="text-xs font-medium px-3 py-1 rounded-[var(--t-radius-button)]"
              style={{
                backgroundColor: "var(--t-card-bg)",
                color: "var(--t-text-secondary)",
                fontFamily: "var(--font-sans)",
              }}
            >
              Agotado
            </span>
          </div>
        )}
      </div>

      {/* Product info */}
      <div
        className="flex flex-col pl-[5px]"
        style={{ lineHeight: "22px", letterSpacing: "-0.408px" }}
      >
        <p
          className="line-clamp-1 m-0 text-sm font-semibold text-[var(--t-text-primary)]"
          style={{ fontFamily: "var(--font-sans)", fontSize: "14px", lineHeight: "22px" }}
        >
          {product.name}
        </p>

        <div className="flex items-baseline gap-[6px]">
          {formattedOriginalPrice && (
            <span
              className="line-through text-xs font-medium text-[var(--t-primary)]"
              style={{ fontFamily: "var(--font-sans)", lineHeight: "22px" }}
            >
              {formattedOriginalPrice}
            </span>
          )}
          <span
            className={priceConfig.className}
            style={{ fontFamily: "var(--font-sans)", lineHeight: "22px", ...priceConfig.style }}
          >
            {formattedPrice}
          </span>
        </div>
      </div>
    </article>
  );
}
