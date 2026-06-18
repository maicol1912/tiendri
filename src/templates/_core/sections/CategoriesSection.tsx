import React, { memo } from "react";
import { CATEGORY_NAV_REGISTRY } from "@/templates/_variants/category-nav";
import type { SectionRendererProps } from "./types";

export const CategoriesSection = memo(function CategoriesSection({
  categories,
  config,
  variants,
  onCategoryClick,
}: SectionRendererProps) {
  if (categories.length === 0) return null;

  const grid = config.grid;
  const categoriesMobile = grid?.categories?.mobile ?? 3;
  const categoriesDesktop = grid?.categories?.desktop ?? 6;
  const CategoryNavComponent = CATEGORY_NAV_REGISTRY[variants.categoryNav];

  return (
    <section
      aria-labelledby="home-categories-heading"
      style={{
        paddingTop: "var(--t-space-section, 2.5rem)",
        paddingBottom: "var(--t-space-section, 2.5rem)",
      }}
      className="px-4 lg:px-[160px]"
    >
      <h2 id="home-categories-heading" className="sr-only">
        Categorías
      </h2>
      <CategoryNavComponent
        categories={categories}
        onCategoryClick={onCategoryClick}
        gridMobile={categoriesMobile}
        gridDesktop={categoriesDesktop}
      />
    </section>
  );
});
