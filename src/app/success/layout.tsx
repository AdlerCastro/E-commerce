import { CartProvider } from '@/contexts/cartContext';
import { Toaster } from 'sonner';

export default function SuccessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <main className='relative min-h-screen w-full bg-zinc-900'>
        {children}
      </main>
      <Toaster />
    </CartProvider>
  );
}
