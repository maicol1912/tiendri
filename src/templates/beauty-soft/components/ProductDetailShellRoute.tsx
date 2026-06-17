"use client";

// Beauty Soft Template — ProductDetailShellRoute
// Client boundary. Reads product data + wires cart + navigation.

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ProductDetailPage } from "./ProductDetailPage";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../../_shared/hooks/useTemplateNav";
import { useVariantPrice } from "@/hooks/useVariantPrice";
import type { BeautySoftProduct } from "../types";
import type { StoreInfo } from "@/types/store";

interface ProductDetailShellRouteProps {
  store: StoreInfo;
  product: BeautySoftProduct;
  products?: BeautySoftProduct[];
  currencySymbol?: string;
}

export function ProductDetailShellRoute({
  store,
  product,
  products = [],
  currencySymbol = "$",
}: ProductDetailShellRouteProps) {
  const nav = useTemplateNav();
  const { addItem, totalItems } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 4);

  const {
    selectedVariants,
    selectVariant,
    effectivePrice,
    variantName: variantPriceName,
  } = useVariantPrice(product.price, product.variants);

  const handleAddToCart = useCallback(() => {
    if (!product.inStock) return;

    const primaryImage = product.images[0]?.url ?? null;

    addItem({
      productId: product.id,
      name: product.name,
      price: effectivePrice,
      originalPrice: product.originalPrice,
      imageUrl: primaryImage,
      description: product.description,
      variantName: variantPriceName,
      quantity,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
    setQuantity(1);
  }, [product, quantity, addItem, effectivePrice, variantPriceName]);

  const handleNavLinkClick = useCallback(
    (href: string) => {
      if (href === "/") nav.goHome();
      else if (href === "/catalogo") nav.goListing();
      else if (href === "/info") nav.goInfo();
    },
    [nav]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <ProductDetailPage
        store={store}
        product={product}
        activeImageIndex={activeImageIndex}
        quantity={quantity}
        isAdded={isAdded}
        currencySymbol={currencySymbol}
        cartItemCount={totalItems}
        activeHref="/catalogo"
        effectivePrice={effectivePrice}
        selectedVariants={selectedVariants}
        onSelectVariant={selectVariant}
        onBack={nav.goHome}
        onCartClick={nav.goCart}
        onImageIndexChange={setActiveImageIndex}
        onQuantityIncrement={() => setQuantity((prev) => prev + 1)}
        onQuantityDecrement={() => setQuantity((prev) => Math.max(1, prev - 1))}
        onAddToCart={handleAddToCart}
        onNavLinkClick={handleNavLinkClick}
        relatedProducts={relatedProducts}
        onProductClick={nav.goProduct}
      />
    </motion.div>
  );
}
