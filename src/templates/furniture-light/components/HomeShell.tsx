"use client";

// Furniture Light — Home Shell
// Reads configOverride from LayoutConfigContext, wires navigation and cart state.

import { useState, useCallback } from "react";
import { HomePage } from "./HomePage";
import { useCart } from "../context/CartContext";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { furnitureLightConfig } from "../config";
import type { FurnitureLightConfig } from "../config";
import type {
  FurnitureProduct,
  FurnitureCategory,
  FurnitureStoreInfo,
  StyleCard,
} from "../types";

interface HomeShellProps {
  store: FurnitureStoreInfo;
  categories: FurnitureCategory[];
  products: FurnitureProduct[];
  featuredCard?: { title: string; subtitle: string; image: string };
  styleCards?: StyleCard[];
  heroBannerImage?: string;
  heroBannerTitle?: string;
  heroBannerSubtitle?: string;
  currencySymbol?: string;
}

export function HomeShell({
  store,
  categories,
  products,
  featuredCard,
  styleCards,
  heroBannerImage,
  heroBannerTitle,
  heroBannerSubtitle,
  currencySymbol = "$",
}: HomeShellProps) {
  const nav = useTemplateNav();
  const { totalItems, addItem } = useCart();
  const { config } = useLayoutConfig<FurnitureLightConfig>();

  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [wishlistedIds, setWishlistedIds] = useState<Set<string>>(new Set());

  // Enrich products with wishlist state
  const enrichedProducts = products.map((p) => ({
    ...p,
    inWishlist: wishlistedIds.has(p.id),
  }));

  const handleWishlistToggle = useCallback((productId: string) => {
    setWishlistedIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  }, []);

  const handleAddToCart = useCallback(
    (productId: string) => {
      const product = products.find((p) => p.id === productId);
      if (!product || product.available === false) return;
      addItem({
        productId: product.id,
        variant: product.colorVariant ?? undefined,
        name: product.name,
        price: product.price,
        quantity: 1,
        imageUrl: product.images[0]?.url ?? null,
      });
    },
    [products, addItem]
  );

  return (
    <HomePage
      store={store}
      navLinks={config.navLinks}
      categories={categories}
      products={enrichedProducts}
      featuredCard={featuredCard}
      styleCards={styleCards}
      heroBannerImage={heroBannerImage}
      heroBannerTitle={heroBannerTitle ?? furnitureLightConfig.content.heroBanner.title}
      heroBannerSubtitle={heroBannerSubtitle ?? furnitureLightConfig.content.heroBanner.subtitle}
      sections={config.sections}
      layout={config.layout}
      grid={config.grid}
      activeTab="home"
      activeCategoryId={activeCategoryId}
      cartItemCount={totalItems}
      currencySymbol={currencySymbol}
      onCartClick={nav.goCart}
      onSearchClick={nav.goSearch}
      onCategoryChange={(id) => setActiveCategoryId((prev) => (prev === id ? null : id))}
      onProductClick={nav.goProduct}
      onWishlistToggle={handleWishlistToggle}
      onAddToCart={handleAddToCart}
      onTabChange={(tab) => {
        if (tab === "search") nav.goSearch();
        else if (tab === "cart") nav.goCart();
      }}
      onStyleClick={() => nav.goListing()}
      onSeeAll={nav.goListing}
    />
  );
}
