"use client";

// Tech Premium Template — Home Shell (URL-router version)
// Replaces StorefrontShell for the home route.
// Uses useTemplateNav() for navigation instead of state-based routing.
// Reads configOverride from LayoutConfigContext provided by the shared layout.

import { useState, useCallback } from "react";
import { HomePage } from "./HomePage";
import { useCart } from "../context/CartContext";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { techPremiumConfig } from "../config";
import type { TechPremiumConfig } from "../config";
import type {
  StoreInfo,
  Category,
  StorefrontProduct,
  PopularProduct,
  HeroBannerData,
  BannerGrid,
  SummerSaleBanner,
  ProductTab,
  HomeSectionConfig,
} from "../types";

interface HomeShellProps {
  store: StoreInfo;
  categories: Category[];
  products: StorefrontProduct[];
  discountProducts: StorefrontProduct[];
  popularProducts: PopularProduct[];
  heroBanner: HeroBannerData;
  bannerGrid: BannerGrid;
  summerSaleBanner: SummerSaleBanner;
  sections?: readonly HomeSectionConfig[];
  currencySymbol?: string;
}

export function HomeShell({
  store,
  categories,
  products,
  discountProducts,
  popularProducts,
  heroBanner,
  bannerGrid,
  summerSaleBanner,
  sections,
  currencySymbol = "$",
}: HomeShellProps) {
  const nav = useTemplateNav();
  const { totalItems, addItem } = useCart();
  const { config } = useLayoutConfig<TechPremiumConfig>();

  const [activeProductTab, setActiveProductTab] = useState<ProductTab>("new-arrival");
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [wishlistedIds, setWishlistedIds] = useState<Set<string>>(new Set());

  // Resolve sections: prop → configOverride.sections → static default
  const resolvedSections = sections ?? config.sections;

  // Enrich products with wishlist state
  const enrichedProducts = products.map((p) => ({
    ...p,
    inWishlist: wishlistedIds.has(p.id) ? true : (p.inWishlist ?? false),
  }));

  const enrichedDiscountProducts = discountProducts.map((p) => ({
    ...p,
    inWishlist: wishlistedIds.has(p.id) ? true : (p.inWishlist ?? false),
  }));

  const handleWishlistToggle = useCallback((productId: string) => {
    setWishlistedIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  }, []);

  const handleAddToCart = useCallback(
    (productId: string) => {
      const product =
        products.find((p) => p.id === productId) ??
        discountProducts.find((p) => p.id === productId);
      if (!product || !product.inStock) return;
      addItem({
        productId: product.id,
        variantName: null,
        name: product.name,
        price: product.price,
        quantity: 1,
        imageUrl: product.images[0]?.url ?? null,
      });
    },
    [products, discountProducts, addItem]
  );

  const handleNavLinkClick = useCallback(
    (href: string) => {
      if (href === "/listing") {
        nav.goListing();
        return;
      }
      // For anchor-style nav links, stay on home and scroll
      if (href === "/" || href === "#home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (href === "/popular") {
        document
          .getElementById("popular-heading")
          ?.closest("section")
          ?.scrollIntoView({ behavior: "smooth" });
      } else if (href === "/discounts") {
        document
          .getElementById("discounts-heading")
          ?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [nav]
  );

  return (
    <HomePage
      store={store}
      navLinks={config.navLinks}
      productTabs={config.productTabs}
      footerServices={config.footerServices}
      footerAssistance={config.footerAssistance}
      categories={categories}
      products={enrichedProducts}
      discountProducts={enrichedDiscountProducts}
      popularProducts={popularProducts}
      heroBanner={heroBanner}
      bannerGrid={bannerGrid}
      summerSaleBanner={summerSaleBanner}
      sections={resolvedSections}
      layout={config.layout}
      grid={config.grid}
      activeTab="home"
      activeProductTab={activeProductTab}
      activeCategoryId={activeCategoryId}
      cartItemCount={totalItems}
      currencySymbol={currencySymbol}
      onSearchClick={nav.goSearch}
      onCartClick={nav.goCart}
      onCategoryClick={(id) =>
        setActiveCategoryId((prev) => (prev === id ? null : id))
      }
      onProductClick={nav.goProduct}
      onWishlistToggle={handleWishlistToggle}
      onAddToCart={handleAddToCart}
      onProductTabChange={setActiveProductTab}
      onTabChange={(tab) => {
        if (tab === "search") nav.goSearch();
        else if (tab === "cart") nav.goCart();
      }}
      onHeroCtaClick={nav.goListing}
      onBannerClick={nav.goListing}
      onSummerSaleClick={nav.goListing}
      onPopularProductClick={nav.goListing}
      onNavLinkClick={handleNavLinkClick}
    />
  );
}
