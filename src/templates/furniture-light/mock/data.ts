// Furniture Light — Mock Data
// All hardcoded data for preview/development.

import type { StorefrontProduct, StoreInfo } from "@/types/store";

// ── Local types ────────────────────────────────────────────────────────────────

export interface FurnitureCategory {
  id: string;
  name: string;
  /** Lucide icon key: "table" | "chair" | "cabinet" | "sofa" | "bed" | "kitchen" | "bathroom" | "workspace" */
  icon?: string;
  productCount?: number;
}
import { PRODUCTS, HERO_BANNER, CATEGORIES, STYLE_IMAGES } from "./assets";

// ── Store ──────────────────────────────────────────────────────────────────────

export const mockStore: StoreInfo = {
  name: "KASA",
  slug: "kasa-furniture",
  logo: null,
  whatsapp: "573001234567",
  hours: "Lun–Sáb 9am–6pm · Dom 10am–3pm",
  paymentMethods: ["Efectivo", "Nequi", "Daviplata", "Tarjeta", "Financiamiento disponible"],
  shippingInfo: "Envío gratis en pedidos mayores a $200.000. Entrega e instalación incluida en Bogotá.",
  social_links: {
    instagram: "@kasa.furniture",
    facebook: "kasafurniture",
  },
};

// ── Categories ─────────────────────────────────────────────────────────────────

export const mockCategories: FurnitureCategory[] = [
  { id: "cat-table", name: "Mesas", icon: "table", productCount: 12 },
  { id: "cat-chair", name: "Sillas", icon: "chair", productCount: 18 },
  { id: "cat-cabinet", name: "Gabinetes", icon: "cabinet", productCount: 9 },
  { id: "cat-sofa", name: "Sofás", icon: "sofa", productCount: 7 },
  { id: "cat-bed", name: "Camas", icon: "bed", productCount: 10 },
];

// ── Products ───────────────────────────────────────────────────────────────────

