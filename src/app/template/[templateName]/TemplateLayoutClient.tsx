"use client";

// Generic Template Layout Client
// Supports all 8 templates — fully template-count-agnostic.
//
// Provides:
//  1. CartProvider (cart state persists across page navigations)
//  2. .template-scope div with CSS custom properties injected from config
//  3. Theme customizer (floating button + drawer) — persists across pages
//  4. LayoutConfigContext — exposes active config to all page children
//
// CSS var injection is data-driven via buildCssVars (no hardcoded per-key lists).
// Adding a new template = add its ui-config import + one entry in TEMPLATE_UI_CONFIGS.

import { useState, type ReactNode } from "react";
import { createContext, useContext } from "react";
import {
  ThemeCustomizer,
  type MutableConfig,
} from "@/components/customizer/ThemeCustomizer";
import { buildCssVars } from "@/lib/buildCssVars";
import { fontPairs } from "@/lib/fonts";

// ── Template ui-config imports ────────────────────────────────────────────────

import { CartProvider as SharedCartProvider, createCartStorageKey } from "@/lib/cart";
import { techPremiumUiConfig } from "@/templates/tech-premium/ui-config";
import { fashionUiConfig } from "@/templates/fashion/ui-config";
import { furnitureDarkUiConfig } from "@/templates/furniture-dark/ui-config";
import { furnitureLightUiConfig } from "@/templates/furniture-light/ui-config";
import { beautySoftUiConfig } from "@/templates/beauty-soft/ui-config";
import { beautyElegantUiConfig } from "@/templates/beauty-elegant/ui-config";
import { decorWarmUiConfig } from "@/templates/decor-warm/ui-config";
import { foodNightUiConfig } from "@/templates/food-night/ui-config";
import type { TemplateUIConfig } from "@/types/templates/ui-config";

import type { ResolvedStoreConfig } from "@/types/templates";

// ── Per-template static config registry ───────────────────────────────────────

const TEMPLATE_UI_CONFIGS: Record<string, TemplateUIConfig> = {
  "tech-premium": techPremiumUiConfig,
  "fashion": fashionUiConfig,
  "furniture-dark": furnitureDarkUiConfig,
  "furniture-light": furnitureLightUiConfig,
  "beauty-soft": beautySoftUiConfig,
  "beauty-elegant": beautyElegantUiConfig,
  "decor-warm": decorWarmUiConfig,
  "food-night": foodNightUiConfig,
};

// ── Context — exposes configOverride to all page children ─────────────────────
// The context stores the config as `Record<string, unknown>` so the provider is
// template-agnostic. Consumers call useLayoutConfig<T>() with their specific
// config type to get a typed result without a union bleeding into their types.

interface LayoutContextValue {
  config: Record<string, unknown>;
}

export const LayoutConfigContext = createContext<LayoutContextValue | null>(null);

/**
 * Read the active template config.
 * Pass the concrete config type as a generic so your component stays fully typed:
 *   const { config } = useLayoutConfig<TechPremiumConfig>();
 *   const { config } = useLayoutConfig<FashionConfig>();
 */
export function useLayoutConfig<T = Record<string, unknown>>(): { config: T } {
  const ctx = useContext(LayoutConfigContext);
  if (!ctx) throw new Error("useLayoutConfig must be used inside TemplateLayoutClient");
  return ctx as { config: T };
}

// ── Deep clone helper ─────────────────────────────────────────────────────────

function cloneConfig(cfg: Record<string, unknown>): MutableConfig {
  return JSON.parse(JSON.stringify(cfg)) as MutableConfig;
}

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
// Resolves the correct localStorage key for each template.
// tech-premium keeps "techpremium" (legacy key) — all others use the template name.

interface CartWrapperProps {
  templateName: string;
  storeSlug: string;
  children: ReactNode;
}

function CartWrapper({ templateName, storeSlug, children }: CartWrapperProps) {
  const storageKey = templateName === "tech-premium"
    ? createCartStorageKey("techpremium")
    : createCartStorageKey(templateName);
  return (
    <SharedCartProvider slug={storeSlug} storageKey={storageKey}>
      {children}
    </SharedCartProvider>
  );
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
  const cssVars = buildCssVars(config as unknown as ResolvedStoreConfig);

  // Resolve font pair CSS variable classes.
  // Priority: active preset (config.fontPair) → template default → none.
  // next/font CSS variable classes must be present on a DOM ancestor for the
  // font-family var to resolve — they are not injected by buildCssVars.
  const resolvedFontPairKey =
    (config.fontPair as string | undefined) ?? uiConfig.defaultFontPairKey;
  const resolvedFontPair = resolvedFontPairKey
    ? (fontPairs[resolvedFontPairKey] ?? null)
    : null;
  const fontPairClasses = resolvedFontPair
    ? `${resolvedFontPair.body.variable} ${resolvedFontPair.heading.variable}`
    : "";

  // Merge structural → structuralVariants so ThemeCustomizer writes land on the
  // read path. ThemeCustomizer writes to config.structural.*; components read
  // from config.structuralVariants.*. Spread structural AFTER structuralVariants
  // so customizer values always win over template defaults.
  const configRaw = config as unknown as Record<string, unknown>;
  const configForContext: Record<string, unknown> = {
    ...configRaw,
    structuralVariants: {
      ...(configRaw.structuralVariants as Record<string, unknown> | undefined),
      ...(config.structural as Record<string, unknown> | undefined),
    },
  };

  return (
    <CartWrapper templateName={templateName} storeSlug={storeSlug}>
      <LayoutConfigContext.Provider value={{ config: configForContext }}>
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
