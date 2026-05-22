// Tech Premium Template — Entry Point
// Default export kept for templateRegistry compatibility.
// The live app renders HomeShell (and *ShellRoute variants) directly via sub-routes.

import { HomeShell } from "./components/HomeShell";
import {
  mockStore,
  mockCategories,
  mockProducts,
  mockDiscountProducts,
  mockPopularProducts,
  mockHeroBanner,
  mockBannerGrid,
  mockSummerSaleBanner,
} from "./mock/data";

export default function TechPremiumTemplate() {
  return (
    <HomeShell
      store={mockStore}
      categories={mockCategories}
      products={mockProducts}
      discountProducts={mockDiscountProducts}
      popularProducts={mockPopularProducts}
      heroBanner={mockHeroBanner}
      bannerGrid={mockBannerGrid}
      summerSaleBanner={mockSummerSaleBanner}
    />
  );
}

// Named exports for direct component access
export { HomeShell } from "./components/HomeShell";
export { HomePage } from "./components/HomePage";
export { ProductDetailPage } from "./components/ProductDetailPage";
export { ProductDetailShellRoute } from "./components/ProductDetailShellRoute";
export { ProductListingPage } from "./components/ProductListingPage";
export { ListingShellRoute } from "./components/ListingShellRoute";
export { CartPage } from "./components/CartPage";
export { CartShellRoute } from "./components/CartShellRoute";
export { SearchPage } from "./components/SearchPage";
export { SearchShellRoute } from "./components/SearchShellRoute";
export { CheckoutPage } from "./components/CheckoutPage";
export { CheckoutShellRoute } from "./components/CheckoutShellRoute";
export { FilterSidebar } from "./components/FilterSidebar";
export { CartProvider, useCart } from "./context/CartContext";
export type {
  StoreInfo,
  Category,
  StorefrontProduct,
  CartItem,
  PopularProduct,
  NavTab,
  ProductTab,
  TemplateMode,
  CurrentPage,
  FilterGroup,
  FilterOption,
  SpecBadge,
  ReviewData,
  RatingDistribution,
  CheckoutFormData,
} from "./types";
