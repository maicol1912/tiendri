import type { StoreInfo } from '@/types/store';
import type { BeautyElegantCategory } from './types';
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

export function toSharedCategories(categories: BeautyElegantCategory[]): SharedCategory[] {
  return categories.map((c) => ({
    id: c.id,
    name: c.name,
    image: null,
    icon: null,
  }));
}
