import { createClient } from '@/infrastructure/supabase/server'

export async function getStoreContext() {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false as const, error: { code: 'UNAUTHORIZED', message: 'No hay sesión activa.' } }
  }

  const { data: store } = await supabase
    .from('stores')
    .select('id, slug')
    .eq('owner_id', user.id)
    .maybeSingle()

  if (!store) {
    return { success: false as const, error: { code: 'NOT_FOUND', message: 'Tienda no encontrada.' } }
  }

  return { success: true as const, storeId: store.id as string, slug: store.slug as string, supabase, userId: user.id }
}

export type StoreContext = Extract<Awaited<ReturnType<typeof getStoreContext>>, { success: true }>

export async function getNextSortOrder(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  table: 'categories' | 'products' | 'subcategories',
  filters: Record<string, string>
): Promise<number> {
  let query = supabase.from(table).select('sort_order').order('sort_order', { ascending: false }).limit(1)
  for (const [key, value] of Object.entries(filters)) {
    query = query.eq(key, value)
  }
  const { data } = await query.maybeSingle()
  return data ? (data as { sort_order: number }).sort_order + 1 : 0
}

export async function checkSlugUniqueness(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  table: 'categories' | 'products' | 'subcategories',
  slug: string,
  storeId: string,
  excludeId?: string
): Promise<boolean> {
  let query = supabase.from(table).select('id').eq('slug', slug).eq('store_id', storeId)
  if (excludeId) {
    query = query.neq('id', excludeId)
  }
  const { data } = await query.maybeSingle()
  return data === null
}
