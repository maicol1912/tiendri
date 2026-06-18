"use client";

// _core/shells/ProductDetailShell.tsx
// Client boundary para la ruta de detalle de producto.
// Gestiona imagen seleccionada, cantidad y acordeón; delega render a CoreProductDetailPage.

import { useCallback } from "react";
import { CoreProductDetailPage } from "@/templates/_core/pages/CoreProductDetailPage";
import { useProductDetail } from "@/templates/_core/hooks/useProductDetail";
import { useTemplateNav } from "@/templates/_shared/hooks/useTemplateNav";
import type { StorefrontProduct } from "@/types/store";
import type { ResolvedStoreConfig } from "@/types/templates/resolved-config";
import type { TemplateVariants } from "@/types/templates/manifest";

export interface ProductDetailShellProps {
  product: StorefrontProduct;
  relatedProducts: StorefrontProduct[];
  config: ResolvedStoreConfig;
  variants: TemplateVariants;
  currencySymbol?: string;
}

export function ProductDetailShell({
  product,
  relatedProducts,
  config,
  variants,
  currencySymbol = "$",
}: ProductDetailShellProps) {
  const nav = useTemplateNav();
  const {
    selectedImageIndex,
    setSelectedImageIndex,
    quantity,
    incrementQuantity,
    decrementQuantity,
    isAdded,
    handleAddToCart,
    activeAccordion,
    toggleAccordion,
  } = useProductDetail();

  const handleProductClick = useCallback(
    (productId: string) => nav.goProduct(productId),
    [nav]
  );

  const handleBack = useCallback(() => nav.goListing(), [nav]);

  return (
    <CoreProductDetailPage
      product={product}
      relatedProducts={relatedProducts}
      config={config}
      variants={{ productCard: variants.productCard }}
      selectedImageIndex={selectedImageIndex}
      setSelectedImageIndex={setSelectedImageIndex}
      quantity={quantity}
      incrementQuantity={incrementQuantity}
      decrementQuantity={decrementQuantity}
      isAdded={isAdded}
      handleAddToCart={handleAddToCart}
      activeAccordion={activeAccordion}
      toggleAccordion={toggleAccordion}
      onBack={handleBack}
      onProductClick={handleProductClick}
      currencySymbol={currencySymbol}
    />
  );
}
