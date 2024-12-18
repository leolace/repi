import { z } from "zod";
import { TagEnum, UserClassesEnum } from "common";

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

export const loginUserSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type LoginUserDto = z.infer<typeof loginUserSchema>;

export const searchParamsUserSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  class: z.nativeEnum(UserClassesEnum).optional(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
