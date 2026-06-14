import { beautySoftConfig } from "./config";
import { beautySoftPalettes } from "./palettes";
import type { TemplateUIConfig } from "@/types/templates/ui-config";
import type { CustomizerPalette } from "@/components/customizer/ThemeCustomizer";

export const beautySoftUiConfig = {
  label: "Beauty Soft",
  defaultConfig: beautySoftConfig,
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
    { key: "iconPillBg", label: "Fondo íconos" },
    { key: "discountBg", label: "Fondo descuento" },
    { key: "discountText", label: "Texto descuento" },
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
  ],
  layoutOptions: [
    {
      key: "cardImageRatio",
      label: "Forma de las imágenes",
      options: [
        { value: "square", label: "Cuadrada" },
        { value: "portrait", label: "Vertical" },
      ],
    },
  ],
  sectionLabels: [
    { id: "hero", label: "Banner principal" },
    { id: "categories", label: "Categorías" },
    { id: "products", label: "Productos" },
  ],
  palettes: beautySoftPalettes as CustomizerPalette[],
} satisfies TemplateUIConfig;
