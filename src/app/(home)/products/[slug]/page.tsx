import { getProduct } from '@/actions/getProduct';
import { getProducts } from '@/actions/getProducts';
import ProductPage from '@/components/templates/product';

export async function generateStaticParams() {
  const response = await getProducts();

  return response.products.map((product) => ({ slug: product.slug }));
}

export default async function Product({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const response = await getProduct(slug);
  const { product } = response;

  if (!product) {
    return <div className='text-white'>Product not found</div>;
  }

  return (
    <div className='flex w-full justify-center'>
      <ProductPage product={product} />
    </div>
  );
}
