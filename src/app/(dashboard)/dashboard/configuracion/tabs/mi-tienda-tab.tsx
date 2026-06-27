"use client";

// MiTiendaTab — Unified branding + business configuration tab
// Merges branding-tab and business-tab into a single form with 7 cards.
// Save: delegates to onSave prop (caller handles Supabase / localStorage fallback).

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MediaPickerField } from "@/components/dashboard/media";
import { useConfigDirty } from "../config-dirty-context";
import type { BrandingConfig, BusinessConfig } from "@/types/templates/customization-sections";

// ── Constants ─────────────────────────────────────────────────────────────────

const SOCIAL_FIELDS = [
  { key: "instagram" as const, label: "Instagram", placeholder: "https://instagram.com/mitienda" },
  { key: "facebook" as const, label: "Facebook", placeholder: "https://facebook.com/mitienda" },
  { key: "tiktok" as const, label: "TikTok", placeholder: "https://tiktok.com/@mitienda" },
  { key: "twitter" as const, label: "Twitter / X", placeholder: "https://twitter.com/mitienda" },
  { key: "youtube" as const, label: "YouTube", placeholder: "https://youtube.com/@mitienda" },
] as const;

const PAYMENT_METHODS = [
  { value: "nequi", label: "Nequi" },
  { value: "daviplata", label: "Daviplata" },
  { value: "efectivo", label: "Efectivo" },
  { value: "transferencia", label: "Transferencia bancaria" },
  { value: "tarjeta", label: "Tarjeta de crédito/débito" },
] as const;

const CURRENCIES = [
  { value: "COP", label: "COP — Peso colombiano" },
  { value: "USD", label: "USD — Dólar estadounidense" },
  { value: "EUR", label: "EUR — Euro" },
  { value: "MXN", label: "MXN — Peso mexicano" },
  { value: "ARS", label: "ARS — Peso argentino" },
  { value: "BRL", label: "BRL — Real brasileño" },
  { value: "CLP", label: "CLP — Peso chileno" },
  { value: "PEN", label: "PEN — Sol peruano" },
] as const;

type PaymentMethodValue = (typeof PAYMENT_METHODS)[number]["value"];
type CurrencyCode = (typeof CURRENCIES)[number]["value"];

// ── Props ─────────────────────────────────────────────────────────────────────

interface MiTiendaTabProps {
  initialBranding?: BrandingConfig;
  initialBusiness?: BusinessConfig;
  isAuthenticated: boolean;
  onSave: (branding: BrandingConfig, business: BusinessConfig) => Promise<void>;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function MiTiendaTab({
  initialBranding,
  initialBusiness,
  onSave,
}: MiTiendaTabProps) {
  const { markDirty, markClean } = useConfigDirty();

  // ── Branding state ──────────────────────────────────────────────────────────
  const [logo, setLogo] = useState<string | null>(initialBranding?.logo ?? null);
  const [storeName, setStoreName] = useState(initialBranding?.storeName ?? "");
  const [description, setDescription] = useState(initialBranding?.description ?? "");
  const [whatsapp, setWhatsapp] = useState(initialBranding?.whatsapp ?? "");
  const [socialLinks, setSocialLinks] = useState<BrandingConfig["socialLinks"]>(
    initialBranding?.socialLinks ?? {}
  );

  // ── Business state ──────────────────────────────────────────────────────────
  const [city, setCity] = useState(initialBusiness?.city ?? "");
  const [address, setAddress] = useState(initialBusiness?.address ?? "");
  const [hours, setHours] = useState(initialBusiness?.hours ?? "");
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodValue[]>(
    (initialBusiness?.paymentMethods as PaymentMethodValue[]) ?? []
  );
  const [shippingCost, setShippingCost] = useState(
    initialBusiness?.shippingInfo?.cost ?? ""
  );
  const [shippingTime, setShippingTime] = useState(
    initialBusiness?.shippingInfo?.estimatedTime ?? ""
  );
  const [shippingFreeAbove, setShippingFreeAbove] = useState(
    initialBusiness?.shippingInfo?.freeAbove ?? ""
  );
  const [currency, setCurrency] = useState<CurrencyCode>(
    (initialBusiness?.currency as CurrencyCode) ?? "COP"
  );

  const [isSaving, setIsSaving] = useState(false);

  // ── Helpers ─────────────────────────────────────────────────────────────────

  /** Mark the tab dirty whenever any field changes. */
  const dirty = useCallback(() => markDirty("mi-tienda"), [markDirty]);

  function togglePaymentMethod(method: PaymentMethodValue) {
    setPaymentMethods((prev) =>
      prev.includes(method)
        ? prev.filter((m) => m !== method)
        : [...prev, method]
    );
    dirty();
  }

  /** Remove empty social link entries before saving. */
  function cleanSocialLinks(
    links: BrandingConfig["socialLinks"]
  ): BrandingConfig["socialLinks"] {
    if (!links) return {};
    return Object.fromEntries(
      Object.entries(links).filter(([, v]) => typeof v === "string" && v.trim() !== "")
    ) as BrandingConfig["socialLinks"];
  }

  // ── Submit ───────────────────────────────────────────────────────────────────

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true);

