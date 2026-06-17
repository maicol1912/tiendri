"use client";

// Furniture Dark — ProductDetailShellRoute
// Manages: activeImageIndex, selectedColorId, quantity state
// Reads product from mock data by productId
// Adds to cart → navigates to cart page

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { useVariantPrice } from "@/hooks/useVariantPrice";
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

  const relatedProducts = mockProducts.filter((p) => p.id !== product.id).slice(0, 4);

  const images = product.images ?? [];
  const firstColorId = product.colors?.[0]?.id;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColorId, setSelectedColorId] = useState<string | undefined>(firstColorId);
  const [quantity, setQuantity] = useState(1);

  const {
    selectedVariants,
    selectVariant,
    effectivePrice,
    variantName: variantPriceName,
  } = useVariantPrice(product.price, product.variants);

  function handleAddToCart() {
    addItem({
      productId: product.id,
      name: product.name,
      price: effectivePrice,
      imageUrl: images[0]?.url ?? product.image ?? null,
      quantity,
      variantName: variantPriceName,
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
      effectivePrice={effectivePrice}
      selectedVariants={selectedVariants}
      onSelectVariant={selectVariant}
      activeHref="/catalogo"
      onColorSelect={setSelectedColorId}
      onImageSelect={setActiveImageIndex}
      onIncrement={increment}
      onDecrement={decrement}
      onAddToCart={handleAddToCart}
      onBack={() => router.back()}
      onSearchClick={() => router.push(`${TEMPLATE_BASE}/buscar`)}
      onCartClick={() => router.push(`${TEMPLATE_BASE}/carrito`)}
      onNavLinkClick={(href) => {
        if (href === "/") router.push(TEMPLATE_BASE);
        else if (href === "/catalogo") router.push(`${TEMPLATE_BASE}/catalogo`);
        else if (href === "/info") router.push(`${TEMPLATE_BASE}/info`);
      }}
      onInfoClick={() => router.push(`${TEMPLATE_BASE}/info`)}
      cartItemCount={totalItems}
      relatedProducts={relatedProducts}
      onProductClick={(id) => router.push(`${TEMPLATE_BASE}/producto/${id}`)}
    />
  );
}
