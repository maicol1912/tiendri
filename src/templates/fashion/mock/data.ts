// Fashion Template — Complete Mock Store Data
// All content lives here — zero hardcoded strings in components.

import { ASSETS } from "./assets";
import type { StoreInfo, StorefrontCategory, StorefrontProduct } from "@/types/domain/store";

interface PopularProduct {
  id: string;
  title: string;
  description: string;
  image: string;
  ctaText: string;
  bgColor: string;
}

// ── Store Info ──────────────────────────────────────────────────────────────

export const mockStore: StoreInfo = {
  name: "Moda Élite",
  slug: "moda-elite",
  logo: null,
  description:
    "Tu destino de moda en Colombia. Ropa de calidad premium para toda la familia, con envío a todo el país.",
  whatsapp: "573001234567",
  hours: "Lun–Sáb 9am–7pm · Dom 10am–4pm",
  paymentMethods: ["Efectivo", "Nequi", "Daviplata", "Tarjeta débito/crédito"],
  shippingInfo: "Envío a todo Colombia. Bogotá y Medellín: 1–2 días. Resto del país: 3–5 días hábiles.",
  social_links: {
    instagram: "https://instagram.com/modaelite",
    facebook: "https://facebook.com/modaelite",
    tiktok: "https://tiktok.com/@modaelite",
  },
};

// ── Categories ──────────────────────────────────────────────────────────────

export const mockCategories: StorefrontCategory[] = [
  {
    id: "cat-01",
    name: "Hombres",
    slug: "hombres",
    icon: "User",
    productCount: 84,
  },
  {
    id: "cat-02",
    name: "Mujeres",
    slug: "mujeres",
    icon: "UserRound",
    productCount: 132,
  },
  {
    id: "cat-03",
    name: "Niños",
    slug: "ninos",
    icon: "Baby",
    productCount: 47,
  },
  {
    id: "cat-04",
    name: "Accesorios",
    slug: "accesorios",
    icon: "Gem",
    productCount: 63,
  },
];

// ── Products (Nueva Colección — 8 items) ────────────────────────────────────

export const mockProducts: StorefrontProduct[] = [
  {
    id: "prod-01",
    name: "Camiseta Hombre",
    subtitle: "Camiseta Básica Premium",
    slug: "camiseta-basica-premium",
    price: 89900,
    originalPrice: 119900,
    images: [{ url: ASSETS.products[0], sort_order: 0 }],
    rating: 4.8,
    inStock: true,
    categoryId: "cat-01",
  },
  {
    id: "prod-02",
    name: "Pantalón Hombre",
    subtitle: "Slim Fit Negro",
    slug: "pantalon-slim-fit-negro",
    price: 129900,
    originalPrice: 159900,
    images: [{ url: ASSETS.products[1], sort_order: 0 }],
    rating: 4.7,
    inStock: true,
    categoryId: "cat-01",
  },
  {
    id: "prod-03",
    name: "Vestido Mujer",
    subtitle: "Midi Elegante",
    slug: "vestido-midi-elegante",
    price: 179900,
    originalPrice: 229900,
    images: [{ url: ASSETS.products[2], sort_order: 0 }],
    rating: 4.9,
    inStock: true,
    categoryId: "cat-02",
  },
  {
    id: "prod-04",
    name: "Chaqueta Mujer",
    subtitle: "Oversize Minimalista",
    slug: "chaqueta-oversize-minimalista",
    price: 249900,
    originalPrice: 299900,
    images: [{ url: ASSETS.listing[0], sort_order: 0 }],
    rating: 4.6,
    inStock: true,
    categoryId: "cat-02",
  },
  {
    id: "prod-05",
    name: "Camisa Hombre",
    subtitle: "Oxford Clásica",
    slug: "camisa-oxford-clasica",
    price: 119900,
    originalPrice: null,
    images: [{ url: ASSETS.listing[1], sort_order: 0 }],
    rating: 4.5,
    inStock: true,
    categoryId: "cat-01",
  },
  {
    id: "prod-06",
    name: "Falda Mujer",
    subtitle: "Plisada Midi",
    slug: "falda-plisada-midi",
    price: 109900,
    originalPrice: 139900,
    images: [{ url: ASSETS.listing[2], sort_order: 0 }],
    rating: 4.7,
    inStock: true,
    categoryId: "cat-02",
  },
  {
    id: "prod-07",
    name: "Conjunto Niños",
    subtitle: "Deportivo Niño",
    slug: "conjunto-deportivo-nino",
    price: 79900,
    originalPrice: 99900,
    images: [{ url: ASSETS.listing[3], sort_order: 0 }],
    rating: 4.4,
    inStock: false,
    categoryId: "cat-03",
  },
  {
    id: "prod-08",
    name: "Bolso Accesorio",
    subtitle: "Tote Minimalista",
    slug: "bolso-tote-minimalista",
    price: 159900,
    originalPrice: 189900,
    images: [{ url: ASSETS.products[0], sort_order: 0 }],
    rating: 4.8,
    inStock: true,
    categoryId: "cat-04",
  },
];

