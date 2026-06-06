'use client'

import Image from 'next/image'
import type { CardLayoutProps } from './types'

function formatPrice(amount: number, currencySymbol: string): string {
  return `${currencySymbol}${new Intl.NumberFormat('en-US').format(amount)}`
}

export default function DarkElevated({
  product,
  currencySymbol,
  badgeClass,
  priceConfig,
  onClick,
}: CardLayoutProps) {
  const mainImage =
    product.images[0]?.url ?? (product as { image?: string }).image ?? ''

  const discountPct =
    product.originalPrice != null && product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : null

  return (
    <article
      className="max-w-sm w-full mx-auto flex flex-col cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={product.name}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick?.()
      }}
    >
      {/* Image card — light background, rounded */}
      <div
        className="relative aspect-square w-full overflow-hidden rounded-[var(--t-radius-card)] group"
        style={{ backgroundColor: 'var(--t-card-bg)' }}
      >
        {mainImage ? (
          <Image
            src={mainImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-contain p-2 transition-transform duration-[var(--t-fx-duration,200ms)] group-hover:scale-105"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: 'var(--t-card-bg)' }}
          >
            <span className="text-[var(--t-text-muted)] text-sm">Sin imagen</span>
          </div>
        )}

        {discountPct !== null && (
          <div
            className={`absolute top-2 left-2 px-2 py-0.5 ${badgeClass} text-xs font-bold leading-tight`}
            style={{
              backgroundColor: 'var(--t-badge-bg)',
              color: 'var(--t-badge-text)',
            }}
          >
            -{discountPct}%
          </div>
        )}
      </div>

      {/* Text below card — on dark page background */}
      <div className="mt-3 space-y-1">
        <p
          className="line-clamp-2 leading-tight"
          style={{
            fontSize: '13px',
            fontWeight: 500,
            color: 'var(--t-text-primary)',
            letterSpacing: '-0.26px',
          }}
        >
          {product.name}
        </p>

        <div className="flex items-baseline gap-2">
          <span className={priceConfig.className} style={priceConfig.style}>
            {formatPrice(product.price, currencySymbol)}
          </span>
          {product.originalPrice != null && product.originalPrice > product.price && (
            <span
              className="line-through"
              style={{
                fontSize: '11px',
                color: 'var(--t-text-muted)',
              }}
            >
              {formatPrice(product.originalPrice, currencySymbol)}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
