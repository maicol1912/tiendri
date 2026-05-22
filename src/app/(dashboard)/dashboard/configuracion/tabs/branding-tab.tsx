"use client";

// BrandingTab — Store identity configuration
// Fields: store name, description, WhatsApp, logo, social links
// Save: persists to localStorage key `tiendri_demo-store_customization`

import { useState, useRef } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { Loader2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { updateBranding, fileToDataUrl } from "../actions";
import type { BrandingConfig } from "@/types/templates/customization-sections";

interface BrandingTabProps {
  initialBranding?: BrandingConfig;
}

const SOCIAL_FIELDS = [
  { key: "instagram" as const, label: "Instagram", placeholder: "https://instagram.com/mitienda" },
  { key: "facebook" as const, label: "Facebook", placeholder: "https://facebook.com/mitienda" },
  { key: "tiktok" as const, label: "TikTok", placeholder: "https://tiktok.com/@mitienda" },
  { key: "twitter" as const, label: "Twitter / X", placeholder: "https://twitter.com/mitienda" },
  { key: "youtube" as const, label: "YouTube", placeholder: "https://youtube.com/@mitienda" },
] as const;

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function BrandingTab({ initialBranding }: BrandingTabProps) {
  const [storeName, setStoreName] = useState(initialBranding?.storeName ?? "");
  const [description, setDescription] = useState(initialBranding?.description ?? "");
  const [whatsapp, setWhatsapp] = useState(initialBranding?.whatsapp ?? "");
  const [logo, setLogo] = useState(initialBranding?.logo ?? "");
  const [socialLinks, setSocialLinks] = useState<BrandingConfig["socialLinks"]>(
    initialBranding?.socialLinks ?? {}
  );
  const [uploading, setUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Logo upload — base64 WebP stored in localStorage ──────────────────────

  async function handleLogoUpload(file: File) {
    if (file.size > MAX_FILE_SIZE) {
      toast.error("El archivo supera el tamaño máximo de 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Solo se permiten archivos de imagen");
      return;
    }

    setUploading(true);
    try {
      const dataUrl = await fileToDataUrl(file, 800);
      setLogo(dataUrl);
      toast.success("Logo cargado correctamente");
    } catch {
      toast.error("Error al procesar el logo. Intentá de nuevo.");
    } finally {
      setUploading(false);
      // Reset so the same file can be re-selected
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) void handleLogoUpload(file);
  }

  // ── Form submit ──────────────────────────────────────────────────────────────

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true);

    const branding: BrandingConfig = {
      ...(storeName ? { storeName } : {}),
      ...(description ? { description } : {}),
      ...(whatsapp ? { whatsapp } : {}),
      ...(logo ? { logo } : {}),
      socialLinks,
    };

    const result = updateBranding(branding);

    setIsSaving(false);

    if (result.success) {
      toast.success("Cambios guardados");
    } else {
      toast.error(result.error.message);
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
            <div className="flex items-start gap-4">
              {/* Preview */}
              <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-muted">
                {logo ? (
                  <>
                    <Image
                      src={logo}
                      alt="Logo de tu tienda"
                      fill
                      className="object-contain p-2"
                      unoptimized
                    />
                    <button
                      type="button"
                      onClick={() => setLogo("")}
                      className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive/90 text-destructive-foreground"
                      aria-label="Eliminar logo"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </>
                ) : (
                  <span className="text-xs text-muted-foreground">Sin logo</span>
                )}
              </div>

              {/* Upload button */}
              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={uploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="gap-2"
                >
                  {uploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                  {uploading ? "Procesando..." : "Subir logo"}
                </Button>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG o WebP. Máx. 5MB. Se recortará a cuadrado.
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
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
        <Button type="submit" disabled={isSaving || uploading} className="min-w-32">
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