    const branding: BrandingConfig = {
      ...(logo !== undefined ? { logo } : {}),
      ...(storeName ? { storeName } : {}),
      ...(description ? { description } : {}),
      ...(whatsapp ? { whatsapp } : {}),
      socialLinks: cleanSocialLinks(socialLinks),
    };

    const business: BusinessConfig = {
      ...(city ? { city } : {}),
      ...(address ? { address } : {}),
      ...(hours ? { hours } : {}),
      paymentMethods,
      shippingInfo: {
        ...(shippingCost ? { cost: shippingCost } : {}),
        ...(shippingTime ? { estimatedTime: shippingTime } : {}),
        ...(shippingFreeAbove ? { freeAbove: shippingFreeAbove } : {}),
      },
      currency,
    };

    try {
      await onSave(branding, business);
      markClean("mi-tienda");
      toast.success("Cambios guardados");
    } catch {
      toast.error("Error al guardar los cambios. Intentá de nuevo.");
    } finally {
      setIsSaving(false);
    }
  }

  const descriptionLength = description.length;

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Card 1 — Identidad */}
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
              onChange={(val) => { setLogo(val); dirty(); }}
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
              onChange={(e) => { setStoreName(e.target.value); dirty(); }}
              placeholder="Ej: Mi Tienda Online"
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
            <Textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => { setDescription(e.target.value); dirty(); }}
              placeholder="Describe tu tienda en pocas palabras..."
              maxLength={120}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Card 2 — Contacto */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Contacto</CardTitle>
          <CardDescription>
            Número de WhatsApp donde tus clientes hacen los pedidos.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="whatsapp">Número de WhatsApp</Label>
            <Input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              value={whatsapp}
              onChange={(e) => { setWhatsapp(e.target.value); dirty(); }}
              placeholder="573001234567"
            />
            <p className="text-xs text-muted-foreground">
              Incluí el código de país: 57 para Colombia (ej: 573001234567)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Card 3 — Redes sociales */}
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
              <Label htmlFor={`social-${key}`}>{label}</Label>
              <Input
                id={`social-${key}`}
                name={key}
                type="url"
                value={socialLinks?.[key] ?? ""}
                onChange={(e) => {
                  setSocialLinks((prev) => ({ ...prev, [key]: e.target.value }));
                  dirty();
                }}
                placeholder={placeholder}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Card 4 — Ubicación y horario */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Ubicación y horario</CardTitle>
          <CardDescription>
            Esta información aparece en el SEO de tu tienda y en el esquema de negocio local.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="city">Ciudad</Label>
              <Input
                id="city"
                name="city"
                value={city}
                onChange={(e) => { setCity(e.target.value); dirty(); }}
                placeholder="Ej: Medellín"
                maxLength={80}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="hours">Horario de atención</Label>
              <Input
                id="hours"
                name="hours"
                value={hours}
                onChange={(e) => { setHours(e.target.value); dirty(); }}
                placeholder="Ej: Lun-Sab 9am-6pm"
                maxLength={120}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="address">Dirección</Label>
            <Input
              id="address"
              name="address"
              value={address}
              onChange={(e) => { setAddress(e.target.value); dirty(); }}
              placeholder="Ej: Calle 10 #20-30"
              maxLength={160}
            />
          </div>
        </CardContent>
      </Card>

      {/* Card 5 — Métodos de pago */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Métodos de pago</CardTitle>
          <CardDescription>
            Los medios de pago que aceptás en tu tienda. Se muestran en el checkout.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {PAYMENT_METHODS.map(({ value, label }) => (
              <label
                key={value}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                  paymentMethods.includes(value)
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/40"
                }`}
              >
                <input
                  type="checkbox"
                  checked={paymentMethods.includes(value)}
                  onChange={() => togglePaymentMethod(value)}
                  className="h-4 w-4 accent-primary"
                />
                <span className="text-sm">{label}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Card 6 — Envíos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Envíos</CardTitle>
          <CardDescription>
            Datos de envío que ven tus clientes al hacer un pedido.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label htmlFor="shippingCost">Costo de envío</Label>
              <Input
                id="shippingCost"
                name="shippingCost"
                value={shippingCost}
                onChange={(e) => { setShippingCost(e.target.value); dirty(); }}
                placeholder="Ej: $8.000 COP"
                maxLength={60}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="shippingTime">Tiempo estimado de entrega</Label>
              <Input
                id="shippingTime"
                name="shippingTime"
                value={shippingTime}
                onChange={(e) => { setShippingTime(e.target.value); dirty(); }}
                placeholder="Ej: 2-4 días hábiles"
                maxLength={60}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="shippingFreeAbove">Envío gratis desde</Label>
              <Input
                id="shippingFreeAbove"
                name="shippingFreeAbove"
                value={shippingFreeAbove}
                onChange={(e) => { setShippingFreeAbove(e.target.value); dirty(); }}
                placeholder="Ej: $80.000 COP"
                maxLength={60}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 7 — Moneda */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Moneda</CardTitle>
          <CardDescription>
            La moneda en que se muestran los precios de tu tienda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-xs space-y-1.5">
            <Label htmlFor="currency">Moneda</Label>
            <Select
              value={currency}
              onValueChange={(val) => {
                setCurrency(val as CurrencyCode);
                dirty();
              }}
            >
              <SelectTrigger id="currency" className="w-full">
                <SelectValue placeholder="Seleccioná una moneda" />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
