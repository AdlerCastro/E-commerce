import { Product } from './product.type';

export interface CartItem {
  product: Product;
  selectedPose: string;
  selectedSize: string;
  quantity: number;
}
