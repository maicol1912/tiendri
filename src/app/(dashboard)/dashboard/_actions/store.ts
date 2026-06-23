'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createClient } from '@/infrastructure/supabase/server'
import type { ActionResult, StoreMeta } from '@/types/domain'
import type { Json } from '@/infrastructure/database.types'

export interface ChecklistState {
  onboardingCompleted: boolean
  whatsappConnected: boolean
  hasProducts: boolean
}

export async function getChecklistState(): Promise<ChecklistState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { onboardingCompleted: false, whatsappConnected: false, hasProducts: false }
  }

  const { data: store } = await supabase
    .from('stores')
    .select('id, onboarding_completed, social_media')
    .eq('owner_id', user.id)
    .limit(1)
    .single()

  if (!store) {
    return { onboardingCompleted: false, whatsappConnected: false, hasProducts: false }
  }

  const socialMedia = store.social_media as Record<string, unknown> | null
  const whatsappConnected =
    typeof socialMedia?.whatsapp === 'string' && socialMedia.whatsapp.trim().length > 0

  const { count } = await supabase
    .from('products')
    .select('id', { count: 'exact', head: true })
    .eq('store_id', store.id)

  return {
    onboardingCompleted: store.onboarding_completed,
    whatsappConnected,
    hasProducts: (count ?? 0) > 0,
  }
}

// ── Validation schemas ────────────────────────────────────────────────────────

const completeOnboardingSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, 'El slug solo puede contener letras, números y guiones'),
  whatsapp: z.string().min(1, 'WhatsApp es requerido'),
  templateId: z.string().min(1, 'Seleccioná un template'),
  catalogMode: z.enum(['simple', 'nested']).optional(),
  vibeId: z.string().optional(),
})

// ── Auth-based store resolution ───────────────────────────────────────────────

export async function getStoreId(): Promise<string> {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new Error('UNAUTHORIZED')
  }

  const { data: store, error: storeError } = await supabase
    .from('stores')
    .select('id')
    .eq('owner_id', user.id)
    .limit(1)
    .single()

  if (storeError || !store) {
    throw new Error('STORE_NOT_FOUND')
  }

  return store.id
}

// ── Read ──────────────────────────────────────────────────────────────────────

/**
 * Fetches the demo store with its resolved currency code.
 * JOINs stores → currencies to get the ISO code (e.g. "COP").
 * Returns null if the store is not found.
 */
export async function getStore(): Promise<StoreMeta | null> {
  const supabase = await createClient()
  const storeId = await getStoreId()

  const { data, error } = await supabase
    .from('stores')
    .select('id, name, slug, catalog_mode, currencies(code)')
    .eq('id', storeId)
    .single()

  if (error || !data) return null

  const currency =
    data.currencies && !Array.isArray(data.currencies)
      ? (data.currencies as { code: string }).code
      : 'COP'

  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    catalog_mode: data.catalog_mode as 'simple' | 'nested',
    currency,
  }
}

// ── Update ─────────────────────────────────────────────────────────────────────

/**
 * Switches the catalog mode for the demo store.
 *
 * nested → simple: calls the DB function `switch_catalog_mode_to_simple` which
 *   atomically nullifies subcategory_id on all products, deletes all
 *   subcategories, and updates catalog_mode.
 *
 * simple → nested: straightforward UPDATE on stores.catalog_mode.
 *
 * Returns the updated StoreMeta on success.
 */
export async function updateCatalogMode(
  newMode: 'simple' | 'nested'
): Promise<ActionResult<StoreMeta>> {
  const supabase = await createClient()
  const storeId = await getStoreId()

  try {
    if (newMode === 'simple') {
      // Delegates cascade cleanup to the DB function defined in 010_functions_triggers.sql
      const { error: rpcError } = await supabase.rpc('switch_catalog_mode_to_simple', {
        target_store_id: storeId,
      })

      if (rpcError) {
        return {
          success: false,
          error: {
            code: 'DATABASE_ERROR',
            message: `No se pudo cambiar a modo simple: ${rpcError.message}`,
          },
        }
      }
    } else {
      // simple → nested: only update catalog_mode
      const { error: updateError } = await supabase
        .from('stores')
        .update({ catalog_mode: 'nested' })
        .eq('id', storeId)

      if (updateError) {
        return {
          success: false,
          error: {
            code: 'DATABASE_ERROR',
            message: `No se pudo cambiar a modo anidado: ${updateError.message}`,
          },
        }
      }
    }

    // Re-fetch updated store to return current state
    const updated = await getStore()
    if (!updated) {
      return {
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Tienda no encontrada después de actualizar.',
        },
      }
    }

    return { success: true, data: updated }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error desconocido'
    return {
      success: false,
      error: {
        code: 'DATABASE_ERROR',
        message: `Error al cambiar el modo de catálogo: ${message}`,
      },
    }
  }
}

