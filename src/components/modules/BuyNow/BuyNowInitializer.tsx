"use client";

import { hydrateBuyNow } from "@/redux/features/buyNow/buyNowSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function BuyNowInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hydrateBuyNow());
  }, [dispatch]);

  return null;
}
