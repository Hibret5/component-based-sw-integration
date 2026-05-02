import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type ProductStatus = 'on_sale' | 'sold_out';

export interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
  status: ProductStatus;
}

export interface CartItem extends Product {
  cartItemId: string;
}

export interface User {
  name: string;
  email?: string;
  role?: 'user' | 'admin';
}

export type AppView =
  | 'home'
  | 'login'
  | 'signup'
  | 'about'
  | 'contact'
  | 'cart'
  | 'payment'
  | 'profile'
  | 'admin';

export type PaymentMethod = 'card' | 'cash_on_delivery' | 'paypal';

interface SoldOutRecord {
  id: string;
  productTitle: string;
  timestamp: string;
}

interface AdminLog {
  id: string;
  action: string;
  timestamp: string;
}

interface AppState {
  products: Product[];
  cart: CartItem[];
  user: User | null;
  view: AppView;
  paymentMethod: PaymentMethod | null;
  adminLogs: AdminLog[];
  soldOutRecords: SoldOutRecord[];

  setView: (v: AppView) => void;
  setPaymentMethod: (m: PaymentMethod | null) => void;
  addToCart: (p: Product) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  setUser: (u: User | null) => void;
  updateUser: (patch: Partial<Pick<User, 'name' | 'email' | 'role'>>) => void;
  logout: () => void;

  addProduct: (input: Omit<Product, 'id' | 'status'>) => void;
  markProductSoldOut: (id: string) => void;
  markProductOnSale: (id: string) => void;
}

export const WOMEN_ITEMS: Product[] = [
  {
    id: '1',
    title: 'Satin Slip Dress',
    price: 49.99,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500',
    status: 'on_sale',
  },
  {
    id: '2',
    title: 'Low Rise Jeans',
    price: 59.99,
    category: 'Denim',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500',
    status: 'on_sale',
  },
  {
    id: '3',
    title: 'Oversized Hoodie',
    price: 35.0,
    category: 'Loungewear',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
    status: 'on_sale',
  },
  {
    id: '4',
    title: 'Stiletto Heels',
    price: 89.0,
    category: 'Shoes',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500',
    status: 'on_sale',
  },
];

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      products: [...WOMEN_ITEMS],
      cart: [],
      user: null,
      view: 'home',
      paymentMethod: null,
      adminLogs: [],
      soldOutRecords: [],

      setView: (view) => set({ view }),

      setPaymentMethod: (paymentMethod) => set({ paymentMethod }),

      addToCart: (product) => {
        if (product.status === 'sold_out') return;
        set((state) => ({
          cart: [...state.cart, { ...product, cartItemId: crypto.randomUUID() }],
        }));
      },

      removeFromCart: (cartItemId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.cartItemId !== cartItemId),
        })),

      clearCart: () => set({ cart: [] }),

      setUser: (user) => set({ user, view: 'home' }),

      updateUser: (patch) =>
        set((state) =>
          state.user
            ? { user: { ...state.user, ...patch } }
            : {},
        ),

      logout: () =>
        set({ user: null, view: 'home', cart: [] }),

      addProduct: ({ title, category, image, price }) => {
        const id = crypto.randomUUID();
        set((state) => ({
          products: [...state.products, { id, title, category, image, price, status: 'on_sale' }],
          adminLogs: [
            ...state.adminLogs,
            { id: crypto.randomUUID(), action: `Added product: ${title}`, timestamp: new Date().toLocaleString() },
          ],
        }));
      },

      markProductSoldOut: (id) =>
        set((state) => {
          const product = state.products.find((p) => p.id === id);
          if (!product) return {};
          const nextProducts = state.products.map((p) =>
            p.id === id ? { ...p, status: 'sold_out' as const } : p,
          );
          return {
            products: nextProducts,
            soldOutRecords: [
              ...state.soldOutRecords,
              {
                id: crypto.randomUUID(),
                productTitle: product.title,
                timestamp: new Date().toLocaleString(),
              },
            ],
            adminLogs: [
              ...state.adminLogs,
              { id: crypto.randomUUID(), action: `Marked sold out: ${product.title}`, timestamp: new Date().toLocaleString() },
            ],
          };
        }),

      markProductOnSale: (id) =>
        set((state) => {
          const product = state.products.find((p) => p.id === id);
          if (!product) return {};
          return {
            products: state.products.map((p) =>
              p.id === id ? { ...p, status: 'on_sale' as const } : p,
            ),
            adminLogs: [
              ...state.adminLogs,
              { id: crypto.randomUUID(), action: `Back on sale: ${product.title}`, timestamp: new Date().toLocaleString() },
            ],
          };
        }),
    }),
    {
      name: 'shes-store-storage-v4',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cart: state.cart,
        user: state.user,
        paymentMethod: state.paymentMethod,
        products: state.products,
        adminLogs: state.adminLogs,
        soldOutRecords: state.soldOutRecords,
      }),
    },
  ),
);
