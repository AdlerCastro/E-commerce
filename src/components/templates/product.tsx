'use client';

import { Product } from '@/types/product.type';
import { Container } from '../atoms/container';
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/contexts/cartContext';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { ButtonRouter } from '../atoms/buttonRouter';

export default function ProductPage({ product }: { product: Product }) {
  const [selectedPose, setSelectedPose] = useState(product.pose);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const { addToCart } = useCart();
  const router = useRouter();

  const imageSrc = `/assets/pandas/panda-1/${selectedPose}.webp`;

  function handleAddToCart() {
    if (!selectedSize) {
      alert('Selecione um tamanho antes de adicionar ao carrinho!');
      return;
    }

    addToCart(product, selectedPose, selectedSize);
    alert('Produto adicionado ao carrinho!');
  }

  const priceFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.price);

  return (
    <Container className='text-white'>
      <ButtonRouter onClick={() => router.back()} variant={'previous'} />
      <div className='mb-4 space-y-1'>
        <h1 className='text-3xl font-bold'>{product.title}</h1>
        <p className='text-sm text-zinc-300'>{product.description}</p>
        <p className='text-lg font-semibold'>{priceFormatted}</p>
      </div>

      <Image
        src={imageSrc}
        alt={`${product.title} - ${selectedPose}`}
        width={400}
        height={400}
        className='rounded-md border'
      />

      <div className='mt-6'>
        <h2 className='mb-2 text-lg font-semibold'>Escolha a pose:</h2>
        <div className='flex flex-wrap gap-3'>
          {product.variations.poses.map((pose) => (
            <button
              key={pose}
              onClick={() => setSelectedPose(pose)}
              className={`rounded border px-4 py-1 text-sm transition ${
                pose === selectedPose
                  ? 'border-purple-500 bg-purple-600 text-white'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              {pose.charAt(0).toUpperCase() + pose.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className='mt-6'>
        <h2 className='mb-2 text-lg font-semibold'>Escolha o tamanho:</h2>
        <div className='flex flex-wrap gap-2'>
          {product.variations.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`rounded border px-3 py-1 text-sm transition ${
                size === selectedSize
                  ? 'border-green-500 bg-green-600 text-white'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className='mt-8'>
        <Button onClick={handleAddToCart} className='w-full md:w-auto'>
          Adicionar ao Carrinho
        </Button>
      </div>
    </Container>
  );
}
