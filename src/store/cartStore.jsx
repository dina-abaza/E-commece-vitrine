import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (product) => {
        const existItem = get().cartItems.find((item) => item._id === product._id);
        if (existItem) {
          set({
            cartItems: get().cartItems.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            cartItems: [...get().cartItems, { ...product, quantity: 1 }],
          });
        }
      },

      deletItem: (productId) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item._id !== productId),
        })),

      increaseItem: (productId) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item._id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      decreaseItem: (productId) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item._id === productId
              ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
              : item
          ),
        })),

      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
);

export default useCartStore;
