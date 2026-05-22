# Customización por Merchant — Roadmap de implementación

Todo lo que un merchant debe poder personalizar desde su dashboard.

## Ya implementado (via config del template)

| Aspecto | Estado |
|---------|--------|
| Colores (32+ tokens via CSS vars --t-*) | Hecho |
| Border radius (card, category, button) | Hecho |
| Grid columns (products, categories, listing, search) | Hecho |
| Layout options (cardStyle, hoverEffect, imageRatio, tabStyle, bannerHeight, headerStyle, footerStyle) | Hecho |
| Orden de secciones (array configurable) | Hecho |
| Visibilidad de secciones (visible: true/false) | Hecho |
| Theme Customizer live (drawer flotante) | Hecho |
| resolveTemplateConfig() para merge defaults + overrides | Hecho |

---

## Por implementar — Identidad de marca (ALTA prioridad)

| Elemento | Qué personaliza | Dónde se ve |
|----------|-----------------|-------------|
| **Logo** | Imagen subida o texto | Header, footer, favicon |
| **Nombre de la tienda** | Texto | Header, meta, OG tags, footer, JSON-LD |
| **Descripción de la tienda** | Texto corto | Footer, SEO meta description, JSON-LD |
| **Favicon** | Ícono 32x32 | Pestaña del browser |
| **WhatsApp** | Número colombiano (57...) | Checkout, botón flotante |
| **Redes sociales** | URLs (Instagram, Facebook, TikTok, Twitter) | Footer, JSON-LD |

## Por implementar — Contenido visual (ALTA prioridad)

| Elemento | Qué personaliza | Dónde se ve |
|----------|-----------------|-------------|
| **Banner hero** | Imagen + título + subtítulo + CTA | Home hero section |
| **Banners promocionales** | Imágenes + textos (4 banners) | Home banner grid |
| **Banner de ofertas** | Imagen desktop + mobile | Home summer sale |
| **Productos destacados** | Cuáles aparecen en home | Home product grid |
| **Productos populares** | Cuáles aparecen + imagen + texto | Home popular section |
| **Productos en descuento** | Cuáles aparecen | Home discounts section |

## Por implementar — Tipografía y apariencia (MEDIA prioridad)

| Elemento | Opciones |
|----------|----------|
| **Par de fuentes** | modern (Inter+Space Grotesk), warm (Poppins+Playfair), elegant (DM Sans+Cormorant), functional (IBM Plex+Mono) |
| **Apariencia** | light / dark |
| **Template** | tech-premium, + los que se migren |

## Por implementar — Navegación y estructura (MEDIA prioridad)

| Elemento | Qué personaliza | Dónde se ve |
|----------|-----------------|-------------|
| **Links del navbar** | Labels + destinos | Header nav |
| **Modo catálogo** | Simple (plano) vs nested (jerárquico) | Toda la tienda |
| **Tabs de productos** | Labels ("Nuevos", "Más vendidos", etc.) | Home products section |
| **Sugerencias de búsqueda** | Términos populares | Search page |
| **Contenido del footer** | Listas de servicios + asistencia | Footer |

## Por implementar — Información de negocio (MEDIA prioridad)

| Elemento | Para qué |
|----------|----------|
| **Ciudad / dirección** | JSON-LD LocalBusiness, SEO local |
| **Horarios** | JSON-LD, confianza del cliente |
| **Métodos de pago** | Checkout info, confianza (Nequi, Daviplata, efectivo, etc.) |
| **Info de envío** | Costo, tiempo estimado — product detail + checkout |
| **Moneda** | Símbolo de precios ($ / COP) |

## Por implementar — Avanzado (post-MVP)

| Elemento | Descripción |
|----------|-------------|
| **Dominio custom** | mitienda.com en vez de tiendri.com/slug |
| **CSS custom** | Personalización avanzada para merchants técnicos |
| **Secciones custom** | Bloques de contenido libre (about, testimonios, etc.) |
| **Código de seguimiento** | Google Analytics, Meta Pixel, TikTok Pixel |
| **QR code personalizado** | Color, logo en el centro |
| **Multi-tienda** | Varias tiendas por usuario |

---

## Estructura en Supabase (StoreCustomization JSONB)

```typescript
interface StoreCustomization {
  templateId: string;

  // Ya implementado
  theme?: {
    colors?: Partial<TemplateColorTokens>;
    radius?: Partial<TemplateRadiusTokens>;
  };
  layout?: {
    grid?: Partial<TemplateGridConfig>;
    layout?: Partial<TemplateLayoutConfig>;
    sections?: SectionConfig[];
  };

  // Por implementar
  branding?: {
    logo?: string;              // URL en Supabase Storage
    storeName?: string;
    description?: string;
    favicon?: string;           // URL en Supabase Storage
    whatsapp?: string;          // 573001234567
    socialLinks?: {
      instagram?: string;
      facebook?: string;
      tiktok?: string;
      twitter?: string;
      youtube?: string;
    };
  };
  content?: {
    heroBanner?: {
      title?: string;
      subtitle?: string;
      image?: string;
      ctaText?: string;
    };
    navLinks?: { label: string; href: string }[];
    footerServices?: string[];
    footerAssistance?: string[];
    productTabs?: { id: string; label: string }[];
    popularSearches?: string[];
    featuredProductIds?: string[];
    popularProductIds?: string[];
    discountProductIds?: string[];
  };
  business?: {
    city?: string;
    address?: string;
    hours?: string;
    paymentMethods?: string[];
    shippingInfo?: string;
    currency?: string;          // "COP" default
  };
}
```

## Cómo funciona

1. Merchant edita desde el dashboard (`/dashboard/configuracion`)
2. Se guarda como JSONB en Supabase tabla `stores` columna `customization`
3. `resolveTemplateConfig(templateDefaults, storeCustomization)` mergea en runtime
4. El storefront live (`/[slug]`) recibe el config resuelto
5. CSS variables se inyectan, componentes renderizan con los valores del merchant

## Archivos a modificar

- `src/types/templates/store-customization.ts` — expandir con branding, content, business
- `src/lib/resolveTemplateConfig.ts` — expandir merge para nuevos campos
- `src/app/(dashboard)/dashboard/configuracion/` — UI del dashboard
- `src/app/[slug]/page.tsx` — cargar customization de Supabase + resolver
- `src/templates/tech-premium/components/` — consumir branding/content de config resuelto
