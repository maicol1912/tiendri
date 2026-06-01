// Checkout page — supports tech-premium and fashion templates.
// Route: /template/[templateName]/checkout

import type { Metadata } from "next";
import { mockStore as tpMockStore } from "@/templates/tech-premium/mock/data";
import { CheckoutShellRoute as TechPremiumCheckoutShellRoute } from "@/templates/tech-premium/components/CheckoutShellRoute";
import { mockStore as fashionMockStore } from "@/templates/fashion/mock/data";
import { CheckoutShellRoute as FashionCheckoutShellRoute } from "@/templates/fashion/components/CheckoutShellRoute";
import { mockStore as petsModernMockStore } from "@/templates/pets-modern/mock/data";
import { CheckoutShellRoute as PetsModernCheckoutShellRoute } from "@/templates/pets-modern/components/CheckoutShellRoute";
import { CheckoutShellRoute as ElectronicsClassicCheckoutShellRoute } from "@/templates/electronics-classic/components/CheckoutShellRoute";
import { CheckoutShellRoute as FurnitureDarkCheckoutShellRoute } from "@/templates/furniture-dark/components/CheckoutShellRoute";
import { mockStore as beautySoftMockStore } from "@/templates/beauty-soft/mock/data";
import { CheckoutShellRoute as BeautySoftCheckoutShellRoute } from "@/templates/beauty-soft/components/CheckoutShellRoute";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

interface CheckoutPageProps {
  params: Promise<{ templateName: string }>;
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { templateName } = await params;

  if (templateName === "fashion") {
    return <FashionCheckoutShellRoute store={fashionMockStore} />;
  }

  if (templateName === "pets-modern") {
    return <PetsModernCheckoutShellRoute store={petsModernMockStore} />;
  }

  if (templateName === "electronics-classic") {
    return <ElectronicsClassicCheckoutShellRoute />;
  }

  if (templateName === "furniture-dark") {
    return <FurnitureDarkCheckoutShellRoute />;
  }

  if (templateName === "beauty-soft") {
    return <BeautySoftCheckoutShellRoute store={beautySoftMockStore} />;
  }

  return <TechPremiumCheckoutShellRoute store={tpMockStore} mode="preview" />;
}
