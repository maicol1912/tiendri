import { foodNightManifest } from "./manifest";
import { foodNightPalettes } from "./palettes";
import type { TemplateUIConfig } from "@/types/templates/ui-config";
import type { CustomizerPalette } from "@/components/customizer/ThemeCustomizer";

export const foodNightUiConfig = {
  label: "Food Night",
  defaultConfig: foodNightManifest,
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
    { key: "buttonBg", label: "Fondo del botón" },
    { key: "categoryActiveBg", label: "Categoría activa (fondo)" },
    { key: "borderLight", label: "Borde claro" },
    { key: "navBorder", label: "Borde de navegación" },
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
        { value: "portrait", label: "Vertical" },
        { value: "square", label: "Cuadrada" },
        { value: "wide", label: "Horizontal" },
      ],
    },
  ],
  sectionLabels: [
    { id: "categories", label: "Categorías" },
    { id: "products", label: "Productos" },
  ],
  palettes: foodNightPalettes as CustomizerPalette[],
  fontPairs: [
    { key: "urbano", label: "Urbano", heading: "Syne", body: "Nunito Sans" },
    { key: "audaz", label: "Audaz", heading: "Bebas Neue", body: "Hind" },
    { key: "preciso", label: "Preciso", heading: "Space Grotesk", body: "IBM Plex Sans" },
    { key: "minimalista", label: "Minimalista", heading: "Manrope", body: "Inter" },
  ],
} satisfies TemplateUIConfig;
