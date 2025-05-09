import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '@/contexts/cartContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('deve adicionar um novo item ao carrinho', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(1);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0]).toEqual({ id: 1, quantity: 1 });
  });

  it('deve incrementar a quantidade se o item já estiver no carrinho', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(2);
      result.current.addToCart(2);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0]).toEqual({ id: 2, quantity: 2 });
  });

  it('deve atualizar a quantidade de um item corretamente', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(3);
      result.current.updateQuantity(3, 5);
    });

    expect(result.current.cartItems[0]).toEqual({ id: 3, quantity: 5 });
  });

  it('deve remover um item do carrinho', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(4);
      result.current.removeFromCart(4);
    });

    expect(result.current.cartItems).toHaveLength(0);
  });

  it('deve limpar todos os itens do carrinho', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(5);
      result.current.addToCart(6);
      result.current.clearCart();
    });

    expect(result.current.cartItems).toEqual([]);
  });
});
