import { UserClassesEnum } from "common";
import { z } from "zod";

export const createRepublicaSchema = z.object({
  userId: z.string(),
  class: z.literal(UserClassesEnum.REPUBLICA),
});

export type CreateRepublicaDto = z.infer<typeof createRepublicaSchema>;