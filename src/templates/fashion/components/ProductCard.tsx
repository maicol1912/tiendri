// Fashion Template — Product Card
// Bordered container, sharp edges, no shadows.
// Name (muted) + subtitle (bold) + formatted price.
// Visual only — handlers come as props.

import Image from "next/image";
import type { StorefrontProduct } from "../types";
import {
  cardStyleClass,
  hoverEffectClass,
  imageRatioClass,
} from "../utils/layout-classes";
import { PRICE_DISPLAY_MAP } from "@/templates/_shared/style-maps";

interface ProductCardProps {
  product: StorefrontProduct;
  currencySymbol?: string;
  onProductClick?: (id: string) => void;
  layout?: {
    cardStyle?: string;
    cardHoverEffect?: string;
    cardImageRatio?: string;
    priceDisplay?: string;
  };
}

export function ProductCard({
  product,
  currencySymbol = "$",
  onProductClick,
  layout,
}: ProductCardProps) {
  const cardBg = cardStyleClass(layout?.cardStyle ?? "flat");
  const hoverFx = hoverEffectClass(layout?.cardHoverEffect ?? "scale");
  const imgRatio = imageRatioClass(layout?.cardImageRatio ?? "portrait");
  const priceConfig = PRICE_DISPLAY_MAP[(layout?.priceDisplay as keyof typeof PRICE_DISPLAY_MAP) ?? "standard"];

  return (
    <article
      className={`${cardBg} ${hoverFx} rounded-[var(--t-radius-card)] cursor-pointer group transition-all duration-200`}
      onClick={() => onProductClick?.(product.id)}
    >
      {/* Product image — bordered, portrait aspect ratio */}
      <div
        className={`relative overflow-hidden border border-[var(--t-border)] rounded-[var(--t-radius-card)] max-h-[400px] ${imgRatio}`}
      >
        {product.images[0] ? (
          <Image
            src={product.images[0].url}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-700 ease-out ${layout?.cardHoverEffect === "none" ? "" : "group-hover:scale-105"}`}
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-[var(--t-background)] flex items-center justify-center">
            <span
              className="text-[var(--t-text-muted)] text-xs uppercase tracking-wider"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              SIN IMAGEN
            </span>
          </div>
        )}

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-[var(--t-card-bg)]/70 flex items-center justify-center">
            <span
              className="text-[var(--t-text-secondary)] text-xs uppercase tracking-widest"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              AGOTADO
            </span>
          </div>
        )}
      </div>

      {/* Product info — 3-line layout: muted category/name, bold subtitle, price */}
      <div className="pt-2.5 pb-1">
        {/* Line 1: product name — muted, small */}
        <p
          className="leading-tight text-xs md:text-sm text-[var(--t-text-muted)]"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 400,
          }}
        >
          {product.name}
        </p>
        {/* Line 2: subtitle — bold, primary color (shown only if subtitle exists) */}
        {product.subtitle && (
          <p
            className="leading-tight text-[13px] md:text-sm text-[var(--t-text-primary)]"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
            }}
          >
            {product.subtitle}
          </p>
        )}
        {/* Line 3: price */}
        <div className="flex items-baseline gap-2 mt-0.5">
          <span
            className={priceConfig.className}
            style={{
              fontFamily: "var(--font-sans)",
              ...priceConfig.style,
            }}
          >
            {currencySymbol}
            {new Intl.NumberFormat("en-US").format(product.price)}
          </span>
          {product.originalPrice && (
            <span
              className="line-through text-xs md:text-sm text-[var(--t-text-muted)]"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
              }}
            >
              {currencySymbol}
              {new Intl.NumberFormat("en-US").format(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
