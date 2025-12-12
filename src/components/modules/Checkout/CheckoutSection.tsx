/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useRouter } from "next/navigation";
import CheckoutItemCard from "@/components/modules/Checkout/CheckoutItemCard";
import { CheckoutOTPDialog } from "@/components/modules/Checkout/CheckoutOTPDialog";
import { OrderConfirmDialog } from "@/components/modules/Checkout/OrderConfirmDialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { login } from "@/services/auth/login";
import { getUser, updateUser } from "@/services/user/user";
import { addCart } from "@/services/cart/carts";
import { addOrder } from "@/services/order/order";
import { toast } from "sonner";
import { divisions, type IErrorResponse } from "@/types";
import SectionHeader from "@/components/shared/SectionHeader";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, selectCarts } from "@/redux/features/cart/CartSlice";
import { clearBuyNow, selectBuyNow } from "@/redux/features/buyNow/buyNowSlice";

const userSchema = z.object({
  name: z.string().min(1, "Name must be at least 1 characters"),
  email: z.string().email("Invalid Email"),
  phone: z
    .string()
    .regex(
      /^(?:\+8801\d{9}|01\d{9})$/,
      "Phone number must be valid for Bangladesh"
    ),
  division: z.string().min(2, "Division field required"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

const Checkout = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const carts = useSelector(selectCarts);
  const buyNow = useSelector(selectBuyNow);

  const [userInfo, setUserInfo] = useState<any>(null);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [shippingCost, setShippingCost] = useState(60);
  const [shippingStyle, setShippingStyle] = useState(
    "text-primary flex items-center justify-between gap-5 text-base font-medium"
  );

  const [openOTP, setOpenOTP] = useState(false);
  const [orderConfirmOpen, setOrderConfirmOpen] = useState(false);
  const [emailForOTP, setEmailForOTP] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);

  const isBuyNowFlag = !!buyNow?.id;

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      division: "",
      address: "",
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUser();
      if (res.success) setUserInfo(res.data);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (userInfo) {
      form.reset({
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
        division: userInfo.division,
        address: userInfo.address,
      });
    }
  }, [userInfo, form]);

  const cartItems = useMemo(() => (Array.isArray(carts) ? carts : []), [carts]);

  useEffect(() => {
    if (!isOrderComplete && !isBuyNowFlag && cartItems.length === 0) {
      router.replace("/");
    }
  }, [carts, isBuyNowFlag, isOrderComplete, router, cartItems.length]);

  useEffect(() => {
    const freeShipping =
      (isBuyNowFlag && buyNow?.quantity > 1) ||
      (!isBuyNowFlag &&
        (cartItems.length > 1 ||
          (cartItems.length === 1 && cartItems[0].quantity > 1)));

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShippingCost(freeShipping ? 0 : 60);

    setShippingStyle(
      freeShipping
        ? "text-primary flex items-center justify-between gap-5 text-base font-medium"
        : "flex items-center justify-between gap-5 text-base font-medium"
    );
  }, [carts, buyNow, isBuyNowFlag, cartItems]);

  const totalPrice = isBuyNowFlag
    ? Number(buyNow?.quantity ?? 0) * Number(buyNow?.price ?? 0)
    : cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleConfirmOrder = async (toastId?: any) => {
    try {
      const cartIds: string[] = [];

      if (isBuyNowFlag) {
        const res = await addCart({
          product: buyNow.id,
          quantity: buyNow.quantity,
        });
        cartIds.push(res?.data?._id);
      } else {
        for (const item of carts) {
          const res = await addCart({
            product: item.id,
            quantity: item.quantity,
          });
          cartIds.push(res?.data?._id);
        }
      }

      const orderResult = await addOrder({ carts: cartIds, shippingCost });
      if (orderResult.success) {
        toast.success("Your Order is Confirmed", { id: toastId });
        dispatch(clearCart());
        dispatch(clearBuyNow());
        setOrderConfirmOpen(true);
        setIsOrderComplete(true);
      }
    } catch (err: unknown) {
      toast.error((err as IErrorResponse)?.message || "Something went wrong", {
        id: toastId,
      });
    }
    setButtonDisable(false);
  };

  const onSubmit = async (data: z.infer<typeof userSchema>) => {
    setButtonDisable(true);

    if (userInfo?.email) {
      const toastId = toast.loading("Your Order is processing...");
      const res = await updateUser({ id: userInfo._id, data });

      if (res.success) handleConfirmOrder(toastId);
      else toast.error(res.message, { id: toastId });
    } else {
      const toastId = toast.loading("Sending OTP...");
      const res = await login(data);

      if (res.success) {
        toast.success(res.message, { id: toastId });
        setEmailForOTP(data.email);
        setOpenOTP(true);
      } else {
        toast.error(res.message, { id: toastId });
        setButtonDisable(false);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <section className="mt-10 mb-12">
        <SectionHeader
          title="Checkout Details"
          subTitle="Find the perfect fit for every occasion – Men, Women, Kids, and Accessories."
        />
      </section>

      <div className="flex gap-5 flex-col md:flex-row my-5">
        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 h-min">
          <h2 className="text-lg font-semibold mb-5">Shipping Details</h2>

          <Form {...form}>
            <form
              id="confirm-order-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
            >
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="pb-1">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jon Deo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="pb-1">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="jon@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="pb-1">Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="01XXX-XXXXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Division */}
              <FormField
                control={form.control}
                name="division"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="pb-1 ">Division</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select your Division" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {divisions.map((division, idx) => (
                          <SelectItem key={idx} value={division}>
                            {division}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="pb-1">Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Delivery address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <CheckoutOTPDialog
          open={openOTP}
          onOpenChange={setOpenOTP}
          email={emailForOTP}
          onConfirm={handleConfirmOrder}
        />

        <OrderConfirmDialog open={orderConfirmOpen} />

        {/* RIGHT SIDE - ORDER SUMMARY */}
        <div className="w-full md:w-1/2 border h-min p-4">
          <h2 className="text-lg font-semibold">Your Order</h2>

          <div className="flex flex-col gap-3 mt-4">
            {isBuyNowFlag ? (
              <CheckoutItemCard key={buyNow.id} item={buyNow} />
            ) : (
              cartItems.map((item) => (
                <CheckoutItemCard key={item.id} item={item} />
              ))
            )}

            <div className="flex justify-between font-medium">
              <p>Subtotal</p>
              <p>৳ {totalPrice}</p>
            </div>

            <div className={shippingStyle}>
              <p>Delivery Charges</p>
              <p>{shippingCost === 0 ? "Free" : `৳ ${shippingCost}`}</p>
            </div>

            <hr />

            <div className="flex justify-between font-medium">
              <p>Total</p>
              <p>৳ {totalPrice + shippingCost}</p>
            </div>

            <div className="my-4 space-y-2">
              <h2 className="font-semibold">Cash on delivery</h2>
              <p className="text-xs text-gray-600">
                সর্বোচ্চ ৪-৫ দিন (ঢাকায়) এবং ৫-৭ দিন (ঢাকার বাহিরে) সময়ের মধ্যে
                হোম ডেলিভারী করা হয়।
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                checked={checkbox}
                onCheckedChange={(v) => setCheckbox(!!v)}
              />
              <span className="font-semibold text-xs">
                I have read and agree to the website Terms and conditions *
              </span>
            </div>

            <Button
              disabled={!checkbox || buttonDisable}
              form="confirm-order-form"
              className="w-full my-4"
            >
              Confirm Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
