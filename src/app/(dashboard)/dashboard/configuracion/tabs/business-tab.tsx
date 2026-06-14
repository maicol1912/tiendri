"use client";

// BusinessTab — Business information configuration
// Fields: city, address, hours, payment methods, shipping info, currency
// Save: Supabase via Server Action (isAuthenticated=true) or localStorage fallback.

import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateBusiness } from "../actions";
import { CUSTOMIZATION_STORAGE_KEY } from "../client-utils";
import type { BusinessConfig } from "@/types/templates/customization-sections";
import type { StoreCustomization } from "@/types/templates/store-customization";

interface BusinessTabProps {
  initialBusiness?: BusinessConfig;
  isAuthenticated: boolean;
}

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

type PaymentMethod = "nequi" | "daviplata" | "efectivo" | "transferencia" | "tarjeta";
type CurrencyCode = "COP" | "USD" | "EUR" | "MXN" | "ARS" | "BRL" | "CLP" | "PEN";

// ── localStorage fallback ─────────────────────────────────────────────────────

function saveToLocalStorage(business: BusinessConfig): void {
  try {
    const raw = localStorage.getItem(CUSTOMIZATION_STORAGE_KEY);
    const current: StoreCustomization = raw
      ? (JSON.parse(raw) as StoreCustomization)
      : { templateId: "tech-premium" };
    const updated: StoreCustomization = {
      ...current,
      business: { ...(current.business ?? {}), ...business },
    };
    localStorage.setItem(CUSTOMIZATION_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Non-critical in demo mode
  }
}

export function BusinessTab({ initialBusiness, isAuthenticated }: BusinessTabProps) {
  const [city, setCity] = useState(initialBusiness?.city ?? "");
  const [address, setAddress] = useState(initialBusiness?.address ?? "");
  const [hours, setHours] = useState(initialBusiness?.hours ?? "");
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(
    (initialBusiness?.paymentMethods as PaymentMethod[]) ?? []
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

  function togglePaymentMethod(method: PaymentMethod) {
    setPaymentMethods((prev) =>
      prev.includes(method)
        ? prev.filter((m) => m !== method)
        : [...prev, method]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true);

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
      if (isAuthenticated) {
        const result = await updateBusiness(business);
        if (result.success) {
          toast.success("Cambios guardados");
        } else if (result.error.code === "UNAUTHORIZED") {
          saveToLocalStorage(business);
          toast.success("Cambios guardados localmente");
        } else {
          toast.error(result.error.message);
        }
      } else {
        saveToLocalStorage(business);
        toast.success("Cambios guardados");
      }
    } catch {
      toast.error("Error al guardar los cambios. Intentá de nuevo.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Location */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Ubicación</CardTitle>
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
                onChange={(e) => setCity(e.target.value)}
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
                onChange={(e) => setHours(e.target.value)}
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
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Ej: Calle 10 #20-30"
              maxLength={160}
            />
          </div>
        </CardContent>
      </Card>

      {/* Payment methods */}
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

      {/* Shipping info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Información de envío</CardTitle>
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
                onChange={(e) => setShippingCost(e.target.value)}
                placeholder="Ej: $8.000 COP"
                maxLength={60}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="shippingTime">Tiempo estimado</Label>
              <Input
                id="shippingTime"
                name="shippingTime"
                value={shippingTime}
                onChange={(e) => setShippingTime(e.target.value)}
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
                onChange={(e) => setShippingFreeAbove(e.target.value)}
                placeholder="Ej: $80.000 COP"
                maxLength={60}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Currency */}
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
            <Select value={currency} onValueChange={(val) => setCurrency(val as CurrencyCode)}>
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
