"use client";

// Decor Warm Template — ProductDetailShellRoute
// Client boundary. Reads product data + wires cart + navigation + shared Header.

import { useState, useCallback } from "react";
import { ProductDetailPage } from "./ProductDetailPage";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../../_shared/hooks/useTemplateNav";
import { mockProducts } from "../mock/data";
import type { DecorWarmProduct } from "../types";
import type { StoreInfo } from "@/types/store";

interface ProductDetailShellRouteProps {
  store: StoreInfo;
  product: DecorWarmProduct;
  currencySymbol?: string;
}

export function ProductDetailShellRoute({
  store,
  product,
  currencySymbol = "$",
}: ProductDetailShellRouteProps) {
  const nav = useTemplateNav();
  const { totalItems, addItem } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("descripcion");

  // ── Related products ─────────────────────────────────────────────────────────

  const sameCategory = mockProducts.filter(
    (p) => p.categoryId === product.categoryId && p.id !== product.id
  );
  const others = mockProducts.filter(
    (p) => p.id !== product.id && !sameCategory.find((c) => c.id === p.id)
  );
  const relatedProducts = [...sameCategory, ...others].slice(0, 4);

  // ── Handlers ─────────────────────────────────────────────────────────────────

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

  const handleNavLinkClick = useCallback(
    (href: string) => {
      if (href === "/") nav.goHome();
      else if (href === "/catalogo") nav.goListing();
      else if (href === "/info") nav.goInfo();
    },
    [nav]
  );

  const handleProductClick = useCallback(
    (productId: string) => {
      nav.goProduct(productId);
    },
    [nav]
  );

  const handleAccordionToggle = useCallback((id: string) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
  }, []);

  return (
    <ProductDetailPage
      store={store}
      product={product}
      relatedProducts={relatedProducts}
      activeImageIndex={activeImageIndex}
      quantity={quantity}
      isAdded={isAdded}
      currencySymbol={currencySymbol}
      cartItemCount={totalItems}
      openAccordion={openAccordion}
      onBack={nav.goHome}
      onCartOpen={nav.goCart}
      onNavLinkClick={handleNavLinkClick}
      onImageIndexChange={setActiveImageIndex}
      onQuantityChange={setQuantity}
      onAddToCart={handleAddToCart}
      onProductClick={handleProductClick}
      onAccordionToggle={handleAccordionToggle}
    />
  );
}
