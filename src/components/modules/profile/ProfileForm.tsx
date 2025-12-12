/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { divisions, type IErrorResponse } from "@/types";
import { userSchema } from "@/zod/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { updateUser } from "../../../services/user/user";

const ProfileForm = ({ user }: { user: any }) => {
  const [open, setOpen] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      phone: "",
      division: "",
      address: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user?.name,
        phone: user?.phone,
        division: user?.division,
        address: user?.address,
      });
    }
  }, [user, form]);

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Updating user info...");
    setButtonDisable(true);
    try {
      const res = await updateUser({ id: user?._id, data });
      if (res.success) {
        toast.success("User info updated successfully", { id: toastId });
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(
        err?.data?.message ||
          (err as IErrorResponse).message ||
          "Something went wrong"
      );
    } finally {
      setButtonDisable(false);
    }
  };

  return (
    <div>
      {/* Dialog */}
      <div className="max-w-2xl mx-auto text-center">
        <Dialog open={open} onOpenChange={setOpen}>
          <form>
            <DialogTrigger asChild>
              <Button className="mt-5">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <Form {...form}>
                  <form
                    id="user-edit-form"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="pb-1">Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Jon Deo"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="sr-only">
                            This is your public display name.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="pb-1">Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="01XXX-XXXXXX"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="sr-only">
                            This is your public display email.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="division"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="pb-1">Division</FormLabel>
                          <FormControl className="">
                            <Select
                              defaultValue={user?.division}
                              onValueChange={field.onChange}
                              {...field.onBlur}
                              {...field.onChange}
                            >
                              <FormControl className="w-full">
                                <SelectTrigger>
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
                          </FormControl>
                          <FormDescription className="sr-only">
                            This is your public display email.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="pb-1">Address</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Delivery address"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="sr-only">
                            This is your public display email.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  disabled={buttonDisable}
                  form="user-edit-form"
                  type="submit"
                >
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>
    </div>
  );
};

export default ProfileForm;
