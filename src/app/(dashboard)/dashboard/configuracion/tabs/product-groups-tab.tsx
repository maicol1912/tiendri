'use client'

// ProductGroupsTab — Manage curated product groups (tabs or stacked mode).
// List view: display mode selector, sortable group list, add/delete groups.
// Editor view: group name, banner URL, product picker.
// Save: updateCustomizationSection('content', { productGroups: config })

import { useState } from 'react'
import { toast } from 'sonner'
import { Plus, Pencil, Trash2, ArrowLeft, Loader2, LayoutGrid, Rows3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { SortableList, DragHandle } from '@/components/shared/sortable-list'
import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import { ProductPicker } from '@/components/shared/product-picker'
import { MediaPickerField } from '@/components/dashboard/media'
import { productGroupsConfigSchema } from '@/shared/validators/product-groups.schema'
import type { ProductGroup, ProductGroupsConfig, ProductGroupDisplayMode } from '@/types/templates/product-groups'

interface PickerProduct {
  id: string
  name: string
  price: number
  images: Array<{ url: string | null }>
}

interface ProductGroupsCardProps {
  initialProductGroups?: ProductGroupsConfig
  products: PickerProduct[]
  onSave: (groups: ProductGroupsConfig) => Promise<void>
}

export function ProductGroupsCard({ initialProductGroups, products, onSave }: ProductGroupsCardProps) {
  const [groups, setGroups] = useState<ProductGroup[]>(initialProductGroups?.groups ?? [])
  const [displayMode, setDisplayMode] = useState<ProductGroupDisplayMode>(
    initialProductGroups?.displayMode ?? 'tabs'
  )
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  // ── Derived ────────────────────────────────────────────────────────────────

  const editingGroup = editingGroupId !== null
    ? groups.find((g) => g.id === editingGroupId) ?? null
    : null

  // ── Group mutations ────────────────────────────────────────────────────────

  function handleAddGroup() {
    const newGroup: ProductGroup = {
      id: crypto.randomUUID(),
      name: '',
      productIds: [],
      sortOrder: groups.length,
    }
    setGroups((prev) => [...prev, newGroup])
    setEditingGroupId(newGroup.id)
  }

  function handleDeleteGroup(id: string) {
    setGroups((prev) => prev.filter((g) => g.id !== id))
    setDeleteTarget(null)
    if (editingGroupId === id) setEditingGroupId(null)
  }

  function handleReorder(orderedIds: string[]) {
    setGroups((prev) => {
      const map = new Map(prev.map((g) => [g.id, g]))
      return orderedIds
        .map((id) => map.get(id))
        .filter((g): g is ProductGroup => g !== undefined)
    })
  }

  function handleUpdateEditingGroup(patch: Partial<ProductGroup>) {
    if (!editingGroupId) return
    setGroups((prev) =>
      prev.map((g) => (g.id === editingGroupId ? { ...g, ...patch } : g))
    )
  }

  // ── Save ───────────────────────────────────────────────────────────────────

  async function handleSave() {
    const config: ProductGroupsConfig = {
      displayMode,
      groups: groups.map((g, i) => ({ ...g, sortOrder: i })),
    }

    const result = productGroupsConfigSchema.safeParse(config)
    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? 'Datos inválidos')
      return
    }

    setIsSaving(true)
    try {
      await onSave(config)
      toast.success('Cambios guardados')
    } catch {
      toast.error('Error al guardar los cambios. Intentá de nuevo.')
    } finally {
      setIsSaving(false)
    }
  }

  // ── Editor view ────────────────────────────────────────────────────────────

  if (editingGroupId !== null && editingGroup) {
    return (
      <div className="space-y-6">
        {/* Back navigation */}
        <div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setEditingGroupId(null)}
            className="-ml-2"
          >
            <ArrowLeft className="mr-1.5 size-4" />
            Volver
          </Button>
        </div>

        {/* Group editor */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Editar grupo</CardTitle>
            <CardDescription>
              Configurá el nombre, banner y los productos de este grupo.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
              <Label htmlFor="group-name">Nombre del grupo</Label>
              <Input
                id="group-name"
                value={editingGroup.name}
                onChange={(e) => handleUpdateEditingGroup({ name: e.target.value })}
                placeholder="Nombre del grupo"
                maxLength={60}
              />
            </div>

            {/* Banner */}
            <div className="space-y-2">
              <Label>Banner (opcional)</Label>
              <MediaPickerField
                value={editingGroup.banner?.url ?? null}
                onChange={(url) => {
                  handleUpdateEditingGroup({
                    banner: url ? { url } : undefined,
                  })
                }}
                description="Se muestra encima de los productos en modo apilado."
              />
            </div>
          </CardContent>
        </Card>

        {/* Product picker */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Productos del grupo</CardTitle>
            <CardDescription>
              Seleccioná y ordená los productos que aparecen en este grupo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProductPicker
              selectedIds={editingGroup.productIds}
              onChange={(ids) => handleUpdateEditingGroup({ productIds: ids })}
              products={products}
            />
          </CardContent>
        </Card>

        {/* Save editor */}
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={() => {
              if (!editingGroup.name.trim()) {
                toast.error('El nombre del grupo es obligatorio')
                return
              }
              setEditingGroupId(null)
            }}
            className="min-w-32"
          >
            Guardar grupo
          </Button>
        </div>
      </div>
    )
  }

  // ── List view ──────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Display mode */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Grupos de Productos</CardTitle>
          <CardDescription>
            Organizá tus productos en grupos curados para mostrárselos a tus clientes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Modo de visualización</Label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setDisplayMode('tabs')}
                className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-colors ${
                  displayMode === 'tabs'
                    ? 'border-primary bg-primary/5 text-primary font-medium'
                    : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                }`}
              >
                <LayoutGrid className="size-4" />
                Pestañas
              </button>
              <button
                type="button"
                onClick={() => setDisplayMode('stacked')}
                className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-colors ${
                  displayMode === 'stacked'
                    ? 'border-primary bg-primary/5 text-primary font-medium'
                    : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                }`}
              >
                <Rows3 className="size-4" />
                Apilados
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Groups list */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Grupos</CardTitle>
              <CardDescription className="mt-1">
                Arrastrá para reordenar. Los grupos vacíos no se muestran en la vitrina.
              </CardDescription>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddGroup}
            >
              <Plus className="mr-1.5 size-4" />
              Agregar grupo
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {groups.length === 0 ? (
            <div className="rounded-md border border-dashed border-border py-8 text-center">
              <p className="text-sm text-muted-foreground">
                No tenés grupos creados todavía. Agregá el primero.
              </p>
            </div>
          ) : (
            <SortableList
              items={groups}
              onReorder={handleReorder}
              renderItem={(group, { listeners, attributes }) => (
                <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5">
                  <DragHandle listeners={listeners} attributes={attributes} />

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {group.name || <span className="text-muted-foreground italic">Sin nombre</span>}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {group.productIds.length} {group.productIds.length === 1 ? 'producto' : 'productos'}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setEditingGroupId(group.id)}
                      aria-label={`Editar ${group.name}`}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setDeleteTarget(group.id)}
                      aria-label={`Eliminar ${group.name}`}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              )}
            />
          )}
        </CardContent>
      </Card>

      {/* Save */}
      <div className="flex justify-end">
        <Button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="min-w-32"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Guardando...
            </>
          ) : (
            'Guardar cambios'
          )}
        </Button>
      </div>

      {/* Delete confirmation */}
      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null) }}
        title="¿Eliminar este grupo?"
        description="Esta acción no se puede deshacer. Los productos no se eliminarán, solo se quitarán del grupo."
        confirmText="Eliminar"
        variant="destructive"
        onConfirm={() => {
          if (deleteTarget) handleDeleteGroup(deleteTarget)
        }}
      />
    </div>
  )
}
