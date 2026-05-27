import * as z from "zod";

export const registerZodSchema = z
  .object({
    username: z.string().min(1, "Le pseudo est obligatoire !"),
    email: z
      .string()
      .min(1, "L'adresse email est obligatoire !")
      .email("Entrer un email valide !"),
    password: z.string().min(1, "Le mot de passe est obligatoire !"),
    confirmPassword: z
      .string()
      .min(1, "Veuillez confirmer votre mot de passe !"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "les mots de passes ne correspondent pas !",
    path: ["confirmPassword"],
  });

export type registerZodType = z.infer<typeof registerZodSchema>;
