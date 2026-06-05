// Furniture Light — Template Entry Point

export { furnitureLightConfig } from "./config";
export type { FurnitureLightConfig } from "./config";
export { furnitureLightPalettes } from "./palettes";
export { furnitureLightConfigSchema } from "./config-schema";

export { HomeShell } from "./components/HomeShell";
export { ListingShellRoute } from "./components/ListingShellRoute";
export { CartShellRoute } from "./components/CartShellRoute";
export { CheckoutShellRoute } from "./components/CheckoutShellRoute";
export { SearchShellRoute } from "./components/SearchShellRoute";
export { ProductDetailShellRoute } from "./components/ProductDetailShellRoute";

export {
  mockStore as furnitureLightMockStore,
  mockCategories as furnitureLightMockCategories,
  mockProducts as furnitureLightMockProducts,
  mockDetailProduct as furnitureLightMockDetailProduct,
  mockHeroBanner as furnitureLightMockHeroBanner,
  mockStyleCards as furnitureLightMockStyleCards,
} from "./mock/data";