export const mockProducts: StorefrontProduct[] = [
  {
    id: "fl-1",
    name: "Livaro",
    slug: "livaro",
    price: 105,
    originalPrice: 150,
    images: [{ url: PRODUCTS.livaro, sort_order: 0 }, { url: PRODUCTS.farlov, sort_order: 1 }],
    inStock: true,
    description: "Mesa de comedor escandinava con acabado de madera cálida. Ideal para espacios modernos y acogedores. Soporta hasta 6 personas con comodidad.",
    inWishlist: false,
    categoryId: "cat-table",
    rating: 4.4,
    colors: [
      { id: "roble-natural", label: "Roble natural", hex: "#A0765A" },
      { id: "roble-oscuro", label: "Roble oscuro", hex: "#6B4F3E" },
      { id: "roble-claro", label: "Roble claro", hex: "#D4B896" },
    ],
  },
  {
    id: "fl-2",
    name: "Sodra",
    slug: "sodra",
    price: 250,
    originalPrice: null,
    images: [{ url: PRODUCTS.sodra, sort_order: 0 }],
    inStock: true,
    description: "Silla tapizada con diseño wingback. Tapicería en terciopelo verde con detalles de madera.",
    inWishlist: false,
    categoryId: "cat-chair",
    rating: 4.5,
    colors: [
      { id: "verde-celery", label: "Verde celery", hex: "#5C7A3D" },
      { id: "marron", label: "Marrón", hex: "#8B7355" },
      { id: "azul-marino", label: "Azul marino", hex: "#4A6B8A" },
    ],
  },
  {
    id: "fl-3",
    name: "Sundhoj",
    slug: "sundhoj",
    price: 60,
    originalPrice: null,
    images: [{ url: PRODUCTS.sundhoj, sort_order: 0 }],
    inStock: true,
    description: "Lámpara de pie elegante con luz cálida. Perfecta para sala o dormitorio.",
    inWishlist: true,
    categoryId: "cat-table",
    rating: 4.4,
  },
  {
    id: "fl-4",
    name: "Fjallvik",
    slug: "fjallvik",
    price: 400,
    originalPrice: null,
    images: [{ url: PRODUCTS.brannoBed, sort_order: 0 }],
    inStock: true,
    description: "Cama plataforma moderna con tapicería teal y almacenamiento integrado. Tamaño queen.",
    inWishlist: false,
    categoryId: "cat-bed",
    rating: 4.9,
  },
  {
    id: "fl-5",
    name: "Vallfor",
    slug: "vallfor",
    price: 240,
    originalPrice: null,
    images: [{ url: PRODUCTS.vallfor, sort_order: 0 }],
    inStock: true,
    description: "Gabinete retro con puertas de colores y acabado en madera cálida. 3 compartimentos con estantes ajustables.",
    inWishlist: false,
    categoryId: "cat-cabinet",
    rating: 4.5,
  },
  {
    id: "fl-6",
    name: "Hollvik",
    slug: "hollvik",
    price: 220,
    originalPrice: null,
    images: [{ url: PRODUCTS.hollvik, sort_order: 0 }],
    inStock: true,
    description: "Librero mid-century con tonos cálidos. Estantes abiertos para libros y decoración.",
    inWishlist: false,
    categoryId: "cat-cabinet",
    rating: 4.9,
  },
  {
    id: "fl-7",
    name: "Branno",
    slug: "branno",
    price: 292,
    originalPrice: 450,
    images: [{ url: PRODUCTS.brannoBed, sort_order: 0 }],
    inStock: true,
    description: "Cama de lujo con cabecero acolchado en tela ámbar. Con mesitas de noche integradas.",
    inWishlist: false,
    categoryId: "cat-bed",
    rating: 4.8,
  },
  {
    id: "fl-8",
    name: "Morby",
    slug: "morby",
    price: 120,
    originalPrice: null,
    images: [{ url: PRODUCTS.morby, sort_order: 0 }],
    inStock: true,
    description: "Banco contemporáneo con cojín turquesa y estructura de metal negro. Ideal para entradas.",
    inWishlist: false,
    categoryId: "cat-sofa",
    rating: 4.7,
  },
  {
    id: "fl-9",
    name: "Granholt",
    slug: "granholt",
    price: 200,
    originalPrice: null,
    images: [{ url: PRODUCTS.granholt, sort_order: 0 }],
    inStock: true,
    description: "Silla wingback clásica en terciopelo rojo. Respaldo capitoné con ribetes de latón.",
    inWishlist: false,
    categoryId: "cat-chair",
    rating: 4.6,
    colors: [
      { id: "terciopelo-rojo", label: "Terciopelo rojo", hex: "#8B2020" },
      { id: "cuero-marron", label: "Cuero marrón", hex: "#4A3728" },
      { id: "azul-medianoche", label: "Azul medianoche", hex: "#2C3E50" },
    ],
  },
  {
    id: "fl-10",
    name: "Farlov",
    slug: "farlov",
    price: 400,
    originalPrice: null,
    images: [{ url: PRODUCTS.farlov, sort_order: 0 }],
    inStock: true,
    description: "Mesa de comedor minimalista en gris mate. Para 6 personas. Patas de acero antirrayaduras.",
    inWishlist: false,
    categoryId: "cat-table",
    rating: 5.0,
  },
  {
    id: "fl-11",
    name: "Boise",
    slug: "boise",
    price: 180,
    originalPrice: 220,
    images: [{ url: PRODUCTS.boise, sort_order: 0 }],
    inStock: true,
    description: "Mesa auxiliar de diseño nórdico. Perfecta para sala de estar o dormitorio.",
    inWishlist: false,
    categoryId: "cat-table",
    rating: 4.3,
  },
  {
    id: "fl-12",
    name: "Harlov",
    slug: "harlov",
    price: 350,
    originalPrice: null,
    images: [{ url: PRODUCTS.harlov, sort_order: 0 }],
    inStock: true,
    description: "Librero con estilo industrial. Estructura de metal con estantes de madera.",
    inWishlist: false,
    categoryId: "cat-cabinet",
    rating: 4.7,
  },
];

export const mockDetailProduct: StorefrontProduct = mockProducts[0]!;

// ── Hero ───────────────────────────────────────────────────────────────────────

export const mockHeroBanner = {
  title: "¡Nueva colección disponible!",
  subtitle: "Ver más",
  image: HERO_BANNER,
};

// ── Room style cards ───────────────────────────────────────────────────────────

export const mockStyleCards = [
  { name: "Escandinavo", image: STYLE_IMAGES.scandinavian },
  { name: "Bohemio", image: STYLE_IMAGES.bohemian },
  { name: "Industrial", image: STYLE_IMAGES.industrial },
];

// ── Category images for room style section ─────────────────────────────────────

export const mockRoomBannerImage = CATEGORIES.livingRoom;
