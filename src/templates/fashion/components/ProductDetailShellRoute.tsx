"use client";

// Fashion Template — Product Detail Shell Route
// State: selectedImageIndex, selectedColor, selectedSize.
// Add to cart uses variantName (combined color + size).
// Navigation via useTemplateNav.

import { useState, useCallback } from "react";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { ProductDetailPage } from "./ProductDetailPage";
import type { StoreInfo, StorefrontProduct, NavTab } from "../types";

interface ProductDetailShellInnerProps {
  store: StoreInfo;
  product: StorefrontProduct;
  currencySymbol?: string;
}

function ProductDetailShellInner({
  store,
  product,
  currencySymbol = "$",
}: ProductDetailShellInnerProps) {
  const nav = useTemplateNav();
  const { addItem, totalItems } = useCart();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors?.[0] ?? undefined
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);

  const handleAddToCart = useCallback(() => {
    if (!product.inStock) return;

    // Combine color + size into variantName
    const parts = [selectedColor, selectedSize].filter(Boolean);
    const variantName = parts.length > 0 ? parts.join(" / ") : null;

    addItem({
      productId: product.id,
      name: product.name,
      variantName,
      price: product.price,
      quantity: 1,
      imageUrl: product.images[0]?.url ?? null,
    });
    nav.goCart();
  }, [product, addItem, nav, selectedColor, selectedSize]);

  const handleBack = useCallback(() => {
    // Use browser history back
    if (typeof window !== "undefined") window.history.back();
  }, []);

  const handleTabChange = useCallback(
    (tab: NavTab) => {
      if (tab === "home") nav.goHome();
      else if (tab === "search") nav.goSearch();
      else if (tab === "cart") nav.goCart();
    },
    [nav]
  );

  return (
    <ProductDetailPage
      store={store}
      product={product}
      selectedImageIndex={selectedImageIndex}
      selectedColor={selectedColor}
      selectedSize={selectedSize}
      activeTab="home"
      cartItemCount={totalItems}
      currencySymbol={currencySymbol}
      onBack={handleBack}
      onSearchClick={nav.goSearch}
      onCartClick={nav.goCart}
      onAddToCart={handleAddToCart}
      onImageSelect={setSelectedImageIndex}
      onColorSelect={setSelectedColor}
      onSizeSelect={setSelectedSize}
      onTabChange={handleTabChange}
    />
  );
}

interface ProductDetailShellRouteProps {
  store: StoreInfo;
  product: StorefrontProduct;
  currencySymbol?: string;
}

export function ProductDetailShellRoute({
  store,
  ...rest
}: ProductDetailShellRouteProps) {
  return <ProductDetailShellInner store={store} {...rest} />;
}
