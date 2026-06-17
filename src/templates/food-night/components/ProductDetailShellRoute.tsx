"use client";

// Food Night — Product Detail Shell Route

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ProductDetailPage } from "./ProductDetailPage";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../../_shared/hooks/useTemplateNav";
import { useVariantPrice } from "@/hooks/useVariantPrice";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { foodNightConfig } from "../config";
import type { FoodNightConfig } from "../config";
import type { StoreInfo, StorefrontProduct, SizeOption } from "../types";

interface ProductDetailShellRouteProps {
  store: StoreInfo;
  product: StorefrontProduct;
  products?: StorefrontProduct[];
  sizeOptions?: SizeOption[];
  currencySymbol?: string;
}

export function ProductDetailShellRoute({
  store,
  product,
  products = [],
  sizeOptions = [],
  currencySymbol = "$",
}: ProductDetailShellRouteProps) {
  const nav = useTemplateNav();
  const { addItem, totalItems } = useCart();

  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 4);
  const { config } = useLayoutConfig<FoodNightConfig>();
  const layout = config?.layout ?? foodNightConfig.layout;

  const [quantity, setQuantity] = useState(1);
  const [selectedSizeId, setSelectedSizeId] = useState<string | null>(
    sizeOptions[0]?.id ?? null
  );
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const {
    selectedVariants,
    selectVariant,
    effectivePrice,
    variantName: variantPriceName,
  } = useVariantPrice(product.price, product.variants);

  const handleNavLinkClick = useCallback((href: string) => {
    if (href === "/") nav.goHome();
    else if (href === "/catalogo") nav.goListing();
    else if (href === "/info") nav.goInfo();
  }, [nav]);

  const handleAddToCart = useCallback(() => {
    const primaryImage = product.images[0]?.url ?? null;
    const selectedSize = sizeOptions.find((s) => s.id === selectedSizeId);
    const sizeLabel = selectedSize?.label ?? null;
    const finalVariantName = variantPriceName
      ? (sizeLabel ? `${sizeLabel} / ${variantPriceName}` : variantPriceName)
      : sizeLabel;

    addItem({
      productId: product.id,
      name: product.name,
      price: effectivePrice,
      quantity,
      imageUrl: primaryImage,
      variantName: finalVariantName,
      rating: product.rating,
      reviewCount: product.reviewCount,
    });

    nav.goCart();
  }, [product, sizeOptions, selectedSizeId, quantity, addItem, nav, effectivePrice, variantPriceName]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <ProductDetailPage
        store={store}
        product={product}
        sizeOptions={sizeOptions}
        currencySymbol={currencySymbol}
        selectedSizeId={selectedSizeId}
        quantity={quantity}
        isDescriptionExpanded={isDescriptionExpanded}
        activeTab="home"
        activeHref="/catalogo"
        cartItemCount={totalItems}
        layout={layout}
        effectivePrice={effectivePrice}
        selectedVariants={selectedVariants}
        onSelectVariant={selectVariant}
        onBack={nav.goHome}
        onSizeSelect={setSelectedSizeId}
        onDecrement={() => setQuantity((prev) => Math.max(1, prev - 1))}
        onIncrement={() => setQuantity((prev) => prev + 1)}
        onAddToCart={handleAddToCart}
        onToggleDescription={() => setIsDescriptionExpanded((prev) => !prev)}
        onSearchClick={nav.goSearch}
        onCartClick={nav.goCart}
        onNavLinkClick={handleNavLinkClick}
        onTabChange={(tab) => {
          if (tab === "home") nav.goHome();
          else if (tab === "cart") nav.goCart();
          else if (tab === "info") nav.goInfo();
        }}
        productDetailTabs={[...(config.content?.productDetailTabs ?? [])]}
        relatedProducts={relatedProducts}
        onProductClick={nav.goProduct}
      />
    </motion.div>
  );
}
