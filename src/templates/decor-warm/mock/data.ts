// Decor Warm Template — Mock Store Data
// All content centralized here — zero hardcoded strings in components.

import { ASSETS } from "./assets";
import type { StoreInfo, StorefrontProduct, Category } from "@/types/store";
import type {
  DecorWarmCategoryIcon,
  DecorWarmPromoSlide,
  DecorWarmBestSeller,
} from "../types";

// ── Store Info ────────────────────────────────────────────────────────────────

export const mockStore: StoreInfo = {
  name: "Casa Bonita",
  slug: "decor-warm-preview",
  logo: null,
  description: "Tu tienda de muebles y decoración para el hogar perfecto.",
  whatsapp: "573001234567",
  hours: "Lun–Sáb 9am–7pm · Dom cerrado",
  paymentMethods: ["Efectivo", "Nequi", "Daviplata", "Transferencia bancaria", "Tarjeta"],
  shippingInfo: "Envío en Bogotá: 1–2 días. Envío nacional: 3–7 días hábiles. Artículos grandes incluyen instalación.",
  social_links: {
    instagram: "casabonita.co",
    facebook: "casabonitacol",
  },
};

// ── Category Icons (home page quick-nav) ─────────────────────────────────────

export const mockCategoryIcons: DecorWarmCategoryIcon[] = [
  { id: "icon-sala", name: "Salas", icon: "Sofa" },
  { id: "icon-escritorio", name: "Escritorios", icon: "BookOpen" },
  { id: "icon-dormitorio", name: "Dormitorio", icon: "BedDouble" },
  { id: "icon-deco", name: "Decoración", icon: "Layers" },
  { id: "icon-luz", name: "Iluminación", icon: "Lamp" },
  { id: "icon-storage", name: "Almacenamiento", icon: "Archive" },
];

// ── Categories (filter tab bar) ───────────────────────────────────────────────

export const mockCategories: Category[] = [
  { id: "cat-living", name: "Living Room", slug: "living-room", icon: "Sofa" },
  { id: "cat-light", name: "Iluminación", slug: "iluminacion", icon: "Lamp" },
  { id: "cat-bed", name: "Dormitorio", slug: "dormitorio", icon: "BedDouble" },
  { id: "cat-storage", name: "Almacenamiento", slug: "almacenamiento", icon: "Archive" },
  { id: "cat-table", name: "Mesas", slug: "mesas", icon: "Table2" },
  { id: "cat-chair", name: "Sillas", slug: "sillas", icon: "Armchair" },
  { id: "cat-decor", name: "Decoración", slug: "decoracion", icon: "Layers" },
];

// ── Products ──────────────────────────────────────────────────────────────────

