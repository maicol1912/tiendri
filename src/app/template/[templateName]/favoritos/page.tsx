// Favoritos page — no longer active (wishlist removed from all templates).
// Route: /template/[templateName]/favoritos

import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Favoritos",
  robots: { index: false, follow: false },
};

interface FavoritosPageProps {
  params: Promise<{ templateName: string }>;
}

export default async function FavoritosPage({ params: _params }: FavoritosPageProps) {
  // Wishlist has been removed from all templates — this route is no longer used.
  notFound();
}
