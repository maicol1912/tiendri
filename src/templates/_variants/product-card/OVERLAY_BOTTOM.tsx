'use client';

import React from 'react';
import Image from 'next/image';
import { formatPrice } from '@/lib/format';
import type { ProductCardSlotProps } from './types';

function OverlayBottomCard({
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
}: ProductCardSlotProps) {
  const imageUrl = product.images[0]?.url ?? null;
  const imageAlt = `${product.name} imagen del producto`;

  const hasDiscount = product.originalPrice != null && product.originalPrice > product.price;
  const discountPercent =
    hasDiscount && product.originalPrice != null
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <article
      className={`${hoverFxClass} ${cardBorderClass} rounded-[var(--t-radius-base)] relative overflow-hidden min-w-0 max-w-sm w-full mx-auto aspect-[3/4] group cursor-pointer`}
      onClick={() => onClick?.(product.slug)}
    >
      {discountPercent !== null && (
        <span
          className={`absolute top-2 right-2 z-20 px-2 py-0.5 bg-[var(--t-primary)] text-[var(--t-on-primary)] text-[11px] font-bold ${badgeClass}`}
        >
          -{discountPercent}%
        </span>
      )}

      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className={`object-cover ${imageHoverClass}`}
          sizes="(max-width: 768px) 50vw, 25vw"
          loading="lazy"
        />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: 'var(--t-secondary)' }}
        >
          <svg width="48" height="48" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <rect width="40" height="40" rx="8" fill="var(--t-border)" />
            <path
              d="M8 28l8-8 5 5 7-9 12 12"
              stroke="var(--t-muted)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <circle cx="14" cy="16" r="3" fill="var(--t-muted)" />
          </svg>
        </div>
      )}

      {!product.inStock && (
        <div className="absolute inset-0 z-30 bg-black/40 flex items-center justify-center">
          <span className="text-white font-semibold text-sm tracking-wider">Agotado</span>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 to-transparent px-4 pt-8 pb-4 flex flex-col gap-2">
        <p className="text-sm font-medium text-white leading-5 line-clamp-2">{product.name}</p>
        <p
          className={`tracking-[0.72px] text-white ${priceConfig.className}`}
          style={{ ...priceConfig.style, color: 'white' }}
        >
          {formatPrice(product.price, currencySymbol)}
        </p>
        <button
          type="button"
          className={`${buttonClass} text-sm font-medium leading-6 rounded-[var(--t-radius-button)] px-4 py-2 cursor-pointer border hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap w-full`}
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.(product.id);
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

export default React.memo(OverlayBottomCard);
