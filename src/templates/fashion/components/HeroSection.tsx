// Fashion Template — Hero Section
// Category links stacked, search bar, "NUEVA COLECCIÓN" headline, product carousel.
// "Ir a la tienda" CTA button with arrow.
// Visual only — no local state; handlers come as props.

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { gridColsClass } from "../utils/grid-classes";
import { imageRatioClass } from "../utils/layout-classes";
import type { StorefrontProduct } from "../types";

interface HeroSectionProps {
  products: StorefrontProduct[];
  navCategories?: string[];
  currencySymbol?: string;
  onShopClick?: () => void;
  onProductClick?: (id: string) => void;
  onSearchChange?: (value: string) => void;
  onSearchFocus?: () => void;
  grid?: { mobile: number; desktop: number };
  layout?: {
    cardStyle?: string;
    cardHoverEffect?: string;
    cardImageRatio?: string;
  };
}

export function HeroSection({
  products,
  navCategories = ["HOMBRES", "MUJERES", "NIÑOS"],
  currencySymbol = "$",
  onShopClick,
  onProductClick,
  onSearchChange,
  onSearchFocus,
  grid,
  layout,
}: HeroSectionProps) {
  const imgRatio = imageRatioClass(layout?.cardImageRatio ?? "portrait");
  const desktopGrid = gridColsClass(grid?.mobile ?? 2, grid?.desktop ?? 4);
  const enableImageHover = (layout?.cardHoverEffect ?? "scale") !== "none";

  return (
    <section
      className="px-5 md:px-6 lg:px-8 pt-4 md:pt-6 lg:pt-8 pb-8 md:pb-10 lg:pb-12 max-w-7xl mx-auto"
      aria-labelledby="hero-heading"
    >
      {/* Category links — mobile only (desktop shows in header nav) */}
      <div className="flex flex-col gap-1.5 mb-5 md:hidden">
        {navCategories.map((cat) => (
          <span
            key={cat}
            className="cursor-pointer text-[var(--t-text-primary)]/60 hover:text-[var(--t-text-primary)] transition-colors uppercase"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              fontWeight: 400,
              letterSpacing: "2px",
            }}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Search bar — mobile only (desktop uses icon in header) */}
      <div className="mb-6 md:hidden">
        <SearchBar
          onChange={onSearchChange}
          onFocus={onSearchFocus}
          placeholder="Buscar"
        />
      </div>

      {/* Hero typography */}
      <div className="flex items-start justify-between mb-6 md:mb-8 lg:mb-10">
        <div>
          <h1
            id="hero-heading"
            className="leading-none text-[48px] md:text-[64px] lg:text-[80px] text-[var(--t-text-primary)]"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            NUEVA
          </h1>
          <h1
            className="leading-none text-[48px] md:text-[64px] lg:text-[80px] text-[var(--t-text-primary)]"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            COLECCIÓN
          </h1>
        </div>
        <div className="text-right pt-1 md:pt-2">
          <p
            className="text-base md:text-lg text-[var(--t-text-muted)]"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
            }}
          >
            Verano
          </p>
          <p
            className="text-base md:text-lg text-[var(--t-text-muted)]"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
            }}
          >
            {new Date().getFullYear()}
          </p>
        </div>
      </div>

      {/* Product carousel — mobile: horizontal scroll */}
      <div
        className="flex gap-3 overflow-x-auto pb-4 -mx-1 px-1 md:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 cursor-pointer"
            style={{ width: "169px" }}
            onClick={() => onProductClick?.(product.id)}
          >
            <div
              className={`relative border border-[var(--t-border)] overflow-hidden rounded-[var(--t-radius-card)]`}
              style={{ width: "169px", height: "173px" }}
            >
              {product.images[0] ? (
                <Image
                  src={product.images[0].url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="169px"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-[var(--t-background)] flex items-center justify-center">
                  <span
                    className="text-[var(--t-text-muted)] text-xs"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    SIN IMAGEN
                  </span>
                </div>
              )}
            </div>
            <div className="pt-2">
              {/* Line 1: category/type — muted */}
              <p
                className="leading-tight text-[var(--t-text-muted)]"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "12px",
                  fontWeight: 400,
                }}
              >
                {product.name}
              </p>
              {/* Line 2: subtitle — bold */}
              {product.subtitle && (
                <p
                  className="leading-tight text-[var(--t-text-primary)]"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  {product.subtitle}
                </p>
              )}
              {/* Line 3: price */}
              <p
                className="mt-0.5 text-[var(--t-text-primary)]"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                {currencySymbol}
                {new Intl.NumberFormat("en-US").format(product.price)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Product grid — desktop */}
      <div className={`hidden md:grid ${desktopGrid} gap-5 lg:gap-6`}>
        {products.map((product) => (
          <div
            key={product.id}
            className="cursor-pointer group"
            onClick={() => onProductClick?.(product.id)}
          >
            <div
              className={`relative border border-[var(--t-border)] overflow-hidden rounded-[var(--t-radius-card)] max-h-[300px] ${imgRatio}`}
            >
              {product.images[0] ? (
                <Image
                  src={product.images[0].url}
                  alt={product.name}
                  fill
                  className={`object-cover transition-transform duration-700 ease-out${enableImageHover ? " group-hover:scale-105" : ""}`}
                  sizes="(max-width: 1024px) 33vw, 25vw"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-[var(--t-background)] flex items-center justify-center">
                  <span
                    className="text-[var(--t-text-muted)] text-xs"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    SIN IMAGEN
                  </span>
                </div>
              )}
            </div>
            <div className="pt-2.5">
              {/* Line 1: category/type — muted */}
              <p
                className="leading-tight text-xs md:text-sm text-[var(--t-text-muted)]"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 400,
                }}
              >
                {product.name}
              </p>
              {/* Line 2: subtitle — bold */}
              {product.subtitle && (
                <p
                  className="leading-tight text-[13px] md:text-sm text-[var(--t-text-primary)]"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                  }}
                >
                  {product.subtitle}
                </p>
              )}
              {/* Line 3: price */}
              <p
                className="mt-0.5 text-[13px] md:text-sm text-[var(--t-text-primary)]"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                }}
              >
                {currencySymbol}
                {new Intl.NumberFormat("en-US").format(product.price)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Ir a la tienda button */}
      <button
        type="button"
        className="flex items-center gap-2 px-6 md:px-8 py-3 md:py-3.5 bg-[var(--t-secondary)] mt-4 md:mt-6 transition-opacity hover:opacity-80 border-none cursor-pointer rounded-[var(--t-radius-button)]"
        onClick={onShopClick}
        aria-label="Ir a la tienda"
      >
        <span
          className="text-[13px] md:text-sm text-[var(--t-text-primary)]"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            letterSpacing: "1px",
          }}
        >
          Ir a la tienda
        </span>
        <ArrowRight size={16} strokeWidth={2} className="text-[var(--t-text-primary)]" />
      </button>
    </section>
  );
}
