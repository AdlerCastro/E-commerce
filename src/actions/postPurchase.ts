'use server';

import { api } from '@/lib/api';
import { FinalizePurchase as FinalizePurchaseType } from '@/types/finalizePurchase.type';

export async function FinalizePurchase(data: FinalizePurchaseType) {
  try {
    const response = await api(
      `/finalizing-purchase`,

      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      throw new Error('Erro ao enviar pedido');
    }

    const result = await response.json();
    return {
      success: true,
      message: result.message || 'Pedido finalizado com sucesso!',
    };
  } catch (error) {
    return {
      success: false,
      message:
        (error as Error).message || 'Erro desconhecido ao finalizar o pedido.',
    };
  }
}
