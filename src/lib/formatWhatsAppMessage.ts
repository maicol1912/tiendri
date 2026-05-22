// TODO: Format cart items into a WhatsApp message

export interface WhatsAppMessageInput {
  storeName: string;
  customerName: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
}

export function formatWhatsAppMessage(_input: WhatsAppMessageInput): string {
  // TODO: Return a formatted message string
  return "";
}
