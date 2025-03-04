import { editRepublicaSchema } from "@modules/republica/schemas/update";
import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório").optional(),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .optional(),
  classData: editRepublicaSchema.optional(),
  imageUrl: z.string().optional(),
});

export type EditUserDto = z.infer<typeof updateUserSchema>;
