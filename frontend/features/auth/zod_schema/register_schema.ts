import { z } from "zod";

export const UserRegisterZodSchema = z
  .object({
    username: z.string().min(1, "This field is required !"),
    email: z
      .string()
      .min(1, "This field is required !")
      .email("Enter an email valid !"),
    password: z.string().min(8, "Enter minimum 8 characters !"),
    confirmPassword: z.string().min(1, "This field is required !"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match !",
    path: ["confirmPassword"],
  });

export type UserRegisterZodType = z.infer<typeof UserRegisterZodSchema>;
