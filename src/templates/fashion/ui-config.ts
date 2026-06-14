import { fashionConfig } from "./config";
import { fashionPalettes } from "./palettes";
import type { TemplateUIConfig } from "@/types/templates/ui-config";
import type { CustomizerPalette } from "@/components/customizer/ThemeCustomizer";

export const fashionUiConfig = {
  label: "Fashion",
  defaultConfig: fashionConfig,
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
  ],
  gridFields: [
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
    { id: "collections", label: "Colecciones" },
    { id: "editorial", label: "Editorial" },
  ],
  palettes: fashionPalettes as CustomizerPalette[],
} satisfies TemplateUIConfig;
