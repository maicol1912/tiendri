'use client';

import React from 'react';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { imageRatioClass } from '@/templates/_shared/utils/image-classes';
import { formatPrice } from '@/shared/format';
import type { ProductCardSlotProps } from './types';

function WithDescriptionCard({
  product,
  currencySymbol,
  onClick,
  onAddToCart,
  badgeClass,
  priceConfig,
  cardBgClass,
  cardBorderClass,
  hoverFxClass,
}: ProductCardSlotProps) {
  const imageUrl = product.images[0]?.url ?? null;
  const ratioClass = imageRatioClass('square');

  const hasDiscount = product.originalPrice != null && product.originalPrice > product.price;
  const discountPercent =
    hasDiscount && product.originalPrice != null
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <article
      className={`max-w-sm w-full mx-auto flex flex-col overflow-hidden cursor-pointer ${cardBgClass} ${hoverFxClass} ${cardBorderClass}`}
      style={{ borderRadius: 'var(--t-radius-card)' }}
      onClick={() => onClick?.(product.slug)}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') onClick(product.slug);
            }
          : undefined
      }
      aria-label={onClick ? `Ver ${product.name}` : undefined}
    >
      {/* Image container */}
      <div
        className={`relative w-full ${ratioClass}`}
        style={{ backgroundColor: 'var(--t-secondary)', borderRadius: 'var(--t-radius-card)' }}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
            className="object-contain p-3"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <rect width="40" height="40" rx="8" fill="var(--t-border)" />
              <path
                d="M8 28l8-9 5 5 7-9 12 13"
                stroke="var(--t-primary)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
        )}

        {/* Discount badge */}
        {discountPercent !== null && (
          <span
            className={`absolute top-2 right-2 z-10 px-2 py-0.5 bg-[var(--t-primary)] text-[var(--t-on-primary)] text-[11px] font-bold ${badgeClass}`}
          >
            -{discountPercent}%
          </span>
        )}

        {/* Unavailable overlay */}
        {!product.inStock && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--t-background) 70%, transparent)',
              borderRadius: 'var(--t-radius-card)',
            }}
          >
            <span
              className="px-3 py-1"
              style={{
                backgroundColor: 'var(--t-card)',
                borderRadius: 9999,
                color: 'var(--t-muted)',
                fontSize: '11px',
                fontWeight: 500,
              }}
            >
              Agotado
            </span>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="flex flex-col gap-1 px-1 pb-3 pt-2.5">
        {/* Product name */}
        <p
          className="leading-snug line-clamp-2 capitalize"
          style={{
            color: 'var(--t-foreground)',
            fontFamily: 'var(--font-heading)',
            fontSize: '15px',
            fontWeight: 500,
          }}
        >
          {product.name}
        </p>

        {/* Description */}
        {product.description && (
          <p
            className="line-clamp-2 leading-snug"
            style={{
              color: 'var(--t-muted)',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 400,
            }}
          >
            {product.description}
          </p>
        )}

        {/* Divider */}
        <hr
          style={{
            borderColor: 'var(--t-border)',
            borderTopWidth: 1,
            margin: '4px 0',
          }}
        />

        {/* Price + actions row */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span
              className={priceConfig.className}
              style={{ fontFamily: 'var(--font-body)', ...priceConfig.style }}
            >
              {formatPrice(product.price, currencySymbol)}
            </span>
            {hasDiscount && product.originalPrice != null && (
              <>
                <span
                  className="line-through"
                  style={{
                    color: 'var(--t-muted)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    fontWeight: 400,
                  }}
                >
                  {formatPrice(product.originalPrice, currencySymbol)}
                </span>
                <span
                  className={`text-xs font-semibold px-1.5 py-0.5 ${badgeClass}`}
                  style={{ backgroundColor: 'var(--t-primary)', color: 'var(--t-background)' }}
                >
                  -{discountPercent}%
                </span>
              </>
            )}
          </div>

          {/* Plus — add to cart */}
          <button
            type="button"
            className="flex items-center justify-center flex-shrink-0"
            style={{
              width: 20,
              height: 20,
              borderRadius: 'var(--t-radius-category)',
              backgroundColor: 'var(--t-primary)',
              border: 'none',
              cursor: 'pointer',
              opacity: product.inStock ? 1 : 0.4,
            }}
            aria-label={`Agregar ${product.name} al carrito`}
            disabled={!product.inStock}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(product.id);
            }}
          >
            <Plus size={10} strokeWidth={2.5} style={{ color: 'var(--t-on-primary)' }} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default React.memo(WithDescriptionCard);
