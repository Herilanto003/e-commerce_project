import { z } from "zod";

export const ProductZodSchema = z.object({
  name: z.string().min(1, "Veuillez entrer le nom du produit !"),

  description: z.string().min(1, "Veuillez renseigner la description !"),

  stock_qty: z
    .number({ error: "Le stock doit être un nombre" })
    .min(0, "Le stock ne peut pas être négatif"),

  unit_price: z
    .number({ error: "Le prix doit être un nombre" })
    .min(0, "Le prix ne peut pas être négatif"),

  category_id: z
    .string({ error: "Veuillez sélectionner une catégorie" })
    .min(1, "Veuillez sélectionner une catégorie"),
});

export type ProductZodType = z.infer<typeof ProductZodSchema>;
