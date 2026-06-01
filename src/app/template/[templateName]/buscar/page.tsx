// Search page — supports tech-premium and fashion templates.
// Route: /template/[templateName]/buscar

import type { Metadata } from "next";
import {
  mockStore as tpMockStore,
  mockProducts as tpMockProducts,
  mockDiscountProducts as tpMockDiscountProducts,
} from "@/templates/tech-premium/mock/data";
import { SearchShellRoute as TechPremiumSearchShellRoute } from "@/templates/tech-premium/components/SearchShellRoute";
import {
  mockStore as fashionMockStore,
  mockProducts as fashionMockProducts,
  mockDiscountProducts as fashionMockDiscountProducts,
} from "@/templates/fashion/mock/data";
import { SearchShellRoute as FashionSearchShellRoute } from "@/templates/fashion/components/SearchShellRoute";
import {
  mockStore as petsModernMockStore,
  mockProducts as petsModernMockProducts,
} from "@/templates/pets-modern/mock/data";
import { SearchShellRoute as PetsModernSearchShellRoute } from "@/templates/pets-modern/components/SearchShellRoute";
import { SearchShellRoute as ElectronicsClassicSearchShellRoute } from "@/templates/electronics-classic/components/SearchShellRoute";
import { SearchShellRoute as FurnitureDarkSearchShellRoute } from "@/templates/furniture-dark/components/SearchShellRoute";
import {
  mockStore as beautySoftMockStore,
  mockProducts as beautySoftMockProducts,
} from "@/templates/beauty-soft/mock/data";
import { SearchShellRoute as BeautySoftSearchShellRoute } from "@/templates/beauty-soft/components/SearchShellRoute";

export const metadata: Metadata = {
  title: "Buscar",
  robots: { index: false, follow: true },
};

interface BuscarPageProps {
  params: Promise<{ templateName: string }>;
}

export default async function BuscarPage({ params }: BuscarPageProps) {
  const { templateName } = await params;

  if (templateName === "fashion") {
    return (
      <FashionSearchShellRoute
        store={fashionMockStore}
        products={[...fashionMockProducts, ...fashionMockDiscountProducts]}
      />
    );
  }

  if (templateName === "pets-modern") {
    return (
      <PetsModernSearchShellRoute
        store={petsModernMockStore}
        products={petsModernMockProducts}
      />
    );
  }

  if (templateName === "electronics-classic") {
    return <ElectronicsClassicSearchShellRoute />;
  }

  if (templateName === "furniture-dark") {
    return <FurnitureDarkSearchShellRoute />;
  }

  if (templateName === "beauty-soft") {
    return (
      <BeautySoftSearchShellRoute
        store={beautySoftMockStore}
        products={beautySoftMockProducts}
      />
    );
  }

  return (
    <TechPremiumSearchShellRoute
      store={tpMockStore}
      allProducts={[...tpMockProducts, ...tpMockDiscountProducts]}
    />
  );
}
