"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { Dot } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ⬇️ Import Next.js API function
import { verifyOtp } from "@/services/auth/login";

interface CheckoutOTPDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  onConfirm: (toastId: any) => void;
}

const formSchema = z.object({
  pin: z.string().min(6, {
    message: "Your OTP must be 6 digits.",
  }),
});

export function CheckoutOTPDialog({
  open,
  onOpenChange,
  email,
  onConfirm,
}: CheckoutOTPDialogProps) {
  const [buttonDisable, setButtonDisable] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setButtonDisable(true);

    const toastId = toast.loading("Verifying OTP...");

    const payload = {
      email,
      otp: data.pin,
    };

    const result = await verifyOtp(payload);

    if (!result.success) {
      toast.error(result.message || "Invalid OTP", { id: toastId });
      setButtonDisable(false);
      return;
    }

    toast.success("OTP verified successfully", { id: toastId });
    onOpenChange(false);

    // Processing order
    const orderToastId = toast.loading("Your order is processing...");
    onConfirm(orderToastId);

    setButtonDisable(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-sm">
        <DialogHeader>
          <DialogTitle className="text-center">Verify Email</DialogTitle>
          <DialogDescription className="text-center mt-3">
            Please enter the 6-digit code sent to <br />
            <span className="font-medium text-primary">{email}</span>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            id="otp-form"
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={1} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <Dot />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={4} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button
            className="mx-auto"
            form="otp-form"
            type="submit"
            disabled={buttonDisable}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
