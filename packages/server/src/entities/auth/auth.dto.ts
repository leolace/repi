import { z } from "zod";
import { UserClassesEnum } from "common";

export const createUserSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  class: z.nativeEnum(UserClassesEnum),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
	tags: z.string().array().optional(),
});

export const searchParamsUserSchema = z.object({
	id: z.string().optional(),
	name: z.string().optional(),
	email: z.string().optional(),
	class: z.nativeEnum(UserClassesEnum).optional(),
})

export type CreateUserDto = z.infer<typeof createUserSchema>;
