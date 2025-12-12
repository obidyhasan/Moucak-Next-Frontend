"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { deleteImage } from "@/services/gallery/gallery";
import DeleteAlertDialog from "@/components/shared/DeleteAlertDialog";
import Image from "next/image";

interface ImageCardProps {
  gallery: {
    _id: string;
    image: string;
  };
  onDeleted?: () => void;
}

const ImageCard = ({ gallery, onDeleted }: ImageCardProps) => {
  const [loading, setLoading] = useState(false);

  const handleImageDelete = async (id: string) => {
    const toastId = toast.loading("Deleting image...");
    setLoading(true);

    try {
      const res = await deleteImage(id);
      if (res.success) {
        toast.success("Image deleted successfully", { id: toastId });
        if (onDeleted) onDeleted();
      } else {
        toast.error(res.message || "Something went wrong", { id: toastId });
      }
    } catch (err: unknown) {
      console.error(err);
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <Image
        src={gallery.image}
        alt=""
        width={400}
        height={320}
        className="w-full h-80 object-cover rounded-md"
      />
      <DeleteAlertDialog onConfirm={() => handleImageDelete(gallery._id)}>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-2 p-2 right-2"
          disabled={loading}
        >
          <Trash2 />
        </Button>
      </DeleteAlertDialog>
    </div>
  );
};

export default ImageCard;
