import { NextResponse } from 'next/server';
import { generateMockProducts } from '@/lib/mocks/generateProducts';

export async function GET() {
  const products = generateMockProducts();
  return NextResponse.json(products);
}
