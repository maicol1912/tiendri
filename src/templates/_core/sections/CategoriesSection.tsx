import React, { memo } from "react";
import { CATEGORY_NAV_REGISTRY } from "@/templates/_variants/category-nav";
import type { SectionRendererProps } from "./types";

export const CategoriesSection = memo(function CategoriesSection({
  categories,
  config,
  variants,
  onCategoryClick,
  onCtaClick,
  showCategories,
  categoriesWide,
  categoriesHeading,
  chipStyle,
  categoryIconColor,
  categorySize,
}: SectionRendererProps) {
  if (showCategories === false) return null;
  if (categories.length === 0) return null;

  const grid = config.grid;
  const categoriesMobile = grid?.categories?.mobile ?? 3;
  const categoriesDesktop = grid?.categories?.desktop ?? 6;
  const CategoryNavComponent = CATEGORY_NAV_REGISTRY[variants.categoryNav];

  return (
    <section
      aria-labelledby="home-categories-heading"
      style={{
        paddingTop: "1rem",
        paddingBottom: "0.5rem",
      }}
      className={categoriesWide ? "max-w-[92%] lg:max-w-[80%] mx-auto" : "max-w-[92%] lg:max-w-[65%] mx-auto"}
    >
      <h2 id="home-categories-heading" className="sr-only">
        Categorías
      </h2>
      <CategoryNavComponent
        categories={categories}
        onCategoryClick={onCategoryClick}
        gridMobile={categoriesMobile}
        gridDesktop={categoriesDesktop}
        heading={categoriesHeading}
        showViewAll={!!categoriesHeading}
        onViewAll={onCtaClick}
        chipStyle={chipStyle as "underline" | "pills" | "bordered" | undefined}
        iconColor={categoryIconColor}
        size={categorySize as "default" | "large" | undefined}
      />
    </section>
  );
});
