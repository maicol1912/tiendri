"use client";

// Fashion Template — Product Detail Shell Route
// State: selectedImageIndex, selectedColor, selectedSize.
// Add to cart uses variantName (combined color + size).
// Navigation via useTemplateNav.

import { useState, useCallback } from "react";
import { useCart } from "@/lib/cart";
import { useVariantPrice } from "@/hooks/useVariantPrice";
import { useTemplateNav } from "../../_shared/hooks/useTemplateNav";
import { ProductDetailPage } from "./ProductDetailPage";
import type { StoreInfo, StorefrontProduct, NavTab } from "../types";

interface ProductDetailShellInnerProps {
  store: StoreInfo;
  product: StorefrontProduct;
  products?: StorefrontProduct[];
  currencySymbol?: string;
}

function ProductDetailShellInner({
  store,
  product,
  products = [],
  currencySymbol = "$",
}: ProductDetailShellInnerProps) {
  const nav = useTemplateNav();
  const { addItem, totalItems } = useCart();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors?.[0] ?? undefined
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);

  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 4);

  const {
    selectedVariants,
    selectVariant,
    effectivePrice,
    variantName: variantPriceName,
  } = useVariantPrice(product.price, product.variants);

  const handleAddToCart = useCallback(() => {
    if (!product.inStock) return;

    const legacyParts = [selectedColor, selectedSize].filter(Boolean);
    const legacyVariantName = legacyParts.length > 0 ? legacyParts.join(" / ") : null;

    addItem({
      productId: product.id,
      name: product.name,
      variantName: variantPriceName || legacyVariantName,
      price: effectivePrice,
      quantity,
      imageUrl: product.images[0]?.url ?? null,
    });
    setQuantity(1);
    nav.goCart();
  }, [product, addItem, nav, selectedColor, selectedSize, effectivePrice, variantPriceName, quantity]);

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

  const handleNavLinkClick = useCallback(
    (href: string) => {
      if (href === "/") nav.goHome();
      else if (href === "/catalogo") nav.goListing();
      else if (href === "/info") nav.goInfo();
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
      effectivePrice={effectivePrice}
      selectedVariants={selectedVariants}
      onSelectVariant={selectVariant}
      activeTab="home"
      cartItemCount={totalItems}
      currencySymbol={currencySymbol}
      activeHref="/catalogo"
      onBack={handleBack}
      onSearchClick={nav.goSearch}
      onCartClick={nav.goCart}
      onNavLinkClick={handleNavLinkClick}
      onAddToCart={handleAddToCart}
      onImageSelect={setSelectedImageIndex}
      onColorSelect={setSelectedColor}
      onSizeSelect={setSelectedSize}
      onTabChange={handleTabChange}
      quantity={quantity}
      onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
      onIncrement={() => setQuantity((q) => q + 1)}
      relatedProducts={relatedProducts}
      onProductClick={nav.goProduct}
    />
  );
}

interface ProductDetailShellRouteProps {
  store: StoreInfo;
  product: StorefrontProduct;
  products?: StorefrontProduct[];
  currencySymbol?: string;
}

export function ProductDetailShellRoute({
  store,
  ...rest
}: ProductDetailShellRouteProps) {
  return <ProductDetailShellInner store={store} {...rest} />;
}
