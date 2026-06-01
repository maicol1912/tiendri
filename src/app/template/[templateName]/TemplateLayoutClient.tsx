"use client";

// Generic Template Layout Client
// Supports tech-premium and fashion templates (extensible to future templates).
//
// Provides:
//  1. CartProvider (cart state persists across page navigations)
//  2. .template-scope div with CSS custom properties injected from config
//  3. Theme customizer (floating button + drawer) — persists across pages
//  4. LayoutConfigContext — exposes active config to all page children
//
// CSS var injection is data-driven via buildCssVars (no hardcoded per-key lists).
// Adding a new template = add a case to TEMPLATE_CONFIGS below.

import { useState, type ReactNode } from "react";
import { createContext, useContext } from "react";
import {
  ThemeCustomizer,
  type MutableConfig,
  type CustomizerColorField,
  type CustomizerSectionLabel,
  type CustomizerGridField,
  type CustomizerLayoutOption,
  type CustomizerPalette,
} from "@/components/customizer/ThemeCustomizer";
import { buildCssVars } from "@/lib/buildCssVars";
import { fontPairs } from "@/lib/fonts";

// ── Template-specific imports ─────────────────────────────────────────────────

import { CartProvider as TechPremiumCartProvider } from "@/templates/tech-premium/context/CartContext";
import { techPremiumConfig } from "@/templates/tech-premium/config";
import { techPremiumPalettes } from "@/templates/tech-premium/palettes";
import type { TechPremiumConfig } from "@/templates/tech-premium/config";

import { CartProvider as FashionCartProvider } from "@/templates/fashion/context/CartContext";
import { fashionConfig } from "@/templates/fashion/config";
import { fashionPalettes } from "@/templates/fashion/palettes";
import type { FashionConfig } from "@/templates/fashion/config";

import { CartProvider as PetsModernCartProvider } from "@/templates/pets-modern/context/CartContext";
import { petsModernConfig } from "@/templates/pets-modern/config";
import { petsModernPalettes } from "@/templates/pets-modern/palettes";
import type { PetsModernConfig } from "@/templates/pets-modern/config";

import { CartProvider as ElectronicsClassicCartProvider } from "@/templates/electronics-classic/context/CartContext";
import { electronicsClassicConfig } from "@/templates/electronics-classic/config";
import { electronicsClassicPalettes } from "@/templates/electronics-classic/palettes";
import type { ElectronicsClassicConfig } from "@/templates/electronics-classic/config";

import { CartProvider as FurnitureDarkCartProvider } from "@/templates/furniture-dark/context/CartContext";
import { furnitureDarkConfig } from "@/templates/furniture-dark/config";
import { furnitureDarkPalettes } from "@/templates/furniture-dark/palettes";
import type { FurnitureDarkConfig } from "@/templates/furniture-dark/config";

import { CartProvider as BeautySoftCartProvider } from "@/templates/beauty-soft/context/CartContext";
import { beautySoftConfig } from "@/templates/beauty-soft/config";
import { beautySoftPalettes } from "@/templates/beauty-soft/palettes";
import type { BeautySoftConfig } from "@/templates/beauty-soft/config";

import type { ResolvedStoreConfig } from "@/types/templates";

// ── Generic config type ───────────────────────────────────────────────────────

type AnyTemplateConfig = TechPremiumConfig | FashionConfig | PetsModernConfig | ElectronicsClassicConfig | FurnitureDarkConfig | BeautySoftConfig;

// ── Context — exposes configOverride to all page children ─────────────────────
// The context stores the config as `unknown` so the provider is template-agnostic.
// Consumers call useLayoutConfig<T>() with their specific config type to get
// a typed result without the union bleeding into their component types.

interface LayoutContextValue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any;
}

export const LayoutConfigContext = createContext<LayoutContextValue | null>(null);

