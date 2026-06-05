// Furniture Light — Mock Data
// All hardcoded data for preview/development.

import type {
  FurnitureProduct,
  FurnitureCategory,
  FurnitureStoreInfo,
} from "../types";
import { PRODUCTS, HERO_BANNER, CATEGORIES, STYLE_IMAGES } from "./assets";

// ── Store ──────────────────────────────────────────────────────────────────────

export const mockStore: FurnitureStoreInfo = {
  name: "KASA",
  slug: "kasa-furniture",
  logo: null,
  whatsapp: "573001234567",
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

export const mockProducts: FurnitureProduct[] = [
  {
    id: "fl-1",
    name: "Livaro",
    slug: "livaro",
    price: 105,
    compare_at_price: 150,
    images: [{ url: PRODUCTS.livaro, sort_order: 0 }, { url: PRODUCTS.farlov, sort_order: 1 }],
    available: true,
    description: "Mesa de comedor escandinava con acabado de madera cálida. Ideal para espacios modernos y acogedores. Soporta hasta 6 personas con comodidad.",
    cardBgColor: "#F0E6D4",
    inWishlist: false,
    categoryId: "cat-table",
    rating: 4.4,
    discountPercent: 30,
    unitsSold: 41,
    colorVariant: "Roble natural",
    colorOptions: ["#A0765A", "#6B4F3E", "#D4B896"],
  },
  {
    id: "fl-2",
    name: "Sodra",
    slug: "sodra",
    price: 250,
    compare_at_price: null,
    images: [{ url: PRODUCTS.sodra, sort_order: 0 }],
    available: true,
    description: "Silla tapizada con diseño wingback. Tapicería en terciopelo verde con detalles de madera.",
    cardBgColor: "#E8F5E9",
    inWishlist: false,
    categoryId: "cat-chair",
    rating: 4.5,
    unitsSold: 41,
    colorVariant: "Verde celery",
    colorOptions: ["#5C7A3D", "#8B7355", "#4A6B8A"],
  },
  {
    id: "fl-3",
    name: "Sundhoj",
    slug: "sundhoj",
    price: 60,
    compare_at_price: null,
    images: [{ url: PRODUCTS.sundhoj, sort_order: 0 }],
    available: true,
    description: "Lámpara de pie elegante con luz cálida. Perfecta para sala o dormitorio.",
    cardBgColor: "#FEF9E7",
    inWishlist: true,
    categoryId: "cat-table",
    rating: 4.4,
  },
  {
    id: "fl-4",
    name: "Fjallvik",
    slug: "fjallvik",
    price: 400,
    compare_at_price: null,
    images: [{ url: PRODUCTS.brannoBed, sort_order: 0 }],
    available: true,
    description: "Cama plataforma moderna con tapicería teal y almacenamiento integrado. Tamaño queen.",
    cardBgColor: "#E6F0F8",
    inWishlist: false,
    categoryId: "cat-bed",
    rating: 4.9,
  },
  {
    id: "fl-5",
    name: "Vallfor",
    slug: "vallfor",
    price: 240,
    compare_at_price: null,
    images: [{ url: PRODUCTS.vallfor, sort_order: 0 }],
    available: true,
    description: "Gabinete retro con puertas de colores y acabado en madera cálida. 3 compartimentos con estantes ajustables.",
    cardBgColor: "#FDF2E9",
    inWishlist: false,
    categoryId: "cat-cabinet",
    rating: 4.5,
  },
  {
    id: "fl-6",
    name: "Hollvik",
    slug: "hollvik",
    price: 220,
    compare_at_price: null,
    images: [{ url: PRODUCTS.hollvik, sort_order: 0 }],
    available: true,
    description: "Librero mid-century con tonos cálidos. Estantes abiertos para libros y decoración.",
    cardBgColor: "#FADBD8",
    inWishlist: false,
    categoryId: "cat-cabinet",
    rating: 4.9,
  },
  {
    id: "fl-7",
    name: "Branno",
    slug: "branno",
    price: 292,
    compare_at_price: 450,
    images: [{ url: PRODUCTS.brannoBed, sort_order: 0 }],
    available: true,
    description: "Cama de lujo con cabecero acolchado en tela ámbar. Con mesitas de noche integradas.",
    cardBgColor: "#E8DAEF",
    inWishlist: false,
    categoryId: "cat-bed",
    rating: 4.8,
    discountPercent: 35,
  },
  {
    id: "fl-8",
    name: "Morby",
    slug: "morby",
    price: 120,
    compare_at_price: null,
    images: [{ url: PRODUCTS.morby, sort_order: 0 }],
    available: true,
    description: "Banco contemporáneo con cojín turquesa y estructura de metal negro. Ideal para entradas.",
    cardBgColor: "#D5F5E3",
    inWishlist: false,
    categoryId: "cat-sofa",
    rating: 4.7,
  },
  {
    id: "fl-9",
    name: "Granholt",
    slug: "granholt",
    price: 200,
    compare_at_price: null,
    images: [{ url: PRODUCTS.granholt, sort_order: 0 }],
    available: true,
    description: "Silla wingback clásica en terciopelo rojo. Respaldo capitoné con ribetes de latón.",
    cardBgColor: "#F9E6E6",
    inWishlist: false,
    categoryId: "cat-chair",
    rating: 4.6,
    colorVariant: "Terciopelo rojo",
    colorOptions: ["#8B2020", "#4A3728", "#2C3E50"],
  },
  {
    id: "fl-10",
    name: "Farlov",
    slug: "farlov",
    price: 400,
    compare_at_price: null,
    images: [{ url: PRODUCTS.farlov, sort_order: 0 }],
    available: true,
    description: "Mesa de comedor minimalista en gris mate. Para 6 personas. Patas de acero antirrayaduras.",
    cardBgColor: "#EAEDED",
    inWishlist: false,
    categoryId: "cat-table",
    rating: 5.0,
  },
  {
    id: "fl-11",
    name: "Boise",
    slug: "boise",
    price: 180,
    compare_at_price: 220,
    images: [{ url: PRODUCTS.boise, sort_order: 0 }],
    available: true,
    description: "Mesa auxiliar de diseño nórdico. Perfecta para sala de estar o dormitorio.",
    cardBgColor: "#F5F0E8",
    inWishlist: false,
    categoryId: "cat-table",
    rating: 4.3,
    discountPercent: 18,
  },
  {
    id: "fl-12",
    name: "Harlov",
    slug: "harlov",
    price: 350,
    compare_at_price: null,
    images: [{ url: PRODUCTS.harlov, sort_order: 0 }],
    available: true,
    description: "Librero con estilo industrial. Estructura de metal con estantes de madera.",
    cardBgColor: "#EAF0EB",
    inWishlist: false,
    categoryId: "cat-cabinet",
    rating: 4.7,
  },
];

export const mockDetailProduct: FurnitureProduct = mockProducts[0]!;

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
