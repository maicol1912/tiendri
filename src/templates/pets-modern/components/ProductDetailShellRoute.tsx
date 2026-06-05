"use client";

// Pet V3 Template — Product Detail Shell Route
// Wraps ProductDetailPage with cart provider + quantity state.

import { useState, useCallback } from "react";
import { ProductDetailPage } from "./ProductDetailPage";
import { useCart } from "../context/CartContext";
import { useTemplateNav } from "../hooks/useTemplateNav";
import type { StoreInfo, StorefrontProduct } from "../types";

interface ProductDetailShellRouteProps {
  store: StoreInfo;
  product: StorefrontProduct;
  currencySymbol?: string;
}

export function ProductDetailShellRoute({
  product,
  currencySymbol = "$",
}: ProductDetailShellRouteProps) {
  const nav = useTemplateNav();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = useCallback(() => {
    addItem({
      productId: product.id,
      variantName: null,
      name: product.name,
      price: product.price,
      imageUrl: product.images[0]?.url ?? null,
      quantity,
    });
    nav.goCart();
  }, [addItem, product, quantity, nav]);

  return (
    <ProductDetailPage
      product={product}
      quantity={quantity}
      currencySymbol={currencySymbol}
      onBack={() => nav.goHome()}
      onIncrement={() => setQuantity((q) => q + 1)}
      onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
      onAddToCart={handleAddToCart}
    />
  );
}
