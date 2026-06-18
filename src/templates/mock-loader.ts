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

import type { StoreInfo, StorefrontProduct, Category } from "@/types/store";
import type { BestSellerItem } from "@/templates/_core/sections/BestSellersSection";

export interface TemplateMockData {
  store: StoreInfo;
  products: StorefrontProduct[];
  categories: Category[];
  /** Lista de productos más vendidos — solo disponible para templates que la definen. */
  bestSellers?: BestSellerItem[];
}

// ── Adaptador de categorías ────────────────────────────────────────────────────
// Algunos templates definen tipos locales de categoría que omiten campos
// requeridos por el tipo canónico Category (slug, icon).
// Esta función normaliza cualquier array de categorías al contrato canónico
// derivando slug desde id y usando "Tag" como icono por defecto.

function normalizeCategories(raw: unknown[]): Category[] {
  return (raw as Array<Record<string, unknown>>).map((cat) => ({
    id: cat["id"] as string,
    name: cat["name"] as string,
    slug: (cat["slug"] as string | undefined) ?? (cat["id"] as string),
    icon: (cat["icon"] as string | undefined) ?? "Tag",
    // Support both `image` (canonical) and `imageUrl` (legacy mock field)
    ...((cat["image"] ?? cat["imageUrl"]) !== undefined
      ? { image: (cat["image"] ?? cat["imageUrl"]) as string }
      : {}),
    ...(cat["productCount"] !== undefined ? { productCount: cat["productCount"] as number } : {}),
  }));
}

/**
 * Carga los datos mock para el templateId dado.
 * Usa dynamic import para code-splitting — cada template solo se carga cuando
 * se necesita.
 *
 * @param templateId - Identificador del template (ej. "tech-premium")
 */
export async function getTemplateMockData(
  templateId: string
): Promise<TemplateMockData> {
  switch (templateId) {
    case "tech-premium": {
      const { mockStore, mockProducts, mockCategories } = await import(
        "./tech-premium/mock/data"
      );
      return {
        store: mockStore,
        products: mockProducts,
        categories: mockCategories,
      };
    }
    case "fashion": {
      const { mockStore, mockProducts, mockCategories } = await import(
        "./fashion/mock/data"
      );
      return {
        store: mockStore,
        products: mockProducts,
        categories: mockCategories,
      };
    }
    case "furniture-dark": {
      const { mockStore, mockProducts, mockCategories } = await import(
        "./furniture-dark/mock/data"
      );
      return {
        store: mockStore,
        products: mockProducts,
        categories: mockCategories,
      };
    }
    case "furniture-light": {
      const { mockStore, mockProducts, mockCategories } = await import(
        "./furniture-light/mock/data"
      );
      return {
        store: mockStore,
        products: mockProducts,
        // FurnitureCategory omite `slug` — normalizar al tipo canónico
        categories: normalizeCategories(mockCategories),
      };
    }
    case "beauty-soft": {
      const { mockStore, mockProducts, mockCategories } = await import(
        "./beauty-soft/mock/data"
      );
      return {
        store: mockStore,
        products: mockProducts,
        // BeautySoftCategory omite `slug` e `icon` — normalizar al tipo canónico
        categories: normalizeCategories(mockCategories),
      };
    }
    case "beauty-elegant": {
      const { mockStore, mockProducts, mockCategories } = await import(
        "./beauty-elegant/mock/data"
      );
      return {
        store: mockStore,
        products: mockProducts,
        // BeautyElegantCategory omite `slug` e `icon` — normalizar al tipo canónico
        categories: normalizeCategories(mockCategories),
      };
    }
    case "decor-warm": {
      const { mockStore, mockProducts, mockCategories, mockBestSellers } = await import(
        "./decor-warm/mock/data"
      );
      return {
        store: mockStore,
        products: mockProducts,
        categories: mockCategories,
        bestSellers: mockBestSellers,
      };
    }
    case "food-night": {
      const { mockStore, mockProducts, mockCategories } = await import(
        "./food-night/mock/data"
      );
      return {
        store: mockStore,
        products: mockProducts,
        categories: mockCategories,
      };
    }
    default: {
      // Fallback a tech-premium para IDs desconocidos
      const { mockStore, mockProducts, mockCategories } = await import(
        "./tech-premium/mock/data"
      );
      return {
        store: mockStore,
        products: mockProducts,
        categories: mockCategories,
      };
    }
  }
}
