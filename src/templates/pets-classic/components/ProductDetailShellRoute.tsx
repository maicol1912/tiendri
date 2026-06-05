"use client";

// Pets Classic — Product Detail Shell Route
// Receives productId from URL, finds product in mock data, passes to DetailPage.

import { useCallback } from "react";
import { ProductDetailPage } from "./ProductDetailPage";
import { useCart } from "../context/CartContext";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { petsClassicConfig } from "../config";
import type { PetsClassicConfig } from "../config";
import type {
  StoreInfo,
  PetsClassicProduct,
} from "../types";

interface ProductDetailShellRouteProps {
  store: StoreInfo;
  product: PetsClassicProduct;
  allProducts?: PetsClassicProduct[];
  currencySymbol?: string;
}

export function ProductDetailShellRoute({
  store,
  product,
  allProducts = [],
  currencySymbol = "$",
}: ProductDetailShellRouteProps) {
  const nav = useTemplateNav();
  const { totalItems, addItem } = useCart();
  const { config } = useLayoutConfig<PetsClassicConfig>();

  const handleAddToCart = useCallback(
    (productId: string, quantity: number) => {
      const p = allProducts.find((x) => x.id === productId) ?? product;
      if (!p.available) return;
      addItem({
        productId: p.id,
        name: p.name,
        price: p.price,
        quantity,
        imageUrl: p.images[0]?.url ?? null,
      });
    },
    [product, allProducts, addItem]
  );

  return (
    <ProductDetailPage
      store={store}
      product={product}
      layout={config.layout ?? petsClassicConfig.layout}
      activeTab="home"
      cartItemCount={totalItems}
      currencySymbol={currencySymbol}
      onBack={() => nav.goHome()}
      onSearchClick={nav.goSearch}
      onCartClick={nav.goCart}
      onAddToCart={handleAddToCart}
      onTabChange={(tab) => {
        if (tab === "cart") nav.goCart();
        else if (tab === "wishlist") nav.goSearch();
      }}
    />
  );
}
