// Pets Classic Template — Complete Mock Store Data
// All content centralized here — zero hardcoded strings in components.

import { ASSETS } from "./assets";
import type {
  StoreInfo,
  PetsClassicCategory,
  PetsClassicProduct,
  PromoSlide,
  CartItem,
} from "../types";

// ── Store Info ──────────────────────────────────────────────────────────────

export const mockStore: StoreInfo = {
  name: "PetShop",
  slug: "petshop-classic",
  logo: null,
  whatsapp: "573001234567",
  social_links: {
    instagram: "https://instagram.com/petshopclasic",
    facebook: "https://facebook.com/petshopclasic",
  },
};

// ── Categories ──────────────────────────────────────────────────────────────

export const mockCategories: PetsClassicCategory[] = [
  {
    id: "cat-food",
    name: "Comida",
    iconName: "utensils",
    iconSrc: ASSETS.categoryIcons.food,
  },
  {
    id: "cat-toy",
    name: "Juguetes",
    iconName: "bone",
    iconSrc: ASSETS.categoryIcons.toy,
  },
  {
    id: "cat-potion",
    name: "Medicina",
    iconName: "flask-conical",
    iconSrc: ASSETS.categoryIcons.potion,
  },
  {
    id: "cat-finery",
    name: "Accesorios",
    iconName: "scissors",
    iconSrc: ASSETS.categoryIcons.finery,
  },
  {
    id: "cat-tools",
    name: "Herramientas",
    iconName: "wrench",
    iconSrc: ASSETS.categoryIcons.tools,
  },
  {
    id: "cat-dress",
    name: "Ropa",
    iconName: "shirt",
    iconSrc: ASSETS.categoryIcons.dress,
  },
];

// ── Products ──────────────────────────────────────────────────────────────

export const mockProducts: PetsClassicProduct[] = [
  {
    id: "prod-01",
    name: "Alimento Premium para Perros",
    slug: "alimento-premium-perros",
    price: 45000,
    compare_at_price: 58000,
    images: [{ url: ASSETS.products[0], sort_order: 0 }],
    available: true,
    featured: true,
    categoryId: "cat-food",
    rating: 4.8,
    description: "Alimento balanceado de alta calidad con proteínas naturales para perros adultos. Ideal para mantener una dieta saludable.",
    tags: ["Nutrición", "Natural", "Premium"],
  },
  {
    id: "prod-02",
    name: "Juguete Masticable para Gatos",
    slug: "juguete-masticable-gatos",
    price: 18000,
    compare_at_price: null,
    images: [{ url: ASSETS.products[1], sort_order: 0 }],
    available: true,
    featured: true,
    categoryId: "cat-toy",
    rating: 4.5,
    description: "Juguete interactivo resistente ideal para mantener a tu gato activo y entretenido por horas.",
    tags: ["Interactivo", "Duradero"],
  },
  {
    id: "prod-03",
    name: "Vitaminas para Mascotas",
    slug: "vitaminas-mascotas",
    price: 32000,
    compare_at_price: 40000,
    images: [{ url: ASSETS.products[2], sort_order: 0 }],
    available: true,
    featured: false,
    categoryId: "cat-potion",
    rating: 4.7,
    description: "Suplemento vitamínico completo para mascotas. Fortalece el sistema inmune y mejora el pelaje.",
    tags: ["Salud", "Vitaminas", "Bienestar"],
  },
  {
    id: "prod-04",
    name: "Arnés Ajustable para Perros",
    slug: "arnes-ajustable-perros",
    price: 55000,
    compare_at_price: null,
    images: [{ url: ASSETS.products[3], sort_order: 0 }],
    available: true,
    featured: false,
    categoryId: "cat-finery",
    rating: 4.6,
    description: "Arnés ergonómico y ajustable para perros de todos los tamaños. Material resistente y cómodo.",
    tags: ["Comodidad", "Seguridad", "Ajustable"],
  },
  {
    id: "prod-05",
    name: "Cepillo de Grooming Profesional",
    slug: "cepillo-grooming-profesional",
    price: 28000,
    compare_at_price: 35000,
    images: [{ url: ASSETS.products[0], sort_order: 0 }],
    available: true,
    featured: false,
    categoryId: "cat-tools",
    rating: 4.4,
    description: "Cepillo profesional para eliminar pelo muerto y mantener el pelaje de tu mascota brillante.",
    tags: ["Grooming", "Profesional"],
  },
  {
    id: "prod-06",
    name: "Ropa Térmica para Perros",
    slug: "ropa-termica-perros",
    price: 42000,
    compare_at_price: null,
    images: [{ url: ASSETS.products[1], sort_order: 0 }],
    available: true,
    featured: true,
    categoryId: "cat-dress",
    rating: 4.3,
    description: "Abrigo térmico ideal para los días fríos. Confeccionado con materiales de alta calidad.",
    tags: ["Abrigo", "Térmico", "Invierno"],
  },
  {
    id: "prod-07",
    name: "Comida Húmeda para Gatos",
    slug: "comida-humeda-gatos",
    price: 12000,
    compare_at_price: 15000,
    images: [{ url: ASSETS.products[2], sort_order: 0 }],
    available: true,
    featured: false,
    categoryId: "cat-food",
    rating: 4.9,
    description: "Lata de comida húmeda con atún y verduras para gatos adultos. Deliciosa y nutritiva.",
    tags: ["Húmeda", "Atún", "Gatos"],
  },
  {
    id: "prod-08",
    name: "Pelota Interactiva LED",
    slug: "pelota-interactiva-led",
    price: 22000,
    compare_at_price: null,
    images: [{ url: ASSETS.products[3], sort_order: 0 }],
    available: false,
    featured: false,
    categoryId: "cat-toy",
    rating: 4.2,
    description: "Pelota automática con luces LED para mantener a tu mascota entretenida incluso cuando no estás en casa.",
    tags: ["Automático", "LED", "Interactivo"],
  },
];

// ── Promo Slides ─────────────────────────────────────────────────────────────

export const mockPromoSlides: PromoSlide[] = [
  {
    id: "promo-01",
    badge: "OFERTA ESPECIAL",
    headline: "25% Descuento",
    subtext: "en toda la comida para mascotas esta semana",
    imageUrl: ASSETS.banner,
    bgColor: "#FFF0E0",
    imagePosition: "right",
  },
  {
    id: "promo-02",
    badge: "NUEVA LLEGADA",
    headline: "Juguetes Premium",
    subtext: "para el entretenimiento de tu mascota",
    imageUrl: ASSETS.banner,
    bgColor: "#EBF0FF",
    imagePosition: "right",
  },
];

// ── Mock Detail Product ──────────────────────────────────────────────────────

export const mockDetailProduct: PetsClassicProduct = {
  ...mockProducts[0],
  images: [
    { url: ASSETS.products[0], sort_order: 0 },
    { url: ASSETS.products[1], sort_order: 1 },
    { url: ASSETS.products[2], sort_order: 2 },
  ],
};

// ── Empty cart item shape (for type reference) ───────────────────────────────

export type { CartItem };
