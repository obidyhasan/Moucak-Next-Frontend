"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import logo from "@/assets/icons/logo-icon.svg";
import { toast } from "sonner";
import type { IErrorResponse } from "@/types/index";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { demoLogin, login } from "@/services/auth/login";

const loginSchema = z.object({
  email: z.email("Invalid Email."),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [buttonDisable, setButtonDisable] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const toastId = toast.loading("Sending otp...");
    setButtonDisable(true);

    try {
      const res = await login(data);

      if (res.success) {
        setButtonDisable(false);
        toast.success(res.message, { id: toastId });

        router.push(`/verify?email=${encodeURIComponent(data.email)}`);
      }
    } catch (err: unknown) {
      console.error(err);
      setButtonDisable(false);

      toast.error((err as IErrorResponse).message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  const handleDemoAdminLogin = async () => {
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGJkMGQxY2I3Mzk4ZTE1MDU0YjExMTMiLCJlbWFpbCI6Im9iaWR5aGFzYW5AZ21haWwuY29tIiwicm9sZSI6IlNVUEVSX0FETUlOIiwiaWF0IjoxNzY1NTA0MDgxLCJleHAiOjE3OTcwNjE2ODF9.I1ikRkqIkCCJY5Rt4KWCc1q6CxCvTRRIrrgDN1JeC9w";
    const refreshToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGJkMGQxY2I3Mzk4ZTE1MDU0YjExMTMiLCJlbWFpbCI6Im9iaWR5aGFzYW5AZ21haWwuY29tIiwicm9sZSI6IlNVUEVSX0FETUlOIiwiaWF0IjoxNzY1NTA0MDgxLCJleHAiOjE3OTcwNjE2ODF9.TQlraZV9TXhtS_yMOiQMmLdmNx7dhsjq9Ogm4pnocnM";

    const res = await demoLogin({ accessToken, refreshToken });

    if (res.success) {
      toast.success("Login Successfully");
      router.replace("/");
    }
  };

  const handleDemoUserLogin = async () => {
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGJkMGViZTVkMTAwMDdlMThjYjBhMDkiLCJlbWFpbCI6ImRldi5vYmlkeWhhc2FuQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzY1NTA0MzI0LCJleHAiOjE3OTcwNjE5MjR9.F-0bbVYleiUsn1CM6u8Oie1gR1tG5N_SQ6PoebR6aIY";
    const refreshToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGJkMGViZTVkMTAwMDdlMThjYjBhMDkiLCJlbWFpbCI6ImRldi5vYmlkeWhhc2FuQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzY1NTA0MzI0LCJleHAiOjE3OTcwNjE5MjR9.MGXHS9cScCR6loJPXR_JFAZVxtR4jCnW586ed147UHU";

    const res = await demoLogin({ accessToken, refreshToken });

    if (res.success) {
      toast.success("Login Successfully");
      router.replace("/");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 max-w-sm mx-auto">
        <CardContent className="p-0">
          <div className="p-6 md:p-8">
            <Link replace href={"/"}>
              <Image
                src={logo}
                alt="Logo"
                className="mx-auto mb-2 w-20"
                width={80}
                height={80}
              />
            </Link>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-xl font-semibold mt-2">Welcome Back</h1>
                <p className="text-muted-foreground text-[13px] mt-1">
                  {`Enter your email and we'll send you a verification code`}
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-1">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="john@example.com"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={buttonDisable}
                    className="w-full"
                  >
                    Continue
                  </Button>
                </form>
              </Form>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-5">
              <Button
                onClick={handleDemoAdminLogin}
                variant={"outline"}
                className="w-full"
              >
                Demo Admin
              </Button>
              <Button
                onClick={handleDemoUserLogin}
                variant={"outline"}
                className="w-full"
              >
                Demo User
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-muted-foreground text-center text-xs">
        By clicking continue, you agree to our{" "}
        <Link href="/">Terms of Service</Link> and{" "}
        <Link href="/">Privacy Policy</Link>.
      </div>
    </div>
  );
}
