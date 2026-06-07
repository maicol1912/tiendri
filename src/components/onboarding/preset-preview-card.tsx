'use client'

import { cn } from '@/lib/utils'
import type { StylePreset } from '@/lib/presets/preset-types'

interface PresetPreviewCardProps {
  preset: StylePreset
  selected: boolean
  onSelect: () => void
}

const DENSITY_LABEL: Record<string, string> = {
  compact: 'Compacto',
  balanced: 'Equilibrado',
  spacious: 'Espacioso',
}

export function PresetPreviewCard({ preset, selected, onSelect }: PresetPreviewCardProps) {
  const densityLabel = preset.layout.density ? DENSITY_LABEL[preset.layout.density] ?? '' : ''

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

      <div className="space-y-1">
        <p className="font-bold text-[#1A1A1A] text-base leading-tight">{preset.name}</p>
        <p className="text-sm text-[#6B6B6B] leading-snug">{preset.description}</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {preset.targetStores.map((store) => (
          <span
            key={store}
            className="text-xs px-2 py-0.5 bg-gray-100 text-[#6B6B6B] rounded-full"
          >
            {store}
          </span>
        ))}
      </div>

      {densityLabel && (
        <p className="text-xs text-[#6B6B6B]">{densityLabel}</p>
      )}
    </button>
  )
}
