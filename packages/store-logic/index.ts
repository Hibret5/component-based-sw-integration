import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// --- TYPES ---
export interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string; 
}

// Extension of Product to handle unique items in the cart
export interface CartItem extends Product {
  cartItemId: string; 
}

interface User {
  name: string;
  email?: string;
}

// Updated View type to include 'cart' and 'payment'
export type AppView = 'home' | 'login' | 'signup' | 'about' | 'contact' | 'cart' | 'payment';

interface AppState {
  cart: CartItem[];
  user: User | null;
  view: AppView;
  setView: (v: AppView) => void;
  addToCart: (p: Product) => void;
  removeFromCart: (cartItemId: string) => void; // Fixed: Needs to be able to remove items
  clearCart: () => void;
  setUser: (u: User | null) => void;
  logout: () => void;
}

// --- MOCK DATA ---
export const WOMEN_ITEMS: Product[] = [
  { id: '1', title: 'Satin Slip Dress', price: 49.99, category: 'Dresses', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500' },
  { id: '2', title: 'Low Rise Jeans', price: 59.99, category: 'Denim', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500' },
  { id: '3', title: 'Oversized Hoodie', price: 35.00, category: 'Loungewear', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500' },
  { id: '4', title: 'Stiletto Heels', price: 89.00, category: 'Shoes', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500' },
];

// --- STORE WITH PERSISTENCE ---
export const useStore = create<AppState>()(
  persist(
    (set) => ({
      cart: [],
      user: null,
      view: 'home',
      
      setView: (view) => set({ view }),
      
      addToCart: (product) => 
        set((state) => ({ 
          cart: [...state.cart, { ...product, cartItemId: crypto.randomUUID() }] 
        })),

      removeFromCart: (cartItemId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.cartItemId !== cartItemId)
        })),

      clearCart: () => set({ cart: [] }),
      
      setUser: (user) => set({ user, view: 'home' }),
      
      logout: () => set({ user: null, view: 'home', cart: [] }),
    }),
    {
      name: 'shes-store-storage', 
      storage: createJSONStorage(() => localStorage),
    }
  )
);