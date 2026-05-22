"use client";

// Tech Premium — ProductDetailShellRoute
// URL-router version of ProductDetailShell.
// Uses useTemplateNav() for navigation and useLayoutConfig() for config.
// Rendered at /template/tech-premium/producto/[productId]

import { useState, useCallback } from "react";
import { ProductDetailPage } from "./ProductDetailPage";
import { useCart } from "../context/CartContext";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import type {
  StoreInfo,
  StorefrontProduct,
  SpecBadge,
  ReviewData,
  RatingDistribution,
  NavTab,
} from "../types";

interface ProductDetailShellRouteProps {
  store: StoreInfo;
  product: StorefrontProduct;
  relatedProducts?: StorefrontProduct[];
  specBadges?: SpecBadge[];
  reviews?: ReviewData[];
  overallRating?: number;
  totalReviews?: number;
  ratingDistribution?: RatingDistribution[];
  currencySymbol?: string;
}

export function ProductDetailShellRoute({
  store,
  product,
  relatedProducts = [],
  specBadges = [],
  reviews = [],
  overallRating,
  totalReviews,
  ratingDistribution,
  currencySymbol = "$",
}: ProductDetailShellRouteProps) {
  const nav = useTemplateNav();
  const { totalItems, addItem } = useCart();
  const { config } = useLayoutConfig();

  const [isWishlisted, setIsWishlisted] = useState(product.inWishlist ?? false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState<string | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState(0);
  const [wishlistedIds, setWishlistedIds] = useState<Set<string>>(new Set());

  const handleWishlistToggle = useCallback(() => {
    setIsWishlisted((prev) => !prev);
  }, []);

  const handleAddToCart = useCallback(() => {
    if (!product.inStock) return;
    addItem({
      productId: product.id,
      variantName: null,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.images[0]?.url ?? null,
    });
    nav.goCart();
  }, [product, addItem, nav]);

  const handleProductClick = useCallback(
    (productId: string) => nav.goProduct(productId),
    [nav]
  );

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
      if (!p || !p.inStock) return;
      addItem({
        productId: p.id,
        variantName: null,
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
    inWishlist: wishlistedIds.has(p.id) ? true : (p.inWishlist ?? false),
  }));

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
      if (href === "/listing") nav.goListing();
      else nav.goHome();
    },
    [nav]
  );

  return (
    <ProductDetailPage
      store={store}
      product={{ ...product, inWishlist: isWishlisted }}
      navLinks={config.navLinks}
      footerServices={config.footerServices}
      footerAssistance={config.footerAssistance}
      grid={config.grid}
      relatedProducts={enrichedRelated}
      specBadges={specBadges}
      reviews={reviews}
      overallRating={overallRating}
      totalReviews={totalReviews}
      ratingDistribution={ratingDistribution}
      activeTab="home"
      cartItemCount={totalItems}
      currencySymbol={currencySymbol}
      selectedImageIndex={selectedImageIndex}
      selectedStorage={selectedStorage}
      selectedColor={selectedColor}
      isWishlisted={isWishlisted}
      onBack={nav.goHome}
      onSearchClick={nav.goSearch}
      onCartClick={nav.goCart}
      onWishlistToggle={handleWishlistToggle}
      onAddToCart={handleAddToCart}
      onImageSelect={setSelectedImageIndex}
      onStorageSelect={setSelectedStorage}
      onColorSelect={setSelectedColor}
      onProductClick={handleProductClick}
      onWishlistToggleProduct={handleWishlistToggleProduct}
      onAddToCartProduct={handleAddToCartProduct}
      onTabChange={handleTabChange}
      onNavLinkClick={handleNavLinkClick}
    />
  );
}
