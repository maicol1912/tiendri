"use client";

// Pets Classic — Home Shell
// "use client" — manages active category, promo slide state, cart count.
// Reads config override from LayoutConfigContext.

import { useState, useEffect, useCallback } from "react";
import { HomePage } from "./HomePage";
import { useCart } from "../context/CartContext";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { petsClassicConfig } from "../config";
import type { PetsClassicConfig } from "../config";
import type {
  StoreInfo,
  PetsClassicCategory,
  PetsClassicProduct,
  PromoSlide,
} from "../types";

interface HomeShellProps {
  store: StoreInfo;
  categories: PetsClassicCategory[];
  products: PetsClassicProduct[];
  promoSlides: PromoSlide[];
  currencySymbol?: string;
}

export function HomeShell({
  store,
  categories,
  products,
  promoSlides,
  currencySymbol = "$",
}: HomeShellProps) {
  const nav = useTemplateNav();
  const { totalItems, addItem } = useCart();
  const { config } = useLayoutConfig<PetsClassicConfig>();

  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [activePromoIndex, setActivePromoIndex] = useState(0);

  // Resolve sections: config override → static default
  const resolvedSections = config.sections ?? petsClassicConfig.sections;

  // Auto-advance promo banner every 4s
  useEffect(() => {
    if (promoSlides.length <= 1) return;
    const id = setInterval(() => {
      setActivePromoIndex((prev) => (prev + 1) % promoSlides.length);
    }, 4000);
    return () => clearInterval(id);
  }, [promoSlides.length]);

  const handleAddToCart = useCallback(
    (productId: string) => {
      const product = products.find((p) => p.id === productId);
      if (!product || !product.available) return;
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        imageUrl: product.images[0]?.url ?? null,
      });
    },
    [products, addItem]
  );

  return (
    <HomePage
      store={store}
      categories={categories}
      products={products}
      promoSlides={promoSlides}
      sections={resolvedSections}
      layout={config.layout ?? petsClassicConfig.layout}
      grid={config.grid ?? petsClassicConfig.grid}
      activeTab="home"
      activePromoIndex={activePromoIndex}
      activeCategoryId={activeCategoryId}
      cartItemCount={totalItems}
      currencySymbol={currencySymbol}
      onSearchClick={nav.goSearch}
      onCartClick={nav.goCart}
      onCatalogClick={nav.goListing}
      onCategoryChange={(id) => setActiveCategoryId(id)}
      onProductClick={nav.goProduct}
      onAddToCart={handleAddToCart}
      onTabChange={(tab) => {
        if (tab === "cart") nav.goCart();
        else if (tab === "listing") nav.goListing();
        else if (tab === "info") nav.goInfo();
      }}
      onPromoDotClick={setActivePromoIndex}
      onSeeAll={nav.goListing}
    />
  );
}
