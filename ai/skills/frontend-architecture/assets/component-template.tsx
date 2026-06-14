import { cn } from '@/lib/utils'

export interface ProductCardProps {
  name: string
  price: number
  image: string | null
  available?: boolean
  featured?: boolean
  className?: string
  onClick?: () => void
}

export function ProductCard({
  name,
  price,
  image,
  available = true,
  featured = false,
  className,
  onClick,
}: ProductCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!available}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-[var(--store-radius-card)]',
        'bg-[var(--store-surface)] border border-[var(--store-border)]',
        'transition-shadow duration-200',
        'hover:shadow-md',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--store-primary)]',
        className
      )}
    >
      {/* Image */}
      <div className="aspect-square w-full overflow-hidden bg-[var(--store-surface-alt)]">
        {image ? (
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[var(--store-text-muted)]">
            Sin imagen
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="font-[var(--store-font-body)] text-sm font-medium text-[var(--store-text)] line-clamp-2">
          {name}
        </h3>
        <p className="font-[var(--store-font-display)] text-base font-semibold text-[var(--store-primary)]">
          {new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
          }).format(price)}
        </p>
      </div>

      {/* Featured badge */}
      {featured && (
        <span className="absolute top-2 right-2 rounded-full bg-[var(--store-primary)] px-2 py-0.5 text-xs font-medium text-white">
          Destacado
        </span>
      )}
    </button>
  )
}
