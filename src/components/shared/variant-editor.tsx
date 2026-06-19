'use client'

import * as React from 'react'
import { X, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PriceInput } from '@/components/shared/price-input'
import type { UIProductVariant } from '@/types/domain/product'

interface VariantEditorProps {
  variants: UIProductVariant[]
  onChange: (variants: UIProductVariant[]) => void
}

function generateVariantId(): string {
  return `variant_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
}

export function VariantEditor({ variants, onChange }: VariantEditorProps) {
  const addVariant = () => {
    const newVariant: UIProductVariant = {
      id: generateVariantId(),
      name: '',
      priceModifier: 0,
    }
    onChange([...variants, newVariant])
  }

  const removeVariant = (id: string) => {
    onChange(variants.filter((v) => v.id !== id))
  }

  const updateName = (id: string, name: string) => {
    onChange(variants.map((v) => (v.id === id ? { ...v, name } : v)))
  }

  const updatePriceModifier = (id: string, priceModifier: number) => {
    onChange(variants.map((v) => (v.id === id ? { ...v, priceModifier } : v)))
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-foreground">Variantes</span>
        <span className="text-xs text-muted-foreground">
          Ej: Talla M (+$5.000), Color Rojo (-$2.000)
        </span>
      </div>

      {variants.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="hidden sm:grid grid-cols-[1fr_auto_auto] gap-2 px-1">
            <span className="text-xs font-medium text-muted-foreground">Nombre</span>
            <span className="text-xs font-medium text-muted-foreground">
              Modificador de precio
            </span>
            <span className="sr-only">Eliminar</span>
          </div>

          {variants.map((variant) => (
            <div
              key={variant.id}
              className="flex flex-col sm:grid sm:grid-cols-[1fr_auto_auto] gap-2 items-start sm:items-center rounded-lg border border-border bg-muted/30 p-3 sm:p-2 sm:bg-transparent sm:border-0 sm:rounded-none sm:border-b sm:border-border/50 last:border-b-0"
            >
              <div className="w-full">
                <span className="sm:hidden text-xs font-medium text-muted-foreground mb-1 block">
                  Nombre
                </span>
                <Input
                  value={variant.name}
                  onChange={(e) => updateName(variant.id, e.target.value)}
                  placeholder="Ej: Talla M"
                  aria-label="Nombre de variante"
                />
              </div>

              <div className="w-full sm:w-36">
                <span className="sm:hidden text-xs font-medium text-muted-foreground mb-1 block">
                  Modificador de precio
                </span>
                <PriceInput
                  value={variant.priceModifier}
                  onChange={(val) => updatePriceModifier(variant.id, val)}
                  allowNegative
                  placeholder="0"
                  aria-label="Modificador de precio"
                />
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => removeVariant(variant.id)}
                aria-label={`Eliminar variante ${variant.name || 'sin nombre'}`}
                className="text-muted-foreground hover:text-destructive self-end sm:self-center"
              >
                <X className="size-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addVariant}
        className="w-fit gap-1.5"
      >
        <Plus className="size-4" />
        Agregar variante
      </Button>
    </div>
  )
}
