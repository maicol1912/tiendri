// Fashion Template — Entry Point
// Default export: HomeShell (for templateRegistry compatibility).
// Named exports: all page components, shell components, context, hooks, types.

// ── Shell components (default + named exports) ────────────────────────────────
export { HomeShell } from "./components/HomeShell";
export { ProductDetailShellRoute } from "./components/ProductDetailShellRoute";
export { ListingShellRoute } from "./components/ListingShellRoute";
export { CartShellRoute } from "./components/CartShellRoute";
export { CheckoutShellRoute } from "./components/CheckoutShellRoute";
export { SearchShellRoute } from "./components/SearchShellRoute";
export { StoreInfoPage } from "./components/StoreInfoPage";
export { StoreInfoShellRoute } from "./components/StoreInfoShellRoute";

// ── Page components (presentational) ─────────────────────────────────────────
export { HomePage } from "./components/HomePage";
export { ProductListingPage } from "./components/ProductListingPage";
export { ProductDetailPage } from "./components/ProductDetailPage";
export { CartPage } from "./components/CartPage";
export { CheckoutPage } from "./components/CheckoutPage";
export { SearchPage } from "./components/SearchPage";

// ── Core UI components ────────────────────────────────────────────────────────
export { Header } from "./components/Header";
export { Footer } from "./components/Footer";
export { BottomNav } from "./components/BottomNav";
export { SearchBar } from "./components/SearchBar";
export { ProductCard } from "./components/ProductCard";
export { HeroBanner } from "./components/HeroBanner";
export { EditorialSection } from "./components/EditorialSection";
export { CollectionSection } from "./components/CollectionSection";
export { ColorSwatch } from "./components/ColorSwatch";
export { SizeSelector } from "./components/SizeSelector";
export { FilterSidebar } from "./components/FilterSidebar";

// ── Context + hooks ───────────────────────────────────────────────────────────
export { CartProvider, useCart } from "./context/CartContext";
export { useTemplateNav } from "./hooks/useTemplateNav";

// ── Types ─────────────────────────────────────────────────────────────────────
export type {
  StoreInfo,
  Category,
  StorefrontProduct,
  CartItem,
  PopularProduct,
  NavTab,
  CurrentPage,
  SortOption,
  TemplateMode,
  FilterGroup,
  FilterOption,
  HomeSectionConfig,
  CheckoutFormData,
} from "./types";

// ── Config, palettes, and schema ──────────────────────────────────────────────
export { fashionConfig } from "./config";
export type { FashionConfig } from "./config";
export { fashionPalettes } from "./palettes";
export { fashionConfigSchema } from "./config-schema";

// ── Default export (templateRegistry compatibility) ───────────────────────────
// Re-exports HomeShell as the default so templateRegistry can render the template
// by slug without knowing about the shell/route split.
export { HomeShell as default } from "./components/HomeShell";
