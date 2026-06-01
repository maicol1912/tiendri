// Electronics Classic Template — Mock Data
// All data centralized here. Components receive via props, never import directly.

import type {
  StorefrontStore,
  StorefrontCategory,
  StorefrontProduct,
  HeroBanner,
  PromoBanner,
  FeatureCard,
  Testimonial,
  BrandLogo,
  ProductSection,
  ProductReview,
  ProductFeature,
  ProductAbout,
  FeatureShowcase,
} from "../types";
import { ASSETS } from "./assets";

// -- Store info ---------------------------------------------------------------

export const mockStore: StorefrontStore = {
  name: "TronMart",
  logo: null,
  slug: "tronmart",
  whatsapp: "573001234567",
  phone: "1-002-345-45235",
  social_links: {
    instagram: "https://instagram.com/tronmart",
    facebook: "https://facebook.com/tronmart",
  },
};

// -- Hero banner --------------------------------------------------------------

export const mockHeroBanner: HeroBanner = {
  id: "hero-1",
  image: ASSETS.hero.banner,
  headline: "El mejor sistema de entretenimiento para tu hogar",
  subtext: "Encuentra los mejores equipos de electrónica al mejor precio. Envío gratis en compras mayores a $200.000.",
  ctaLabel: "Comprar ahora",
};

// -- Categories ---------------------------------------------------------------

export const mockCategories: StorefrontCategory[] = [
  {
    id: "air-conditioner",
    name: "Aire acondicionado",
    image: ASSETS.categories.airConditioner,
    productCount: 24,
  },
  {
    id: "audio-video",
    name: "Audio & Video",
    image: ASSETS.categories.audioVideo,
    productCount: 68,
  },
  {
    id: "gadgets",
    name: "Gadgets",
    image: ASSETS.categories.gadgets,
    productCount: 145,
  },
  {
    id: "home-appliances",
    name: "Electrodomésticos",
    image: ASSETS.categories.homeAppliances,
    productCount: 92,
  },
  {
    id: "kitchen",
    name: "Cocina",
    image: ASSETS.categories.kitchen,
    productCount: 57,
  },
  {
    id: "pc-laptop",
    name: "PC & Laptop",
    image: ASSETS.categories.pcLaptop,
    productCount: 83,
  },
  {
    id: "refrigerator",
    name: "Refrigeradores",
    image: ASSETS.categories.refrigerator,
    productCount: 31,
  },
  {
    id: "smart-home",
    name: "Smart Home",
    image: ASSETS.categories.smartHome,
    productCount: 44,
  },
];

// -- Products -----------------------------------------------------------------

