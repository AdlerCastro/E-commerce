import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '@/contexts/cartContext';
import { Product } from '@/types/product.type';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

const mockProduct = (id: number): Product => ({
  id,
  title: `Produto ${id}`,
  slug: `produto-${id}`,
  price: 100,
  image: 'https://example.com/image.jpg',
  description: 'Descrição',
  featured: false,
});

describe('CartContext', () => {
  it('deve adicionar um novo item ao carrinho', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct(1));
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0]).toEqual({
      ...mockProduct(1),
      quantity: 1,
    });
  });

  it('deve incrementar a quantidade se o item já estiver no carrinho', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct(2));
      result.current.addToCart(mockProduct(2));
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0]).toEqual({
      ...mockProduct(2),
      quantity: 2,
    });
  });

  it('deve atualizar a quantidade de um item corretamente', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct(3));
      result.current.updateQuantity(3, 5);
    });

    expect(result.current.cartItems[0]).toEqual({
      ...mockProduct(3),
      quantity: 5,
    });
  });

  it('deve remover um item do carrinho', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct(4));
      result.current.removeFromCart(mockProduct(4).id);
    });

    expect(result.current.cartItems).toHaveLength(0);
  });

  it('deve limpar todos os itens do carrinho', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct(5));
      result.current.addToCart(mockProduct(6));
      result.current.clearCart();
    });

    expect(result.current.cartItems).toEqual([]);
  });
});
