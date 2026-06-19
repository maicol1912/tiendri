"use client";

// ConfiguracionClient — Client Component wrapper for the configuracion page.
// Owns the tab state. Universal tabs + dynamic tabs driven by TemplateConfigSchema.
// Also handles one-time banner data migration from the old localStorage key.
//
// Persistence strategy:
//   - isAuthenticated=true  → Server Actions write to Supabase
//   - isAuthenticated=false → localStorage fallback (demo / unauthenticated mode)

import { useEffect, useCallback, useState, useRef } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BrandingTab } from "./tabs/branding-tab";
import { ThemeTab } from "./tabs/theme-tab";
import { BusinessTab } from "./tabs/business-tab";
import { DynamicTabContent, SectionsAccordionTab } from "@/components/dashboard/schema-form";
import { getTemplateSchema } from "@/templates/registry";
import { setByPath } from "@/catalog/config-path-utils";
import { updateCustomizationSection } from "./actions";
import { CUSTOMIZATION_STORAGE_KEY } from "./client-utils";
import type { StoreCustomization } from "@/types/templates/store-customization";
import type { ConfigTabGroup, TemplateConfigSchema } from "@/types/templates/config-schema";
import type { SectionConfig } from "@/types/templates/sections";

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
  return { templateId: "tech-premium" };
}

