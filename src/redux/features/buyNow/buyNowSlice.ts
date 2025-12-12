import type { RootState } from "@/redux/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface BuyNowItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface InitialState {
  product: BuyNowItem | null;
}

const initialState: InitialState = {
  product: null,
};

const loadBuyNowFromLocalStorage = (): BuyNowItem | null => {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem("buyNow") || "null");
  } catch {
    return null;
  }
};

const saveBuyNowToLocalStorage = (product: BuyNowItem | null) => {
  if (typeof window !== "undefined") {
    if (product) {
      localStorage.setItem("buyNow", JSON.stringify(product));
    } else {
      localStorage.removeItem("buyNow");
    }
  }
};

const buyNowSlice = createSlice({
  name: "buyNow",
  initialState,
  reducers: {
    hydrateBuyNow(state) {
      state.product = loadBuyNowFromLocalStorage();
    },
    setBuyNow: (state, action: PayloadAction<BuyNowItem>) => {
      state.product = action.payload;
      saveBuyNowToLocalStorage(action.payload);
    },
    clearBuyNow: (state) => {
      state.product = null;
      saveBuyNowToLocalStorage(null);
    },
  },
});

export const selectBuyNow = (state: RootState) => state.buyNow.product;

export const { hydrateBuyNow, setBuyNow, clearBuyNow } = buyNowSlice.actions;

export default buyNowSlice.reducer;
