// Adapter: DB Product → StorefrontProduct
// Pure function, no side effects, no React imports.

import type { Product, ProductVariant } from "@/types/domain/product";
import type { StorefrontProduct, StorefrontVariantGroup, ProductImage } from "@/types/store";

function groupVariants(variants: ProductVariant[]): StorefrontVariantGroup[] | undefined {
  if (!variants.length) return undefined;
  return [
    {
      id: "variants",
      label: "Opciones",
      type: "custom" as const,
      options: variants.map((v) => ({
        id: v.id,
        label: v.name,
        priceModifier: v.price_modifier,
      })),
    },
  ];
}

export function toStorefrontProduct(p: Product): StorefrontProduct {
  const images: ProductImage[] = p.images.map((i) => ({
    url: i.url,
    sort_order: i.sort_order,
  }));

  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description,
    price: p.price,
    originalPrice: p.compare_at_price ?? undefined,
    inStock: p.available,
    categoryId: p.category_id,
    subcategoryId: p.subcategory_id ?? undefined,
    images,
    variants: groupVariants(p.variants),
  };
}

export function toStorefrontProducts(products: Product[]): StorefrontProduct[] {
  return products.map(toStorefrontProduct);
}
