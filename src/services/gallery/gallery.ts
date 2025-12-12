/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";

export async function addImage(image: FormData | any) {
  try {
    const response = await serverFetch.post(`/gallery/create`, {
      body: image,
    });

    const result = await response.json();

    revalidatePath("/admin/gallery");

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

export async function deleteImage(id: string) {
  try {
    const response = await serverFetch.delete(`/gallery/${id}`);
    const result = await response.json();

    revalidatePath("/admin/gallery");

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

export async function getImages() {
  try {
    const response = await serverFetch.get(`/gallery`);
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
