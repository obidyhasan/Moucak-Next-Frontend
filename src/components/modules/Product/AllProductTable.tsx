/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import DeleteAlertDialog from "@/components/shared/DeleteAlertDialog";
import { toast } from "sonner";

import { deleteProduct } from "@/services/products/Products";

interface Props {
  products: any[];
  setProducts: React.Dispatch<React.SetStateAction<any[]>>;
}
export default function AllProductTable({ products, setProducts }: Props) {
  const handleProductDelete = async (id: string) => {
    const toastId = toast.loading("Deleting product...");

    const res: any = await deleteProduct(id);

    if (res?.success) {
      toast.success("Product deleted successfully", { id: toastId });
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } else {
      toast.error(res?.message || "Something went wrong", { id: toastId });
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Previous Price</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                No products found.
              </TableCell>
            </TableRow>
          )}

          {products.map((product: any, idx: number) => (
            <TableRow key={idx}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Image
                    src={product?.image}
                    alt={product?.name}
                    width={50}
                    height={50}
                    className="rounded-sm w-12 h-12 object-cover"
                  />
                  <div>
                    <div className="font-medium">{product?.name}</div>
                    <span className="text-muted-foreground text-xs">
                      {product.category}
                    </span>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                {product?.status === "ACTIVE" && (
                  <Badge className="text-xs rounded-full w-max">ACTIVE</Badge>
                )}
                {product?.status === "INACTIVE" && (
                  <Badge variant="outline" className="text-xs rounded-full">
                    INACTIVE
                  </Badge>
                )}
                {product?.status === "STOCK_OUT" && (
                  <Badge variant="destructive" className="text-xs rounded-full">
                    STOCK OUT
                  </Badge>
                )}
              </TableCell>

              <TableCell>Tk. {product?.price}</TableCell>
              <TableCell>Tk. {product?.previousPrice}</TableCell>

              <TableCell className="text-right flex gap-2 justify-end">
                <Button variant="outline" size="icon" asChild>
                  <Link href={`/admin/products/${product?.slug}`}>
                    <Pencil />
                  </Link>
                </Button>

                <DeleteAlertDialog
                  onConfirm={() => handleProductDelete(product?._id)}
                >
                  <Button size="icon">
                    <Trash2 />
                  </Button>
                </DeleteAlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