/**
 * Read the active template config.
 * Pass the concrete config type as a generic so your component stays fully typed:
 *   const { config } = useLayoutConfig<TechPremiumConfig>();
 *   const { config } = useLayoutConfig<FashionConfig>();
 * If T is omitted the return type is `AnyTemplateConfig` (union).
 */
export function useLayoutConfig<T = AnyTemplateConfig>(): { config: T } {
  const ctx = useContext(LayoutConfigContext);
  if (!ctx) throw new Error("useLayoutConfig must be used inside TemplateLayoutClient");
  return ctx as { config: T };
}

// ── Deep clone helper ─────────────────────────────────────────────────────────

function cloneConfig(cfg: AnyTemplateConfig): MutableConfig {
  return JSON.parse(JSON.stringify(cfg)) as MutableConfig;
}

// ── Tech Premium field metadata ───────────────────────────────────────────────

const TECH_PREMIUM_COLOR_FIELDS: CustomizerColorField[] = [
  { key: "primary", label: "Color principal (botones, enlaces)" },
  { key: "secondary", label: "Color secundario (fondos oscuros)" },
  { key: "background", label: "Fondo de la página" },
  { key: "cardBg", label: "Fondo de tarjetas de producto" },
  { key: "surface", label: "Fondo de categorías" },
  { key: "buttonBg", label: "Color de botones" },
  { key: "buttonText", label: "Texto de botones" },
  { key: "footerBg", label: "Fondo del pie de página" },
  { key: "textMuted", label: "Texto secundario" },
  { key: "border", label: "Color de bordes" },
];

const TECH_PREMIUM_GRID_FIELDS: CustomizerGridField[] = [
  {
    key: "products",
    mobileLabel: "Productos por fila (celular)",
    desktopLabel: "Productos por fila (computador)",
  },
  {
    key: "categories",
    mobileLabel: "Categorías por fila (celular)",
    desktopLabel: "Categorías por fila (computador)",
  },
  {
    key: "listing",
    mobileLabel: "Catálogo por fila (celular)",
    desktopLabel: "Catálogo por fila (computador)",
  },
  {
    key: "search",
    mobileLabel: "Búsqueda por fila (celular)",
    desktopLabel: "Búsqueda por fila (computador)",
  },
];

const TECH_PREMIUM_LAYOUT_OPTIONS: CustomizerLayoutOption[] = [
  {
    key: "cardStyle",
    label: "Estilo de tarjetas",
    options: [
      { value: "flat", label: "Plano" },
      { value: "shadow", label: "Con sombra" },
      { value: "bordered", label: "Con borde" },
      { value: "elevated", label: "Elevado" },
    ],
  },
  {
    key: "cardHoverEffect",
    label: "Efecto al pasar el mouse",
    options: [
      { value: "none", label: "Ninguno" },
      { value: "lift", label: "Elevar" },
      { value: "scale", label: "Agrandar" },
      { value: "glow", label: "Brillar" },
    ],
  },
  {
    key: "cardImageRatio",
    label: "Forma de las imágenes",
    options: [
      { value: "square", label: "Cuadrada" },
      { value: "portrait", label: "Vertical" },
      { value: "wide", label: "Horizontal" },
    ],
  },
  {
    key: "tabStyle",
    label: "Estilo de pestañas",
    options: [
      { value: "underline", label: "Subrayado" },
      { value: "pills", label: "Botones redondeados" },
      { value: "bordered", label: "Con borde" },
    ],
  },
  {
    key: "bannerHeight",
    label: "Altura del banner promocional",
    options: [
      { value: "short", label: "Bajo" },
      { value: "normal", label: "Normal" },
      { value: "tall", label: "Alto" },
    ],
  },
  {
    key: "headerStyle",
    label: "Estilo del encabezado",
    options: [
      { value: "standard", label: "Estándar" },
      { value: "centered", label: "Centrado" },
      { value: "minimal", label: "Mínimo" },
    ],
  },
  {
    key: "footerStyle",
    label: "Estilo del pie de página",
    options: [
      { value: "columns", label: "En columnas" },
      { value: "minimal", label: "Mínimo" },
      { value: "centered", label: "Centrado" },
    ],
  },
];

