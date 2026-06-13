'use client';

import Image from 'next/image';
import type { CardLayoutProps } from './types';

export default function CardOverlayFull({
  product,
  currencySymbol,
  onClick,
  onAddToCart,
  buttonClass,
  badgeClass,
  priceConfig,
  cardBorderClass,
  hoverFxClass,
  imageHoverClass,
}: CardLayoutProps) {
  const imageUrl = product.images[0]?.url ?? '/placeholder.png';
  const imageAlt = `${product.name} imagen del producto`;

  const hasDiscount = product.originalPrice != null && product.originalPrice > product.price;
  const discountPercent =
    hasDiscount && product.originalPrice != null
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <article
      className={`${hoverFxClass} ${cardBorderClass} rounded-[var(--t-radius-base)] relative overflow-hidden min-w-0 max-w-sm w-full mx-auto aspect-square group cursor-pointer`}
      onClick={onClick}
    >
      {discountPercent !== null && (
        <span
          className={`absolute top-2 right-2 z-20 px-2 py-0.5 bg-[var(--t-primary)] text-[var(--t-on-primary)] text-[11px] font-bold ${badgeClass}`}
        >
          -{discountPercent}%
        </span>
      )}

      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        className={`object-cover ${imageHoverClass}`}
        sizes="(max-width: 768px) 50vw, 25vw"
        loading="lazy"
      />

      <div className="absolute inset-0 z-10 bg-black/40 group-hover:bg-black/55 transition-colors duration-[var(--t-fx-duration)]" />

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="text-base font-semibold text-white leading-5 line-clamp-2">{product.name}</p>
        <p
          className={`tracking-[0.72px] text-white ${priceConfig.className}`}
          style={{ ...priceConfig.style, color: 'white' }}
        >
          {currencySymbol}
          {new Intl.NumberFormat('en-US').format(product.price)}
        </p>
        <button
          type="button"
          className={`${buttonClass} text-sm font-medium leading-6 rounded-[var(--t-radius-button)] px-6 py-2 cursor-pointer border hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--t-fx-duration)]`}
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.();
          }}
          disabled={!product.inStock}
          aria-label={
            product.inStock ? `Agregar ${product.name} al carrito` : `${product.name} agotado`
          }
        >
          {product.inStock ? 'Comprar' : 'Agotado'}
        </button>
      </div>
    </article>
  );
}
