import type { RootState } from "@/redux/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface InitialState {
  carts: CartItem[];
}

const initialState: InitialState = {
  carts: [],
};

const loadFromLocalStorage = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("carts") || "[]");
  } catch {
    return [];
  }
};

const saveToLocalStorage = (carts: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("carts", JSON.stringify(carts));
  }
};

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    hydrateCart(state) {
      state.carts = loadFromLocalStorage();
    },

    addCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.carts.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.carts.push(action.payload);
      }

      saveToLocalStorage(state.carts);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const product = state.carts.find((item) => item.id === action.payload.id);
      if (product) {
        product.quantity = action.payload.quantity;
        saveToLocalStorage(state.carts);
      }
    },

    deleteCart: (state, action: PayloadAction<string>) => {
      state.carts = state.carts.filter((item) => item.id !== action.payload);
      saveToLocalStorage(state.carts);
    },

    clearCart: (state) => {
      state.carts = [];
      if (typeof window !== "undefined") {
        localStorage.removeItem("carts");
      }
    },
  },
});

export const selectCarts = (state: RootState) =>
  (state.cart as InitialState).carts;

export const { hydrateCart, addCart, updateQuantity, deleteCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
