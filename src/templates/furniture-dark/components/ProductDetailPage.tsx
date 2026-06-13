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
import { StickyBottomBar } from "./StickyBottomBar";
import type { StorefrontStore } from "../types";

interface ProductDetailPageProps {
  store: StorefrontStore;
  product: StorefrontProduct;
  quantity: number;
  activeImageIndex: number;
  selectedColorId?: string;
  onColorSelect: (colorId: string) => void;
  onImageSelect: (index: number) => void;
  onIncrement: () => void;
  onDecrement: () => void;
  onAddToCart: () => void;
  onBack: () => void;
  onSearchClick: () => void;
  onCartClick: () => void;
  onInfoClick?: () => void;
  cartItemCount?: number;
}

export function ProductDetailPage({
  store,
  product,
  quantity,
  activeImageIndex,
  selectedColorId,
  onColorSelect,
  onImageSelect,
  onIncrement,
  onDecrement,
  onAddToCart,
  onBack,
  onSearchClick,
  onCartClick,
  onInfoClick,
  cartItemCount = 0,
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
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
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
              quantity={quantity}
              selectedColorId={selectedColorId}
              onColorSelect={onColorSelect}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              onAddToCart={onAddToCart}
            />
          </div>
        </div>
      </div>

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
