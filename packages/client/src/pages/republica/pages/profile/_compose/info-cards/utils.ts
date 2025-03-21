import { formatRentalValue } from "@utils/currency";
import { Republica } from "common";

export function getInfos(republicaData: Republica) {
  const infos = [
    {
      label: "Aluguel",
      data: formatRentalValue(republicaData.rentalValue)
    },
    {
      label: "Moradores",
      data: republicaData.occupantsCount
    },
    {
      label: "Publicações",
      data: republicaData.postsCount
    }
  ];

  return infos;
}
