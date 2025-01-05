import { UserClassesEnum } from "common";
import { z } from "zod";

export const createRepublicaSchema = z.object({
  userId: z.string(),
  class: z.literal(UserClassesEnum.REPUBLICA),
});

export type CreateRepublicaDto = z.infer<typeof createRepublicaSchema>;

export const editRepublicaSchema = z.object({
  imageUrl: z.string().optional(),
  rentalValue: z.number().optional(),
  occupantsCount: z.number().optional(),
});

export type EditRepublicaDto = z.infer<typeof editRepublicaSchema>;
