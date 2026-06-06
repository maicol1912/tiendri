import type { StoreInfo, Category } from './types';
import type { SharedStoreInfo, SharedCategory } from '@/types/store';

export function toSharedStore(store: StoreInfo): SharedStoreInfo {
  return {
    name: store.name,
    slug: store.slug,
    logo: store.logo ?? null,
    description: null,
    whatsapp: store.whatsapp ?? null,
    social_links: store.social_links ?? null,
  };
}

export function toSharedCategories(categories: Category[]): SharedCategory[] {
  return categories.map((c) => ({
    id: c.id,
    name: c.name,
    image: null,
    icon: null,
  }));
}
