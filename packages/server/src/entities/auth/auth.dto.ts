import { z } from "zod";
import { UserClassesEnum } from "common";

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

export interface Session {
  id: string;
  userId: string;
  token: string;
}