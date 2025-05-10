'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import { CartItem } from '@/types/cart.type';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext({} as CartContextType);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function addToCart(productId: number) {
    setCartItems((state) => {
      const productInCart = state.some((item) => item.id === productId);

      if (productInCart) {
        return state.map((item) => {
          if (item.id === productId) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          } else {
            return item;
          }
        });
      } else {
        return [...state, { id: productId, quantity: 1 }];
      }
    });
  }

  function updateQuantity(id: number, quantity: number) {
    setCartItems((state) =>
      state.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity,
          };
        } else {
          return item;
        }
      }),
    );
  }

  function removeFromCart(id: number) {
    setCartItems((state) => state.filter((item) => item.id !== id));
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
