// Checkout page — supports tech-premium and fashion templates.
// Route: /template/[templateName]/checkout

import type { Metadata } from "next";
import { mockStore as tpMockStore } from "@/templates/tech-premium/mock/data";
import { CheckoutShellRoute as TechPremiumCheckoutShellRoute } from "@/templates/tech-premium/components/CheckoutShellRoute";
import { mockStore as fashionMockStore } from "@/templates/fashion/mock/data";
import { CheckoutShellRoute as FashionCheckoutShellRoute } from "@/templates/fashion/components/CheckoutShellRoute";
import { CheckoutShellRoute as FurnitureDarkCheckoutShellRoute } from "@/templates/furniture-dark/components/CheckoutShellRoute";
import { mockStore as beautySoftMockStore } from "@/templates/beauty-soft/mock/data";
import { CheckoutShellRoute as BeautySoftCheckoutShellRoute } from "@/templates/beauty-soft/components/CheckoutShellRoute";
import { mockStore as beautyElegantMockStore } from "@/templates/beauty-elegant/mock/data";
import { CheckoutShellRoute as BeautyElegantCheckoutShellRoute } from "@/templates/beauty-elegant/components/CheckoutShellRoute";
import { mockStore as decorWarmMockStore } from "@/templates/decor-warm/mock/data";
import { CheckoutShellRoute as DecorWarmCheckoutShellRoute } from "@/templates/decor-warm/components/CheckoutShellRoute";
import { mockStore as foodNightMockStore } from "@/templates/food-night/mock/data";
import { CheckoutShellRoute as FoodNightCheckoutShellRoute } from "@/templates/food-night/components/CheckoutShellRoute";
import { mockStore as furnitureLightMockStore } from "@/templates/furniture-light/mock/data";
import { CheckoutShellRoute as FurnitureLightCheckoutShellRoute } from "@/templates/furniture-light/components/CheckoutShellRoute";
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

  if (templateName === "furniture-dark") {
    return <FurnitureDarkCheckoutShellRoute />;
  }

  if (templateName === "beauty-soft") {
    return <BeautySoftCheckoutShellRoute store={beautySoftMockStore} />;
  }

  if (templateName === "beauty-elegant") {
    return <BeautyElegantCheckoutShellRoute store={beautyElegantMockStore} />;
  }

  if (templateName === "decor-warm") {
    return <DecorWarmCheckoutShellRoute store={decorWarmMockStore} />;
  }

  if (templateName === "food-night") {
    return <FoodNightCheckoutShellRoute store={foodNightMockStore} />;
  }

  if (templateName === "furniture-light") {
    return <FurnitureLightCheckoutShellRoute store={furnitureLightMockStore} mode="preview" />;
  }

  return <TechPremiumCheckoutShellRoute store={tpMockStore} mode="preview" />;
}
