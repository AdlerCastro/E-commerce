import { getProducts } from '@/actions/getProducts';
import ProductsPage from '@/components/templates/products';

export default async function Products() {
  const response = await getProducts();
  const { products } = response;

  return (
    <div className='flex w-full justify-center'>
      <ProductsPage products={products} />
    </div>
  );
}
