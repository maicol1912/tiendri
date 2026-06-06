"use client";

import { useState, useCallback } from "react";
import { Check, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { updateStructuralVariants, readCustomization } from "../actions";
import type { StructuralVariants } from "@/types/templates/structural-variants";
import type {
  HeaderVariant,
  HeroVariant,
  CategoryNavVariant,
  CardContentLayout,
  FooterVariant,
  BottomNavVariant,
  CartVariant,
  CheckoutVariant,
} from "@/types/templates/primitives";

// ── Variant option descriptors ────────────────────────────────────────────────

interface VariantOption<T extends string> {
  value: T;
  label: string;
  description: string;
  bgClass: string;
}

const HEADER_VARIANTS: VariantOption<HeaderVariant>[] = [
  {
    value: "minimal-dark",
    label: "Mínimo",
    description: "Logotipo centrado, fondo oscuro",
    bgClass: "bg-zinc-900",
  },
  {
    value: "location-greeting",
    label: "Con saludo",
    description: "Saludo personalizado con ubicación",
    bgClass: "bg-zinc-800",
  },
];

const HERO_VARIANTS: VariantOption<HeroVariant>[] = [
  {
    value: "contained",
    label: "Contenido",
    description: "Imagen enmarcada con margen",
    bgClass: "bg-indigo-900",
  },
  {
    value: "full-bleed",
    label: "Imagen completa",
    description: "Foto de borde a borde",
    bgClass: "bg-indigo-700",
  },
  {
    value: "split",
    label: "Dividido",
    description: "Texto e imagen lado a lado",
    bgClass: "bg-violet-800",
  },
  {
    value: "text-only",
    label: "Solo texto",
    description: "Portada limpia sin imagen",
    bgClass: "bg-slate-700",
  },
  {
    value: "promo-carousel",
    label: "Carrusel de promos",
    description: "Slider de promociones rotativas",
    bgClass: "bg-purple-800",
  },
];

const CATEGORY_NAV_VARIANTS: VariantOption<CategoryNavVariant>[] = [
  {
    value: "icon-grid",
    label: "Íconos en cuadrícula",
    description: "Ícono + nombre en grilla compacta",
    bgClass: "bg-sky-800",
  },
  {
    value: "image-pills",
    label: "Fotos en píldoras",
    description: "Foto circular con nombre debajo",
    bgClass: "bg-cyan-800",
  },
  {
    value: "horizontal-scroll",
    label: "Deslizable",
    description: "Scroll horizontal de chips",
    bgClass: "bg-teal-800",
  },
  {
    value: "tab-bar",
    label: "Pestañas",
    description: "Barra de pestañas tipo app",
    bgClass: "bg-emerald-800",
  },
  {
    value: "chips",
    label: "Chips",
    description: "Etiquetas compactas filtrables",
    bgClass: "bg-green-800",
  },
];

const CARD_LAYOUT_VARIANTS: VariantOption<CardContentLayout>[] = [
  {
    value: "below-image",
    label: "Info debajo",
    description: "Nombre y precio bajo la foto",
    bgClass: "bg-amber-800",
  },
  {
    value: "overlay-bottom",
    label: "Info sobre la foto",
    description: "Texto superpuesto en la parte inferior",
    bgClass: "bg-orange-800",
  },
  {
    value: "overlay-full",
    label: "Foto completa",
    description: "Overlay oscuro sobre toda la imagen",
    bgClass: "bg-red-900",
  },
  {
    value: "side-by-side",
    label: "Lado a lado",
    description: "Imagen y texto en columnas",
    bgClass: "bg-rose-900",
  },
  {
    value: "dark-elevated",
    label: "Tarjeta elevada",
    description: "Tarjeta oscura con sombra pronunciada",
    bgClass: "bg-zinc-800",
  },
];

const FOOTER_VARIANTS: VariantOption<FooterVariant>[] = [
  {
    value: "three-column",
    label: "Tres columnas",
    description: "Logo, navegación e información de contacto",
    bgClass: "bg-slate-800",
  },
  {
    value: "compact-row",
    label: "Compacto",
    description: "Fila simple con lo esencial",
    bgClass: "bg-slate-700",
  },
];

const BOTTOM_NAV_VARIANTS: VariantOption<BottomNavVariant>[] = [
  {
    value: "flat-solid",
    label: "Sólido",
    description: "Fondo opaco de color sólido",
    bgClass: "bg-zinc-900",
  },
  {
    value: "frosted-glass",
    label: "Vidrio esmerilado",
    description: "Efecto glassmorphism translúcido",
    bgClass: "bg-zinc-700/60",
  },
];

const CART_VARIANTS: VariantOption<CartVariant>[] = [
  {
    value: "detailed",
    label: "Detallado",
    description: "Resumen completo con variantes y notas",
    bgClass: "bg-blue-900",
  },
  {
    value: "minimal",
    label: "Mínimo",
    description: "Lista limpia de productos y total",
    bgClass: "bg-blue-800",
  },
];

const CHECKOUT_VARIANTS: VariantOption<CheckoutVariant>[] = [
  {
    value: "detailed",
    label: "Completo",
    description: "Formulario con todos los campos de envío",
    bgClass: "bg-violet-900",
  },
  {
    value: "minimal",
    label: "Simplificado",
    description: "Solo nombre y número de WhatsApp",
    bgClass: "bg-violet-800",
  },
];

// ── Section definition ────────────────────────────────────────────────────────

interface SectionDef<T extends string> {
  key: keyof StructuralVariants;
  title: string;
  subtitle: string;
  variants: VariantOption<T>[];
  defaultValue: T;
}

// ── VariantCard ───────────────────────────────────────────────────────────────

interface VariantCardProps<T extends string> {
  option: VariantOption<T>;
  isSelected: boolean;
  onSelect: (value: T) => void;
}

function VariantCard<T extends string>({ option, isSelected, onSelect }: VariantCardProps<T>) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option.value)}
      className={cn(
        "group relative flex flex-col rounded-xl border-2 overflow-hidden text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        isSelected
          ? "border-primary shadow-md shadow-primary/20"
          : "border-border hover:border-primary/50 hover:shadow-sm"
      )}
    >
      {/* Visual preview block */}
      <div className={cn("relative h-16 w-full flex items-center justify-center", option.bgClass)}>
        {isSelected && (
          <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary shadow-sm">
            <Check className="h-3 w-3 text-primary-foreground" />
          </div>
        )}
        <span className="text-[10px] font-semibold uppercase tracking-wider text-white/60 select-none">
          {option.value}
        </span>
      </div>

      {/* Label + description */}
      <div className="p-2.5">
        <p className={cn(
          "text-xs font-semibold leading-tight",
          isSelected ? "text-primary" : "text-foreground"
        )}>
          {option.label}
        </p>
        <p className="mt-0.5 text-[10px] leading-snug text-muted-foreground line-clamp-2">
          {option.description}
        </p>
      </div>
    </button>
  );
}

