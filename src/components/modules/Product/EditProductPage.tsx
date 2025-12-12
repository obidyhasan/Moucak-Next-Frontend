"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SingleImageUploader from "@/components/shared/SingleImageUploader";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import z from "zod";
import { toast } from "sonner";
import type { IErrorResponse } from "@/types";

import { useParams, useRouter } from "next/navigation";
import { updateProduct } from "@/services/products/Products";

const addProductSchema = z.object({
  name: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  price: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Price must be greater than 0",
    })
    .optional(),
  previousPrice: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Previous Price must be greater than 0",
    })
    .optional(),
  description: z.string().min(1).optional(),
  status: z.string().min(1).optional(),
});

const EditProductPage = ({ data }: any) => {
  const { slug } = useParams();
  const router = useRouter();

  const [buttonDisable, setButtonDisable] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: "",
      category: "",
      price: "",
      previousPrice: "",
      description: "",
      status: "",
    },
  });

  const product = data?.find((product: any) => product?.slug === slug);

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        category: product.category,
        price: product.price?.toString() || "",
        previousPrice: product.previousPrice?.toString() || "",
        description: product.description,
        status: product.status ?? "",
      });
    }
  }, [product, form]);

  if (!product) return <div>Loading...</div>;

  const onSubmit = async (values: any) => {
    setButtonDisable(true);

    const toastId = toast.loading("Updating product...");

    const payload = {
      ...values,
      price: Number(values.price),
      previousPrice: Number(values.previousPrice),
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));

    if (image) {
      formData.append("file", image);
    }

    try {
      const res = await updateProduct(product._id, formData);
      if (res.success) {
        toast.success("Product updated successfully", { id: toastId });
        router.replace("/admin/products");
      }
    } catch (err) {
      toast.error((err as IErrorResponse).message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      setButtonDisable(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto w-full">
      <Form {...form}>
        <form
          id="edit-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="p-4 space-y-3"
        >
          {/* Image */}
          <div className="pb-3">
            <SingleImageUploader
              previewImg={product?.image}
              onChange={setImage}
            />
          </div>

          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          {/* <FormField
          
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Status</FormLabel>

                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="INACTIVE">Inactive</SelectItem>
                      <SelectItem value="STOCK_OUT">Stock Out</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          /> */}

          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Previous Price */}
          <FormField
            control={form.control}
            name="previousPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Previous Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter previous price"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter product description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={buttonDisable} type="submit" className="mt-2">
            Update Product
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditProductPage;
