// Tech Premium — Product listing page
// Route: /template/tech-premium/catalogo
// Layout (CartProvider + CSS vars + customizer) provided by parent layout.tsx.

import type { Metadata } from "next";
import {
  mockStore,
  mockProducts,
  mockDiscountProducts,
  mockFilterGroups,
} from "@/templates/tech-premium/mock/data";
import { ListingShellRoute } from "@/templates/tech-premium/components/ListingShellRoute";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Catálogo",
    description: "Explorá nuestro catálogo completo de productos.",
  };
}

const allProducts = [...mockProducts, ...mockDiscountProducts];

const catalogJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Catálogo de productos",
  numberOfItems: allProducts.length,
  itemListElement: allProducts.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: product.name,
    url: `https://tiendri.com/template/${mockStore.slug}/producto/${product.slug}`,
  })),
};

export default function CatalogoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd) }}
      />
      <ListingShellRoute
        store={mockStore}
        products={allProducts}
        filters={mockFilterGroups}
      />
    </>
  );
}
