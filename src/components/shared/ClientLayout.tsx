"use client";

import CartInitializer from "../modules/Cart/CartInitializer";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store";
import BuyNowInitializer from "../modules/BuyNow/BuyNowInitializer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider store={store}>
      <CartInitializer />
      <BuyNowInitializer />
      {children}
    </ReduxProvider>
  );
}
