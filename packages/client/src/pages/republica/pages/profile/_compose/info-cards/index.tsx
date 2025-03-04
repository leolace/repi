import { Card, CardSubtitle, CardTitle } from "@components";
import { getInfos } from "./utils";
import { useRepublicaProfileQuery } from "../../profile.queries";

export function InfoCards() {
  const { data: republica } = useRepublicaProfileQuery();
  if (!republica) return null;

  const infos = getInfos(republica.classData);

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
