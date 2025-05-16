import { NextResponse } from 'next/server';
import { FinalizePurchaseSchema } from '@/schemas/finalizingPurchase.schema';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validated = FinalizePurchaseSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Dados inválidos',
          errors: validated.error.format(),
        },
        { status: 400 },
      );
    }

    console.log('[FINALIZE_PURCHASE]', validated.data);

    return NextResponse.json(
      {
        success: true,
        message: 'Pedido finalizado com sucesso!',
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('[API ERROR - finalizing-purchase]', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Erro interno ao finalizar o pedido.',
      },
      { status: 500 },
    );
  }
}
