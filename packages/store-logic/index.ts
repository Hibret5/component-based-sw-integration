import { create } from 'zustand';

export const WOMEN_ITEMS = [
  { id: '1', title: 'Satin Slip Dress', price: 49.99, category: 'Dresses', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500' },
  { id: '2', title: 'Low Rise Jeans', price: 59.99, category: 'Denim', img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500' },
  { id: '3', title: 'Oversized Hoodie', price: 35.00, category: 'Loungewear', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500' },
  { id: '4', title: 'Stiletto Heels', price: 89.00, category: 'Shoes', img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500' },
];

interface AppState {
  cart: any[]; 
  user: any | null; 
  view: 'home' | 'login' | 'signup' | 'about' | 'contact';
  setView: (v: any) => void;
  addToCart: (p: any) => void;
  setUser: (u: any) => void;
  logout: () => void;
}

export const useStore = create<AppState>((set) => ({
  cart: [], user: null, view: 'home',
  setView: (view) => set({ view }),
  addToCart: (product) => set((s) => ({ cart: [...s.cart, product] })),
  setUser: (user) => set({ user, view: 'home' }),
  logout: () => set({ user: null, view: 'home' }),
}));