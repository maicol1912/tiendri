// Pet V3 Template — Product Card
// Product card for grids (image, name, price, "Agregar" button).
// ZERO hardcoded colors — all via CSS variables.

import Image from "next/image";
import type { StorefrontProduct } from "../types";
import { cardStyleClass, hoverEffectClass, imageRatioClass } from "../utils/layout-classes";
import { BUTTON_STYLE_MAP, PRICE_DISPLAY_MAP } from "@/templates/_shared/style-maps";
import type { ButtonStyle, PriceDisplay } from "@/types/templates";

interface ProductCardProps {
  product: StorefrontProduct;
  currencySymbol?: string;
  onAddToCart?: () => void;
  onClick?: () => void;
  layout?: {
    cardStyle?: string;
    cardHoverEffect?: string;
    cardImageRatio?: string;
    buttonStyle?: ButtonStyle;
    priceDisplay?: PriceDisplay;
  };
}

function formatPrice(price: number, symbol: string): string {
  return `${symbol}${new Intl.NumberFormat("en-US").format(price)}`;
}

export function ProductCard({
  product,
  currencySymbol = "$",
  onAddToCart,
  onClick,
  layout,
}: ProductCardProps) {
  const imageUrl = product.images[0]?.url ?? "";
  const cardClass = cardStyleClass(layout?.cardStyle ?? "bordered");
  const hoverClass = hoverEffectClass(layout?.cardHoverEffect ?? "scale");
  const imgClass = imageRatioClass(layout?.cardImageRatio ?? "square");
  const buttonStyleClass = BUTTON_STYLE_MAP[layout?.buttonStyle ?? "filled"];
  const priceDisplayConfig = PRICE_DISPLAY_MAP[layout?.priceDisplay ?? "standard"];

  return (
    <div
      className={`max-w-sm w-full mx-auto rounded-[var(--t-radius-card)] overflow-hidden group cursor-pointer ${cardClass} ${hoverClass}`}
      onClick={onClick}
    >
      {/* Image */}
      <div className={`relative w-full ${imgClass} bg-[var(--t-surface)] flex items-center justify-center p-4`}>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-contain p-3"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="text-[var(--t-text-primary)] text-sm font-medium leading-tight line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {product.subtitle && (
          <p className="text-[var(--t-text-muted)] text-xs mt-1">{product.subtitle}</p>
        )}

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-baseline gap-1.5">
            <span
              className={priceDisplayConfig.className}
              style={priceDisplayConfig.style}
            >
              {formatPrice(product.price, currencySymbol)}
            </span>
            {product.originalPrice && (
              <span className="text-[var(--t-text-muted)] text-xs line-through">
                {formatPrice(product.originalPrice, currencySymbol)}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.();
          }}
          className={`w-full mt-3 h-[40px] text-sm font-bold uppercase rounded-[var(--t-radius-button)] transition-colors hover:opacity-90 active:opacity-80 border ${buttonStyleClass}`}
        >
          Agregar
        </button>
      </div>
    </div>
  );
}
