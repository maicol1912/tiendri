// mock-loader.ts
// Carga dinámica de mock data por template.
// Devuelve el subconjunto canónico que usa TemplateLayout:
//   { store, products, categories }
//
// Todos los campos cumplen los tipos de @/types/store (StoreInfo,
// StorefrontProduct, Category) — sin tipos locales ni estructuras ad-hoc.
//
// Por ahora es estático (mock). En fases futuras este módulo será el punto
// de integración con Supabase para cargar datos reales por slug.

import type { StoreInfo, StorefrontProduct, Category } from "@/types/domain/store";
import type { BestSellerItem } from "@/templates/_core/sections/BestSellersSection";
import { DEFAULT_TEMPLATE_ID } from "@/shared/constants";

/** Shape de un ítem de productos populares (banner card con imagen y CTA). */
export interface PopularProductItem {
  id: string;
  title: string;
  description: string;
  image: string;
  ctaText: string;
  bgColor: string;
}

export interface TemplateMockData {
  store: StoreInfo;
  products: StorefrontProduct[];
  categories: Category[];
  /** Lista de productos más vendidos — solo disponible para templates que la definen. */
  bestSellers?: BestSellerItem[];
  /** Productos populares — banner cards con imagen destacada y CTA. */
  popularProducts?: PopularProductItem[];
  /** Productos con descuento — misma forma que StorefrontProduct. */
  discountProducts?: StorefrontProduct[];
}

// ── Mapa de loaders por template ───────────────────────────────────────────────
// Para agregar un 9° template: añadir una entrada al mapa. No modificar nada más.

const MOCK_LOADERS: Record<string, () => Promise<TemplateMockData>> = {
  "tech-premium": async () => {
    const { mockStore, mockProducts, mockCategories, mockPopularProducts, mockDiscountProducts } =
      await import("./tech-premium/mock/data");
    return {
      store: mockStore,
      products: mockProducts,
      categories: mockCategories,
      popularProducts: mockPopularProducts,
      discountProducts: mockDiscountProducts,
    };
  },
  "fashion": async () => {
    const { mockStore, mockProducts, mockCategories } = await import("./fashion/mock/data");
    return {
      store: mockStore,
      products: mockProducts,
      categories: mockCategories,
    };
  },
  "furniture-dark": async () => {
    const { mockStore, mockProducts, mockCategories } = await import("./furniture-dark/mock/data");
    return {
      store: mockStore,
      products: mockProducts,
      categories: mockCategories,
    };
  },
  "furniture-light": async () => {
    const { mockStore, mockProducts, mockCategories } = await import("./furniture-light/mock/data");
    return {
      store: mockStore,
      products: mockProducts,
      categories: mockCategories,
    };
  },
  "beauty-soft": async () => {
    const { mockStore, mockProducts, mockCategories } = await import("./beauty-soft/mock/data");
    return {
      store: mockStore,
      products: mockProducts,
      categories: mockCategories,
    };
  },
  "beauty-elegant": async () => {
    const { mockStore, mockProducts, mockCategories } = await import(
      "./beauty-elegant/mock/data"
    );
    return {
      store: mockStore,
      products: mockProducts,
      categories: mockCategories,
    };
  },
  "decor-warm": async () => {
    const { mockStore, mockProducts, mockCategories, mockBestSellers } = await import(
      "./decor-warm/mock/data"
    );
    return {
      store: mockStore,
      products: mockProducts,
      categories: mockCategories,
      bestSellers: mockBestSellers,
    };
  },
  "food-night": async () => {
    const { mockStore, mockProducts, mockCategories } = await import("./food-night/mock/data");
    return {
      store: mockStore,
      products: mockProducts,
      categories: mockCategories,
    };
  },
};

/**
 * Carga los datos mock para el templateId dado.
 * Usa dynamic import para code-splitting — cada template solo se carga cuando
 * se necesita.
 *
 * @param templateId - Identificador del template (ej. "tech-premium")
 */
export async function getTemplateMockData(templateId: string): Promise<TemplateMockData> {
  const loader = MOCK_LOADERS[templateId] ?? MOCK_LOADERS[DEFAULT_TEMPLATE_ID];
  return loader();
}
