import { TagEnum, UserClassesEnum } from "common";
import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  class: z.nativeEnum(UserClassesEnum),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  tags: z
    .enum<TagEnum, [TagEnum]>(Object.keys(TagEnum) as [TagEnum])
    .array()
    .optional(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
