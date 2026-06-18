// Tech Premium Template — Complete Mock Store Data
// All content lives here — zero hardcoded strings in components.

import { ASSETS } from "./assets";
import type {
  StoreInfo,
  Category,
  StorefrontProduct,
  ColorOption,
  PopularProduct,
  HeroBannerData,
  BannerGrid,
  SummerSaleBanner,
  SpecBadge,
  ReviewData,
  FilterGroup,
  RatingDistribution,
} from "../types";

// ── Store Info ──────────────────────────────────────────────────────────────

export const mockStore: StoreInfo = {
  name: "Cyber",
  slug: "cyber-store",
  logo: null, // Uses italic text logo
  description:
    "Somos tu tienda de tecnología de confianza. Encontrá los mejores gadgets, smartphones y accesorios al mejor precio.",
  whatsapp: "573001234567",
  hours: "Lun–Vie 8am–8pm · Sáb 9am–6pm · Dom cerrado",
  paymentMethods: ["Efectivo", "Nequi", "Daviplata", "Tarjeta débito/crédito", "Transferencia"],
  shippingInfo: "Envío gratis en compras mayores a $150.000. Entrega 1–3 días hábiles en Bogotá, 2–5 días al resto del país.",
  social_links: {
    twitter: "https://twitter.com/cyberstore",
    facebook: "https://facebook.com/cyberstore",
    tiktok: "https://tiktok.com/@cyberstore",
    instagram: "https://instagram.com/cyberstore",
  },
};

// ── Hero Banner ─────────────────────────────────────────────────────────────

export const mockHeroBanner: HeroBannerData = {
  subtitle: "Pro.Beyond.",
  titleLight: "IPhone 14 ",
  titleBold: "Pro",
  description: "Creado para cambiarlo todo, para mejor. Para todos.",
  ctaText: "Comprar ahora",
  image: ASSETS.hero,
  bgColor: "#211C24",
};

// ── Banner Grid ─────────────────────────────────────────────────────────────

export const mockBannerGrid: BannerGrid = {
  wide: {
    title: "PlayStation 5",
    description:
      "La versión negra y blanca de la PS5 ya disponible en oferta.",
    image: ASSETS.bannerWide,
    bgColor: "#EDEDED",
    textColor: "#000000",
  },
  tall: {
    title: "Macbook",
    titleBold: "Air",
    description: "El MacBook Air más potente de todos los tiempos.",
    image: ASSETS.bannerTall,
    ctaText: "Comprar ahora",
    bgColor: "#E0E0E0",
    textColor: "#000000",
  },
  smallLeft: {
    title: "Apple",
    titleBold: "AirPods Max",
    description: "Audio computacional. Escuchá, es poderoso.",
    image: ASSETS.bannerSmallLeft,
    bgColor: "#EDEDED",
    textColor: "#000000",
  },
  smallRight: {
    title: "Apple",
    titleBold: "Vision Pro",
    description: "Una forma inmersiva de vivir el entretenimiento.",
    image: ASSETS.bannerSmallRight,
    bgColor: "#353535",
    textColor: "#FFFFFF",
  },
};

// ── Categories ──────────────────────────────────────────────────────────────

export const mockCategories: Category[] = [
  {
    id: "cat-01",
    name: "Teléfonos",
    slug: "phones",
    icon: "Smartphone",
    productCount: 120,
  },
  {
    id: "cat-02",
    name: "Relojes",
    slug: "smart-watches",
    icon: "Watch",
    productCount: 45,
  },
  {
    id: "cat-03",
    name: "Cámaras",
    slug: "cameras",
    icon: "Camera",
    productCount: 32,
  },
  {
    id: "cat-04",
    name: "Audífonos",
    slug: "headphones",
    icon: "Headphones",
    productCount: 78,
  },
  {
    id: "cat-05",
    name: "Computadores",
    slug: "computers",
    icon: "Monitor",
    productCount: 64,
  },
  {
    id: "cat-06",
    name: "Gaming",
    slug: "gaming",
    icon: "Gamepad2",
    productCount: 53,
  },
];

// ── Products (New Arrival tab — 8 items) ────────────────────────────────────

