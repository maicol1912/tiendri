# Customización por Merchant — Roadmap de implementación

Todo lo que un merchant debe poder personalizar desde su dashboard.

## Ya implementado

### Tema y apariencia visual

| Aspecto | Estado | Dónde |
|---------|--------|-------|
| Colores (32+ tokens via CSS vars `--t-*`) | ✅ Hecho | `ThemeTab` en `/dashboard/configuracion` |
| Border radius (card, category, button) | ✅ Hecho | `ThemeTab` — sliders con límite en px |
| Pares de fuentes (modern, warm, elegant, functional) | ✅ Hecho | `ThemeTab` — font picker |
| Grid columns (products, categories, listing, search) | ✅ Hecho | Config del template |
| Layout options (cardStyle, hoverEffect, imageRatio, tabStyle, bannerHeight, headerStyle, footerStyle) | ✅ Hecho | Config del template |
| Orden de secciones (array configurable) | ✅ Hecho | Config del template |
| Visibilidad de secciones (visible: true/false) | ✅ Hecho | Config del template |
| `resolveTemplateConfig()` para merge defaults + overrides | ✅ Hecho | `src/lib/resolveTemplateConfig.ts` |
| `buildCssVars()` para generar CSS custom properties | ✅ Hecho | `src/lib/buildCssVars.ts` |

### Identidad de marca (BrandingTab)

| Elemento | Estado | Notas |
|----------|--------|-------|
| Nombre de la tienda | ✅ Hecho | `BrandingTab` en `/dashboard/configuracion` |
| Descripción | ✅ Hecho | `BrandingTab` |
| WhatsApp | ✅ Hecho | `BrandingTab` |
| Logo | ✅ Hecho | `BrandingTab` |
| Redes sociales (Instagram, Facebook, TikTok, Twitter, YouTube) | ✅ Hecho | `BrandingTab` |

### Contenido visual (schema-driven via DynamicTabContent)

| Elemento | Estado | Notas |
|----------|--------|-------|
| Banner hero (título, subtítulo, imagen, CTA) | ✅ Hecho | `TemplateConfigSchema` → tab "Contenido Principal" |
| Banners promocionales (hasta 4, repeatable) | ✅ Hecho | Sección repetible con add/remove |
| Banner de ofertas (desktop + mobile) | ✅ Hecho | Sección simple con dos campos de imagen |
| Links de navegación (repeatable) | ✅ Hecho | Tab "Navegación y Pie de Página" |
| Tabs de productos (repeatable) | ✅ Hecho | Tab "Navegación y Pie de Página" |
| Búsquedas populares | ✅ Hecho | Tag-list field |
| Servicios del footer | ✅ Hecho | Tag-list field |
| Asistencia del footer | ✅ Hecho | Tag-list field |

### Información de negocio (BusinessTab)

| Elemento | Estado | Notas |
|----------|--------|-------|
| Ciudad / dirección | ✅ Hecho | `BusinessTab` en `/dashboard/configuracion` |
| Horarios | ✅ Hecho | `BusinessTab` |
| Métodos de pago (Nequi, Daviplata, efectivo, etc.) | ✅ Hecho | `BusinessTab` |
| Info de envío (costo, tiempo estimado) | ✅ Hecho | `BusinessTab` |
| Moneda | ✅ Hecho | `BusinessTab` — default "COP" |

### Catálogo (dashboard CRUD)

| Elemento | Estado | Notas |
|----------|--------|-------|
| Categorías — crear, editar, eliminar, reordenar | ✅ Hecho | `/dashboard/categorias` |
| Subcategorías — CRUD dentro de una categoría | ✅ Hecho | `/dashboard/categorias/[id]` |
| Productos — crear, editar, eliminar, reordenar | ✅ Hecho | `/dashboard/productos` |
| Imágenes de producto (hasta 4, base64 WebP) | ✅ Hecho | `product-image-gallery.tsx` |
| Variantes de producto (precio modificado) | ✅ Hecho | `product-form.tsx` |
| Toggle disponibilidad / destacado | ✅ Hecho | Optimistic update en `useProducts` |
| Modo catálogo (simple vs nested) | ✅ Hecho | `StoreRepository.updateCatalogMode` |

### Infraestructura de datos

| Elemento | Estado | Notas |
|----------|--------|-------|
| Persistencia localStorage con patrón Repository | ✅ Hecho | `src/lib/repositories/local-storage/` |
| Factory con singletons estables | ✅ Hecho | `src/lib/repositories/factory.ts` |
| Hooks `useCategories`, `useSubcategories`, `useProducts` | ✅ Hecho | `src/hooks/use-repositories.ts` |
| `ActionResult<T>` para manejo de errores tipado | ✅ Hecho | `src/types/domain/action-result.ts` |
| Validación Zod (categorías, productos, customization) | ✅ Hecho | `src/lib/validators/` |
| Renderer de formularios dinámico (DynamicTabContent) | ✅ Hecho | `src/components/dashboard/schema-form` |

