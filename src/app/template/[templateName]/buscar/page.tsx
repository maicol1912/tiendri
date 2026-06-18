// Search page — supports multiple templates.
// Route: /template/[templateName]/buscar

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { templateRegistry } from "@/templates";
import { TemplateLayout } from "@/templates/_core";
import { loadTemplateData } from "../_lib/loadTemplateData";

export const metadata: Metadata = {
  title: "Buscar",
  robots: { index: false, follow: true },
};

interface BuscarPageProps {
  params: Promise<{ templateName: string }>;
}

export default async function BuscarPage({ params }: BuscarPageProps) {
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
