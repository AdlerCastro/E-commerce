import { getMockProductBySlug } from '@/lib/mocks/staticProducts';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  const { slug } = await params;

  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    const product = getMockProductBySlug(slug);

    if (!product) {
      return NextResponse.json(
        {
          product: null,
          success: false,
          message: `Produto com slug "${slug}" não encontrado.`,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        product,
        success: true,
        message: 'Produto encontrado com sucesso.',
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        product: null,
        success: false,
        message: 'Erro interno ao buscar produto: ' + (error as Error).message,
      },
      { status: 500 },
    );
  }
}
