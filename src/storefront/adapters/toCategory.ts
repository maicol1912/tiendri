// Adapter: DB Category → storefront Category
// Pure function, no side effects, no React imports.

import type { Category as DomainCategory } from "@/types/domain/category";
import type { Category } from "@/types/domain/store";

export function toCategory(c: DomainCategory): Category {
  return {
    id: c.id,
    name: c.name,
    slug: c.slug,
    icon: c.icon,
    image: c.image,
  };
}

export function toCategories(categories: DomainCategory[]): Category[] {
  return categories.map(toCategory);
}
