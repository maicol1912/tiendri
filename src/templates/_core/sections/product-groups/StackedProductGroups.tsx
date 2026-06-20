'use client';
import React, { memo } from 'react';
import { getSectionField } from '../get-section-field';
import type { SectionRendererProps } from '../types';
import type { ProductGroupsConfig } from '@/types/templates/product-groups';
import type { StorefrontProduct } from '@/types/domain/store';
import { ProductGroupBanner } from './ProductGroupBanner';
import { ProductGroupGrid } from './ProductGroupGrid';

interface StackedProductGroupsProps extends SectionRendererProps {
  productGroups: ProductGroupsConfig;
}

export const StackedProductGroups = memo(function StackedProductGroups({
  products,
  config,
  variants,
  currencySymbol,
  styleTokens,
  aspectRatioClass,
  onProductClick,
  onAddToCart,
  onCtaClick,
  showAddToCartInGrid = true,
  showDiscountBadge = true,
  showOriginalPrice = true,
  showRating = false,
  categoriesWide = false,
  sectionConfig,
  productGroups,
}: StackedProductGroupsProps) {
  const grid = config.grid;
  const defaultMobile = getSectionField('gridColumnsMobile', sectionConfig, grid?.products?.mobile, 2);
  const defaultDesktop = getSectionField('gridColumnsDesktop', sectionConfig, grid?.products?.desktop, 4);

  const widthClass = categoriesWide
    ? 'max-w-[92%] lg:max-w-[80%] mx-auto'
    : 'max-w-[92%] lg:max-w-[65%] mx-auto';

  // D6: filter groups with at least one productId, then sort by sortOrder ascending
  const visibleGroups = productGroups.groups
    .filter((g) => g.productIds.length > 0)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  if (visibleGroups.length === 0) return null;

  return (
    <div className="space-y-12">
      {visibleGroups.map((group) => {
        // Resolve products for this group, preserving display order from productIds
        const resolvedProducts = group.productIds
          .map((id) => products.find((p) => p.id === id))
          .filter(Boolean) as StorefrontProduct[];

        // Skip groups whose products have all been deleted
        if (resolvedProducts.length === 0) return null;

        const columnsMobile = group.layout?.columnsMobile ?? defaultMobile;
        const columnsDesktop = group.layout?.columnsDesktop ?? defaultDesktop;
        const productsLimit = group.layout?.productsLimit;
        const displayProducts =
          productsLimit !== undefined
            ? resolvedProducts.slice(0, productsLimit)
            : resolvedProducts;

        const headingId = `product-group-heading-${group.id}`;

        return (
          <section
            key={group.id}
            aria-labelledby={headingId}
          >
            {/* Group heading */}
            <div className={`flex items-center justify-between mb-4 ${widthClass}`}>
              <h2
                id={headingId}
                className="text-[var(--t-foreground)] tracking-[0.24px]"
                style={{
                  fontWeight:
                    'var(--t-type-heading-weight, 500)' as React.CSSProperties['fontWeight'],
                  fontSize: 'var(--t-type-heading-size, 1.5rem)',
                  letterSpacing: 'var(--t-type-heading-tracking, 0.24px)',
                  textTransform:
                    'var(--t-type-heading-transform, none)' as React.CSSProperties['textTransform'],
                }}
              >
                {group.name}
              </h2>
              {onCtaClick && (
                <button
                  type="button"
                  className="bg-transparent border-none cursor-pointer text-sm font-medium hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--t-muted)' }}
                  onClick={onCtaClick}
                >
                  Ver todo
                </button>
              )}
            </div>

            {/* Optional banner — only rendered when a URL is present */}
            {group.banner?.url && (
              <div className={widthClass}>
                <ProductGroupBanner banner={group.banner} />
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
          </section>
        );
      })}
    </div>
  );
});
