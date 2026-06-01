// Product listing page — supports tech-premium and fashion templates.
// Route: /template/[templateName]/catalogo

import type { Metadata } from "next";
import {
  mockStore as tpMockStore,
  mockProducts as tpMockProducts,
  mockDiscountProducts as tpMockDiscountProducts,
  mockFilterGroups,
} from "@/templates/tech-premium/mock/data";
import { ListingShellRoute as TechPremiumListingShellRoute } from "@/templates/tech-premium/components/ListingShellRoute";
import {
  mockStore as fashionMockStore,
  mockProducts as fashionMockProducts,
  mockDiscountProducts as fashionMockDiscountProducts,
  mockCategories as fashionMockCategories,
} from "@/templates/fashion/mock/data";
import { ListingShellRoute as FashionListingShellRoute } from "@/templates/fashion/components/ListingShellRoute";

interface CatalogoPageProps {
  params: Promise<{ templateName: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Catálogo",
    description: "Explorá nuestro catálogo completo de productos.",
  };
}

export default async function CatalogoPage({ params }: CatalogoPageProps) {
  const { templateName } = await params;

  // ── Fashion ──────────────────────────────────────────────────────────────────
  if (templateName === "fashion") {
    const allProducts = [...fashionMockProducts, ...fashionMockDiscountProducts];
    return (
      <FashionListingShellRoute
        store={fashionMockStore}
        products={allProducts}
        categories={fashionMockCategories}
      />
    );
  }

  // ── Tech Premium (default) ────────────────────────────────────────────────────
  const allProducts = [...tpMockProducts, ...tpMockDiscountProducts];

  const catalogJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Catálogo de productos",
    numberOfItems: allProducts.length,
    itemListElement: allProducts.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: `https://tiendri.com/template/${tpMockStore.slug}/producto/${product.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd) }}
      />
      <TechPremiumListingShellRoute
        store={tpMockStore}
        products={allProducts}
        filters={mockFilterGroups}
      />
    </>
  );
}