export const mockProducts: StorefrontProduct[] = [
  {
    id: "prod-01",
    name: "iPhone 14 Pro Max",
    slug: "iphone-14-pro-max",
    price: 1299,
    originalPrice: 1499,
    images: [{ url: ASSETS.products[0], sort_order: 0 }],
    rating: 4.9,
    inStock: true,
    categoryId: "cat-01",
  },
  {
    id: "prod-02",
    name: "Samsung Galaxy S23 Ultra",
    slug: "samsung-galaxy-s23-ultra",
    price: 1099,
    originalPrice: 1199,
    images: [{ url: ASSETS.products[1], sort_order: 0 }],
    rating: 4.7,
    inStock: true,
    categoryId: "cat-01",
  },
  {
    id: "prod-03",
    name: "Apple Watch Series 9",
    slug: "apple-watch-series-9",
    price: 399,
    originalPrice: 429,
    images: [{ url: ASSETS.products[2], sort_order: 0 }],
    rating: 4.8,
    inStock: true,
    categoryId: "cat-02",
  },
  {
    id: "prod-04",
    name: "AirPods Pro (2nd Generation)",
    slug: "airpods-pro-2nd-gen",
    price: 249,
    originalPrice: 279,
    images: [{ url: ASSETS.products[3], sort_order: 0 }],
    rating: 4.9,
    inStock: true,
    categoryId: "cat-04",
  },
  {
    id: "prod-05",
    name: "MacBook Air M2",
    slug: "macbook-air-m2",
    price: 1099,
    originalPrice: 1199,
    images: [{ url: ASSETS.products[4], sort_order: 0 }],
    rating: 4.9,
    inStock: true,
    categoryId: "cat-05",
  },
  {
    id: "prod-06",
    name: "iPad Pro 12.9\"",
    slug: "ipad-pro-12-9",
    price: 1099,
    originalPrice: 1199,
    images: [{ url: ASSETS.products[5], sort_order: 0 }],
    rating: 4.8,
    inStock: true,
    categoryId: "cat-01",
  },
  {
    id: "prod-07",
    name: "PlayStation 5 Console",
    slug: "playstation-5-console",
    price: 499,
    originalPrice: 549,
    images: [{ url: ASSETS.products[6], sort_order: 0 }],
    rating: 4.9,
    inStock: false,
    categoryId: "cat-06",
  },
  {
    id: "prod-08",
    name: "Sony WH-1000XM5 Headphones",
    slug: "sony-wh-1000xm5",
    price: 299,
    originalPrice: 349,
    images: [{ url: ASSETS.products[7], sort_order: 0 }],
    rating: 4.7,
    inStock: true,
    categoryId: "cat-04",
  },
];

// ── Popular Products — 4 full-width banner cards ────────────────────────────

export const mockPopularProducts: PopularProduct[] = [
  {
    id: "pop-01",
    title: "Productos populares",
    description:
      "iPad combina una magnífica pantalla Retina de 10.2 pulgadas con un rendimiento increíble, multitarea y facilidad de uso.",
    image: ASSETS.popularProducts[0],
    ctaText: "Comprar ahora",
    bgColor: "#FFFFFF",
  },
  {
    id: "pop-02",
    title: "Ipad Pro",
    description:
      "iPad combina una magnífica pantalla Retina de 10.2 pulgadas con un rendimiento increíble, multitarea y facilidad de uso.",
    image: ASSETS.popularProducts[3],
    ctaText: "Comprar ahora",
    bgColor: "#F6F6F6",
  },
  {
    id: "pop-03",
    title: "Samsung Galaxy",
    description:
      "iPad combina una magnífica pantalla Retina de 10.2 pulgadas con un rendimiento increíble, multitarea y facilidad de uso.",
    image: ASSETS.popularProducts[1],
    ctaText: "Comprar ahora",
    bgColor: "#EDEDED",
  },
  {
    id: "pop-04",
    title: "Macbook Pro",
    description:
      "iPad combina una magnífica pantalla Retina de 10.2 pulgadas con un rendimiento increíble, multitarea y facilidad de uso.",
    image: ASSETS.popularProducts[2],
    ctaText: "Comprar ahora",
    bgColor: "#353535",
  },
];

// ── Discount Products — 4 items ─────────────────────────────────────────────

export const mockDiscountProducts: StorefrontProduct[] = [
  {
    id: "disc-01",
    name: "Samsung Galaxy Buds2 Pro",
    slug: "samsung-galaxy-buds2-pro",
    price: 149,
    originalPrice: 229,
    images: [{ url: ASSETS.discountProducts[0], sort_order: 0 }],
    rating: 4.6,
    inStock: true,
    categoryId: "cat-04",
  },
  {
    id: "disc-02",
    name: "ASUS ROG Gaming Laptop",
    slug: "asus-rog-gaming-laptop",
    price: 999,
    originalPrice: 1399,
    images: [{ url: ASSETS.discountProducts[1], sort_order: 0 }],
    rating: 4.5,
    inStock: true,
    categoryId: "cat-06",
  },
  {
    id: "disc-03",
    name: "Fujifilm X-T5 Camera",
    slug: "fujifilm-x-t5-camera",
    price: 1299,
    originalPrice: 1699,
    images: [{ url: ASSETS.discountProducts[2], sort_order: 0 }],
    rating: 4.8,
    inStock: true,
    categoryId: "cat-03",
  },
  {
    id: "disc-04",
    name: "Xiaomi Smart Watch S3",
    slug: "xiaomi-smart-watch-s3",
    price: 149,
    originalPrice: 199,
    images: [{ url: ASSETS.discountProducts[3], sort_order: 0 }],
    rating: 4.3,
    inStock: true,
    categoryId: "cat-02",
  },
];

// ── Summer Sale Banner ───────────────────────────────────────────────────────

