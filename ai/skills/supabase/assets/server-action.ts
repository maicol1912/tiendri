'use server'

import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { ActionResult } from '@/lib/supabase/types'

// 1. Schema de validación
const CreateProductSchema = z.object({
  storeId: z.string().uuid(),
  categoryId: z.string().uuid(),
  subcategoryId: z.string().uuid().nullable(),
  name: z.string().trim().min(2),
  description: z.string().trim().max(300),
  price: z.number().int().min(0),
  compareAtPrice: z.number().int().positive().nullable(),
  available: z.boolean().default(true),
  featured: z.boolean().default(false),
})

type CreateProductInput = z.infer<typeof CreateProductSchema>

export async function createProduct(input: CreateProductInput): Promise<ActionResult<{ id: string }>> {
  // 2. Validar input
  const parsed = CreateProductSchema.safeParse(input)
  if (!parsed.success) {
    return {
      success: false,
      error: { code: 'VALIDATION_ERROR', message: parsed.error.errors[0].message },
    }
  }

  const supabase = await createClient()

  // 3. Autenticar
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return { success: false, error: { code: 'UNAUTHORIZED', message: 'Sesión no válida' } }
  }

  // 4. Verificar ownership
  const { data: store } = await supabase
    .from('stores')
    .select('id')
    .eq('id', parsed.data.storeId)
    .eq('user_id', user.id)
    .single()

  if (!store) {
    return { success: false, error: { code: 'FORBIDDEN', message: 'No tenés acceso a esta tienda' } }
  }

  // 5. Ejecutar operación
  const { data, error } = await supabase
    .from('products')
    .insert({
      store_id: parsed.data.storeId,
      category_id: parsed.data.categoryId,
      subcategory_id: parsed.data.subcategoryId,
      name: parsed.data.name,
      description: parsed.data.description,
      price: parsed.data.price,
      compare_at_price: parsed.data.compareAtPrice,
      available: parsed.data.available,
      featured: parsed.data.featured,
    })
    .select('id')
    .single()

  if (error) {
    return { success: false, error: { code: 'DATABASE_ERROR', message: 'Error al crear producto' } }
  }

  // 6. Revalidar
  revalidatePath(`/store/${parsed.data.storeId}`)

  return { success: true, data: { id: data.id } }
}
