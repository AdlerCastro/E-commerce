'use client';

import { Pages } from '@/enums/pages.enum';
import CartButton from '../atoms/cartButton';
import { Link } from '../atoms/link';
import { useCart } from '@/contexts/cartContext';

export default function Header() {
  const { totalPrice } = useCart();
  const totalFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(totalPrice());

  return (
    <div className='shadow-header sticky top-0 z-50 flex h-20 w-full justify-center bg-zinc-900 text-white shadow-white'>
      <div className='flex w-full max-w-[1280px] items-center gap-5 px-10 md:gap-10 md:px-12.5 lg:gap-15 lg:px-20'>
        <h1 className='animate-pulse text-3xl font-bold'>Logo</h1>
        <div className='flex w-full flex-row items-center justify-between gap-5'>
          <Link href={`${Pages.PRODUCTS}`}>Products</Link>
        </div>
        <CartButton>
          <span className='hidden min-[425px]:block'>{totalFormatted}</span>
        </CartButton>
      </div>
    </div>
  );
}
