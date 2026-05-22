"use client";

// ContentTab — Visual content configuration
// Fields: hero banner, nav links, footer lists, product tabs, popular searches
// Save: calls updateContent Server Action

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Plus, Trash2, Loader2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { updateContent } from "../actions";
import type { ContentConfig } from "@/types/templates/customization-sections";

interface ContentTabProps {
  storeId: string;
  initialContent?: ContentConfig;
}

interface NavLink {
  label: string;
  href: string;
}

interface ProductTab {
  id: string;
  label: string;
}

export function ContentTab({ initialContent }: ContentTabProps) {
  // Hero banner state
  const [heroTitle, setHeroTitle] = useState(initialContent?.heroBanner?.title ?? "");
  const [heroSubtitle, setHeroSubtitle] = useState(initialContent?.heroBanner?.subtitle ?? "");
  const [heroCtaText, setHeroCtaText] = useState(initialContent?.heroBanner?.ctaText ?? "");

  // Nav links state
  const [navLinks, setNavLinks] = useState<NavLink[]>(
    initialContent?.navLinks ?? []
  );

  // Product tabs state
  const [productTabs, setProductTabs] = useState<ProductTab[]>(
    initialContent?.productTabs ?? []
  );

  // Popular searches state
  const [popularSearches, setPopularSearches] = useState<string[]>(
    initialContent?.popularSearches ?? []
  );
  const [newSearch, setNewSearch] = useState("");

  // Footer lists state
  const [footerServices, setFooterServices] = useState<string[]>(
    initialContent?.footerServices ?? []
  );
  const [footerAssistance, setFooterAssistance] = useState<string[]>(
    initialContent?.footerAssistance ?? []
  );

  const [isPending, startTransition] = useTransition();

  // ── Nav links helpers ───────────────────────────────────────────────────────

  function addNavLink() {
    setNavLinks((prev) => [...prev, { label: "", href: "" }]);
  }

  function removeNavLink(index: number) {
    setNavLinks((prev) => prev.filter((_, i) => i !== index));
  }

  function updateNavLink(index: number, field: keyof NavLink, value: string) {
    setNavLinks((prev) =>
      prev.map((link, i) => (i === index ? { ...link, [field]: value } : link))
    );
  }

  // ── Product tabs helpers ────────────────────────────────────────────────────

  function addProductTab() {
    const id = `tab-${Date.now()}`;
    setProductTabs((prev) => [...prev, { id, label: "" }]);
  }

  function removeProductTab(index: number) {
    setProductTabs((prev) => prev.filter((_, i) => i !== index));
  }

  function updateProductTabLabel(index: number, label: string) {
    setProductTabs((prev) =>
      prev.map((tab, i) => (i === index ? { ...tab, label } : tab))
    );
  }

  // ── Popular searches helpers ────────────────────────────────────────────────

  function addSearch() {
    const trimmed = newSearch.trim();
    if (!trimmed) return;
    setPopularSearches((prev) => [...prev, trimmed]);
    setNewSearch("");
  }

  function removeSearch(index: number) {
    setPopularSearches((prev) => prev.filter((_, i) => i !== index));
  }

  // ── Footer list helpers ─────────────────────────────────────────────────────

  function addFooterItem(
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) {
    setter((prev) => [...prev, ""]);
  }

  function removeFooterItem(
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number
  ) {
    setter((prev) => prev.filter((_, i) => i !== index));
  }

  function updateFooterItem(
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string
  ) {
    setter((prev) => prev.map((item, i) => (i === index ? value : item)));
  }

  // ── Form submit ──────────────────────────────────────────────────────────────

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData();
    formData.set("heroBannerTitle", heroTitle);
    formData.set("heroBannerSubtitle", heroSubtitle);
    formData.set("heroBannerCtaText", heroCtaText);
    formData.set("navLinks", JSON.stringify(navLinks.filter((l) => l.label && l.href)));
    formData.set("productTabs", JSON.stringify(productTabs.filter((t) => t.label)));
    formData.set("popularSearches", JSON.stringify(popularSearches.filter(Boolean)));
    formData.set("footerServices", JSON.stringify(footerServices.filter(Boolean)));
    formData.set("footerAssistance", JSON.stringify(footerAssistance.filter(Boolean)));

    startTransition(async () => {
      const result = await updateContent(formData);
      if (result.success) {
        toast.success("Cambios guardados");
      } else {
        toast.error(result.error.message);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Hero banner */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Banner principal</CardTitle>
          <CardDescription>
            El banner que aparece al inicio de tu tienda. Captá la atención de tus clientes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="heroTitle">Título</Label>
            <Input
              id="heroTitle"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              placeholder="Ej: Descubrí lo mejor en tecnología"
              maxLength={80}
            />
            <p className="text-xs text-muted-foreground text-right">{heroTitle.length}/80</p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="heroSubtitle">Subtítulo</Label>
            <textarea
              id="heroSubtitle"
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              placeholder="Ej: Los mejores productos al mejor precio, con envío rápido."
              maxLength={160}
              rows={2}
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            />
            <p className="text-xs text-muted-foreground text-right">{heroSubtitle.length}/160</p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="heroCtaText">Texto del botón</Label>
            <Input
              id="heroCtaText"
              value={heroCtaText}
              onChange={(e) => setHeroCtaText(e.target.value)}
              placeholder="Ej: Ver catálogo"
              maxLength={40}
            />
          </div>
        </CardContent>
      </Card>

      {/* Nav links */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Menú de navegación</CardTitle>
          <CardDescription>
            Los enlaces que aparecen en el menú principal de tu tienda.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {navLinks.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No hay enlaces todavía. Agregá uno con el botón de abajo.
            </p>
          )}
          {navLinks.map((link, index) => (
            <div key={index} className="flex items-start gap-2">
              <GripVertical className="mt-2 h-4 w-4 shrink-0 text-muted-foreground/50" />
              <div className="grid flex-1 grid-cols-2 gap-2">
                <Input
                  value={link.label}
                  onChange={(e) => updateNavLink(index, "label", e.target.value)}
                  placeholder="Nombre (ej: Catálogo)"
                  maxLength={40}
                />
                <Input
                  value={link.href}
                  onChange={(e) => updateNavLink(index, "href", e.target.value)}
                  placeholder="URL (ej: /catalogo)"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeNavLink(index)}
                aria-label="Eliminar enlace"
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addNavLink}
            className="mt-1 gap-2"
          >
            <Plus className="h-4 w-4" />
            Agregar enlace
          </Button>
        </CardContent>
      </Card>

      {/* Product tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Pestañas de productos</CardTitle>
          <CardDescription>
            Las pestañas que organizan los productos en tu tienda.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {productTabs.map((tab, index) => (
            <div key={tab.id} className="flex items-center gap-2">
              <Input
                value={tab.label}
                onChange={(e) => updateProductTabLabel(index, e.target.value)}
                placeholder="Ej: Más vendidos"
                maxLength={40}
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeProductTab(index)}
                aria-label="Eliminar pestaña"
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addProductTab}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Agregar pestaña
          </Button>
        </CardContent>
      </Card>

      {/* Popular searches */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Búsquedas populares</CardTitle>
          <CardDescription>
            Sugerencias que aparecen en la barra de búsqueda de tu tienda.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((search, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 rounded-full border bg-muted px-3 py-1 text-sm"
              >
                {search}
                <button
                  type="button"
                  onClick={() => removeSearch(index)}
                  className="ml-1 flex h-4 w-4 items-center justify-center rounded-full hover:bg-destructive/20"
                  aria-label={`Eliminar "${search}"`}
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newSearch}
              onChange={(e) => setNewSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSearch();
                }
              }}
              placeholder="Ej: iPhone"
              maxLength={60}
              className="flex-1"
            />
            <Button type="button" variant="outline" onClick={addSearch}>
              Agregar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Footer lists */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Contenido del pie de página</CardTitle>
          <CardDescription>
            Los enlaces y textos que aparecen en el footer de tu tienda.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Footer services */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Servicios</Label>
            {footerServices.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={item}
                  onChange={(e) => updateFooterItem(setFooterServices, index, e.target.value)}
                  placeholder="Ej: Tarjetas de regalo"
                  maxLength={60}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFooterItem(setFooterServices, index)}
                  aria-label="Eliminar ítem"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addFooterItem(setFooterServices)}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Agregar servicio
            </Button>
          </div>

          <Separator />

          {/* Footer assistance */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Asistencia</Label>
            {footerAssistance.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={item}
                  onChange={(e) => updateFooterItem(setFooterAssistance, index, e.target.value)}
                  placeholder="Ej: Preguntas frecuentes"
                  maxLength={60}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFooterItem(setFooterAssistance, index)}
                  aria-label="Eliminar ítem"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addFooterItem(setFooterAssistance)}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Agregar ítem
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save button */}
      <div className="flex justify-end">
        <Button type="submit" disabled={isPending} className="min-w-32">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Guardando...
            </>
          ) : (
            "Guardar cambios"
          )}
        </Button>
      </div>
    </form>
  );
}
