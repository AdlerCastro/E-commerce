import { api } from '@/lib/api';
import { Product } from '@/types/product.type';

type ProductsResponse = {
  products: Product[];
  success: boolean;
  message: string;
};

export async function getFeaturedProducts(): Promise<ProductsResponse> {
  try {
    const response = await api('/products/featured', {
      next: { revalidate: 60 * 60 },
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar os produtos');
    }

    const data = (await response.json()) as ProductsResponse;
    return data;
  } catch (error) {
    console.error('[getProducts]', error);

    return {
      products: [],
      success: false,
      message:
        'Falha ao buscar os produtos. Detalhes: ' + (error as Error).message,
    };
  }
}
