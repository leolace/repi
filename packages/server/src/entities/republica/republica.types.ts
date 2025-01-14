import { UserClassesEnum } from "common";

export interface RawRepublica {
  user_id: string;
  class: UserClassesEnum.REPUBLICA;
  rental_value: string;
  occupants_count: number;
  posts_count: number;
}

export type RawRepublicaEdit = Partial<
  Pick<RawRepublica, "rental_value" | "occupants_count">
>;
