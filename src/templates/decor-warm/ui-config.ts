import { decorWarmManifest as decorWarmConfig } from "./manifest";
import { decorWarmPalettes } from "./palettes";
import type { TemplateUIConfig } from "@/types/templates/ui-config";
import type { CustomizerPalette } from "@/components/customizer/ThemeCustomizer";

export const decorWarmUiConfig = {
  label: "Decor Warm",
  defaultConfig: decorWarmConfig,
  colorFields: [
    { key: "primary", label: "Color primario" },
    { key: "secondary", label: "Color secundario" },
    { key: "background", label: "Fondo de página" },
    { key: "foreground", label: "Color del texto" },
    { key: "card", label: "Fondo de tarjetas" },
    { key: "border", label: "Color de bordes" },
    { key: "muted", label: "Texto secundario" },
    { key: "accent", label: "Color de acento" },
    { key: "onPrimary", label: "Texto sobre primario" },
    { key: "peach", label: "Color melocotón" },
    { key: "iconInactive", label: "Íconos inactivos" },
  ],
  gridFields: [
    {
      key: "products",
      mobileLabel: "Productos por fila (celular)",
      desktopLabel: "Productos por fila (computador)",
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
  ],
  layoutOptions: [
    {
      key: "cardImageRatio",
      label: "Forma de las imágenes",
      options: [
        { value: "square", label: "Cuadrada" },
        { value: "portrait", label: "Vertical" },
        { value: "wide", label: "Horizontal" },
      ],
    },
  ],
  sectionLabels: [
    { id: "hero", label: "Banner principal" },
    { id: "categories", label: "Categorías" },
    { id: "popular", label: "Más vendido" },
    { id: "products", label: "Productos" },
  ],
  palettes: decorWarmPalettes as CustomizerPalette[],
  fontPairs: [
    { key: "amigable", label: "Amigable", heading: "Poppins", body: "Nunito" },
    { key: "elegante", label: "Elegante", heading: "Cormorant Garamond", body: "Lato" },
    { key: "artesanal", label: "Artesanal", heading: "Caveat", body: "Karla" },
    { key: "minimalista", label: "Minimalista", heading: "Manrope", body: "Inter" },
  ],
} satisfies TemplateUIConfig;
