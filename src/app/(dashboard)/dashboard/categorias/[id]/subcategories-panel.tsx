'use client'

// SubcategoriesPanel — Task 5.4
// Only visible when catalog_mode === 'nested'.
// Sortable list + inline create/edit + delete with confirm.
// Max 20 subcategories per category.

import { useState, useCallback } from 'react'
import {
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  Info,
  Settings,
  Loader2,
} from 'lucide-react'
import { toast } from 'sonner'

import { useSubcategories } from '@/app/(dashboard)/_hooks/use-repositories'
import type { Subcategory, CreateSubcategoryInput } from '@/types/domain'
import { SortableList, DragHandle } from '@/components/shared'
import { ConfirmDialog } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'

const MAX_SUBCATEGORIES = 20

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

interface SubcategoriesPanelProps {
  categoryId: string
  catalogMode: 'simple' | 'nested'
}

export function SubcategoriesPanel({
  categoryId,
  catalogMode,
}: SubcategoriesPanelProps) {
  const {
    subcategories,
    isLoading,
    create,
    update,
    remove,
    reorder,
  } = useSubcategories(categoryId)

  const [newName, setNewName] = useState('')
  const [creating, setCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Subcategory | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const usagePercent = Math.round((subcategories.length / MAX_SUBCATEGORIES) * 100)
  const isNearLimit = subcategories.length >= MAX_SUBCATEGORIES - 3
  const isAtLimit = subcategories.length >= MAX_SUBCATEGORIES

  // Simple mode — show info box
  if (catalogMode === 'simple') {
    return (
      <Alert>
        <Info className="size-4" />
        <AlertTitle>Subcategorias desactivadas</AlertTitle>
        <AlertDescription>
          Cambia a modo <strong>nested</strong> en{' '}
          <span className="inline-flex items-center gap-1">
            <Settings className="inline size-3" /> Configuracion
          </span>{' '}
          para usar subcategorias.
        </AlertDescription>
      </Alert>
    )
  }

  // Handle inline create
  const handleCreate = async () => {
    const trimmed = newName.trim()
    if (trimmed.length < 2) {
      toast.error('El nombre debe tener al menos 2 caracteres')
      return
    }

    setCreating(true)
    const input: CreateSubcategoryInput = {
      name: trimmed,
      slug: toSlug(trimmed),
      category_id: categoryId,
    }
    const ok = await create(input)
    setCreating(false)

    if (ok) {
      toast.success(`Subcategoria "${trimmed}" creada`)
      setNewName('')
    } else {
      toast.error('No se pudo crear la subcategoria')
    }
  }

  // Handle inline edit
  const startEdit = (sub: Subcategory) => {
    setEditingId(sub.id)
    setEditName(sub.name)
  }

  const saveEdit = async () => {
    if (!editingId) return
    const trimmed = editName.trim()
    if (trimmed.length < 2) {
      toast.error('El nombre debe tener al menos 2 caracteres')
      return
    }

    setSaving(true)
    const ok = await update(editingId, {
      name: trimmed,
      slug: toSlug(trimmed),
    })
    setSaving(false)

    if (ok) {
      toast.success('Subcategoria actualizada')
      setEditingId(null)
    } else {
      toast.error('No se pudo actualizar la subcategoria')
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditName('')
  }

  // Handle delete
  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleteLoading(true)
    const ok = await remove(deleteTarget.id, 'delete')
    setDeleteLoading(false)
    if (ok) {
      toast.success(`Subcategoria "${deleteTarget.name}" eliminada`)
      setDeleteTarget(null)
    } else {
      toast.error('No se pudo eliminar la subcategoria')
    }
  }

  // Handle reorder
  const handleReorder = async (orderedIds: string[]) => {
    const ok = await reorder(orderedIds)
    if (!ok) {
      toast.error('No se pudo reordenar las subcategorias')
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <Skeleton className="mb-4 h-5 w-32" />
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            Subcategorias
          </h2>
          <p className="text-xs text-muted-foreground">
            {subcategories.length} de {MAX_SUBCATEGORIES}
          </p>
        </div>
      </div>

      {/* Progress bar when near limit */}
      {isNearLimit && (
        <div className="mb-4 space-y-1">
          <Progress value={usagePercent} />
          <p className="text-xs text-amber-600">
            {isAtLimit
              ? 'Llegaste al limite de subcategorias.'
              : `Quedan ${MAX_SUBCATEGORIES - subcategories.length} subcategorias disponibles.`}
          </p>
        </div>
      )}

      {/* Sortable list */}
      {subcategories.length > 0 && (
        <div className="mb-4">
          <SortableList
            items={subcategories}
            onReorder={(ids) => void handleReorder(ids)}
            renderItem={(sub, { listeners, attributes }) => (
              <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2.5">
                <DragHandle listeners={listeners} attributes={attributes} />

                {editingId === sub.id ? (
                  // Inline edit
                  <div className="flex flex-1 items-center gap-2">
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="h-8 text-sm"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') void saveEdit()
                        if (e.key === 'Escape') cancelEdit()
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => void saveEdit()}
                      disabled={saving}
                    >
                      {saving ? (
                        <Loader2 className="size-3 animate-spin" />
                      ) : (
                        <Check className="size-3" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={cancelEdit}
                      disabled={saving}
                    >
                      <X className="size-3" />
                    </Button>
                  </div>
                ) : (
                  // Display
                  <>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-foreground">
                        {sub.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        /{sub.slug}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => startEdit(sub)}
                    >
                      <Pencil className="size-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => setDeleteTarget(sub)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="size-3" />
                    </Button>
                  </>
                )}
              </div>
            )}
          />
        </div>
      )}

      {/* Empty state for subcategories */}
      {subcategories.length === 0 && (
        <p className="mb-4 text-sm text-muted-foreground">
          No hay subcategorias todavia. Agrega una debajo.
        </p>
      )}

      {/* Inline create */}
      {!isAtLimit && (
        <div className="flex items-center gap-2">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nombre de la subcategoria"
            className="h-9 text-sm"
            onKeyDown={(e) => {
              if (e.key === 'Enter') void handleCreate()
            }}
          />
          <Button
            size="sm"
            onClick={() => void handleCreate()}
            disabled={creating || !newName.trim()}
          >
            {creating ? (
              <Loader2 className="mr-1.5 size-4 animate-spin" />
            ) : (
              <Plus className="mr-1.5 size-4" />
            )}
            Agregar
          </Button>
        </div>
      )}

      {/* Delete confirm */}
      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null)
        }}
        title="Eliminar subcategoria"
        description={
          deleteTarget
            ? `Se eliminara la subcategoria "${deleteTarget.name}" y los productos asociados. Esta accion no se puede deshacer.`
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