export const mockSummerSaleBanner: SummerSaleBanner = {
  image: ASSETS.summerSale,
  imageMobile: ASSETS.summerSaleMobile,
  titleLight: "Gran Remate de ",
  titleBold: "Verano",
  description: "Las mejores ofertas de la temporada. No te las podés perder.",
  ctaText: "Comprar ahora",
};

// ── Product Detail — iPhone 14 Pro Max (full data) ──────────────────────────

const detailProductColors: ColorOption[] = [
  { id: "color-1", label: "Negro Espacial", hex: "#1E1E1E" },
  { id: "color-2", label: "Dorado", hex: "#C5A880" },
  { id: "color-3", label: "Champagne", hex: "#D4C5A9" },
  { id: "color-4", label: "Morado Oscuro", hex: "#4A4A6A" },
  { id: "color-5", label: "Azul Marino", hex: "#2E4057" },
];

export const mockDetailProduct: StorefrontProduct = {
  id: "prod-01",
  name: "iPhone 14 Pro Max",
  slug: "iphone-14-pro-max",
  price: 1299,
  originalPrice: 1499,
  images: [
    { url: ASSETS.products[0], sort_order: 0 },
    { url: ASSETS.products[1], sort_order: 1 },
    { url: ASSETS.products[2], sort_order: 2 },
    { url: ASSETS.products[3], sort_order: 3 },
  ],
  description:
    "Así como un libro se juzga por su portada, lo primero que notás al tomar el iPhone 14 Pro Max es la pantalla. Nada sorprendente, porque las tecnologías avanzadas permiten prácticamente eliminar los marcos de la pantalla.",
  colors: detailProductColors,
  storageOptions: ["128GB", "256GB", "512GB", "1TB"],
  rating: 4.9,
  reviewCount: 125,
  inStock: true,
  inWishlist: false,
  categoryId: "cat-01",
};

export const mockSpecBadges: SpecBadge[] = [
  { label: "Procesador", value: "A16 Bionic" },
  { label: "RAM", value: "6 GB" },
  { label: "Almacenamiento", value: "256 GB" },
  { label: "Pantalla", value: '6.7" OLED' },
];

export const mockReviews: ReviewData[] = [
  {
    id: "rev-01",
    author: "Sarah Johnson",
    rating: 5,
    date: "14 de marzo, 2024",
    text: "¡Me encanta este teléfono! La calidad de la cámara es excepcional y la duración de la batería es impresionante. Vale cada peso.",
  },
  {
    id: "rev-02",
    author: "Michael Chen",
    rating: 5,
    date: "28 de febrero, 2024",
    text: "El mejor smartphone que he tenido. La pantalla es increíble y el rendimiento es súper fluido. ¡Totalmente recomendado!",
  },
  {
    id: "rev-03",
    author: "Emma Rodriguez",
    rating: 4,
    date: "10 de febrero, 2024",
    text: "Muy buen teléfono en general. La función Dynamic Island es muy intuitiva. Mi único reparo: el precio es alto.",
  },
];

export const mockRatingDistribution: RatingDistribution[] = [
  { label: "Excelente", count: 100, percentage: 80 },
  { label: "Bueno", count: 11, percentage: 40 },
  { label: "Regular", count: 3, percentage: 15 },
  { label: "Por debajo del promedio", count: 8, percentage: 35 },
  { label: "Malo", count: 1, percentage: 7 },
];

// ── Filter Groups ────────────────────────────────────────────────────────────

export const mockFilterGroups: FilterGroup[] = [
  {
    id: "brand",
    label: "Marca",
    expanded: true,
    options: [
      { id: "apple", label: "Apple", count: 48, checked: false },
      { id: "samsung", label: "Samsung", count: 32, checked: false },
      { id: "sony", label: "Sony", count: 18, checked: false },
      { id: "xiaomi", label: "Xiaomi", count: 15, checked: false },
      { id: "asus", label: "ASUS", count: 11, checked: false },
    ],
  },
  {
    id: "price",
    label: "Rango de precio",
    expanded: true,
    options: [
      { id: "under-200", label: "Menos de $200", checked: false },
      { id: "200-500", label: "$200 – $500", checked: false },
      { id: "500-1000", label: "$500 – $1000", checked: false },
      { id: "over-1000", label: "Más de $1000", checked: false },
    ],
  },
  {
    id: "category",
    label: "Categoría",
    expanded: false,
    options: [
      { id: "phones", label: "Teléfonos", count: 120, checked: false },
      { id: "watches", label: "Relojes", count: 45, checked: false },
      { id: "cameras", label: "Cámaras", count: 32, checked: false },
      { id: "headphones", label: "Audífonos", count: 78, checked: false },
    ],
  },
  {
    id: "rating",
    label: "Calificación",
    expanded: false,
    options: [
      { id: "4plus", label: "4 estrellas o más", checked: false },
      { id: "3plus", label: "3 estrellas o más", checked: false },
    ],
  },
  {
    id: "availability",
    label: "Disponibilidad",
    expanded: false,
    options: [
      { id: "in-stock", label: "Disponible", checked: false },
      { id: "out-of-stock", label: "Agotado", checked: false },
    ],
  },
];
