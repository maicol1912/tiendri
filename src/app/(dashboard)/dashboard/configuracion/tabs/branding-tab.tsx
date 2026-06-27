"use client";

// BrandingTab — Store identity configuration
// Fields: store name, description, WhatsApp, logo, social links
// Logo now stored as media ID (media_xxx) via MediaPickerField.
// Save: Supabase via Server Action (isAuthenticated=true) or localStorage fallback.

import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MediaPickerField } from "@/components/dashboard/media";
import { updateBranding } from "../actions";
import { CUSTOMIZATION_STORAGE_KEY } from "../client-utils";
import { DEFAULT_TEMPLATE_ID } from "@/shared/constants";
import type { BrandingConfig } from "@/types/templates/customization-sections";
import type { StoreCustomization } from "@/types/templates/store-customization";

interface BrandingTabProps {
  initialBranding?: BrandingConfig;
  isAuthenticated: boolean;
}

const SOCIAL_FIELDS = [
  { key: "instagram" as const, label: "Instagram", placeholder: "https://instagram.com/mitienda" },
  { key: "facebook" as const, label: "Facebook", placeholder: "https://facebook.com/mitienda" },
  { key: "tiktok" as const, label: "TikTok", placeholder: "https://tiktok.com/@mitienda" },
  { key: "twitter" as const, label: "Twitter / X", placeholder: "https://twitter.com/mitienda" },
  { key: "youtube" as const, label: "YouTube", placeholder: "https://youtube.com/@mitienda" },
] as const;

// ── localStorage fallback ─────────────────────────────────────────────────────

function saveToLocalStorage(branding: BrandingConfig): void {
  try {
    const raw = localStorage.getItem(CUSTOMIZATION_STORAGE_KEY);
    const current: StoreCustomization = raw
      ? (JSON.parse(raw) as StoreCustomization)
      : { templateId: DEFAULT_TEMPLATE_ID };
    const updated: StoreCustomization = {
      ...current,
      branding: { ...(current.branding ?? {}), ...branding },
    };
    localStorage.setItem(CUSTOMIZATION_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Non-critical in demo mode
  }
}

export function BrandingTab({ initialBranding, isAuthenticated }: BrandingTabProps) {
  const [storeName, setStoreName] = useState(initialBranding?.storeName ?? "");
  const [description, setDescription] = useState(initialBranding?.description ?? "");
  const [whatsapp, setWhatsapp] = useState(initialBranding?.whatsapp ?? "");
  const [logo, setLogo] = useState<string | null>(initialBranding?.logo ?? null);
  const [socialLinks, setSocialLinks] = useState<BrandingConfig["socialLinks"]>(
    initialBranding?.socialLinks ?? {}
  );
  const [isSaving, setIsSaving] = useState(false);

  // ── Form submit ──────────────────────────────────────────────────────────────

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true);

    const branding: BrandingConfig = {
      ...(storeName ? { storeName } : {}),
      ...(description ? { description } : {}),
      ...(whatsapp ? { whatsapp } : {}),
      ...(logo !== undefined ? { logo } : {}),
      socialLinks,
    };

    try {
      if (isAuthenticated) {
        const result = await updateBranding(branding);
        if (result.success) {
          toast.success("Cambios guardados");
        } else if (result.error.code === "UNAUTHORIZED") {
          // Auth expired — fall back to localStorage silently
          saveToLocalStorage(branding);
          toast.success("Cambios guardados localmente");
        } else {
          toast.error(result.error.message);
        }
      } else {
        saveToLocalStorage(branding);
        toast.success("Cambios guardados");
      }
    } catch {
      toast.error("Error al guardar los cambios. Intentá de nuevo.");
    } finally {
      setIsSaving(false);
    }
  }

  const descriptionLength = description.length;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Store identity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Identidad de tu tienda</CardTitle>
          <CardDescription>
            Esta información aparece en tu vitrina y en los resultados de búsqueda.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Logo */}
          <div className="space-y-2">
            <Label>Logo</Label>
            <MediaPickerField
              value={logo}
              onChange={setLogo}
              aspectRatio="1/1"
              description="PNG, JPG o WebP. Máx. 5MB. Se recortará a cuadrado."
            />
          </div>

          <Separator />

          {/* Store name */}
          <div className="space-y-1.5">
            <Label htmlFor="storeName">Nombre de la tienda</Label>
            <Input
              id="storeName"
              name="storeName"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="Ej: Tech Galaxy"
              minLength={2}
              maxLength={80}
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="description">Descripción</Label>
              <span
                className={`text-xs tabular-nums ${
                  descriptionLength > 110
                    ? "text-destructive"
                    : "text-muted-foreground"
                }`}
              >
                {descriptionLength}/120
              </span>
            </div>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe tu tienda en pocas palabras..."
              maxLength={120}
              rows={3}
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* WhatsApp */}
          <div className="space-y-1.5">
            <Label htmlFor="whatsapp">Número de WhatsApp</Label>
            <Input
              id="whatsapp"
              name="whatsapp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="573001234567"
              inputMode="tel"
            />
            <p className="text-xs text-muted-foreground">
              Incluí el prefijo de país: 57 para Colombia (ej: 573001234567)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Social links */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Redes sociales</CardTitle>
          <CardDescription>
            Dejá en blanco los campos que no tenés. Solo se muestran los que completás.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {SOCIAL_FIELDS.map(({ key, label, placeholder }) => (
            <div key={key} className="space-y-1.5">
              <Label htmlFor={key}>{label}</Label>
              <Input
                id={key}
                name={key}
                value={socialLinks?.[key] ?? ""}
                onChange={(e) =>
                  setSocialLinks((prev) => ({ ...prev, [key]: e.target.value }))
                }
                placeholder={placeholder}
                type="url"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Save button */}
      <div className="flex justify-end">
        <Button type="submit" disabled={isSaving} className="min-w-32">
          {isSaving ? (
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
