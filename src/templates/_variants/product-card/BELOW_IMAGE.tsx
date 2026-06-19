'use client';

import React from 'react';
import Image from 'next/image';
import { formatPrice } from '@/shared/format';
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
  imageHoverClass,
  aspectRatioClass = "aspect-square",
  showAddToCart = true,
  showDiscountBadge = true,
  showOriginalPrice = true,
  showRating = false,
  textCenter = false,
}: ProductCardSlotProps & { textCenter?: boolean }) {
  const imageUrl = product.images[0]?.url ?? null;
  const imageAlt = `${product.name} imagen del producto`;

  const hasDiscount = product.originalPrice != null && product.originalPrice > product.price;
  const discountPercent =
    hasDiscount && product.originalPrice != null
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <article
      className={`${cardBgClass} ${hoverFxClass} flex flex-col min-w-0 max-w-sm w-full mx-auto relative overflow-hidden rounded-[var(--t-radius-card,0px)]`}
    >
      {/* Image fills full card width, aspect square */}
      <button
        type="button"
        className={`relative w-full ${aspectRatioClass} shrink-0 cursor-pointer overflow-hidden rounded-[var(--t-radius-card,0px)] ${imageFitClass === 'object-contain' ? 'bg-[var(--t-card)] p-0' : 'p-0'} ${imageHoverClass}`}
        onClick={() => onClick?.(product.slug)}
        aria-label={`Ver ${product.name}`}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className={`${imageFitClass}${imageFitClass === 'object-cover' ? ' object-top' : ''}`}
            sizes="(max-width: 768px) 50vw, 25vw"
            loading="lazy"
            style={imageFitClass === 'object-contain' ? { transform: 'scale(0.6)' } : undefined}
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
        {showDiscountBadge && discountPercent !== null && (
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

      {/* Text block — left-aligned by default, centered when textCenter is true */}
      <div className={`flex flex-col ${cardBgClass ? 'px-3' : 'px-0'} pt-1.5 pb-3 gap-0.5 ${textCenter ? 'text-center' : 'text-left'}`}>
        <button
          type="button"
          className={`bg-transparent border-none cursor-pointer p-0 ${textCenter ? 'text-center' : 'text-left'}`}
          onClick={() => onClick?.(product.slug)}
        >
          {product.subtitle ? (
            <>
              {/* Category-level name shown as muted/italic label when subtitle is present */}
              <p className="mt-0 text-xs italic text-[var(--t-muted)] leading-4">
                {product.name}
              </p>
              {/* Product subtitle — the specific product title */}
              <p className="mt-0 text-sm font-semibold text-[var(--t-foreground)] leading-5 line-clamp-2">
                {product.subtitle}
              </p>
            </>
          ) : (
            /* No subtitle — show name as primary title (default behavior) */
            <p className="mt-0 text-sm font-medium text-[var(--t-foreground)] leading-5 line-clamp-2">
              {product.name}
            </p>
          )}
        </button>
        <div className={`flex items-baseline gap-1.5 flex-wrap mt-0.5 ${textCenter ? 'justify-center' : ''}`}>
          <p className={`text-sm tracking-[0.72px] ${priceConfig.className}`} style={priceConfig.style}>
            {formatPrice(product.price, currencySymbol)}
          </p>
          {showOriginalPrice && hasDiscount && product.originalPrice != null && (
            <p
              className="text-xs line-through"
              style={{ color: 'var(--t-primary)' }}
            >
              {formatPrice(product.originalPrice, currencySymbol)}
            </p>
          )}
          {showRating && product.rating != null && (
            <p
              className="text-xs font-medium ml-auto"
              style={{ color: 'var(--t-accent)' }}
            >
              ★ {product.rating.toFixed(1)}
            </p>
          )}
        </div>

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
