"use client";

// _core/pages/CoreProductDetailPage.tsx
// Layout estructural de la página de detalle de producto.
// Galería de imágenes + info del producto + acordeón de detalles + productos relacionados.
// NO gestiona estado — todo viene como props.

import React, { memo } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronDown, Truck, ShieldCheck, Package } from "lucide-react";
import { PRODUCT_CARD_REGISTRY } from "@/templates/_variants/product-card";
import { gridColsClass } from "@/templates/_shared/utils/grid-classes";
import { resolveStyleTokens } from "./style-tokens";
import { formatPrice } from "@/lib/format";
import type { ResolvedStoreConfig } from "@/types/templates/resolved-config";
import type { StorefrontProduct } from "@/types/store";
import type { ProductCardVariant } from "@/templates/_variants/product-card";

const ACCORDION_ITEMS = [
  { id: "description", label: "Descripción" },
  { id: "details", label: "Detalles" },
  { id: "shipping", label: "Envío y devoluciones" },
];

interface CoreProductDetailPageProps {
  product: StorefrontProduct;
  relatedProducts: StorefrontProduct[];
  config: ResolvedStoreConfig;
  variants: { productCard: ProductCardVariant };
  // Del useProductDetail
  selectedImageIndex: number;
  setSelectedImageIndex: (i: number) => void;
  quantity: number;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
  isAdded: boolean;
  handleAddToCart: (product: StorefrontProduct) => void;
  activeAccordion: string | null;
  toggleAccordion: (id: string) => void;
  // Navegación
  onBack?: () => void;
  onProductClick: (slug: string) => void;
  currencySymbol?: string;
}

