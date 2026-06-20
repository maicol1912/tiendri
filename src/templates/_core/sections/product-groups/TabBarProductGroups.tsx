"use client";
import React, { memo, useState, useEffect } from "react";
import { getSectionField } from "../get-section-field";
import { GroupTabBar } from "./GroupTabBar";
import { ProductGroupBanner } from "./ProductGroupBanner";
import { ProductGroupGrid } from "./ProductGroupGrid";
import type { SectionRendererProps } from "../types";
import type { ProductGroupsConfig, ProductGroup } from "@/types/templates/product-groups";
import type { StorefrontProduct } from "@/types/domain/store";

interface TabBarProductGroupsProps extends SectionRendererProps {
  productGroups: ProductGroupsConfig;
}

export const TabBarProductGroups = memo(function TabBarProductGroups({
  products,
  config,
  variants,
  currencySymbol,
  styleTokens,
  aspectRatioClass,
  onProductClick,
  onAddToCart,
  showAddToCartInGrid = true,
  showDiscountBadge = true,
  showOriginalPrice = true,
  showRating = false,
  categoriesWide = false,
  sectionConfig,
  productGroups,
}: TabBarProductGroupsProps) {
  const [activeGroupId, setActiveGroupId] = useState<string>("");

  // D6: filter groups with at least one productId, then sort by sortOrder ascending
  const visibleGroups: ProductGroup[] = productGroups.groups
    .filter((g) => g.productIds.length > 0)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  useEffect(() => {
    if (visibleGroups.length > 0 && !activeGroupId) {
      setActiveGroupId(visibleGroups[0].id);
    }
  }, [visibleGroups, activeGroupId]);

  if (visibleGroups.length === 0) return null;

  const grid = config.grid;
  const defaultMobile = getSectionField("gridColumnsMobile", sectionConfig, grid?.products?.mobile, 2);
  const defaultDesktop = getSectionField("gridColumnsDesktop", sectionConfig, grid?.products?.desktop, 4);

  const widthClass = categoriesWide
    ? "max-w-[92%] lg:max-w-[80%] mx-auto"
    : "max-w-[92%] lg:max-w-[65%] mx-auto";

  const activeGroup = visibleGroups.find((g) => g.id === activeGroupId) ?? visibleGroups[0];

  // Resolve products for the active group, preserving display order from productIds
  const resolvedProducts = activeGroup.productIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as StorefrontProduct[];

  // Apply productsLimit via slice if set
  const displayProducts =
    activeGroup.layout?.productsLimit !== undefined
      ? resolvedProducts.slice(0, activeGroup.layout.productsLimit)
      : resolvedProducts;

  // Grid columns: use per-group overrides, then fall back to section config / template defaults
  const columnsMobile = activeGroup.layout?.columnsMobile ?? defaultMobile;
  const columnsDesktop = activeGroup.layout?.columnsDesktop ?? defaultDesktop;

  return (
    <section aria-label="Productos por grupo">
      {/* Tab bar */}
      <div className={widthClass} style={{ paddingTop: "2.5rem", paddingBottom: "0.5rem" }}>
        <GroupTabBar
          groups={visibleGroups}
          activeGroupId={activeGroupId || visibleGroups[0].id}
          onGroupChange={setActiveGroupId}
        />
      </div>

      {/* Tab panel */}
      <div
        role="tabpanel"
        id={`group-panel-${activeGroup.id}`}
        aria-labelledby={`group-tab-${activeGroup.id}`}
        tabIndex={0}
      >
        {/* Optional banner — only rendered when a URL is present */}
        {activeGroup.banner?.url && (
          <div className={widthClass}>
            <ProductGroupBanner banner={activeGroup.banner} />
          </div>
        )}

        {/* Product grid */}
        <ProductGroupGrid
          products={displayProducts}
          gridColumnsMobile={columnsMobile}
          gridColumnsDesktop={columnsDesktop}
          currencySymbol={currencySymbol}
          productCardVariant={variants.productCard}
          styleTokens={styleTokens}
          aspectRatioClass={aspectRatioClass}
          onProductClick={onProductClick}
          onAddToCart={onAddToCart}
          showAddToCartInGrid={showAddToCartInGrid}
          showDiscountBadge={showDiscountBadge}
          showOriginalPrice={showOriginalPrice}
          showRating={showRating}
          widthClass={widthClass}
        />
      </div>
    </section>
  );
});
