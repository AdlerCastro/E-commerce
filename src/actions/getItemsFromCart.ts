'use client';

import { CartItem } from '@/types/cart.type';

export function GetItemsFromCart(): CartItem[] {
  if (typeof window === 'undefined') return [];

  const raw = localStorage.getItem('@panda-cart');

  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as CartItem[];

    if (!Array.isArray(parsed)) return [];

    return parsed;
  } catch (error) {
    console.warn('[getItemsFromCart] Erro ao parsear localStorage:', error);
    return [];
  }
}
