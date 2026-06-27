'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createClient } from '@/infrastructure/supabase/server'
import { isValidSlug } from '@/shared/slug'
import { wrapDatabaseError } from '@/shared/errors'
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

  const socialMediaArray = (Array.isArray(store.social_media) ? store.social_media : []) as Array<{ platform: string; value: string }>
  const whatsappEntry = socialMediaArray.find((item) => item.platform === 'whatsapp')
  const whatsappConnected = typeof whatsappEntry?.value === 'string' && whatsappEntry.value.trim().length > 0

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
  catalog_mode: z.enum(['simple', 'nested']).optional(),
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
    return wrapDatabaseError(err)
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
    catalog_mode: input.catalog_mode,
    vibeId: input.vibeId,
  })

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]
    return {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: `${firstError.message} [campo: ${firstError.path.join('.')}]`,
      },
    }
  }

  // ── 1. Get authenticated user ─────────────────────────────────────────────
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return {
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'No hay sesión activa. Iniciá sesión e intentá de nuevo.',
      },
    }
  }

  const userId = user.id

  // ── 2. Resolve template UUID ──────────────────────────────────────────────
  const { data: template, error: templateLookupError } = await supabase
    .from('templates')
    .select('id')
    .eq('code', input.templateId)
    .eq('is_active', true)
    .single()

  if (templateLookupError || !template) {
    return {
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: `Template '${input.templateId}' no existe o está desactivado. Seleccioná otro estilo. [templates.code lookup]`,
      },
    }
  }

  // ── 3. Resolve plan UUID ──────────────────────────────────────────────────
  const { data: plan, error: planLookupError } = await supabase
    .from('plans')
    .select('id')
    .eq('code', 'free')
    .limit(1)
    .single()

  if (planLookupError || !plan) {
    return {
      success: false,
      error: {
        code: 'DATABASE_ERROR',
        message: "Plan 'free' no encontrado. Los datos de referencia no están cargados. [plans.code lookup]",
      },
    }
  }

  // ── 4. Resolve currency UUID ──────────────────────────────────────────────
  const { data: currency, error: currencyLookupError } = await supabase
    .from('currencies')
    .select('id')
    .eq('code', 'COP')
    .limit(1)
    .single()

  if (currencyLookupError || !currency) {
    return {
      success: false,
      error: {
        code: 'DATABASE_ERROR',
        message: "Moneda 'COP' no encontrada. Los datos de referencia no están cargados. [currencies.code lookup]",
      },
    }
  }

  // ── 5. Idempotency check ──────────────────────────────────────────────────
  const { data: existingStore } = await supabase
    .from('stores')
    .select('id, slug, onboarding_completed')
    .eq('owner_id', userId)
    .limit(1)
    .single()

  const socialMedia: Json = [{ platform: 'whatsapp', value: input.whatsapp }]

  let storeId: string

  if (existingStore) {
    if (existingStore.onboarding_completed) {
      return { success: true, data: { slug: existingStore.slug } }
    }

    // Update incomplete existing store
    const { error: updateError } = await supabase
      .from('stores')
      .update({
        name: input.name,
        slug: input.slug,
        catalog_mode: input.catalog_mode,
        social_media: socialMedia,
        template_id: template.id,
        plan_id: plan.id,
        currency_id: currency.id,
        onboarding_completed: true,
      })
      .eq('id', existingStore.id)

    if (updateError) {
      if (updateError.code === '23505') {
        return {
          success: false,
          error: {
            code: 'SLUG_TAKEN',
            message: `El slug '${input.slug}' ya está en uso. Elegí otro nombre para tu tienda. [stores.slug UNIQUE]`,
          },
        }
      }
      return {
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: `Error al actualizar la tienda: ${updateError.message}. [stores UPDATE, id: ${existingStore.id.slice(0, 8)}]`,
        },
      }
    }

    storeId = existingStore.id
  } else {
    // Insert new store
    const { data: newStore, error: insertError } = await supabase
      .from('stores')
      .insert({
        owner_id: userId,
        name: input.name,
        slug: input.slug,
        catalog_mode: input.catalog_mode,
        social_media: socialMedia,
        template_id: template.id,
        plan_id: plan.id,
        currency_id: currency.id,
        onboarding_completed: true,
      })
      .select('id')
      .single()

    if (insertError) {
      if (insertError.code === '23505') {
        return {
          success: false,
          error: {
            code: 'SLUG_TAKEN',
            message: `El slug '${input.slug}' ya está en uso. Elegí otro nombre para tu tienda. [stores.slug UNIQUE]`,
          },
        }
      }
      return {
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: `Error al crear la tienda: ${insertError.message}. [stores INSERT, owner: ${userId.slice(0, 8)}]`,
        },
      }
    }

    storeId = newStore.id
  }

  // ── 6. Resolve logoUrl — only accept verified HTTPS URLs ──────────────────
  const resolvedLogoUrl = input.logoUrl?.startsWith('https://') ? input.logoUrl : undefined

  // ── 7. Upsert store_appearance ────────────────────────────────────────────
  const themeUpdate: Json = input.primaryColor
    ? ({ colors: { primary: input.primaryColor } } as unknown as Json)
    : ({} as Json)

  const brandingUpdate: Json = resolvedLogoUrl
    ? ({ logo: resolvedLogoUrl } as unknown as Json)
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
        message: `Error al guardar apariencia: ${appearanceError.message}. [store_appearance UPSERT, store: ${storeId.slice(0, 8)}]`,
      },
    }
  }

  // ── 8. Revalidate ─────────────────────────────────────────────────────────
  revalidatePath(`/${input.slug}`, 'layout')
  revalidatePath('/dashboard', 'layout')

  // ── 9. Return success ─────────────────────────────────────────────────────
  return { success: true, data: { slug: input.slug } }
}

