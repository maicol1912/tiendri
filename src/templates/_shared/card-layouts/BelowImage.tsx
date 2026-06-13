'use client';

import type React from 'react';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import type { CardLayoutProps } from './types';
import { imageRatioClass } from '@/templates/tech-premium/utils/layout-classes';

export default function CardBelowImage({
  product,
  currencySymbol,
  layout,
  addToCartStyle = 'full-width',
  onClick,
  onAddToCart,
  buttonClass,
  badgeClass,
  priceConfig,
  cardBgClass,
  cardBorderClass,
  hoverFxClass,
  imageFitClass,
}: CardLayoutProps) {
  const imageUrl = product.images[0]?.url ?? '/placeholder.png';
  const imageAlt = `${product.name} imagen del producto`;
  const imgRatio = imageRatioClass(layout?.cardImageRatio ?? 'square');

  const hasDiscount = product.originalPrice != null && product.originalPrice > product.price;
  const discountPercent =
    hasDiscount && product.originalPrice != null
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  const needsGroup = addToCartStyle === 'on-hover-only';

  return (
    <article
      className={`${cardBgClass} ${hoverFxClass} ${cardBorderClass} rounded-[var(--t-radius-base)] flex flex-col items-center gap-4 min-w-0 max-w-sm w-full mx-auto relative${needsGroup ? ' group' : ''}`}
      style={{ padding: 'var(--t-card-padding, 1.5rem 1rem)' }}
    >
      {discountPercent !== null && (
        <span
          className={`absolute top-2 right-2 px-2 py-0.5 bg-[var(--t-badge-bg)] text-[var(--t-badge-text)] text-[11px] font-bold ${badgeClass}`}
        >
          -{discountPercent}%
        </span>
      )}

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
          className={imageFitClass}
          sizes="160px"
          loading="lazy"
        />
      </button>

      <div className="flex flex-col items-center gap-4 lg:gap-6 w-full">
        <div
          className="flex flex-col items-center gap-2 lg:gap-4 w-full"
          style={{ textAlign: 'var(--t-type-card-align, center)' } as unknown as React.CSSProperties}
        >
          <button
            type="button"
            className="bg-transparent border-none cursor-pointer p-0 w-full"
            onClick={onClick}
          >
            <p className="text-sm lg:text-base font-medium text-[var(--t-text-primary)] leading-6 line-clamp-2">
              {product.name}
            </p>
          </button>
          <p className={`tracking-[0.72px] ${priceConfig.className}`} style={priceConfig.style}>
            {currencySymbol}
            {new Intl.NumberFormat('en-US').format(product.price)}
          </p>
        </div>

        {(addToCartStyle === 'full-width' || addToCartStyle === 'on-hover-only') && (
          <button
            type="button"
            className={[
              buttonClass,
              'text-sm font-medium leading-6 rounded-[var(--t-radius-button)] px-8 lg:px-16 py-3 cursor-pointer border hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap w-full',
              addToCartStyle === 'on-hover-only'
                ? 'opacity-0 group-hover:opacity-100 touch-device-visible'
                : '',
            ].join(' ')}
            style={
              addToCartStyle === 'on-hover-only'
                ? ({ transitionDuration: 'var(--t-fx-duration, 200ms)' } as React.CSSProperties)
                : undefined
            }
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
        )}
      </div>

      {addToCartStyle === 'icon-button' && (
        <button
          type="button"
          className={`${buttonClass} absolute bottom-3 right-3 w-9 h-9 flex items-center justify-center rounded-[var(--t-radius-button)] cursor-pointer border hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed`}
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.();
          }}
          disabled={!product.inStock}
          aria-label={
            product.inStock ? `Agregar ${product.name} al carrito` : `${product.name} agotado`
          }
        >
          <ShoppingCart className="w-4 h-4" />
        </button>
      )}

      {addToCartStyle === 'floating-fab' && (
        <button
          type="button"
          className={`${buttonClass} absolute bottom-3 right-3 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer border-0 shadow-md hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed`}
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.();
          }}
          disabled={!product.inStock}
          aria-label={
            product.inStock ? `Agregar ${product.name} al carrito` : `${product.name} agotado`
          }
        >
          <ShoppingCart className="w-4 h-4" />
        </button>
      )}
    </article>
  );
}
