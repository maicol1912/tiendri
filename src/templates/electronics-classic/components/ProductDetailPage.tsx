// Electronics Classic — Product Detail Page (Presentational)
// Gallery + Info + Features + Reviews + Related products.
// All colors via var(--t-*). ZERO hardcoded hex.

import type {
  StorefrontProduct,
  ProductAbout,
  FeatureShowcase,
  ProductFeature,
  ProductReview,
} from "../types";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { ImageGallery } from "./ImageGallery";
import { ProductInfo } from "./ProductInfo";
import { ProductFeatures } from "./ProductFeatures";
import { ProductReviews } from "./ProductReviews";
import { ProductSection } from "./ProductSection";
import type { StorefrontStore } from "../types";

type ActiveTab = "description" | "reviews";

interface ProductDetailPageProps {
  store: StorefrontStore;
  product: StorefrontProduct;
  keyFeatures: string[];
  about: ProductAbout;
  showcase: FeatureShowcase;
  productFeatures: ProductFeature[];
  featuresDescription?: string;
  reviews: ProductReview[];
  relatedProducts: StorefrontProduct[];
  cartCount: number;
  quantity: number;
  activeTab: ActiveTab;
  activeImageIndex: number;
  layout?: {
    tabStyle?: string;
    cardStyle?: string;
    cardHoverEffect?: string;
    cardImageRatio?: string;
    headerStyle?: string;
    footerStyle?: string;
  };
  grid?: {
    products?: { mobile: number; desktop: number };
  };
  currencySymbol?: string;
  onNavigate?: (path: string) => void;
  onSearchSubmit?: (query: string) => void;
  onCartClick?: () => void;
  onQuantityChange: (qty: number) => void;
  onAddToCart: () => void;
  onViewCart: () => void;
  onTabChange: (tab: ActiveTab) => void;
  onImageIndexChange: (index: number) => void;
  onProductClick?: (productId: string) => void;
  onSubmitReview?: (review: Omit<ProductReview, "id" | "date">) => void;
}

export function ProductDetailPage({
  store,
  product,
  keyFeatures,
  about,
  showcase,
  productFeatures,
  featuresDescription,
  reviews,
  relatedProducts,
  cartCount,
  quantity,
  activeTab,
  activeImageIndex,
  layout,
  grid,
  currencySymbol = "$",
  onNavigate,
  onSearchSubmit,
  onCartClick,
  onQuantityChange,
  onAddToCart,
  onViewCart,
  onTabChange,
  onImageIndexChange,
  onProductClick,
  onSubmitReview,
}: ProductDetailPageProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--t-background)" }}>
      <Header
        store={store}
        cartCount={cartCount}
        layout={layout}
        onNavigate={onNavigate}
        onSearchSubmit={onSearchSubmit}
        onCartClick={onCartClick}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-24 md:pb-12">
        {/* Breadcrumb */}
        <nav className="py-4 text-xs" aria-label="Migas de pan">
          <ol className="flex items-center gap-1 flex-wrap">
            <li>
              <button
                onClick={() => onNavigate?.("/template/electronics-classic")}
                className="hover:underline"
                style={{ color: "var(--t-text-breadcrumb, var(--t-text-muted))" }}
              >
                Inicio
              </button>
            </li>
            <li aria-hidden="true" style={{ color: "var(--t-text-muted)" }}>/</li>
            <li>
              <button
                onClick={() => onNavigate?.("/template/electronics-classic/catalogo")}
                className="hover:underline"
                style={{ color: "var(--t-text-breadcrumb, var(--t-text-muted))" }}
              >
                Catálogo
              </button>
            </li>
            {product.category && (
              <>
                <li aria-hidden="true" style={{ color: "var(--t-text-muted)" }}>/</li>
                <li style={{ color: "var(--t-text-muted)" }}>{product.category}</li>
              </>
            )}
            <li aria-hidden="true" style={{ color: "var(--t-text-muted)" }}>/</li>
            <li
              className="truncate max-w-[200px]"
              style={{ color: "var(--t-text-primary)" }}
              aria-current="page"
            >
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Main product layout */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-2">
          <ImageGallery
            images={product.images}
            productName={product.name}
            activeIndex={activeImageIndex}
            onIndexChange={onImageIndexChange}
          />
          <ProductInfo
            product={product}
            keyFeatures={keyFeatures}
            quantity={quantity}
            currencySymbol={currencySymbol}
            onQuantityChange={onQuantityChange}
            onAddToCart={onAddToCart}
            onViewCart={onViewCart}
          />
        </div>

        {/* Features section */}
        <div className="mt-12 md:mt-16">
          <ProductFeatures
            description={product.description}
            keyFeatures={productFeatures}
            featuresDescription={featuresDescription}
            about={about}
            showcase={showcase}
            layout={layout}
            activeTab={activeTab}
            onTabChange={onTabChange}
          />
        </div>

        {/* Reviews section */}
        <div className="mt-12 md:mt-16">
          <ProductReviews
            reviews={reviews}
            productName={product.name}
            onSubmitReview={onSubmitReview}
          />
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12 md:mt-16">
            <ProductSection
              title="Productos relacionados"
              products={relatedProducts}
              grid={grid?.products ?? { mobile: 2, desktop: 4 }}
              layout={layout}
              currencySymbol={currencySymbol}
              onProductClick={onProductClick}
            />
          </div>
        )}
      </main>

      <Footer store={store} layout={layout} />
      <BottomNav cartCount={cartCount} onNavigate={onNavigate} />
    </div>
  );
}
