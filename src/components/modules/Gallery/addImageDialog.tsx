"use client"; // Required for hooks, state, and interactivity

import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
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
import { Form } from "@/components/ui/form";

import { addImage } from "@/services/gallery/gallery";
import type { IErrorResponse } from "@/types";
import SingleImageUploader from "@/components/shared/SingleImageUploader";

interface AddImageDialogProps {
  children: ReactNode;
  onAdded?: () => void;
}

const AddImageDialog = ({ children, onAdded }: AddImageDialogProps) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  const form = useForm();

  const onSubmit = async () => {
    if (!image) return;

    setButtonDisabled(true);
    const toastId = toast.loading("Adding image...");
    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await addImage(formData);

      if (res.success) {
        toast.success("Image added successfully", { id: toastId });
        setOpen(false);
        form.reset();
        setImage(null);
        if (onAdded) onAdded();
      } else {
        toast.error(res.message || "Something went wrong", { id: toastId });
      }
    } catch (err: unknown) {
      console.error(err);
      toast.error((err as IErrorResponse).message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      setButtonDisabled(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Form {...form}>
        <form
          id="add-gallery-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="overflow-auto"
        >
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto w-full">
            <DialogHeader>
              <DialogTitle>Add Image</DialogTitle>
              <DialogDescription>
                {` Upload an image. Click save when you're done.`}
              </DialogDescription>
            </DialogHeader>

            <SingleImageUploader onChange={setImage} />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                type="submit"
                form="add-gallery-form"
                disabled={!image || buttonDisabled}
              >
                Save Image
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
};

export default AddImageDialog;
