"use client";

// ContenidoTab — Configuración de contenido de la tienda
// Secciones: banner principal, secciones activas, navegación y pie de página.
// Cada sección tiene su propio botón de guardado independiente.

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Plus, Trash2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MediaPickerField } from "@/components/dashboard/media";
import { SectionManager } from "@/components/dashboard/schema-form/section-manager";
import { TagListField } from "@/components/dashboard/schema-form/tag-list-field";
import type { ContentConfig } from "@/types/templates/customization-sections";
import type { SectionConfig, SectionId } from "@/types/templates/sections";
import type { ConfigSection } from "@/types/templates/config-schema";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MAX_NAV_LINKS = 8;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NavLink {
  label: string;
  href: string;
}

interface ContenidoTabProps {
  initialContent?: ContentConfig;
  initialSections: SectionConfig[];
  availableSections: string[];
  sectionSchemas?: Record<string, ConfigSection>;
  isAuthenticated: boolean;
  onContentSave: (content: Partial<ContentConfig>) => Promise<void>;
  onSectionsSave: (sections: SectionConfig[]) => Promise<void>;
  onBannerSave: (content: Partial<ContentConfig>, sections: SectionConfig[]) => Promise<void>;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ContenidoTab({
  initialContent,
  initialSections,
  availableSections,
  sectionSchemas,
  onContentSave,
  onSectionsSave,
  onBannerSave,
}: ContenidoTabProps) {
  // ── Hero Banner state ──────────────────────────────────────────────────────
  const [heroTitle, setHeroTitle] = useState(
    initialContent?.heroBanner?.title ?? ""
  );
  const [heroSubtitle, setHeroSubtitle] = useState(
    initialContent?.heroBanner?.subtitle ?? ""
  );
  const [heroImage, setHeroImage] = useState<string | null>(
    initialContent?.heroBanner?.image ?? null
  );
  const [heroCtaText, setHeroCtaText] = useState(
    initialContent?.heroBanner?.ctaText ?? ""
  );
  const [savingHero, setSavingHero] = useState(false);

  // ── Sections state ─────────────────────────────────────────────────────────
  const [localSections, setLocalSections] = useState<SectionConfig[]>(
    () => structuredClone(initialSections)
  );

  // ── Nav Links state ────────────────────────────────────────────────────────
  const [navLinks, setNavLinks] = useState<NavLink[]>(
    () => structuredClone(initialContent?.navLinks ?? [])
  );
  const [savingNav, setSavingNav] = useState(false);

  // ── Footer state ───────────────────────────────────────────────────────────
  const [footerServices, setFooterServices] = useState<string[]>(
    initialContent?.footerServices ?? []
  );
  const [footerAssistance, setFooterAssistance] = useState<string[]>(
    initialContent?.footerAssistance ?? []
  );
  const [savingFooter, setSavingFooter] = useState(false);

  // ── Handlers: Hero Banner ──────────────────────────────────────────────────

  async function handleSaveHero() {
    setSavingHero(true);
    try {
      const heroInSections = localSections.some(
        (s) => s.id === "hero" && s.visible
      );
      const sectionsToSave = heroInSections
        ? localSections
        : [
            { id: "hero" as SectionId, visible: true, config: {} },
            ...localSections.filter((s) => s.id !== "hero"),
          ];
      setLocalSections(sectionsToSave);

      await onBannerSave(
        {
          heroBanner: {
            title: heroTitle || undefined,
            subtitle: heroSubtitle || undefined,
            image: heroImage || undefined,
            ctaText: heroCtaText || undefined,
          },
        },
        sectionsToSave
      );

      toast.success("Banner guardado correctamente");
    } catch {
      toast.error("No se pudo guardar el banner. Intentá de nuevo.");
    } finally {
      setSavingHero(false);
    }
  }

  // ── Handlers: Nav Links ────────────────────────────────────────────────────

  function handleAddNavLink() {
    if (navLinks.length >= MAX_NAV_LINKS) return;
    setNavLinks((prev) => [...prev, { label: "", href: "" }]);
  }

  function handleRemoveNavLink(index: number) {
    setNavLinks((prev) => prev.filter((_, i) => i !== index));
  }

  function handleNavLinkChange(
    index: number,
    field: keyof NavLink,
    value: string
  ) {
    setNavLinks((prev) =>
      prev.map((link, i) => (i === index ? { ...link, [field]: value } : link))
    );
  }

  async function handleSaveNav() {
    setSavingNav(true);
    try {
      await onContentSave({ navLinks });
      toast.success("Navegación guardada correctamente");
    } catch {
      toast.error("No se pudo guardar la navegación. Intentá de nuevo.");
    } finally {
      setSavingNav(false);
    }
  }

  // ── Handlers: Footer ───────────────────────────────────────────────────────

  async function handleSaveFooter() {
    setSavingFooter(true);
    try {
      await onContentSave({ footerServices, footerAssistance });
      toast.success("Pie de página guardado correctamente");
    } catch {
      toast.error("No se pudo guardar el pie de página. Intentá de nuevo.");
    } finally {
      setSavingFooter(false);
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <Accordion type="multiple" className="space-y-0">
      {/* ── 1. Banner principal ── */}
      <AccordionItem value="hero-banner">
        <AccordionTrigger className="text-sm font-medium">
          Banner principal
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4 pb-2 pt-1">
            {/* Título */}
            <div className="space-y-1.5">
              <Label htmlFor="hero-title">Título</Label>
              <Input
                id="hero-title"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                placeholder="Ej: Bienvenido a nuestra tienda"
                maxLength={80}
                aria-label="Título del banner principal"
              />
              <p className="text-xs text-muted-foreground text-right tabular-nums">
                {heroTitle.length}/80
              </p>
            </div>

            {/* Subtítulo */}
            <div className="space-y-1.5">
              <Label htmlFor="hero-subtitle">Subtítulo</Label>
              <Textarea
                id="hero-subtitle"
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                placeholder="Ej: Encontrá los mejores productos al mejor precio"
                maxLength={160}
                rows={3}
                aria-label="Subtítulo del banner principal"
              />
              <p className="text-xs text-muted-foreground text-right tabular-nums">
                {heroSubtitle.length}/160
              </p>
            </div>

            {/* Imagen */}
            <div className="space-y-1.5">
              <Label>Imagen del banner</Label>
              <MediaPickerField
                value={heroImage}
                onChange={setHeroImage}
                aspectRatio="16/9"
                description="PNG, JPG o WebP. Relación de aspecto 16:9. Máx. 5 MB."
              />
            </div>

            {/* Texto del botón */}
            <div className="space-y-1.5">
              <Label htmlFor="hero-cta">Texto del botón</Label>
              <Input
                id="hero-cta"
                value={heroCtaText}
                onChange={(e) => setHeroCtaText(e.target.value)}
                placeholder="Ej: Ver productos"
                maxLength={40}
                aria-label="Texto del botón de llamado a la acción"
              />
              <p className="text-xs text-muted-foreground text-right tabular-nums">
                {heroCtaText.length}/40
              </p>
            </div>

            <Button
              type="button"
              onClick={handleSaveHero}
              disabled={savingHero}
              className="w-full"
              aria-label="Guardar banner principal"
            >
              {savingHero ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                "Guardar banner"
              )}
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* ── 2. Secciones de la tienda ── */}
      <AccordionItem value="sections">
        <AccordionTrigger className="text-sm font-medium">
          Secciones de la tienda
        </AccordionTrigger>
        <AccordionContent>
          <div className="pb-2 pt-1">
            <SectionManager
              sections={localSections}
              availablePool={availableSections}
              sectionSchemas={sectionSchemas}
              onChange={setLocalSections}
              onSave={onSectionsSave}
            />
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* ── 3. Navegación ── */}
      <AccordionItem value="navigation">
        <AccordionTrigger className="text-sm font-medium">
          Navegación
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3 pb-2 pt-1">
            {navLinks.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No hay enlaces de navegación. Agregá uno con el botón de abajo.
              </p>
            )}

            {navLinks.map((link, index) => (
              <div
                key={index}
                className="flex items-end gap-2"
                role="group"
                aria-label={`Enlace de navegación ${index + 1}`}
              >
                <div className="flex-1 space-y-1.5">
                  <Label htmlFor={`nav-label-${index}`}>Etiqueta</Label>
                  <Input
                    id={`nav-label-${index}`}
                    value={link.label}
                    onChange={(e) =>
                      handleNavLinkChange(index, "label", e.target.value)
                    }
                    placeholder="Ej: Inicio"
                    maxLength={40}
                    aria-label={`Etiqueta del enlace ${index + 1}`}
                  />
                </div>
                <div className="flex-1 space-y-1.5">
                  <Label htmlFor={`nav-href-${index}`}>Enlace</Label>
                  <Input
                    id={`nav-href-${index}`}
                    value={link.href}
                    onChange={(e) =>
                      handleNavLinkChange(index, "href", e.target.value)
                    }
                    placeholder="Ej: /productos"
                    aria-label={`URL del enlace ${index + 1}`}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveNavLink(index)}
                  aria-label={`Eliminar enlace ${index + 1}`}
                  className="shrink-0 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}

            {navLinks.length < MAX_NAV_LINKS && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddNavLink}
                className="gap-1.5"
                aria-label="Agregar enlace de navegación"
              >
                <Plus className="size-3.5" />
                Agregar enlace
              </Button>
            )}

            {navLinks.length >= MAX_NAV_LINKS && (
              <p className="text-xs text-muted-foreground">
                Máximo {MAX_NAV_LINKS} enlaces de navegación alcanzado.
              </p>
            )}

            <Button
              type="button"
              onClick={handleSaveNav}
              disabled={savingNav}
              className="w-full"
              aria-label="Guardar enlaces de navegación"
            >
              {savingNav ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                "Guardar navegación"
              )}
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* ── 4. Pie de página ── */}
      <AccordionItem value="footer">
        <AccordionTrigger className="text-sm font-medium">
          Pie de página
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-5 pb-2 pt-1">
            {/* Servicios ofrecidos */}
            <div className="space-y-2">
              <Label>Servicios ofrecidos</Label>
              <p className="text-xs text-muted-foreground">
                Escribí un servicio y presioná Enter para agregarlo.
              </p>
              <TagListField
                value={footerServices}
                onChange={setFooterServices}
                placeholder="Ej: Envíos a domicilio"
              />
            </div>

            {/* Links de asistencia */}
            <div className="space-y-2">
              <Label>Links de asistencia</Label>
              <p className="text-xs text-muted-foreground">
                Escribí un enlace de ayuda y presioná Enter para agregarlo.
              </p>
              <TagListField
                value={footerAssistance}
                onChange={setFooterAssistance}
                placeholder="Ej: Política de devoluciones"
              />
            </div>

            <Button
              type="button"
              onClick={handleSaveFooter}
              disabled={savingFooter}
              className="w-full"
              aria-label="Guardar configuración del pie de página"
            >
              {savingFooter ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                "Guardar pie de página"
              )}
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
