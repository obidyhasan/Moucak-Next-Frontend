"use client";

import { hydrateCart } from "@/redux/features/cart/CartSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function CartInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hydrateCart());
  }, [dispatch]);

  return null;
}