const TECH_PREMIUM_SECTION_LABELS: CustomizerSectionLabel[] = [
  { id: "hero", label: "Banner principal" },
  { id: "banners", label: "Banners promocionales" },
  { id: "categories", label: "Categorías" },
  { id: "products", label: "Productos" },
  { id: "popular", label: "Productos populares" },
  { id: "discounts", label: "Descuentos" },
  { id: "summer-sale", label: "Banner de ofertas" },
];

// ── Fashion field metadata ────────────────────────────────────────────────────

const FASHION_COLOR_FIELDS: CustomizerColorField[] = [
  { key: "primary", label: "Color principal" },
  { key: "secondary", label: "Color secundario" },
  { key: "background", label: "Fondo de la página" },
  { key: "cardBg", label: "Fondo de tarjetas" },
  { key: "headerBg", label: "Fondo del encabezado" },
  { key: "footerBg", label: "Fondo del pie de página" },
  { key: "buttonBg", label: "Color de botones" },
  { key: "buttonText", label: "Texto de botones" },
  { key: "textPrimary", label: "Texto principal" },
  { key: "border", label: "Color de bordes" },
];

const FASHION_GRID_FIELDS: CustomizerGridField[] = [
  {
    key: "products",
    mobileLabel: "Productos por fila (celular)",
    desktopLabel: "Productos por fila (computador)",
  },
  {
    key: "categories",
    mobileLabel: "Categorías por fila (celular)",
    desktopLabel: "Categorías por fila (computador)",
  },
  {
    key: "listing",
    mobileLabel: "Catálogo por fila (celular)",
    desktopLabel: "Catálogo por fila (computador)",
  },
  {
    key: "search",
    mobileLabel: "Búsqueda por fila (celular)",
    desktopLabel: "Búsqueda por fila (computador)",
  },
];

const FASHION_LAYOUT_OPTIONS: CustomizerLayoutOption[] = [
  {
    key: "cardStyle",
    label: "Estilo de tarjetas",
    options: [
      { value: "flat", label: "Plano" },
      { value: "shadow", label: "Con sombra" },
      { value: "bordered", label: "Con borde" },
      { value: "elevated", label: "Elevado" },
    ],
  },
  {
    key: "cardHoverEffect",
    label: "Efecto al pasar el mouse",
    options: [
      { value: "none", label: "Ninguno" },
      { value: "lift", label: "Elevar" },
      { value: "scale", label: "Agrandar" },
    ],
  },
  {
    key: "cardImageRatio",
    label: "Forma de las imágenes",
    options: [
      { value: "square", label: "Cuadrada" },
      { value: "portrait", label: "Vertical" },
      { value: "wide", label: "Horizontal" },
    ],
  },
  {
    key: "tabStyle",
    label: "Estilo de pestañas",
    options: [
      { value: "underline", label: "Subrayado" },
      { value: "pills", label: "Botones redondeados" },
      { value: "bordered", label: "Con borde" },
    ],
  },
  {
    key: "headerStyle",
    label: "Estilo del encabezado",
    options: [
      { value: "standard", label: "Estándar" },
      { value: "centered", label: "Centrado" },
      { value: "minimal", label: "Mínimo" },
    ],
  },
  {
    key: "footerStyle",
    label: "Estilo del pie de página",
    options: [
      { value: "columns", label: "En columnas" },
      { value: "minimal", label: "Mínimo" },
      { value: "centered", label: "Centrado" },
    ],
  },
];

const FASHION_SECTION_LABELS: CustomizerSectionLabel[] = [
  { id: "hero", label: "Banner principal" },
  { id: "collections", label: "Colecciones" },
  { id: "editorial", label: "Editorial" },
];

// ── Pets Modern field metadata ────────────────────────────────────────────────────

