// Product listing page — supports multiple templates.
// Route: /template/[templateName]/catalogo

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { templateRegistry } from "@/templates";
import { TemplateLayout } from "@/templates/_core";
import { loadTemplateData } from "../_lib/loadTemplateData";

interface CatalogoPageProps {
  params: Promise<{ templateName: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Catálogo",
    description: "Explorá nuestro catálogo completo de productos.",
  };
}

export default async function CatalogoPage({ params }: CatalogoPageProps) {
  const { templateName } = await params;

  if (!(templateName in templateRegistry)) {
    notFound();
  }

  const data = await loadTemplateData(templateName);

  return (
    <TemplateLayout
      store={data.store}
      products={data.products}
      categories={data.categories}
      config={data.config}
      manifest={data.manifest}
    />
  );
}
