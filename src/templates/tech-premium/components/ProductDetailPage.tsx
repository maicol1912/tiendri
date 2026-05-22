// Tech Premium Template — Product Detail Page
// Figma desktop: 120:683 | mobile: 2619:1842
// 2-col layout (desktop): image gallery left, product info right.
// Mobile: stacked — main image + horizontal thumbs, info below.
// Visual only — handlers come as props.

import Image from "next/image";
import { ChevronRight, ChevronDown, Truck, Store, ShieldCheck, Star } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { ProductCard } from "./ProductCard";
import { gridColsClass } from "../utils/grid-classes";
import type { TechPremiumConfig } from "../config";
import type {
  StoreInfo,
  StorefrontProduct,
  NavTab,
  SpecBadge,
  ReviewData,
  RatingDistribution,
} from "../types";

interface ProductDetailPageProps {
  store: StoreInfo;
  product: StorefrontProduct;
  navLinks: readonly { label: string; href: string }[];
  footerServices: readonly string[];
  footerAssistance: readonly string[];
  grid: TechPremiumConfig["grid"];
  relatedProducts?: StorefrontProduct[];
  specBadges?: SpecBadge[];
  reviews?: ReviewData[];
  overallRating?: number;
  totalReviews?: number;
  ratingDistribution?: RatingDistribution[];
  activeTab?: NavTab;
  cartItemCount?: number;
  currencySymbol?: string;
  selectedImageIndex?: number;
  selectedStorage?: string;
  selectedColor?: number;
  isWishlisted?: boolean;
  onBack?: () => void;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onWishlistToggle?: () => void;
  onAddToCart?: () => void;
  onImageSelect?: (index: number) => void;
  onStorageSelect?: (storage: string) => void;
  onColorSelect?: (index: number) => void;
  onProductClick?: (productId: string) => void;
  onWishlistToggleProduct?: (productId: string) => void;
  onAddToCartProduct?: (productId: string) => void;
  onTabChange?: (tab: NavTab) => void;
  onNavLinkClick?: (href: string) => void;
}

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${
            star <= Math.floor(rating)
              ? "fill-[var(--t-rating-star)] text-[var(--t-rating-star)]"
              : star - 0.5 <= rating
                ? "fill-[var(--t-rating-star)]/50 text-[var(--t-rating-star)]"
                : "fill-none text-[var(--t-rating-bar-bg)]"
          }`}
          style={{ width: size, height: size }}
        />
      ))}
    </div>
  );
}

export function ProductDetailPage({
  store,
  product,
  navLinks,
  footerServices,
  footerAssistance,
  grid,
  relatedProducts = [],
  specBadges = [],
  reviews = [],
  overallRating = 4.8,
  totalReviews = 125,
  ratingDistribution = [
    { label: "Excelente", count: 100, percentage: 80 },
    { label: "Bueno", count: 11, percentage: 40 },
    { label: "Regular", count: 3, percentage: 15 },
    { label: "Por debajo del promedio", count: 8, percentage: 35 },
    { label: "Malo", count: 1, percentage: 7 },
  ],
  activeTab = "home",
  cartItemCount = 0,
  currencySymbol = "$",
  selectedImageIndex = 0,
  selectedStorage,
  selectedColor = 0,
  isWishlisted = false,
  onBack,
  onSearchClick,
  onCartClick,
  onWishlistToggle,
  onAddToCart,
  onImageSelect,
  onStorageSelect,
  onColorSelect,
  onProductClick,
  onWishlistToggleProduct,
  onAddToCartProduct,
  onTabChange,
  onNavLinkClick,
}: ProductDetailPageProps) {
  const images = product.images;
  const mainImage = images[selectedImageIndex]?.url ?? "/placeholder.png";

  const defaultColors = ["#1E1E1E", "#C5A880", "#D4C5A9", "#4A4A6A", "#2E4057"];
  const colors = product.colors ?? defaultColors;

  const defaultStorageOptions = ["128GB", "256GB", "512GB", "1TB"];
  const storageOptions = product.storageOptions ?? defaultStorageOptions;
  const activeStorage = selectedStorage ?? storageOptions[storageOptions.length - 1];

  const formattedPrice = `${currencySymbol}${new Intl.NumberFormat("en-US").format(product.price)}`;
  const formattedOriginalPrice = product.originalPrice
    ? `${currencySymbol}${new Intl.NumberFormat("en-US").format(product.originalPrice)}`
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
    <div className="bg-white min-h-screen font-['Inter',sans-serif] flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Header */}
      <Header
        store={store}
        navLinks={navLinks}
        cartItemCount={cartItemCount}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
        onNavLinkClick={onNavLinkClick}
      />

      {/* Breadcrumbs — desktop only */}
      <nav aria-label="Ruta de navegación" className="hidden lg:flex items-center gap-4 px-[160px] py-10">
        <button type="button" onClick={onBack} className="text-[var(--t-text-breadcrumb)] text-base font-medium bg-transparent border-none cursor-pointer p-0">
          Inicio
        </button>
        <ChevronRight className="w-4 h-4 text-[var(--t-text-breadcrumb)]" aria-hidden="true" />
        <span className="text-[var(--t-text-breadcrumb)] text-base font-medium">Catálogo</span>
        <ChevronRight className="w-4 h-4 text-[var(--t-text-breadcrumb)]" aria-hidden="true" />
        <span className="text-[var(--t-text-breadcrumb)] text-base font-medium">Smartphones</span>
        <ChevronRight className="w-4 h-4 text-[var(--t-text-breadcrumb)]" aria-hidden="true" />
        <span className="text-black text-base font-medium truncate max-w-[200px]">
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
              <h1 className="text-[40px] font-bold leading-[40px] text-black m-0">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-[32px] font-medium text-black tracking-[0.96px]">
                  {formattedPrice}
                </span>
                {formattedOriginalPrice && (
                  <span className="text-2xl text-[var(--t-text-breadcrumb)] tracking-[0.72px] line-through">
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
                        idx === selectedColor ? "ring-2 ring-black ring-offset-2" : ""
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
                        ? "border border-black text-black bg-white"
                        : "border border-[var(--t-border-mid)] text-[var(--t-text-muted)] bg-white hover:border-[var(--t-border)]"
                    }`}
                    onClick={() => onStorageSelect?.(opt)}
                    aria-pressed={activeStorage === opt}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {/* Spec badges */}
              {specBadges.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {specBadges.map((spec) => (
                    <div key={spec.label} className="flex-1 min-w-[168px] bg-[var(--t-spec-badge-bg)] rounded-[7px] px-2 py-4 flex items-center gap-2">
                      <div className="flex flex-col min-w-0">
                        <span className="text-[14px] text-[var(--t-text-muted)] leading-4">{spec.label}</span>
                        <span className="text-[14px] font-medium text-[var(--t-text-subtle)] leading-4">{spec.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Description */}
              {product.description && (
                <p className="text-sm text-[var(--t-text-secondary)] leading-6 tracking-[0.42px]">
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
              className="flex-1 min-w-[136px] px-14 py-4 rounded-[6px] border border-black bg-white text-black text-base font-medium text-center cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={onWishlistToggle}
            >
              {isWishlisted ? "Quitar de favoritos" : "Agregar a favoritos"}
            </button>
            <button
              type="button"
              className="flex-1 min-w-[136px] px-14 py-4 rounded-[6px] border-none bg-[var(--t-button-bg)] text-[var(--t-button-text)] text-base font-medium text-center cursor-pointer hover:opacity-90 transition-colors disabled:opacity-50"
              onClick={onAddToCart}
              disabled={!product.inStock}
            >
              {product.inStock ? "Agregar al carrito" : "Agotado"}
            </button>
          </div>

          {/* Feature icons */}
          <div className="flex gap-8">
            <div className="flex flex-1 items-center gap-4 rounded-lg">
              <div className="bg-[var(--t-card-bg)] rounded-[11px] p-4 shrink-0">
                <Truck className="w-6 h-6 text-black" aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-[var(--t-text-muted)]">Envío gratis</span>
                <span className="text-sm font-medium text-black">1-2 días</span>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-4 rounded-lg">
              <div className="bg-[var(--t-card-bg)] rounded-[11px] p-4 shrink-0">
                <Store className="w-6 h-6 text-black" aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-[var(--t-text-muted)]">Disponible</span>
                <span className="text-sm font-medium text-black">Hoy</span>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-4 rounded-lg">
              <div className="bg-[var(--t-card-bg)] rounded-[11px] p-4 shrink-0">
                <ShieldCheck className="w-6 h-6 text-black" aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-[var(--t-text-muted)]">Garantía</span>
                <span className="text-sm font-medium text-black">1 año</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile: Product info ── */}
      <div className="lg:hidden flex flex-col gap-8 px-4 pt-8 pb-4">
        {/* Title + Price */}
        <div className="flex flex-col gap-6">
          <h1 className="text-[40px] font-bold leading-[40px] text-black m-0">{product.name}</h1>
          <div className="flex items-center gap-4">
            <span className="text-[32px] font-medium text-black tracking-[0.96px]">
              {formattedPrice}
            </span>
            {formattedOriginalPrice && (
              <span className="text-2xl text-[var(--t-text-breadcrumb)] tracking-[0.72px] line-through">
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
                  idx === selectedColor ? "ring-2 ring-black ring-offset-2" : ""
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
                  ? "border border-black text-black bg-white"
                  : "border border-[var(--t-border-mid)] text-[var(--t-text-muted)] bg-white"
              }`}
              onClick={() => onStorageSelect?.(opt)}
              aria-pressed={activeStorage === opt}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Spec badges - mobile */}
        {specBadges.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {specBadges.map((spec) => (
              <div key={spec.label} className="flex-1 min-w-[160px] bg-[var(--t-spec-badge-bg)] rounded-[7px] px-2 py-4 flex items-center gap-2">
                <div className="flex flex-col min-w-0">
                  <span className="text-[14px] text-[var(--t-text-muted)] leading-4">{spec.label}</span>
                  <span className="text-[14px] font-medium text-[var(--t-text-subtle)] leading-4">{spec.value}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Description */}
        {product.description && (
          <p className="text-sm text-[var(--t-text-secondary)] leading-6 tracking-[0.42px]">
            {product.description}{" "}
            <span className="text-[var(--t-primary)] underline cursor-pointer">ver más...</span>
          </p>
        )}

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button
            type="button"
            className="w-full px-14 py-4 rounded-[6px] border border-black bg-white text-black text-base font-medium text-center cursor-pointer"
            onClick={onWishlistToggle}
          >
            {isWishlisted ? "Quitar de favoritos" : "Agregar a favoritos"}
          </button>
          <button
            type="button"
            className="w-full px-14 py-4 rounded-[6px] border-none bg-[var(--t-button-bg)] text-[var(--t-button-text)] text-base font-medium text-center cursor-pointer disabled:opacity-50"
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
              <div className="bg-[var(--t-card-bg)] rounded-[11px] p-4">
                <Icon className="w-6 h-6 text-black" aria-hidden="true" />
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-sm font-medium text-[var(--t-text-muted)]">{label}</span>
                <span className="text-sm font-medium text-black">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Details Section ── */}
      <section aria-label="Detalles del producto" className="bg-[var(--t-background)] px-4 py-10 lg:px-[160px] lg:py-20">
        <div className="bg-white rounded-lg px-6 py-12 lg:px-10 lg:py-12 flex flex-col gap-8 items-center">
          <h2 className="text-2xl font-medium text-black w-full">Detalles</h2>
          <p className="text-sm font-medium text-[var(--t-text-muted)] leading-6 w-full">
            Así como un libro se juzga por su portada, lo primero que notás al tomar un smartphone moderno es la pantalla. Nada sorprendente, porque las tecnologías avanzadas permiten prácticamente eliminar los marcos y los recortes para la cámara frontal y el altavoz.
          </p>

          {/* Specs table */}
          <div className="w-full flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-medium text-black">Pantalla</h3>
              <div className="flex flex-col gap-6">
                {[
                  ["Diagonal de pantalla", '6.7"'],
                  ["Resolución de pantalla", "2796x1290"],
                  ["Frecuencia de actualización", "120 Hz"],
                  ["Densidad de píxeles", "460 ppi"],
                  ["Tipo de pantalla", "OLED"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between pb-2 border-b border-[var(--t-border-mid)]/50">
                    <span className="text-base text-black">{label}</span>
                    <span className="text-[15px] text-black">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-medium text-black">CPU</h3>
              <div className="flex flex-col gap-6">
                {[
                  ["CPU", "A16 Bionic"],
                  ["Número de núcleos", "6"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between pb-2 border-b border-[var(--t-border-mid)]/50">
                    <span className="text-base text-black">{label}</span>
                    <span className="text-[15px] text-black">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            className="flex items-center gap-2 px-14 py-3 rounded-lg border border-[var(--t-text-subtle)] bg-white text-sm font-medium text-black cursor-pointer hover:bg-gray-50 transition-colors"
          >
            Ver más
            <ChevronDown className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* ── Reviews Section ── */}
      <section aria-label="Reseñas de clientes" className="px-4 py-10 lg:px-[160px] lg:py-[88px] flex flex-col gap-8 items-center">
        <div className="w-full flex flex-col gap-12">
          <h2 className="text-2xl font-medium text-black">Reseñas</h2>

          {/* Overall rating + bar chart */}
          <div className="flex flex-wrap gap-[60px] items-center">
            {/* Rating card */}
            <div className="bg-[var(--t-background)] rounded-[25px] p-8 flex flex-col lg:flex-row gap-4 items-center flex-1 min-w-[260px] lg:min-w-0 lg:flex-none lg:w-auto">
              <div className="flex flex-col items-center gap-4 flex-1">
                <span className="text-[56px] font-medium text-black leading-[56px]">{overallRating}</span>
                <span className="text-[15px] font-medium text-black/30">de {totalReviews} reseñas</span>
              </div>
              <StarRating rating={overallRating} size={24} />
            </div>

            {/* Bar chart */}
            <div className="flex flex-col gap-6 flex-1 min-w-[302px]">
              {ratingDistribution.map(({ label, count, percentage }) => (
                <div key={label} className="flex items-center gap-4">
                  <span className="text-lg font-medium text-black w-[116px] lg:w-[150px] shrink-0">{label}</span>
                  <div className="flex-1 flex items-center">
                    <div className="bg-[var(--t-rating-bar-bg)] rounded-2xl w-full h-[5px] overflow-hidden">
                      <div
                        className="bg-[var(--t-rating-star)] h-full rounded-2xl"
                        style={{ width: `${percentage}%` }}
                        role="progressbar"
                        aria-valuenow={percentage}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                  <span className="text-base font-medium text-black/40 text-right w-[30px]">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Comment input */}
          <div className="w-full border border-[var(--t-border-mid)]/50 rounded-[7px] px-4 py-6">
            <span className="text-sm text-[var(--t-text-muted)] tracking-[-0.07px]">Dejar un comentario</span>
          </div>
        </div>

        {/* Review cards */}
        <div className="w-full flex flex-col gap-6">
          {reviews.map((review) => (
            <article key={review.id} className="bg-[var(--t-background)] rounded-[10px] flex gap-[19px] items-start pl-4 pr-7 py-6">
              <div className="flex flex-col gap-2 flex-1 min-w-0">
                <div className="flex flex-col gap-2">
                  <div className="flex items-start justify-between">
                    <span className="text-[17px] font-bold text-black">{review.author}</span>
                    <span className="text-sm font-medium text-black/20 text-right">{review.date}</span>
                  </div>
                  <StarRating rating={review.rating} size={16} />
                </div>
                <p className="text-[15px] font-medium text-[var(--t-text-muted)] leading-6">{review.text}</p>
                {review.images && review.images.length > 0 && (
                  <div className="flex gap-2 mt-1">
                    {review.images.map((img, idx) => (
                      <div key={img} className="relative w-[118px] h-[88px] rounded-[6px] overflow-hidden">
                        <Image src={img} alt={`Imagen de reseña ${idx + 1}`} fill className="object-cover" sizes="118px" loading="lazy" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {reviews.length > 0 && (
          <button
            type="button"
            className="flex items-center gap-2 px-14 py-3 rounded-lg border border-[var(--t-text-subtle)] bg-white text-sm font-medium text-black cursor-pointer hover:bg-gray-50 transition-colors"
          >
            Ver más
            <ChevronDown className="w-6 h-6" aria-hidden="true" />
          </button>
        )}
      </section>

      {/* ── Related Products ── */}
      {relatedProducts.length > 0 && (
        <section aria-label="Productos relacionados" className="px-4 py-10 lg:px-[160px] lg:py-20 flex flex-col gap-8">
          <h2 className="text-2xl font-medium text-black">Productos relacionados</h2>
          <div className={`grid ${gridColsClass(grid.products.mobile, grid.products.desktop)} gap-4`}>
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                currencySymbol={currencySymbol}
                onClick={() => onProductClick?.(p.id)}
                onWishlistToggle={() => onWishlistToggleProduct?.(p.id)}
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
