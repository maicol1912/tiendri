export type VibeId = 'elegante' | 'moderno' | 'energetico' | 'calido' | 'catalogo'
export type CatalogMode = 'simple' | 'nested'
export type OnboardingStep = 1 | 2 | 3 | 4 | 5

export type AccentColor =
  | 'rojo'
  | 'naranja'
  | 'amarillo'
  | 'verde'
  | 'turquesa'
  | 'azul'
  | 'violeta'
  | 'rosa'
  | 'negro'
  | 'gris'
  | 'blanco'
  | 'cafe'

export interface OnboardingState {
  step: OnboardingStep
  storeName: string
  whatsapp: string
  slug: string
  catalogMode: CatalogMode | null
  selectedVibe: VibeId | null
  selectedPresetId: string | null
  accentColor: AccentColor | null
  logoUrl: string | null
}

export const INITIAL_ONBOARDING_STATE: OnboardingState = {
  step: 1,
  storeName: '',
  whatsapp: '',
  slug: '',
  catalogMode: null,
  selectedVibe: null,
  selectedPresetId: null,
  accentColor: null,
  logoUrl: null,
}
