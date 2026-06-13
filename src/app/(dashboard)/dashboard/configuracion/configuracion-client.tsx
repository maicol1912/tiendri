"use client";

// ConfiguracionClient — Client Component wrapper for the configuracion page.
// Owns the tab state. Universal tabs + dynamic tabs driven by TemplateConfigSchema.
// Also handles one-time banner data migration from the old localStorage key.

import { useEffect, useCallback, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BrandingTab } from "./tabs/branding-tab";
import { ThemeTab } from "./tabs/theme-tab";
import { BusinessTab } from "./tabs/business-tab";
import { DynamicTabContent } from "@/components/dashboard/schema-form";
import { getTemplateSchemaSync } from "@/templates/registry";
import { setByPath } from "@/lib/config-path-utils";
import {
  readCustomization,
  CUSTOMIZATION_STORAGE_KEY,
} from "./actions";
import type { StoreCustomization } from "@/types/templates/store-customization";
import type { ConfigTabGroup } from "@/types/templates/config-schema";

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
 */
function migrateLegacyBanners(): void {
  try {
    const raw = localStorage.getItem(LEGACY_BANNERS_KEY);
    if (!raw) return;

    const banners = JSON.parse(raw) as LegacyBannersData;
    const current = readCustomization();

    // Skip if main blob already has heroBanner data (already migrated or configured via new UI)
    if (current.content?.heroBanner) return;

    let updated: Record<string, unknown> = current as unknown as Record<
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

// ── Component ────────────────────────────────────────────────────────────────

interface ConfiguracionClientProps {
  storeName: string;
  initialCustomization: StoreCustomization;
}

export function ConfiguracionClient({
  storeName,
  initialCustomization,
}: ConfiguracionClientProps) {
  const [customization, setCustomization] =
    useState<StoreCustomization>(initialCustomization);

  // Run one-time banner data migration on mount
  useEffect(() => {
    migrateLegacyBanners();
    // Re-read customization in case the migration modified it
    setCustomization(readCustomization());
  }, []);

  // Load schema for the active template
  const templateId = customization.templateId ?? "tech-premium";
  const schema = getTemplateSchemaSync(templateId);
  const dynamicTabGroups: ConfigTabGroup[] =
    schema?.content.tabGroups ?? [];

  // Build the tab list: Identidad -> [dynamic tabs] -> Apariencia -> Negocio
  const tabs: { value: string; label: string }[] = [
    { value: "identidad", label: "Identidad" },
    ...dynamicTabGroups.map((tg) => ({ value: tg.id, label: tg.label })),
    { value: "apariencia", label: "Apariencia" },
    { value: "negocio", label: "Negocio" },
  ];

  // Save handler for DynamicTabContent — merges updated data into the full blob
  const handleDynamicTabSave = useCallback(
    (data: Record<string, unknown>) => {
      try {
        const merged = { ...readCustomization(), ...data } as StoreCustomization;
        localStorage.setItem(CUSTOMIZATION_STORAGE_KEY, JSON.stringify(merged));
        setCustomization(merged);
      } catch {
        // Error is surfaced via toast inside DynamicTabContent
      }
    },
    []
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
            <BrandingTab initialBranding={customization.branding} />
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

          {/* Universal tab: Apariencia */}
          <TabsContent value="apariencia">
            <ThemeTab
              initialTheme={customization.theme}
              schema={schema ?? undefined}
            />
          </TabsContent>

          {/* Universal tab: Negocio */}
          <TabsContent value="negocio">
            <BusinessTab initialBusiness={customization.business} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
