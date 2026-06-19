'use client';

import React from 'react';
import Image from 'next/image';
import { formatPrice } from '@/shared/format';
import type { ProductCardSlotProps } from './types';

function OverlayFullCard({
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
      className={`${hoverFxClass} ${cardBorderClass} rounded-[var(--t-radius-base)] relative overflow-hidden min-w-0 max-w-sm w-full mx-auto aspect-square group cursor-pointer`}
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

      <div
        className="absolute inset-0 z-10 transition-colors duration-200"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--t-foreground) 40%, transparent)',
        }}
        data-hover-overlay
      />

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 px-4 text-center">
        <p
          className="text-base font-semibold leading-5 line-clamp-2"
          style={{ color: 'var(--t-background)' }}
        >
          {product.name}
        </p>
        <p
          className={`tracking-[0.72px] ${priceConfig.className}`}
          style={{ ...priceConfig.style, color: 'var(--t-background)' }}
        >
          {formatPrice(product.price, currencySymbol)}
        </p>
        {!product.inStock && (
          <span
            className="text-xs font-medium tracking-wider"
            style={{ color: 'color-mix(in srgb, var(--t-background) 80%, transparent)' }}
          >
            Agotado
          </span>
        )}
        {product.inStock && (
          <button
            type="button"
            className={`${buttonClass} text-sm font-medium leading-6 rounded-[var(--t-radius-button)] px-6 py-2 cursor-pointer border hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap opacity-0 group-hover:opacity-100 duration-200`}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(product.id);
            }}
            aria-label={`Agregar ${product.name} al carrito`}
          >
            Comprar
          </button>
        )}
      </div>
    </article>
  );
}

export default React.memo(OverlayFullCard);
