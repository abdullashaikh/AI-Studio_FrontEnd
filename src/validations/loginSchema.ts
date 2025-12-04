// src/validations/loginSchema.ts
import { z } from "zod";

export const loginSchema = z.object({
  method: z.enum(["email", "phone"]),
  email: z.string().optional(),
  phone: z.string().optional(),
  password: z.string().min(1, "Password is required"),
})
.refine((data) => {
  if (data.method === "email" && !data.email) return false;
  if (data.method === "phone" && !data.phone) return false;
  return true;
}, {
  message: "Please enter a valid email or phone",
  path: ["email"], // generic error placement
});
export type LoginSchemaType = z.infer<typeof loginSchema>;