const PETS_MODERN_COLOR_FIELDS: CustomizerColorField[] = [
  { key: "primary", label: "Color principal (acentos)" },
  { key: "background", label: "Fondo de la pagina" },
  { key: "cardBg", label: "Fondo de tarjetas" },
  { key: "surface", label: "Fondo de imagenes" },
  { key: "border", label: "Color de bordes" },
  { key: "buttonBg", label: "Color de botones" },
  { key: "buttonText", label: "Texto de botones" },
  { key: "textPrimary", label: "Texto principal" },
  { key: "textMuted", label: "Texto secundario" },
  { key: "headerBg", label: "Fondo del encabezado" },
];

const PETS_MODERN_GRID_FIELDS: CustomizerGridField[] = [
  {
    key: "products",
    mobileLabel: "Productos por fila (celular)",
    desktopLabel: "Productos por fila (computador)",
  },
  {
    key: "categories",
    mobileLabel: "Categorias por fila (celular)",
    desktopLabel: "Categorias por fila (computador)",
  },
  {
    key: "search",
    mobileLabel: "Busqueda por fila (celular)",
    desktopLabel: "Busqueda por fila (computador)",
  },
];

const PETS_MODERN_LAYOUT_OPTIONS: CustomizerLayoutOption[] = [
  {
    key: "cardStyle",
    label: "Estilo de tarjetas",
    options: [
      { value: "flat", label: "Plano" },
      { value: "shadow", label: "Con sombra" },
      { value: "bordered", label: "Con borde" },
      { value: "elevated", label: "Elevado" },
    ],
  },
  {
    key: "cardHoverEffect",
    label: "Efecto al pasar el mouse",
    options: [
      { value: "none", label: "Ninguno" },
      { value: "lift", label: "Elevar" },
      { value: "scale", label: "Agrandar" },
      { value: "glow", label: "Brillar" },
    ],
  },
  {
    key: "cardImageRatio",
    label: "Forma de las imagenes",
    options: [
      { value: "square", label: "Cuadrada" },
      { value: "portrait", label: "Vertical" },
      { value: "wide", label: "Horizontal" },
    ],
  },
  {
    key: "tabStyle",
    label: "Estilo de filtros",
    options: [
      { value: "pills", label: "Botones redondeados" },
      { value: "underline", label: "Subrayado" },
      { value: "bordered", label: "Con borde" },
    ],
  },
  {
    key: "headerStyle",
    label: "Estilo del encabezado",
    options: [
      { value: "standard", label: "Estandar" },
      { value: "centered", label: "Centrado" },
      { value: "minimal", label: "Minimo" },
    ],
  },
];

const PETS_MODERN_SECTION_LABELS: CustomizerSectionLabel[] = [
  { id: "promo-banner", label: "Banner promocional" },
  { id: "trending", label: "Tendencias" },
  { id: "pet-types", label: "Tipos de mascota" },
  { id: "products", label: "Productos destacados" },
];

// ── Electronics Classic field metadata ────────────────────────────────────────

const ELECTRONICS_CLASSIC_COLOR_FIELDS: CustomizerColorField[] = [
  { key: "primary", label: "Color principal (botones, enlaces)" },
  { key: "secondary", label: "Color secundario" },
  { key: "background", label: "Fondo de la página" },
  { key: "headerBg", label: "Fondo del encabezado" },
  { key: "cardBg", label: "Fondo de tarjetas" },
  { key: "surface", label: "Fondo de imágenes y superficies" },
  { key: "topBarBg", label: "Barra superior de info" },
  { key: "buttonBg", label: "Color de botones de acción" },
  { key: "buttonText", label: "Texto en botones" },
  { key: "textPrimary", label: "Texto principal" },
  { key: "textMuted", label: "Texto secundario" },
  { key: "footerBg", label: "Fondo del pie de página" },
];

