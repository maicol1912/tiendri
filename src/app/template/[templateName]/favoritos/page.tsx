// Wishlist/Favoritos page — supports decor-warm template.
// Route: /template/[templateName]/favoritos

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mockStore as decorWarmMockStore } from "@/templates/decor-warm/mock/data";
import { WishlistShellRoute as DecorWarmWishlistShellRoute } from "@/templates/decor-warm/components/WishlistShellRoute";

export const metadata: Metadata = {
  title: "Favoritos",
  robots: { index: false, follow: false },
};

interface FavoritosPageProps {
  params: Promise<{ templateName: string }>;
}

export default async function FavoritosPage({ params }: FavoritosPageProps) {
  const { templateName } = await params;

  // ── Decor Warm ───────────────────────────────────────────────────────────────
  if (templateName === "decor-warm") {
    return <DecorWarmWishlistShellRoute store={decorWarmMockStore} />;
  }

  // Other templates don't have a wishlist page yet
  notFound();
}
