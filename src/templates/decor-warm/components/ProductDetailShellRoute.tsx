"use client";

// Decor Warm Template — ProductDetailShellRoute
// Client boundary. Reads product data + wires cart + navigation.

import { useState, useCallback } from "react";
import { ProductDetailPage } from "./ProductDetailPage";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../hooks/useTemplateNav";
import type { DecorWarmProduct, DecorWarmCategory } from "../types";
import type { StoreInfo } from "@/types/store";

interface ProductDetailShellRouteProps {
  store: StoreInfo;
  product: DecorWarmProduct;
  categories?: DecorWarmCategory[];
  currencySymbol?: string;
}

export function ProductDetailShellRoute({
  store: _store,
  product,
  categories = [],
  currencySymbol = "$",
}: ProductDetailShellRouteProps) {
  const nav = useTemplateNav();
  const { addItem } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(
    product.categoryId ?? null
  );

  const handleAddToCart = useCallback(() => {
    if (!product.available) return;

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.images[0]?.url ?? null,
      variantName: null,
      quantity: quantity,
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      nav.goCart();
    }, 900);
  }, [product, quantity, addItem, nav]);

  return (
    <ProductDetailPage
      product={product}
      categories={categories}
      activeCategoryId={activeCategoryId}
      activeImageIndex={activeImageIndex}
      quantity={quantity}
      isAdded={isAdded}
      currencySymbol={currencySymbol}
      onBack={nav.goHome}
      onCartClick={nav.goCart}
      onCategoryChange={(id) => {
        setActiveCategoryId(id);
        nav.goListing();
      }}
      onImageIndexChange={setActiveImageIndex}
      onQuantityChange={setQuantity}
      onAddToCart={handleAddToCart}
    />
  );
}
