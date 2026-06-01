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
import { mockCategories as petsModernMockCategories } from "@/templates/pets-modern/mock/data";
import { ExploreShellRoute as PetsModernExploreShellRoute } from "@/templates/pets-modern/components/ExploreShellRoute";
import { ListingShellRoute as ElectronicsClassicListingShellRoute } from "@/templates/electronics-classic/components/ListingShellRoute";
import { ListingShellRoute as FurnitureDarkListingShellRoute } from "@/templates/furniture-dark/components/ListingShellRoute";
import {
  mockStore as beautySoftMockStore,
  mockProducts as beautySoftMockProducts,
  mockCategories as beautySoftMockCategories,
} from "@/templates/beauty-soft/mock/data";
import { ListingShellRoute as BeautySoftListingShellRoute } from "@/templates/beauty-soft/components/ListingShellRoute";

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

  // ── Pets Modern ──────────────────────────────────────────────────────────────────
  if (templateName === "pets-modern") {
    return <PetsModernExploreShellRoute categories={petsModernMockCategories} />;
  }

  // ── Electronics Classic ───────────────────────────────────────────────────────
  if (templateName === "electronics-classic") {
    return <ElectronicsClassicListingShellRoute />;
  }

  // ── Furniture Dark ────────────────────────────────────────────────────────────
  if (templateName === "furniture-dark") {
    return <FurnitureDarkListingShellRoute />;
  }

  // ── Beauty Soft ───────────────────────────────────────────────────────────────
  if (templateName === "beauty-soft") {
    return (
      <BeautySoftListingShellRoute
        store={beautySoftMockStore}
        categories={beautySoftMockCategories}
        products={beautySoftMockProducts}
      />
    );
  }

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