// ── Popular Products — 4 full-width banner cards ────────────────────────────

export const mockPopularProducts: PopularProduct[] = [
  {
    id: "pop-01",
    title: "Nueva Colección",
    description:
      "Prendas cuidadosamente seleccionadas para el estilo urbano moderno. Minimalismo y elegancia en cada pieza.",
    image: ASSETS.products[0],
    ctaText: "Ver colección",
    bgColor: "#F6F6F6",
  },
  {
    id: "pop-02",
    title: "Mujeres",
    description:
      "La feminidad redefinida. Cortes perfectos, telas premium y siluetas que hacen la diferencia.",
    image: ASSETS.products[2],
    ctaText: "Explorar",
    bgColor: "#EAEAEA",
  },
  {
    id: "pop-03",
    title: "Hombres",
    description:
      "Elegancia sin esfuerzo. Desde el casual hasta lo formal, piezas que elevan cualquier look.",
    image: ASSETS.products[1],
    ctaText: "Ver más",
    bgColor: "#CDCDCD",
  },
  {
    id: "pop-04",
    title: "Accesorios",
    description:
      "El detalle que lo cambia todo. Bolsos, cinturones y más, en negro puro y gris mineral.",
    image: ASSETS.listing[0],
    ctaText: "Comprar ahora",
    bgColor: "#1E1E1E",
  },
];

// ── Discount Products — 4 items ─────────────────────────────────────────────

export const mockDiscountProducts: StorefrontProduct[] = [
  {
    id: "disc-01",
    name: "Blazer Estructurado Negro",
    slug: "blazer-estructurado-negro",
    price: 199900,
    originalPrice: 289900,
    images: [{ url: ASSETS.listing[1], sort_order: 0 }],
    rating: 4.7,
    inStock: true,
    categoryId: "cat-02",
  },
  {
    id: "disc-02",
    name: "Pantalón Cargo Unisex",
    slug: "pantalon-cargo-unisex",
    price: 109900,
    originalPrice: 149900,
    images: [{ url: ASSETS.listing[2], sort_order: 0 }],
    rating: 4.5,
    inStock: true,
    categoryId: "cat-01",
  },
  {
    id: "disc-03",
    name: "Vestido Maxi Fluido",
    slug: "vestido-maxi-fluido",
    price: 139900,
    originalPrice: 199900,
    images: [{ url: ASSETS.listing[3], sort_order: 0 }],
    rating: 4.8,
    inStock: true,
    categoryId: "cat-02",
  },
  {
    id: "disc-04",
    name: "Gorra Dad Hat Negra",
    slug: "gorra-dad-hat-negra",
    price: 49900,
    originalPrice: 69900,
    images: [{ url: ASSETS.products[0], sort_order: 0 }],
    rating: 4.3,
    inStock: true,
    categoryId: "cat-04",
  },
];

// ── Product Detail — Camiseta Básica Premium (full data) ───────────────────

export const mockDetailProduct: StorefrontProduct = {
  id: "prod-01",
  name: "Camiseta Básica Premium",
  slug: "camiseta-basica-premium",
  price: 89900,
  originalPrice: 119900,
  images: [
    { url: ASSETS.products[0], sort_order: 0 },
    { url: ASSETS.products[1], sort_order: 1 },
    { url: ASSETS.products[2], sort_order: 2 },
    { url: ASSETS.detailMain, sort_order: 3 },
  ],
  description:
    "Una camiseta que redefine el concepto de básico. Confeccionada en algodón 100% peinado de 220 g/m², con corte recto y acabados que resisten el paso del tiempo. Ideal para cualquier ocasión, desde el día a día hasta un look más elaborado.",
  rating: 4.8,
  reviewCount: 87,
  inStock: true,
  inWishlist: false,
  categoryId: "cat-01",
};
