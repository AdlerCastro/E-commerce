'use server';

import { api } from '@/lib/api';
import { Product } from '@/types/product.type';

type ProductResponse = {
  product: Product | null;
  success: boolean;
  message: string;
};

export async function getProduct(
  productSlug: string,
  cacheTimeSeconds = 60 * 60,
): Promise<ProductResponse> {
  const slug = productSlug?.trim();

  if (!slug) {
    return {
      product: null,
      success: false,
      message: 'Produto não encontrado: slug inválido.',
    };
  }

  try {
    const response = await api(`/products/${slug}`, {
      next: { revalidate: cacheTimeSeconds },
    });

    if (!response.ok) {
      throw new Error(`Resposta inválida da API (status ${response.status})`);
    }

    const json = (await response.json()) as ProductResponse;

    if (!json?.product) {
      throw new Error(`Produto com slug "${slug}" não encontrado.`);
    }

    return json;
  } catch (error) {
    console.error(`[getProduct] Falha ao buscar "${productSlug}":`, error);

    return {
      product: null,
      success: false,
      message:
        'Erro ao buscar produto: ' +
        (error instanceof Error ? error.message : 'Erro desconhecido'),
    };
  }
}
