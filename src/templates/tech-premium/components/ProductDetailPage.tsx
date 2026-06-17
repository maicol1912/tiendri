// Tech Premium Template — Product Detail Page
// Figma desktop: 120:683 | mobile: 2619:1842
// 2-col layout (desktop): image gallery left, product info right.
// Mobile: stacked — main image + horizontal thumbs, info below.
// Visual only — handlers come as props.

import Image from "next/image";
import { ChevronRight, ChevronDown, Truck, Store, ShieldCheck } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { ProductCard } from "./ProductCard";
import { VariantPriceSelector } from "@/components/shared/VariantPriceSelector";
import { gridColsClass } from "../../_shared/utils/grid-classes";
import { BUTTON_STYLE_MAP } from "@/templates/_shared/style-maps";
import { ProductTabs } from "@/templates/_shared/components/ProductTabs";
import type { VariantSelection } from "@/hooks/useVariantPrice";
import type { TemplateLayoutConfig } from "@/types/templates";
import type { TechPremiumConfig } from "../config";
import type {
  StoreInfo,
  StorefrontProduct,
  NavTab,
  SpecBadge,
} from "../types";

interface ProductDetailPageProps {
  store: StoreInfo;
  product: StorefrontProduct;
  navLinks: readonly { label: string; href: string }[];
  activeHref?: string;
  footerServices: readonly string[];
  footerAssistance: readonly string[];
  grid: TechPremiumConfig["grid"];
  layout?: Partial<TemplateLayoutConfig>;
  relatedProducts?: StorefrontProduct[];
  specBadges?: SpecBadge[];
  activeTab?: NavTab;
  cartItemCount?: number;
  currencySymbol?: string;
  selectedImageIndex?: number;
  selectedStorage?: string;
  selectedColor?: number;
  effectivePrice?: number;
  selectedVariants?: VariantSelection;
  onSelectVariant?: (groupId: string, optionId: string) => void;
  onBack?: () => void;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onAddToCart?: () => void;
  onImageSelect?: (index: number) => void;
  onStorageSelect?: (storage: string) => void;
  onColorSelect?: (index: number) => void;
  onProductClick?: (productId: string) => void;
  onAddToCartProduct?: (productId: string) => void;
  onTabChange?: (tab: NavTab) => void;
  onNavLinkClick?: (href: string) => void;
  productDetailTabs?: Array<{ id: string; label: string; content: string }>;
}