const ELECTRONICS_CLASSIC_GRID_FIELDS: CustomizerGridField[] = [
  { key: "products", mobileLabel: "Productos por fila (celular)", desktopLabel: "Productos por fila (computador)" },
  { key: "categories", mobileLabel: "Categorías por fila (celular)", desktopLabel: "Categorías por fila (computador)" },
  { key: "listing", mobileLabel: "Catálogo por fila (celular)", desktopLabel: "Catálogo por fila (computador)" },
  { key: "search", mobileLabel: "Búsqueda por fila (celular)", desktopLabel: "Búsqueda por fila (computador)" },
];

const ELECTRONICS_CLASSIC_LAYOUT_OPTIONS: CustomizerLayoutOption[] = [
  {
    key: "cardStyle",
    label: "Estilo de tarjetas",
    options: [
      { value: "flat", label: "Plano" },
      { value: "shadow", label: "Con sombra" },
      { value: "bordered", label: "Con borde" },
      { value: "elevated", label: "Elevado" },
    ],
  },
  {
    key: "cardHoverEffect",
    label: "Efecto al pasar el mouse",
    options: [
      { value: "none", label: "Ninguno" },
      { value: "lift", label: "Elevar" },
      { value: "scale", label: "Agrandar" },
      { value: "glow", label: "Brillar" },
    ],
  },
  {
    key: "cardImageRatio",
    label: "Forma de las imágenes",
    options: [
      { value: "square", label: "Cuadrada" },
      { value: "portrait", label: "Vertical" },
      { value: "wide", label: "Horizontal" },
    ],
  },
  {
    key: "tabStyle",
    label: "Estilo de pestañas",
    options: [
      { value: "underline", label: "Subrayado" },
      { value: "pills", label: "Botones redondeados" },
      { value: "bordered", label: "Con borde" },
    ],
  },
  {
    key: "bannerHeight",
    label: "Altura del banner principal",
    options: [
      { value: "short", label: "Bajo" },
      { value: "normal", label: "Normal" },
      { value: "tall", label: "Alto" },
    ],
  },
  {
    key: "headerStyle",
    label: "Estilo del encabezado",
    options: [
      { value: "standard", label: "Estándar" },
      { value: "centered", label: "Centrado" },
      { value: "minimal", label: "Mínimo" },
    ],
  },
  {
    key: "footerStyle",
    label: "Estilo del pie de página",
    options: [
      { value: "columns", label: "En columnas" },
      { value: "minimal", label: "Mínimo" },
      { value: "centered", label: "Centrado" },
    ],
  },
];

const ELECTRONICS_CLASSIC_SECTION_LABELS: CustomizerSectionLabel[] = [
  { id: "hero", label: "Banner principal" },
  { id: "categories", label: "Categorías" },
  { id: "feature-cards", label: "Tarjetas destacadas" },
  { id: "products", label: "Secciones de productos" },
  { id: "promo-banner", label: "Banner promocional" },
  { id: "testimonials", label: "Testimonios" },
];

// ── Furniture Dark field metadata ─────────────────────────────────────────────

const FURNITURE_DARK_COLOR_FIELDS: CustomizerColorField[] = [
  { key: "primary", label: "Color principal (amarillo)" },
  { key: "background", label: "Fondo de la página" },
  { key: "cardBg", label: "Fondo de tarjetas de producto" },
  { key: "surface", label: "Fondo de superficies oscuras" },
  { key: "secondary", label: "Color secundario" },
  { key: "headerBg", label: "Fondo del encabezado" },
  { key: "footerBg", label: "Fondo del pie de página" },
  { key: "buttonBg", label: "Color de botones" },
  { key: "buttonText", label: "Texto de botones" },
  { key: "border", label: "Color de bordes" },
];

const FURNITURE_DARK_GRID_FIELDS: CustomizerGridField[] = [
  {
    key: "products",
    mobileLabel: "Productos por fila (celular)",
    desktopLabel: "Productos por fila (computador)",
  },
];

