'use client';

import React from 'react';
import Image from 'next/image';
import { imageRatioClass } from '@/templates/_shared/utils/image-classes';
import { formatPrice } from '@/lib/format';
import type { ProductCardSlotProps } from './types';

function BelowImageCard({
  product,
  currencySymbol,
  onClick,
  onAddToCart,
  buttonClass,
  badgeClass,
  priceConfig,
  cardBgClass,
  cardBorderClass,
  hoverFxClass,
  imageFitClass,
}: ProductCardSlotProps) {
  const imageUrl = product.images[0]?.url ?? null;
  const imageAlt = `${product.name} imagen del producto`;
  const imgRatio = imageRatioClass('square');

  const hasDiscount = product.originalPrice != null && product.originalPrice > product.price;
  const discountPercent =
    hasDiscount && product.originalPrice != null
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <article
      className={`${cardBgClass} ${hoverFxClass} ${cardBorderClass} rounded-[var(--t-radius-base)] flex flex-col items-center gap-4 min-w-0 max-w-sm w-full mx-auto relative`}
      style={{ padding: 'var(--t-card-padding, 1.5rem 1rem)' }}
    >
      {discountPercent !== null && (
        <span
          className={`absolute top-2 right-2 px-2 py-0.5 bg-[var(--t-primary)] text-[var(--t-on-primary)] text-[11px] font-bold ${badgeClass}`}
        >
          -{discountPercent}%
        </span>
      )}

      <button
        type="button"
        className={`relative w-[120px] lg:w-[160px] shrink-0 bg-transparent border-none cursor-pointer p-0 ${imgRatio}`}
        onClick={() => onClick?.(product.slug)}
        aria-label={`Ver ${product.name}`}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className={imageFitClass}
            sizes="160px"
            loading="lazy"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: 'var(--t-secondary)' }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
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
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-[inherit]">
            <span className="text-white font-semibold text-sm tracking-wider">Agotado</span>
          </div>
        )}
      </button>

      <div className="flex flex-col items-center gap-4 lg:gap-6 w-full">
        <div
          className="flex flex-col items-center gap-2 lg:gap-4 w-full"
          style={{ textAlign: 'var(--t-type-card-align, center)' } as unknown as React.CSSProperties}
        >
          <button
            type="button"
            className="bg-transparent border-none cursor-pointer p-0 w-full"
            onClick={() => onClick?.(product.slug)}
          >
            <p className="text-sm lg:text-base font-medium text-[var(--t-foreground)] leading-6 line-clamp-2">
              {product.name}
            </p>
          </button>
          <p className={`tracking-[0.72px] ${priceConfig.className}`} style={priceConfig.style}>
            {formatPrice(product.price, currencySymbol)}
          </p>
        </div>

        <button
          type="button"
          className={`${buttonClass} text-sm font-medium leading-6 rounded-[var(--t-radius-button)] px-8 lg:px-16 py-3 cursor-pointer border hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap w-full`}
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

export default React.memo(BelowImageCard);
