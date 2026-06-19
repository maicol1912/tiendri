const COMPLETED_KEY = 'tiendri_onboarding_completed'

export function isOnboardingCompleted(): boolean {
  if (typeof window === 'undefined') return true
  return localStorage.getItem(COMPLETED_KEY) === 'true'
}

export function markOnboardingCompleted(): void {
  localStorage.setItem(COMPLETED_KEY, 'true')
}

export function shouldRedirectToOnboarding(): boolean {
  return !isOnboardingCompleted()
}
