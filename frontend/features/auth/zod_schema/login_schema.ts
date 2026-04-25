import { z } from "zod";

export const UserLoginZodSchema = z.object({
  email: z
    .string()
    .min(1, "This field is required !")
    .email("Enter an email valid"),
  password: z.string().min(1, "This field is required !"),
});
export type UserLoginZodType = z.infer<typeof UserLoginZodSchema>;
