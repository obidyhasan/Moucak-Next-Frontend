"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FiShoppingCart } from "react-icons/fi";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import { selectCarts } from "@/redux/features/cart/CartSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CartSidebar() {
  const router = useRouter();
  const [openSheet, setOpenSheet] = useState(false);

  const carts = useSelector(selectCarts);

  // calculate total price
  const totalPrice = carts.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckoutButton = () => {
    setOpenSheet(false);
    router.push("/checkout");
  };

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetTrigger asChild>
        <div className="relative cursor-pointer">
          <div className="p-2 hover:text-primary transition h-auto rounded-full">
            <FiShoppingCart className="w-5 h-5" />
          </div>

          {/* Cart Count */}
          <Badge className="rounded-full w-5 h-5 absolute -top-0.5 left-full text-xs -translate-x-3.5 px-1">
            {carts.length}
          </Badge>
        </div>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            Review items in your shopping cart.
          </SheetDescription>
        </SheetHeader>

        <div className="overflow-auto">
          {carts.length ? (
            carts.map((item) => <CartItem key={item?.id} item={item} />)
          ) : (
            <p className="border border-dashed m-4 text-center py-20">
              Cart is empty
            </p>
          )}
        </div>

        <SheetFooter>
          <div className="flex justify-between items-center font-semibold">
            <span>Total</span> <span>Tk. {totalPrice}</span>
          </div>
          <Button
            disabled={carts?.length === 0}
            onClick={handleCheckoutButton}
            type="submit"
          >
            Checkout
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
