"use client";

// Tech Premium — ListingShellRoute
// URL-router version of ListingShell.
// Uses useTemplateNav() for navigation and useLayoutConfig() for config.
// Rendered at /template/tech-premium/catalogo

import { useState, useCallback } from "react";
import { ProductListingPage } from "./ProductListingPage";
import { useCart } from "../context/CartContext";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import type { TechPremiumConfig } from "../config";
import type { StoreInfo, StorefrontProduct, FilterGroup, NavTab } from "../types";

interface ListingShellRouteProps {
  store: StoreInfo;
  products: StorefrontProduct[];
  filters?: FilterGroup[];
  currencySymbol?: string;
}

export function ListingShellRoute({
  store,
  products,
  filters: initialFilters = [],
  currencySymbol = "$",
}: ListingShellRouteProps) {
  const nav = useTemplateNav();
  const { totalItems, addItem } = useCart();
  const { config } = useLayoutConfig<TechPremiumConfig>();

  const [wishlistedIds, setWishlistedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<FilterGroup[]>(initialFilters);

  const activeFilters = filters.reduce<Record<string, string[]>>((acc, group) => {
    const checked = group.options.filter((o) => o.checked).map((o) => o.id);
    if (checked.length > 0) acc[group.id] = checked;
    return acc;
  }, {});

  const filteredProducts = products.filter((p) => {
    if (activeFilters.brand) {
      const nameLower = p.name.toLowerCase();
      if (!activeFilters.brand.some((b) => nameLower.includes(b))) return false;
    }
    if (activeFilters.price) {
      const matchesPrice = activeFilters.price.some((range) => {
        if (range === "under-200") return p.price < 200;
        if (range === "200-500") return p.price >= 200 && p.price <= 500;
        if (range === "500-1000") return p.price >= 500 && p.price <= 1000;
        if (range === "over-1000") return p.price > 1000;
        return true;
      });
      if (!matchesPrice) return false;
    }
    if (activeFilters.category) {
      const catId = p.categoryId ?? "";
      const catMap: Record<string, string[]> = {
        phones: ["cat-01"],
        watches: ["cat-02"],
        cameras: ["cat-03"],
        headphones: ["cat-04"],
      };
      if (!activeFilters.category.some((c) => catMap[c]?.includes(catId))) return false;
    }
    if (activeFilters.rating) {
      if (activeFilters.rating.includes("4plus") && (p.rating ?? 0) < 4) return false;
      if (activeFilters.rating.includes("3plus") && (p.rating ?? 0) < 3) return false;
    }
    return true;
  });

  const enrichedProducts = filteredProducts.map((p) => ({
    ...p,
    inWishlist: wishlistedIds.has(p.id) ? true : (p.inWishlist ?? false),
  }));

  const handleProductClick = useCallback(
    (productId: string) => nav.goProduct(productId),
    [nav]
  );

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
      const product = products.find((p) => p.id === productId);
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
    [products, addItem]
  );

  const handleFilterToggle = useCallback((groupId: string) => {
    setFilters((prev) =>
      prev.map((g) =>
        g.id === groupId ? { ...g, expanded: !g.expanded } : g
      )
    );
  }, []);

  const handleFilterCheck = useCallback((groupId: string, optionId: string) => {
    setFilters((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? {
              ...g,
              options: g.options.map((o) =>
                o.id === optionId ? { ...o, checked: !o.checked } : o
              ),
            }
          : g
      )
    );
    setCurrentPage(1);
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
      if (href === "/listing") {
        nav.goListing();
      } else if (href === "/" || href === "#home") {
        nav.goHome();
      } else {
        nav.goHome();
      }
    },
    [nav]
  );

  return (
    <ProductListingPage
      store={store}
      products={enrichedProducts}
      navLinks={config.navLinks}
      footerServices={config.footerServices}
      footerAssistance={config.footerAssistance}
      grid={config.grid}
      filters={filters}
      totalProducts={enrichedProducts.length}
      currentPage={currentPage}
      totalPages={Math.ceil(enrichedProducts.length / 9) || 1}
      activeTab="home"
      cartItemCount={totalItems}
      currencySymbol={currencySymbol}
      isFilterDrawerOpen={isFilterDrawerOpen}
      onSearchClick={nav.goSearch}
      onCartClick={nav.goCart}
      onProductClick={handleProductClick}
      onWishlistToggle={handleWishlistToggle}
      onAddToCart={handleAddToCart}
      onPageChange={(page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      onFilterToggle={handleFilterToggle}
      onFilterCheck={handleFilterCheck}
      onFilterDrawerToggle={() => setIsFilterDrawerOpen((prev) => !prev)}
      onTabChange={handleTabChange}
      onNavLinkClick={handleNavLinkClick}
    />
  );
}
