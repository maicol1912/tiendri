// Furniture Dark Template — Mock Data
// All inline data for the template preview.

import { ASSETS } from "./assets";
import type {
  StoreInfo,
  Category,
  StorefrontProduct,
  PromoCard,
  VideoData,
  CategoryBannerData,
  ColorOption,
} from "../types";

// ── Store info ────────────────────────────────────────────────────────────────

export const mockStore: StoreInfo = {
  name: "Akshan Home",
  logo: null,
  slug: "demo-furniture-dark",
  whatsapp: "573001234567",
  description: "Muebles y decoración de calidad para tu hogar.",
  hours: "Lun–Vie 9am–6pm · Sáb 10am–4pm",
  paymentMethods: ["Efectivo", "Nequi", "Daviplata", "Tarjeta débito/crédito", "Crédito 6 cuotas"],
  shippingInfo: "Entrega e instalación incluida en Bogotá. Envío nacional 4–7 días hábiles.",
  social_links: {
    instagram: "@akshanhome",
    facebook: "akshanhome",
  },
};

// ── Categories ────────────────────────────────────────────────────────────────

export const mockCategories: Category[] = [
  { id: "living-room", name: "Sala", slug: "sala", icon: "sofa", image: ASSETS.categories.livingRoom },
  { id: "bedroom", name: "Dormitorio", slug: "dormitorio", icon: "bed-double", image: ASSETS.categories.bedroom },
  { id: "dining", name: "Comedor", slug: "comedor", icon: "utensils", image: ASSETS.categories.dining },
  { id: "office", name: "Oficina", slug: "oficina", icon: "briefcase", image: ASSETS.categories.office },
  { id: "outdoor", name: "Exterior", slug: "exterior", icon: "tree-palm", image: ASSETS.categories.outdoor },
  { id: "storage", name: "Almacenamiento", slug: "almacenamiento", icon: "archive", image: ASSETS.categories.storage },
];

// ── Color swatches (used on product detail) ───────────────────────────────────

const naturalColors: ColorOption[] = [
  { id: "beige", hex: "#C4A07A", label: "Beige" },
  { id: "dark-walnut", hex: "#3D2B1A", label: "Nogal oscuro" },
  { id: "light-oak", hex: "#D4B896", label: "Roble claro" },
];

// ── Products ──────────────────────────────────────────────────────────────────

