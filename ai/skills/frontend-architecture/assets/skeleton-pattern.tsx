import { Skeleton } from '@/components/ui/skeleton'

/**
 * Skeleton para grilla de productos.
 * DEBE reflejar el layout final para evitar CLS.
 * Nunca usar un spinner genérico centrado.
 */
export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col overflow-hidden rounded-lg border">
          <Skeleton className="aspect-square w-full" />
          <div className="flex flex-col gap-2 p-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-5 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * Skeleton para detalle de producto
 */
export function ProductDetailSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Skeleton className="aspect-square w-full rounded-lg" />
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  )
}
