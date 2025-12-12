/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // Required for hooks, state, form handling

import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "sonner";

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

import { addFaq } from "@/services/faq/faqs";

interface IProps {
  children: ReactNode;
  onSuccess?: () => void;
}

const faqSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

const AddFAQDialog = ({ children, onSuccess }: IProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof faqSchema>>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof faqSchema>) => {
    setLoading(true);
    const toastId = toast.loading("Adding FAQ...");
    try {
      const res = await addFaq(data);
      if (res.success) {
        toast.success("FAQ added successfully", { id: toastId });
        form.reset();
        setOpen(false);
        if (onSuccess) onSuccess();
      } else {
        toast.error(res.message || "Something went wrong", { id: toastId });
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Something went wrong while adding FAQ", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Form {...form}>
        <form
          id="add-faq-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="overflow-auto"
        >
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto w-full">
            <DialogHeader>
              <DialogTitle>Add FAQ</DialogTitle>
              <DialogDescription>
                {`Add a new FAQ here. Click save when you're done.`}
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-1">Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter FAQ title" {...field} />
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
                  <FormLabel className="mb-1">Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter FAQ description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button disabled={loading} form="add-faq-form" type="submit">
                {loading ? "Saving..." : "Save FAQ"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
};

export default AddFAQDialog;
