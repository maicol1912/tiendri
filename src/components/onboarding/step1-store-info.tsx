'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useOnboarding } from '@/onboarding/onboarding-provider'
import { step1Schema } from '@/shared/validators/onboarding.schema'

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 30)
}

export function Step1StoreInfo() {
  const { state, updateField } = useOnboarding()
  const [errors, setErrors] = useState<{ storeName?: string; whatsapp?: string }>({})

  useEffect(() => {
    const slug = toSlug(state.storeName)
    updateField('slug', slug)
  }, [state.storeName])

  function handleStoreNameChange(value: string) {
    updateField('storeName', value)
    const result = step1Schema.shape.storeName.safeParse(value)
    setErrors((prev) => ({
      ...prev,
      storeName: result.success ? undefined : result.error.issues[0].message,
    }))
  }

  function handleWhatsappChange(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 10)
    updateField('whatsapp', digits)
    const result = step1Schema.shape.whatsapp.safeParse(digits)
    setErrors((prev) => ({
      ...prev,
      whatsapp: result.success ? undefined : result.error.issues[0].message,
    }))
  }

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-[#1A1A1A]">¿Cómo se llama tu tienda?</h2>
        <p className="text-[#6B6B6B] text-sm">
          Este será el link que le mandás a tus clientes por WhatsApp.
        </p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="storeName" className="text-sm font-medium text-[#1A1A1A]">
            Nombre de tu tienda
          </Label>
          <Input
            id="storeName"
            value={state.storeName}
            onChange={(e) => handleStoreNameChange(e.target.value)}
            placeholder="Ej: Perfumería Valentina"
            className="h-12 text-base border-gray-200 focus-visible:ring-black"
            autoFocus
          />
          {errors.storeName && (
            <p className="text-xs text-neutral-600">{errors.storeName}</p>
          )}
          {state.slug && !errors.storeName && (
            <p className="text-xs text-[#6B6B6B]">
              Tu tienda quedará en{' '}
              <span className="font-medium text-[#1A1A1A]">tiendri.co/{state.slug}</span>
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="whatsapp" className="text-sm font-medium text-[#1A1A1A]">
            Número de WhatsApp
          </Label>
          <div className="flex h-12">
            <span className="flex items-center px-3 text-sm font-medium text-[#6B6B6B] bg-gray-100 border border-r-0 border-gray-200 rounded-l-md select-none">
              +57
            </span>
            <Input
              id="whatsapp"
              value={state.whatsapp}
              onChange={(e) => handleWhatsappChange(e.target.value)}
              placeholder="3001234567"
              inputMode="numeric"
              className="rounded-l-none h-full border-gray-200 focus-visible:ring-black"
            />
          </div>
          {errors.whatsapp && (
            <p className="text-xs text-neutral-600">{errors.whatsapp}</p>
          )}
        </div>
      </div>
    </div>
  )
}
