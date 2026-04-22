import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// --- TYPES ---
export interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string; // Changed from 'img' to 'image' to match UI components
}

interface User {
  name: string;
  email?: string;
}

interface AppState {
  cart: Product[];
  user: User | null;
  view: 'home' | 'login' | 'signup' | 'about' | 'contact';
  setView: (v: 'home' | 'login' | 'signup' | 'about' | 'contact') => void;
  addToCart: (p: Product) => void;
  setUser: (u: User | null) => void;
  logout: () => void;
}

// --- DATA ---
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
          cart: [...state.cart, product] 
        })),
      
      setUser: (user) => set({ user, view: 'home' }),
      
      logout: () => set({ user: null, view: 'home' }),
    }),
    {
      name: 'shes-store-storage', // Key for localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);