// ── Logo upload ───────────────────────────────────────────────────────────────

const LOGO_MAX_BYTES = 2 * 1024 * 1024 // 2 MB
const LOGO_ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp']

/**
 * Uploads a logo file to Supabase Storage during onboarding.
 *
 * Uses path: logos/{userId}/{timestamp}-{sanitizedFilename}
 * The user_id prefix is allowed by the RLS policy in 013_logos_user_id_policy.
 * Returns the public CDN URL on success.
 */
export async function uploadStoreLogo(
  formData: FormData
): Promise<ActionResult<{ url: string }>> {
  // ── 1. Auth check ─────────────────────────────────────────────────────────
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return {
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'No hay sesión activa. [logos upload, auth check]',
      },
    }
  }

  // ── 2. Extract file ───────────────────────────────────────────────────────
  const file = formData.get('file')
  if (!file || !(file instanceof File) || file.size === 0) {
    return {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'No se recibió ningún archivo. [logos upload, FormData]',
      },
    }
  }

  // ── 3. Validate size ──────────────────────────────────────────────────────
  if (file.size > LOGO_MAX_BYTES) {
    return {
      success: false,
      error: {
        code: 'FILE_TOO_LARGE',
        message: 'La imagen supera el tamaño máximo de 2MB. [logos upload, size check]',
      },
    }
  }

  // ── 4. Validate type ──────────────────────────────────────────────────────
  if (!LOGO_ALLOWED_TYPES.includes(file.type)) {
    return {
      success: false,
      error: {
        code: 'INVALID_FILE_TYPE',
        message: 'Tipo de archivo no soportado. Usá PNG, JPG o WebP. [logos upload, type check]',
      },
    }
  }

  // ── 5. Build storage path ─────────────────────────────────────────────────
  // Sanitize filename: lowercase, replace spaces/special chars with dashes
  const safeName = file.name
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]/g, '-')
    .replace(/-+/g, '-')
  const storagePath = `${user.id}/${Date.now()}-${safeName}`

  // ── 6. Upload to Storage ──────────────────────────────────────────────────
  const fileBuffer = Buffer.from(await file.arrayBuffer())

  const { error: uploadError } = await supabase.storage
    .from('logos')
    .upload(storagePath, fileBuffer, {
      contentType: file.type,
      upsert: true,
    })

  if (uploadError) {
    return {
      success: false,
      error: {
        code: 'STORAGE_ERROR',
        message: `Error al subir el logo: ${uploadError.message}. [storage.upload, bucket: logos]`,
      },
    }
  }

  // ── 7. Get public URL ─────────────────────────────────────────────────────
  const { data: { publicUrl } } = supabase.storage
    .from('logos')
    .getPublicUrl(storagePath)

  return { success: true, data: { url: publicUrl } }
}

// ── Slug availability check ───────────────────────────────────────────────────

export async function checkSlugAvailability(
  slug: string
): Promise<ActionResult<{ available: boolean }>> {
  if (!isValidSlug(slug)) {
    return {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: `Formato de slug inválido: '${slug}'. Debe tener 3-30 caracteres, solo minúsculas, números y guiones. [slug format check]`,
      },
    }
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('stores')
    .select('id')
    .eq('slug', slug)
    .maybeSingle()

  if (error) {
    return {
      success: false,
      error: {
        code: 'DATABASE_ERROR',
        message: `Error al verificar disponibilidad del slug: ${error.message}. [stores SELECT, slug: '${slug}']`,
      },
    }
  }

  return { success: true, data: { available: data === null } }
}
