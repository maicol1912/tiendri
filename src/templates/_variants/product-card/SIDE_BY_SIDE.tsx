'use client';

import React from 'react';
import Image from 'next/image';
import { formatPrice } from '@/lib/format';
import type { ProductCardSlotProps } from './types';

function SideBySideCard({
  product,
  currencySymbol,
  onClick,
  onAddToCart,
  buttonClass,
  badgeClass,
  priceConfig,
  cardBorderClass,
  hoverFxClass,
  imageFitClass,
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
      className={`${hoverFxClass} ${cardBorderClass} rounded-[var(--t-radius-base)] flex flex-row min-w-0 w-full mx-auto overflow-hidden`}
    >
      <button
        type="button"
        className="relative w-[40%] shrink-0 bg-transparent border-none cursor-pointer p-0 aspect-square"
        onClick={() => onClick?.(product.slug)}
        aria-label={`Ver ${product.name}`}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className={imageFitClass}
            sizes="(max-width: 768px) 40vw, 20vw"
            loading="lazy"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: 'var(--t-secondary)' }}
          >
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true">
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
        {discountPercent !== null && (
          <span
            className={`absolute top-2 left-2 px-2 py-0.5 bg-[var(--t-primary)] text-[var(--t-on-primary)] text-[11px] font-bold ${badgeClass}`}
          >
            -{discountPercent}%
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white text-xs font-medium tracking-wider">Agotado</span>
          </div>
        )}
      </button>

      <div
        className="flex flex-col justify-center gap-3 w-[60%]"
        style={{ padding: 'var(--t-card-padding, 1rem)' }}
      >
        <button
          type="button"
          className="bg-transparent border-none cursor-pointer p-0 text-left"
          onClick={() => onClick?.(product.slug)}
        >
          <p className="text-sm font-medium text-[var(--t-foreground)] leading-5 line-clamp-2">
            {product.name}
          </p>
        </button>

        {product.description && (
          <p className="text-xs text-[var(--t-muted)] leading-4 line-clamp-2">
            {product.description}
          </p>
        )}

        <p className={`tracking-[0.72px] ${priceConfig.className}`} style={priceConfig.style}>
          {formatPrice(product.price, currencySymbol)}
        </p>

        <button
          type="button"
          className={`${buttonClass} text-xs font-medium leading-6 rounded-[var(--t-radius-button)] px-4 py-2 cursor-pointer border hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap`}
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

export default React.memo(SideBySideCard);
