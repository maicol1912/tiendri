// Product listing page — supports multiple templates.
// Route: /template/[templateName]/catalogo

import type { Metadata } from "next";

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
  await params;

  return null;
}
