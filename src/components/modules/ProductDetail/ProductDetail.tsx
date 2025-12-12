"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProductCard from "../Product/ProductCard";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { addCart } from "@/redux/features/cart/CartSlice";
import { setBuyNow } from "@/redux/features/buyNow/buyNowSlice";

const ProductDetail = ({
  slug,
  product,
  allProducts,
}: {
  slug: string;
  product: any;
  allProducts: any[];
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);

  const products = allProducts?.filter(
    (item: any) => item.slug !== slug && item?.status === "ACTIVE"
  );

  const handleAddToCart = () => {
    dispatch(
      addCart({
        id: product?._id,
        name: product?.name,
        price: product?.price,
        quantity,
        image: product?.image,
      })
    );

    toast.success("Product added to cart");
  };

  const handleBuyNow = () => {
    dispatch(
      setBuyNow({
        id: product?._id,
        name: product?.name,
        price: product?.price,
        quantity,
        image: product?.image,
      })
    );

    router.push("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 sm:py-10">
      <div className="flex gap-5 md:flex-row flex-col">
        {/* Product Image */}
        <section className="w-full md:w-1/2">
          <figure>
            <Image
              src={product?.image || ""}
              alt={product?.name || "Product Image"}
              width={600}
              height={600}
              className="w-full object-cover rounded-lg"
            />
          </figure>
        </section>

        {/* Product Info */}
        <section className="w-full sm:w-1/2 space-y-3">
          <div>
            <Badge variant="outline" className="text-xs rounded-full w-max">
              {product?.category}
            </Badge>
          </div>

          <h3 className="text-xl font-semibold text-gray-900">
            {product?.name}
          </h3>

          <p className="text-lg font-semibold text-gray-700">
            Tk. {product?.price}
          </p>

          {/* Quantity */}
          <div className="flex gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setQuantity(quantity - 1)}
                size="icon"
                variant="outline"
                disabled={quantity <= 1}
              >
                <FiMinus />
              </Button>

              <p>{quantity}</p>

              <Button
                onClick={() => setQuantity(quantity + 1)}
                size="sm"
                variant="outline"
              >
                <FiPlus />
              </Button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={handleAddToCart}
              className="rounded-sm px-4 text-sm hover:scale-105"
            >
              <FiShoppingCart /> Add to Cart
            </Button>

            <Button
              variant="default"
              onClick={handleBuyNow}
              className="rounded-sm px-4 text-sm hover:scale-105"
            >
              Buy Now
            </Button>
          </div>

          {/* Description */}
          <div>
            <h1 className="font-medium text-lg border-b pb-2 mt-2">
              Description
            </h1>
            <p className="my-4 text-justify leading-relaxed">
              {product?.description}
            </p>
          </div>
        </section>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h1 className="text-lg font-semibold border-b pb-2">
          You may also like
        </h1>
        <section className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
          {products?.map((item: any, idx: number) => (
            <ProductCard key={idx} product={item} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