export function ProductDetailPage({
  store,
  product,
  navLinks,
  activeHref,
  footerServices,
  footerAssistance,
  grid,
  layout,
  relatedProducts = [],
  specBadges = [],
  activeTab = "home",
  cartItemCount = 0,
  currencySymbol = "$",
  selectedImageIndex = 0,
  selectedStorage,
  selectedColor = 0,
  effectivePrice,
  selectedVariants,
  onSelectVariant,
  onBack,
  onSearchClick,
  onCartClick,
  onAddToCart,
  onImageSelect,
  onStorageSelect,
  onColorSelect,
  onProductClick,
  onAddToCartProduct,
  onTabChange,
  onNavLinkClick,
  productDetailTabs = [],
}: ProductDetailPageProps) {
  const addToCartBtnClass = BUTTON_STYLE_MAP["filled"];
  const images = product.images;
  const mainImage = images[selectedImageIndex]?.url ?? "/placeholder.png";

  const defaultColors = ["#1E1E1E", "#C5A880", "#D4C5A9", "#4A4A6A", "#2E4057"];
  const colors = product.colors ?? defaultColors;

  const defaultStorageOptions = ["128GB", "256GB", "512GB", "1TB"];
  const storageOptions = product.storageOptions ?? defaultStorageOptions;
  const activeStorage = selectedStorage ?? storageOptions[storageOptions.length - 1];

  const displayPrice = effectivePrice ?? product.price;
  const formattedPrice = `${currencySymbol}${new Intl.NumberFormat("es-CO").format(displayPrice)}`;
  const formattedOriginalPrice = product.originalPrice
    ? `${currencySymbol}${new Intl.NumberFormat("es-CO").format(product.originalPrice)}`
    : null;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: `https://tiendri.com/template/${store.slug}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Catálogo",
        item: `https://tiendri.com/template/${store.slug}/catalogo`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `https://tiendri.com/template/${store.slug}/producto/${product.slug}`,
      },
    ],
  };

  return (
    <div className="bg-[var(--t-background)] min-h-screen font-['Inter',sans-serif] flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Header */}
      <Header
        store={store}
        navLinks={navLinks}
        activeHref={activeHref}
        cartItemCount={cartItemCount}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
        onNavLinkClick={onNavLinkClick}
      />

      {/* Breadcrumbs — desktop only */}
      <nav aria-label="Ruta de navegación" className="hidden lg:flex items-center gap-4 px-[160px] py-10">
        <button type="button" onClick={onBack} className="text-[var(--t-muted)] text-base font-medium bg-transparent border-none cursor-pointer p-0">
          Inicio
        </button>
        <ChevronRight className="w-4 h-4 text-[var(--t-muted)]" aria-hidden="true" />
        <span className="text-[var(--t-muted)] text-base font-medium">Catálogo</span>
        <ChevronRight className="w-4 h-4 text-[var(--t-muted)]" aria-hidden="true" />
        <span className="text-[var(--t-muted)] text-base font-medium">Smartphones</span>
        <ChevronRight className="w-4 h-4 text-[var(--t-muted)]" aria-hidden="true" />
        <span className="text-[var(--t-foreground)] text-base font-medium truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>

      <main>
      {/* ── Mobile: Image Gallery ── */}
      <div className="lg:hidden flex flex-col items-center gap-6 px-4 pt-8">
        {/* Main image */}
        <div className="relative w-[264px] h-[330px]">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-contain"
            sizes="264px"
            priority
          />
        </div>
        {/* Thumbnails horizontal */}
        <div className="flex items-center justify-center gap-4 w-full">
          {images.map((img, idx) => (
            <button
              key={img.url}
              type="button"
              className={`relative w-[66px] h-[66px] bg-transparent border-none p-0 cursor-pointer ${
                idx !== selectedImageIndex ? "opacity-40" : ""
              }`}
              onClick={() => onImageSelect?.(idx)}
              aria-label={`Ver imagen ${idx + 1}`}
            >
              <Image src={img.url} alt={`${product.name} vista ${idx + 1}`} fill className="object-contain" sizes="66px" loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      {/* ── Desktop: 2-col main area ── */}
      <div className="hidden lg:flex items-start gap-12 px-[160px] py-[112px]">
        {/* LEFT: Image gallery */}
        <div className="flex gap-12 items-start shrink-0 w-[536px]">
          {/* Vertical thumbnails */}
          <div className="flex flex-col gap-6 items-center">
            {images.map((img, idx) => (
              <button
                key={img.url}
                type="button"
                className={`relative w-[75px] h-[93px] bg-transparent border-none p-0 cursor-pointer ${
                  idx !== selectedImageIndex ? "opacity-40" : ""
                }`}
                onClick={() => onImageSelect?.(idx)}
                aria-label={`Ver imagen ${idx + 1}`}
              >
                <Image src={img.url} alt={`${product.name} vista ${idx + 1}`} fill className="object-contain" sizes="75px" loading="lazy" />
              </button>
            ))}
          </div>
          {/* Main image */}
          <div className="relative flex-1 h-[516px]">
            <Image src={mainImage} alt={product.name} fill className="object-contain" sizes="413px" priority />
          </div>
        </div>

        {/* RIGHT: Product info */}
        <div className="flex flex-col gap-8 flex-1 min-w-0">
          {/* Title + Price */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-6">
              <h1 className="text-[40px] font-bold leading-[40px] text-[var(--t-foreground)] m-0">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-[32px] font-medium text-[var(--t-foreground)] tracking-[0.96px]">
                  {formattedPrice}
                </span>
                {formattedOriginalPrice && (
                  <span className="text-2xl text-[var(--t-muted)] tracking-[0.72px] line-through">
                    {formattedOriginalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Colors */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-6">
                <span className="text-[15px] text-[var(--t-primary)]">Seleccionar color :</span>
                <div className="flex items-center gap-2">
                  {colors.map((color, idx) => (
                    <button
                      key={color}
                      type="button"
                      className={`w-8 h-8 rounded-full border-none cursor-pointer p-0 ${
                        idx === selectedColor ? "ring-2 ring-[var(--t-foreground)] ring-offset-2" : ""
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => onColorSelect?.(idx)}
                      aria-label={`Seleccionar color ${idx + 1}`}
                      aria-pressed={idx === selectedColor}
                    />
                  ))}
                </div>
              </div>

              {/* Storage tabs */}
              <div className="flex gap-4">
                {storageOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`flex-1 px-6 py-4 rounded-lg text-sm font-medium text-center cursor-pointer transition-colors ${
                      activeStorage === opt
                        ? "border border-[var(--t-foreground)] text-[var(--t-foreground)] bg-[var(--t-background)]"
                        : "border border-[var(--t-border)] text-[var(--t-muted)] bg-[var(--t-background)] hover:border-[var(--t-border)]"
                    }`}
                    onClick={() => onStorageSelect?.(opt)}
                    aria-pressed={activeStorage === opt}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {/* Variant groups with price modifiers */}
              {product.variants && product.variants.length > 0 && (
                <div className="flex flex-col gap-4">
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

              {/* Spec badges */}
              {specBadges.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {specBadges.map((spec) => (
                    <div key={spec.label} className="flex-1 min-w-[168px] bg-[var(--t-spec-badge-bg)] rounded-[7px] px-2 py-4 flex items-center gap-2">
                      <div className="flex flex-col min-w-0">
                        <span className="text-[14px] text-[var(--t-muted)] leading-4">{spec.label}</span>
                        <span className="text-[14px] font-medium text-[var(--t-muted)] leading-4">{spec.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Description */}
              {product.description && (
                <p className="text-sm text-[var(--t-muted)] leading-6 tracking-[0.42px]">
                  {product.description}{" "}
                  <span className="text-[var(--t-primary)] underline cursor-pointer">ver más...</span>
                </p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              className={`flex-1 min-w-[136px] px-14 py-4 rounded-[6px] border text-base font-medium text-center cursor-pointer hover:opacity-90 transition-colors disabled:opacity-50 ${addToCartBtnClass}`}
              onClick={onAddToCart}
              disabled={!product.inStock}
            >
              {product.inStock ? "Agregar al carrito" : "Agotado"}
            </button>
          </div>

          {/* Feature icons */}
          <div className="flex gap-8">
            <div className="flex flex-1 items-center gap-4 rounded-lg">
              <div className="bg-[var(--t-card)] rounded-[11px] p-4 shrink-0">
                <Truck className="w-6 h-6 text-[var(--t-foreground)]" aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-[var(--t-muted)]">Envío gratis</span>
                <span className="text-sm font-medium text-[var(--t-foreground)]">1-2 días</span>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-4 rounded-lg">
              <div className="bg-[var(--t-card)] rounded-[11px] p-4 shrink-0">
                <Store className="w-6 h-6 text-[var(--t-foreground)]" aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-[var(--t-muted)]">Disponible</span>
                <span className="text-sm font-medium text-[var(--t-foreground)]">Hoy</span>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-4 rounded-lg">
              <div className="bg-[var(--t-card)] rounded-[11px] p-4 shrink-0">
                <ShieldCheck className="w-6 h-6 text-[var(--t-foreground)]" aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-[var(--t-muted)]">Garantía</span>
                <span className="text-sm font-medium text-[var(--t-foreground)]">1 año</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile: Product info ── */}
      <div className="lg:hidden flex flex-col gap-8 px-4 pt-8 pb-4">
        {/* Title + Price */}
        <div className="flex flex-col gap-6">
          <h1 className="text-[40px] font-bold leading-[40px] text-[var(--t-foreground)] m-0">{product.name}</h1>
          <div className="flex items-center gap-4">
            <span className="text-[32px] font-medium text-[var(--t-foreground)] tracking-[0.96px]">
              {formattedPrice}
            </span>
            {formattedOriginalPrice && (
              <span className="text-2xl text-[var(--t-muted)] tracking-[0.72px] line-through">
                {formattedOriginalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Colors */}
        <div className="flex items-center gap-6">
          <span className="text-[15px] text-[var(--t-primary)]">Seleccionar color :</span>
          <div className="flex items-center gap-2">
            {colors.map((color, idx) => (
              <button
                key={color}
                type="button"
                className={`w-8 h-8 rounded-full border-none cursor-pointer p-0 ${
                  idx === selectedColor ? "ring-2 ring-[var(--t-foreground)] ring-offset-2" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => onColorSelect?.(idx)}
                aria-label={`Seleccionar color ${idx + 1}`}
                aria-pressed={idx === selectedColor}
              />
            ))}
          </div>
        </div>

        {/* Storage tabs */}
        <div className="flex gap-2">
          {storageOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              className={`flex-1 px-6 py-4 rounded-lg text-sm font-medium text-center cursor-pointer transition-colors ${
                activeStorage === opt
                  ? "border border-[var(--t-foreground)] text-[var(--t-foreground)] bg-[var(--t-background)]"
                  : "border border-[var(--t-border)] text-[var(--t-muted)] bg-[var(--t-background)]"
              }`}
              onClick={() => onStorageSelect?.(opt)}
              aria-pressed={activeStorage === opt}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Variant groups with price modifiers - mobile */}
        {product.variants && product.variants.length > 0 && (
          <div className="flex flex-col gap-4">
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

        {/* Spec badges - mobile */}
        {specBadges.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {specBadges.map((spec) => (
              <div key={spec.label} className="flex-1 min-w-[160px] bg-[var(--t-spec-badge-bg)] rounded-[7px] px-2 py-4 flex items-center gap-2">
                <div className="flex flex-col min-w-0">
                  <span className="text-[14px] text-[var(--t-muted)] leading-4">{spec.label}</span>
                  <span className="text-[14px] font-medium text-[var(--t-muted)] leading-4">{spec.value}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Description */}
        {product.description && (
          <p className="text-sm text-[var(--t-muted)] leading-6 tracking-[0.42px]">
            {product.description}{" "}
            <span className="text-[var(--t-primary)] underline cursor-pointer">ver más...</span>
          </p>
        )}

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button
            type="button"
            className={`w-full px-14 py-4 rounded-[6px] border text-base font-medium text-center cursor-pointer disabled:opacity-50 ${addToCartBtnClass}`}
            onClick={onAddToCart}
            disabled={!product.inStock}
          >
            {product.inStock ? "Agregar al carrito" : "Agotado"}
          </button>
        </div>

        {/* Feature icons — mobile */}
        <div className="flex gap-8">
          {[
            { Icon: Truck, label: "Envío gratis", value: "1-2 días" },
            { Icon: Store, label: "Disponible", value: "Hoy" },
            { Icon: ShieldCheck, label: "Garantía", value: "1 año" },
          ].map(({ Icon, label, value }) => (
            <div key={label} className="flex flex-1 flex-col items-center gap-4 rounded-lg">
              <div className="bg-[var(--t-card)] rounded-[11px] p-4">
                <Icon className="w-6 h-6 text-[var(--t-foreground)]" aria-hidden="true" />
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-sm font-medium text-[var(--t-muted)]">{label}</span>
                <span className="text-sm font-medium text-[var(--t-foreground)]">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Details Section ── */}
      <section aria-label="Detalles del producto" className="bg-[var(--t-background)] px-4 py-10 lg:px-[160px] lg:py-20">
        <div className="bg-[var(--t-background)] rounded-lg px-6 py-12 lg:px-10 lg:py-12 flex flex-col gap-8 items-center">
          <h2 className="text-2xl font-medium text-[var(--t-foreground)] w-full">Detalles</h2>
          <p className="text-sm font-medium text-[var(--t-muted)] leading-6 w-full">
            Así como un libro se juzga por su portada, lo primero que notás al tomar un smartphone moderno es la pantalla. Nada sorprendente, porque las tecnologías avanzadas permiten prácticamente eliminar los marcos y los recortes para la cámara frontal y el altavoz.
          </p>

          {/* Specs table */}
          <div className="w-full flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-medium text-[var(--t-foreground)]">Pantalla</h3>
              <div className="flex flex-col gap-6">
                {[
                  ["Diagonal de pantalla", '6.7"'],
                  ["Resolución de pantalla", "2796x1290"],
                  ["Frecuencia de actualización", "120 Hz"],
                  ["Densidad de píxeles", "460 ppi"],
                  ["Tipo de pantalla", "OLED"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between pb-2 border-b border-[var(--t-border)]/50">
                    <span className="text-base text-[var(--t-foreground)]">{label}</span>
                    <span className="text-[15px] text-[var(--t-foreground)]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-medium text-[var(--t-foreground)]">CPU</h3>
              <div className="flex flex-col gap-6">
                {[
                  ["CPU", "A16 Bionic"],
                  ["Número de núcleos", "6"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between pb-2 border-b border-[var(--t-border)]/50">
                    <span className="text-base text-[var(--t-foreground)]">{label}</span>
                    <span className="text-[15px] text-[var(--t-foreground)]">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            className="flex items-center gap-2 px-14 py-3 rounded-lg border border-[var(--t-muted)] bg-[var(--t-background)] text-sm font-medium text-[var(--t-foreground)] cursor-pointer hover:opacity-80 transition-colors"
          >
            Ver más
            <ChevronDown className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* ── Product Detail Tabs ── */}
      {productDetailTabs.length > 0 && (
        <section aria-label="Información del producto" className="px-4 py-6 lg:px-[160px] lg:py-10">
          <ProductTabs tabs={productDetailTabs.map(({ label, content }) => ({ label, content }))} />
        </section>
      )}

      {/* ── Related Products ── */}
      {relatedProducts.length > 0 && (
        <section aria-label="Productos relacionados" className="px-4 py-10 lg:px-[160px] lg:py-20 flex flex-col gap-8">
          <h2 className="text-2xl font-medium text-[var(--t-foreground)]">Productos relacionados</h2>
          <div className={`grid ${gridColsClass(grid.products.mobile, grid.products.desktop)} gap-4`}>
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                currencySymbol={currencySymbol}
                onClick={() => onProductClick?.(p.id)}
                onAddToCart={() => onAddToCartProduct?.(p.id)}
              />
            ))}
          </div>
        </section>
      )}

      </main>

      {/* Footer */}
      <Footer store={store} services={footerServices} assistance={footerAssistance} />

      {/* Bottom nav — mobile */}
      <BottomNav
        activeTab={activeTab}
        cartItemCount={cartItemCount}
        onTabChange={onTabChange}
      />

      {/* Spacer for bottom nav */}
      <div className="h-16 lg:hidden" />
    </div>
  );
}
