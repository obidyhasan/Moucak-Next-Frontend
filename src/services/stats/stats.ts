/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export async function getUserStats() {
  try {
    const response = await serverFetch.get(`/stats/user`);
    const result = await response.json();

    return result?.data || result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    };
  }
}

export async function getOrderStats() {
  try {
    const response = await serverFetch.get(`/stats/order`);
    const result = await response.json();

    return result?.data || result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    };
  }
}
