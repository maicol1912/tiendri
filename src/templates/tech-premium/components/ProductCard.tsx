// Tech Premium Template — Product Card
// Figma: #F6F6F6 bg, rounded-[9px], product image centered 160px,
// name centered 16px medium, price 24px semibold, "Buy Now" black rounded-lg button.
// Visual only — handlers come as props.

import Image from "next/image";
import type { StorefrontProduct } from "../types";
import type { TemplateLayoutConfig } from "@/types/templates";
import {
  cardStyleClass,
  hoverEffectClass,
  imageRatioClass,
} from "../utils/layout-classes";
import { BUTTON_STYLE_MAP, BADGE_STYLE_MAP, PRICE_DISPLAY_MAP } from "@/templates/_shared/style-maps";

interface ProductCardProps {
  product: StorefrontProduct;
  currencySymbol?: string;
  layout?: Partial<TemplateLayoutConfig>;
  onClick?: () => void;
  onAddToCart?: () => void;
}

export function ProductCard({
  product,
  currencySymbol = "$",
  layout,
  onClick,
  onAddToCart,
}: ProductCardProps) {
  const imageUrl = product.images[0]?.url ?? "/placeholder.png";
  const imageAlt = `${product.name} imagen del producto`;

  const cardBg = cardStyleClass(layout?.cardStyle ?? "flat");
  const hoverFx = hoverEffectClass(layout?.cardHoverEffect ?? "none");
  const imgRatio = imageRatioClass(layout?.cardImageRatio ?? "square");

  const buttonStyle = layout?.buttonStyle ?? "filled";
  const buttonClass = BUTTON_STYLE_MAP[buttonStyle];

  const badgeStyle = layout?.badgeStyle ?? "pill";
  const badgeClass = BADGE_STYLE_MAP[badgeStyle];

  const priceDisplay = layout?.priceDisplay ?? "standard";
  const priceConfig = PRICE_DISPLAY_MAP[priceDisplay];

  const hasDiscount = product.originalPrice != null && product.originalPrice > product.price;
  const discountPercent = hasDiscount && product.originalPrice != null
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <article
      className={`${cardBg} ${hoverFx} rounded-[var(--t-radius-card)] flex flex-col items-center gap-4 px-4 py-6 min-w-0 max-w-sm w-full mx-auto relative`}
    >
      {/* Discount badge */}
      {discountPercent !== null && (
        <span
          className={`absolute top-2 right-2 px-2 py-0.5 bg-[var(--t-badge-bg)] text-[var(--t-badge-text)] text-[11px] font-bold ${badgeClass}`}
        >
          -{discountPercent}%
        </span>
      )}

      {/* Product image — clickable */}
      <button
        type="button"
        className={`relative w-[120px] lg:w-[160px] shrink-0 bg-transparent border-none cursor-pointer p-0 ${imgRatio}`}
        onClick={onClick}
        aria-label={`Ver ${product.name}`}
      >
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-contain"
          sizes="160px"
          loading="lazy"
        />
      </button>

      {/* Info + button */}
      <div className="flex flex-col items-center gap-4 lg:gap-6 w-full">
        {/* Name + price */}
        <div className="flex flex-col items-center gap-2 lg:gap-4 w-full text-center">
          <button
            type="button"
            className="bg-transparent border-none cursor-pointer p-0 w-full"
            onClick={onClick}
          >
            <p className="text-sm lg:text-base font-medium text-[var(--t-text-primary)] leading-6 line-clamp-2">
              {product.name}
            </p>
          </button>
          <p
            className={`tracking-[0.72px] ${priceConfig.className}`}
            style={priceConfig.style}
          >
            {currencySymbol}
            {new Intl.NumberFormat("en-US").format(product.price)}
          </p>
        </div>

        {/* Buy Now button */}
        <button
          type="button"
          className={`${buttonClass} text-sm font-medium leading-6 rounded-[var(--t-radius-button)] px-8 lg:px-16 py-3 cursor-pointer border hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap`}
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.();
          }}
          disabled={!product.inStock}
          aria-label={product.inStock ? `Agregar ${product.name} al carrito` : `${product.name} agotado`}
        >
          {product.inStock ? "Comprar" : "Agotado"}
        </button>
      </div>
    </article>
  );
}
