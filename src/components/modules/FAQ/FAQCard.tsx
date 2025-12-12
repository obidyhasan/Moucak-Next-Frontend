/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import DeleteAlertDialog from "@/components/shared/DeleteAlertDialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { deleteFaq } from "@/services/faq/faqs";

interface FAQCardProps {
  faq: {
    _id: string;
    title: string;
    description: string;
  };
  onDeleted?: () => void;
}

const FAQCard = ({ faq, onDeleted }: FAQCardProps) => {
  const [loading, setLoading] = useState(false);

  const handleFaqDelete = async (id: string) => {
    const toastId = toast.loading("Deleting FAQ...");
    setLoading(true);

    try {
      const res = await deleteFaq(id);
      if (res.success) {
        toast.success("FAQ deleted successfully", { id: toastId });
        if (onDeleted) onDeleted();
      } else {
        toast.error(res.message || "Something went wrong", { id: toastId });
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Something went wrong while deleting FAQ", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative border rounded-sm p-4">
      <div>
        <h1 className="font-medium">{faq.title}</h1>
        <p className="text-sm mt-4">{faq.description}</p>
      </div>

      <DeleteAlertDialog onConfirm={() => handleFaqDelete(faq._id)}>
        <Button
          disabled={loading}
          variant="outline"
          size="icon"
          className="absolute top-2 p-2 right-2"
        >
          <Trash2 />
        </Button>
      </DeleteAlertDialog>
    </div>
  );
};

export default FAQCard;
