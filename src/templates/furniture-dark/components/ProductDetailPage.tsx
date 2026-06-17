// Furniture Dark — ProductDetailPage
// Presentational: 2-col desktop (45%/55%), sticky image left, info+controls right
// Mobile: stacked + StickyBottomBar
// ALL colors via var(--t-*)

import { ChevronLeft } from "lucide-react";
import type { StorefrontProduct } from "../types";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";
import { ImageGallery } from "./ImageGallery";
import { ProductInfo } from "./ProductInfo";
import { ProductCard } from "./ProductCard";
import { StickyBottomBar } from "./StickyBottomBar";
import { VariantPriceSelector } from "@/components/shared/VariantPriceSelector";
import { ProductTabs } from "@/templates/_shared/components/ProductTabs";
import type { VariantSelection } from "@/hooks/useVariantPrice";
import type { StorefrontStore } from "../types";

interface ProductDetailPageProps {
  store: StorefrontStore;
  product: StorefrontProduct;
  quantity: number;
  activeImageIndex: number;
  selectedColorId?: string;
  effectivePrice?: number;
  selectedVariants?: VariantSelection;
  onSelectVariant?: (groupId: string, optionId: string) => void;
  activeHref?: string;
  onColorSelect: (colorId: string) => void;
  onImageSelect: (index: number) => void;
  onIncrement: () => void;
  onDecrement: () => void;
  onAddToCart: () => void;
  onBack: () => void;
  onSearchClick: () => void;
  onCartClick: () => void;
  onNavLinkClick?: (href: string) => void;
  onInfoClick?: () => void;
  cartItemCount?: number;
  productDetailTabs?: Array<{ id: string; label: string; content: string }>;
  relatedProducts?: StorefrontProduct[];
  onProductClick?: (id: string) => void;
}

export function ProductDetailPage({
  store,
  product,
  quantity,
  activeImageIndex,
  selectedColorId,
  effectivePrice,
  selectedVariants,
  onSelectVariant,
  activeHref,
  onColorSelect,
  onImageSelect,
  onIncrement,
  onDecrement,
  onAddToCart,
  onBack,
  onSearchClick,
  onCartClick,
  onNavLinkClick,
  onInfoClick,
  cartItemCount = 0,
  productDetailTabs = [],
  relatedProducts,
  onProductClick,
}: ProductDetailPageProps) {
  const images = product.images ?? [];

  return (
    <div
      className="min-h-screen pb-28 lg:pb-0"
      style={{ backgroundColor: "var(--t-background)" }}
    >
      <Header
        store={store}
        cartItemCount={cartItemCount}
        activeHref={activeHref}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
        onNavLinkClick={onNavLinkClick}
      />

      {/* Back button */}
      <div className="px-5 pt-4 pb-2 max-w-7xl mx-auto">
        <button
          type="button"
          className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
          onClick={onBack}
          aria-label="Volver"
        >
          <ChevronLeft size={18} strokeWidth={2} className="text-[var(--t-muted)]" />
          <span
            className="text-[var(--t-muted)]"
            style={{
              fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
              fontSize: "13px",
              fontWeight: 500,
            }}
          >
            Volver
          </span>
        </button>
      </div>

      {/* Content: 2-col on desktop */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 lg:py-8">
        <div className="flex flex-col lg:flex-row lg:gap-12">
          {/* Left: Gallery (sticky on desktop) */}
          <div className="lg:w-[45%] lg:sticky lg:top-20 lg:h-fit">
            <ImageGallery
              images={images}
              activeIndex={activeImageIndex}
              onSelect={onImageSelect}
            />
          </div>

          {/* Right: Product info */}
          <div className="flex-1 mt-6 lg:mt-0">
            <ProductInfo
              product={product}
              effectivePrice={effectivePrice}
              quantity={quantity}
              selectedColorId={selectedColorId}
              onColorSelect={onColorSelect}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              onAddToCart={onAddToCart}
            />

            {/* Variant groups with price modifiers */}
            {product.variants && product.variants.length > 0 && (
              <div className="mt-5 flex flex-col gap-4">
                {product.variants.map((group) => (
                  <VariantPriceSelector
                    key={group.id}
                    group={group}
                    selectedOptionId={selectedVariants?.[group.id]}
                    onSelect={(optionId) => onSelectVariant?.(group.id, optionId)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Detail Tabs */}
      {productDetailTabs.length > 0 && (
        <div className="max-w-7xl mx-auto px-5 lg:px-8 mt-6 pb-6">
          <ProductTabs tabs={productDetailTabs.map(({ label, content }) => ({ label, content }))} />
        </div>
      )}

      {/* También te puede gustar */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-5 lg:px-8 mt-12 mb-8">
          <h2
            style={{
              fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
              fontSize: "18px",
              fontWeight: 600,
              color: "var(--t-foreground)",
              marginBottom: "16px",
            }}
          >
            También te puede gustar
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.slice(0, 4).map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onClick={onProductClick}
              />
            ))}
          </div>
        </section>
      )}

      {/* Mobile sticky bottom bar */}
      <StickyBottomBar
        quantity={quantity}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onAddToCart={onAddToCart}
      />

      {/* Mobile bottom nav */}
      <BottomNav
        activeTab="home"
        cartItemCount={cartItemCount}
        onTab={(tab) => {
          if (tab === "cart") onCartClick();
          else if (tab === "home") onBack();
          else if (tab === "search") onSearchClick();
          else if (tab === "info") onInfoClick?.();
        }}
      />
    </div>
  );
}
