export function formatRentalValue(value: string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value));
}

export function parseRentalValue(value: number) {
  const formatedValue = value.toLocaleString("pt-br", {
    maximumFractionDigits: 2,
  });
  return formatedValue;
}
