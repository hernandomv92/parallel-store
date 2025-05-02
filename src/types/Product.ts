export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  category: string;
  sizes: string[];
  images: string[];
  selectedSize?: string;
  quantity?: number;
}