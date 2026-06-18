// Product detail page — supports multiple templates.
// Route: /template/[templateName]/producto/[productId]

import type { Metadata } from "next";

interface ProductDetailPageProps {
  params: Promise<{ templateName: string; productId: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return { title: "Producto" };
}

export default async function ProductoPage({ params }: ProductDetailPageProps) {
  await params;

  return null;
}
