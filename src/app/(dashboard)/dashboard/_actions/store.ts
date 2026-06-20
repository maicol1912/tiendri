'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/infrastructure/supabase/server'
import type { ActionResult, StoreMeta } from '@/types/domain'
import type { Json } from '@/infrastructure/database.types'

// ── Demo store constant ────────────────────────────────────────────────────────
// Temporary: during the localStorage → Supabase migration, all dashboard
// actions operate on this fixed store ID. Replace with getUser() once auth
// is wired up end-to-end.

const DEMO_STORE_ID = '10000000-0000-0000-0000-000000000001'

export function getStoreId(): string {
  return DEMO_STORE_ID
}

// ── Read ──────────────────────────────────────────────────────────────────────

/**
 * Fetches the demo store with its resolved currency code.
 * JOINs stores → currencies to get the ISO code (e.g. "COP").
 * Returns null if the store is not found.
 */
export async function getStore(): Promise<StoreMeta | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('stores')
    .select('id, name, slug, catalog_mode, currencies(code)')
    .eq('id', DEMO_STORE_ID)
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

  try {
    if (newMode === 'simple') {
      // Delegates cascade cleanup to the DB function defined in 010_functions_triggers.sql
      const { error: rpcError } = await supabase.rpc('switch_catalog_mode_to_simple', {
        target_store_id: DEMO_STORE_ID,
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
        .eq('id', DEMO_STORE_ID)

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
  /** Optional accent color override (hex) */
  primaryColor?: string
  /** Optional logo URL */
  logoUrl?: string
}

/**
 * Atomically completes the onboarding flow by:
 * 1. Updating the store's name, slug, catalog_mode, social_media, and template_id.
 * 2. Setting onboarding_completed = true on the store.
 * 3. Updating store_appearance with theme (primary color) and branding (logo).
 *
 * Uses the authenticated user's store (owner_id = auth.uid()).
 * Falls back to DEMO_STORE_ID when not authenticated (demo mode).
 */
export async function completeOnboarding(
  input: CompleteOnboardingInput
): Promise<ActionResult<{ slug: string }>> {
  const supabase = await createClient()

  // Determine which store to update: prefer the auth'd user's store,
  // fall back to the demo store for unauthenticated demo mode.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let storeId: string

  if (user) {
    const { data: store } = await supabase
      .from('stores')
      .select('id')
      .eq('owner_id', user.id)
      .single()

    if (!store) {
      return {
        success: false,
        error: { code: 'NOT_FOUND', message: 'No se encontró la tienda del usuario.' },
      }
    }

    storeId = store.id
  } else {
    storeId = DEMO_STORE_ID
  }

  // ── 1. Update stores table ────────────────────────────────────────────────
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

  // ── 2. Update store_appearance ────────────────────────────────────────────
  const themeUpdate: Json = input.primaryColor
    ? ({ colors: { primary: input.primaryColor } } as unknown as Json)
    : ({} as Json)

  const brandingUpdate: Json = input.logoUrl
    ? ({ logo: input.logoUrl } as unknown as Json)
    : ({} as Json)

  const { error: appearanceError } = await supabase
    .from('store_appearance')
    .update({
      theme: themeUpdate,
      branding: brandingUpdate,
    })
    .eq('store_id', storeId)

  if (appearanceError) {
    // Non-fatal: store is already saved. Log and continue.
    console.error('[completeOnboarding] appearance update failed:', appearanceError.message)
  }

  revalidatePath(`/${input.slug}`, 'layout')
  revalidatePath('/dashboard', 'layout')

  return { success: true, data: { slug: input.slug } }
}
