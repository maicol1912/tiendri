'use client'

import { type StorefrontVariantGroup, type StorefrontVariantOption } from '@/types/domain/store'

interface VariantSelectorProps {
  groups: StorefrontVariantGroup[]
  selections: Record<string, StorefrontVariantOption>
  onSelect: (groupId: string, option: StorefrontVariantOption) => void
}

const priceFormatter = new Intl.NumberFormat('es-CO')

export default function VariantSelector({ groups, selections, onSelect }: VariantSelectorProps) {
  const validGroups = groups
    .map(g => ({ ...g, options: g.options.filter(o => o.label?.trim()) }))
    .filter(g => g.options.length > 0)

  if (validGroups.length === 0) return null

  return (
    <div className="flex flex-col gap-5">
      {validGroups.map((group) => (
        <div key={group.id} className="flex flex-col gap-2">
          <span className="text-sm font-medium" style={{ color: 'var(--t-foreground)' }}>
            {group.label}
          </span>

          {group.type === 'color' ? (
            /* Swatches circulares para grupos de color */
            <div className="flex flex-wrap gap-3">
              {group.options.map((option) => {
                const isSelected = selections[group.id]?.id === option.id
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => onSelect(group.id, option)}
                    aria-pressed={isSelected}
                    aria-label={`${option.label}${option.priceModifier && option.priceModifier > 0 ? ` (+$${priceFormatter.format(option.priceModifier)})` : ''}`}
                    className="flex flex-col items-center gap-1"
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    <span
                      className="w-10 h-10 rounded-full block"
                      style={{
                        backgroundColor: option.value ?? '#ccc',
                        outline: isSelected ? '2px solid var(--t-primary)' : '2px solid transparent',
                        outlineOffset: '2px',
                        border: '1px solid var(--t-border)',
                      }}
                    />
                    <span className="text-xs" style={{ color: 'var(--t-muted)' }}>
                      {option.label}
                      {option.priceModifier && option.priceModifier > 0
                        ? ` (+$${priceFormatter.format(option.priceModifier)})`
                        : ''}
                    </span>
                  </button>
                )
              })}
            </div>
          ) : (
            /* Pills para grupos de talla, almacenamiento u otros */
            <div className="flex flex-wrap gap-2">
              {group.options.map((option) => {
                const isSelected = selections[group.id]?.id === option.id
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => onSelect(group.id, option)}
                    aria-pressed={isSelected}
                    className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
                    style={{
                      background: isSelected ? 'var(--t-primary)' : 'transparent',
                      color: isSelected ? 'var(--t-primary-foreground)' : 'var(--t-foreground)',
                      border: `1px solid ${isSelected ? 'var(--t-primary)' : 'var(--t-border)'}`,
                      cursor: 'pointer',
                    }}
                  >
                    {option.priceModifier && option.priceModifier > 0
                      ? `${option.label} (+$${priceFormatter.format(option.priceModifier)})`
                      : option.label}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
