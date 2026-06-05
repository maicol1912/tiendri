import type { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import { templateRegistry } from "@/templates";
import {
  mockStore as tpMockStore,
  mockCategories as tpMockCategories,
  mockProducts as tpMockProducts,
  mockDiscountProducts as tpMockDiscountProducts,
  mockPopularProducts as tpMockPopularProducts,
  mockHeroBanner,
  mockBannerGrid,
  mockSummerSaleBanner,
} from "@/templates/tech-premium/mock/data";
import { HomeShell as TechPremiumHomeShell } from "@/templates/tech-premium/components/HomeShell";
import {
  mockStore as fashionMockStore,
  mockProducts as fashionMockProducts,
  mockDiscountProducts as fashionMockDiscountProducts,
} from "@/templates/fashion/mock/data";
import { HomeShell as FashionHomeShell } from "@/templates/fashion/components/HomeShell";
import {
  mockStore as petsModernMockStore,
  mockPromoBanner as petsModernMockPromoBanner,
  mockTrendingItems as petsModernMockTrendingItems,
  mockPetTypes as petsModernMockPetTypes,
  mockProducts as petsModernMockProducts,
} from "@/templates/pets-modern/mock/data";
import { HomeShell as PetsModernHomeShell } from "@/templates/pets-modern/components/HomeShell";
import { HomeShell as ElectronicsClassicHomeShell } from "@/templates/electronics-classic/components/HomeShell";
import { HomeShell as FurnitureDarkHomeShell } from "@/templates/furniture-dark/components/HomeShell";
import {
  mockStore as beautySoftMockStore,
  mockCategories as beautySoftMockCategories,
  mockProducts as beautySoftMockProducts,
  mockHeroBanner as beautySoftMockHeroBanner,
} from "@/templates/beauty-soft/mock/data";
import { HomeShell as BeautySoftHomeShell } from "@/templates/beauty-soft/components/HomeShell";
import {
  mockStore as beautyElegantMockStore,
  mockCategories as beautyElegantMockCategories,
  mockProducts as beautyElegantMockProducts,
} from "@/templates/beauty-elegant/mock/data";
import { HomeShell as BeautyElegantHomeShell } from "@/templates/beauty-elegant/components/HomeShell";
import {
  mockStore as decorWarmMockStore,
  mockCategoryIcons as decorWarmMockCategoryIcons,
  mockCategories as decorWarmMockCategories,
  mockProducts as decorWarmMockProducts,
  mockPromoSlides as decorWarmMockPromoSlides,
  mockBestSellers as decorWarmMockBestSellers,
} from "@/templates/decor-warm/mock/data";
import { HomeShell as DecorWarmHomeShell } from "@/templates/decor-warm/components/HomeShell";
import {
  mockStore as foodNightMockStore,
  mockCategories as foodNightMockCategories,
  mockProducts as foodNightMockProducts,
} from "@/templates/food-night/mock/data";
import { HomeShell as FoodNightHomeShell } from "@/templates/food-night/components/HomeShell";
import {
  mockStore as furnitureLightMockStore,
  mockCategories as furnitureLightMockCategories,
  mockProducts as furnitureLightMockProducts,
  mockHeroBanner as furnitureLightMockHeroBanner,
  mockStyleCards as furnitureLightMockStyleCards,
  mockRoomBannerImage as furnitureLightMockRoomBannerImage,
} from "@/templates/furniture-light/mock/data";
import { HomeShell as FurnitureLightHomeShell } from "@/templates/furniture-light/components/HomeShell";
import {
  mockStore as petsClassicMockStore,
  mockCategories as petsClassicMockCategories,
  mockProducts as petsClassicMockProducts,
  mockPromoSlides as petsClassicMockPromoSlides,
} from "@/templates/pets-classic/mock/data";
import { HomeShell as PetsClassicHomeShell } from "@/templates/pets-classic/components/HomeShell";

// ── Types ─────────────────────────────────────────────────────────────────────

interface TemplatePreviewPageProps {
  params: Promise<{ templateName: string }>;
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: TemplatePreviewPageProps): Promise<Metadata> {
  const { templateName } = await params;

  const templateMeta: Record<string, { title: string; description: string }> = {
    "tech-premium": {
      title: "Tech Premium — Vista previa | Tiendri",
      description:
        "Tech Premium: la plantilla ideal para tiendas de tecnología, electrónica y gadgets. Diseño oscuro, catálogo moderno.",
    },
    fashion: {
      title: "Fashion — Vista previa | Tiendri",
      description:
        "Fashion: la plantilla ideal para tiendas de ropa, moda y accesorios. Diseño minimalista y elegante.",
    },
    "pets-modern": {
      title: "Pet Shop — Vista previa | Tiendri",
      description:
        "Pet Shop: la plantilla ideal para tiendas de mascotas, veterinarias y accesorios para animales.",
    },
    "electronics-classic": {
      title: "Electronics Classic — Vista previa | Tiendri",
      description:
        "Electronics Classic: la plantilla ideal para tiendas de tecnología, electrodomésticos y gadgets.",
    },
    "furniture-dark": {
      title: "Furniture Dark — Vista previa | Tiendri",
      description:
        "Furniture Dark: la plantilla ideal para tiendas de muebles, decoración y hogar. Diseño oscuro premium.",
    },
    "beauty-soft": {
      title: "Beauty Soft — Vista previa | Tiendri",
      description:
        "Beauty Soft: la plantilla ideal para tiendas de belleza, cosméticos y cuidado personal. Diseño suave y femenino.",
    },
    "beauty-elegant": {
      title: "Beauty Elegant — Vista previa | Tiendri",
      description:
        "Beauty Elegant: la plantilla para tiendas de belleza y cosméticos con diseño oscuro premium y acentos violeta.",
    },
    "decor-warm": {
      title: "Decor Warm — Vista previa | Tiendri",
      description:
        "Decor Warm: la plantilla ideal para tiendas de muebles, decoración y hogar con estética cálida y acogedora.",
    },
    "food-night": {
      title: "Food Night — Vista previa | Tiendri",
      description:
        "Food Night: la plantilla ideal para restaurantes, pizzerías y delivery de comida. Diseño oscuro y apetitoso.",
    },
    "furniture-light": {
      title: "Furniture Light — Vista previa | Tiendri",
      description:
        "Furniture Light: la plantilla ideal para tiendas de muebles y decoración del hogar. Diseño claro, moderno y acogedor.",
    },
    "pets-classic": {
      title: "Pets Classic — Vista previa | Tiendri",
      description:
        "Pets Classic: la plantilla clásica para tiendas de mascotas, accesorios y productos veterinarios. Diseño cálido con acentos naranja.",
    },
  };

  const meta = templateMeta[templateName] ?? {
    title: `${templateName} — Vista previa | Tiendri`,
    description: "Vista previa de plantilla Tiendri.",
  };

  return {
    title: meta.title,
    description: meta.description,
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function TemplatePreviewPage({
  params,
}: TemplatePreviewPageProps) {
  const { templateName } = await params;

  // Validate templateName against registry
  if (!(templateName in templateRegistry)) {
    notFound();
  }

  const templateKey = templateName as keyof typeof templateRegistry;

  // tech-premium: render home shell directly.
  // The layout.tsx provides CartProvider + CSS vars + customizer drawer.
  if (templateName === "tech-premium") {
    return (
      <TechPremiumHomeShell
        store={tpMockStore}
        categories={tpMockCategories}
        products={tpMockProducts}
        discountProducts={tpMockDiscountProducts}
        popularProducts={tpMockPopularProducts}
        heroBanner={mockHeroBanner}
        bannerGrid={mockBannerGrid}
        summerSaleBanner={mockSummerSaleBanner}
      />
    );
  }

  // fashion: render fashion home shell with its own CartProvider + CSS vars.
  // The layout.tsx bypass (non-tech-premium → transparent) is already in place.
  if (templateName === "fashion") {
    const allFashionProducts = [
      ...fashionMockProducts,
      ...fashionMockDiscountProducts,
    ];
    return (
      <FashionHomeShell
        store={fashionMockStore}
        products={allFashionProducts}
      />
    );
  }

  // pets-modern: render pet shop home shell
  if (templateName === "pets-modern") {
    return (
      <PetsModernHomeShell
        store={petsModernMockStore}
        promoBanner={petsModernMockPromoBanner}
        trendingItems={petsModernMockTrendingItems}
        petTypes={petsModernMockPetTypes}
        products={petsModernMockProducts}
      />
    );
  }

  // electronics-classic: render electronics home shell
  if (templateName === "electronics-classic") {
    return <ElectronicsClassicHomeShell />;
  }

  // furniture-dark: render furniture dark home shell
  if (templateName === "furniture-dark") {
    return <FurnitureDarkHomeShell />;
  }

  // beauty-soft: render beauty soft home shell
  if (templateName === "beauty-soft") {
    return (
      <BeautySoftHomeShell
        store={beautySoftMockStore}
        categories={beautySoftMockCategories}
        products={beautySoftMockProducts}
        heroBanner={beautySoftMockHeroBanner}
      />
    );
  }

  // beauty-elegant: render beauty elegant home shell
  if (templateName === "beauty-elegant") {
    return (
      <BeautyElegantHomeShell
        store={beautyElegantMockStore}
        categories={beautyElegantMockCategories}
        products={beautyElegantMockProducts}
      />
    );
  }

  // decor-warm: render decor warm home shell
  if (templateName === "decor-warm") {
    return (
      <DecorWarmHomeShell
        store={decorWarmMockStore}
        categoryIcons={decorWarmMockCategoryIcons}
        categories={decorWarmMockCategories}
        products={decorWarmMockProducts}
        promoSlides={decorWarmMockPromoSlides}
        bestSellers={decorWarmMockBestSellers}
      />
    );
  }

  // food-night: render food night home shell
  if (templateName === "food-night") {
    return (
      <FoodNightHomeShell
        store={foodNightMockStore}
        categories={foodNightMockCategories}
        products={foodNightMockProducts}
      />
    );
  }

  // furniture-light: render furniture light home shell
  if (templateName === "furniture-light") {
    return (
      <FurnitureLightHomeShell
        store={furnitureLightMockStore}
        categories={furnitureLightMockCategories}
        products={furnitureLightMockProducts}
        heroBannerImage={furnitureLightMockHeroBanner.image}
        heroBannerTitle={furnitureLightMockHeroBanner.title}
        heroBannerSubtitle={furnitureLightMockHeroBanner.subtitle}
        styleCards={furnitureLightMockStyleCards}
      />
    );
  }

  // pets-classic: render pets classic home shell
  if (templateName === "pets-classic") {
    return (
      <PetsClassicHomeShell
        store={petsClassicMockStore}
        categories={petsClassicMockCategories}
        products={petsClassicMockProducts}
        promoSlides={petsClassicMockPromoSlides}
      />
    );
  }

  // Fallback for future templates — default export is expected to be self-contained
  const mod = await templateRegistry[templateKey]();
  const Template = (mod as unknown as { default: React.ComponentType }).default;
  return <Template />;
}
