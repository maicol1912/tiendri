'use client'

import { useRef } from 'react'
import { useOnboarding } from '@/onboarding/onboarding-provider'
import { useImageUpload } from '@/app/(dashboard)/_hooks/use-image-upload'
import type { AccentColor } from '@/types/domain/onboarding'
import { cn } from '@/shared/utils'
import { Button } from '@/components/ui/button'

interface ColorSwatch {
  id: AccentColor
  hex: string
  label: string
}

const SWATCHES: ColorSwatch[] = [
  { id: 'rojo', hex: '#EF4444', label: 'Rojo' },
  { id: 'naranja', hex: '#F97316', label: 'Naranja' },
  { id: 'amarillo', hex: '#EAB308', label: 'Amarillo' },
  { id: 'verde', hex: '#22C55E', label: 'Verde' },
  { id: 'turquesa', hex: '#14B8A6', label: 'Turquesa' },
  { id: 'azul', hex: '#3B82F6', label: 'Azul' },
  { id: 'violeta', hex: '#8B5CF6', label: 'Violeta' },
  { id: 'rosa', hex: '#EC4899', label: 'Rosa' },
  { id: 'negro', hex: '#171717', label: 'Negro' },
  { id: 'gris', hex: '#6B7280', label: 'Gris' },
  { id: 'blanco', hex: '#FFFFFF', label: 'Blanco' },
  { id: 'cafe', hex: '#92400E', label: 'Café' },
]

interface SwatchButtonProps {
  swatch: ColorSwatch
  selected: boolean
  onSelect: () => void
}

function SwatchButton({ swatch, selected, onSelect }: SwatchButtonProps) {
  const isLight = swatch.id === 'blanco' || swatch.id === 'amarillo'

  return (
    <button
      type="button"
      onClick={onSelect}
      title={swatch.label}
      className={cn(
        'w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-150',
        selected ? 'border-black scale-110 shadow-md' : 'border-transparent hover:scale-105',
        swatch.id === 'blanco' && 'border-gray-200'
      )}
      style={{ backgroundColor: swatch.hex }}
      aria-label={swatch.label}
      aria-pressed={selected}
    >
      {selected && (
        <svg
          width="14"
          height="11"
          viewBox="0 0 14 11"
          fill="none"
          className={isLight ? 'text-gray-800' : 'text-white'}
        >
          <path
            d="M1 5.5L5 9.5L13 1.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  )
}

export function Step5Branding() {
  const { state, updateField } = useOnboarding()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { images, addImage, removeImage, isProcessing } = useImageUpload({ maxImages: 1 })

  const logoImage = images[0]

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const error = await addImage(file)
    if (!error) {
      const reader = new FileReader()
      reader.onload = () => {
        updateField('logoUrl', reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (!file) return
    addImage(file).then((error) => {
      if (!error) {
        const reader = new FileReader()
        reader.onload = () => {
          updateField('logoUrl', reader.result as string)
        }
        reader.readAsDataURL(file)
      }
    })
  }

  function handleRemoveLogo() {
    if (logoImage) removeImage(logoImage.id)
    updateField('logoUrl', null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-[#1A1A1A]">Poné tu marca</h2>
        <p className="text-[#6B6B6B] text-sm">
          El logo y la foto son opcionales. Lo importante es arrancar.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm font-medium text-[#1A1A1A]">Color de acento</p>
          <div className="grid grid-cols-6 gap-2 sm:grid-cols-6">
            {SWATCHES.map((swatch) => (
              <SwatchButton
                key={swatch.id}
                swatch={swatch}
                selected={state.accentColor === swatch.id}
                onSelect={() => updateField('accentColor', swatch.id)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-[#1A1A1A]">Logo de tu tienda</p>

          {logoImage ? (
            <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200">
              <img
                src={logoImage.dataUrl}
                alt="Logo de la tienda"
                className="w-16 h-16 object-contain rounded-lg border border-gray-100"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#1A1A1A] truncate">Logo subido</p>
                <p className="text-xs text-[#6B6B6B]">Se ve bien</p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemoveLogo}
                className="text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 shrink-0"
              >
                Quitar
              </Button>
            </div>
          ) : (
            <div
              role="button"
              tabIndex={0}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
              className={cn(
                'flex flex-col items-center justify-center gap-2 p-8 bg-white rounded-xl border-2 border-dashed border-gray-200 cursor-pointer transition-colors hover:border-black hover:bg-neutral-50',
                isProcessing && 'opacity-60 pointer-events-none'
              )}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                className="text-gray-400"
                aria-hidden="true"
              >
                <path
                  d="M16 4V20M16 4L10 10M16 4L22 10M6 24H26"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-sm font-medium text-[#1A1A1A]">
                {isProcessing ? 'Procesando...' : 'Subí tu logo'}
              </p>
              <p className="text-xs text-[#6B6B6B] text-center">
                Arrastrá tu logo acá, o hacé clic para elegir uno
              </p>
              <p className="text-xs text-[#6B6B6B]">PNG, JPG o WebP · Máx. 5 MB</p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleFileChange}
            aria-label="Subir logo"
          />
        </div>
      </div>
    </div>
  )
}
