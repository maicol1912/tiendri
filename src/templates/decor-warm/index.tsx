// Decor Warm Template — Entry Point
// Default export for templateRegistry compatibility.
// Live app renders HomeShell (and *ShellRoute variants) directly via sub-routes.

import { HomeShell } from "./components/HomeShell";
import {
  mockStore,
  mockCategoryIcons,
  mockCategories,
  mockProducts,
  mockPromoSlides,
  mockBestSellers,
} from "./mock/data";

export default function DecorWarmTemplate() {
  return (
    <HomeShell
      store={mockStore}
      categoryIcons={mockCategoryIcons}
      categories={mockCategories}
      products={mockProducts}
      promoSlides={mockPromoSlides}
      bestSellers={mockBestSellers}
    />
  );
}

// Named component exports
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
export { StoreInfoPage } from "@/templates/_shared/StoreInfoPage";
export { StoreInfoShellRoute } from "./components/StoreInfoShellRoute";
export { CartProvider, useCart } from "@/lib/cart";
export type {
  StorefrontProduct,
  Category,
  DecorWarmCategoryIcon,
  DecorWarmPromoSlide,
  DecorWarmBestSeller,
  DecorWarmNavTab,
} from "./types";
export { decorWarmConfig } from "./config";
export type { DecorWarmConfig } from "./config";
