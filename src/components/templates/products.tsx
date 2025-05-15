import { Container } from '@/components/atoms/container';
import { Product } from '@/types/product.type';
import CardProduct from '../atoms/cardProduct';
import Link from 'next/link';
import { Pages } from '@/enums/pages.enum';

export default function ProductsPage({ products }: { products: Product[] }) {
  return (
    <Container className='text-white'>
      <h1 className='self-start text-center text-3xl font-bold text-white'>
        Featured products
      </h1>
      <div className='grid grid-cols-1 items-center justify-center gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {products.map(
          (product) =>
            product.featured && (
              <Link key={product.id} href={`${Pages.PRODUCTS}/${product.slug}`}>
                <CardProduct
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                  alt={product.title}
                  featured={product.featured}
                />
              </Link>
            ),
        )}
      </div>
      <div className='flex w-full flex-col items-center gap-10'>
        <h2 className='self-start text-2xl font-bold text-nowrap text-white'>
          Other products
        </h2>
        <div className='grid w-fit grid-cols-1 items-start justify-center gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {products.map(
            (product) =>
              !product.featured && (
                <Link
                  key={product.id}
                  href={`${Pages.PRODUCTS}/${product.slug}`}
                >
                  <CardProduct
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    image={product.image}
                    alt={product.title}
                  />
                </Link>
              ),
          )}
        </div>
      </div>
    </Container>
  );
}
