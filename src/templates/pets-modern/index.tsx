// Pets Modern Template — Entry Point
// Default export for templateRegistry compatibility.
// The live app renders HomeShell (and *ShellRoute variants) directly via sub-routes.

import { HomeShell } from "./components/HomeShell";
import {
  mockStore,
  mockPromoBanner,
  mockTrendingItems,
  mockPetTypes,
  mockProducts,
} from "./mock/data";

export default function PetsModernTemplate() {
  return (
    <HomeShell
      store={mockStore}
      promoBanner={mockPromoBanner}
      trendingItems={mockTrendingItems}
      petTypes={mockPetTypes}
      products={mockProducts}
    />
  );
}

// Named exports for direct component access
export { HomeShell } from "./components/HomeShell";
export { HomePage } from "./components/HomePage";
export { ProductDetailPage } from "./components/ProductDetailPage";
export { ProductDetailShellRoute } from "./components/ProductDetailShellRoute";
export { ExplorePage } from "./components/ExplorePage";
export { ExploreShellRoute } from "./components/ExploreShellRoute";
export { CartPage } from "./components/CartPage";
export { CartShellRoute } from "./components/CartShellRoute";
export { SearchPage } from "./components/SearchPage";
export { SearchShellRoute } from "./components/SearchShellRoute";
export { CheckoutPage } from "./components/CheckoutPage";
export { CheckoutShellRoute } from "./components/CheckoutShellRoute";
export { ProductListingPage } from "./components/ProductListingPage";
export { ListingShellRoute } from "./components/ListingShellRoute";
export { CartProvider, useCart } from "./context/CartContext";
export type {
  StoreInfo,
  StorefrontProduct,
  CartItem,
  NavTab,
  PetType,
  PetCategory,
  TrendingItem,
  PromoBannerData,
  PetFilter,
  CheckoutFormData,
} from "./types";
