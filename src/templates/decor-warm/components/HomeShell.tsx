"use client";

// Decor Warm Template — HomeShell
// Client boundary. Reads live config from useLayoutConfig().
// Wires navigation, category filter, cart state, and promo autoplay.

import { useState, useCallback, useEffect } from "react";
import { HomePage } from "./HomePage";
import { useCart } from "../context/CartContext";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { decorWarmConfig } from "../config";
import type { DecorWarmConfig } from "../config";
import type {
  DecorWarmProduct,
  DecorWarmCategory,
  DecorWarmCategoryIcon,
  DecorWarmPromoSlide,
  DecorWarmBestSeller,
  DecorWarmNavTab,
} from "../types";
import type { StoreInfo } from "@/types/store";

interface HomeShellProps {
  store: StoreInfo;
  categoryIcons: DecorWarmCategoryIcon[];
  categories: DecorWarmCategory[];
  products: DecorWarmProduct[];
  promoSlides: DecorWarmPromoSlide[];
  bestSellers: DecorWarmBestSeller[];
  currencySymbol?: string;
}

export function HomeShell({
  store,
  categoryIcons,
  categories,
  products,
  promoSlides,
  bestSellers,
  currencySymbol = "$",
}: HomeShellProps) {
  const nav = useTemplateNav();
  const { totalItems, addItem } = useCart();
  const { config } = useLayoutConfig<DecorWarmConfig>();

  const layout = config?.layout ?? decorWarmConfig.layout;
  const grid = config?.grid ?? decorWarmConfig.grid;
  const sections = config?.sections ?? decorWarmConfig.sections;

  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [activeIconId, setActiveIconId] = useState<string | null>(null);
  const [activePromoSlide, setActivePromoSlide] = useState(0);

  // Promo autoplay: advance every 4s when slides exist
  useEffect(() => {
    if (promoSlides.length <= 1) return;
    const interval = setInterval(() => {
      setActivePromoSlide((prev) => (prev + 1) % promoSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [promoSlides.length]);

  const handleCategoryChange = useCallback((id: string | null) => {
    setActiveCategoryId(id);
    setActiveIconId(null);
  }, []);

  const handleIconChange = useCallback((id: string | null) => {
    setActiveIconId(id);
    setActiveCategoryId(null);
  }, []);

  const handleAddToCart = useCallback(
    (product: DecorWarmProduct) => {
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.images[0]?.url ?? null,
        quantity: 1,
      });
    },
    [addItem]
  );

  const handleProductClick = useCallback(
    (productId: string) => nav.goProduct(productId),
    [nav]
  );

  const handleBestSellerClick = useCallback(
    (productId: string) => nav.goProduct(productId),
    [nav]
  );

  const handleTabChange = useCallback(
    (tab: DecorWarmNavTab) => {
      if (tab === "home") nav.goHome();
      else if (tab === "categories") nav.goListing();
      else if (tab === "info") nav.goInfo();
    },
    [nav]
  );

  return (
    <HomePage
      store={store}
      categoryIcons={categoryIcons}
      categories={categories}
      products={products}
      promoSlides={promoSlides}
      bestSellers={bestSellers}
      activeCategoryId={activeCategoryId}
      activeIconId={activeIconId}
      activeTab="home"
      activePromoSlide={activePromoSlide}
      cartItemCount={totalItems}
      currencySymbol={currencySymbol}
      layout={layout}
      grid={grid}
      sections={[...sections]}
      onCategoryChange={handleCategoryChange}
      onIconCategoryChange={handleIconChange}
      onProductClick={handleProductClick}
      onAddToCart={handleAddToCart}
      onBestSellerClick={handleBestSellerClick}
      onPromoSlideChange={setActivePromoSlide}
      onSearchOpen={nav.goSearch}
      onCartOpen={nav.goCart}
      onTabChange={handleTabChange}
      onSeeAll={nav.goListing}
    />
  );
}
