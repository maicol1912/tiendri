"use client";

// ConfiguracionClient — Client Component wrapper for the configuracion page.
// Split-panel layout: 40% controls (4 tabs) + 60% live preview iframe.
// Mobile: controls fullscreen + FAB to open preview sheet.
//
// Persistence strategy:
//   - isAuthenticated=true  → Server Actions write to Supabase
//   - isAuthenticated=false → localStorage fallback (demo / unauthenticated mode)

import { useEffect, useState, useRef, useMemo } from "react";
import { Store, Palette, Layout, Package, Eye } from "lucide-react";
import { cn } from "@/shared/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { DEFAULT_TEMPLATE_ID } from "@/shared/constants";
import { getTemplateSchema } from "@/templates/registry";
import { setByPath } from "@/catalog/config-path-utils";
import { ConfigDirtyProvider } from "./config-dirty-context";
import { usePreviewSync, buildPreviewVars } from "./hooks/use-preview-sync";
import { PreviewFrame } from "./components/preview-frame";
import { MiTiendaTab } from "./tabs/mi-tienda-tab";
import { DisenoTab } from "./tabs/diseno-tab";
import { ContenidoTab } from "./tabs/contenido-tab";
import { ProductosTab } from "./tabs/productos-tab";
import {
  updateBranding,
  updateBusiness,
  updateTheme,
  updateCustomizationSection,
} from "./actions";
import { CUSTOMIZATION_STORAGE_KEY } from "./client-utils";
import type {
  StoreCustomization,
  ThemeCustomization,
  LayoutCustomization,
} from "@/types/templates/store-customization";
import type {
  BrandingConfig,
  ContentConfig,
  BusinessConfig,
} from "@/types/templates/customization-sections";
import type { TemplateConfigSchema } from "@/types/templates/config-schema";
import type { TemplateConfig } from "@/types/templates";
import type { SectionConfig, SectionId } from "@/types/templates/sections";

// ── Banner data migration ───────────────────────────────────────────────────

const LEGACY_BANNERS_KEY = "tiendri_demo-store_banners";

interface LegacyBannersData {
  heroBanner?: Record<string, unknown>;
  promotionalBanners?: Record<string, unknown>[];
  offersBanner?: Record<string, unknown>;
}

/**
 * One-time migration: reads old `tiendri_demo-store_banners` localStorage key
 * and merges banner data into the main customization blob under `content.*`.
 * Deletes the old key after a successful merge.
 * Only runs in localStorage (demo) mode — Supabase stores are already clean.
 */
function migrateLegacyBanners(currentCustomization: StoreCustomization): void {
  try {
    const raw = localStorage.getItem(LEGACY_BANNERS_KEY);
    if (!raw) return;

    const banners = JSON.parse(raw) as LegacyBannersData;

    // Skip if main blob already has heroBanner data (already migrated or configured via new UI)
    if (currentCustomization.content?.heroBanner) return;

    let updated: Record<string, unknown> = currentCustomization as unknown as Record<
      string,
      unknown
    >;

    if (banners.heroBanner) {
      updated = setByPath(updated, "content.heroBanner", banners.heroBanner);
    }
    if (banners.promotionalBanners) {
      updated = setByPath(
        updated,
        "content.promotionalBanners",
        banners.promotionalBanners
      );
    }
    if (banners.offersBanner) {
      updated = setByPath(updated, "content.offersBanner", banners.offersBanner);
    }

    localStorage.setItem(CUSTOMIZATION_STORAGE_KEY, JSON.stringify(updated));
    localStorage.removeItem(LEGACY_BANNERS_KEY);
  } catch {
    // Migration failure is non-critical — old data stays intact for retry
  }
}

// ── localStorage fallback helpers (demo / unauthenticated mode) ────────────

function readLocalCustomization(): StoreCustomization {
  try {
    const raw = localStorage.getItem(CUSTOMIZATION_STORAGE_KEY);
    if (raw) return JSON.parse(raw) as StoreCustomization;
  } catch {
    // Corrupted — start fresh
  }
  return { templateId: DEFAULT_TEMPLATE_ID };
}

