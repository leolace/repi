import { Republica } from "common";
import { RawRepublica } from "./republica.types";

export function unRawRepublicaData({
  occupants_count,
  posts_count,
  user_id,
  rental_value,
  ...data
}: RawRepublica) {
  const unraw: Republica = {
    ...data,
    userId: user_id,
    postsCount: posts_count,
    occupantsCount: occupants_count,
    rentalValue: rental_value,
  };

  return unraw;
}
