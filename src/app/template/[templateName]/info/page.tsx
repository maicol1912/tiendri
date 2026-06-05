// Info page — shows store information for ALL 11 templates.
// Route: /template/[templateName]/info

import type { Metadata } from "next";

// ── Tech Premium ──────────────────────────────────────────────────────────────
import { mockStore as tpMockStore } from "@/templates/tech-premium/mock/data";
import { StoreInfoShellRoute as TechPremiumInfoShellRoute } from "@/templates/tech-premium/components/StoreInfoShellRoute";

// ── Fashion ───────────────────────────────────────────────────────────────────
import { mockStore as fashionMockStore } from "@/templates/fashion/mock/data";
import { StoreInfoShellRoute as FashionInfoShellRoute } from "@/templates/fashion/components/StoreInfoShellRoute";

// ── Pets Modern ───────────────────────────────────────────────────────────────
import { mockStore as petsModernMockStore } from "@/templates/pets-modern/mock/data";
import { StoreInfoShellRoute as PetsModernInfoShellRoute } from "@/templates/pets-modern/components/StoreInfoShellRoute";

// ── Electronics Classic ───────────────────────────────────────────────────────
import { StoreInfoShellRoute as ElectronicsClassicInfoShellRoute } from "@/templates/electronics-classic/components/StoreInfoShellRoute";

// ── Furniture Dark ────────────────────────────────────────────────────────────
import { StoreInfoShellRoute as FurnitureDarkInfoShellRoute } from "@/templates/furniture-dark/components/StoreInfoShellRoute";

// ── Beauty Soft ───────────────────────────────────────────────────────────────
import { mockStore as beautySoftMockStore } from "@/templates/beauty-soft/mock/data";
import { StoreInfoShellRoute as BeautySoftInfoShellRoute } from "@/templates/beauty-soft/components/StoreInfoShellRoute";

// ── Beauty Elegant ────────────────────────────────────────────────────────────
import { mockStore as beautyElegantMockStore } from "@/templates/beauty-elegant/mock/data";
import { StoreInfoShellRoute as BeautyElegantInfoShellRoute } from "@/templates/beauty-elegant/components/StoreInfoShellRoute";

// ── Decor Warm ────────────────────────────────────────────────────────────────
import { mockStore as decorWarmMockStore } from "@/templates/decor-warm/mock/data";
import { StoreInfoShellRoute as DecorWarmInfoShellRoute } from "@/templates/decor-warm/components/StoreInfoShellRoute";

// ── Food Night ────────────────────────────────────────────────────────────────
import { mockStore as foodNightMockStore } from "@/templates/food-night/mock/data";
import { StoreInfoShellRoute as FoodNightInfoShellRoute } from "@/templates/food-night/components/StoreInfoShellRoute";

// ── Furniture Light ───────────────────────────────────────────────────────────
import { mockStore as furnitureLightMockStore } from "@/templates/furniture-light/mock/data";
import { StoreInfoShellRoute as FurnitureLightInfoShellRoute } from "@/templates/furniture-light/components/StoreInfoShellRoute";

// ── Pets Classic ──────────────────────────────────────────────────────────────
import { mockStore as petsClassicMockStore } from "@/templates/pets-classic/mock/data";
import { StoreInfoShellRoute as PetsClassicInfoShellRoute } from "@/templates/pets-classic/components/StoreInfoShellRoute";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

interface InfoPageProps {
  params: Promise<{ templateName: string }>;
}

export default async function InfoPage({ params }: InfoPageProps) {
  const { templateName } = await params;

  if (templateName === "fashion") {
    return <FashionInfoShellRoute store={fashionMockStore} />;
  }

  if (templateName === "pets-modern") {
    return <PetsModernInfoShellRoute store={petsModernMockStore} />;
  }

  if (templateName === "electronics-classic") {
    return <ElectronicsClassicInfoShellRoute />;
  }

  if (templateName === "furniture-dark") {
    return <FurnitureDarkInfoShellRoute />;
  }

  if (templateName === "beauty-soft") {
    return <BeautySoftInfoShellRoute store={beautySoftMockStore} />;
  }

  if (templateName === "beauty-elegant") {
    return <BeautyElegantInfoShellRoute store={beautyElegantMockStore} />;
  }

  if (templateName === "decor-warm") {
    return <DecorWarmInfoShellRoute store={decorWarmMockStore} />;
  }

  if (templateName === "food-night") {
    return <FoodNightInfoShellRoute store={foodNightMockStore} />;
  }

  if (templateName === "furniture-light") {
    return <FurnitureLightInfoShellRoute store={furnitureLightMockStore} />;
  }

  if (templateName === "pets-classic") {
    return <PetsClassicInfoShellRoute store={petsClassicMockStore} />;
  }

  // Default: tech-premium
  return <TechPremiumInfoShellRoute store={tpMockStore} />;
}
