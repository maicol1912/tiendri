// Checkout page — supports tech-premium and fashion templates.
// Route: /template/[templateName]/checkout

import type { Metadata } from "next";
import { mockStore as tpMockStore } from "@/templates/tech-premium/mock/data";
import { CheckoutShellRoute as TechPremiumCheckoutShellRoute } from "@/templates/tech-premium/components/CheckoutShellRoute";
import { mockStore as fashionMockStore } from "@/templates/fashion/mock/data";
import { CheckoutShellRoute as FashionCheckoutShellRoute } from "@/templates/fashion/components/CheckoutShellRoute";

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

  return <TechPremiumCheckoutShellRoute store={tpMockStore} mode="preview" />;
}