export const CoreProductDetailPage = memo(function CoreProductDetailPage({
  product,
  relatedProducts,
  config,
  variants,
  selectedImageIndex,
  setSelectedImageIndex,
  quantity,
  incrementQuantity,
  decrementQuantity,
  isAdded,
  handleAddToCart,
  activeAccordion,
  toggleAccordion,
  onBack,
  onProductClick,
  currencySymbol = "$",
}: CoreProductDetailPageProps) {
  const ProductCardComponent = PRODUCT_CARD_REGISTRY[variants.productCard];

  const {
    buttonClass,
    badgeClass,
    priceConfig,
    cardBgClass,
    hoverFxClass,
    imageFitClass,
    imageHoverClass,
    cardBorderClass,
  } = resolveStyleTokens(config);

  const configAny = config as Record<string, unknown>;
  const showAddToCartInGrid = configAny.showAddToCartInGrid !== false;
  const showDiscountBadge = configAny.showDiscountBadge !== false;
  const showOriginalPrice = configAny.showOriginalPrice !== false;

  const grid = config.grid;
  const productsMobile = grid?.products?.mobile ?? 2;
  const productsDesktop = grid?.products?.desktop ?? 4;

  const images = product.images ?? [];
  const mainImage = images[selectedImageIndex]?.url ?? "/placeholder.png";

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--t-background)" }}
    >
      {/* ── Botón volver (mobile) ──────────────────────────────────────── */}
      <div className="lg:hidden px-4 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "var(--t-muted)",
            padding: 0,
          }}
          aria-label="Volver"
        >
          <ChevronLeft size={18} aria-hidden="true" />
          Volver
        </button>
      </div>

      <main
        className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 lg:py-12 pb-[calc(80px+env(safe-area-inset-bottom,0px))] md:pb-12"
      >
        {/* ── Layout 2 columnas en desktop ──────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">

          {/* LEFT: galería de imágenes ────────────────────────────────── */}
          <div className="flex flex-col gap-4 lg:w-[480px] lg:flex-shrink-0">
            {/* Imagen principal */}
            <div
              className="relative w-full aspect-[4/5] overflow-hidden"
              style={{
                borderRadius: "var(--t-radius-card, 16px)",
                background: "var(--t-card)",
              }}
            >
              <Image
                src={mainImage}
                alt={product.name}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 480px"
                priority
              />
              {discountPercent && (
                <span
                  className={`absolute top-3 left-3 px-2 py-0.5 text-xs font-bold ${badgeClass}`}
                  style={{
                    background: "var(--t-primary)",
                    color: "var(--t-on-primary)",
                  }}
                >
                  -{discountPercent}%
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((img, idx) => (
                  <button
                    key={img.url}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    aria-label={`Ver imagen ${idx + 1}`}
                    aria-pressed={idx === selectedImageIndex}
                    className="relative flex-shrink-0 w-16 h-16 overflow-hidden transition-opacity"
                    style={{
                      borderRadius: "var(--t-radius-card, 8px)",
                      border:
                        idx === selectedImageIndex
                          ? "2px solid var(--t-primary)"
                          : "2px solid var(--t-border)",
                      background: "var(--t-card)",
                      opacity: idx === selectedImageIndex ? 1 : 0.55,
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    <Image
                      src={img.url}
                      alt={`${product.name} vista ${idx + 1}`}
                      fill
                      className="object-contain"
                      sizes="64px"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: información del producto ─────────────────────────── */}
          <div className="flex flex-col gap-6 flex-1 min-w-0">
            {/* Nombre y precio */}
            <div className="flex flex-col gap-3">
              <h1
                className="text-2xl lg:text-3xl font-bold leading-tight"
                style={{ color: "var(--t-foreground)" }}
              >
                {product.name}
              </h1>
              {product.subtitle && (
                <p className="text-sm" style={{ color: "var(--t-muted)" }}>
                  {product.subtitle}
                </p>
              )}
              <div className="flex items-baseline gap-3">
                <span
                  className={priceConfig.className}
                  style={{ ...priceConfig.style, fontSize: "1.5rem" }}
                >
                  {formatPrice(product.price, currencySymbol)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span
                    className="text-base line-through"
                    style={{ color: "var(--t-muted)" }}
                  >
                    {formatPrice(product.originalPrice, currencySymbol)}
                  </span>
                )}
              </div>
            </div>

            {/* Descripción corta */}
            {product.description && (
              <p className="text-sm leading-relaxed" style={{ color: "var(--t-muted)" }}>
                {product.description}
              </p>
            )}

            {/* Variantes de color */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium" style={{ color: "var(--t-foreground)" }}>
                  Color
                </span>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.id}
                      type="button"
                      className="w-8 h-8 rounded-full border-2"
                      style={{
                        backgroundColor: color.hex,
                        borderColor: "var(--t-border)",
                        cursor: "pointer",
                      }}
                      aria-label={`Color: ${color.label}`}
                      title={color.label}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Control de cantidad */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium" style={{ color: "var(--t-foreground)" }}>
                Cantidad
              </span>
              <div
                className="flex items-center"
                style={{
                  border: "1px solid var(--t-border)",
                  borderRadius: "var(--t-radius-button, 9999px)",
                  overflow: "hidden",
                }}
              >
                <button
                  type="button"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="w-9 h-9 flex items-center justify-center text-lg font-medium disabled:opacity-40"
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--t-foreground)",
                  }}
                  aria-label="Disminuir cantidad"
                >
                  −
                </button>
                <span
                  className="w-10 text-center text-sm font-semibold"
                  style={{ color: "var(--t-foreground)" }}
                  aria-live="polite"
                  aria-label={`Cantidad: ${quantity}`}
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={incrementQuantity}
                  className="w-9 h-9 flex items-center justify-center text-lg font-medium"
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--t-foreground)",
                  }}
                  aria-label="Aumentar cantidad"
                >
                  +
                </button>
              </div>
            </div>

            {/* Botón agregar al carrito */}
            <button
              type="button"
              onClick={() => handleAddToCart(product)}
              disabled={!product.inStock}
              className={`w-full py-3.5 text-base font-semibold transition-opacity hover:opacity-90 disabled:opacity-50 ${buttonClass}`}
              style={{
                borderRadius: "var(--t-radius-button, 9999px)",
                cursor: product.inStock ? "pointer" : "not-allowed",
              }}
            >
              {!product.inStock
                ? "Agotado"
                : isAdded
                ? "Agregado al carrito"
                : "Agregar al carrito"}
            </button>

            {/* Íconos de beneficios */}
            <div className="flex gap-4">
              {[
                { Icon: Truck, label: "Envío disponible" },
                { Icon: ShieldCheck, label: "Garantía incluida" },
                { Icon: Package, label: "Empaque seguro" },
              ].map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-1 flex-col items-center gap-2 text-center"
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-full"
                    style={{ background: "var(--t-background)", border: "1px solid var(--t-border)" }}
                  >
                    <Icon size={18} style={{ color: "var(--t-foreground)" }} aria-hidden="true" />
                  </div>
                  <span className="text-xs" style={{ color: "var(--t-muted)" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* ── Acordeón de detalles ────────────────────────────────── */}
            <div
              className="flex flex-col"
              style={{ borderTop: "1px solid var(--t-border)" }}
            >
              {ACCORDION_ITEMS.map((item) => {
                const isOpen = activeAccordion === item.id;
                return (
                  <div
                    key={item.id}
                    style={{ borderBottom: "1px solid var(--t-border)" }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleAccordion(item.id)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between py-4 text-sm font-medium text-left"
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--t-foreground)",
                      }}
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        style={{ color: "var(--t-muted)", flexShrink: 0 }}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <div className="pb-4 text-sm leading-relaxed" style={{ color: "var(--t-muted)" }}>
                        {item.id === "description" && (product.description ?? "Sin descripción disponible.")}
                        {item.id === "details" && (
                          <ul className="list-disc list-inside flex flex-col gap-1">
                            {(product.specs ?? []).length > 0
                              ? product.specs!.map((spec, i) => (
                                  <li key={i}>{spec}</li>
                                ))
                              : <li>Sin especificaciones registradas.</li>
                            }
                          </ul>
                        )}
                        {item.id === "shipping" && "Consultar disponibilidad de envío con el vendedor."}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Productos relacionados ──────────────────────────────────────── */}
        {relatedProducts.length > 0 && (
          <section
            aria-labelledby="related-products-heading"
            style={{
              marginTop: "clamp(2rem, 5vw, 10rem)",
            }}
          >
            <h2
              id="related-products-heading"
              className="text-xl font-bold mb-5"
              style={{ color: "var(--t-foreground)" }}
            >
              Productos relacionados
            </h2>
            <div
              className={`grid ${gridColsClass(productsMobile, productsDesktop)}`}
              style={{ gap: "var(--t-space-gap, 1rem)" }}
            >
              {relatedProducts.slice(0, productsDesktop).map((p) => (
                <ProductCardComponent
                  key={p.id}
                  product={p}
                  currencySymbol={currencySymbol}
                  onClick={onProductClick}
                  onAddToCart={() => {}}
                  buttonClass={buttonClass}
                  badgeClass={badgeClass}
                  priceConfig={priceConfig}
                  cardBgClass={cardBgClass}
                  cardBorderClass={cardBorderClass}
                  hoverFxClass={hoverFxClass}
                  imageHoverClass={imageHoverClass}
                  imageFitClass={imageFitClass}
                  showAddToCart={showAddToCartInGrid}
                  showDiscountBadge={showDiscountBadge}
                  showOriginalPrice={showOriginalPrice}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
});
