import { furnitureDarkManifest } from "./manifest";
import { furnitureDarkPalettes } from "./palettes";
import type { TemplateUIConfig } from "@/types/templates/ui-config";
import type { CustomizerPalette } from "@/components/customizer/ThemeCustomizer";

export const furnitureDarkUiConfig = {
  label: "Furniture Dark",
  defaultConfig: furnitureDarkManifest,
  defaultFontPairKey: "elegante",
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
    { key: "categoryActiveBg", label: "Categoría activa (fondo)" },
    { key: "categoryActiveText", label: "Categoría activa (texto)" },
  ],
  gridFields: [
    {
      key: "products",
      mobileLabel: "Productos por fila (celular)",
      desktopLabel: "Productos por fila (computador)",
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
    { id: "hero", label: "Carrusel de promociones" },
    { id: "categories", label: "Categorías" },
    { id: "video", label: "Video de la tienda" },
    { id: "products", label: "Más vendidos" },
    { id: "collections", label: "Destacados" },
  ],
  palettes: furnitureDarkPalettes as CustomizerPalette[],
  fontPairs: [
    { key: "elegante", label: "Elegante", heading: "Cormorant Garamond", body: "Lato" },
    { key: "editorial", label: "Editorial", heading: "Bodoni Moda", body: "DM Sans" },
    { key: "preciso", label: "Preciso", heading: "Space Grotesk", body: "IBM Plex Sans" },
    { key: "minimalista", label: "Minimalista", heading: "Manrope", body: "Inter" },
  ],
} satisfies TemplateUIConfig;
