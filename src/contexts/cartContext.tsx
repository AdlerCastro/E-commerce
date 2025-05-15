'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { CartItem } from '@/types/cart.type';
import { Product } from '@/types/product.type';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, pose: string, size: string) => void;
  updateQuantity: (
    id: number,
    pose: string,
    size: string,
    quantity: number,
  ) => void;
  removeFromCart: (id: number, pose: string, size: string) => void;
  clearCart: () => void;
  totalPrice: () => number;
}

const CartContext = createContext({} as CartContextType);

const CART_STORAGE_KEY = '@panda-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // 🔁 Carrega o carrinho do localStorage quando o app inicia
  useEffect(() => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      try {
        const parsed: CartItem[] = JSON.parse(stored);
        setCartItems(parsed);
      } catch {
        console.warn('Carrinho inválido no localStorage');
      }
    }
  }, []);

  // 💾 Salva o carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(
    product: Product,
    selectedPose: string,
    selectedSize: string,
  ) {
    setCartItems((state) => {
      const existing = state.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedPose === selectedPose &&
          item.selectedSize === selectedSize,
      );

      if (existing) {
        return state.map((item) =>
          item.product.id === product.id &&
          item.selectedPose === selectedPose &&
          item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...state, { product, selectedPose, selectedSize, quantity: 1 }];
    });
  }

  function updateQuantity(
    id: number,
    pose: string,
    size: string,
    quantity: number,
  ) {
    setCartItems((state) =>
      state.map((item) =>
        item.product.id === id &&
        item.selectedPose === pose &&
        item.selectedSize === size
          ? { ...item, quantity }
          : item,
      ),
    );
  }

  function removeFromCart(id: number, pose: string, size: string) {
    setCartItems((state) =>
      state.filter(
        (item) =>
          item.product.id !== id ||
          item.selectedPose !== pose ||
          item.selectedSize !== size,
      ),
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  function totalPrice() {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
