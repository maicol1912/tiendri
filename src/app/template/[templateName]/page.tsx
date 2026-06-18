import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { templateRegistry } from "@/templates";
import { getTemplateConfig } from "@/templates/registry";
import { resolveTemplateConfig } from "@/lib/resolveTemplateConfig";
import { TemplateLayout } from "@/templates/_core";
import { getTemplateManifest } from "@/templates/manifest-resolver";
import { getTemplateMockData } from "@/templates/mock-loader";
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

  // Validar que el template exista en el registry
  if (!(templateName in templateRegistry)) {
    notFound();
  }

  // Cargar config, resolver y construir manifiesto + mock data.
  // TemplateLayout es el engine centralizado — reemplaza el if-chain de 8 templates.
  const templateConfig = await getTemplateConfig(templateName);
  const resolvedConfig = resolveTemplateConfig(templateConfig);
  const manifest = getTemplateManifest(templateName, resolvedConfig);
  const mockData = await getTemplateMockData(templateName);

  return (
    <TemplateLayout
      store={mockData.store}
      products={mockData.products}
      categories={mockData.categories}
      config={resolvedConfig}
      manifest={manifest}
      bestSellers={mockData.bestSellers}
      popularProducts={mockData.popularProducts}
      discountProducts={mockData.discountProducts}
    />
  );
}
