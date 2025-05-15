import { getProduct } from '@/actions/getProduct';
import ProductPage from '@/components/templates/product';

export default async function Product({
  params,
}: {
  params: { slug: string };
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
