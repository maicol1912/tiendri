"use client";

// Furniture Light — ProductDetailShellRoute
// Rendered at /template/furniture-light/producto/[productId]

import { useState, useCallback } from "react";
import { ProductDetailPage } from "./ProductDetailPage";
import { useCart } from "../context/CartContext";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import type { FurnitureLightConfig } from "../config";
import type { FurnitureProduct, FurnitureStoreInfo, FurnitureNavTab } from "../types";

interface ProductDetailShellRouteProps {
  store: FurnitureStoreInfo;
  product: FurnitureProduct;
  relatedProducts?: FurnitureProduct[];
  currencySymbol?: string;
}

export function ProductDetailShellRoute({
  store,
  product,
  relatedProducts = [],
  currencySymbol = "$",
}: ProductDetailShellRouteProps) {
  const nav = useTemplateNav();
  const { totalItems, addItem } = useCart();
  const { config } = useLayoutConfig<FurnitureLightConfig>();

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [dimensionUnit, setDimensionUnit] = useState<"cm" | "inch">("cm");
  const [wishlistedIds, setWishlistedIds] = useState<Set<string>>(new Set());

  const handleWishlistToggle = useCallback(() => {
    setIsWishlisted((prev) => !prev);
  }, []);

  const handleAddToCart = useCallback(() => {
    if (product.available === false) return;
    addItem({
      productId: product.id,
      variant: product.colorOptions?.[selectedColorIndex] ?? product.colorVariant ?? undefined,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.images[0]?.url ?? null,
    });
    nav.goCart();
  }, [product, selectedColorIndex, addItem, nav]);

  const handleWishlistToggleProduct = useCallback((productId: string) => {
    setWishlistedIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  }, []);

  const handleAddToCartProduct = useCallback(
    (productId: string) => {
      const p = relatedProducts.find((r) => r.id === productId);
      if (!p || p.available === false) return;
      addItem({
        productId: p.id,
        variant: p.colorVariant ?? undefined,
        name: p.name,
        price: p.price,
        quantity: 1,
        imageUrl: p.images[0]?.url ?? null,
      });
    },
    [relatedProducts, addItem]
  );

  const enrichedRelated = relatedProducts.map((p) => ({
    ...p,
    inWishlist: wishlistedIds.has(p.id),
  }));

  const handleTabChange = useCallback(
    (tab: FurnitureNavTab) => {
      if (tab === "home") nav.goHome();
      else if (tab === "search") nav.goSearch();
      else if (tab === "cart") nav.goCart();
    },
    [nav]
  );

  return (
    <ProductDetailPage
      store={store}
      product={{ ...product, inWishlist: isWishlisted }}
      navLinks={config.navLinks}
      relatedProducts={enrichedRelated}
      grid={config.grid}
      layout={config.layout}
      activeTab="home"
      cartItemCount={totalItems}
      currencySymbol={currencySymbol}
      selectedImageIndex={selectedImageIndex}
      selectedColorIndex={selectedColorIndex}
      isWishlisted={isWishlisted}
      dimensionUnit={dimensionUnit}
      onBack={nav.goHome}
      onSearchClick={nav.goSearch}
      onCartClick={nav.goCart}
      onWishlistToggle={handleWishlistToggle}
      onAddToCart={handleAddToCart}
      onImageSelect={setSelectedImageIndex}
      onColorSelect={setSelectedColorIndex}
      onDimensionUnitToggle={() => setDimensionUnit((u) => (u === "cm" ? "inch" : "cm"))}
      onProductClick={(id) => nav.goProduct(id)}
      onWishlistToggleProduct={handleWishlistToggleProduct}
      onAddToCartProduct={handleAddToCartProduct}
      onTabChange={handleTabChange}
    />
  );
}
