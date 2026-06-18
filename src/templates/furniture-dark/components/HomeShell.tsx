"use client";

// Furniture Dark — HomeShell
// Rule 18: reads live config from LayoutConfigContext via useLayoutConfig().
// Bridges mock data + cart context + config into presentational HomePage.

import { useState } from "react";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "@/templates/_shared/hooks/useTemplateNav";
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
  const { config } = useLayoutConfig<FurnitureDarkConfig>();
  const { totalItems: cartItemCount } = useCart();
  const nav = useTemplateNav();

  const [activeCategoryId, setActiveCategoryId] = useState<string | undefined>(undefined);

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
      cartItemCount={cartItemCount}
      activeHref="/"
      onCategoryClick={(categoryId) => {
        setActiveCategoryId(categoryId === activeCategoryId ? undefined : categoryId);
        nav.goListing();
      }}
      onProductClick={(productId) => nav.goProduct(productId)}
      onViewAllClick={nav.goListing}
      onSearchClick={nav.goSearch}
      onCartClick={nav.goCart}
      onNavLinkClick={(href) => {
        if (href === "/") nav.goHome();
        else if (href === "/catalogo") nav.goListing();
        else if (href === "/info") nav.goInfo();
      }}
      onBottomNavTab={(tab) => {
        if (tab === "cart") nav.goCart();
        else if (tab === "search") nav.goSearch();
        else if (tab === "info") nav.goInfo();
        else if (tab === "home") nav.goHome();
      }}
      onPromoCardClick={nav.goListing}
    />
  );
}