export const mockProducts: StorefrontProduct[] = [
  {
    id: "p1",
    name: "Audífonos Inalámbricos Premium Bluetooth 5.0 con Cancelación de Ruido",
    price: 189000,
    compare_at_price: 249000,
    images: [{ url: ASSETS.products.headphones, sort_order: 0 }],
    available: true,
    description: "Audífonos de alta fidelidad con cancelación activa de ruido, 30 horas de batería y conexión multipunto.",
    rating: 4.5,
    reviewCount: 128,
    category: "Audio & Video",
  },
  {
    id: "p2",
    name: "Parlante Bluetooth para el Hogar con Sonido 360°",
    price: 245000,
    compare_at_price: null,
    images: [{ url: ASSETS.products.homeSpeaker, sort_order: 0 }],
    available: true,
    description: "Parlante inalámbrico con sonido envolvente, resistente al agua IPX7 y 12 horas de batería.",
    rating: 4.2,
    reviewCount: 56,
    category: "Audio & Video",
  },
  {
    id: "p3",
    name: "Parlante Inteligente con Asistente de Voz Integrado",
    price: 320000,
    compare_at_price: null,
    images: [{ url: ASSETS.products.smartSpeaker, sort_order: 0 }],
    available: true,
    description: "Control total de tu hogar con comandos de voz. Compatible con dispositivos smart home.",
    rating: 4.7,
    reviewCount: 89,
    category: "Smart Home",
  },
  {
    id: "p4",
    name: "Barra de Sonido 2.1 con Subwoofer Inalámbrico 300W",
    price: 599000,
    compare_at_price: 750000,
    images: [{ url: ASSETS.products.soundbar1, sort_order: 0 }],
    available: true,
    description: "Barra de sonido con subwoofer inalámbrico, Dolby Atmos y conectividad HDMI ARC.",
    rating: 4.8,
    reviewCount: 204,
    category: "Audio & Video",
  },
  {
    id: "p5",
    name: "Televisor Smart TV 4K UHD 55 pulgadas",
    price: 1890000,
    compare_at_price: 2200000,
    images: [{ url: ASSETS.products.tv, sort_order: 0 }],
    available: true,
    description: "Smart TV con resolución 4K, HDR10+, sistema operativo integrado y 4 puertos HDMI.",
    rating: 4.6,
    reviewCount: 312,
    category: "Audio & Video",
  },
  {
    id: "p6",
    name: "Lavadora Digital de Carga Frontal 9kg Eficiencia A+++",
    price: 1450000,
    compare_at_price: null,
    images: [{ url: ASSETS.products.washer, sort_order: 0 }],
    available: true,
    description: "Lavadora inteligente con conexión WiFi, 15 programas de lavado y ciclo de vapor.",
    rating: 4.4,
    reviewCount: 167,
    category: "Electrodomésticos",
  },
  {
    id: "p7",
    name: "Aire Acondicionado Inverter 12000 BTU con WiFi",
    price: 1200000,
    compare_at_price: 1499000,
    images: [{ url: ASSETS.products.ac1, sort_order: 0 }],
    available: true,
    description: "A/C inverter de alta eficiencia energética, control remoto y app móvil incluida.",
    rating: 4.3,
    reviewCount: 98,
    category: "Aire acondicionado",
  },
  {
    id: "p8",
    name: "Aire Acondicionado Portátil 9000 BTU",
    price: 850000,
    compare_at_price: null,
    images: [{ url: ASSETS.products.ac2, sort_order: 0 }],
    available: true,
    description: "Aire acondicionado portátil, fácil instalación y bajo consumo energético.",
    rating: 3.9,
    reviewCount: 45,
    category: "Aire acondicionado",
  },
  {
    id: "p9",
    name: "Juego de Ollas Antiadherentes de Acero Inoxidable 8 piezas",
    price: 320000,
    compare_at_price: null,
    images: [{ url: ASSETS.products.kitchen1, sort_order: 0 }],
    available: true,
    description: "Set completo de cocina en acero inoxidable con recubrimiento antiadherente de cerámica.",
    rating: 4.5,
    reviewCount: 73,
    category: "Cocina",
  },
  {
    id: "p10",
    name: "Licuadora de Alta Potencia 1000W con Vaso de Vidrio",
    price: 175000,
    compare_at_price: 220000,
    images: [{ url: ASSETS.products.kitchen2, sort_order: 0 }],
    available: true,
    description: "Licuadora potente para smoothies, sopas y bebidas. Incluye vaso de 2L y vaso personal.",
    rating: 4.1,
    reviewCount: 92,
    category: "Cocina",
  },
  {
    id: "p11",
    name: "Cámara de Seguridad IP 4K con Visión Nocturna",
    price: 280000,
    compare_at_price: null,
    images: [{ url: ASSETS.products.camera1, sort_order: 0 }],
    available: true,
    description: "Cámara de vigilancia 4K con detección de movimiento, visión nocturna y almacenamiento en la nube.",
    rating: 4.6,
    reviewCount: 134,
    category: "Smart Home",
  },
  {
    id: "p12",
    name: "Cámara de Acción 4K con Estabilizador de Imagen",
    price: 450000,
    compare_at_price: 560000,
    images: [{ url: ASSETS.products.camera2, sort_order: 0 }],
    available: true,
    description: "Cámara de acción resistente al agua con grabación 4K60fps y estabilización electrónica.",
    rating: 4.7,
    reviewCount: 201,
    category: "Gadgets",
  },
  {
    id: "p13",
    name: "Smartphone 5G Pantalla AMOLED 6.7 pulgadas 256GB",
    price: 2100000,
    compare_at_price: 2500000,
    images: [{ url: ASSETS.products.smartphone5g, sort_order: 0 }],
    available: true,
    description: "Smartphone flagship con procesador Snapdragon, cámara triple 200MP y batería de 5000mAh.",
    rating: 4.8,
    reviewCount: 445,
    category: "Gadgets",
  },
  {
    id: "p14",
    name: "Teléfono Celular Gama Media 128GB Pantalla 6.5\"",
    price: 890000,
    compare_at_price: null,
    images: [{ url: ASSETS.products.phone1, sort_order: 0 }],
    available: true,
    description: "Celular de gama media con excelente relación calidad-precio, batería de 4500mAh y cámara triple.",
    rating: 4.0,
    reviewCount: 178,
    category: "Gadgets",
  },
  {
    id: "p15",
    name: "Afeitadora Eléctrica Recargable con Cabezal Flotante",
    price: 145000,
    compare_at_price: null,
    images: [{ url: ASSETS.products.trimmer, sort_order: 0 }],
    available: true,
    description: "Afeitadora de precisión con 3 cabezales flotantes, recargable USB y apta para uso húmedo/seco.",
    rating: 4.3,
    reviewCount: 67,
    category: "Gadgets",
  },
  {
    id: "p16",
    name: "Barra de Sonido Slim 120W con Bluetooth y Control Remoto",
    price: 380000,
    compare_at_price: 480000,
    images: [{ url: ASSETS.products.soundbar2, sort_order: 0 }],
    available: true,
    description: "Barra de sonido delgada con potencia de 120W, ecualizador de 5 bandas y modos de sonido predefinidos.",
    rating: 4.2,
    reviewCount: 89,
    category: "Audio & Video",
  },
];

