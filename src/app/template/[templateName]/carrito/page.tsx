// Cart page — supports multiple templates.
// Route: /template/[templateName]/carrito

import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

interface CarritoPageProps {
  params: Promise<{ templateName: string }>;
}

export default async function CarritoPage({ params }: CarritoPageProps) {
  await params;

  return null;
}
