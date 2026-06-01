// Tech Premium Template — Product Card
// Figma: #F6F6F6 bg, rounded-[9px], heart top-right, product image centered 160px,
// name centered 16px medium, price 24px semibold, "Buy Now" black rounded-lg button.
// Visual only — handlers come as props.

import { Heart } from "lucide-react";
import Image from "next/image";
import type { StorefrontProduct } from "../types";
import type { TechPremiumConfig } from "../config";
import {
  cardStyleClass,
  hoverEffectClass,
  imageRatioClass,
} from "../utils/layout-classes";

interface ProductCardProps {
  product: StorefrontProduct;
  currencySymbol?: string;
  layout?: TechPremiumConfig["layout"];
  onClick?: () => void;
  onWishlistToggle?: () => void;
  onAddToCart?: () => void;
}

export function ProductCard({
  product,
  currencySymbol = "$",
  layout,
  onClick,
  onWishlistToggle,
  onAddToCart,
}: ProductCardProps) {
  const imageUrl = product.images[0]?.url ?? "/placeholder.png";
  const imageAlt = `${product.name} imagen del producto`;

  const cardBg = cardStyleClass(layout?.cardStyle ?? "flat");
  const hoverFx = hoverEffectClass(layout?.cardHoverEffect ?? "none");
  const imgRatio = imageRatioClass(layout?.cardImageRatio ?? "square");

  return (
    <article
      className={`${cardBg} ${hoverFx} rounded-[var(--t-radius-card)] flex flex-col items-center gap-4 px-4 py-6 min-w-0`}
    >
      {/* Top: wishlist icon right-aligned */}
      <div className="flex items-center justify-end w-full">
        <button
          type="button"
          className="p-0 bg-transparent border-none cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onWishlistToggle?.();
          }}
          aria-label={product.inWishlist ? `Quitar ${product.name} de favoritos` : `Agregar ${product.name} a favoritos`}
        >
          <Heart
            className={`w-6 h-6 transition-colors ${
              product.inWishlist
                ? "fill-[var(--t-text-primary)] text-[var(--t-text-primary)]"
                : "fill-none text-[var(--t-text-primary)]/40 hover:text-[var(--t-text-primary)]/70"
            }`}
          />
        </button>
      </div>

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
          <p className="text-xl lg:text-2xl font-semibold text-[var(--t-text-primary)] tracking-[0.72px]">
            {currencySymbol}
            {new Intl.NumberFormat("en-US").format(product.price)}
          </p>
        </div>

        {/* Buy Now button */}
        <button
          type="button"
          className="bg-[var(--t-button-bg)] text-[var(--t-button-text)] text-sm font-medium leading-6 rounded-[var(--t-radius-button)] px-8 lg:px-16 py-3 cursor-pointer border-none hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
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
