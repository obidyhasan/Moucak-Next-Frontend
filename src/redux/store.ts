import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import cartReducer from "./features/cart/CartSlice";
import buyNowReducer from "@/redux/features/buyNow/buyNowSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    buyNow: buyNowReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
