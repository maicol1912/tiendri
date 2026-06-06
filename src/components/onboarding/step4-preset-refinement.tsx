'use client'

import { useOnboarding } from '@/lib/onboarding/onboarding-provider'
import { VIBE_CONFIGS } from '@/lib/onboarding/vibe-preset-map'
import { stylePresets } from '@/lib/presets/presets'
import { PresetPreviewCard } from './preset-preview-card'

export function Step4PresetRefinement() {
  const { state, updateField } = useOnboarding()

  const vibeConfig = state.selectedVibe ? VIBE_CONFIGS[state.selectedVibe] : null

  if (!vibeConfig) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#1A1A1A]">Afiná el look</h2>
        <p className="text-[#6B6B6B] text-sm">
          Primero seleccioná un estilo en el paso anterior.
        </p>
      </div>
    )
  }

  const presets = vibeConfig.presetIds
    .map((id) => stylePresets.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined)

  const selected = state.selectedPresetId ?? vibeConfig.defaultPresetId

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-[#1A1A1A]">Afiná el look</h2>
        <p className="text-[#6B6B6B] text-sm">
          Estas son las variantes de <span className="font-medium text-[#1A1A1A]">{vibeConfig.name}</span>. Elegí la que más te guste.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {presets.map((preset) => (
          <PresetPreviewCard
            key={preset.id}
            preset={preset}
            selected={selected === preset.id}
            onSelect={() => updateField('selectedPresetId', preset.id)}
          />
        ))}
      </div>
    </div>
  )
}
