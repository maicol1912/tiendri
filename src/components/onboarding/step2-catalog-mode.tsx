'use client'

import { useOnboarding } from '@/onboarding/onboarding-provider'
import type { CatalogMode } from '@/types/domain/onboarding'
import { cn } from '@/shared/utils'

interface ModeCardProps {
  mode: CatalogMode
  selected: boolean
  onSelect: () => void
  icon: React.ReactNode
  title: string
  description: string
  example: string
}

function ModeCard({ mode: _mode, selected, onSelect, icon, title, description, example }: ModeCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'relative flex flex-col gap-3 p-5 bg-white rounded-xl border-2 text-left transition-all duration-150 w-full',
        selected
          ? 'border-black shadow-sm'
          : 'border-gray-200 hover:border-gray-300'
      )}
    >
      {selected && (
        <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-black flex items-center justify-center">
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}

      <span className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-[#1A1A1A]">
        {icon}
      </span>

      <div className="space-y-1">
        <p className="font-semibold text-[#1A1A1A] text-base">{title}</p>
        <p className="text-sm text-[#6B6B6B]">{description}</p>
        <p className="text-xs text-[#6B6B6B] mt-1">{example}</p>
      </div>
    </button>
  )
}

const GridIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="1" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="12" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="1" y="12" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="12" y="12" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

const TreeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="3" r="2" stroke="currentColor" strokeWidth="1.5" />
    <line x1="10" y1="5" x2="10" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="10" y1="9" x2="4" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="10" y1="9" x2="16" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="4" cy="14" r="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="16" cy="14" r="2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

export function Step2CatalogMode() {
  const { state, updateField } = useOnboarding()

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-[#1A1A1A]">¿Cómo organizás tus productos?</h2>
        <p className="text-[#6B6B6B] text-sm">
          Esto lo podés cambiar después si cambiás de idea.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ModeCard
          mode="simple"
          selected={state.catalogMode === 'simple'}
          onSelect={() => updateField('catalogMode', 'simple')}
          icon={<GridIcon />}
          title="Directo"
          description="Ideal si tenés pocas categorías o todos son del mismo tipo."
          example="Ej: perfumería, panadería, barbería"
        />
        <ModeCard
          mode="nested"
          selected={state.catalogMode === 'nested'}
          onSelect={() => updateField('catalogMode', 'nested')}
          icon={<TreeIcon />}
          title="Por secciones"
          description="Ideal para tiendas con muchos tipos de producto."
          example="Ej: ferretería, ropa (mujer/hombre/niños)"
        />
      </div>
    </div>
  )
}
