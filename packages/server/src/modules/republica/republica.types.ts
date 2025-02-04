import { Republica } from "common";

export type RepublicaEdit = Partial<
  Pick<Republica, "rentalValue" | "occupantsCount">
>;
