// Shared cart and checkout types

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string | null;
  variantName: string | null;
  originalPrice?: number | null;
  description?: string;
  rating?: number;
  reviewCount?: number;
  colorId?: string;
  cardBgColor?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface CheckoutFormData {
  nombre: string;
  whatsapp: string;
  email: string;
  direccion: string;
  notas: string;
}
