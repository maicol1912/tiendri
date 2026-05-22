"use client";

// Tech Premium — Shared layout client component.
// Provides:
//  1. CartProvider (cart state persists across page navigations)
//  2. .template-scope div with CSS custom properties injected from config
//  3. Theme customizer (floating button + drawer) — persists across pages
//
// configOverride state lives here so the customizer works on every sub-route
// without duplicating it per page.

import { useState, type ReactNode } from "react";
import {
  ThemeCustomizer,
  type MutableConfig,
  type CustomizerColorField,
  type CustomizerSectionLabel,
  type CustomizerGridField,
  type CustomizerLayoutOption,
} from "@/components/customizer/ThemeCustomizer";
import { CartProvider } from "@/templates/tech-premium/context/CartContext";
import { techPremiumConfig } from "@/templates/tech-premium/config";
import type { TechPremiumConfig } from "@/templates/tech-premium/config";
import type { StoreInfo } from "@/templates/tech-premium/types";

// ── Deep clone helper ─────────────────────────────────────────────────────────

function cloneConfig(cfg: typeof techPremiumConfig): MutableConfig {
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

// ── Context — exposes configOverride to all page children ─────────────────────
// Each page child reads config via ConfigContext instead of prop drilling.

import { createContext, useContext } from "react";

interface LayoutContextValue {
  config: TechPremiumConfig;
}

export const LayoutConfigContext = createContext<LayoutContextValue | null>(null);

export function useLayoutConfig(): LayoutContextValue {
  const ctx = useContext(LayoutConfigContext);
  if (!ctx) throw new Error("useLayoutConfig must be used inside TemplateLayoutClient");
  return ctx;
}

// ── Main layout client component ──────────────────────────────────────────────

interface TemplateLayoutClientProps {
  children: ReactNode;
  storeSlug: string;
}

export function TemplateLayoutClient({
  children,
  storeSlug,
}: TemplateLayoutClientProps) {
  const [config, setConfig] = useState<MutableConfig>(() =>
    cloneConfig(techPremiumConfig)
  );
  const [isOpen, setIsOpen] = useState(false);

  // MutableConfig is structurally compatible with TechPremiumConfig.
  const configOverride = config as unknown as TechPremiumConfig;

  const colors = configOverride.colors;
  const radius = configOverride.radius;

  return (
    <CartProvider slug={storeSlug}>
      <LayoutConfigContext.Provider value={{ config: configOverride }}>
        {/* template-scope div — CSS variable injection */}
        <div
          className="template-scope"
          style={{
            "--template-heading-font": configOverride.headingFont,
            // Colors
            "--t-primary": colors.primary,
            "--t-secondary": colors.secondary,
            "--t-background": colors.background,
            "--t-card-bg": colors.cardBg,
            "--t-border": colors.border,
            "--t-surface": colors.surface,
            "--t-search-bg": colors.searchBg,
            "--t-text-muted": colors.textMuted,
            "--t-text-footer": colors.textFooter,
            "--t-button-bg": colors.buttonBg,
            "--t-button-text": colors.buttonText,
            "--t-footer-bg": colors.footerBg,
            "--t-badge-bg": colors.badgeBg,
            "--t-badge-text": colors.badgeText,
            "--t-spec-badge-bg": colors.specBadgeBg,
            "--t-review-bg": colors.reviewBg,
            "--t-nav-border": colors.navBorder,
            "--t-text-secondary": colors.textSecondary,
            "--t-text-subtle": colors.textSubtle,
            "--t-border-light": colors.borderLight,
            "--t-border-input": colors.borderInput,
            "--t-border-mid": colors.borderMid,
            "--t-rating-bar-bg": colors.ratingBarBg,
            "--t-rating-star": colors.ratingStar,
            "--t-pagination-bg": colors.paginationBg,
            "--t-text-summer-sale": colors.textSummerSale,
            "--t-text-breadcrumb": colors.textBreadcrumb,
            "--t-tab-active": colors.tabActive,
            "--t-category-active-bg": colors.categoryActiveBg,
            "--t-category-active-text": colors.categoryActiveText,
            // Radii
            "--t-radius-card": radius.card,
            "--t-radius-category": radius.category,
            "--t-radius-button": radius.button,
          } as React.CSSProperties}
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
                onReset={() => setConfig(cloneConfig(techPremiumConfig))}
                templateLabel="Tech Premium"
                colorFields={TECH_PREMIUM_COLOR_FIELDS}
                gridFields={TECH_PREMIUM_GRID_FIELDS}
                layoutOptions={TECH_PREMIUM_LAYOUT_OPTIONS}
                sectionLabels={TECH_PREMIUM_SECTION_LABELS}
              />
            </div>
          </>
        )}
      </LayoutConfigContext.Provider>
    </CartProvider>
  );
}
