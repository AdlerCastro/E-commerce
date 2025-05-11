import { CartProvider } from '@/contexts/cartContext';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='min-h-screen w-full bg-zinc-900'>
      <CartProvider>{children}</CartProvider>
    </main>
  );
}
