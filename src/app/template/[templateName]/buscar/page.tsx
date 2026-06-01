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

  return (
    <TechPremiumSearchShellRoute
      store={tpMockStore}
      allProducts={[...tpMockProducts, ...tpMockDiscountProducts]}
    />
  );
}
