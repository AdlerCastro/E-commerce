'use client';

import { Container } from '@/components/atoms/container';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/cartContext';
import { Pages } from '@/enums/pages.enum';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Cat from 'public/assets/cat.png';

export default function Success() {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();

  const priceFormatted = (price: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);

  const handleReturnToHome = () => {
    router.push(Pages.HOME);
    clearCart();
  };
  return (
    <div className='flex w-full justify-center'>
      <Container className='px-5 md:px-7.5 lg:px-12.5'>
        <div className='flex w-full flex-col justify-center gap-10 rounded-xl bg-zinc-800 px-5 py-10 md:px-7.5 lg:px-12.5'>
          <div className='flex flex-col items-center justify-center gap-10'>
            <h1 className='px-5 text-center text-3xl font-bold text-white underline underline-offset-4 lg:px-7.5'>
              Obrigado pela compra!
            </h1>
            <Image src={Cat} alt='Gato fazendo sinal de ok' />
          </div>
          <div className='flex w-full flex-col gap-5 rounded-lg p-5'>
            <h2 className='px-5 text-center text-2xl font-bold text-white lg:px-7.5'>
              Resumo do pedido:
            </h2>
            <div className='flex w-full flex-col gap-5'>
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className='flex flex-col items-center justify-between gap-5 rounded-lg bg-zinc-700 p-5 lg:flex-row'
                >
                  <Image
                    src={item.product.image}
                    alt={`${item.product.title} ${item.product.pose}`}
                    width={300}
                    height={300}
                    className='rounded-lg'
                  />
                  <div className='flex flex-col gap-2'>
                    <h3 className='text-lg font-bold text-white'>
                      {item.product.title}
                    </h3>
                    <p className='text-sm text-white'>
                      {item.product.description}
                    </p>
                  </div>
                  <div className='flex w-fit flex-col gap-2'>
                    <span className='text-sm text-zinc-400'>
                      Valor unit.: {priceFormatted(item.product.price)}
                    </span>
                    <p className='text-sm text-zinc-400'>
                      Quantidade: {item.quantity}
                    </p>
                    <p className='text-lg font-bold text-nowrap text-white'>
                      Total:{' '}
                      {priceFormatted(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Button onClick={() => handleReturnToHome()}>
          Retornar a página principal
        </Button>
      </Container>
    </div>
  );
}