const FURNITURE_DARK_LAYOUT_OPTIONS: CustomizerLayoutOption[] = [
  {
    key: "cardStyle",
    label: "Estilo de tarjetas",
    options: [
      { value: "flat", label: "Plano" },
      { value: "shadow", label: "Con sombra" },
      { value: "bordered", label: "Con borde" },
      { value: "elevated", label: "Elevado" },
    ],
  },
  {
    key: "cardHoverEffect",
    label: "Efecto al pasar el mouse",
    options: [
      { value: "none", label: "Ninguno" },
      { value: "lift", label: "Elevar" },
      { value: "scale", label: "Agrandar" },
      { value: "glow", label: "Brillar" },
    ],
  },
  {
    key: "cardImageRatio",
    label: "Forma de las imágenes",
    options: [
      { value: "square", label: "Cuadrada" },
      { value: "portrait", label: "Vertical" },
      { value: "wide", label: "Horizontal" },
    ],
  },
  {
    key: "bannerHeight",
    label: "Altura del banner de categoría",
    options: [
      { value: "short", label: "Bajo" },
      { value: "normal", label: "Normal" },
      { value: "tall", label: "Alto" },
    ],
  },
];

const FURNITURE_DARK_SECTION_LABELS: CustomizerSectionLabel[] = [
  { id: "promo-carousel", label: "Carrusel de promociones" },
  { id: "categories", label: "Categorías" },
  { id: "video", label: "Video de la tienda" },
  { id: "best-sellers", label: "Más vendidos" },
  { id: "featured", label: "Destacados" },
];

// ── Beauty Soft field metadata ────────────────────────────────────────────────

const BEAUTY_SOFT_COLOR_FIELDS: CustomizerColorField[] = [
  { key: "primary", label: "Color principal (coral)" },
  { key: "background", label: "Fondo de la página" },
  { key: "headerBg", label: "Fondo del encabezado" },
  { key: "cardBg", label: "Fondo de tarjetas" },
  { key: "sectionBg", label: "Fondo de secciones" },
  { key: "buttonBg", label: "Color de botones" },
  { key: "buttonText", label: "Texto de botones" },
  { key: "textPrimary", label: "Texto principal" },
  { key: "textMuted", label: "Texto secundario" },
  { key: "border", label: "Color de bordes" },
];

const BEAUTY_SOFT_GRID_FIELDS: CustomizerGridField[] = [
  {
    key: "products",
    mobileLabel: "Productos por fila (celular)",
    desktopLabel: "Productos por fila (computador)",
  },
  {
    key: "categories",
    mobileLabel: "Categorías por fila (celular)",
    desktopLabel: "Categorías por fila (computador)",
  },
];

const BEAUTY_SOFT_LAYOUT_OPTIONS: CustomizerLayoutOption[] = [
  {
    key: "cardStyle",
    label: "Estilo de tarjetas",
    options: [
      { value: "flat", label: "Plano" },
      { value: "shadow", label: "Con sombra" },
      { value: "bordered", label: "Con borde" },
    ],
  },
  {
    key: "cardHoverEffect",
    label: "Efecto al pasar el mouse",
    options: [
      { value: "none", label: "Ninguno" },
      { value: "lift", label: "Elevar" },
      { value: "scale", label: "Agrandar" },
    ],
  },
  {
    key: "cardImageRatio",
    label: "Forma de las imágenes",
    options: [
      { value: "square", label: "Cuadrada" },
      { value: "portrait", label: "Vertical" },
    ],
  },
  {
    key: "headerStyle",
    label: "Estilo del encabezado",
    options: [
      { value: "standard", label: "Estándar" },
      { value: "centered", label: "Centrado" },
      { value: "minimal", label: "Mínimo" },
    ],
  },
  {
    key: "footerStyle",
    label: "Estilo del pie de página",
    options: [
      { value: "minimal", label: "Mínimo" },
      { value: "columns", label: "En columnas" },
      { value: "centered", label: "Centrado" },
    ],
  },
];

const BEAUTY_SOFT_SECTION_LABELS: CustomizerSectionLabel[] = [
  { id: "hero", label: "Banner principal" },
  { id: "categories", label: "Categorías" },
  { id: "products", label: "Productos" },
];

