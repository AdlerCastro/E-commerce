import { NextResponse } from 'next/server';
import { getAllMockProducts } from '@/lib/mocks/staticProducts';
import { Product } from '@/types/product.type';

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const products: Product[] = getAllMockProducts();

    return NextResponse.json(
      {
        products,
        success: true,
        message: 'Mock products generated successfully',
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        products: [],
        success: false,
        message: 'Failed to get mock products. Exception: ' + String(error),
      },
      { status: 500 },
    );
  }
}
