// TODO: Define Product type

export interface Product {
  id: string;
  storeId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  categoryId: string | null;
  isAvailable: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}
