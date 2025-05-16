import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '@/contexts/cartContext';
import { Product } from '@/types/product.type';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

const mockProduct = (id: number): Product => ({
  id,
  title: `Panda ${id}`,
  slug: `panda-${id}`,
  price: 100,
  image: `/assets/pandas/panda-${id}/relaxado.webp`,
  description: 'Descrição do panda',
  featured: false,
  pose: 'relaxado',
  variations: {
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    poses: ['relaxado', 'dormindo', 'comendo'],
  },
});

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('deve adicionar um novo item ao carrinho', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct(1), 'relaxado', 'M');
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0]).toEqual({
      product: mockProduct(1),
      selectedPose: 'relaxado',
      selectedSize: 'M',
      quantity: 1,
    });
  });

  it('deve incrementar a quantidade se o item já estiver no carrinho', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct(2), 'comendo', 'G');
      result.current.addToCart(mockProduct(2), 'comendo', 'G');
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].quantity).toBe(2);
  });

  it('deve atualizar a quantidade corretamente', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct(3), 'dormindo', 'P');
      result.current.updateQuantity(3, 'dormindo', 'P', 5);
    });

    expect(result.current.cartItems[0].quantity).toBe(5);
  });

  it('deve remover um item específico do carrinho', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct(4), 'relaxado', 'GG');
      result.current.removeFromCart(4, 'relaxado', 'GG');
    });

    expect(result.current.cartItems).toHaveLength(0);
  });

  it('deve limpar todos os itens do carrinho', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct(5), 'comendo', 'G');
      result.current.addToCart(mockProduct(6), 'dormindo', 'M');
      result.current.clearCart();
    });

    expect(result.current.cartItems).toEqual([]);
  });

  it('deve calcular o preço total corretamente', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct(7), 'relaxado', 'P');
      result.current.addToCart(mockProduct(8), 'relaxado', 'P');
      result.current.updateQuantity(8, 'relaxado', 'P', 3);
    });

    expect(result.current.totalPrice()).toBe(100 + 300);
  });
});
