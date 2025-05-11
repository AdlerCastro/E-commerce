import CardProduct from '@/components/atoms/cardProduct';
import { Button } from '@/components/ui/button';
import { Pages } from '@/enums/pages.enum';
import { Product } from '@/types/product.type';
import Link from 'next/link';

export default function HomePage({ products }: { products: Product[] }) {
  return (
    <div className='flex w-full max-w-[1280px] flex-col items-center gap-10 px-5 py-12.5 md:px-7.5 lg:px-20 lg:py-20'>
      <h1 className='text-center text-3xl text-white underline underline-offset-4'>
        Welcome to the newest E-commerce
      </h1>
      <div className='flex w-full max-w-220 flex-col items-center gap-7.5 rounded-2xl bg-zinc-800 px-5 py-8'>
        <div className='flex w-full items-center gap-2.5'>
          <h2 className='text-2xl text-nowrap text-white'>Featured products</h2>
          <span className='h-0.5 w-full rounded-full bg-white' />
        </div>
        <div className='grid w-fit grid-cols-1 items-center justify-center gap-5 md:grid-cols-2 lg:grid-cols-3'>
          {products.map(
            (product, index) =>
              index < 6 && (
                <Link
                  href={`/${Pages.PRODUCTS}/${product.title}`}
                  key={product.id}
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
          <Link href={`/${Pages.PRODUCTS}`}>See all products</Link>
        </Button>
      </div>
    </div>
  );
}
