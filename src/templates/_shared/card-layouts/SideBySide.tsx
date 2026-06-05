'use client';

import Image from 'next/image';
import type { CardLayoutProps } from './types';

export default function CardSideBySide({
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
      className={`${hoverFxClass} ${cardBorderClass} rounded-[var(--t-radius-base)] flex flex-row min-w-0 w-full mx-auto overflow-hidden`}
    >
      <button
        type="button"
        className="relative w-[40%] shrink-0 bg-transparent border-none cursor-pointer p-0 aspect-square"
        onClick={onClick}
        aria-label={`Ver ${product.name}`}
      >
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className={`${imageFitClass}`}
          sizes="(max-width: 768px) 40vw, 20vw"
          loading="lazy"
        />
        {discountPercent !== null && (
          <span
            className={`absolute top-2 left-2 px-2 py-0.5 bg-[var(--t-badge-bg)] text-[var(--t-badge-text)] text-[11px] font-bold ${badgeClass}`}
          >
            -{discountPercent}%
          </span>
        )}
      </button>

      <div
        className="flex flex-col justify-center gap-3 w-[60%]"
        style={{ padding: 'var(--t-card-padding, 1rem)' }}
      >
        <button
          type="button"
          className="bg-transparent border-none cursor-pointer p-0 text-left"
          onClick={onClick}
        >
          <p className="text-sm font-medium text-[var(--t-text-primary)] leading-5 line-clamp-2">
            {product.name}
          </p>
        </button>

        {product.description && (
          <p className="text-xs text-[var(--t-text-secondary)] leading-4 line-clamp-2">
            {product.description}
          </p>
        )}

        <p className={`tracking-[0.72px] ${priceConfig.className}`} style={priceConfig.style}>
          {currencySymbol}
          {new Intl.NumberFormat('en-US').format(product.price)}
        </p>

        <button
          type="button"
          className={`${buttonClass} text-xs font-medium leading-6 rounded-[var(--t-radius-button)] px-4 py-2 cursor-pointer border hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap`}
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
