'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { OnboardingProvider, useOnboarding } from '@/onboarding/onboarding-provider'
import { OnboardingShell } from '@/components/onboarding/onboarding-shell'
import { Step1StoreInfo } from '@/components/onboarding/step1-store-info'
import { Step2CatalogMode } from '@/components/onboarding/step2-catalog-mode'
import { Step3VibeSelection } from '@/components/onboarding/step3-vibe-selection'
import { Step5Branding } from '@/components/onboarding/step5-branding'
import { CelebrationScreen } from '@/components/onboarding/celebration-screen'
import { completeOnboarding } from '@/app/(dashboard)/dashboard/_actions/store'
import { getTemplateIdForVibe } from '@/onboarding/vibe-preset-map'
import { ACCENT_HEX } from '@/shared/constants/accent-colors'

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
    default:
      return false
  }
}

function OnboardingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { state, resetState } = useOnboarding()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const stepParam = searchParams.get('step')
  const isCelebration = stepParam === 'celebration'
  const step = isCelebration ? 4 : Math.max(1, Math.min(4, Number(stepParam ?? '1')))

  if (isCelebration) {
    return <CelebrationScreen />
  }

  function handleNext() {
    if (step === 4) {
      handleCreateStore()
      return
    }
    router.push(`/onboarding?step=${step + 1}`)
  }

  function handleBack() {
    if (step > 1) router.push(`/onboarding?step=${step - 1}`)
  }

  async function handleCreateStore() {
    setIsSubmitting(true)
    setSubmitError(null)

    const templateId = getTemplateIdForVibe(state.selectedVibe)
    const whatsapp = `+57${state.whatsapp}`
    const catalogMode = state.catalogMode ?? 'simple'
    const primaryColor = state.accentColor ? ACCENT_HEX[state.accentColor] : undefined

    const result = await completeOnboarding({
      name: state.storeName,
      slug: state.slug,
      whatsapp,
      catalog_mode: catalogMode,
      templateId,
      vibeId: state.selectedVibe ?? undefined,
      primaryColor,
      logoUrl: state.logoUrl?.startsWith('https://') ? state.logoUrl : undefined,
    })

    if (!result.success) {
      console.error('[onboarding] completeOnboarding failed:', { code: result.error.code, message: result.error.message })

      if (result.error.code === 'UNAUTHORIZED') {
        router.push('/auth?redirectTo=/onboarding')
        return
      }

      if (result.error.code === 'SLUG_TAKEN') {
        setSubmitError('Ese nombre de tienda ya está tomado. Elegí otro nombre.')
        setIsSubmitting(false)
        router.push('/onboarding?step=1')
        return
      }

      setSubmitError(result.error.message)
      setIsSubmitting(false)
      return
    }

    sessionStorage.setItem('tiendri_tour_trigger', 'true')

    resetState()

    router.push('/onboarding?step=celebration')
  }

  const stepComponents: Record<number, React.ReactNode> = {
    1: <Step1StoreInfo />,
    2: <Step2CatalogMode />,
    3: <Step3VibeSelection />,
    4: <Step5Branding />,
  }

  return (
    <OnboardingShell
      currentStep={step}
      onNext={handleNext}
      onBack={handleBack}
      canProceed={canProceedForStep(step, state)}
      isSubmitting={isSubmitting}
      error={submitError}
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
