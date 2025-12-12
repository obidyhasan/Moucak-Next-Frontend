/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { addCart } from "@/redux/features/cart/CartSlice";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const ProductCard = ({ product }: any) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addCart({
        id: product?._id,
        name: product?.name,
        price: product?.price,
        quantity: 1,
        image: product?.image,
      })
    );

    toast.success("Product added to cart");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="group rounded-sm relative overflow-hidden border border-muted flex flex-col h-full">
        <Link className="relative" href={`/products/${product?.slug}`}>
          <Image
            src={product?.image}
            alt={product?.name}
            className="h-40 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
            width={400}
            height={300}
          />

          {product?.previousPrice > 0 && (
            <div className="text-xs sm:text-sm px-3 py-0.5 bg-primary absolute top-0 right-0 rounded-tr-xs rounded-bl-xs">
              {Math.round(
                ((Number(product?.previousPrice) - Number(product?.price)) /
                  Number(product?.previousPrice)) *
                  100
              )}
              % OFF
            </div>
          )}
        </Link>

        <div className="relative bg-background p-3 flex flex-col flex-1">
          <Link
            href={`/product/${product?.slug}`}
            className="flex-1 flex flex-col"
          >
            <div className="text-center">
              <Badge
                variant="outline"
                className="text-xs rounded-full mx-auto w-max"
              >
                {product?.category}
              </Badge>
            </div>

            <h3 className="mt-2 text-sm sm:text-base font-semibold text-gray-900 text-center">
              {product?.name}
            </h3>

            <div className="flex gap-2 items-center justify-center mt-auto">
              {product?.previousPrice > 0 && (
                <p className="line-through text-xs sm:text-sm text-primary text-center">
                  Tk. {product?.previousPrice}
                </p>
              )}
              <p className="text-sm sm:text-base text-center">
                Tk. {product?.price}
              </p>
            </div>
          </Link>

          <div className="mt-4">
            <Button
              onClick={handleAddToCart}
              className="block text-center w-full rounded-sm bg-primary p-2 text-xs sm:text-sm font-medium transition hover:scale-103"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
