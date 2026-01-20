import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      currentUserId: null,

      setCurrentUserId: (userId) => set({ currentUserId: userId }),

      addToCart: (product) => {
        const currentUserId = get().currentUserId;
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
        // حفظ السلة للمستخدم الحالي
        if (currentUserId) {
          localStorage.setItem(`cart-${currentUserId}`, JSON.stringify(get().cartItems));
        }
      },

      deletItem: (productId) => {
        const currentUserId = get().currentUserId;
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item._id !== productId),
        }));
        // حفظ السلة بعد الحذف
        if (currentUserId) {
          localStorage.setItem(`cart-${currentUserId}`, JSON.stringify(get().cartItems));
        }
      },

      increaseItem: (productId) => {
        const currentUserId = get().currentUserId;
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item._id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }));
        // حفظ السلة بعد الزيادة
        if (currentUserId) {
          localStorage.setItem(`cart-${currentUserId}`, JSON.stringify(get().cartItems));
        }
      },

      decreaseItem: (productId) => {
        const currentUserId = get().currentUserId;
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item._id === productId
              ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
              : item
          ),
        }));
        // حفظ السلة بعد الإنقاص
        if (currentUserId) {
          localStorage.setItem(`cart-${currentUserId}`, JSON.stringify(get().cartItems));
        }
      },

      clearCart: () => set({ cartItems: [] }),

      loadUserCart: (userId) => {
        if (userId) {
          const savedCart = localStorage.getItem(`cart-${userId}`);
          if (savedCart) {
            try {
              const cartItems = JSON.parse(savedCart);
              set({ cartItems, currentUserId: userId });
            } catch (error) {
              console.error("Error loading cart:", error);
              set({ cartItems: [], currentUserId: userId });
            }
          } else {
            set({ cartItems: [], currentUserId: userId });
          }
        }
      },
    }),
    {
      name: "cart-storage-temp",
    }
  )
);

export default useCartStore;
