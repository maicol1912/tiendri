// Shared cart and checkout types

export interface CartItem {
  productId: string;
  /** Variant name selected by the visitor, or null if the product has no variants */
  variantName: string | null;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string | null;
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
