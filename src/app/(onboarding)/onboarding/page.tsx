'use client'

import { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { OnboardingProvider, useOnboarding } from '@/lib/onboarding/onboarding-provider'
import { OnboardingShell } from '@/components/onboarding/onboarding-shell'
import { Step1StoreInfo } from '@/components/onboarding/step1-store-info'
import { Step2CatalogMode } from '@/components/onboarding/step2-catalog-mode'
import { Step3VibeSelection } from '@/components/onboarding/step3-vibe-selection'
import { Step5Branding } from '@/components/onboarding/step5-branding'
import { CelebrationScreen } from '@/components/onboarding/celebration-screen'
import { CUSTOMIZATION_STORAGE_KEY } from '@/app/(dashboard)/dashboard/configuracion/client-utils'
import { markOnboardingCompleted } from '@/lib/onboarding/first-time'
import type { AccentColor } from '@/types/onboarding'

const ACCENT_HEX: Record<AccentColor, string> = {
  rojo: '#EF4444',
  naranja: '#F97316',
  amarillo: '#EAB308',
  verde: '#22C55E',
  turquesa: '#14B8A6',
  azul: '#3B82F6',
  violeta: '#8B5CF6',
  rosa: '#EC4899',
  negro: '#171717',
  gris: '#6B7280',
  blanco: '#FFFFFF',
  cafe: '#92400E',
}

const WHATSAPP_REGEX = /^3\d{9}$/

function canProceedForStep(step: number, state: ReturnType<typeof useOnboarding>['state']): boolean {
  switch (step) {
    case 1:
      return (
        state.storeName.trim().length >= 3 &&
        WHATSAPP_REGEX.test(state.whatsapp) &&
        state.slug.length >= 3
      )
    case 2:
      return state.catalogMode !== null
    case 3:
      return state.selectedVibe !== null
    case 4:
      return true
    case 5:
      return true
    default:
      return false
  }
}

function OnboardingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { state, resetState } = useOnboarding()

  const stepParam = searchParams.get('step')
  const isCelebration = stepParam === 'celebration'
  const step = isCelebration ? 5 : Math.max(1, Math.min(5, Number(stepParam ?? '1')))

  if (isCelebration) {
    return <CelebrationScreen />
  }

  function handleNext() {
    if (step === 5) {
      handleCreateStore()
      return
    }
    router.push(`/onboarding?step=${step + 1}`)
  }

  function handleBack() {
    if (step > 1) router.push(`/onboarding?step=${step - 1}`)
  }

  function handleCreateStore() {
    const storeMeta = {
      name: state.storeName,
      slug: state.slug,
      whatsapp: `+57${state.whatsapp}`,
      catalog_mode: state.catalogMode ?? 'simple',
    }

    type PartialCustomization = {
      templateId: string
      theme?: { colors?: Record<string, string> }
      branding?: { logo?: string }
    }

    let customization: PartialCustomization = { templateId: 'tech-premium' }

    if (state.accentColor) {
      const hex = ACCENT_HEX[state.accentColor]
      customization = {
        ...customization,
        theme: {
          ...customization.theme,
          colors: {
            ...customization.theme?.colors,
            primary: hex,
          },
        },
      }
    }

    if (state.logoUrl) {
      customization = {
        ...customization,
        branding: {
          ...customization.branding,
          logo: state.logoUrl,
        },
      }
    }

    localStorage.setItem('tiendri_demo-store_store', JSON.stringify(storeMeta))
    localStorage.setItem(CUSTOMIZATION_STORAGE_KEY, JSON.stringify(customization))

    markOnboardingCompleted()
    sessionStorage.setItem('tiendri_tour_trigger', 'true')

    resetState()

    router.push('/onboarding?step=celebration')
  }

  const stepComponents: Record<number, React.ReactNode> = {
    1: <Step1StoreInfo />,
    2: <Step2CatalogMode />,
    3: <Step3VibeSelection />,
    4: <Step5Branding />,
    5: <Step5Branding />,
  }

  return (
    <OnboardingShell
      currentStep={step}
      onNext={handleNext}
      onBack={handleBack}
      canProceed={canProceedForStep(step, state)}
    >
      {stepComponents[step]}
    </OnboardingShell>
  )
}

export default function OnboardingPage() {
  return (
    <OnboardingProvider>
      <Suspense fallback={<div />}>
        <OnboardingContent />
      </Suspense>
    </OnboardingProvider>
  )
}
