"use client";

// Decor Warm Template — Product Detail Page (Presentational)
// Full redesign: desktop 2-col layout, breadcrumb, rating, benefits, accordion, related products.
// ZERO hardcoded colors — all via var(--t-*).

import Image from "next/image";
import {
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { Header } from "./Header";
import { ProductCard } from "./ProductCard";
import { QuantityStepper } from "@/components/shared/QuantityStepper";
import { VariantPriceSelector } from "@/components/shared/VariantPriceSelector";
import { formatPrice } from "@/lib/format";
import type { StorefrontProduct } from "../types";
import type { StoreInfo } from "@/types/store";
import type { VariantSelection } from "@/hooks/useVariantPrice";

// ── Accordion data ─────────────────────────────────────────────────────────────

const ACCORDION_ITEMS = [
  {
    id: "descripcion",
    label: "Descripción",
    isProductDesc: true,
    content: "",
  },
  {
    id: "materiales",
    label: "Materiales",
    isProductDesc: false,
    content:
      "Estructura en madera de roble natural. Tapizado en lino 100% natural. Patas con acabado en nogal oscuro.",
  },
  {
    id: "dimensiones",
    label: "Dimensiones",
    isProductDesc: false,
    content:
      "Alto: 85 cm × Ancho: 75 cm × Profundidad: 80 cm. Peso: 28 kg. Capacidad máxima: 120 kg.",
  },
  {
    id: "cuidado",
    label: "Cuidado",
    isProductDesc: false,
    content:
      "Limpiar con paño húmedo. Evitar la luz solar directa prolongada. No usar productos abrasivos. Revisar tornillos cada 6 meses.",
  },
] as const;

// ── Benefit cards ──────────────────────────────────────────────────────────────

const BENEFITS = [
  {
    icon: Truck,
    title: "Envío gratis",
    subtitle: "Pedidos +$500.000",
  },
  {
    icon: ShieldCheck,
    title: "Garantía",
    subtitle: "2 años en estructura",
  },
  {
    icon: RotateCcw,
    title: "Devoluciones",
    subtitle: "30 días para cambios",
  },
] as const;

// ── Props ──────────────────────────────────────────────────────────────────────

interface ProductDetailPageProps {
  store: StoreInfo;
  product: StorefrontProduct;
  relatedProducts?: StorefrontProduct[];
  activeImageIndex?: number;
  quantity?: number;
  isAdded?: boolean;
  currencySymbol?: string;
  cartItemCount?: number;
  layout?: { buttonStyle?: string };
  openAccordion?: string | null;
  effectivePrice?: number;
  selectedVariants?: VariantSelection;
  onSelectVariant?: (groupId: string, optionId: string) => void;
  onBack?: () => void;
  onCartOpen?: () => void;
  onNavLinkClick?: (href: string) => void;
  onImageIndexChange?: (index: number) => void;
  onQuantityChange?: (value: number) => void;
  onAddToCart?: () => void;
  onProductClick?: (productId: string) => void;
  onAccordionToggle?: (id: string) => void;
  productDetailTabs?: Array<{ id: string; label: string; content: string }>;
}

// ── Component ──────────────────────────────────────────────────────────────────

export function ProductDetailPage({
  store,
  product,
  relatedProducts,
  activeImageIndex = 0,
  quantity = 1,
  isAdded = false,
  currencySymbol = "$",
  cartItemCount = 0,
  openAccordion,
  effectivePrice,
  selectedVariants,
  onSelectVariant,
  onBack,
  onCartOpen,
  onNavLinkClick,
  onImageIndexChange,
  onQuantityChange,
  onAddToCart,
  onProductClick,
  onAccordionToggle,
  productDetailTabs: _productDetailTabs,
}: ProductDetailPageProps) {
  const primaryImage =
    product.images[activeImageIndex]?.url ?? product.images[0]?.url ?? null;

  const displayPrice = effectivePrice ?? product.price;

  const hasDiscount =
    product.originalPrice != null && product.originalPrice > displayPrice;

  const discountPct =
    hasDiscount && product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : 0;

  const rating = product.rating ?? 0;
  const reviewCount = product.reviewCount ?? 0;
  const hasThumbnails = product.images.length > 1;

  // ── Add to cart button label ────────────────────────────────────────────────

  const cartBtnLabel = !product.inStock
    ? "Agotado"
    : isAdded
    ? "Agregado ✓"
    : "Agregar al carrito";

  const cartBtnStyle: React.CSSProperties = {
    flex: 1,
    backgroundColor: isAdded ? "var(--t-primary)" : "var(--t-primary)",
    color: isAdded ? "var(--t-background)" : "var(--t-background)",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "15px",
    fontWeight: 600,
    borderRadius: "var(--t-radius-button)",
    cursor: product.inStock ? "pointer" : "not-allowed",
    padding: "13px 24px",
    border: "none",
    opacity: !product.inStock ? 0.5 : 1,
    transition: "background-color 0.2s ease",
  };

  // ── Image Gallery (shared markup, different layout per breakpoint) ───────────

  const ThumbnailStrip = ({
    horizontal,
  }: {
    horizontal: boolean;
  }) =>
    hasThumbnails ? (
      <div
        className={
          horizontal
            ? "flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden mt-3"
            : "flex flex-col gap-3"
        }
        style={{ scrollbarWidth: "none" }}
      >
        {product.images.map((img, i) => (
          <button
            key={img.url + i}
            type="button"
            onClick={() => onImageIndexChange?.(i)}
            aria-label={`Imagen ${i + 1}`}
            aria-pressed={i === activeImageIndex}
            style={{
              width: horizontal ? 60 : 72,
              height: horizontal ? 60 : 72,
              flexShrink: 0,
              borderRadius: "var(--t-radius-category)",
              backgroundColor: "var(--t-card)",
              border:
                i === activeImageIndex
                  ? "2px solid var(--t-primary)"
                  : "2px solid transparent",
              cursor: "pointer",
              overflow: "hidden",
              position: "relative",
              transition: "border-color 0.2s ease",
              padding: 0,
            }}
          >
            <Image
              src={img.url}
              alt={`${product.name} vista ${i + 1}`}
              fill
              sizes="72px"
              className="object-contain p-1"
            />
          </button>
        ))}
      </div>
    ) : null;

  const MainImage = () => (
    <div
      className="relative w-full flex-1"
      style={{
        aspectRatio: "4 / 3",
        backgroundColor: "var(--t-card)",
        borderRadius: "var(--t-radius-card)",
        overflow: "hidden",
      }}
    >
      {primaryImage ? (
        <Image
          src={primaryImage}
          alt={product.name}
          fill
          sizes="(max-width: 1023px) 100vw, 50vw"
          className="object-contain p-4"
          priority
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <rect width="48" height="48" rx="12" fill="var(--t-border)" />
            <path
              d="M8 34l10-12 7 7 9-11L46 34"
              stroke="var(--t-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
      )}
    </div>
  );

  // ── Stars ───────────────────────────────────────────────────────────────────

  const StarRow = () => (
    <div className="flex items-center gap-1 mt-1">
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i < Math.floor(rating);
        return (
          <Star
            key={i}
            size={16}
            style={{
              fill: filled ? "var(--t-primary)" : "none",
              stroke: filled ? "var(--t-primary)" : "var(--t-border)",
            }}
          />
        );
      })}
      <span
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "13px",
          color: "var(--t-muted)",
          marginLeft: 4,
        }}
      >
        ({rating})
      </span>
      <span
        style={{
          fontFamily: "'League Spartan', sans-serif",
          fontSize: "13px",
          color: "var(--t-muted)",
        }}
      >
        ({reviewCount} reseñas)
      </span>
    </div>
  );

  // ── Product Info ─────────────────────────────────────────────────────────────

  const ProductInfo = ({ isDesktop }: { isDesktop: boolean }) => (
    <div className="flex flex-col gap-4">
      {/* Name */}
      <h1
        style={{
          color: "var(--t-foreground)",
          fontFamily: "'Poppins', sans-serif",
          fontSize: isDesktop ? "28px" : "22px",
          fontWeight: 700,
          lineHeight: 1.2,
          margin: 0,
        }}
      >
        {product.name}
      </h1>

      {/* Rating */}
      <StarRow />

      {/* Price row */}
      <div className="flex items-center gap-3">
        <span
          style={{
            color: "var(--t-primary)",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "26px",
            fontWeight: 700,
          }}
        >
          {formatPrice(displayPrice, currencySymbol)}
        </span>
        {hasDiscount && product.originalPrice != null && (
          <>
            <span
              className="line-through"
              style={{
                color: "var(--t-muted)",
                fontFamily: "'League Spartan', sans-serif",
                fontSize: "15px",
              }}
            >
              {formatPrice(product.originalPrice, currencySymbol)}
            </span>
            <span
              style={{
                backgroundColor: "var(--t-primary)",
                color: "var(--t-background)",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                padding: "2px 8px",
                borderRadius: 9999,
              }}
            >
              -{discountPct}%
            </span>
          </>
        )}
      </div>

      {/* Short description */}
      {product.description && (
        <p
          className="line-clamp-3 leading-relaxed"
          style={{
            color: "var(--t-muted)",
            fontFamily: "'League Spartan', sans-serif",
            fontSize: "15px",
            margin: 0,
          }}
        >
          {product.description}
        </p>
      )}

      {/* Variant selector */}
      {product.variants && product.variants.length > 0 && onSelectVariant && (
        <div className="space-y-3">
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

      {/* Qty + Add to cart — desktop only */}
      {isDesktop && (
        <div className="hidden lg:flex items-center gap-4 mt-2">
          <QuantityStepper
            quantity={quantity}
            min={1}
            max={99}
            onChange={onQuantityChange ?? (() => {})}
            size="md"
          />
          <button
            type="button"
            disabled={!product.inStock}
            style={cartBtnStyle}
            onClick={onAddToCart}
          >
            {cartBtnLabel}
          </button>
        </div>
      )}

      {/* Feature Benefits */}
      <div className="grid grid-cols-3 gap-3 mt-2">
        {BENEFITS.map((benefit) => {
          const Icon = benefit.icon;
          return (
            <div
              key={benefit.title}
              className="flex flex-col items-start gap-2 p-3"
              style={{
                backgroundColor: "var(--t-card)",
                borderRadius: "var(--t-radius-card)",
              }}
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  backgroundColor: "var(--t-primary)",
                  flexShrink: 0,
                }}
              >
                <Icon size={18} style={{ color: "var(--t-background)" }} />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "var(--t-foreground)",
                    margin: 0,
                  }}
                >
                  {benefit.title}
                </p>
                <p
                  style={{
                    fontFamily: "'League Spartan', sans-serif",
                    fontSize: "11px",
                    color: "var(--t-muted)",
                    margin: 0,
                  }}
                >
                  {benefit.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ── Accordion ────────────────────────────────────────────────────────────────

  const AccordionSection = () => (
    <section
      style={{ backgroundColor: "var(--t-background)" }}
      className="px-4 lg:px-16 py-8"
    >
      <h2
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "22px",
          fontWeight: 600,
          color: "var(--t-foreground)",
          margin: "0 0 16px 0",
        }}
      >
        Detalles del producto
      </h2>

      {ACCORDION_ITEMS.map((item) => {
        const isOpen = openAccordion === item.id;
        const content = item.isProductDesc
          ? (product.description ?? "Sin descripción disponible.")
          : item.content;

        return (
          <div
            key={item.id}
            style={{ borderBottom: "1px solid var(--t-border)" }}
          >
            <button
              type="button"
              onClick={() => onAccordionToggle?.(item.id)}
              className="w-full flex items-center justify-between py-4"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "16px 0",
              }}
            >
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "var(--t-foreground)",
                  textAlign: "left",
                }}
              >
                {item.label}
              </span>
              {isOpen ? (
                <ChevronUp size={18} style={{ color: "var(--t-muted)", flexShrink: 0 }} />
              ) : (
                <ChevronDown size={18} style={{ color: "var(--t-muted)", flexShrink: 0 }} />
              )}
            </button>

            {isOpen && (
              <p
                className="leading-relaxed pb-4"
                style={{
                  fontFamily: "'League Spartan', sans-serif",
                  fontSize: "14px",
                  color: "var(--t-muted)",
                  margin: 0,
                }}
              >
                {content}
              </p>
            )}
          </div>
        );
      })}
    </section>
  );

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--t-background)" }}
    >
      {/* 1. Header */}
      <Header
        store={store}
        cartItemCount={cartItemCount}
        activeHref="/catalogo"
        onCartClick={onCartOpen}
        onNavLinkClick={onNavLinkClick}
      />

      {/* 2. Breadcrumb (desktop only) */}
      <nav
        className="hidden lg:flex items-center gap-2 px-8 lg:px-16 py-4"
        aria-label="Breadcrumb"
      >
        <button
          type="button"
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            fontFamily: "'Poppins', sans-serif",
            fontSize: "14px",
            color: "var(--t-muted)",
          }}
        >
          Inicio
        </button>
        <ChevronRight size={14} style={{ color: "var(--t-muted)" }} />
        <button
          type="button"
          onClick={() => onNavLinkClick?.("/catalogo")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            fontFamily: "'Poppins', sans-serif",
            fontSize: "14px",
            color: "var(--t-muted)",
          }}
        >
          Catálogo
        </button>
        <ChevronRight size={14} style={{ color: "var(--t-muted)" }} />
        <span
          className="truncate max-w-[200px]"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "14px",
            color: "var(--t-foreground)",
          }}
        >
          {product.name}
        </span>
      </nav>

      {/* 3. Back button (mobile only) */}
      <div className="lg:hidden flex items-center gap-2 px-4 pt-4 pb-2">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2"
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
          aria-label="Volver"
        >
          <ArrowLeft size={18} style={{ color: "var(--t-foreground)" }} />
          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "14px",
              color: "var(--t-foreground)",
            }}
          >
            Volver
          </span>
        </button>
      </div>

      <main className="flex-1 flex flex-col">

        {/* 4. Main Content — Desktop: side-by-side */}
        <div className="hidden lg:flex gap-12 items-start px-16 py-12">
          {/* 4a. Desktop Image Gallery */}
          <div className="flex gap-4 w-1/2 flex-shrink-0">
            {/* Vertical thumbnail strip */}
            <ThumbnailStrip horizontal={false} />
            {/* Main image */}
            <div className="flex-1">
              <MainImage />
            </div>
          </div>

          {/* 4b. Desktop Product Info */}
          <div className="flex-1">
            <ProductInfo isDesktop={true} />
          </div>
        </div>

        {/* 4. Main Content — Mobile: stacked */}
        <div className="lg:hidden flex flex-col px-4 pb-32">
          {/* 4a. Mobile Image Gallery */}
          <MainImage />
          <ThumbnailStrip horizontal={true} />

          {/* 4b. Mobile Product Info */}
          <div className="mt-5">
            <ProductInfo isDesktop={false} />
          </div>
        </div>

        {/* 6. Product Details Accordion */}
        <AccordionSection />

        {/* 7. Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <section className="px-4 lg:px-16 py-8">
            <h2
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "22px",
                fontWeight: 600,
                color: "var(--t-foreground)",
                margin: "0 0 16px 0",
              }}
            >
              También te puede interesar
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  currencySymbol={currencySymbol}
                  onClick={() => onProductClick?.(p.id)}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* 5. Mobile sticky bottom bar */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center gap-3 px-4"
        style={{
          backgroundColor: "var(--t-background)",
          borderTop: "1px solid var(--t-border)",
          paddingTop: 12,
          paddingBottom: "calc(12px + env(safe-area-inset-bottom, 0px))",
        }}
      >
        <QuantityStepper
          quantity={quantity}
          min={1}
          max={99}
          onChange={onQuantityChange ?? (() => {})}
          size="sm"
        />
        <button
          type="button"
          disabled={!product.inStock}
          style={cartBtnStyle}
          onClick={onAddToCart}
        >
          {cartBtnLabel}
        </button>
      </div>
    </div>
  );
}
