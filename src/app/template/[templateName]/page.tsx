import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { templateRegistry } from "@/templates";
import {
  mockStore,
  mockCategories,
  mockProducts,
  mockDiscountProducts,
  mockPopularProducts,
  mockHeroBanner,
  mockBannerGrid,
  mockSummerSaleBanner,
} from "@/templates/tech-premium/mock/data";
import { HomeShell } from "@/templates/tech-premium/components/HomeShell";


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
      <HomeShell
        store={mockStore}
        categories={mockCategories}
        products={mockProducts}
        discountProducts={mockDiscountProducts}
        popularProducts={mockPopularProducts}
        heroBanner={mockHeroBanner}
        bannerGrid={mockBannerGrid}
        summerSaleBanner={mockSummerSaleBanner}
      />
    );
  }

  // Fallback for future templates
  const { default: Template } = await templateRegistry[templateKey]();
  return <Template />;
}
