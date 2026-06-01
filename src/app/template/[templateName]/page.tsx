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

  // Fallback for future templates — default export is expected to be self-contained
  const mod = await templateRegistry[templateKey]();
  const Template = (mod as unknown as { default: React.ComponentType }).default;
  return <Template />;
}