---

## Por implementar — Contenido del catálogo (ALTA prioridad)

| Elemento | Qué personaliza | Dónde se ve |
|----------|-----------------|-------------|
| **Productos destacados** | Cuáles aparecen en home | Home product grid |
| **Productos populares** | Cuáles aparecen + imagen + texto | Home popular section |
| **Productos en descuento** | Cuáles aparecen | Home discounts section |
| **Favicon** | Ícono 32x32 | Pestaña del browser |

## Por implementar — Apariencia (MEDIA prioridad)

| Elemento | Opciones |
|----------|----------|
| **Apariencia** | light / dark (tipos listos en `StoreCustomization.appearance`, UI pendiente) |
| **Template** | tech-premium implementado; 7+ pendientes de migración |

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

## Estructura StoreCustomization (JSONB)

```typescript
interface StoreCustomization {
  templateId: string;

  // Tema
  theme?: {
    colors?: Partial<TemplateColorTokens>;   // tokens --t-*
    radius?: Partial<TemplateRadiusTokens>;  // tokens --t-radius-*
    fontPair?: string;                       // "modern" | "warm" | "elegant" | "functional"
  };

  // Layout
  layout?: {
    grid?: Partial<TemplateGridConfig>;
    layout?: Partial<TemplateLayoutConfig>;
    sections?: SectionConfig[];              // reemplaza el array del template entero
  };

  // Identidad de marca
  branding?: {
    logo?: string;           // URL pública Storage bucket `logos`
    storeName?: string;
    description?: string;
    favicon?: string;        // URL pública Storage bucket `logos`
    whatsapp?: string;       // e.g. "573001234567"
    socialLinks?: {
      instagram?: string;
      facebook?: string;
      tiktok?: string;
      twitter?: string;
      youtube?: string;
    };
  };

  // Contenido visual
  content?: {
    heroBanner?: { title?; subtitle?; image?; ctaText? };
    promotionalBanners?: Array<{ image?; title?; subtitle?; link? }>;
    offersBanner?: { desktopImage?; mobileImage?; title?; subtitle?; ctaText? };
    featuredProductIds?: string[];
    popularProductIds?: string[];
    discountProductIds?: string[];
    navLinks?: Array<{ label: string; href: string }>;
    footerServices?: string[];
    footerAssistance?: string[];
    productTabs?: Array<{ id: string; label: string }>;
    popularSearches?: string[];
  };

  // Info de negocio
  business?: {
    city?: string;
    address?: string;
    hours?: string;
    paymentMethods?: string[];   // nequi | daviplata | efectivo | transferencia | tarjeta
    shippingInfo?: { cost?; estimatedTime?; freeAbove? };
    currency?: string;           // ISO 4217 — default "COP"
  };

  // Apariencia (tipos listos, UI pendiente)
  appearance?: "light" | "dark";
}
```

## Cómo funciona (flujo completo)

1. Merchant edita desde el dashboard (`/dashboard/configuracion` o `/dashboard/categorias`, `/dashboard/productos`)
2. Los datos de customización se guardan en localStorage (clave: `tiendri_demo-store_customization`)
3. El catálogo se persiste en localStorage por entidad: `tiendri_demo-store_categories`, `tiendri_demo-store_products`, etc.
4. `resolveTemplateConfig(templateDefaults, storeCustomization)` mergea en runtime
5. `buildCssVars(resolvedConfig)` genera las CSS custom properties
6. Las variables se inyectan en `.template-scope` — los componentes renderizan con los valores del merchant
7. **Migración futura**: las implementaciones localStorage se reemplazarán por implementaciones Supabase en la factory, sin cambios en hooks ni componentes

## Archivos clave

| Archivo | Rol |
|---------|-----|
| `src/types/templates/store-customization.ts` | Contrato del blob de customización |
| `src/types/templates/config-schema.ts` | Sistema de tipos para el schema declarativo |
| `src/lib/resolveTemplateConfig.ts` | Merge defaults + overrides |
| `src/lib/buildCssVars.ts` | Genera CSS custom properties desde el config resuelto |
| `src/lib/repositories/` | Patrón repository con implementaciones localStorage |
| `src/lib/repositories/factory.ts` | Factory singleton + `getStoreId()` |
| `src/hooks/use-repositories.ts` | Hooks React para CRUD de catálogo |
| `src/templates/registry.ts` | Registry async/sync de schemas por template |
| `src/templates/tech-premium/config.ts` | Defaults del template tech-premium |
| `src/templates/tech-premium/config-schema.ts` | Surface configurable de tech-premium |
| `src/app/(dashboard)/dashboard/configuracion/` | UI del dashboard de configuración |
| `src/app/(dashboard)/dashboard/categorias/` | CRUD de categorías y subcategorías |
| `src/app/(dashboard)/dashboard/productos/` | CRUD de productos |
