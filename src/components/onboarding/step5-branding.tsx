'use client'

import { useState, useRef } from 'react'
import { useOnboarding } from '@/onboarding/onboarding-provider'
import { uploadStoreLogo } from '@/app/(dashboard)/dashboard/_actions'
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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  async function handleFile(file: File) {
    // Revoke previous object URL to free memory
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }

    // Show instant local preview — no waiting for upload
    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)
    setUploadError(null)
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const result = await uploadStoreLogo(formData)

      if (result.success) {
        // Store CDN URL in onboarding state (not base64)
        updateField('logoUrl', result.data.url)
      } else {
        setUploadError(result.error.message)
        // Discard preview and CDN URL on failure
        URL.revokeObjectURL(objectUrl)
        setPreviewUrl(null)
        updateField('logoUrl', null)
      }
    } finally {
      setIsUploading(false)
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) void handleFile(file)
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) void handleFile(file)
  }

  function handleRemoveLogo() {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
    setUploadError(null)
    updateField('logoUrl', null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const hasLogo = Boolean(previewUrl)

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

          {hasLogo ? (
            <div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border">
              {/* previewUrl is a local object URL — instant display, no network round-trip */}
              <img
                src={previewUrl!}
                alt="Logo de la tienda"
                className="w-16 h-16 object-contain rounded-lg border border-border"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {isUploading ? 'Subiendo...' : 'Logo subido'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isUploading ? 'Guardando en la nube...' : 'Se ve bien'}
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemoveLogo}
                disabled={isUploading}
                className="text-muted-foreground hover:text-foreground hover:bg-muted shrink-0"
              >
                Quitar
              </Button>
            </div>
          ) : (
            <>
              <div
                role="button"
                tabIndex={0}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
                className={cn(
                  'flex flex-col items-center justify-center gap-2 p-8 bg-card rounded-xl border-2 border-dashed border-border cursor-pointer transition-colors hover:border-foreground hover:bg-muted',
                  isUploading && 'opacity-60 pointer-events-none'
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
                <p className="text-sm font-medium text-foreground">Subí tu logo</p>
                <p className="text-xs text-muted-foreground text-center">
                  Arrastrá tu logo acá, o hacé clic para elegir uno
                </p>
                <p className="text-xs text-muted-foreground">PNG, JPG o WebP · Máx. 2 MB</p>
              </div>

              {uploadError && (
                <p className="text-xs text-destructive" role="alert">
                  {uploadError}
                </p>
              )}
            </>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="sr-only"
            onChange={handleFileChange}
            aria-label="Subir logo"
          />
        </div>
      </div>
    </div>
  )
}
