'use client'

import { useOnboarding } from '@/lib/onboarding/onboarding-provider'
import { VIBES } from '@/lib/onboarding/vibe-preset-map'
import type { VibeId } from '@/types/onboarding'
import { cn } from '@/lib/utils'

interface VibeCardProps {
  id: VibeId
  name: string
  description: string
  previewColors: [string, string, string]
  targetStores: string
  selected: boolean
  onSelect: () => void
}

function VibeCard({ id: _id, name, description, previewColors, targetStores, selected, onSelect }: VibeCardProps) {
  const tags = targetStores.split(',').map((t) => t.trim())

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
        <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-black flex items-center justify-center shrink-0">
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}

      <div className="flex gap-2">
        {previewColors.map((color, i) => (
          <span
            key={i}
            className="w-7 h-7 rounded-full border border-black/10 shrink-0"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      <div className="space-y-1.5">
        <p className="font-bold text-[#1A1A1A] text-lg leading-tight">{name}</p>
        <p className="text-sm text-[#6B6B6B] leading-snug">{description}</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 bg-gray-100 text-[#6B6B6B] rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </button>
  )
}

export function Step3VibeSelection() {
  const { state, updateField } = useOnboarding()

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-[#1A1A1A]">¿Cómo querés que se sienta tu tienda?</h2>
        <p className="text-[#6B6B6B] text-sm">
          Elegí el estilo que más te represente. Lo podés cambiar después.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {VIBES.map((vibe) => (
          <VibeCard
            key={vibe.id}
            id={vibe.id}
            name={vibe.name}
            description={vibe.description}
            previewColors={vibe.previewColors}
            targetStores={vibe.targetStores}
            selected={state.selectedVibe === vibe.id}
            onSelect={() => {
              updateField('selectedVibe', vibe.id)
              updateField('selectedPresetId', vibe.defaultPresetId)
            }}
          />
        ))}
      </div>
    </div>
  )
}
