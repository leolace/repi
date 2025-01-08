import { Republica } from "common";

export function parseRentalValue(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value);
}

export function getInfos(republicaData: Republica) {
  const infos = [
    {
      label: "Aluguel",
      data: parseRentalValue(republicaData.rentalValue)
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
