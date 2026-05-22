// Shared customization section types — no imports from template-config to avoid circular deps.
// Used by both StoreCustomization (merchant overrides) and TemplateConfig (template defaults).

/** Store identity and branding fields. All fields optional — unset values fall back to template defaults. */
export interface BrandingConfig {
  /** Public URL in Supabase Storage bucket `logos` */
  logo?: string;
  storeName?: string;
  description?: string;
  /** Public URL in Supabase Storage bucket `logos` */
  favicon?: string;
  /** Digit string with country prefix — e.g. "573001234567" */
  whatsapp?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    twitter?: string;
    youtube?: string;
  };
}

/** Hero banners, promotional banners, product selections, and navigation content. */
export interface ContentConfig {
  heroBanner?: {
    title?: string;
    subtitle?: string;
    /** Public URL in Supabase Storage bucket `banners` */
    image?: string;
    ctaText?: string;
  };
  promotionalBanners?: Array<{
    /** Public URL in Supabase Storage bucket `banners` */
    image?: string;
    title?: string;
    subtitle?: string;
    link?: string;
  }>;
  offersBanner?: {
    /** Public URL in Supabase Storage bucket `banners` */
    desktopImage?: string;
    /** Public URL in Supabase Storage bucket `banners` */
    mobileImage?: string;
    title?: string;
    subtitle?: string;
    ctaText?: string;
  };
  /** Product IDs to show in the featured products grid */
  featuredProductIds?: string[];
  /** Product IDs to show in the popular products section */
  popularProductIds?: string[];
  /** Product IDs to show in the discounts/offers section */
  discountProductIds?: string[];
  navLinks?: Array<{ label: string; href: string }>;
  footerServices?: string[];
  footerAssistance?: string[];
  productTabs?: Array<{ id: string; label: string }>;
  popularSearches?: string[];
}

/** Business info — used in JSON-LD, checkout trust signals, and SEO. */
export interface BusinessConfig {
  city?: string;
  address?: string;
  /** Free text — e.g. "Lun-Sab 9am-6pm" */
  hours?: string;
  /** Allowed values: nequi | daviplata | efectivo | transferencia | tarjeta */
  paymentMethods?: string[];
  shippingInfo?: {
    cost?: string;
    estimatedTime?: string;
    freeAbove?: string;
  };
  /** ISO 4217 currency code — default "COP" */
  currency?: string;
}
