import { NextResponse } from 'next/server';
import { generateMockProducts } from '@/lib/mocks/generateProducts';
import { Product } from '@/types/product.type';

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const products: Product[] = generateMockProducts();
    const featuredProducts = products.filter((product) => product.featured);

    return NextResponse.json(
      {
        products: featuredProducts,
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
