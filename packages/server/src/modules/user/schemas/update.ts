import { editRepublicaSchema } from "@modules/republica/schemas/update";
import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório").optional(),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .optional(),
  avatarFilename: z.string().optional(),
  classData: editRepublicaSchema.optional(),
});

export type EditUserDto = z.infer<typeof updateUserSchema>;
