// Fashion Template — Product Detail Page
// Back button → Image gallery (main + thumbnails) → Product info (name, price, colors, sizes, add-to-cart)
// 3:4 aspect ratio image. Thumbnails 60x60. Full-width CTA button.

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Header } from "./Header";
import { ColorSwatch } from "./ColorSwatch";
import { SizeSelector } from "./SizeSelector";
import { VariantPriceSelector } from "@/components/shared/VariantPriceSelector";
import { QuantityStepper } from "@/components/shared/QuantityStepper";
import { ProductCard } from "./ProductCard";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { BUTTON_STYLE_MAP } from "@/templates/_shared/style-maps";
import { ProductTabs } from "@/templates/_shared/components/ProductTabs";
import type { VariantSelection } from "@/hooks/useVariantPrice";
import type { StoreInfo, StorefrontProduct, NavTab } from "../types";
import { formatPrice } from "@/lib/format";

interface ProductDetailPageProps {
  store: StoreInfo;
  product: StorefrontProduct;
  selectedImageIndex: number;
  selectedColor?: string;
  selectedSize?: string;
  effectivePrice?: number;
  selectedVariants?: VariantSelection;
  onSelectVariant?: (groupId: string, optionId: string) => void;
  activeTab: NavTab;
  cartItemCount?: number;
  currencySymbol?: string;
  layout?: { buttonStyle?: string };
  activeHref?: string;
  onBack?: () => void;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onNavLinkClick?: (href: string) => void;
  onAddToCart?: () => void;
  onImageSelect?: (index: number) => void;
  onColorSelect?: (colorHex: string) => void;
  onSizeSelect?: (size: string) => void;
  onTabChange?: (tab: NavTab) => void;
  productDetailTabs?: Array<{ id: string; label: string; content: string }>;
  quantity?: number;
  onDecrement?: () => void;
  onIncrement?: () => void;
  relatedProducts?: StorefrontProduct[];
  onProductClick?: (id: string) => void;
}

/** Map common hex values to human-readable color names in Spanish */
const HEX_COLOR_NAMES: Record<string, string> = {
  "#000000": "Negro",
  "#ffffff": "Blanco",
  "#f5f5f0": "Blanco hueso",
  "#d9d9d9": "Gris claro",
  "#8a8a8a": "Gris medio",
  "#5e5e5e": "Gris oscuro",
  "#1e1e1e": "Casi negro",
  "#e5e5e5": "Gris perla",
  "#c0c0c0": "Plata",
  "#a0a0a0": "Gris",
  "#383838": "Grafito",
};

function getColorName(hex: string): string {
  return HEX_COLOR_NAMES[hex.toLowerCase()] ?? hex;
}

