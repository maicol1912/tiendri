'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { INITIAL_ONBOARDING_STATE } from '@/types/domain/onboarding'
import type { OnboardingState, OnboardingStep } from '@/types/domain/onboarding'

const DRAFT_KEY = 'tiendri_onboarding_draft'

interface OnboardingContextValue {
  state: OnboardingState
  updateField: <K extends keyof OnboardingState>(field: K, value: OnboardingState[K]) => void
  goToStep: (step: OnboardingStep) => void
  resetState: () => void
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null)

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<OnboardingState>(() => {
    if (typeof window === 'undefined') return INITIAL_ONBOARDING_STATE
    const draft = localStorage.getItem(DRAFT_KEY)
    return draft ? (JSON.parse(draft) as OnboardingState) : INITIAL_ONBOARDING_STATE
  })

  useEffect(() => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(state))
  }, [state])

  function updateField<K extends keyof OnboardingState>(field: K, value: OnboardingState[K]) {
    setState((prev) => ({ ...prev, [field]: value }))
  }

  function goToStep(step: OnboardingStep) {
    setState((prev) => ({ ...prev, step }))
  }

  function resetState() {
    setState(INITIAL_ONBOARDING_STATE)
    localStorage.removeItem(DRAFT_KEY)
  }

  return (
    <OnboardingContext.Provider value={{ state, updateField, goToStep, resetState }}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding(): OnboardingContextValue {
  const ctx = useContext(OnboardingContext)
  if (!ctx) throw new Error('useOnboarding must be used inside OnboardingProvider')
  return ctx
}
