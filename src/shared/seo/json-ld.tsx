// ── Minimal product shape accepted by JSON-LD generators ─────────────────────
// Covers both global StorefrontProduct (inStock) and template-local types
// (available) without requiring a full type cast.

export interface ProductLike {
  name: string;
  description?: string;
  images: Array<{ url: string; sort_order: number }>;
  price: number;
  /** Global StorefrontProduct uses `inStock`. */
  inStock?: boolean;
  /** Template-local types (decor-warm, food-night, furniture-light) use `available`. */
  available?: boolean;
  rating?: number;
  reviewCount?: number;
  slug?: string;
}

// ── JSON-LD data generators ──────────────────────────────────────────────────

export function generateProductJsonLd(
  product: ProductLike,
  storeUrl: string,
): Record<string, unknown> {
  const isAvailable = product.inStock ?? product.available ?? true;

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description:
      product.description ?? `${product.name} disponible en nuestra tienda.`,
    image: product.images[0]?.url ?? "",
    offers: {
      "@type": "Offer",
      price: String(product.price),
      priceCurrency: "COP",
      availability: isAvailable
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  if (product.rating != null && product.reviewCount != null) {
    jsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: String(product.rating),
      reviewCount: String(product.reviewCount),
    };
  }

  return jsonLd;
}

export function generateCatalogJsonLd(
  products: ProductLike[],
  storeBaseUrl: string,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Catálogo de productos",
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: `${storeBaseUrl}/producto/${product.slug ?? ""}`,
    })),
  };
}

// ── Reusable JSON-LD script component ────────────────────────────────────────

interface JsonLdScriptProps {
  data: Record<string, unknown>;
}

export function JsonLdScript({ data }: JsonLdScriptProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