export function ProductDetailPage({
  store,
  product,
  selectedImageIndex,
  selectedColor,
  selectedSize,
  effectivePrice,
  selectedVariants,
  onSelectVariant,
  activeTab,
  cartItemCount = 0,
  currencySymbol = "$",
  layout,
  activeHref,
  onBack,
  onSearchClick,
  onCartClick,
  onNavLinkClick,
  onAddToCart,
  onImageSelect,
  onColorSelect,
  onSizeSelect,
  onTabChange,
  productDetailTabs = [],
  quantity = 1,
  onDecrement,
  onIncrement,
  relatedProducts,
  onProductClick,
}: ProductDetailPageProps) {
  const currentImage = product.images[selectedImageIndex] ?? product.images[0];
  const btnClass = BUTTON_STYLE_MAP[(layout?.buttonStyle as keyof typeof BUTTON_STYLE_MAP) ?? "filled"];

  return (
    <div
      className="min-h-screen bg-[var(--t-background)]"
      style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
    >
      <Header
        store={store}
        cartItemCount={cartItemCount}
        activeHref={activeHref}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
        onNavLinkClick={onNavLinkClick}
      />

      <main className="max-w-7xl mx-auto px-0 md:px-6 lg:px-8">
        {/* Breadcrumb — desktop only */}
        <div className="hidden md:flex items-center gap-1.5 py-4 text-[11px] text-[var(--t-muted)]">
          <span className="cursor-pointer hover:text-[var(--t-foreground)] transition-colors">
            Inicio
          </span>
          <span>/</span>
          <span className="cursor-pointer hover:text-[var(--t-foreground)] transition-colors">
            Productos
          </span>
          <span>/</span>
          <span className="text-[var(--t-foreground)]">{product.name}</span>
        </div>

        <div className="flex flex-col md:flex-row md:gap-8 lg:gap-12 md:items-start">
          {/* Image panel */}
          <div className="relative w-full md:w-1/2 md:sticky md:top-20">
            {/* Back button */}
            <div className="absolute top-4 left-4 z-10">
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2 bg-[var(--t-surface)]/80 transition-opacity hover:opacity-60 border-0 cursor-pointer"
                onClick={onBack}
                aria-label="Volver"
              >
                <ArrowLeft
                  size={16}
                  strokeWidth={1.5}
                  className="text-[var(--t-foreground)]"
                />
                <span
                  className="text-[11px] font-medium uppercase tracking-wider text-[var(--t-foreground)]"
                  style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
                >
                  Volver
                </span>
              </button>
            </div>

            {/* Main image — 3:4 aspect ratio, full product visible */}
            <div
              className="relative w-full border border-[var(--t-border)]"
              style={{ aspectRatio: "3/4" }}
            >
              {currentImage ? (
                <Image
                  src={currentImage.url}
                  alt={product.name}
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full bg-[var(--t-background)] flex items-center justify-center">
                  <span className="text-[var(--t-muted)] text-xs uppercase">
                    SIN IMAGEN
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {product.images.length > 1 && (
              <div className="flex gap-2 px-5 md:px-0 pt-3 pb-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="relative flex-shrink-0 transition-opacity border border-[var(--t-border)] bg-transparent p-0 cursor-pointer rounded-[var(--t-radius-card)] overflow-hidden"
                    style={{
                      width: "60px",
                      height: "60px",
                      opacity: idx === selectedImageIndex ? 1 : 0.44,
                    }}
                    onClick={() => onImageSelect?.(idx)}
                    aria-label={`Ver imagen ${idx + 1}`}
                  >
                    <Image
                      src={img.url}
                      alt={`${product.name} imagen ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="60px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info panel */}
          <div className="px-5 md:px-0 py-6 md:py-2 w-full md:w-1/2">
            {/* Product name */}
            <h1
              className="mb-3 leading-tight text-sm md:text-base lg:text-lg font-bold uppercase tracking-[1px] text-[var(--t-foreground)]"
              style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
            >
              {product.name}
            </h1>

            {/* Price row */}
            <div className="flex items-baseline justify-between mb-4 md:mb-5">
              <span
                className="text-[11px] md:text-xs text-[var(--t-muted)]"
                style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)", fontWeight: 400 }}
              >
                Precio incluye impuestos
              </span>
              <div className="flex items-baseline gap-2">
                <span
                  className="text-base md:text-lg font-semibold text-[var(--t-foreground)]"
                  style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
                >
                  {formatPrice(effectivePrice ?? product.price, currencySymbol)}
                </span>
                {product.originalPrice && (
                  <span
                    className="line-through text-[13px] md:text-sm text-[var(--t-muted)]"
                    style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)", fontWeight: 400 }}
                  >
                    {formatPrice(product.originalPrice, currencySymbol)}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <p
                className="mb-5 text-[10px] md:text-xs lg:text-sm text-[var(--t-muted)]"
                style={{
                  fontFamily: "var(--font-sans, 'Inter', sans-serif)",
                  fontWeight: 400,
                  lineHeight: 1.7,
                }}
              >
                {product.description}
              </p>
            )}

            {/* Separator */}
            <div className="h-px bg-[var(--t-border)] mb-5" />

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-5">
                <p
                  className="mb-3 text-xs font-medium text-[var(--t-foreground)]"
                  style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
                >
                  Color{selectedColor ? `: ${getColorName(selectedColor)}` : ""}
                </p>
                <ColorSwatch
                  colors={product.colors}
                  selectedColor={selectedColor}
                  onColorSelect={onColorSelect}
                />
              </div>
            )}

            {/* Sizes */}
            {product.storageOptions && product.storageOptions.length > 0 && (
              <div className="mb-5">
                <p
                  className="mb-3 text-xs font-medium text-[var(--t-foreground)]"
                  style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
                >
                  Talla{selectedSize ? `: ${selectedSize}` : ""}
                </p>
                <SizeSelector
                  sizes={product.storageOptions}
                  selectedSize={selectedSize}
                  onSizeSelect={onSizeSelect}
                />
              </div>
            )}

            {/* Variant groups with price modifiers */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-5 flex flex-col gap-4">
                {product.variants.map((group) => (
                  <VariantPriceSelector
                    key={group.id}
                    group={group}
                    selectedOptionId={selectedVariants?.[group.id]}
                    onSelect={(optionId) => onSelectVariant?.(group.id, optionId)}
                    currencySymbol={currencySymbol}
                  />
                ))}
              </div>
            )}

            {/* Quantity + AGREGAR AL CARRITO */}
            <div className="flex items-center gap-3 mt-3">
              <QuantityStepper
                quantity={quantity}
                onDecrement={onDecrement}
                onIncrement={onIncrement}
              />
              <button
                type="button"
                className={`flex-1 py-3.5 transition-opacity hover:opacity-80 active:opacity-60 cursor-pointer rounded-[var(--t-radius-button)] border ${btnClass}`}
                style={{
                  fontFamily: "var(--font-sans, 'Inter', sans-serif)",
                  fontSize: "13px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  cursor: product.inStock ? "pointer" : "not-allowed",
                  opacity: product.inStock ? 1 : 0.5,
                }}
                onClick={product.inStock ? onAddToCart : undefined}
                disabled={!product.inStock}
              >
                {product.inStock ? "AGREGAR AL CARRITO" : "AGOTADO"}
              </button>
            </div>
          </div>
        </div>
        {/* Product Detail Tabs */}
        {productDetailTabs.length > 0 && (
          <div className="px-5 md:px-6 lg:px-8 py-6 border-t border-[var(--t-border)]">
            <ProductTabs tabs={productDetailTabs.map(({ label, content }) => ({ label, content }))} />
          </div>
        )}

        {/* También te puede gustar */}
        {relatedProducts && relatedProducts.length > 0 && (
          <section className="px-5 md:px-6 lg:px-8 mt-12 mb-8">
            <h2
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--t-foreground)", fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
            >
              También te puede gustar
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.slice(0, 4).map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  currencySymbol={currencySymbol}
                  onProductClick={onProductClick}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer store={store} />

      <BottomNav
        activeTab={activeTab}
        cartItemCount={cartItemCount}
        onTabChange={onTabChange}
      />
    </div>
  );
}
