"use client";

// ConfiguracionClient — Client Component wrapper for the configuracion page.
// Owns the tab state. Each tab is a separate presentational component.

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BrandingTab } from "./tabs/branding-tab";
import { ContentTab } from "./tabs/content-tab";
import { ThemeTab } from "./tabs/theme-tab";
import { BusinessTab } from "./tabs/business-tab";
import type { StoreCustomization } from "@/types/templates/store-customization";

interface ConfiguracionClientProps {
  storeId: string;
  storeSlug: string;
  storeName: string;
  initialCustomization: StoreCustomization;
}

const TABS = [
  { value: "identidad", label: "Identidad" },
  { value: "contenido", label: "Contenido" },
  { value: "apariencia", label: "Apariencia" },
  { value: "negocio", label: "Negocio" },
] as const;

export function ConfiguracionClient({
  storeId,
  storeSlug,
  storeName,
  initialCustomization,
}: ConfiguracionClientProps) {
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
            <span className="font-medium text-foreground">{storeName}</span> para
            tus clientes.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mx-auto max-w-5xl px-4 py-8 md:px-6 lg:px-8">
        <Tabs defaultValue="identidad">
          {/* Tab list — scrollable on mobile */}
          <div className="overflow-x-auto pb-1">
            <TabsList className="mb-6 w-full min-w-max justify-start gap-1 bg-muted/40 p-1">
              {TABS.map(({ value, label }) => (
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

          <TabsContent value="identidad">
            <BrandingTab
              storeId={storeId}
              initialBranding={initialCustomization.branding}
            />
          </TabsContent>

          <TabsContent value="contenido">
            <ContentTab
              storeId={storeId}
              initialContent={initialCustomization.content}
            />
          </TabsContent>

          <TabsContent value="apariencia">
            <ThemeTab
              storeId={storeId}
              initialTheme={initialCustomization.theme}
            />
          </TabsContent>

          <TabsContent value="negocio">
            <BusinessTab
              storeId={storeId}
              initialBusiness={initialCustomization.business}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
