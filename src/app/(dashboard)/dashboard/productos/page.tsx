'use client'

import { useState, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Package,
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  ImageIcon,
} from 'lucide-react'
import { toast } from 'sonner'

import { useProducts, useCategories } from '@/app/(dashboard)/_hooks/use-repositories'
import { DataTable, EmptyState, ConfirmDialog } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Product } from '@/types/domain'

// ── Price formatter ──────────────────────────────────────────────────────────

const priceFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
})

function formatCOP(value: number): string {
  return priceFormatter.format(value)
}

// ── Availability filter type ─────────────────────────────────────────────────

type AvailabilityFilter = 'all' | 'available' | 'unavailable'

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ProductosPage() {
  const router = useRouter()

  // Filters state
  const [searchText, setSearchText] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [availabilityFilter, setAvailabilityFilter] = useState<AvailabilityFilter>('all')

  // Build product filters
  const filters = useMemo(() => {
    const f: { categoryId?: string; available?: boolean; search?: string } = {}
    if (categoryFilter !== 'all') f.categoryId = categoryFilter
    if (availabilityFilter === 'available') f.available = true
    if (availabilityFilter === 'unavailable') f.available = false
    if (searchText.trim()) f.search = searchText.trim()
    return f
  }, [categoryFilter, availabilityFilter, searchText])

  const {
    products,
    isLoading,
    toggleAvailable,
    toggleFeatured,
    remove,
  } = useProducts(undefined, filters)

  const { categories } = useCategories()

  // Delete state
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return
    setIsDeleting(true)
    const ok = await remove(deleteTarget.id)
    setIsDeleting(false)
    if (ok) {
      toast.success('Producto eliminado correctamente')
    } else {
      toast.error('No se pudo eliminar el producto')
    }
    setDeleteTarget(null)
  }, [deleteTarget, remove])

  const handleToggleAvailable = useCallback(
    async (id: string) => {
      const ok = await toggleAvailable(id)
      if (!ok) toast.error('No se pudo actualizar la disponibilidad')
    },
    [toggleAvailable]
  )

  const handleToggleFeatured = useCallback(
    async (id: string) => {
      const ok = await toggleFeatured(id)
      if (!ok) toast.error('No se pudo actualizar el producto destacado')
    },
    [toggleFeatured]
  )

  // Category name resolver
  const categoryMap = useMemo(() => {
    const map = new Map<string, string>()
    for (const cat of categories) {
      map.set(cat.id, cat.name)
    }
    return map
  }, [categories])

  // Column definitions
  const columns = useMemo(
    () => [
      {
        key: 'image',
        header: 'Imagen',
        className: 'w-16',
        render: (product: Product) => {
          const firstImage = product.images[0]
          return firstImage ? (
            <img
              src={firstImage.url}
              alt={product.name}
              className="size-10 rounded-md object-cover"
            />
          ) : (
            <div className="flex size-10 items-center justify-center rounded-md bg-muted">
              <ImageIcon className="size-4 text-muted-foreground" />
            </div>
          )
        },
      },
      {
        key: 'name',
        header: 'Nombre',
        render: (product: Product) => (
          <Link
            href={`/dashboard/productos/${product.id}`}
            className="font-medium text-foreground hover:underline"
          >
            {product.name}
          </Link>
        ),
      },
      {
        key: 'price',
        header: 'Precio',
        render: (product: Product) => (
          <span className="tabular-nums">{formatCOP(product.price)}</span>
        ),
      },
      {
        key: 'category',
        header: 'Categoría',
        render: (product: Product) =>
          categoryMap.get(product.category_id) ?? '—',
      },
      {
        key: 'available',
        header: 'Disponible',
        className: 'w-24',
        render: (product: Product) => (
          <Switch
            checked={product.available}
            onCheckedChange={() => handleToggleAvailable(product.id)}
            aria-label={`Disponible: ${product.name}`}
          />
        ),
      },
      {
        key: 'featured',
        header: 'Destacado',
        className: 'w-24',
        render: (product: Product) => (
          <Switch
            checked={product.featured}
            onCheckedChange={() => handleToggleFeatured(product.id)}
            aria-label={`Destacado: ${product.name}`}
          />
        ),
      },
      {
        key: 'actions',
        header: '',
        className: 'w-12',
        render: (product: Product) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label="Acciones">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/dashboard/productos/${product.id}`)
                }
              >
                <Pencil className="size-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={() => setDeleteTarget(product)}
              >
                <Trash2 className="size-4" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [categoryMap, handleToggleAvailable, handleToggleFeatured, router]
  )

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Productos</h1>
          <p className="text-sm text-muted-foreground">
            Administra el catálogo de tu tienda
          </p>
        </div>
        <Button
          onClick={() => router.push('/dashboard/productos/nuevo')}
          className="gap-1.5"
        >
          <Plus className="size-4" />
          Nuevo producto
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={availabilityFilter}
          onValueChange={(v) => setAvailabilityFilter(v as AvailabilityFilter)}
        >
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Disponibilidad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="available">Disponibles</SelectItem>
            <SelectItem value="unavailable">No disponibles</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={products}
        loading={isLoading}
        emptyState={
          <EmptyState
            icon={Package}
            title="Sin productos"
            description="Agrega tu primer producto para comenzar a vender."
            action={{
              label: 'Nuevo producto',
              onClick: () => router.push('/dashboard/productos/nuevo'),
            }}
          />
        }
      />

      {/* Delete confirmation */}
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null)
        }}
        title="Eliminar producto"
        description={`¿Estás seguro de que querés eliminar "${deleteTarget?.name ?? ''}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        onConfirm={handleDelete}
        variant="destructive"
        loading={isDeleting}
      />
    </div>
  )
}
