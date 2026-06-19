import { formatPrice } from "@/shared/format";
import type { CartItem } from "@/types/domain/cart";

interface WhatsAppOrderParams {
  items: CartItem[];
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerAddress: string;
  customerNotes?: string;
  storePhone: string;
  storeName: string;
  storeSlug: string;
  currencySymbol?: string;
}

export function buildWhatsAppMessage(params: WhatsAppOrderParams): string {
  const {
    items,
    customerName,
    customerPhone,
    customerEmail,
    customerAddress,
    customerNotes,
    storeName,
    storeSlug,
    currencySymbol = "$",
  } = params;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const itemLines = items.map((item) => {
    const variant = item.variantName ? ` (${item.variantName})` : "";
    return `• ${item.quantity}× ${item.name}${variant} — ${formatPrice(item.price * item.quantity, currencySymbol)}`;
  });

  const lines: string[] = [
    `*Nuevo pedido — ${storeName}*`,
    "",
    "*Productos:*",
    ...itemLines,
    "",
    `*Total: ${formatPrice(total, currencySymbol)}*`,
    "",
    "*Datos del cliente:*",
    `• Nombre: ${customerName}`,
    `• WhatsApp: ${customerPhone}`,
  ];

  if (customerEmail?.trim()) {
    lines.push(`• Email: ${customerEmail.trim()}`);
  }

  lines.push(`• Dirección: ${customerAddress}`);

  if (customerNotes?.trim()) {
    lines.push(`• Notas: ${customerNotes.trim()}`);
  }

  lines.push("");
  lines.push(`_Pedido vía tiendri.com/${storeSlug}_`);

  return lines.join("\n");
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}
