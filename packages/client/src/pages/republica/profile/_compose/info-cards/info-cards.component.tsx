import { Card, CardSubtitle, CardTitle } from "@components";
import { getInfos } from "./info-cards.utils";
import { useGetRepublicaRouteData } from "@pages/republica/hooks";

export function InfoCards() {
  const { user } = useGetRepublicaRouteData();
  const infos = getInfos(user.classData);

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
