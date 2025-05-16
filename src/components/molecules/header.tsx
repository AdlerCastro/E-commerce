'use client';

import { Pages } from '@/enums/pages.enum';
import CartButton from '../atoms/cartButton';
import { Link } from '../atoms/link';

import { useCart } from '@/contexts/cartContext';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { totalPrice } = useCart();
  const router = useRouter();

  const totalFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(totalPrice());

  return (
    <div className='shadow-header sticky top-0 z-50 flex h-20 w-full justify-center bg-zinc-900 text-white shadow-white'>
      <div className='flex w-full max-w-[1280px] items-center gap-5 px-10 md:gap-10 md:px-12.5 lg:gap-15 lg:px-20'>
        <div className='flex w-full flex-row items-center gap-5'>
          <Link
            href={`${Pages.HOME}`}
            aria-label='Link para acessar a página principal'
            className='animate-pulse text-3xl font-bold'
          >
            Logo
          </Link>
          <Link
            href={`${Pages.PRODUCTS}`}
            aria-label='Link para acessar a página dos produtos'
          >
            Products
          </Link>
        </div>
        <CartButton
          onClick={() => router.push(Pages.CART)}
          aria-label='Botão para acessar o carrinho'
        >
          <span className='hidden min-[425px]:block'>{totalFormatted}</span>
        </CartButton>
      </div>
    </div>
  );
}
