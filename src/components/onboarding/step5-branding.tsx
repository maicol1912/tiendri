'use client'

import { useRef } from 'react'
import { useOnboarding } from '@/onboarding/onboarding-provider'
import { useImageUpload } from '@/app/(dashboard)/_hooks/use-image-upload'
import type { AccentColor } from '@/types/domain/onboarding'
import { ACCENT_COLORS } from '@/shared/constants/accent-colors'
import { cn } from '@/shared/utils'
import { Button } from '@/components/ui/button'

interface ColorSwatch {
  id: AccentColor
  hex: string
  label: string
}

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
        swatch.id === 'blanco' && 'border-border'
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
        <h2 className="text-2xl font-bold text-foreground">Poné tu marca</h2>
        <p className="text-muted-foreground text-sm">
          El logo y la foto son opcionales. Lo importante es arrancar.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">Color de acento</p>
          <div className="grid grid-cols-6 gap-2 sm:grid-cols-6">
            {ACCENT_COLORS.map((swatch) => (
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
          <p className="text-sm font-medium text-foreground">Logo de tu tienda</p>

          {logoImage ? (
            <div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border">
              <img
                src={logoImage.dataUrl}
                alt="Logo de la tienda"
                className="w-16 h-16 object-contain rounded-lg border border-border"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">Logo subido</p>
                <p className="text-xs text-muted-foreground">Se ve bien</p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemoveLogo}
                className="text-muted-foreground hover:text-foreground hover:bg-muted shrink-0"
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
                'flex flex-col items-center justify-center gap-2 p-8 bg-card rounded-xl border-2 border-dashed border-border cursor-pointer transition-colors hover:border-foreground hover:bg-muted',
                isProcessing && 'opacity-60 pointer-events-none'
              )}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                className="text-muted-foreground"
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
              <p className="text-sm font-medium text-foreground">
                {isProcessing ? 'Procesando...' : 'Subí tu logo'}
              </p>
              <p className="text-xs text-muted-foreground text-center">
                Arrastrá tu logo acá, o hacé clic para elegir uno
              </p>
              <p className="text-xs text-muted-foreground">PNG, JPG o WebP · Máx. 5 MB</p>
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
