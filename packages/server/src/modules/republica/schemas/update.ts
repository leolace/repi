import { z } from "zod";

export const editRepublicaSchema = z.object({
  rentalValue: z.string().optional(),
  occupantsCount: z.number().optional(),
});

export type EditRepublicaDto = z.infer<typeof editRepublicaSchema>;