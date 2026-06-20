import { beautyElegantManifest } from "./manifest";
import { beautyElegantPalettes } from "./palettes";
import type { TemplateUIConfig } from "@/types/templates/ui-config";
import type { CustomizerPalette } from "@/components/customizer/ThemeCustomizer";

export const beautyElegantUiConfig = {
  label: "Beauty Elegant",
  defaultConfig: beautyElegantManifest,
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
    { key: "bottomNavBg", label: "Fondo nav inferior" },
    { key: "discountBg", label: "Fondo descuento" },
    { key: "discountText", label: "Texto descuento" },
    { key: "reviewBg", label: "Fondo reseñas" },
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
        { value: "portrait", label: "Vertical" },
        { value: "square", label: "Cuadrada" },
        { value: "wide", label: "Horizontal" },
      ],
    },
  ],
  sectionLabels: [
    { id: "hero", label: "Bienvenida" },
    { id: "categories", label: "Categorías" },
    { id: "products", label: "Productos" },
  ],
  palettes: beautyElegantPalettes as CustomizerPalette[],
  fontPairs: [
    { key: "elegante", label: "Elegante", heading: "Cormorant Garamond", body: "Lato" },
    { key: "editorial", label: "Editorial", heading: "Bodoni Moda", body: "DM Sans" },
    { key: "amigable", label: "Amigable", heading: "Poppins", body: "Nunito" },
    { key: "minimalista", label: "Minimalista", heading: "Manrope", body: "Inter" },
  ],
} satisfies TemplateUIConfig;
