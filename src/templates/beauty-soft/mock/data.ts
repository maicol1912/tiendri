// Beauty Soft Template — Complete Mock Store Data
// All content lives here — zero hardcoded strings in components.

import { ASSETS } from "./assets";
import type {
  BeautySoftProduct,
  BeautySoftCategory,
  HeroBannerData,
} from "../types";
import type { StoreInfo } from "@/types/store";

// ── Store Info ────────────────────────────────────────────────────────────────

export const mockStore: StoreInfo = {
  name: "Glow Studio",
  slug: "glow-studio",
  logo: ASSETS.avatar,
  description: "Tu tienda de cuidado de piel con productos premium para una piel radiante.",
  whatsapp: "573001234567",
  hours: "Lun–Sáb 9am–7pm · Dom 10am–5pm",
  paymentMethods: ["Efectivo", "Nequi", "Daviplata", "Tarjeta débito/crédito"],
  shippingInfo: "Envío gratis en compras mayores a $80.000. Entrega 2–4 días hábiles.",
  social_links: {
    instagram: "glowstudio.co",
    facebook: "glowstudiocol",
    tiktok: "glowstudio",
  },
};

// ── Hero Banner ───────────────────────────────────────────────────────────────

export const mockHeroBanner: HeroBannerData = {
  title: "Cuida tu piel\ncon lo mejor",
  discountText: "Hasta 30% de descuento",
  ctaText: "Ver productos",
  imageUrl: ASSETS.heroBanner,
};

// ── Categories ────────────────────────────────────────────────────────────────

export const mockCategories: BeautySoftCategory[] = [
  { id: "cat-cleanse",    name: "Limpieza",    imageUrl: ASSETS.categories.cleanse },
  { id: "cat-moisturize", name: "Hidratación", imageUrl: ASSETS.categories.moisturize },
  { id: "cat-treat",      name: "Tratamiento", imageUrl: ASSETS.categories.treat },
  { id: "cat-protect",    name: "Protección",  imageUrl: ASSETS.categories.protect },
  { id: "cat-mask",       name: "Máscaras",    imageUrl: ASSETS.categories.mask },
  { id: "cat-body",       name: "Cuerpo",      imageUrl: ASSETS.categories.body },
  { id: "cat-tools",      name: "Accesorios",  imageUrl: ASSETS.categories.tools },
  { id: "cat-kits",       name: "Kits",        imageUrl: ASSETS.categories.kits },
];

// ── Products ──────────────────────────────────────────────────────────────────

export const mockProducts: BeautySoftProduct[] = [
  {
    id: "prod-serum",
    name: "Sérum Iluminador Vitamina C",
    slug: "serum-iluminador-vitamina-c",
    price: 92000,
    originalPrice: 115000,
    images: [{ url: ASSETS.products.serum, sort_order: 0 }],
    description:
      "Sérum concentrado con vitamina C estabilizada y ácido glicólico al 10%. Activa el brillo natural y unifica el tono en 4 semanas.",
    rating: 4.9,
    reviewCount: 1580,
    inStock: true,
    categoryId: "cat-treat",
  },
  {
    id: "prod-cleanser",
    name: "Limpiador Facial Suave",
    slug: "limpiador-facial-suave",
    price: 55000,
    originalPrice: 68000,
    images: [
      { url: ASSETS.products.cleanser, sort_order: 0 },
      { url: ASSETS.products.detailCleanser, sort_order: 1 },
    ],
    description:
      "Gel limpiador de pH balanceado con extracto de aloe vera y pepino. Remueve impurezas sin resecar la piel.",
    rating: 4.7,
    reviewCount: 2230,
    inStock: true,
    categoryId: "cat-cleanse",
  },
  {
    id: "prod-foam-cleanser",
    name: "Limpiador Espuma Poros",
    slug: "limpiador-espuma-poros",
    price: 62000,
    originalPrice: null,
    images: [{ url: ASSETS.products.foamCleanser, sort_order: 0 }],
    description:
      "Espuma limpiadora con ácido salicílico al 2%. Controla el exceso de sebo y minimiza los poros visibles.",
    rating: 4.8,
    reviewCount: 945,
    inStock: true,
    categoryId: "cat-cleanse",
  },
  {
    id: "prod-face-pack",
    name: "Mascarilla Hidratante Noche",
    slug: "mascarilla-hidratante-noche",
    price: 78000,
    originalPrice: 95000,
    images: [{ url: ASSETS.products.facePack, sort_order: 0 }],
    description:
      "Mascarilla sleeping pack con ácido hialurónico y ceramidas. Restaura la barrera cutánea mientras duermes.",
    rating: 4.6,
    reviewCount: 1720,
    inStock: true,
    categoryId: "cat-mask",
  },
  {
    id: "prod-sunscreen",
    name: "Protector Solar SPF 50+",
    slug: "protector-solar-spf-50",
    price: 58000,
    originalPrice: 72000,
    images: [{ url: ASSETS.products.sunscreen, sort_order: 0 }],
    description:
      "Protector solar facial de amplio espectro SPF 50+ PA++++. Toque seco, sin residuo blanco. Ideal bajo maquillaje.",
    rating: 4.9,
    reviewCount: 3100,
    inStock: true,
    categoryId: "cat-protect",
  },
];

// ── Detail product (for product detail page) ──────────────────────────────────

export const mockDetailProduct: BeautySoftProduct = mockProducts[1]!;

// ── Cart mock items (for cart preview) ───────────────────────────────────────

export const mockCartItems = [
  {
    productId: "prod-cleanser",
    name: "Limpiador Facial Suave",
    price: 55000,
    imageUrl: ASSETS.cart.cleanser,
    variantName: null,
    quantity: 1,
  },
  {
    productId: "prod-sunscreen",
    name: "Protector Solar SPF 50+",
    price: 58000,
    imageUrl: ASSETS.cart.sunscreen,
    variantName: null,
    quantity: 2,
  },
];
