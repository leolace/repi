import { UserClassesEnum } from "common";

export interface RawRepublica {
  user_id: string;
  class: UserClassesEnum.REPUBLICA;
  image_url?: string;
  rental_value: number;
  occupants_count: number;
  posts_count: number;
}

export type RawRepublicaEdit = Partial<
  Pick<RawRepublica, "image_url" | "rental_value" | "occupants_count">
>;
