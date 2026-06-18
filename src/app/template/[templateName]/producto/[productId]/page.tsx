// Product detail page — supports multiple templates.
// Route: /template/[templateName]/producto/[productId]

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { templateRegistry } from "@/templates";
import { TemplateLayout } from "@/templates/_core";
import { loadTemplateData } from "../../_lib/loadTemplateData";

interface ProductDetailPageProps {
  params: Promise<{ templateName: string; productId: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return { title: "Producto" };
}

export default async function ProductoPage({ params }: ProductDetailPageProps) {
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
