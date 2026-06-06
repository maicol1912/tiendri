import type { StoreInfo, PetsClassicCategory } from './types';
import type { SharedStoreInfo, SharedCategory } from '@/types/store';

export function toSharedStore(store: StoreInfo): SharedStoreInfo {
  return {
    name: store.name,
    slug: store.slug,
    logo: store.logo,
    description: store.description ?? null,
    whatsapp: store.whatsapp ?? null,
    social_links: store.social_links ?? null,
  };
}

export function toSharedCategories(categories: PetsClassicCategory[]): SharedCategory[] {
  return categories.map((c) => ({
    id: c.id,
    name: c.name,
    // pets-classic uses SVG iconSrc, not a Lucide icon name — image field carries the path
    image: c.iconSrc ?? null,
    icon: null,
  }));
}
