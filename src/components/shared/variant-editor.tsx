'use client'

import { Trash2, Plus } from 'lucide-react'
import type { UIVariantGroup, UIVariantOption } from '@/types/domain'
import { PriceInput } from '@/components/shared/price-input'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface VariantGroupEditorProps {
  groups: UIVariantGroup[]
  onChange: (groups: UIVariantGroup[]) => void
}

function newOption(): UIVariantOption {
  return { id: crypto.randomUUID(), name: '', priceModifier: 0 }
}

export function VariantGroupEditor({ groups, onChange }: VariantGroupEditorProps) {
  // ── Group helpers ──────────────────────────────────────────────────────────
  const addGroup = () => {
    onChange([
      ...groups,
      {
        id: crypto.randomUUID(),
        name: '',
        isColor: false,
        options: [newOption()],
      },
    ])
  }

  const removeGroup = (groupId: string) => {
    onChange(groups.filter((g) => g.id !== groupId))
  }

  const updateGroupName = (groupId: string, name: string) => {
    onChange(groups.map((g) => (g.id === groupId ? { ...g, name } : g)))
  }

  const updateGroupIsColor = (groupId: string, isColor: boolean) => {
    onChange(groups.map((g) => (g.id === groupId ? { ...g, isColor } : g)))
  }

  // ── Option helpers ─────────────────────────────────────────────────────────
  const addOption = (groupId: string) => {
    onChange(
      groups.map((g) =>
        g.id === groupId ? { ...g, options: [...g.options, newOption()] } : g
      )
    )
  }

  const removeOption = (groupId: string, optionId: string) => {
    onChange(
      groups.map((g) =>
        g.id === groupId
          ? { ...g, options: g.options.filter((o) => o.id !== optionId) }
          : g
      )
    )
  }

  const updateOption = (
    groupId: string,
    optionId: string,
    patch: Partial<UIVariantOption>
  ) => {
    onChange(
      groups.map((g) =>
        g.id === groupId
          ? {
              ...g,
              options: g.options.map((o) =>
                o.id === optionId ? { ...o, ...patch } : o
              ),
            }
          : g
      )
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {groups.map((group) => (
        <div
          key={group.id}
          className="flex flex-col gap-3 rounded-lg border border-border bg-muted/20 p-4"
        >
          {/* Group header */}
          <div className="flex flex-wrap items-center gap-2">
            <Input
              value={group.name}
              onChange={(e) => updateGroupName(group.id, e.target.value)}
              placeholder="Ej: Color, Talla, Material"
              className="flex-1 min-w-[140px]"
              aria-label="Nombre del grupo de variantes"
            />
            <label className="flex items-center gap-1.5 text-sm text-muted-foreground cursor-pointer select-none">
              <input
                type="checkbox"
                checked={group.isColor}
                onChange={(e) => updateGroupIsColor(group.id, e.target.checked)}
                className="size-4 accent-primary"
              />
              Es tipo color
            </label>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => removeGroup(group.id)}
              aria-label={`Eliminar grupo ${group.name || 'sin nombre'}`}
              className="text-muted-foreground hover:text-destructive shrink-0"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-2 pl-1">
            {group.options.map((option) => (
              <div key={option.id} className="flex items-center gap-2">
                <Input
                  value={option.name}
                  onChange={(e) =>
                    updateOption(group.id, option.id, { name: e.target.value })
                  }
                  placeholder="Ej: Rojo, M, Cuero"
                  className="flex-1 min-w-0"
                  aria-label="Nombre de opción"
                />
                {group.isColor && (
                  <input
                    type="color"
                    value={option.hex ?? '#000000'}
                    onChange={(e) =>
                      updateOption(group.id, option.id, { hex: e.target.value })
                    }
                    className="size-9 cursor-pointer rounded border border-border bg-transparent p-0.5 shrink-0"
                    aria-label="Color de la opción"
                  />
                )}
                <div className="w-36 shrink-0">
                  <PriceInput
                    value={option.priceModifier}
                    onChange={(val) =>
                      updateOption(group.id, option.id, { priceModifier: val })
                    }
                    allowNegative
                    placeholder="0"
                    aria-label="Modificador de precio"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => removeOption(group.id, option.id)}
                  aria-label={`Eliminar opción ${option.name || 'sin nombre'}`}
                  className="text-muted-foreground hover:text-destructive shrink-0"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => addOption(group.id)}
              className="w-fit gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <Plus className="size-4" />
              Agregar opción
            </Button>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addGroup}
        className="w-fit gap-1.5"
      >
        <Plus className="size-4" />
        Agregar grupo de variantes
      </Button>
    </div>
  )
}

// Backward compat — remove once all callers are updated
export { VariantGroupEditor as VariantEditor }