export const mockProducts: StorefrontProduct[] = [
  {
    id: "deep-seat-sofa",
    slug: "deep-seat-sofa",
    name: "Deep Seat Sofa",
    price: 1200000,
    originalPrice: 1500000,
    images: [
      { url: ASSETS.products.deepSeatSofa, alt: "Deep Seat Sofa", sort_order: 0 },
    ],
    inStock: true,
    description:
      "Sofá de asiento profundo con tapizado premium en tela bouclé. Ideal para salas grandes con estilo contemporáneo.",
    rating: 4.8,
    reviewCount: 1320,
    inWishlist: false,
    categoryId: "living-room",
    colors: naturalColors,
  },
  {
    id: "rivera-sofa",
    slug: "rivera-corner-sofa",
    name: "Rivera Corner Sofa",
    price: 2100000,
    images: [{ url: ASSETS.products.riveraSofa, alt: "Rivera Corner Sofa", sort_order: 0 }],
    inStock: true,
    description:
      "Sofá esquinero Rivera con tapizado en cuero sintético. Máximo confort para tu sala de estar.",
    rating: 4.9,
    reviewCount: 870,
    inWishlist: false,
    categoryId: "living-room",
    colors: naturalColors,
  },
  {
    id: "oak-storage",
    slug: "oak-storage-cabinet",
    name: "Oak Storage Cabinet",
    price: 680000,
    originalPrice: 850000,
    images: [{ url: ASSETS.products.oakStorage, alt: "Oak Storage Cabinet", sort_order: 0 }],
    inStock: true,
    description:
      "Gabinete de almacenamiento en madera de roble maciza. Diseño escandinavo con puertas corredizas.",
    rating: 4.7,
    reviewCount: 450,
    inWishlist: false,
    categoryId: "storage",
  },
  {
    id: "wood-table",
    slug: "solid-wood-dining-table",
    name: "Solid Wood Dining Table",
    price: 950000,
    images: [{ url: ASSETS.products.woodTable, alt: "Solid Wood Dining Table", sort_order: 0 }],
    inStock: true,
    description:
      "Mesa de comedor en madera maciza con acabado natural. Disponible para 6 y 8 personas.",
    rating: 4.6,
    reviewCount: 680,
    inWishlist: true,
    categoryId: "dining",
  },
  {
    id: "dining-chair",
    slug: "dining-chair-set",
    name: "Dining Chair Set (×2)",
    price: 380000,
    originalPrice: 480000,
    images: [{ url: ASSETS.products.diningChair, alt: "Dining Chair Set", sort_order: 0 }],
    inStock: true,
    description:
      "Set de 2 sillas de comedor con asiento acolchado y patas de metal matte. Elegante y ergonómica.",
    rating: 4.5,
    reviewCount: 320,
    inWishlist: false,
    categoryId: "dining",
  },
  {
    id: "nightstand",
    slug: "floating-nightstand",
    name: "Floating Nightstand",
    price: 220000,
    images: [{ url: ASSETS.products.nightstand, alt: "Floating Nightstand", sort_order: 0 }],
    inStock: true,
    description:
      "Mesita de noche flotante en MDF con acabado mate. Con cajón y estante abierto. Fácil instalación.",
    rating: 4.4,
    reviewCount: 190,
    inWishlist: false,
    categoryId: "bedroom",
  },
  {
    id: "swivel-chair",
    slug: "swivel-accent-chair",
    name: "Swivel Accent Chair",
    price: 540000,
    originalPrice: 660000,
    images: [{ url: ASSETS.products.swivelChair, alt: "Swivel Accent Chair", sort_order: 0 }],
    inStock: true,
    description:
      "Silla giratoria de acento con base dorada y tapizado en terciopelo. Un toque de lujo para cualquier espacio.",
    rating: 4.8,
    reviewCount: 540,
    inWishlist: false,
    categoryId: "living-room",
  },
  {
    id: "borrego-round",
    slug: "borrego-round-ottoman",
    name: "Borrego Round Ottoman",
    price: 290000,
    images: [{ url: ASSETS.products.bornegoRound, alt: "Borrego Round Ottoman", sort_order: 0 }],
    inStock: true,
    description:
      "Puf redondo estilo borrego en piel sintética beige. Perfecta combinación de funcionalidad y estilo nórdico.",
    rating: 4.7,
    reviewCount: 260,
    inWishlist: false,
    categoryId: "living-room",
  },
  {
    id: "chair-leather",
    slug: "leather-lounge-chair",
    name: "Leather Lounge Chair",
    price: 890000,
    originalPrice: 1100000,
    images: [
      { url: ASSETS.products.chairLeather, alt: "Leather Lounge Chair", sort_order: 0 },
      { url: ASSETS.description.tableChair, alt: "Lounge Chair detail", sort_order: 1 },
      { url: ASSETS.description.tableDetail, alt: "Lounge Chair side view", sort_order: 2 },
    ],
    inStock: true,
    description:
      "Silla lounge en cuero natural con reposapiés. Diseño icónico inspirado en la arquitectura de mediados de siglo.",
    rating: 4.9,
    reviewCount: 1100,
    inWishlist: false,
    categoryId: "living-room",
    colors: naturalColors,
  },
];

// ── Product sections ──────────────────────────────────────────────────────────

export const mockBestSellers: StorefrontProduct[] = mockProducts.filter((p) =>
  ["deep-seat-sofa", "rivera-sofa", "swivel-chair", "chair-leather"].includes(p.id)
);

export const mockFeaturedProducts: StorefrontProduct[] = mockProducts.filter((p) =>
  ["wood-table", "dining-chair", "oak-storage", "borrego-round"].includes(p.id)
);

// ── Promo carousel ────────────────────────────────────────────────────────────

export const mockPromoCards: PromoCard[] = [
  {
    id: "promo-1",
    title: "El mueble que te define",
    tag: "NUEVA COLECCIÓN",
    ctaLabel: "Explorar",
    image: ASSETS.banners[0],
  },
  {
    id: "promo-2",
    title: "Estilo para tu hogar",
    tag: "HASTA 40% OFF",
    ctaLabel: "Ver más",
    image: ASSETS.banners[1],
  },
];

// ── Video section ─────────────────────────────────────────────────────────────

export const mockVideoSection: VideoData = {
  posterImage: ASSETS.description.tableChair,
  title: "Conocé nuestra historia",
};

// ── Category banner ───────────────────────────────────────────────────────────

export const mockCategoryBanner: CategoryBannerData = {
  image: ASSETS.banners[0],
  title: "Sala",
  headline: "Sofás y más",
  subtext: "La mejor selección para tu sala de estar",
};
