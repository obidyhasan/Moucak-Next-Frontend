/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import SingleImageUploader from "@/components/shared/SingleImageUploader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { toast } from "sonner";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { addProduct } from "@/services/products/Products";

interface IProps {
  children: ReactNode;
  onProductAdded?: (product: any) => void;
}

const addProductSchema = z.object({
  name: z.string().min(1, { message: "Name must not be empty" }),
  category: z.string().min(1, { message: "Category must not be empty" }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be greater than 0",
  }),
  previousPrice: z.string().optional(),
  description: z.string().min(1, { message: "Description is required" }),
});

const AddProductDialog = ({ children, onProductAdded }: IProps) => {
  const [buttonDisable, setButtonDisable] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: "",
      category: "",
      price: "",
      previousPrice: "",
      description: "",
    },
  });

  const onSubmit = async (data: any) => {
    if (!image) {
      toast.error("Image is required");
      return;
    }

    setButtonDisable(true);
    const toastId = toast.loading("Adding product...");

    data.price = Number(data.price);
    if (data.previousPrice) {
      data.previousPrice = Number(data.previousPrice);
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("data", JSON.stringify(data));

    try {
      const res = await addProduct(formData);

      if (res.success) {
        toast.success("Product added successfully", { id: toastId });
        setOpen(false);
        form.reset();
        setImage(null);

        if (onProductAdded) onProductAdded(res.data);
      } else {
        toast.error(res.message, { id: toastId });
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setButtonDisable(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Form {...form}>
        <form
          id="add-product-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="overflow-auto"
        >
          <DialogTrigger asChild>{children}</DialogTrigger>

          <DialogContent className="max-h-[90vh] overflow-y-auto w-full">
            <DialogHeader>
              <DialogTitle>Add Product</DialogTitle>
              <DialogDescription>
                Add your product information and click save.
              </DialogDescription>
            </DialogHeader>

            <SingleImageUploader onChange={setImage} />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pb-1">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pb-1">Category</FormLabel>
                  <FormControl>
                    <Input placeholder="enter category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pb-1">Price</FormLabel>
                  <FormControl>
                    <Input placeholder="enter price" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="previousPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pb-1">Previous Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter previous price"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pb-1">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="enter product description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>

              <Button
                form="add-product-form"
                disabled={!image || buttonDisable}
                type="submit"
              >
                Save Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
};

export default AddProductDialog;
