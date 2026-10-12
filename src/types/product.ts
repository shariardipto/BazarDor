export interface Product {
  id: number | string;
  name: string;
  category: string;
  unit: string;
  price: number;
  change?: number;
  emoji?: string;
  [key: string]: unknown;
}