import { z } from "zod";

export const CategoryZodSchema = z.object({
  name: z.string().min(1, "Veuillez entrer le nom du category !"),
});

export type CategoryZodType = z.infer<typeof CategoryZodSchema>;