// ── Per-template static config registry ───────────────────────────────────────

interface TemplateUIConfig {
  defaultConfig: AnyTemplateConfig;
  label: string;
  colorFields: CustomizerColorField[];
  gridFields: CustomizerGridField[];
  layoutOptions: CustomizerLayoutOption[];
  sectionLabels: CustomizerSectionLabel[];
  palettes: CustomizerPalette[];
}

const TEMPLATE_UI_CONFIGS: Record<string, TemplateUIConfig> = {
  "tech-premium": {
    defaultConfig: techPremiumConfig,
    label: "Tech Premium",
    colorFields: TECH_PREMIUM_COLOR_FIELDS,
    gridFields: TECH_PREMIUM_GRID_FIELDS,
    layoutOptions: TECH_PREMIUM_LAYOUT_OPTIONS,
    sectionLabels: TECH_PREMIUM_SECTION_LABELS,
    palettes: techPremiumPalettes as CustomizerPalette[],
  },
  fashion: {
    defaultConfig: fashionConfig,
    label: "Fashion",
    colorFields: FASHION_COLOR_FIELDS,
    gridFields: FASHION_GRID_FIELDS,
    layoutOptions: FASHION_LAYOUT_OPTIONS,
    sectionLabels: FASHION_SECTION_LABELS,
    palettes: fashionPalettes as CustomizerPalette[],
  },
  "pets-modern": {
    defaultConfig: petsModernConfig,
    label: "Pet Shop",
    colorFields: PETS_MODERN_COLOR_FIELDS,
    gridFields: PETS_MODERN_GRID_FIELDS,
    layoutOptions: PETS_MODERN_LAYOUT_OPTIONS,
    sectionLabels: PETS_MODERN_SECTION_LABELS,
    palettes: petsModernPalettes as CustomizerPalette[],
  },
  "electronics-classic": {
    defaultConfig: electronicsClassicConfig,
    label: "Electronics Classic",
    colorFields: ELECTRONICS_CLASSIC_COLOR_FIELDS,
    gridFields: ELECTRONICS_CLASSIC_GRID_FIELDS,
    layoutOptions: ELECTRONICS_CLASSIC_LAYOUT_OPTIONS,
    sectionLabels: ELECTRONICS_CLASSIC_SECTION_LABELS,
    palettes: electronicsClassicPalettes as CustomizerPalette[],
  },
  "furniture-dark": {
    defaultConfig: furnitureDarkConfig,
    label: "Furniture Dark",
    colorFields: FURNITURE_DARK_COLOR_FIELDS,
    gridFields: FURNITURE_DARK_GRID_FIELDS,
    layoutOptions: FURNITURE_DARK_LAYOUT_OPTIONS,
    sectionLabels: FURNITURE_DARK_SECTION_LABELS,
    palettes: furnitureDarkPalettes as CustomizerPalette[],
  },
  "beauty-soft": {
    defaultConfig: beautySoftConfig,
    label: "Beauty Soft",
    colorFields: BEAUTY_SOFT_COLOR_FIELDS,
    gridFields: BEAUTY_SOFT_GRID_FIELDS,
    layoutOptions: BEAUTY_SOFT_LAYOUT_OPTIONS,
    sectionLabels: BEAUTY_SOFT_SECTION_LABELS,
    palettes: beautySoftPalettes as CustomizerPalette[],
  },
};

// ── Sliders icon (inline SVG) ─────────────────────────────────────────────────

function SlidersIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  );
}

// ── CartProvider selector ─────────────────────────────────────────────────────
// Each template has its own CartProvider (different localStorage keys).

interface CartWrapperProps {
  templateName: string;
  storeSlug: string;
  children: ReactNode;
}

