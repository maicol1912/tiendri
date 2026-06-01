// Cart page — supports tech-premium and fashion templates.
// Route: /template/[templateName]/carrito

import type { Metadata } from "next";
import { mockStore as tpMockStore } from "@/templates/tech-premium/mock/data";
import { CartShellRoute as TechPremiumCartShellRoute } from "@/templates/tech-premium/components/CartShellRoute";
import { mockStore as fashionMockStore } from "@/templates/fashion/mock/data";
import { CartShellRoute as FashionCartShellRoute } from "@/templates/fashion/components/CartShellRoute";
import { mockStore as petsModernMockStore } from "@/templates/pets-modern/mock/data";
import { CartShellRoute as PetsModernCartShellRoute } from "@/templates/pets-modern/components/CartShellRoute";
import { CartShellRoute as ElectronicsClassicCartShellRoute } from "@/templates/electronics-classic/components/CartShellRoute";
import { CartShellRoute as FurnitureDarkCartShellRoute } from "@/templates/furniture-dark/components/CartShellRoute";
import { mockStore as beautySoftMockStore } from "@/templates/beauty-soft/mock/data";
import { CartShellRoute as BeautySoftCartShellRoute } from "@/templates/beauty-soft/components/CartShellRoute";

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

  if (templateName === "pets-modern") {
    return <PetsModernCartShellRoute store={petsModernMockStore} />;
  }

  if (templateName === "electronics-classic") {
    return <ElectronicsClassicCartShellRoute />;
  }

  if (templateName === "furniture-dark") {
    return <FurnitureDarkCartShellRoute />;
  }

  if (templateName === "beauty-soft") {
    return <BeautySoftCartShellRoute store={beautySoftMockStore} />;
  }

  return <TechPremiumCartShellRoute store={tpMockStore} />;
}
