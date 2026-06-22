// Food Night Template — Mock Store Data

import { ASSETS } from "./assets";
import type { StoreInfo, StorefrontCategory, StorefrontProduct } from "@/types/domain/store";

interface SizeOption {
  id: string;
  label: string;
}

// ── Store Info ───────────────────────────────────────────────────────────────

export const mockStore: StoreInfo = {
  name: "PizzaNight",
  slug: "pizza-night-store",
  logo: null,
  whatsapp: "573001234567",
  hours: "Lun–Dom 12pm–11pm · Domicilios hasta las 10:30pm",
  paymentMethods: ["Efectivo", "Nequi", "Daviplata", "Tarjeta contra entrega"],
  shippingInfo: "Domicilio en 30–45 minutos dentro de la ciudad. Sin costo mínimo de pedido.",
  social_links: {
    instagram: "pizzanight",
    facebook: "pizzanight",
  },
};

// ── Categories ───────────────────────────────────────────────────────────────

export const mockCategories: StorefrontCategory[] = [
  { id: "cat-01", name: "Pizzas", slug: "pizzas", icon: "Pizza" },
  { id: "cat-02", name: "Hamburguesas", slug: "hamburguesas", icon: "Utensils" },
  { id: "cat-03", name: "Pollos", slug: "pollos", icon: "Drumstick" },
  { id: "cat-04", name: "Vegetariano", slug: "vegetariano", icon: "Salad" },
  { id: "cat-05", name: "Combos", slug: "combos", icon: "Package" },
  { id: "cat-06", name: "Bebidas", slug: "bebidas", icon: "Coffee" },
];

// ── Products ─────────────────────────────────────────────────────────────────

export const mockProducts: StorefrontProduct[] = [
  {
    id: "prod-01",
    name: "Pizza de Res y Jalapeños",
    slug: "pizza-res-jalapenos",
    price: 35000,
    originalPrice: 42000,
    images: [{ url: ASSETS.products[0], sort_order: 0 }],
    inStock: true,
    description:
      "Deliciosa pizza con carne de res premium, jalapeños frescos, queso mozzarella y salsa de tomate artesanal. Un toque de picante que te va a encantar.",
    rating: 4.9,
    reviewCount: 1247,
    inWishlist: false,
    categoryId: "cat-01",
  },
  {
    id: "prod-02",
    name: "Pizza Fajita de Pollo",
    slug: "pizza-fajita-pollo",
    price: 32000,
    originalPrice: null,
    images: [{ url: ASSETS.products[1], sort_order: 0 }],
    inStock: true,
    description:
      "Pizza con pollo a las fajitas, pimientos, cebolla caramelizada y crema de cilantro. Sabor mexicano en cada mordida.",
    rating: 4.8,
    reviewCount: 893,
    inWishlist: false,
    categoryId: "cat-01",
  },
  {
    id: "prod-03",
    name: "Pizza Tikka Masala",
    slug: "pizza-tikka-masala",
    price: 38000,
    originalPrice: 45000,
    images: [{ url: ASSETS.products[2], sort_order: 0 }],
    inStock: true,
    description:
      "Fusión Indo-Italiana con pollo tikka, salsa masala, queso paneer y cilantro fresco. Una experiencia única.",
    rating: 4.7,
    reviewCount: 562,
    inWishlist: false,
    categoryId: "cat-01",
  },
  {
    id: "prod-04",
    name: "Pizza Vegetariana Deluxe",
    slug: "pizza-vegetariana-deluxe",
    price: 28000,
    originalPrice: null,
    images: [{ url: ASSETS.products[3], sort_order: 0 }],
    inStock: true,
    description:
      "Combinación perfecta de vegetales frescos, aceitunas, champiñones, pimientos y queso gratinado. Sin carne, con todo el sabor.",
    rating: 4.6,
    reviewCount: 431,
    inWishlist: false,
    categoryId: "cat-04",
  },
  {
    id: "prod-05",
    name: "Fajita Supreme al Horno",
    slug: "fajita-supreme-horno",
    price: 42000,
    originalPrice: 50000,
    images: [{ url: ASSETS.products[4], sort_order: 0 }],
    inStock: true,
    description:
      "Bandeja de fajitas supreme con pollo, res, camarones y todo el acompañamiento. Para compartir o disfrutar solo.",
    rating: 5.0,
    reviewCount: 7932,
    inWishlist: false,
    categoryId: "cat-03",
  },
  {
    id: "prod-06",
    name: "Pizza BBQ con Tocineta",
    slug: "pizza-bbq-tocineta",
    price: 36000,
    originalPrice: null,
    images: [{ url: ASSETS.products[5], sort_order: 0 }],
    inStock: false,
    description:
      "Pizza con salsa BBQ ahumada, tocineta crujiente, cebolla morada y queso gouda. El favorito de la casa.",
    rating: 4.8,
    reviewCount: 1089,
    inWishlist: false,
    categoryId: "cat-01",
  },
];

// ── Detail Product ────────────────────────────────────────────────────────────

export const mockDetailProduct: StorefrontProduct = {
  id: "prod-05",
  name: "Fajita Supreme al Horno",
  slug: "fajita-supreme-horno",
  price: 42000,
  originalPrice: 50000,
  images: [
    { url: ASSETS.products[4], sort_order: 0 },
    { url: ASSETS.products[0], sort_order: 1 },
    { url: ASSETS.products[1], sort_order: 2 },
  ],
  inStock: true,
  description:
    "Bandeja de fajitas supreme con pollo, res, camarones y todo el acompañamiento. Para compartir o disfrutar solo. Incluye tortillas, guacamole, crema ácida y pico de gallo.",
  rating: 5.0,
  reviewCount: 7932,
  inWishlist: false,
  categoryId: "cat-03",
};

// ── Size Options ─────────────────────────────────────────────────────────────

export const mockSizeOptions: SizeOption[] = [
  { id: "s", label: "S" },
  { id: "m", label: "M" },
  { id: "l", label: "L" },
  { id: "xl", label: "XL" },
];
