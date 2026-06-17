"use client";

// Furniture Light — ProductDetailShellRoute
// Rendered at /template/furniture-light/producto/[productId]

import { useState, useCallback } from "react";
import { ProductDetailPage } from "./ProductDetailPage";
import { useCart } from "@/lib/cart";
import { useVariantPrice } from "@/hooks/useVariantPrice";
import { useTemplateNav } from "../../_shared/hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import type { FurnitureLightConfig } from "../config";
import type { FurnitureProduct, FurnitureStoreInfo, FurnitureNavTab } from "../types";

interface ProductDetailShellRouteProps {
  store: FurnitureStoreInfo;
  product: FurnitureProduct;
  relatedProducts?: FurnitureProduct[];
  currencySymbol?: string;
}

export function ProductDetailShellRoute({
  store,
  product,
  relatedProducts = [],
  currencySymbol = "$",
}: ProductDetailShellRouteProps) {
  const nav = useTemplateNav();
  const { totalItems, addItem } = useCart();
  const { config } = useLayoutConfig<FurnitureLightConfig>();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [dimensionUnit, setDimensionUnit] = useState<"cm" | "inch">("cm");
  const [wishlistedIds, setWishlistedIds] = useState<Set<string>>(new Set());

  const {
    selectedVariants,
    selectVariant,
    effectivePrice,
    variantName: variantPriceName,
  } = useVariantPrice(product.price, product.variants);

  const handleAddToCart = useCallback(() => {
    if (product.available === false) return;
    const legacyVariantName = product.colorOptions?.[selectedColorIndex] ?? product.colorVariant ?? null;
    addItem({
      productId: product.id,
      variantName: variantPriceName || legacyVariantName,
      name: product.name,
      price: effectivePrice,
      quantity: 1,
      imageUrl: product.images[0]?.url ?? null,
    });
    nav.goCart();
  }, [product, selectedColorIndex, addItem, nav, effectivePrice, variantPriceName]);

  const handleWishlistToggleProduct = useCallback((productId: string) => {
    setWishlistedIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  }, []);

  const handleAddToCartProduct = useCallback(
    (productId: string) => {
      const p = relatedProducts.find((r) => r.id === productId);
      if (!p || p.available === false) return;
      addItem({
        productId: p.id,
        variantName: p.colorVariant ?? null,
        name: p.name,
        price: p.price,
        quantity: 1,
        imageUrl: p.images[0]?.url ?? null,
      });
    },
    [relatedProducts, addItem]
  );

  const enrichedRelated = relatedProducts.map((p) => ({
    ...p,
    inWishlist: wishlistedIds.has(p.id),
  }));

  const handleNavLinkClick = useCallback(
    (href: string) => {
      if (href === "/") nav.goHome();
      else if (href === "/catalogo") nav.goListing();
      else if (href === "/info") nav.goInfo();
    },
    [nav]
  );

  const handleTabChange = useCallback(
    (tab: FurnitureNavTab) => {
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
      navLinks={config.content?.navLinks ?? []}
      relatedProducts={enrichedRelated}
      grid={config.grid}
      layout={config.layout}
      activeTab="home"
      cartItemCount={totalItems}
      currencySymbol={currencySymbol}
      selectedImageIndex={selectedImageIndex}
      selectedColorIndex={selectedColorIndex}
      dimensionUnit={dimensionUnit}
      effectivePrice={effectivePrice}
      selectedVariants={selectedVariants}
      onSelectVariant={selectVariant}
      onBack={nav.goHome}
      onSearchClick={nav.goSearch}
      onCartClick={nav.goCart}
      onNavLinkClick={handleNavLinkClick}
      onAddToCart={handleAddToCart}
      onImageSelect={setSelectedImageIndex}
      onColorSelect={setSelectedColorIndex}
      onDimensionUnitToggle={() => setDimensionUnit((u) => (u === "cm" ? "inch" : "cm"))}
      onProductClick={(id) => nav.goProduct(id)}
      onAddToCartProduct={handleAddToCartProduct}
      onTabChange={handleTabChange}
      productDetailTabs={[...(config.content?.productDetailTabs ?? [])]}
    />
  );
}
