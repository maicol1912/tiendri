"use client";

// Beauty Elegant Template — Product Detail Page
// Full-screen product image background, purple gradient overlay,
// glassmorphic info card at bottom (mobile) / right side (desktop).

import { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { useCart } from "@/lib/cart";
import type { CartItem } from "@/lib/cart";
import { ProductCard } from "./ProductCard";
import { Header } from "./Header";
import { ProductTabs } from "@/templates/_shared/components/ProductTabs";
import { VariantPriceSelector } from "@/components/shared/VariantPriceSelector";
import type { BeautyElegantProduct } from "../types";
import type { StoreInfo } from "../types";
import { BUTTON_STYLE_MAP } from "@/templates/_shared/style-maps";
import type { ButtonStyle } from "@/types/templates";
import { formatPrice } from "@/lib/format";
import type { VariantSelection } from "@/hooks/useVariantPrice";

interface ProductDetailPageProps {
  product: BeautyElegantProduct;
  store: StoreInfo;
  currencySymbol?: string;
  relatedProducts?: BeautyElegantProduct[];
  layout?: { buttonStyle?: ButtonStyle };
  cartItemCount?: number;
  effectivePrice?: number;
  selectedVariants?: VariantSelection;
  onSelectVariant?: (groupId: string, optionId: string) => void;
  variantName?: string | null;
  onBack?: () => void;
  onNavLinkClick?: (href: string) => void;
  onSearchOpen?: () => void;
  onCartOpen?: () => void;
  productDetailTabs?: Array<{ id: string; label: string; content: string }>;
}

export function ProductDetailPage({
  product,
  store,
  currencySymbol = "$",
  relatedProducts = [],
  layout,
  cartItemCount = 0,
  effectivePrice,
  selectedVariants,
  onSelectVariant,
  variantName,
  onBack,
  onNavLinkClick,
  onSearchOpen,
  onCartOpen,
  productDetailTabs = [],
}: ProductDetailPageProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const buttonStyleClasses = BUTTON_STYLE_MAP[layout?.buttonStyle ?? "filled"];

  const primaryImage = product.images[0]?.url ?? null;

  const displayPrice = effectivePrice ?? product.price;

  const handleAddToCart = useCallback(() => {
    if (!product.inStock) return;

    const cartItem: CartItem = {
      productId: product.id,
      name: product.name,
      price: displayPrice,
      originalPrice: product.originalPrice,
      imageUrl: primaryImage,
      description: product.description,
      variantName: variantName ?? null,
      quantity: 1,
    };

    addItem(cartItem);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  }, [product, addItem, primaryImage, displayPrice, variantName]);

  const subtitleLabel = product.subtitle ?? "Cuidado Premium";
  const healthFacts = product.healthFacts ?? "Dermatológicamente probado";

  // ── Glassmorphic info card content (shared between mobile and desktop) ─────
  const InfoCardContent = (
    <div
      style={{
        backdropFilter: "blur(50px)",
        WebkitBackdropFilter: "blur(50px)",
        backgroundColor: "var(--t-detail-overlay-bg)",
        borderRadius: "25px",
        padding: "20px",
      }}
    >
      {/* Product name */}
      <h1
        className="text-[21px] font-medium text-white"
        style={{ lineHeight: "1.3", margin: "0 0 16px 0" }}
      >
        {product.name}
      </h1>

      {/* Tags row: category pill + stock status */}
      <div className="flex items-center justify-between mb-5">
        <span
          className="text-xs font-normal text-white px-4 py-1"
          style={{
            backgroundColor: "color-mix(in srgb, var(--t-foreground) 33%, transparent)",
            backdropFilter: "blur(84px)",
            WebkitBackdropFilter: "blur(84px)",
            borderRadius: "8px",
          }}
        >
          {product.categoryId ?? "Belleza"}
        </span>

        {product.inStock && (
          <span className="text-sm font-normal text-white">
            En stock
          </span>
        )}
      </div>

      {/* Details inner card */}
      <div
        className="mb-5"
        style={{
          backgroundColor: "var(--t-detail-inner-bg)",
          backdropFilter: "blur(84px)",
          WebkitBackdropFilter: "blur(84px)",
          borderRadius: "17px",
          padding: "20px",
        }}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-white">{subtitleLabel}</span>
          <span className="text-xs font-medium text-white line-clamp-1 max-w-[140px] text-right">
            {product.name}
          </span>
        </div>

        <div className="flex items-start justify-between mt-5">
          <span className="text-sm font-bold text-white flex-shrink-0">
            Ingredientes
          </span>
          <span
            className="text-xs font-normal text-white text-right max-w-[140px]"
            style={{ lineHeight: "1.5" }}
          >
            {healthFacts}
          </span>
        </div>
      </div>

      {/* Variant selector */}
      {product.variants && product.variants.length > 0 && onSelectVariant && (
        <div className="space-y-3 mb-4">
          {product.variants.map((group) => (
            <VariantPriceSelector
              key={group.id}
              group={group}
              selectedOptionId={selectedVariants?.[group.id]}
              onSelect={(optionId) => onSelectVariant(group.id, optionId)}
              currencySymbol={currencySymbol}
            />
          ))}
        </div>
      )}

      {/* Price + Add to cart */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-normal text-white" style={{ margin: 0 }}>
            Precio
          </p>
          <p className="text-lg font-bold text-white" style={{ margin: "2px 0 0 0" }}>
            {formatPrice(displayPrice, currencySymbol)}
          </p>
        </div>

        <button
          type="button"
          disabled={!product.inStock}
          onClick={handleAddToCart}
          className={`flex-shrink-0 text-sm font-semibold px-10 py-4 transition-colors duration-200 border ${buttonStyleClasses}`}
          style={{
            backgroundColor: isAdded
              ? "var(--t-primary)"
              : !product.inStock
                ? "var(--t-muted)"
                : undefined,
            borderRadius: "var(--t-radius-button)",
            cursor: product.inStock ? "pointer" : "not-allowed",
          }}
        >
          {!product.inStock
            ? "Agotado"
            : isAdded
              ? "Agregado ✓"
              : "Agregar"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--t-background)" }}>
      {/* Desktop shared header */}
      <Header
        store={store}
        cartItemCount={cartItemCount}
        activeHref="/catalogo"
        onSearchOpen={onSearchOpen}
        onCartOpen={onCartOpen}
        onNavLinkClick={onNavLinkClick}
      />

      {/* ── MOBILE LAYOUT ────────────────────────────────────────────────── */}
      <div className="md:hidden relative min-h-screen">
        {/* Full-screen background image */}
        <div className="absolute inset-0">
          {primaryImage ? (
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full" style={{ backgroundColor: "var(--t-detail-inner-bg)" }} />
          )}
        </div>

        {/* Primary-tinted gradient overlay — adapts to any palette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, color-mix(in srgb, var(--t-primary) 20%, transparent) 40%, color-mix(in srgb, var(--t-primary) 70%, transparent) 100%)",
          }}
        />

        {/* Back button */}
        <button
          type="button"
          onClick={onBack}
          className="absolute top-6 left-6 z-10 flex items-center justify-center"
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            backgroundColor: "var(--t-back-button-bg)",
            border: "none",
            cursor: "pointer",
          }}
          aria-label="Volver"
        >
          <ChevronLeft size={24} strokeWidth={2} color="var(--t-on-primary)" />
        </button>

        {/* Info card — anchored to bottom */}
        <div
          className="relative z-10 flex flex-col justify-end"
          style={{ minHeight: "100vh", padding: "0 20px 32px 20px" }}
        >
          {InfoCardContent}
        </div>
      </div>

      {/* ── DESKTOP LAYOUT ───────────────────────────────────────────────── */}
      <div className="hidden md:block">
        <div className="relative min-h-screen flex">
          {/* Left: image + gradient */}
          <div className="relative w-1/2 overflow-hidden">
            <div className="absolute inset-0">
              {primaryImage ? (
                <Image
                  src={primaryImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full" style={{ backgroundColor: "var(--t-detail-inner-bg)" }} />
              )}
            </div>
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, color-mix(in srgb, var(--t-primary) 50%, transparent) 0%, transparent 40%, transparent 60%, color-mix(in srgb, var(--t-primary) 60%, transparent) 100%)",
              }}
            />
            <button
              type="button"
              onClick={onBack}
              className="absolute top-8 left-8 z-10 flex items-center justify-center"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                backgroundColor: "var(--t-back-button-bg)",
                border: "none",
                cursor: "pointer",
              }}
              aria-label="Volver"
            >
              <ChevronLeft size={24} strokeWidth={2} color="var(--t-on-primary)" />
            </button>
          </div>

          {/* Right: soft card surface + subtle secondary accent — adapts to any palette */}
          <div
            className="relative w-1/2 flex flex-col justify-center"
            style={{
              background:
                "linear-gradient(to bottom, var(--t-secondary) 0%, var(--t-card) 100%)",
              padding: "64px 48px",
            }}
          >
            {InfoCardContent}
          </div>
        </div>

        {/* También te puede gustar */}
        {relatedProducts.length > 0 && (
          <section
            className="px-12 pt-12 pb-16"
            style={{ backgroundColor: "var(--t-background)" }}
            aria-labelledby="related-heading"
          >
            <div className="max-w-7xl mx-auto">
              <h2
                id="related-heading"
                className="text-xl font-bold mb-6"
                style={{ color: "var(--t-foreground)" }}
              >
                También te puede gustar
              </h2>
              <div className="grid lg:grid-cols-4 gap-6">
                {relatedProducts.slice(0, 4).map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    currencySymbol={currencySymbol}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Mobile: También te puede gustar */}
      {relatedProducts.length > 0 && (
        <section
          className="md:hidden px-5 pt-8 pb-12"
          style={{ backgroundColor: "var(--t-background)" }}
          aria-labelledby="related-heading-mobile"
        >
          <h2
            id="related-heading-mobile"
            className="text-lg font-bold mb-4"
            style={{ color: "var(--t-foreground)" }}
          >
            También te puede gustar
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {relatedProducts.slice(0, 4).map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                currencySymbol={currencySymbol}
              />
            ))}
          </div>
        </section>
      )}

      {/* Product Detail Tabs */}
      {productDetailTabs.length > 0 && (
        <section
          className="px-5 md:px-12 pb-12 pt-4"
          style={{ backgroundColor: "var(--t-background)" }}
          aria-label="Información del producto"
        >
          <div className="max-w-7xl mx-auto">
            <ProductTabs tabs={productDetailTabs.map(({ label, content }) => ({ label, content }))} />
          </div>
        </section>
      )}
    </div>
  );
}
