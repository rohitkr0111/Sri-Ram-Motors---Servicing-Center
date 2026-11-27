import { create } from 'zustand';
import { CartItem, Product } from '../types';

const CART_STORAGE_KEY = 'sri_ram_cart_data_v1';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}

const loadInitialCart = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (err) {
    console.error('Failed to parse cart from localStorage:', err);
    return [];
  }
};

const saveCart = (items: CartItem[]) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save cart to localStorage:', err);
  }
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: loadInitialCart(),

  addItem: (product: Product, quantity = 1) => {
    set((state) => {
      const existingIndex = state.items.findIndex((item) => item.product.id === product.id);
      let updatedItems: CartItem[];

      if (existingIndex > -1) {
        updatedItems = state.items.map((item, idx) => {
          if (idx === existingIndex) {
            return { ...item, quantity: item.quantity + quantity };
          }
          return item;
        });
      } else {
        updatedItems = [...state.items, { product, quantity }];
      }

      saveCart(updatedItems);
      return { items: updatedItems };
    });
  },

  removeItem: (productId: string) => {
    set((state) => {
      const updatedItems = state.items.filter((item) => item.product.id !== productId);
      saveCart(updatedItems);
      return { items: updatedItems };
    });
  },

  updateQuantity: (productId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }

    set((state) => {
      const updatedItems = state.items.map((item) => {
        if (item.product.id === productId) {
          return { ...item, quantity };
        }
        return item;
      });
      saveCart(updatedItems);
      return { items: updatedItems };
    });
  },

  clearCart: () => {
    saveCart([]);
    set({ items: [] });
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getSubtotal: () => {
    return get().items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
}));
