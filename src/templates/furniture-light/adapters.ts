import type { FurnitureStoreInfo, FurnitureCategory } from './types';
import type { SharedStoreInfo, SharedCategory } from '@/types/store';

export function toSharedStore(store: FurnitureStoreInfo): SharedStoreInfo {
  return {
    name: store.name,
    slug: store.slug,
    logo: store.logo,
    description: store.description ?? null,
    whatsapp: store.whatsapp ?? null,
    social_links: store.social_links ?? null,
  };
}

export function toSharedCategories(categories: FurnitureCategory[]): SharedCategory[] {
  return categories.map((c) => ({
    id: c.id,
    name: c.name,
    icon: c.icon ?? null,
    image: null,
  }));
}
