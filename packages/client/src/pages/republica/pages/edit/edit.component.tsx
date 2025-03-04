import { Button, Card, Input, PageTitle } from "@components";
import { Link } from "react-router";
import { EditProfileAvatar } from "./_compose/edit-profile-avatar";
import { useRepublicaProfileQuery } from "../profile/profile.queries";

export function RepublicaEdit() {
  const { data: republica } = useRepublicaProfileQuery();

  if (!republica) return;
  return (
    <div className="grid gap-8">
      <PageTitle title="Editar república" />

      <Card className="grid gap-10 items-center grid-cols-[0.3fr_1fr]">
        <EditProfileAvatar />
        <form className="grid gap-5 grid-rows-2 grid-cols-2">
          <Input
            defaultValue={republica.name}
            placeholder={republica.name}
            label="Nome"
            name="name"
            type="name"
            id="name"
            className="col-[1/-1]"
            minLength={3}
          />
          <Input
            defaultValue={republica.classData.occupantsCount}
            placeholder={republica.classData.occupantsCount.toString()}
            label="Quantidade de moradores"
            type="number"
            name="occupantsCount"
            id="occupantsCount"
            className="row-[2]"
            min={0}
          />
          <Input
            defaultValue={republica.classData.rentalValue}
            placeholder={republica.classData.rentalValue.toString()}
            label="Aluguel (R$)"
            type="number"
            name="rentalValue"
            id="rentalValue"
            className="row-[2]"
            min={0}
          />
        </form>
      </Card>
      <div className="col-[1/-1] flex gap-4 justify-between">
        <Link to={`/republica/${republica.id}`}>
          <Button style="secondary">Cancelar</Button>
        </Link>
        <Button type="submit">Salvar</Button>
      </div>
    </div>
  );
}
