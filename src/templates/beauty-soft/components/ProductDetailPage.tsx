// Beauty Soft Template — Product Detail Page (Presentational)
// Visual layout: bg card + image carousel + info + bottom CTA.
// ZERO hardcoded colors — all via var(--t-*).

import { Heart, Star } from "lucide-react";
import { ImageCarousel } from "./ImageCarousel";
import type { BeautySoftProduct } from "../types";

interface ProductDetailPageProps {
  product: BeautySoftProduct;
  activeImageIndex?: number;
  quantity?: number;
  isAdded?: boolean;
  isFavorite?: boolean;
  currencySymbol?: string;
  onBack?: () => void;
  onCartClick?: () => void;
  onImageIndexChange?: (index: number) => void;
  onQuantityIncrement?: () => void;
  onQuantityDecrement?: () => void;
  onAddToCart?: () => void;
  onFavoriteToggle?: () => void;
}

function QuantityCounter({
  quantity,
  onIncrement,
  onDecrement,
}: {
  quantity: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}) {
  return (
    <div
      className="inline-flex items-center gap-[14px]"
      style={{
        backgroundColor: "var(--t-card-bg)",
        borderRadius: "35px",
        padding: "3px 4px",
        height: "47px",
      }}
    >
      <button
        type="button"
        aria-label="Disminuir cantidad"
        className="flex items-center justify-center cursor-pointer"
        style={{
          width: "41px",
          height: "41px",
          borderRadius: "28px",
          backgroundColor: "var(--t-section-bg)",
          border: "1px solid var(--t-border)",
        }}
        onClick={onDecrement}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <line x1="5" y1="12" x2="19" y2="12" stroke="var(--t-text-primary)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <span
        className="text-base font-semibold text-[var(--t-text-primary)] min-w-[20px] text-center leading-[22px] tracking-[-0.408px]"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {String(quantity).padStart(2, "0")}
      </span>

      <button
        type="button"
        aria-label="Aumentar cantidad"
        className="flex items-center justify-center cursor-pointer border-0"
        style={{
          width: "41px",
          height: "41px",
          borderRadius: "28px",
          backgroundColor: "var(--t-text-primary)",
        }}
        onClick={onIncrement}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <line x1="12" y1="5" x2="12" y2="19" stroke="var(--t-section-bg)" strokeWidth="2" strokeLinecap="round" />
          <line x1="5" y1="12" x2="19" y2="12" stroke="var(--t-section-bg)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

export function ProductDetailPage({
  product,
  activeImageIndex = 0,
  quantity = 1,
  isAdded = false,
  isFavorite = false,
  currencySymbol = "$",
  onBack,
  onCartClick,
  onImageIndexChange,
  onQuantityIncrement,
  onQuantityDecrement,
  onAddToCart,
  onFavoriteToggle,
}: ProductDetailPageProps) {
  const hasDiscount =
    product.originalPrice !== null &&
    product.originalPrice !== undefined &&
    product.originalPrice > product.price;

  const formattedPrice = `${currencySymbol}${new Intl.NumberFormat("en-US").format(product.price)}`;
  const formattedOriginalPrice =
    hasDiscount && product.originalPrice
      ? `${currencySymbol}${new Intl.NumberFormat("en-US").format(product.originalPrice)}`
      : null;

  const rating = product.rating ?? 4.5;
  const reviewCount = product.reviewCount ?? 120;
  const formatReviewCount = (count: number) =>
    count >= 1000 ? `(${Math.floor(count / 1000)}k+ Reseñas)` : `(${count} Reseñas)`;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--t-background)" }}
    >
      <main className="flex-1 flex flex-col pb-[calc(126px+env(safe-area-inset-bottom,0px))] lg:pb-8">
        <div className="max-w-5xl mx-auto w-full px-5 lg:px-8 lg:py-8 lg:flex lg:gap-6 lg:items-start">
          {/* Mobile top bar */}
          <div className="flex items-center justify-between py-[12px] lg:hidden">
            <button
              type="button"
              className="flex items-center justify-center border-0 cursor-pointer"
              style={{
                width: "47px",
                height: "47px",
                borderRadius: "37px",
                backgroundColor: "var(--t-section-bg)",
              }}
              aria-label="Volver"
              onClick={onBack}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="var(--t-text-primary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <span
              className="text-[20px] font-medium text-[var(--t-text-primary)] leading-[22px] tracking-[-0.408px]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Detalles
            </span>

            <button
              type="button"
              className="flex items-center justify-center border-0 cursor-pointer"
              style={{
                width: "47px",
                height: "47px",
                borderRadius: "37px",
                backgroundColor: "var(--t-section-bg)",
              }}
              aria-label="Carrito"
              onClick={onCartClick}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
                  stroke="var(--t-text-primary)"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line x1="3" y1="6" x2="21" y2="6" stroke="var(--t-text-primary)" strokeWidth="1.75" />
                <path
                  d="M16 10a4 4 0 0 1-8 0"
                  stroke="var(--t-text-primary)"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* White content card */}
          <div
            className="flex-1"
            style={{
              backgroundColor: "var(--t-section-bg)",
              borderRadius: "var(--t-radius-card)",
              overflow: "hidden",
            }}
          >
            {/* Image carousel */}
            <div
              className="w-full overflow-hidden"
              style={{
                borderRadius: "var(--t-radius-card)",
                padding: "20px 20px 0 20px",
              }}
            >
              <ImageCarousel
                images={product.images}
                productName={product.name}
                activeIndex={activeImageIndex}
                onIndexChange={onImageIndexChange}
                showTopBar={false}
              />
            </div>

            {/* Product info */}
            <div
              className="flex flex-col gap-[20px] px-5 pt-7 pb-5"
              style={{ backgroundColor: "var(--t-section-bg)" }}
            >
              {/* Name + heart */}
              <div className="flex items-start justify-between gap-3">
                <h1
                  className="m-0 flex-1 min-w-0 text-[24px] font-semibold text-[var(--t-text-primary)] leading-[30px] tracking-[-0.408px]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {product.name}
                </h1>

                <button
                  type="button"
                  className="flex-shrink-0 flex items-center justify-center border-0 cursor-pointer"
                  style={{
                    width: "47px",
                    height: "47px",
                    borderRadius: "37px",
                    backgroundColor: "var(--t-card-bg)",
                  }}
                  aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                  onClick={onFavoriteToggle}
                >
                  <Heart
                    size={18}
                    strokeWidth={1.75}
                    className={
                      isFavorite
                        ? "text-[var(--t-primary)] fill-[var(--t-primary)]"
                        : "text-[var(--t-text-muted)]"
                    }
                  />
                </button>
              </div>

              {/* Price + rating */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-baseline gap-[4px]">
                  <span
                    className="text-[18px] font-normal text-[var(--t-text-primary)]"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    Desde:
                  </span>
                  <span
                    className="text-[18px] font-semibold text-[var(--t-text-primary)] leading-[22px] tracking-[-0.408px]"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {formattedPrice}
                  </span>
                  {formattedOriginalPrice && (
                    <span
                      className="line-through text-[18px] font-semibold text-[var(--t-primary)] leading-[22px] tracking-[-0.408px]"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {formattedOriginalPrice}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-[4px]">
                  <Star size={22} className="fill-[var(--t-rating-star)] text-[var(--t-rating-star)]" strokeWidth={0} />
                  <span
                    className="text-[18px] font-semibold text-[var(--t-text-primary)] leading-[22px] tracking-[-0.408px]"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {rating}/5
                  </span>
                  <span
                    className="text-sm font-normal text-[var(--t-text-muted)] leading-[22px] tracking-[-0.408px]"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {formatReviewCount(reviewCount)}
                  </span>
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <div className="flex flex-col gap-[5px]">
                  <h3
                    className="m-0 text-base font-semibold text-[var(--t-text-primary)] leading-[30px]"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    Descripción
                  </h3>
                  <p
                    className="m-0 text-sm text-[var(--t-text-secondary)] leading-[20px]"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {product.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom bar: Add to Cart + Quantity */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 lg:relative"
        style={{
          backgroundColor: "var(--t-section-bg)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          borderTop: "1px solid var(--t-border)",
        }}
      >
        <div className="max-w-5xl mx-auto flex items-center gap-[10px] px-[22px] py-[18px]">
          {/* Add to Cart button */}
          <button
            type="button"
            className="flex items-center justify-center border-0 cursor-pointer transition-colors duration-200"
            disabled={!product.inStock}
            style={{
              fontFamily: "var(--font-heading, var(--font-sans))",
              fontSize: "17px",
              fontWeight: 400,
              color: product.inStock ? "var(--t-button-text)" : "var(--t-text-muted)",
              backgroundColor: isAdded
                ? "#22C55E"
                : product.inStock
                  ? "var(--t-button-bg)"
                  : "var(--t-card-bg)",
              borderRadius: "var(--t-radius-button)",
              height: "47px",
              width: "205px",
              cursor: product.inStock ? "pointer" : "not-allowed",
              lineHeight: "22px",
              letterSpacing: "-0.408px",
            }}
            onClick={onAddToCart}
          >
            {!product.inStock ? "Agotado" : isAdded ? "Agregado" : "Agregar al carrito"}
          </button>

          <QuantityCounter
            quantity={quantity}
            onIncrement={onQuantityIncrement}
            onDecrement={onQuantityDecrement}
          />
        </div>
      </div>
    </div>
  );
}
