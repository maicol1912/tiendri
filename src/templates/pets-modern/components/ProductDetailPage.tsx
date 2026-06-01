// Pet V3 Template — Product Detail Page
// Back arrow + heart, large image + dots, name + price, weight, stars, qty stepper,
// expandable rows, "AGREGAR AL CARRITO" button. Desktop: 2-col.
// ZERO hardcoded colors — all via CSS variables.

import Image from "next/image";
import { ArrowLeft, Heart, Star, ChevronRight, Minus, Plus } from "lucide-react";
import type { StorefrontProduct } from "../types";

interface ProductDetailPageProps {
  product: StorefrontProduct;
  quantity: number;
  currencySymbol?: string;
  onBack?: () => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onAddToCart?: () => void;
  onWishlist?: () => void;
}

function formatPrice(price: number, symbol: string): string {
  return `${symbol}${new Intl.NumberFormat("en-US").format(price)}`;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${
            star <= Math.floor(rating)
              ? "fill-[var(--t-rating-star)] text-[var(--t-rating-star)]"
              : star <= rating
              ? "fill-[var(--t-rating-star)]/50 text-[var(--t-rating-star)]"
              : "fill-[var(--t-rating-bar-bg)] text-[var(--t-rating-bar-bg)]"
          }`}
        />
      ))}
    </div>
  );
}

export function ProductDetailPage({
  product,
  quantity,
  currencySymbol = "$",
  onBack,
  onIncrement,
  onDecrement,
  onAddToCart,
  onWishlist,
}: ProductDetailPageProps) {
  const imageUrl = product.images[0]?.url ?? "";

  return (
    <div className="min-h-screen bg-[var(--t-background)]">
      {/* Top bar — mobile */}
      <div className="flex items-center justify-between px-4 py-3 lg:hidden">
        <button onClick={onBack} className="p-1" aria-label="Volver">
          <ArrowLeft className="w-5 h-5 text-[var(--t-text-primary)]" />
        </button>
        <button onClick={onWishlist} className="p-1" aria-label="Agregar a favoritos">
          <Heart className="w-6 h-6 text-[var(--t-text-primary)]" />
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Desktop: back button */}
        <div className="hidden lg:flex items-center gap-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-[var(--t-text-muted)] hover:text-[var(--t-text-primary)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a la tienda
          </button>
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-10 lg:items-start">
          {/* Image section */}
          <div className="w-full lg:w-[45%] lg:sticky lg:top-24">
            <div className="relative w-full aspect-square max-h-[400px] lg:max-h-[500px] bg-[var(--t-surface)] rounded-[var(--t-radius-card)] flex items-center justify-center overflow-hidden">
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain p-6"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  priority
                />
              )}
            </div>
            {/* Image dots indicator */}
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="w-2 h-2 rounded-full bg-[var(--t-primary)]" />
              <div className="w-2 h-2 rounded-full bg-[var(--t-border)]" />
              <div className="w-2 h-2 rounded-full bg-[var(--t-border)]" />
            </div>
          </div>

          {/* Info section */}
          <div className="w-full lg:w-[55%] mt-6 lg:mt-0">
            {/* Name + Price */}
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-[var(--t-text-primary)] text-2xl md:text-3xl font-bold leading-tight tracking-[0.1px] flex-1">
                {product.name}
              </h1>
              <div className="flex flex-col items-end flex-shrink-0">
                <span className="text-[var(--t-text-primary)] text-2xl md:text-3xl font-bold tracking-[0.1px]">
                  {formatPrice(product.price, currencySymbol)}
                </span>
                {product.originalPrice && (
                  <span className="text-[var(--t-text-muted)] text-sm line-through">
                    {formatPrice(product.originalPrice, currencySymbol)}
                  </span>
                )}
              </div>
            </div>

            {/* Desktop: wishlist button */}
            <div className="hidden lg:flex mt-2">
              <button onClick={onWishlist} className="p-1 text-[var(--t-text-primary)] hover:text-[var(--t-primary)] transition-colors" aria-label="Agregar a favoritos">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            {/* Weight */}
            {product.subtitle && (
              <p className="text-[var(--t-text-muted)] text-base font-medium mt-2">
                {product.subtitle}
              </p>
            )}

            {/* Stars */}
            {product.rating !== undefined && (
              <div className="mt-2">
                <StarRating rating={product.rating} />
              </div>
            )}

            {/* Quantity stepper */}
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={onDecrement}
                className="w-10 h-10 flex items-center justify-center text-[var(--t-text-primary)] hover:text-[var(--t-primary)] transition-colors"
                aria-label="Disminuir cantidad"
              >
                <Minus className="w-5 h-5" />
              </button>
              <div className="w-[46px] h-[46px] flex items-center justify-center border border-[var(--t-border)] rounded-[var(--t-radius-button)]">
                <span className="text-[var(--t-text-primary)] text-lg font-medium">
                  {quantity}
                </span>
              </div>
              <button
                onClick={onIncrement}
                className="w-10 h-10 flex items-center justify-center text-[var(--t-text-primary)] hover:text-[var(--t-primary)] transition-colors"
                aria-label="Aumentar cantidad"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* Product Detail row */}
            <button className="flex items-center justify-between w-full py-4 mt-4 border-t border-[var(--t-border)]">
              <span className="text-[var(--t-text-primary)] text-base font-medium">
                Detalle del producto
              </span>
              <ChevronRight className="w-4 h-4 text-[var(--t-text-primary)]" />
            </button>

            {/* Composition row */}
            <button className="flex items-center justify-between w-full py-4 border-t border-[var(--t-border)]">
              <span className="text-[var(--t-text-primary)] text-base font-medium">
                Composicion
              </span>
              <ChevronRight className="w-4 h-4 text-[var(--t-text-primary)]" />
            </button>

            {/* Description (desktop) */}
            {product.description && (
              <div className="hidden lg:block mt-4 border-t border-[var(--t-border)] pt-4">
                <p className="text-[var(--t-text-muted)] text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Add to Cart button */}
            <div className="mt-6 lg:mt-8">
              <button
                onClick={onAddToCart}
                className="w-full h-[67px] bg-[var(--t-button-bg)] text-[var(--t-button-text)] text-base font-bold uppercase rounded-[var(--t-radius-button)] transition-colors hover:opacity-90 active:opacity-80"
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacer for mobile */}
      <div className="h-8 lg:h-16" />
    </div>
  );
}
