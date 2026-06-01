"use client";

// Furniture Dark — HomeShell
// Rule 18: reads live config from LayoutConfigContext via useLayoutConfig().
// Bridges mock data + cart context + config into presentational HomePage.

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { useCart } from "../context/CartContext";
import { TEMPLATE_BASE } from "../hooks/useTemplateNav";
import { HomePage } from "./HomePage";
import type { FurnitureDarkConfig } from "../config";
import {
  mockStore,
  mockCategories,
  mockBestSellers,
  mockFeaturedProducts,
  mockPromoCards,
  mockVideoSection,
} from "../mock/data";

export function HomeShell() {
  const router = useRouter();
  const { config } = useLayoutConfig<FurnitureDarkConfig>();
  const { totalItems: cartItemCount } = useCart();

  const [activeCategoryId, setActiveCategoryId] = useState<string | undefined>(undefined);
  const [wishlistedIds, setWishlistedIds] = useState<Set<string>>(new Set());

  // config.sections cast: readonly array
  const rawSections = config.sections as unknown as ReadonlyArray<{ id: string; visible: boolean }> | undefined;
  const sections = rawSections
    ? rawSections.map((s) => ({ id: s.id, visible: s.visible !== false }))
    : [
        { id: "promo-carousel", visible: true },
        { id: "categories", visible: true },
        { id: "video", visible: true },
        { id: "best-sellers", visible: true },
        { id: "featured", visible: true },
      ];

  function toggleWishlist(productId: string) {
    setWishlistedIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  }

  return (
    <HomePage
      store={mockStore}
      config={config}
      categories={mockCategories}
      bestSellers={mockBestSellers}
      featuredProducts={mockFeaturedProducts}
      promoCards={mockPromoCards}
      videoData={mockVideoSection}
      sections={sections}
      activeCategoryId={activeCategoryId}
      wishlistedIds={wishlistedIds}
      cartItemCount={cartItemCount}
      onCategoryClick={(categoryId) => {
        setActiveCategoryId(categoryId === activeCategoryId ? undefined : categoryId);
        router.push(`${TEMPLATE_BASE}/catalogo?category=${categoryId}`);
      }}
      onProductClick={(productId) =>
        router.push(`${TEMPLATE_BASE}/producto/${productId}`)
      }
      onViewAllClick={() => router.push(`${TEMPLATE_BASE}/catalogo`)}
      onSearchClick={() => router.push(`${TEMPLATE_BASE}/buscar`)}
      onCartClick={() => router.push(`${TEMPLATE_BASE}/carrito`)}
      onBottomNavTab={(tab) => {
        if (tab === "cart") router.push(`${TEMPLATE_BASE}/carrito`);
        else if (tab === "wishlist") router.push(`${TEMPLATE_BASE}/catalogo`);
        else if (tab === "home") router.push(TEMPLATE_BASE);
      }}
      onWishlistToggle={toggleWishlist}
      onPromoCardClick={() => router.push(`${TEMPLATE_BASE}/catalogo`)}
    />
  );
}
