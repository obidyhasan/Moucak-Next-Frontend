/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";

export async function addFaq(faq: any) {
  try {
    const response = await serverFetch.post(`/faq/create`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(faq),
    });

    const result = await response.json();

    revalidatePath("/admin/faq");

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

export async function deleteFaq(id: string) {
  try {
    const response = await serverFetch.delete(`/faq/${id}`);
    const result = await response.json();

    revalidatePath("/admin/faq");

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

export async function getFaqs() {
  try {
    const response = await serverFetch.get(`/faq`);
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