function CartWrapper({ templateName, storeSlug, children }: CartWrapperProps) {
  if (templateName === "fashion") {
    return <FashionCartProvider slug={storeSlug}>{children}</FashionCartProvider>;
  }
  if (templateName === "pets-modern") {
    return <PetsModernCartProvider slug={storeSlug}>{children}</PetsModernCartProvider>;
  }
  if (templateName === "electronics-classic") {
    return <ElectronicsClassicCartProvider slug={storeSlug}>{children}</ElectronicsClassicCartProvider>;
  }
  if (templateName === "furniture-dark") {
    return <FurnitureDarkCartProvider slug={storeSlug}>{children}</FurnitureDarkCartProvider>;
  }
  if (templateName === "beauty-soft") {
    return <BeautySoftCartProvider slug={storeSlug}>{children}</BeautySoftCartProvider>;
  }
  // Default: tech-premium (and any future template that hasn't migrated yet)
  return <TechPremiumCartProvider slug={storeSlug}>{children}</TechPremiumCartProvider>;
}

// ── Main layout client component ──────────────────────────────────────────────

interface TemplateLayoutClientProps {
  children: ReactNode;
  storeSlug: string;
  templateName: string;
}

export function TemplateLayoutClient({
  children,
  storeSlug,
  templateName,
}: TemplateLayoutClientProps) {
  const uiConfig = TEMPLATE_UI_CONFIGS[templateName] ?? TEMPLATE_UI_CONFIGS["tech-premium"];

  const [config, setConfig] = useState<MutableConfig>(() =>
    cloneConfig(uiConfig.defaultConfig)
  );
  const [isOpen, setIsOpen] = useState(false);

  // Build CSS vars from config using the data-driven helper.
  // Cast is safe: MutableConfig and AnyTemplateConfig share the same shape.
  const cssVars = buildCssVars(config as unknown as ResolvedStoreConfig);

  // Resolve font pair CSS variable classes for templates that use non-default fonts.
  // This ensures next/font CSS variables (e.g. --font-body-elegant) are available
  // in the template preview scope without requiring a server-side font loader.
  const fontPairKey = templateName === "furniture-dark" ? "elegant" : null;
  const fontPairClasses = fontPairKey
    ? `${fontPairs[fontPairKey]!.body.variable} ${fontPairs[fontPairKey]!.heading.variable}`
    : "";

  return (
    <CartWrapper templateName={templateName} storeSlug={storeSlug}>
      <LayoutConfigContext.Provider
        value={{ config: config as unknown as AnyTemplateConfig }}
      >
        {/* template-scope div — CSS variable injection (data-driven) */}
        <div
          className={`template-scope${fontPairClasses ? ` ${fontPairClasses}` : ""}`}
          style={cssVars as React.CSSProperties}
        >
          {children}
        </div>

        {/* Floating customizer button — above mobile bottom nav */}
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Abrir personalizador"
          className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer border-0 transition-colors"
          style={{
            background: "#000",
            color: "#fff",
            boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(0,0,0,0.8)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#000";
          }}
        >
          <SlidersIcon />
        </button>

        {/* Customizer drawer overlay */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              onClick={() => setIsOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.4)",
                zIndex: 60,
              }}
            />

            {/* Drawer panel — slides from right */}
            <div
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                height: "100%",
                width: "360px",
                background: "#1a1a1a",
                zIndex: 70,
                overflowY: "auto",
                boxShadow: "-8px 0 40px rgba(0,0,0,0.6)",
              }}
            >
              <ThemeCustomizer
                config={config}
                onConfigChange={setConfig}
                onClose={() => setIsOpen(false)}
                onReset={() => setConfig(cloneConfig(uiConfig.defaultConfig))}
                templateLabel={uiConfig.label}
                colorFields={uiConfig.colorFields}
                gridFields={uiConfig.gridFields}
                layoutOptions={uiConfig.layoutOptions}
                sectionLabels={uiConfig.sectionLabels}
                palettes={uiConfig.palettes}
              />
            </div>
          </>
        )}
      </LayoutConfigContext.Provider>
    </CartWrapper>
  );
}
