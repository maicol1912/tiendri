'use client'

import * as React from 'react'
import { Plus, Check, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SortableList, DragHandle } from '@/components/shared/sortable-list'
import { formatPrice } from '@/shared/format'
import { cn } from '@/shared/utils'

interface PickerProduct {
  id: string
  name: string
  price: number
  images: Array<{ url: string | null }>
}

interface ProductPickerProps {
  selectedIds: string[]
  onChange: (ids: string[]) => void
  products: PickerProduct[]
  maxItems?: number
}

function ProductThumbnail({ url, name }: { url: string | null | undefined; name: string }) {
  return (
    <div className="size-8 shrink-0 rounded overflow-hidden bg-muted border border-border">
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt={name} className="size-full object-cover" />
      ) : (
        <div className="size-full bg-muted" />
      )}
    </div>
  )
}

export function ProductPicker({
  selectedIds,
  onChange,
  products,
  maxItems,
}: ProductPickerProps) {
  const [search, setSearch] = React.useState('')

  const selectedSet = React.useMemo(() => new Set(selectedIds), [selectedIds])

  const filteredProducts = React.useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return products
    return products.filter((p) => p.name.toLowerCase().includes(term))
  }, [products, search])

  const selectedProducts = React.useMemo(
    () =>
      selectedIds
        .map((id) => products.find((p) => p.id === id))
        .filter((p): p is PickerProduct => p !== undefined),
    [selectedIds, products]
  )

  const canAdd = maxItems === undefined || selectedIds.length < maxItems

  const handleAdd = (id: string) => {
    if (selectedSet.has(id) || !canAdd) return
    onChange([...selectedIds, id])
  }

  const handleRemove = (id: string) => {
    onChange(selectedIds.filter((sid) => sid !== id))
  }

  const handleReorder = (orderedIds: string[]) => {
    onChange(orderedIds)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Available products */}
      <div className="flex flex-col gap-2">
        <div className="relative">
          <Input
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="rounded-md border border-border overflow-hidden">
          {products.length === 0 ? (
            <p className="px-3 py-4 text-sm text-muted-foreground text-center">
              No hay productos disponibles
            </p>
          ) : filteredProducts.length === 0 ? (
            <p className="px-3 py-4 text-sm text-muted-foreground text-center">
              No se encontraron productos
            </p>
          ) : (
            <ScrollArea className="max-h-64">
              <div className="flex flex-col divide-y divide-border">
                {filteredProducts.map((product) => {
                  const isSelected = selectedSet.has(product.id)
                  const thumbnailUrl = product.images[0]?.url ?? null

                  return (
                    <div
                      key={product.id}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2 transition-colors',
                        isSelected ? 'bg-muted/50' : 'hover:bg-muted/30'
                      )}
                    >
                      <ProductThumbnail url={thumbnailUrl} name={product.name} />

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{formatPrice(product.price)}</p>
                      </div>

                      {isSelected ? (
                        <div className="shrink-0 flex items-center justify-center size-7 rounded text-primary">
                          <Check className="size-4" />
                        </div>
                      ) : (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleAdd(product.id)}
                          disabled={!canAdd}
                          aria-label={`Agregar ${product.name}`}
                        >
                          <Plus className="size-4" />
                        </Button>
                      )}
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          )}
        </div>
      </div>

      {/* Selected products */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted-foreground">
          Seleccionados ({selectedIds.length}
          {maxItems !== undefined ? `/${maxItems}` : ''})
        </p>

        {selectedProducts.length === 0 ? (
          <p className="px-3 py-4 text-sm text-muted-foreground text-center rounded-md border border-dashed border-border">
            Seleccioná productos de la lista
          </p>
        ) : (
          <div className="rounded-md border border-border overflow-hidden">
            <SortableList
              items={selectedProducts}
              onReorder={handleReorder}
              renderItem={(product, { listeners, attributes }) => (
                <div className="flex items-center gap-3 px-3 py-2 bg-background hover:bg-muted/30 transition-colors">
                  <DragHandle listeners={listeners} attributes={attributes} />
                  <ProductThumbnail url={product.images[0]?.url ?? null} name={product.name} />
                  <p className="flex-1 min-w-0 text-sm font-medium truncate">{product.name}</p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => handleRemove(product.id)}
                    aria-label={`Quitar ${product.name}`}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              )}
            />
          </div>
        )}
      </div>
    </div>
  )
}