// ── Collapsible section group ─────────────────────────────────────────────────

interface SectionGroupProps<T extends string> {
  section: SectionDef<T>;
  currentValue: T | undefined;
  onSelect: (key: keyof StructuralVariants, value: string) => void;
}

function SectionGroup<T extends string>({ section, currentValue, onSelect }: SectionGroupProps<T>) {
  const [open, setOpen] = useState(true);
  const active = currentValue ?? section.defaultValue;

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between bg-card px-4 py-3 text-left hover:bg-muted/40 transition-colors"
      >
        <div>
          <p className="text-sm font-semibold text-foreground">{section.title}</p>
          <p className="text-xs text-muted-foreground">{section.subtitle}</p>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200 shrink-0",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="border-t border-border bg-muted/20 p-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {section.variants.map((opt) => (
              <VariantCard
                key={opt.value}
                option={opt}
                isSelected={active === opt.value}
                onSelect={(v) => onSelect(section.key, v)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── SectionPicker ─────────────────────────────────────────────────────────────

export interface SectionPickerProps {
  initialVariants?: StructuralVariants;
  onVariantsChange?: (variants: StructuralVariants) => void;
}

export function SectionPicker({ initialVariants, onVariantsChange }: SectionPickerProps) {
  const [variants, setVariants] = useState<StructuralVariants>(initialVariants ?? {});
  const [isSaving, setIsSaving] = useState(false);

  const handleSelect = useCallback(
    (key: keyof StructuralVariants, value: string) => {
      const updated = { ...variants, [key]: value } as StructuralVariants;
      setVariants(updated);
      onVariantsChange?.(updated);
    },
    [variants, onVariantsChange]
  );

  function handleSave() {
    setIsSaving(true);
    const result = updateStructuralVariants(variants);
    setIsSaving(false);

    if (result.success) {
      toast.success("Secciones guardadas correctamente");
    } else {
      toast.error(result.error.message);
    }
  }

  // Sections ordered by visual hierarchy in the storefront
  const sections = [
    {
      key: "headerVariant" as const,
      title: "Encabezado",
      subtitle: "Cómo se ve la barra superior de tu tienda",
      variants: HEADER_VARIANTS,
      defaultValue: "minimal-dark" as HeaderVariant,
    },
    {
      key: "heroVariant" as const,
      title: "Portada",
      subtitle: "El bloque principal que los clientes ven al entrar",
      variants: HERO_VARIANTS,
      defaultValue: "contained" as HeroVariant,
    },
    {
      key: "categoryNavVariant" as const,
      title: "Categorías",
      subtitle: "Cómo se muestran las secciones de tu catálogo",
      variants: CATEGORY_NAV_VARIANTS,
      defaultValue: "horizontal-scroll" as CategoryNavVariant,
    },
    {
      key: "cardContentLayout" as const,
      title: "Tarjetas de producto",
      subtitle: "El diseño de cada producto en el catálogo",
      variants: CARD_LAYOUT_VARIANTS,
      defaultValue: "below-image" as CardContentLayout,
    },
    {
      key: "footerVariant" as const,
      title: "Pie de página",
      subtitle: "La sección inferior con información de contacto y links",
      variants: FOOTER_VARIANTS,
      defaultValue: "three-column" as FooterVariant,
    },
    {
      key: "bottomNavVariant" as const,
      title: "Navegación inferior",
      subtitle: "La barra de navegación flotante en móvil",
      variants: BOTTOM_NAV_VARIANTS,
      defaultValue: "flat-solid" as BottomNavVariant,
    },
    {
      key: "cartVariant" as const,
      title: "Carrito",
      subtitle: "Vista del resumen de compra antes de pedir",
      variants: CART_VARIANTS,
      defaultValue: "detailed" as CartVariant,
    },
    {
      key: "checkoutVariant" as const,
      title: "Checkout",
      subtitle: "El formulario final donde el cliente completa su pedido",
      variants: CHECKOUT_VARIANTS,
      defaultValue: "detailed" as CheckoutVariant,
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Personalizar secciones</CardTitle>
          <CardDescription>
            Elegí el diseño de cada parte de tu tienda. Los cambios se aplican al guardar.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {sections.map((section) => (
            <SectionGroup
              key={section.key}
              section={section}
              currentValue={variants[section.key] as string | undefined}
              onSelect={handleSelect}
            />
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          type="button"
          disabled={isSaving}
          onClick={handleSave}
          className="min-w-32"
        >
          {isSaving ? "Guardando..." : "Guardar cambios"}
        </Button>
      </div>
    </div>
  );
}
