// Info page — shows store information for ALL templates.
// Route: /template/[templateName]/info

import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

interface InfoPageProps {
  params: Promise<{ templateName: string }>;
}

export default async function InfoPage({ params }: InfoPageProps) {
  await params;

  return null;
}
