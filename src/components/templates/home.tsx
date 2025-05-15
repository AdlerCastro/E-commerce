import CardProduct from '@/components/atoms/cardProduct';
import { Button } from '@/components/ui/button';
import { Pages } from '@/enums/pages.enum';
import { Product } from '@/types/product.type';
import Link from 'next/link';
import { Container } from '../atoms/container';

export default function HomePage({ products }: { products: Product[] }) {
  return (
    <Container className='px-5 md:px-7.5 lg:px-12.5'>
      <h1 className='px-5 text-center text-3xl font-bold text-white underline underline-offset-4 lg:px-7.5'>
        Welcome to the newest E-commerce
      </h1>
      <div className='flex w-full flex-col items-center gap-7.5 rounded-2xl bg-zinc-800 px-5 py-8 lg:px-7.5'>
        <div className='flex w-full items-center gap-2.5'>
          <h2 className='text-2xl font-bold text-nowrap text-white'>
            Featured products
          </h2>
          <span className='h-0.5 w-full rounded-full bg-white' />
        </div>
        <div className='grid w-fit grid-cols-1 items-center justify-center gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {products.map(
            (product, index) =>
              index < 4 && (
                <Link
                  key={product.id}
                  href={`${Pages.PRODUCTS}/${product.slug}`}
                  aria-label={`Link para visualizar o produto ${product.title}`}
                >
                  <CardProduct
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    image={product.image}
                    alt={product.title}
                    featured={product.featured}
                    className='justify-self-center'
                  />
                </Link>
              ),
          )}
        </div>
        <Button asChild className='mt-5 w-fit self-center'>
          <Link
            href={`${Pages.PRODUCTS}`}
            aria-label='Link para visualizar todos os produtos'
          >
            See all products
          </Link>
        </Button>
      </div>
    </Container>
  );
}
