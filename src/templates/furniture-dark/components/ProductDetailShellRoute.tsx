"use client";

// Furniture Dark — ProductDetailShellRoute
// Manages: activeImageIndex, selectedColorId, quantity state
// Reads product from mock data by productId
// Adds to cart → navigates to cart page

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { TEMPLATE_BASE } from "../hooks/useTemplateNav";
import { ProductDetailPage } from "./ProductDetailPage";
import { mockStore, mockProducts } from "../mock/data";

interface ProductDetailShellRouteProps {
  productId: string;
}

export function ProductDetailShellRoute({ productId }: ProductDetailShellRouteProps) {
  const router = useRouter();
  const { addItem, totalItems } = useCart();

  const product = mockProducts.find((p) => p.id === productId) ?? mockProducts[0];
  if (!product) return null;

  const images = product.images ?? [];
  const firstColorId = product.colors?.[0]?.id;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColorId, setSelectedColorId] = useState<string | undefined>(firstColorId);
  const [quantity, setQuantity] = useState(1);

  function handleAddToCart() {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: images[0]?.url ?? product.image ?? null,
      quantity,
      variantName: null,
      colorId: selectedColorId,
      rating: product.rating,
    });
    router.push(`${TEMPLATE_BASE}/carrito`);
  }

  function increment() {
    setQuantity((q) => Math.min(q + 1, 99));
  }

  function decrement() {
    setQuantity((q) => Math.max(q - 1, 1));
  }

  return (
    <ProductDetailPage
      store={mockStore}
      product={product}
      quantity={quantity}
      activeImageIndex={activeImageIndex}
      selectedColorId={selectedColorId}
      onColorSelect={setSelectedColorId}
      onImageSelect={setActiveImageIndex}
      onIncrement={increment}
      onDecrement={decrement}
      onAddToCart={handleAddToCart}
      onBack={() => router.back()}
      onSearchClick={() => router.push(`${TEMPLATE_BASE}/buscar`)}
      onCartClick={() => router.push(`${TEMPLATE_BASE}/carrito`)}
      onInfoClick={() => router.push(`${TEMPLATE_BASE}/info`)}
      cartItemCount={totalItems}
    />
  );
}
