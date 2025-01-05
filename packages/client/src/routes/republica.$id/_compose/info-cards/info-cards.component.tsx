import { Card, CardSubtitle, CardTitle } from "@components";
import { useGetRepublicaRouteData } from "@routes/republica.$id/hooks";
import { getInfos } from "./info-cards.utils";

export function InfoCards() {
  const { republica } = useGetRepublicaRouteData();
  const infos = getInfos(republica);

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
