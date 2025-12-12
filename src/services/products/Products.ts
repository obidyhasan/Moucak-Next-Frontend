/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";

export async function addProduct(formData: FormData) {
  try {
    const response = await serverFetch.post(`/product/create`, {
      body: formData,
    });
    const result = await response.json();

    revalidatePath("/admin/products");

    return result;
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    };
  }
}

export async function updateProduct(id: string, formData: any) {
  try {
    const response = await serverFetch.patch(`/product/${id}`, {
      body: formData,
    });

    const result = await response.json();

    revalidatePath("/admin/products");

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

export async function getProducts(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/product${queryString ? `?${queryString}` : ""}`
    );

    const result = await response.json();

    return result?.data || result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}

export async function deleteProduct(id: string) {
  try {
    const response = await serverFetch.delete(`/product/${id}`);
    return await response.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}

export async function getSingleProduct(slug: string) {
  try {
    const response = await serverFetch.get(`/product/${slug}`);
    const result = await response.json();

    return result?.data?.product || result;
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