// ── Onboarding completion ─────────────────────────────────────────────────────

export interface CompleteOnboardingInput {
  /** Store display name */
  name: string
  /** URL slug (unique) */
  slug: string
  /** WhatsApp number with country code, e.g. "+573001234567" */
  whatsapp: string
  /** Catalog mode chosen in onboarding step 2 */
  catalog_mode: 'simple' | 'nested'
  /** Template chosen via vibe selection */
  templateId: string
  /** Optional vibe id chosen in onboarding */
  vibeId?: string
  /** Optional accent color override (hex) */
  primaryColor?: string
  /** Optional logo URL */
  logoUrl?: string
}

/**
 * Atomically completes the onboarding flow by:
 * 1. Validating input with Zod.
 * 2. Updating the store's name, slug, catalog_mode, social_media, and template_id.
 * 3. Setting onboarding_completed = true on the store.
 * 4. Upserting store_appearance with theme (primary color) and branding (logo).
 *
 * Uses the authenticated user's store (owner_id = auth.uid()).
 * Returns UNAUTHORIZED if the user is not logged in or has no store.
 */
export async function completeOnboarding(
  input: CompleteOnboardingInput
): Promise<ActionResult<{ slug: string }>> {
  // ── 0. Validate input ─────────────────────────────────────────────────────
  const parsed = completeOnboardingSchema.safeParse({
    name: input.name,
    slug: input.slug,
    whatsapp: input.whatsapp,
    templateId: input.templateId,
    catalogMode: input.catalog_mode,
    vibeId: input.vibeId,
  })

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]
    return {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: firstError?.message ?? 'Datos de onboarding inválidos',
      },
    }
  }

  // ── 1. Resolve authenticated store ────────────────────────────────────────
  let storeId: string
  try {
    storeId = await getStoreId()
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error de autenticación'
    return {
      success: false,
      error: {
        code: message === 'UNAUTHORIZED' ? 'UNAUTHORIZED' : 'STORE_NOT_FOUND',
        message:
          message === 'UNAUTHORIZED'
            ? 'No estás autenticado.'
            : 'No se encontró tu tienda. Contactá soporte.',
      },
    }
  }

  const supabase = await createClient()

  // ── 2. Update stores table ────────────────────────────────────────────────
  const socialMedia: Json = { whatsapp: input.whatsapp }

  const { error: storeError } = await supabase
    .from('stores')
    .update({
      name: input.name,
      slug: input.slug,
      catalog_mode: input.catalog_mode,
      social_media: socialMedia,
      template_id: input.templateId,
      onboarding_completed: true,
    })
    .eq('id', storeId)

  if (storeError) {
    return {
      success: false,
      error: {
        code: 'DATABASE_ERROR',
        message: `Error al guardar la tienda: ${storeError.message}`,
      },
    }
  }

  // ── 3. Upsert store_appearance ────────────────────────────────────────────
  const themeUpdate: Json = input.primaryColor
    ? ({ colors: { primary: input.primaryColor } } as unknown as Json)
    : ({} as Json)

  const brandingUpdate: Json = input.logoUrl
    ? ({ logo: input.logoUrl } as unknown as Json)
    : ({} as Json)

  const { error: appearanceError } = await supabase
    .from('store_appearance')
    .upsert(
      {
        store_id: storeId,
        theme: themeUpdate,
        branding: brandingUpdate,
      },
      { onConflict: 'store_id' }
    )

  if (appearanceError) {
    return {
      success: false,
      error: {
        code: 'DATABASE_ERROR',
        message: `Error al guardar la apariencia de la tienda: ${appearanceError.message}`,
      },
    }
  }

  revalidatePath(`/${input.slug}`, 'layout')
  revalidatePath('/dashboard', 'layout')

  return { success: true, data: { slug: input.slug } }
}
