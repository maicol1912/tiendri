import type { VibeId } from '@/types/domain/onboarding'

interface VibeEntry {
  id: VibeId
  name: string
  description: string
  defaultTemplateId: string
  previewColors: [string, string, string]
  targetStores: string
}

const VIBE_CONFIGS: Record<VibeId, VibeEntry> = {
  elegante: {
    id: 'elegante',
    name: 'Elegante',
    description: 'Sofisticada. Que tus productos brillen en silencio.',
    defaultTemplateId: 'beauty-elegant',
    previewColors: ['#1a1a2e', '#c9a96e', '#f5f5f0'],
    targetStores: 'Joyería, boutique, beauty',
  },
  moderno: {
    id: 'moderno',
    name: 'Moderno',
    description: 'Limpia, digital, directa. Como las marcas grandes.',
    defaultTemplateId: 'tech-premium',
    previewColors: ['#0a0a0a', '#6366f1', '#ffffff'],
    targetStores: 'Tecnología, moda juvenil, gaming',
  },
  energetico: {
    id: 'energetico',
    name: 'Energético',
    description: 'Colores, movimiento y alegría. Colombia viva.',
    defaultTemplateId: 'fashion',
    previewColors: ['#ff6b35', '#ffc107', '#00c853'],
    targetStores: 'Ropa deportiva, moda caribeña, merch',
  },
  calido: {
    id: 'calido',
    name: 'Cálido',
    description: 'Con historia y alma. Hecha a mano, sentida de verdad.',
    defaultTemplateId: 'decor-warm',
    previewColors: ['#8b6914', '#d4a574', '#f5ebe0'],
    targetStores: 'Artesanías, café especial, vintage',
  },
  catalogo: {
    id: 'catalogo',
    name: 'Catálogo',
    description: 'Sin adornos. Tus productos, el precio, el pedido.',
    defaultTemplateId: 'furniture-light',
    previewColors: ['#ffffff', '#333333', '#e53935'],
    targetStores: 'Abarrotes, ferretería, B2B',
  },
}

export const VIBES = Object.values(VIBE_CONFIGS)

export function getTemplateIdForVibe(vibeId: VibeId | null): string {
  if (!vibeId) return 'tech-premium'
  return VIBE_CONFIGS[vibeId].defaultTemplateId
}
