/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export async function addOrder(orderInfo: any) {
  try {
    const response = await serverFetch.post(`/order/create`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderInfo),
    });

    const result = await response.json();
    return result;
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

export async function updateOrder(id: string, updateInfo: any) {
  try {
    const response = await serverFetch.patch(`/order/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateInfo),
    });

    const result = await response.json();
    return result;
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

export async function getMyOrders() {
  try {
    const response = await serverFetch.get(`/order/me`);
    const result = await response.json();

    return result?.data?.data || result;
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

export async function getAllOrders(queryParams?: any) {
  try {
    const queryString = queryParams
      ? "?" + new URLSearchParams(queryParams).toString()
      : "";

    const response = await serverFetch.get(`/order${queryString}`);

    const result = await response.json();
    return result?.data;
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
