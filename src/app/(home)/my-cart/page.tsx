'use client';

import { ButtonRouter } from '@/components/atoms/buttonRouter';
import CartButton from '@/components/atoms/cartButton';
import { Container } from '@/components/atoms/container';
import { Toast } from '@/components/atoms/toast';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/cartContext';
import { Pages } from '@/enums/pages.enum';
import { MinusCircle, PlusCircle, TrashIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function MyCart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const router = useRouter();

  const priceFormatted = (price: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);

  const handleUpdateQuantityMinus = (
    productId: number,
    selectedPose: string,
    selectedSize: string,
    quantity: number,
  ) => {
    if (quantity > 1) {
      updateQuantity(productId, selectedPose, selectedSize, quantity - 1);
    } else {
      Toast({
        description: 'O carrinho foi limpo!',
        variant: 'success',
      });
      removeFromCart(productId, selectedPose, selectedSize);
    }
  };

  const handleClearCart = () => {
    Toast({
      description: 'O carrinho foi limpo!',
      variant: 'success',
    });
    clearCart();
  };

  if (cartItems.length === 0) {
    return (
      <div className='flex w-full justify-center'>
        <Container className='gap-10 px-5 md:px-7.5 lg:px-12.5'>
          <ButtonRouter onClick={() => router.back()} variant={'previous'} />
          <div className='flex w-full flex-col items-center justify-center gap-5 rounded-2xl bg-zinc-700 p-5 lg:p-7.5'>
            <h1 className='text-center text-2xl font-bold text-white'>
              Your Cart is Empty
            </h1>
            <p className='text-center text-lg text-white'>
              Add some products to your cart to get started!
            </p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className='flex w-full justify-center'>
      <Container className='px-5 md:px-7.5 lg:px-12.5'>
        <ButtonRouter onClick={() => router.back()} variant={'previous'} />
        <h1 className='px-5 text-center text-3xl font-bold text-white underline underline-offset-4 lg:px-7.5'>
          My cart
        </h1>
        <div className='flex w-full flex-col items-center gap-7.5 rounded-2xl bg-zinc-800 px-5 py-8 lg:px-7.5'>
          <div className='flex w-full flex-col gap-5'>
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className='flex w-full items-center justify-between gap-5'
              >
                <Link href={`${Pages.PRODUCTS}/${item.product.slug}`}>
                  <Image
                    src={item.product.image}
                    alt={`${item.product.title} ${item.product.pose}`}
                    width={300}
                    height={300}
                    className='rounded-lg'
                  />
                </Link>
                <div className='flex flex-col rounded-2xl bg-zinc-600 p-5'>
                  <h3 className='text-lg font-bold text-white'>
                    {item.product.title}
                  </h3>
                  <p className='text-sm text-white'>
                    {item.product.description}
                  </p>
                  <p className='text-lg font-bold text-white'>
                    {priceFormatted(item.product.price)}
                  </p>
                </div>
                <div className='flex flex-col items-center gap-5'>
                  <div className='flex flex-row items-center justify-center gap-2 rounded-4xl bg-purple-600 font-normal text-white transition-all'>
                    <Button
                      onClick={() =>
                        handleUpdateQuantityMinus(
                          item.product.id,
                          item.selectedPose,
                          item.selectedSize,
                          item.quantity,
                        )
                      }
                    >
                      <MinusCircle className='h-5 w-5' />
                    </Button>
                    {item.quantity}
                    <Button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.selectedPose,
                          item.selectedSize,
                          item.quantity + 1,
                        )
                      }
                    >
                      <PlusCircle className='h-5 w-5' />
                    </Button>
                  </div>
                  <CartButton
                    onClick={() =>
                      removeFromCart(
                        item.product.id,
                        item.selectedPose,
                        item.selectedSize,
                      )
                    }
                    icon={<TrashIcon className='h-5 w-5' />}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <CartButton
          onClick={() => handleClearCart()}
          icon={<TrashIcon className='h-5 w-5' />}
        >
          <span>Limpar Carrinho</span>
        </CartButton>
        <Button onClick={() => router.push('/checkout')}>
          Finalizar Compra
        </Button>
      </Container>
    </div>
  );
}
