// Cart page — supports tech-premium and fashion templates.
// Route: /template/[templateName]/carrito

import type { Metadata } from "next";
import { mockStore as tpMockStore } from "@/templates/tech-premium/mock/data";
import { CartShellRoute as TechPremiumCartShellRoute } from "@/templates/tech-premium/components/CartShellRoute";
import { mockStore as fashionMockStore } from "@/templates/fashion/mock/data";
import { CartShellRoute as FashionCartShellRoute } from "@/templates/fashion/components/CartShellRoute";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

interface CarritoPageProps {
  params: Promise<{ templateName: string }>;
}

export default async function CarritoPage({ params }: CarritoPageProps) {
  const { templateName } = await params;

  if (templateName === "fashion") {
    return <FashionCartShellRoute store={fashionMockStore} />;
  }

  return <TechPremiumCartShellRoute store={tpMockStore} />;
}
