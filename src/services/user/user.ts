/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";

export async function getAllUsers(params?: {
  searchTerm?: string;
  page?: number;
  limit?: number;
}) {
  try {
    const query = new URLSearchParams({
      searchTerm: params?.searchTerm || "",
      page: String(params?.page || 1),
      limit: String(params?.limit || 10),
    });

    const response = await serverFetch.get(`/user?${query.toString()}`);
    const result = await response.json();
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

export async function getUser() {
  try {
    const response = await serverFetch.get(`/user/me`);
    return await response.json();
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

export async function updateUser({ id, data }: { id: string; data: any }) {
  try {
    const response = await serverFetch.patch(`/user/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    revalidatePath("/me");

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