function writeLocalCustomization(data: StoreCustomization): void {
  try {
    localStorage.setItem(CUSTOMIZATION_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Non-critical in fallback mode
  }
}

// ── Tab definitions ────────────────────────────────────────────────────────

const TABS = [
  { value: "mi-tienda", label: "Mi Tienda", icon: Store },
  { value: "diseno", label: "Diseño", icon: Palette },
  { value: "contenido", label: "Contenido", icon: Layout },
  { value: "productos", label: "Productos", icon: Package },
] as const;

type TabValue = (typeof TABS)[number]["value"];

// ── Props ─────────────────────────────────────────────────────────────────────

interface ConfiguracionClientProps {
  storeName?: string;
  slug: string | null;
  supabaseCustomization: StoreCustomization | null;
  isAuthenticated: boolean;
  /** Products fetched server-side from Supabase for the ProductPicker. */
  initialProducts: any[]; // PickerProductData
  /** Template manifest (TemplateConfig) — passed as any from page.tsx */
  manifest: any; // TemplateConfig
}

// ── Component ─────────────────────────────────────────────────────────────────

export function ConfiguracionClient({
  slug,
  supabaseCustomization,
  isAuthenticated,
  initialProducts,
  manifest,
}: ConfiguracionClientProps) {
  // ── State ──────────────────────────────────────────────────────────────────

  const [customization, setCustomization] = useState<StoreCustomization>(
    supabaseCustomization ?? { templateId: DEFAULT_TEMPLATE_ID }
  );
  const [schema, setSchema] = useState<TemplateConfigSchema | null>(null);
  const [activeTab, setActiveTab] = useState<TabValue>("mi-tienda");
  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Capture initial values in refs so the hydration effect runs only once
  const supabaseCustomizationRef = useRef(supabaseCustomization);
  const isAuthenticatedRef = useRef(isAuthenticated);

  // ── Hooks ──────────────────────────────────────────────────────────────────

  const { sendCssVars, sendReload } = usePreviewSync(iframeRef);

  // ── Hydration + migration (runs once on mount) ─────────────────────────────

  useEffect(() => {
    const serverCustomization = supabaseCustomizationRef.current;
    const authenticated = isAuthenticatedRef.current;

    if (authenticated) {
      // Already hydrated from Supabase — run legacy banner migration check only
      if (serverCustomization) migrateLegacyBanners(serverCustomization);
    } else {
      // Demo mode: load from localStorage (may have more recent changes than server fallback)
      const fallback = serverCustomization ?? { templateId: DEFAULT_TEMPLATE_ID };
      migrateLegacyBanners(fallback);
      const local = readLocalCustomization();
      setCustomization(local);
    }
  }, []);

  // ── Schema loading ─────────────────────────────────────────────────────────

  useEffect(() => {
    const templateId = customization.templateId ?? DEFAULT_TEMPLATE_ID;
    getTemplateSchema(templateId).then((loaded) => {
      setSchema(loaded ?? null);
    });
  }, [customization.templateId]);

  // ── Derived values ─────────────────────────────────────────────────────────

  const previewSrc = slug ? `/${slug}?preview=true` : null;

  /** Section IDs from manifest that are not currently active in the layout */
  const availableSections = useMemo<SectionId[]>(() => {
    const activeSectionIds = new Set(
      (customization.layout?.sections ?? []).map((s) => s.id)
    );
    const manifestSections = (manifest?.sections ?? []) as Array<{ id: SectionId }>;
    return manifestSections
      .map((s) => s.id)
      .filter((id) => !activeSectionIds.has(id));
  }, [customization.layout?.sections, manifest]);

  // ── Save handlers ──────────────────────────────────────────────────────────

  async function handleMiTiendaSave(
    branding: BrandingConfig,
    business: BusinessConfig
  ): Promise<void> {
    if (isAuthenticated) {
      const [brandingResult, businessResult] = await Promise.all([
        updateBranding(branding),
        updateBusiness(business),
      ]);

      // Fallback to localStorage on auth expiry mid-session
      if (
        !brandingResult.success &&
        brandingResult.error.code === "UNAUTHORIZED"
      ) {
        const merged: StoreCustomization = {
          ...readLocalCustomization(),
          branding,
          business,
        };
        writeLocalCustomization(merged);
        setCustomization(merged);
        sendReload("mi-tienda-save");
        return;
      }

      if (!brandingResult.success) {
        throw new Error(brandingResult.error.message);
      }
      if (!businessResult.success) {
        throw new Error(businessResult.error.message);
      }

      setCustomization((prev) => ({ ...prev, branding, business }));
    } else {
      // Demo mode: localStorage only
      const merged: StoreCustomization = {
        ...readLocalCustomization(),
        branding,
        business,
      };
      writeLocalCustomization(merged);
      setCustomization(merged);
    }

    sendReload("mi-tienda-save");
  }

  async function handleDisenoSave(theme: ThemeCustomization): Promise<void> {
    if (isAuthenticated) {
      const result = await updateTheme(theme);

      if (!result.success && result.error.code === "UNAUTHORIZED") {
        const merged: StoreCustomization = {
          ...readLocalCustomization(),
          theme,
        };
        writeLocalCustomization(merged);
        setCustomization(merged);
        sendReload("diseno-save");
        return;
      }

      if (!result.success) {
        throw new Error(result.error.message);
      }

      setCustomization((prev) => ({ ...prev, theme }));
    } else {
      // Demo mode: localStorage only
      const merged: StoreCustomization = {
        ...readLocalCustomization(),
        theme,
      };
      writeLocalCustomization(merged);
      setCustomization(merged);
    }

    // Push CSS vars to the preview iframe immediately after save
    sendCssVars(
      buildPreviewVars(manifest as TemplateConfig, { ...customization, theme }, schema)
    );
    sendReload("diseno-save");
  }

  /** Called on every color/radius/font change in DisenoTab — updates preview in real time */
  function handleLivePreview(vars: Record<string, string>): void {
    sendCssVars(vars);
  }

  async function handleContentSave(
    content: Partial<ContentConfig>
  ): Promise<void> {
    if (isAuthenticated) {
      const result = await updateCustomizationSection(
        "content",
        content as Record<string, unknown>
      );

      if (!result.success && result.error.code === "UNAUTHORIZED") {
        const current = readLocalCustomization();
        const merged: StoreCustomization = {
          ...current,
          content: { ...current.content, ...content } as ContentConfig,
        };
        writeLocalCustomization(merged);
        setCustomization(merged);
        sendReload("content-save");
        return;
      }

      if (!result.success) {
        throw new Error(result.error.message);
      }

      setCustomization((prev) => ({
        ...prev,
        content: { ...prev.content, ...content } as ContentConfig,
      }));
    } else {
      const current = readLocalCustomization();
      const merged: StoreCustomization = {
        ...current,
        content: { ...current.content, ...content } as ContentConfig,
      };
      writeLocalCustomization(merged);
      setCustomization(merged);
    }

    sendReload("content-save");
  }

  async function handleSectionsSave(sections: SectionConfig[]): Promise<void> {
    if (isAuthenticated) {
      const result = await updateCustomizationSection("layout", {
        ...((customization.layout as Record<string, unknown>) ?? {}),
        sections,
      });

      if (!result.success && result.error.code === "UNAUTHORIZED") {
        const current = readLocalCustomization();
        const updated: StoreCustomization = {
          ...current,
          layout: { ...current.layout, sections },
        };
        writeLocalCustomization(updated);
        setCustomization(updated);
        sendReload("sections-save");
        return;
      }

      if (!result.success) {
        throw new Error(result.error.message);
      }

      setCustomization((prev) => ({
        ...prev,
        layout: { ...prev.layout, sections },
      }));
    } else {
      const current = readLocalCustomization();
      const updated: StoreCustomization = {
        ...current,
        layout: { ...current.layout, sections },
      };
      writeLocalCustomization(updated);
      setCustomization(updated);
    }

    sendReload("sections-save");
  }

  async function handleProductosSave(
    layout: Partial<LayoutCustomization>,
    content: Partial<ContentConfig>
  ): Promise<void> {
    if (isAuthenticated) {
      const promises: ReturnType<typeof updateCustomizationSection>[] = [];

      if (Object.keys(layout).length > 0) {
        promises.push(
          updateCustomizationSection("layout", layout as Record<string, unknown>)
        );
      }
      if (Object.keys(content).length > 0) {
        promises.push(
          updateCustomizationSection(
            "content",
            content as Record<string, unknown>
          )
        );
      }

      const results = await Promise.all(promises);

      for (const result of results) {
        if (!result.success && result.error.code === "UNAUTHORIZED") {
          const current = readLocalCustomization();
          const merged: StoreCustomization = {
            ...current,
            layout: { ...current.layout, ...layout },
            content: { ...current.content, ...content } as ContentConfig,
          };
          writeLocalCustomization(merged);
          setCustomization(merged);
          sendReload("productos-save");
          return;
        }
        if (!result.success) {
          throw new Error(result.error.message);
        }
      }

      setCustomization((prev) => ({
        ...prev,
        layout: { ...prev.layout, ...layout },
        content: { ...prev.content, ...content } as ContentConfig,
      }));
    } else {
      const current = readLocalCustomization();
      const merged: StoreCustomization = {
        ...current,
        layout: { ...current.layout, ...layout },
        content: { ...current.content, ...content } as ContentConfig,
      };
      writeLocalCustomization(merged);
      setCustomization(merged);
    }

    sendReload("productos-save");
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <ConfigDirtyProvider>
      {/* Split-panel layout */}
      <div className="flex h-[calc(100vh-4rem)] w-full">
        {/* LEFT PANEL — Controls (100% mobile, 40% desktop) */}
        <div className="w-full lg:w-[40%] lg:min-w-[400px] lg:max-w-[560px] flex flex-col border-r overflow-hidden">
          {/* Tab navigation */}
          <div className="flex border-b px-2 pt-2 gap-1 shrink-0 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-t-md transition-colors shrink-0",
                  activeTab === tab.value
                    ? "bg-background text-foreground border border-b-0 border-border"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab content — scrollable */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === "mi-tienda" && (
              <MiTiendaTab
                initialBranding={customization.branding}
                initialBusiness={customization.business}
                isAuthenticated={isAuthenticated}
                onSave={handleMiTiendaSave}
              />
            )}

            {activeTab === "diseno" && (
              <DisenoTab
                initialTheme={customization.theme}
                schema={schema ?? undefined}
                manifest={manifest as TemplateConfig}
                isAuthenticated={isAuthenticated}
                onSave={handleDisenoSave}
                onLivePreview={handleLivePreview}
              />
            )}

            {activeTab === "contenido" && (
              <ContenidoTab
                initialContent={customization.content}
                initialSections={
                  customization.layout?.sections?.length
                    ? customization.layout.sections
                    : ((manifest?.sections as SectionConfig[] | undefined) ?? [])
                }
                availableSections={availableSections}
                sectionSchemas={schema?.sectionSchemas}
                isAuthenticated={isAuthenticated}
                onContentSave={handleContentSave}
                onSectionsSave={handleSectionsSave}
              />
            )}

            {activeTab === "productos" && (
              <ProductosTab
                initialLayout={customization.layout}
                initialContent={customization.content}
                products={initialProducts}
                schema={schema ?? undefined}
                isAuthenticated={isAuthenticated}
                onSave={handleProductosSave}
                onLivePreview={handleLivePreview}
              />
            )}
          </div>
        </div>

        {/* RIGHT PANEL — Live preview (hidden on mobile, 60% on desktop) */}
        <div className="hidden lg:flex lg:flex-1 flex-col bg-muted/30">
          <PreviewFrame
            ref={iframeRef}
            src={previewSrc}
            isLoaded={isIframeLoaded}
            onLoad={() => setIsIframeLoaded(true)}
          />
        </div>
      </div>

      {/* Mobile: FAB to open preview sheet */}
      <button
        type="button"
        onClick={() => setIsMobilePreviewOpen(true)}
        className="fixed bottom-6 right-6 lg:hidden z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:opacity-90 transition-opacity"
      >
        <Eye className="w-4 h-4" />
        <span className="text-sm font-medium">Vista previa</span>
      </button>

      {/* Mobile: preview sheet */}
      <Sheet open={isMobilePreviewOpen} onOpenChange={setIsMobilePreviewOpen}>
        <SheetContent side="bottom" className="h-[90vh] p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>Vista previa de tu tienda</SheetTitle>
          </SheetHeader>
          <div className="flex-1 h-[calc(90vh-4.5rem)]">
            <PreviewFrame
              ref={iframeRef}
              src={previewSrc}
              isLoaded={isIframeLoaded}
              onLoad={() => setIsIframeLoaded(true)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </ConfigDirtyProvider>
  );
}
