import type { SharedStoreInfo, SharedCategory } from "@/types/store";
import type { StorefrontStore, StorefrontCategory } from "./types";

export function toSharedStore(store: StorefrontStore): SharedStoreInfo {
  return {
    name: store.name,
    slug: store.slug,
    logo: store.logo,
    description: store.description ?? null,
    whatsapp: store.whatsapp ?? null,
    social_links: store.social_links ?? null,
  };
}

export function toSharedCategories(categories: StorefrontCategory[]): SharedCategory[] {
  return categories.map((c) => ({
    id: c.id,
    name: c.name,
    image: c.image ?? null,
    icon: null,
  }));
}
