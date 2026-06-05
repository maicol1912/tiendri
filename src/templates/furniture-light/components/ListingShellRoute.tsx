"use client";

// Furniture Light — ListingShellRoute
// Rendered at /template/furniture-light/catalogo

import { useState, useCallback } from "react";
import { ListingPage } from "./ListingPage";
import { useCart } from "../context/CartContext";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import type { FurnitureLightConfig } from "../config";
import type { FurnitureProduct, FurnitureCategory, FurnitureStoreInfo, FurnitureNavTab } from "../types";

interface ListingShellRouteProps {
  store: FurnitureStoreInfo;
  products: FurnitureProduct[];
  categories?: FurnitureCategory[];
  currencySymbol?: string;
}

export function ListingShellRoute({
  store,
  products,
  categories = [],
  currencySymbol = "$",
}: ListingShellRouteProps) {
  const nav = useTemplateNav();
  const { totalItems, addItem } = useCart();
  const { config } = useLayoutConfig<FurnitureLightConfig>();

  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [wishlistedIds, setWishlistedIds] = useState<Set<string>>(new Set());

  const filteredProducts =
    activeCategoryId === null
      ? products
      : products.filter((p) => p.categoryId === activeCategoryId);

  const enrichedProducts = filteredProducts.map((p) => ({
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

  const handleTabChange = useCallback(
    (tab: FurnitureNavTab) => {
      if (tab === "home") nav.goHome();
      else if (tab === "search") nav.goSearch();
      else if (tab === "cart") nav.goCart();
    },
    [nav]
  );

  return (
    <ListingPage
      store={store}
      navLinks={config.navLinks}
      products={enrichedProducts}
      categories={categories}
      layout={config.layout}
      grid={config.grid}
      activeCategoryId={activeCategoryId}
      activeTab="home"
      cartItemCount={totalItems}
      currencySymbol={currencySymbol}
      onSearchClick={nav.goSearch}
      onCartClick={nav.goCart}
      onCategoryChange={(id) => setActiveCategoryId((prev) => (prev === id ? null : id))}
      onProductClick={(id) => nav.goProduct(id)}
      onWishlistToggle={handleWishlistToggle}
      onAddToCart={handleAddToCart}
      onTabChange={handleTabChange}
    />
  );
}
