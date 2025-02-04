import { UserClassesEnum } from "common";
import { z } from "zod";

export const searchParamsUserSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  class: z.nativeEnum(UserClassesEnum).optional(),
});