function writeLocalCustomization(data: StoreCustomization): void {
  try {
    localStorage.setItem(CUSTOMIZATION_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Non-critical in fallback mode
  }
}

// ── Component ────────────────────────────────────────────────────────────────

interface ConfiguracionClientProps {
  storeName?: string;
  initialCustomization: StoreCustomization;
  /**
   * When true, the user is authenticated and Server Actions write to Supabase.
   * When false, all saves fall back to localStorage (demo mode).
   */
  isAuthenticated: boolean;
}

export function ConfiguracionClient({
  initialCustomization,
  isAuthenticated,
}: ConfiguracionClientProps) {
  const [customization, setCustomization] =
    useState<StoreCustomization>(initialCustomization);

  const [schema, setSchema] = useState<TemplateConfigSchema | null>(null);

  // Capture initial values in refs so the effect runs once on mount without
  // re-running when props change (they never change after first render anyway).
  const initialCustomizationRef = useRef(initialCustomization);
  const isAuthenticatedRef = useRef(isAuthenticated);

  // In demo mode, hydrate from localStorage after mount (client-only).
  // In authenticated mode, use the server-provided initialCustomization directly.
  useEffect(() => {
    const initial = initialCustomizationRef.current;
    const authenticated = isAuthenticatedRef.current;

    if (authenticated) {
      // Already hydrated from Supabase via Server Component — just run migration check
      migrateLegacyBanners(initial);
    } else {
      // Demo mode: load from localStorage (may have more recent changes than server-provided fallback)
      migrateLegacyBanners(initial);
      const local = readLocalCustomization();
      setCustomization(local);
    }

    const templateId = initial.templateId ?? "tech-premium";
    getTemplateSchema(templateId).then((loaded) => {
      setSchema(loaded);
    });
  }, []);

  const storeName = customization.branding?.storeName ?? "Mi tienda";

  const dynamicTabGroups: ConfigTabGroup[] =
    schema?.content.tabGroups ?? [];

  const hasSectionSchemas =
    !!schema?.sectionSchemas && Object.keys(schema.sectionSchemas).length > 0;

  // Build the tab list: Identidad -> [dynamic tabs] -> [Secciones] -> Apariencia -> Negocio
  const tabs: { value: string; label: string }[] = [
    { value: "identidad", label: "Identidad" },
    ...dynamicTabGroups.map((tg) => ({ value: tg.id, label: tg.label })),
    ...(hasSectionSchemas ? [{ value: "secciones", label: "Secciones" }] : []),
    { value: "apariencia", label: "Apariencia" },
    { value: "negocio", label: "Negocio" },
  ];

  // Save handler for DynamicTabContent — merges updated data into the full blob.
  // Tries Supabase first; falls back to localStorage on UNAUTHORIZED.
  const handleDynamicTabSave = useCallback(
    async (data: Record<string, unknown>) => {
      if (isAuthenticated) {
        // For dynamic tabs the data arrives as a flat merge over the full blob.
        // We call updateCustomizationSection for each top-level key in the patch.
        for (const [sectionKey, sectionData] of Object.entries(data)) {
          const key = sectionKey as keyof StoreCustomization;
          const value = sectionData as Record<string, unknown>;
          const result = await updateCustomizationSection(key, value);

          if (!result.success) {
            if (result.error.code === "UNAUTHORIZED") {
              // Auth expired mid-session — silently fall back to localStorage
              const merged = { ...readLocalCustomization(), ...data } as StoreCustomization;
              writeLocalCustomization(merged);
              setCustomization(merged);
              return;
            }
            // Other errors are surfaced via toast inside DynamicTabContent
            throw new Error(result.error.message);
          }
        }
        // Update local state to reflect saved data
        setCustomization((prev) => ({ ...prev, ...data } as StoreCustomization));
      } else {
        // Demo mode: localStorage only
        const merged = { ...readLocalCustomization(), ...data } as StoreCustomization;
        writeLocalCustomization(merged);
        setCustomization(merged);
      }
    },
    [isAuthenticated]
  );

  // Save handler for SectionsAccordionTab — persists section order/visibility to layout.sections.
  const handleSectionsSave = useCallback(
    async (sections: SectionConfig[]) => {
      if (isAuthenticated) {
        const result = await updateCustomizationSection("layout", {
          ...((customization.layout as Record<string, unknown>) ?? {}),
          sections,
        });

        if (!result.success) {
          if (result.error.code === "UNAUTHORIZED") {
            // Auth expired — fall back to localStorage
            const current = readLocalCustomization();
            const updated: StoreCustomization = {
              ...current,
              layout: { ...current.layout, sections },
            };
            writeLocalCustomization(updated);
            setCustomization(updated);
            return;
          }
          throw new Error(result.error.message);
        }

        setCustomization((prev) => ({
          ...prev,
          layout: { ...prev.layout, sections },
        }));
      } else {
        // Demo mode: localStorage only
        const current = readLocalCustomization();
        const updated: StoreCustomization = {
          ...current,
          layout: { ...current.layout, sections },
        };
        writeLocalCustomization(updated);
        setCustomization(updated);
      }
    },
    [isAuthenticated, customization.layout]
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="border-b bg-card">
        <div className="mx-auto max-w-5xl px-4 py-6 md:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-foreground">
            Configuración de tu tienda
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Personalizá cómo se ve{" "}
            <span className="font-medium text-foreground">{storeName}</span>{" "}
            para tus clientes.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mx-auto max-w-5xl px-4 py-8 md:px-6 lg:px-8">
        <Tabs defaultValue="identidad">
          {/* Tab list — scrollable on mobile */}
          <div className="overflow-x-auto pb-1">
            <TabsList className="mb-6 w-full min-w-max justify-start gap-1 bg-muted/40 p-1">
              {tabs.map(({ value, label }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="flex-none px-4 py-2 text-sm"
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Universal tab: Identidad */}
          <TabsContent value="identidad">
            <BrandingTab
              initialBranding={customization.branding}
              isAuthenticated={isAuthenticated}
            />
          </TabsContent>

          {/* Dynamic tabs from schema */}
          {dynamicTabGroups.map((tabGroup) => (
            <TabsContent key={tabGroup.id} value={tabGroup.id}>
              <DynamicTabContent
                tabGroup={tabGroup}
                customization={
                  customization as unknown as Record<string, unknown>
                }
                onSave={handleDynamicTabSave}
              />
            </TabsContent>
          ))}

          {/* Secciones tab — only rendered when the schema defines sectionSchemas */}
          {hasSectionSchemas && (
            <TabsContent value="secciones">
              <SectionsAccordionTab
                sectionSchemas={schema!.sectionSchemas!}
                sections={customization?.layout?.sections ?? []}
                onSave={handleSectionsSave}
              />
            </TabsContent>
          )}

          {/* Universal tab: Apariencia */}
          <TabsContent value="apariencia">
            <ThemeTab
              initialTheme={customization.theme}
              schema={schema ?? undefined}
              isAuthenticated={isAuthenticated}
            />
          </TabsContent>

          {/* Universal tab: Negocio */}
          <TabsContent value="negocio">
            <BusinessTab
              initialBusiness={customization.business}
              isAuthenticated={isAuthenticated}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
