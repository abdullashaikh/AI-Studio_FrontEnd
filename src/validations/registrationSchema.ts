import { z } from "zod";

export const registrationSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters"),
  method: z.enum(["email", "phone"]),
  contact: z.string().refine((val) => {
    // email check
    if (val.includes("@")) {
      return /\S+@\S+\.\S+/.test(val);
    }
    // phone check
    return /^\+?\d{7,15}$/.test(val.replace(/\s+/g, ""));
  }, "Enter a valid email or phone"),
  password: z.string()
    .min(6, "Password must be at least 6 characters"),
});

export const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export type RegistrationSchemaType = z.infer<typeof registrationSchema>;