import { getFeaturedProducts } from '@/actions/getFeaturedProducts';
import HomePage from '@/components/templates/home';

export default async function Home() {
  const response = await getFeaturedProducts();
  const { products } = response;

  return (
    <div className='flex w-full justify-center'>
      <HomePage products={products} />
    </div>
  );
}
