'use client';

import React from 'react';
import Image from 'next/image';
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
  hoverFxClass,
  imageHoverClass,
  showAddToCart = true,
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
      className={`${cardBgClass} ${hoverFxClass} rounded-[var(--t-radius-card)] flex flex-col min-w-0 max-w-sm w-full mx-auto relative overflow-hidden`}
    >
      {/* Image fills full card width, aspect 4:5 */}
      <button
        type="button"
        className={`relative w-full aspect-[3/4] shrink-0 bg-transparent border-none cursor-pointer p-0 ${imageHoverClass}`}
        onClick={() => onClick?.(product.slug)}
        aria-label={`Ver ${product.name}`}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
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

        {/* Discount badge — top right, over image */}
        {discountPercent !== null && (
          <span
            className={`absolute top-2 right-2 px-2 py-0.5 text-[11px] font-bold ${badgeClass}`}
            style={{ backgroundColor: 'var(--t-foreground)', color: 'var(--t-background)' }}
          >
            -{discountPercent}%
          </span>
        )}

        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold text-sm tracking-wider">Agotado</span>
          </div>
        )}
      </button>

      {/* Text block — left-aligned, minimal spacing */}
      <div className="flex flex-col px-3 pt-1.5 pb-3 gap-0.5 text-left">
        <button
          type="button"
          className="bg-transparent border-none cursor-pointer p-0 text-left"
          onClick={() => onClick?.(product.slug)}
        >
          <p className="mt-0 text-sm font-medium text-[var(--t-foreground)] leading-5 line-clamp-2">
            {product.name}
          </p>
        </button>
        <p className={`mt-0.5 text-sm text-[var(--t-muted)] tracking-[0.72px] ${priceConfig.className}`} style={priceConfig.style}>
          {formatPrice(product.price, currencySymbol)}
        </p>

        {/* "Comprar" button — only when showAddToCart is true */}
        {showAddToCart && (
          <button
            type="button"
            className={`${buttonClass} mt-3 text-sm font-medium leading-6 rounded-[var(--t-radius-button)] px-8 py-3 cursor-pointer border hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap w-full`}
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
        )}
      </div>
    </article>
  );
}

export default React.memo(BelowImageCard);
