import { Republica, UserClassesEnum } from "common";

export interface RawRepublica {
  id: string;
  user_id: string;
  class: UserClassesEnum.REPUBLICA;
  rental_value: string;
  occupants_count: number;
  posts_count: number;
}

export type RepublicaEdit = Partial<
  Pick<Republica, "rentalValue" | "occupantsCount">
>;
