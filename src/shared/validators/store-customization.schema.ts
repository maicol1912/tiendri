// Zod v4 validation schemas for store customization sections.
// All schemas validate server-side before any Supabase mutation.
// Error codes follow tiendri-rules.md §3.2.

import { z } from "zod";

// ── Allowed values ─────────────────────────────────────────────────────────────

const ALLOWED_PAYMENT_METHODS = [
  "nequi",
  "daviplata",
  "efectivo",
  "transferencia",
  "tarjeta",
] as const;

// ISO 4217 currency codes supported by Tiendri
const ALLOWED_CURRENCIES = [
  "COP",
  "USD",
  "EUR",
  "MXN",
  "ARS",
  "BRL",
  "CLP",
  "PEN",
] as const;

// ── Helpers ────────────────────────────────────────────────────────────────────

/** Optional HTTPS URL or empty string (for social links that can be cleared) */
const optionalUrl = z
  .string()
  .url("Debe ser una URL válida")
  .or(z.literal(""))
  .optional();

/** Optional Storage URL — must be a valid URL when present */
const storageUrl = z.string().url("Debe ser una URL válida").optional();

// ── Branding schema ────────────────────────────────────────────────────────────

export const brandingSchema = z.object({
  logo: storageUrl,
  storeName: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(80, "El nombre no puede superar los 80 caracteres")
    .optional(),
  description: z
    .string()
    .max(120, "La descripción no puede superar los 120 caracteres")
    .optional(),
  favicon: storageUrl,
  whatsapp: z
    .string()
    .regex(
      /^57\d{10}$/,
      "El número debe incluir el prefijo de país (ej: 573001234567)"
    )
    .optional(),
  socialLinks: z
    .object({
      instagram: optionalUrl,
      facebook: optionalUrl,
      tiktok: optionalUrl,
      twitter: optionalUrl,
      youtube: optionalUrl,
    })
    .optional(),
});

export type BrandingInput = z.infer<typeof brandingSchema>;

// ── Content schema ─────────────────────────────────────────────────────────────

const heroBannerSchema = z.object({
  title: z.string().max(80, "El título no puede superar los 80 caracteres").optional(),
  subtitle: z
    .string()
    .max(160, "El subtítulo no puede superar los 160 caracteres")
    .optional(),
  image: storageUrl,
  ctaText: z
    .string()
    .max(40, "El texto del botón no puede superar los 40 caracteres")
    .optional(),
});

const promotionalBannerSchema = z.object({
  image: storageUrl,
  title: z.string().max(80, "El título no puede superar los 80 caracteres").optional(),
  subtitle: z.string().max(160, "El subtítulo no puede superar los 160 caracteres").optional(),
  link: z.string().url("Debe ser una URL válida").optional(),
});

const offersBannerSchema = z.object({
  desktopImage: storageUrl,
  mobileImage: storageUrl,
  title: z.string().max(80, "El título no puede superar los 80 caracteres").optional(),
  subtitle: z.string().max(160, "El subtítulo no puede superar los 160 caracteres").optional(),
  ctaText: z
    .string()
    .max(40, "El texto del botón no puede superar los 40 caracteres")
    .optional(),
});

const navLinkSchema = z.object({
  label: z.string().min(1, "El nombre del enlace es obligatorio").max(40),
  href: z.string().min(1, "La URL del enlace es obligatoria"),
});

const productTabSchema = z.object({
  id: z.string().min(1, "El id de la pestaña es obligatorio"),
  label: z.string().min(1, "El nombre de la pestaña es obligatorio").max(40),
});

export const contentSchema = z.object({
  heroBanner: heroBannerSchema.optional(),
  promotionalBanners: z
    .array(promotionalBannerSchema)
    .max(4, "Se permiten máximo 4 banners promocionales")
    .optional(),
  offersBanner: offersBannerSchema.optional(),
  featuredProductIds: z.array(z.string()).optional(),
  popularProductIds: z.array(z.string()).optional(),
  discountProductIds: z.array(z.string()).optional(),
  navLinks: z.array(navLinkSchema).optional(),
  footerServices: z.array(z.string().max(60)).optional(),
  footerAssistance: z.array(z.string().max(60)).optional(),
  productTabs: z.array(productTabSchema).optional(),
  popularSearches: z.array(z.string().max(60)).optional(),
});

