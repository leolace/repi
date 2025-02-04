import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type LoginUserDto = z.infer<typeof loginUserSchema>;