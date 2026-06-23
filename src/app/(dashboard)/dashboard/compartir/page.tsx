import { createClient } from '@/infrastructure/supabase/server';
import { CompartirClient, CompartirEmptyState } from './compartir-client';

export default async function CompartirPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <CompartirEmptyState />;
  }

  const { data: store } = await supabase
    .from('stores')
    .select('name, slug')
    .eq('owner_id', user.id)
    .limit(1)
    .single();

  if (!store?.slug) {
    return <CompartirEmptyState />;
  }

  return (
    <CompartirClient
      storeName={store.name}
      slug={store.slug}
    />
  );
}
