import { Card, CardSubtitle, CardTitle } from "@components";
import { useGetRootData } from "@hooks/use-get-root-data";

export function InfoCards() {
  const { user } = useGetRootData();

  const infos = [
    {
      label: "Aluguel",
      data: "R$ 500,00",
    },
    {
      label: "Moradores",
      data: "8",
    },
    {
      label: "Publicações",
      data: "7",
    },
  ];

  return (
    <div className="flex justify-between gap-6">
      {infos.map(({ data, label }) => (
        <Card className="flex-1" key={label}>
          <CardSubtitle>{data}</CardSubtitle>
          <CardTitle>{label}</CardTitle>
        </Card>
      ))}
    </div>
  );
}
