/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export async function addCart(cart: any) {
  try {
    const response = await serverFetch.post(`/cart/create`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log("Add cart error:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error?.message
          : "Something went wrong",
    };
  }
}

export async function getCarts() {
  try {
    const response = await serverFetch.get(`/cart/me`);

    const result = await response.json();

    return result?.data?.data || result;
  } catch (error: any) {
    console.log("Get carts error:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error?.message
          : "Something went wrong",
    };
  }
}
