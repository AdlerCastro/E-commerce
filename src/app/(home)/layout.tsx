import Header from '@/components/molecules/header';
import { CartProvider } from '@/contexts/cartContext';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <main className='relative min-h-screen w-full bg-zinc-900'>
        <Header />
        {children}
      </main>
    </CartProvider>
  );
}
