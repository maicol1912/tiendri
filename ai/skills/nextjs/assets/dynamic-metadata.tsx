import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()

  const { data: store } = await supabase
    .from('stores')
    .select('name, description, logo, banner')
    .eq('slug', slug)
    .eq('onboarding_completed', true)
    .single()

  if (!store) {
    return { title: 'Tienda no encontrada — Tiendri' }
  }

  return {
    title: `${store.name} — Tiendri`,
    description: store.description,
    openGraph: {
      title: store.name,
      description: store.description,
      images: store.banner ? [{ url: store.banner }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: store.name,
      description: store.description,
      images: store.banner ? [store.banner] : [],
    },
  }
}