export type ContentInput = z.infer<typeof contentSchema>;

// ── Business schema ────────────────────────────────────────────────────────────

const shippingInfoSchema = z.object({
  cost: z.string().max(60).optional(),
  estimatedTime: z.string().max(60).optional(),
  freeAbove: z.string().max(60).optional(),
});

export const businessSchema = z.object({
  city: z.string().max(80, "La ciudad no puede superar los 80 caracteres").optional(),
  address: z
    .string()
    .max(160, "La dirección no puede superar los 160 caracteres")
    .optional(),
  hours: z
    .string()
    .max(120, "El horario no puede superar los 120 caracteres")
    .optional(),
  paymentMethods: z
    .array(z.enum(ALLOWED_PAYMENT_METHODS))
    .optional(),
  shippingInfo: shippingInfoSchema.optional(),
  currency: z
    .enum(ALLOWED_CURRENCIES, {
      error: "Código de moneda inválido",
    })
    .optional(),
});

export type BusinessInput = z.infer<typeof businessSchema>;

// ── Theme schema ───────────────────────────────────────────────────────────────

/** Hex color string — e.g. "#A3B1C6" */
const hexColor = z
  .string()
  .regex(/^#[0-9A-Fa-f]{6}$/, "Debe ser un color hexadecimal válido (ej: #A3B1C6)")
  .optional();

/** CSS pixel value — e.g. "12px". Must be a non-negative integer. */
const cssPixelValue = z
  .string()
  .regex(/^\d+px$/, "Debe ser un valor en píxeles (ej: 12px)")
  .optional();

export const themeSchema = z.object({
  paletteId: z.string().max(60, "ID de paleta inválido").optional(),
  colors: z
    .object({
      primary: hexColor,
      secondary: hexColor,
      background: hexColor,
      foreground: hexColor,
      card: hexColor,
      border: hexColor,
      muted: hexColor,
      accent: hexColor,
      onPrimary: hexColor,
    })
    .optional(),
  radius: z
    .object({
      card: cssPixelValue,
      category: cssPixelValue,
      button: cssPixelValue,
    })
    .optional(),
  fontPair: z
    .enum(["elegante", "editorial", "atemporal", "minimalista", "preciso", "contemporaneo", "audaz", "urbano", "dramatico", "llamativo", "amigable", "artesanal", "jugueton", "clasico", "profesional"], {
      error: "Par de fuentes inválido",
    })
    .optional(),
  typography: z
    .object({
      headingWeight: z.number().int().min(100).max(900).optional(),
      headingScale: z.enum(["sm", "md", "lg", "xl", "2xl"]).optional(),
      headingTransform: z.enum(["none", "uppercase", "capitalize"]).optional(),
    })
    .optional(),
  bodyFontSize: z.enum(["sm", "base", "lg"]).optional(),
  headingSpacing: z.enum(["tight", "normal", "wide"]).optional(),
  bodyFontWeight: z.union([z.literal(300), z.literal(400), z.literal(500)]).optional(),
  fontSizeContrast: z.enum(["low", "medium", "high", "extreme"]).optional(),
  colorStrategy: z.enum(["monotone", "duotone", "accent-pop", "gradient"]).optional(),
  backgroundTreatment: z.enum(["solid", "subtle-gradient", "pattern"]).optional(),
  cardBackground: z.enum(["white", "surface", "transparent", "primary-tint"]).optional(),
  imageOverlayHover: z.enum(["none", "dark-scrim", "color-tint", "blur"]).optional(),
  accentDistribution: z.enum(["buttons-only", "badges-and-buttons", "everywhere", "minimal"]).optional(),
});

export type ThemeInput = z.infer<typeof themeSchema>;

// ── Layout schema ──────────────────────────────────────────────────────────────

const layoutOptionsSchema = z.object({
  // Fields still in TemplateLayoutConfig
  cardImageRatio: z.enum(["square", "portrait", "wide"]).optional(),
  cardVariant: z.enum(["minimal", "detailed", "overlay", "horizontal"]).optional(),
  categoryVariant: z.enum(["grid-icons", "horizontal-scroll", "cards-with-image", "text-list"]).optional(),
  gridDensity: z.enum(["compact", "standard", "spacious"]).optional(),
  spacingDensity: z.enum(["tight", "normal", "airy"]).optional(),
  borderRadiusScale: z.enum(["sharp", "xs", "sm", "md", "lg", "xl", "pill"]).optional(),
  dividerStyle: z.enum(["none", "line", "dots", "dash"]).optional(),
  imageFit: z.enum(["cover", "contain"]).optional(),
  imageBorderRadius: z.enum(["same-as-card", "none", "rounded", "circle"]).optional(),
  cardBorderTreatment: z.enum(["none", "subtle", "prominent", "left-accent", "top-accent"]).optional(),
  cardPadding: z.enum(["none", "tight", "normal", "spacious"]).optional(),
}).optional();

const structuralVariantsSchema = z.object({
  cardContentLayout: z.enum(["below-image", "overlay-bottom", "overlay-full", "side-by-side"]).optional(),
  heroVariant: z.enum(["full-bleed", "contained", "split", "text-only"]).optional(),
  categoryNavStyle: z.enum(["horizontal-scroll", "grid", "tabs", "chips"]).optional(),
  addToCartStyle: z.enum(["full-width", "icon-button", "floating-fab", "on-hover-only"]).optional(),
}).optional();

const gridColumnsSchema = z.object({
  mobile: z.number().int().min(1).max(6).optional(),
  desktop: z.number().int().min(1).max(6).optional(),
}).optional();

const gridSchema = z.object({
  products: gridColumnsSchema,
  categories: gridColumnsSchema,
  listing: gridColumnsSchema,
  search: gridColumnsSchema,
}).optional();

export const layoutCustomizationSchema = z.object({
  density: z.enum(["compact", "balanced", "spacious"]).optional(),
  containerMaxWidth: z.enum(["narrow", "medium", "wide", "full"]).optional(),
  gridColumnsMobile: z.union([z.literal(1), z.literal(2)]).optional(),
  gridColumnsDesktop: z.union([z.literal(2), z.literal(3), z.literal(4), z.literal(5)]).optional(),
  grid: gridSchema,
  layout: layoutOptionsSchema,
  structuralVariants: structuralVariantsSchema,
});

export type LayoutCustomizationInput = z.infer<typeof layoutCustomizationSchema>;

// ── Section config schema ──────────────────────────────────────────────────────

/**
 * Validates a single section entry (id + visibility + optional per-section config).
 * The `config` field is intentionally permissive — each section defines its own
 * field schema via TemplateConfigSchema.sectionSchemas; we only need to confirm
 * the value is a string-keyed record of unknown values.
 */
const sectionConfigSchema = z.object({
  id: z.string().min(1, "El id de sección es obligatorio"),
  visible: z.boolean(),
  config: z.record(z.string(), z.unknown()).optional(),
});

// ── Combined store customization schema ────────────────────────────────────────

const baseStoreCustomizationSchema = z.object({
  templateId: z.string().min(1, "templateId es obligatorio"),
  branding: brandingSchema.optional(),
  content: contentSchema.optional(),
  business: businessSchema.optional(),
  theme: themeSchema.optional(),
  layout: layoutCustomizationSchema.optional(),
  appearance: z.enum(["light", "dark"]).optional(),
  sections: z.array(sectionConfigSchema).optional(),
});

export const storeCustomizationSchema = baseStoreCustomizationSchema;

export type StoreCustomizationInput = z.infer<typeof storeCustomizationSchema>;
