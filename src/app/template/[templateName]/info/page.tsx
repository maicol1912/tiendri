// Info page — shows store information for ALL templates.
// Route: /template/[templateName]/info

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { templateRegistry } from "@/templates";
import { TemplateLayout } from "@/templates/_core";
import { loadTemplateData } from "../_lib/loadTemplateData";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

interface InfoPageProps {
  params: Promise<{ templateName: string }>;
}

export default async function InfoPage({ params }: InfoPageProps) {
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
