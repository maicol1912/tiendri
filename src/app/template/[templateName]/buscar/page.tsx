// Search page — supports multiple templates.
// Route: /template/[templateName]/buscar

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buscar",
  robots: { index: false, follow: true },
};

interface BuscarPageProps {
  params: Promise<{ templateName: string }>;
}

export default async function BuscarPage({ params }: BuscarPageProps) {
  await params;

  return null;
}