// -- Product sections ---------------------------------------------------------

export const mockProductSections: ProductSection[] = [
  {
    id: "deals",
    title: "Las mejores ofertas de hoy",
    products: mockProducts.slice(0, 4),
  },
  {
    id: "audio-video",
    title: "Audio & Video",
    products: mockProducts.filter((p) => p.category === "Audio & Video").slice(0, 4),
  },
  {
    id: "home-appliances",
    title: "Electrodomésticos",
    products: mockProducts.filter((p) => p.category === "Electrodomésticos").slice(0, 4),
  },
  {
    id: "kitchen",
    title: "Cocina",
    products: mockProducts.filter((p) => p.category === "Cocina").slice(0, 4),
  },
  {
    id: "gadgets",
    title: "Gadgets y tecnología",
    products: mockProducts.filter((p) => p.category === "Gadgets").slice(0, 4),
  },
];

// -- Feature cards ------------------------------------------------------------

export const mockFeatureCards: FeatureCard[] = [
  {
    id: "fc-1",
    title: "Audífonos inalámbricos",
    image: ASSETS.features.headphones,
    bgColor: "#E8F0FE",
  },
  {
    id: "fc-2",
    title: "Cuidado personal",
    image: ASSETS.features.grooming,
    bgColor: "#F0F4FF",
  },
  {
    id: "fc-3",
    title: "Videojuegos",
    image: ASSETS.features.videogames,
    bgColor: "#FFF3E0",
  },
];

// -- Promo banner -------------------------------------------------------------

export const mockPromoBanner: PromoBanner = {
  id: "promo-1",
  headline: "Ahorra hasta $200.000 en lavadoras Samsung seleccionadas",
  subtext: "Oferta válida hasta agotar existencias. Aplican restricciones.",
  ctaLabel: "Comprar ahora",
  image: ASSETS.promo.samsungWasher,
  bgColor: "#F5F5F5",
};

// -- Testimonials -------------------------------------------------------------