export const mockProducts: StorefrontProduct[] = [
  {
    id: "dw-p1",
    name: "Silla Aluminio",
    slug: "silla-aluminio",
    price: 380000,
    originalPrice: 520000,
    images: [{ url: ASSETS.products.chairAluminum, sort_order: 0 }],
    inStock: true,
    rating: 4.8,
    reviewCount: 124,
    inWishlist: false,
    description: "Silla de aluminio premium con diseño minimalista y resistente.",
    categoryId: "cat-chair",
  },
  {
    id: "dw-p2",
    name: "Silla Estilizada",
    slug: "silla-estilizada",
    price: 295000,
    originalPrice: null,
    images: [{ url: ASSETS.products.chairStylish, sort_order: 0 }],
    inStock: true,
    rating: 4.6,
    reviewCount: 87,
    inWishlist: true,
    description: "Silla estilizada con tela suave y patas de madera natural.",
    categoryId: "cat-chair",
  },
  {
    id: "dw-p3",
    name: "Sofá Escandinavo",
    slug: "sofa-escandinavo",
    price: 1850000,
    originalPrice: 2200000,
    images: [{ url: ASSETS.products.sofaScandinavian, sort_order: 0 }],
    inStock: true,
    rating: 4.9,
    reviewCount: 312,
    inWishlist: false,
    description: "Sofá nórdico de 3 puestos con estructura en madera maciza.",
    categoryId: "cat-living",
  },
  {
    id: "dw-p4",
    name: "Sofá Chesterfield",
    slug: "sofa-chesterfield",
    price: 2800000,
    originalPrice: 3400000,
    images: [{ url: ASSETS.products.sofaChesterfield, sort_order: 0 }],
    inStock: true,
    rating: 4.9,
    reviewCount: 512,
    inWishlist: false,
    description: "Sofá Chesterfield clásico en cuero legítimo con detalles capitoné.",
    categoryId: "cat-living",
  },
  {
    id: "dw-p5",
    name: "Cama King Marrón",
    slug: "cama-king-marron",
    price: 2100000,
    originalPrice: null,
    images: [{ url: ASSETS.products.bedBrown, sort_order: 0 }],
    inStock: true,
    rating: 4.7,
    reviewCount: 95,
    inWishlist: false,
    description: "Cama king size con cabecero tapizado en tela texturizada.",
    categoryId: "cat-bed",
  },
  {
    id: "dw-p6",
    name: "Cama Verde Natura",
    slug: "cama-verde-natura",
    price: 1650000,
    originalPrice: 1950000,
    images: [{ url: ASSETS.products.bedGreen, sort_order: 0 }],
    inStock: true,
    rating: 4.5,
    reviewCount: 68,
    inWishlist: false,
    description: "Cama con cabecero acolchado en tonos naturales y verdes.",
    categoryId: "cat-bed",
  },
  {
    id: "dw-p7",
    name: "Cama King Premium",
    slug: "cama-king-premium",
    price: 2450000,
    originalPrice: 2900000,
    images: [{ url: ASSETS.products.bedKing, sort_order: 0 }],
    inStock: true,
    rating: 4.8,
    reviewCount: 147,
    inWishlist: false,
    description: "Cama king premium con plataforma baja y cabecero de madera.",
    categoryId: "cat-bed",
  },
  {
    id: "dw-p8",
    name: "Cama Individual",
    slug: "cama-individual",
    price: 980000,
    originalPrice: null,
    images: [{ url: ASSETS.products.bedSingle, sort_order: 0 }],
    inStock: false,
    rating: 5.0,
    reviewCount: 38,
    inWishlist: false,
    description: "Cama individual con almacenaje integrado y acabado en madera clara.",
    categoryId: "cat-bed",
  },
];

// ── Promo Slides ──────────────────────────────────────────────────────────────

export const mockPromoSlides: DecorWarmPromoSlide[] = [
  {
    imageUrl: ASSETS.heroBanner,
    label: "OFERTA ESPECIAL",
    heading: "Experiencia de Confort",
    badge: "20% OFF",
  },
  {
    imageUrl: ASSETS.heroBanner2,
    label: "NUEVA COLECCIÓN",
    heading: "Diseño que Inspira",
    badge: "15% OFF",
  },
];

// ── Best Sellers ──────────────────────────────────────────────────────────────

export const mockBestSellers: DecorWarmBestSeller[] = [
  {
    productId: "dw-bs1",
    name: "Carrito de Cocina",
    description:
      "Diseño funcional y elegante para tu cocina. Madera natural con ruedas giratorias.",
    price: 480000,
    rating: 4.5,
    imageUrl: ASSETS.bestSeller,
  },
  {
    productId: "dw-bs2",
    name: "Silla Aluminio",
    description: "Silla moderna de aluminio con líneas limpias. Perfecta para cualquier ambiente.",
    price: 380000,
    rating: 4.8,
    imageUrl: ASSETS.products.chairAluminum,
  },
];

// ── Detail product (for product detail page) ──────────────────────────────────

export const mockDetailProduct: StorefrontProduct = mockProducts[0]!;
