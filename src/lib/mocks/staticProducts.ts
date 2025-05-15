import { generateMockProducts } from './generateProducts';
import { Product } from '@/types/product.type';

// Gera uma vez e reutiliza
let cachedProducts: Product[] | null = null;

export function getAllMockProducts(): Product[] {
  if (!cachedProducts) {
    cachedProducts = generateMockProducts(20);
  }
  return cachedProducts;
}

export function getMockProductBySlug(slug: string): Product | null {
  return getAllMockProducts().find((p) => p.slug === slug) || null;
}