export const mockTestimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Carlos Pérez",
    role: "Comprador verificado",
    avatar: null,
    text: "Excelente servicio y los productos llegaron en perfectas condiciones. La calidad de los audífonos es increíble, superó mis expectativas. Los recomiendo totalmente.",
    rating: 5,
  },
  {
    id: "t2",
    name: "María García",
    role: "Compradora frecuente",
    avatar: null,
    text: "Llevo 3 años comprando en TronMart y nunca me han fallado. El soporte al cliente es excelente y los precios son muy competitivos. Mi tienda favorita de electrónica.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Juan Rodríguez",
    role: "Comprador verificado",
    avatar: null,
    text: "La lavadora que compré llegó bien empacada y el técnico que vino a instalarla fue muy profesional. Muy buenos precios comparado con otras tiendas.",
    rating: 4,
  },
];

// -- Brands -------------------------------------------------------------------

export const mockBrands: BrandLogo[] = [
  { id: "b1", name: "Samsung", image: "" },
  { id: "b2", name: "Sony", image: "" },
  { id: "b3", name: "LG", image: "" },
  { id: "b4", name: "Apple", image: "" },
  { id: "b5", name: "Bose", image: "" },
  { id: "b6", name: "Xiaomi", image: "" },
];

// -- Product detail mock ------------------------------------------------------

export const mockDetailProduct: StorefrontProduct = {
  id: "p15",
  name: "Afeitadora Eléctrica Recargable con Cabezal Flotante",
  price: 145000,
  compare_at_price: 185000,
  images: [
    { url: ASSETS.products.trimmer, sort_order: 0 },
    { url: ASSETS.products.detailTrimmer, sort_order: 1 },
    { url: ASSETS.products.detailGallery, sort_order: 2 },
  ],
  available: true,
  description: "Afeitadora de precisión con 3 cabezales flotantes, recargable USB y apta para uso húmedo/seco.",
  rating: 4.3,
  reviewCount: 67,
  category: "Gadgets",
};

export const mockKeyFeatures: string[] = [
  "Cabezales flotantes auto-ajustables para el contorno de la cara",
  "Tecnología de corte con cuchillas de tungsteno de alta precisión",
  "Recargable por USB — cable incluido, compatible con powerbank",
  "Uso húmedo y seco — lavable bajo el chorro de agua",
  "Pantalla LED que indica nivel de batería",
];

export const mockProductAbout: ProductAbout = {
  headline: "Diseñado para un afeitado perfecto",
  description:
    "Nuestra afeitadora eléctrica combina tecnología de punta con un diseño ergonómico para ofrecerte la experiencia de afeitado más cómoda y precisa. Los cabezales flotantes se adaptan automáticamente al contorno de tu rostro, garantizando un corte uniforme sin irritaciones.",
  image: ASSETS.products.detailTrimmer,
  caption: "Tecnología de cabezales flotantes de última generación",
  subcaption: "Tres cabezales independientes que se adaptan a cada curva de tu rostro para un afeitado más cercano",
};

export const mockProductFeatures: ProductFeature[] = [
  { id: "pf1", label: "3 cabezales flotantes independientes" },
  { id: "pf2", label: "60 minutos de autonomía con carga completa" },
  { id: "pf3", label: "Carga rápida: 5 minutos para 1 afeitado" },
  { id: "pf4", label: "IPX7 — completamente sumergible" },
  { id: "pf5", label: "Incluye funda de viaje y cable USB-C" },
];

export const mockFeaturesDescription =
  "Cada detalle fue pensado para simplificar tu rutina matutina y darte resultados profesionales en casa.";

export const mockFeatureShowcase: FeatureShowcase = {
  id: "fs1",
  subtitle: "Tecnología de punta",
  headline: "Cabezales que se mueven con tu piel",
  description: "Los cabezales oscilan en 5 direcciones para seguir cada curva del rostro sin presión excesiva.",
  image: ASSETS.products.detailGallery,
};

export const mockProductReviews: ProductReview[] = [
  {
    id: "r1",
    name: "Andrés M.",
    rating: 5,
    comment: "Excelente afeitadora, muy silenciosa y el corte es preciso. La batería dura mucho más de lo que esperaba.",
    date: "15 May 2025",
  },
  {
    id: "r2",
    name: "Felipe R.",
    rating: 4,
    comment: "Muy buena calidad para el precio. Los cabezales son suaves en la piel. Le doy 4 estrellas porque el tiempo de carga podría ser menor.",
    date: "3 Abr 2025",
  },
];
