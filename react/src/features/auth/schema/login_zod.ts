import * as z from "zod";

export const loginZodSchema = z.object({
  email: z
    .string()
    .min(1, "L'adresse email est obligatoire !")
    .email("Entrer un email valide !"),
  password: z.string().min(1, "Le mot de passe est obligatoire !"),
});

export type loginZodType = z.infer<typeof loginZodSchema>;
