'use client'

// Categories List Page — Task 5.1
// Displays categories as sortable cards with icon, name, image, and product count.
// Supports DnD reorder, create via sheet, edit/delete via dropdown.

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  FolderOpen,
  ImageIcon,
} from 'lucide-react'
import { toast } from 'sonner'

import { useCategories } from '@/app/(dashboard)/_hooks/use-repositories'
import { getStoreId, getProductRepository } from '@/infrastructure/repositories'
import type { Category } from '@/types/domain'
import { SortableList, DragHandle } from '@/components/shared'
import { ConfirmDialog } from '@/components/shared'
import { EmptyState } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CreateCategorySheet } from './create-category-sheet'
import { CategoryIconComponent } from './category-icon'

export default function CategoriasPage() {
  const router = useRouter()
  const storeId = getStoreId()
  const { categories, isLoading, reorder, remove, refresh } = useCategories(storeId)

  const [sheetOpen, setSheetOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [productCounts, setProductCounts] = useState<Record<string, number>>({})

  // Load product counts for each category
  const loadProductCounts = useCallback(async (cats: Category[]) => {
    const productRepo = getProductRepository()
    const counts: Record<string, number> = {}
    for (const cat of cats) {
      counts[cat.id] = await productRepo.countByCategory(storeId, cat.id)
    }
    setProductCounts(counts)
  }, [storeId])

  // Load counts when categories change
  useEffect(() => {
    if (categories.length > 0) {
      void loadProductCounts(categories)
    }
  }, [categories, loadProductCounts])

  const handleReorder = useCallback(
    async (orderedIds: string[]) => {
      const ok = await reorder(orderedIds)
      if (!ok) {
        toast.error('No se pudo reordenar las categorias')
      }
    },
    [reorder]
  )

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return
    setDeleteLoading(true)
    const ok = await remove(deleteTarget.id)
    setDeleteLoading(false)
    if (ok) {
      toast.success(`Categoria "${deleteTarget.name}" eliminada`)
      setDeleteTarget(null)
      void loadProductCounts(categories.filter((c) => c.id !== deleteTarget.id))
    } else {
      toast.error('No se pudo eliminar la categoria')
    }
  }, [deleteTarget, remove, categories, loadProductCounts])

  const handleCreated = useCallback(() => {
    setSheetOpen(false)
    void refresh().then(() => {
      void loadProductCounts(categories)
    })
  }, [refresh, loadProductCounts, categories])

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-7 w-40" />
            <Skeleton className="mt-1.5 h-4 w-60" />
          </div>
          <Skeleton className="h-9 w-36" />
        </div>
        <div className="grid gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Categorias</h1>
          <p className="text-sm text-muted-foreground">
            Organiza tus productos en categorias para facilitar la navegacion.
          </p>
        </div>
        {categories.length > 0 && (
          <Button onClick={() => setSheetOpen(true)} size="sm">
            <Plus className="mr-1.5 size-4" />
            Nueva categoria
          </Button>
        )}
      </div>

      {/* Empty State */}
      {categories.length === 0 ? (
        <EmptyState
          icon={FolderOpen}
          title="No tenes categorias todavia"
          description="Crea tu primera categoria para empezar a organizar tus productos."
          action={{
            label: 'Crear categoria',
            onClick: () => setSheetOpen(true),
          }}
        />
      ) : (
        /* Category Cards — Sortable */
        <SortableList
          items={categories}
          onReorder={(ids) => void handleReorder(ids)}
          renderItem={(category, { listeners, attributes }) => (
            <div className="flex items-center gap-3 rounded-xl border bg-card p-4 shadow-sm transition-colors hover:bg-accent/50">
              <DragHandle listeners={listeners} attributes={attributes} />

              {/* Icon */}
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <CategoryIconComponent name={category.icon} className="size-5" />
              </div>

              {/* Image thumbnail */}
              {category.image ? (
                <div className="hidden size-10 shrink-0 overflow-hidden rounded-lg sm:block">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="size-full object-cover"
                  />
                </div>
              ) : (
                <div className="hidden size-10 shrink-0 items-center justify-center rounded-lg bg-muted sm:flex">
                  <ImageIcon className="size-4 text-muted-foreground" />
                </div>
              )}

              {/* Name + slug */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {category.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  /{category.slug}
                </p>
              </div>

              {/* Product count */}
              <span className="hidden text-xs text-muted-foreground sm:block">
                {productCounts[category.id] ?? 0} producto
                {(productCounts[category.id] ?? 0) !== 1 ? 's' : ''}
              </span>

              {/* Actions */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon-xs">
                    <MoreHorizontal className="size-4" />
                    <span className="sr-only">Acciones</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/dashboard/categorias/${category.id}`)
                    }
                  >
                    <Pencil className="mr-2 size-4" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => setDeleteTarget(category)}
                  >
                    <Trash2 className="mr-2 size-4" />
                    Eliminar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        />
      )}

      {/* Create Sheet */}
      <CreateCategorySheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        storeId={storeId}
        onCreated={handleCreated}
      />

      {/* Delete Confirm */}
      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null)
        }}
        title="Eliminar categoria"
        description={
          deleteTarget
            ? `Se eliminara la categoria "${deleteTarget.name}" y ${
                productCounts[deleteTarget.id] ?? 0
              } producto(s) asociado(s). Esta accion no se puede deshacer.`
            : ''
        }
        confirmText="Eliminar"
        variant="destructive"
        onConfirm={handleDelete}
        loading={deleteLoading}
      />
    </div>
  )
}
