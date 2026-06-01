// Pet V3 Template — Complete Mock Store Data
// All content lives here — zero hardcoded strings in components.

import { ASSETS } from "./assets";
import type {
  StoreInfo,
  StorefrontProduct,
  TrendingItem,
  PetType,
  PetCategory,
  PromoBannerData,
} from "../types";

// -- Store Info ---------------------------------------------------------------

export const mockStore: StoreInfo = {
  name: "Pet Shop",
  slug: "pet-shop",
  logo: ASSETS.logo,
  description:
    "Tu tienda de mascotas favorita. Encuentra todo lo que necesitas para el cuidado de tus amigos peludos.",
  whatsapp: "573001234567",
  social_links: {
    instagram: "https://instagram.com/petshop",
    facebook: "https://facebook.com/petshop",
    tiktok: "https://tiktok.com/@petshop",
  },
};

// -- Promo Banner -------------------------------------------------------------

export const mockPromoBanner: PromoBannerData = {
  title: "Symply Adult Lamb",
  subtitle: "20% de descuento",
  image: ASSETS.promoBanner,
};

// -- Trending Items -----------------------------------------------------------

export const mockTrendingItems: TrendingItem[] = [
  {
    id: "trending-01",
    title: "Juguetes ecologicos",
    subtitle: "Amigable con el planeta",
    image: ASSETS.trending.ecoToys,
  },
  {
    id: "trending-02",
    title: "Proteccion contra parasitos",
    subtitle: "Mantelos protegidos",
    image: ASSETS.trending.parasite,
  },
  {
    id: "trending-03",
    title: "Hora del cachorro",
    subtitle: "Todo para los mas pequenos",
    image: ASSETS.trending.puppyHour,
  },
];

// -- Pet Types ----------------------------------------------------------------

export const mockPetTypes: PetType[] = [
  {
    id: "pet-dog",
    label: "Perros",
    image: ASSETS.petTypes.dog,
    bgColor: "#FFF3E0",
  },
  {
    id: "pet-cat",
    label: "Gatos",
    image: ASSETS.petTypes.cat,
    bgColor: "#E8F5E9",
  },
];

// -- Categories ---------------------------------------------------------------

export const mockCategories: PetCategory[] = [
  {
    id: "cat-01",
    name: "Comida para perro",
    slug: "dog-food",
    image: ASSETS.categories.dogFood,
    bgColor: "#FFF9E6",
    borderColor: "#FFE0B2",
  },
  {
    id: "cat-02",
    name: "Higiene canina",
    slug: "dog-grooming",
    image: ASSETS.categories.dogGrooming,
    bgColor: "#F3E5F5",
    borderColor: "#E1BEE7",
  },
  {
    id: "cat-03",
    name: "Tratamientos",
    slug: "dog-treatment",
    image: ASSETS.categories.dogTreatment,
    bgColor: "#E8F5E9",
    borderColor: "#C8E6C9",
  },
  {
    id: "cat-04",
    name: "Snacks",
    slug: "dog-treats",
    image: ASSETS.categories.dogTreats,
    bgColor: "#FFF3E0",
    borderColor: "#FFE0B2",
  },
  {
    id: "cat-05",
    name: "Bebidas",
    slug: "beverages",
    image: ASSETS.categories.beverages,
    bgColor: "#E3F2FD",
    borderColor: "#BBDEFB",
  },
  {
    id: "cat-06",
    name: "Lacteos y huevos",
    slug: "dairy-eggs",
    image: ASSETS.categories.dairyEggs,
    bgColor: "#FBE9E7",
    borderColor: "#FFCCBC",
  },
];

// -- Products -----------------------------------------------------------------

export const mockProducts: StorefrontProduct[] = [
  {
    id: "prod-01",
    name: "Symply Adult Lamb",
    slug: "symply-adult-lamb",
    price: 89900,
    originalPrice: 109900,
    images: [{ url: ASSETS.products.symply, sort_order: 0 }],
    description:
      "Alimento premium para perros adultos a base de cordero. Formula natural sin colorantes artificiales.",
    subtitle: "12kg",
    rating: 4.5,
    reviewCount: 28,
    inStock: true,
    categoryId: "cat-01",
  },
  {
    id: "prod-02",
    name: "Royal Canin Medium Adult",
    slug: "royal-canin-medium",
    price: 125000,
    images: [{ url: ASSETS.products.royalCanin, sort_order: 0 }],
    description: "Alimento balanceado para perros medianos adultos.",
    subtitle: "15kg",
    rating: 4.8,
    reviewCount: 45,
    inStock: true,
    categoryId: "cat-01",
  },
  {
    id: "prod-03",
    name: "Shampoo Anti Pulgas",
    slug: "shampoo-anti-pulgas",
    price: 24900,
    originalPrice: 32000,
    images: [{ url: ASSETS.products.shampoo, sort_order: 0 }],
    description: "Shampoo medicado contra pulgas y garrapatas.",
    subtitle: "500ml",
    rating: 4.2,
    reviewCount: 15,
    inStock: true,
    categoryId: "cat-02",
  },
  {
    id: "prod-04",
    name: "Huesos Dentales",
    slug: "huesos-dentales",
    price: 18500,
    images: [{ url: ASSETS.products.huesos, sort_order: 0 }],
    description: "Huesos masticables para limpieza dental.",
    subtitle: "6 unidades",
    rating: 4.6,
    reviewCount: 32,
    inStock: true,
    categoryId: "cat-04",
  },
  {
    id: "prod-05",
    name: "Collar Anti Parasitos",
    slug: "collar-anti-parasitos",
    price: 45000,
    originalPrice: 55000,
    images: [{ url: ASSETS.products.collar, sort_order: 0 }],
    description: "Collar antiparasitario de larga duracion.",
    subtitle: "1 unidad",
    rating: 4.7,
    reviewCount: 22,
    inStock: true,
    categoryId: "cat-03",
  },
  {
    id: "prod-06",
    name: "Cama Ortopedica",
    slug: "cama-ortopedica",
    price: 159000,
    images: [{ url: ASSETS.products.cama, sort_order: 0 }],
    description: "Cama ortopedica con espuma de memoria para perros grandes.",
    rating: 4.9,
    reviewCount: 18,
    inStock: true,
  },
  {
    id: "prod-07",
    name: "Whiskas Adulto Salmon",
    slug: "whiskas-adulto-salmon",
    price: 32000,
    images: [{ url: ASSETS.products.whiskas, sort_order: 0 }],
    description: "Alimento humedo para gatos adultos sabor salmon.",
    subtitle: "1.5kg",
    rating: 4.4,
    reviewCount: 38,
    inStock: true,
  },
  {
    id: "prod-08",
    name: "Juguete Interactivo",
    slug: "juguete-interactivo",
    price: 28900,
    originalPrice: 35000,
    images: [{ url: ASSETS.products.juguete, sort_order: 0 }],
    description: "Juguete interactivo dispensador de premios para perros.",
    rating: 4.3,
    reviewCount: 12,
    inStock: true,
  },
];
