"use client";

// Tech Premium — Storefront Home Shell
// Client Component for the live /[slug] route. Reads resolved config + store
// info from StorefrontConfigProvider (set up by the Server Component layout)
// and passes everything as props to HomePage (presentational).
//
// Key differences vs HomeShell (preview):
//  - Reads from useStorefrontConfig() instead of useLayoutConfig()
//  - Uses mock product data for now (product fetching from Supabase is Phase 7+)
//  - Navigation goes to sub-routes under /[slug]/ instead of template preview routes
//
// CRITICAL: No conditional "am I in preview or live?" logic — this shell is
// exclusively for the live storefront. HomeShell is exclusively for the preview.

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { HomePage } from "./HomePage";
import { useCart } from "../context/CartContext";
import { useStorefrontConfig } from "@/app/[slug]/storefront-config-provider";
import {
  mockCategories,
  mockProducts,
  mockDiscountProducts,
  mockPopularProducts,
  mockHeroBanner,
  mockBannerGrid,
  mockSummerSaleBanner,
} from "../mock/data";
import type { TechPremiumConfig } from "../config";
import type { ProductTab, HomeSectionConfig } from "../types";

export function StorefrontHomeShell() {
  const { config, store } = useStorefrontConfig();
  const { totalItems, addItem } = useCart();
  const router = useRouter();

  const [activeProductTab, setActiveProductTab] = useState<ProductTab>("new-arrival");
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [wishlistedIds, setWishlistedIds] = useState<Set<string>>(new Set());

  // Resolve product lists from content config IDs, falling back to mock data.
  // Phase 7+ will replace mock data with real Supabase product fetches.
  // For now: if the merchant has configured specific product IDs, we filter
  // the mock data to show only those (best-effort — IDs that don't exist in
  // mock data are silently skipped). If no IDs configured, show all mock data.
  const featuredIds = config.content?.featuredProductIds;
  const discountIds = config.content?.discountProductIds;

  const resolvedProducts =
    featuredIds && featuredIds.length > 0
      ? mockProducts.filter((p) => featuredIds.includes(p.id))
      : mockProducts;

  const resolvedDiscountProducts =
    discountIds && discountIds.length > 0
      ? mockDiscountProducts.filter((p) => discountIds.includes(p.id))
      : mockDiscountProducts;

  // Enrich products with wishlist state
  const enrichedProducts = resolvedProducts.map((p) => ({
    ...p,
    inWishlist: wishlistedIds.has(p.id),
  }));

  const enrichedDiscountProducts = resolvedDiscountProducts.map((p) => ({
    ...p,
    inWishlist: wishlistedIds.has(p.id),
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
        resolvedProducts.find((p) => p.id === productId) ??
        resolvedDiscountProducts.find((p) => p.id === productId);
      if (!product || !product.inStock) return;
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        imageUrl: product.images[0]?.url ?? null,
      });
    },
    [resolvedProducts, resolvedDiscountProducts, addItem]
  );

  const handleNavLinkClick = useCallback(
    (href: string) => {
      if (href === "/listing") {
        router.push(`/${store.slug}/catalogo`);
        return;
      }
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
    [router, store.slug]
  );

  // Build hero banner from resolved config content, fallback to mock data
  const heroBannerData = {
    ...mockHeroBanner,
    ...(config.content?.heroBanner?.title
      ? {
          titleLight: config.content.heroBanner.title,
          titleBold: "",
        }
      : {}),
    ...(config.content?.heroBanner?.subtitle
      ? { subtitle: config.content.heroBanner.subtitle }
      : {}),
    ...(config.content?.heroBanner?.ctaText
      ? { ctaText: config.content.heroBanner.ctaText }
      : {}),
    ...(config.content?.heroBanner?.image
      ? { image: config.content.heroBanner.image }
      : {}),
  };

  // Nav links from resolved content config, fallback to top-level config
  const navLinks =
    config.content?.navLinks ??
    (config.navLinks as Array<{ label: string; href: string }> | undefined) ??
    [];

  // Product tabs from resolved content config, fallback to top-level config
  const productTabs =
    config.content?.productTabs ??
    (config.productTabs as Array<{ id: ProductTab; label: string }> | undefined) ??
    [];

  // Footer content from resolved content config, fallback to top-level config
  const footerServices =
    config.content?.footerServices ??
    (config.footerServices as string[] | undefined) ??
    [];

  const footerAssistance =
    config.content?.footerAssistance ??
    (config.footerAssistance as string[] | undefined) ??
    [];

  // Sections from resolved config
  const sections = config.sections as readonly HomeSectionConfig[];

  return (
    <HomePage
      store={store}
      navLinks={navLinks}
      productTabs={productTabs as Array<{ id: ProductTab; label: string }>}
      footerServices={footerServices}
      footerAssistance={footerAssistance}
      categories={mockCategories}
      products={enrichedProducts}
      discountProducts={enrichedDiscountProducts}
      popularProducts={mockPopularProducts}
      heroBanner={heroBannerData}
      bannerGrid={mockBannerGrid}
      summerSaleBanner={mockSummerSaleBanner}
      sections={sections}
      layout={config.layout as TechPremiumConfig["layout"]}
      grid={config.grid as TechPremiumConfig["grid"]}
      activeTab="home"
      activeProductTab={activeProductTab}
      activeCategoryId={activeCategoryId}
      cartItemCount={totalItems}
      currencySymbol={config.business?.currency ?? "COP"}
      onSearchClick={() => router.push(`/${store.slug}/buscar`)}
      onCartClick={() => router.push(`/${store.slug}/carrito`)}
      onCategoryClick={(id) =>
        setActiveCategoryId((prev) => (prev === id ? null : id))
      }
      onProductClick={(productId) =>
        router.push(`/${store.slug}/producto/${productId}`)
      }
      onWishlistToggle={handleWishlistToggle}
      onAddToCart={handleAddToCart}
      onProductTabChange={setActiveProductTab}
      onTabChange={(tab) => {
        if (tab === "search") router.push(`/${store.slug}/buscar`);
        else if (tab === "cart") router.push(`/${store.slug}/carrito`);
      }}
      onHeroCtaClick={() => router.push(`/${store.slug}/catalogo`)}
      onBannerClick={() => router.push(`/${store.slug}/catalogo`)}
      onSummerSaleClick={() => router.push(`/${store.slug}/catalogo`)}
      onPopularProductClick={() => router.push(`/${store.slug}/catalogo`)}
      onNavLinkClick={handleNavLinkClick}
    />
  );
}
