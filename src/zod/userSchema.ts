import z from "zod";

export const userSchema = z.object({
  name: z
    .string("Name field required")
    .min(1, { message: "Name must be at least 1 characters" }),
  phone: z
    .string("Phone number must be string")
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone number must be valid for Bangladesh, Format: +8801XXXXXXXXX",
    }),
  division: z
    .string("Division field required")
    .min(2, { message: "Division field required" }),
  address: z
    .string("Address field required")
    .min(5, { message: "Address must be at least 5 characters" }),
});
