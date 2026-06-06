import type { StoreInfo, Category, SharedStoreInfo, SharedCategory } from "@/types/store";

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

export function toSharedCategories(categories: Category[]): SharedCategory[] {
  return categories.map((c) => ({
    id: c.id,
    name: c.name,
    icon: c.icon ?? null,
    image: null,
  }));
}
