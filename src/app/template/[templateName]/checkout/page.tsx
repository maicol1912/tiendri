// Checkout page — supports multiple templates.
// Route: /template/[templateName]/checkout

import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

interface CheckoutPageProps {
  params: Promise<{ templateName: string }>;
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  await params;

  return null;
}
