import { Button, Card, Input, PageTitle } from "@components";
import { Link, useNavigate } from "react-router";
import { EditProfileAvatar } from "./_compose/edit-profile-avatar";
import { useRepublicaProfileQuery } from "../profile/profile.queries";
import { useForm } from "react-hook-form";
import { RepublicaEditForm } from "./edit.types";
import { useUpdateRepublica } from "./edit.queries";
import { useSession } from "@contexts/session";

export function RepublicaEdit() {
  const { refetchUser } = useSession();
  const { data: republica } = useRepublicaProfileQuery();
  const { mutate } = useUpdateRepublica();
  const { register, handleSubmit } = useForm<RepublicaEditForm>();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(({ occupantsCount, ...data }) => {
    mutate(
      {
        occupantsCount: Number(occupantsCount),
        ...data,
      },
      {
        onSuccess: async () => {
          await refetchUser();
          navigate(`/republica/${republica?.id}`);
        },
      },
    );
  });

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
            type="name"
            id="name"
            className="col-[1/-1]"
            minLength={3}
            {...register("name")}
          />
          <Input
            defaultValue={republica.classData.occupantsCount}
            placeholder={republica.classData.occupantsCount.toString()}
            label="Quantidade de moradores"
            type="number"
            id="occupantsCount"
            className="row-[2]"
            min={0}
            {...register("occupantsCount")}
          />
          <Input
            defaultValue={republica.classData.rentalValue}
            placeholder={republica.classData.rentalValue.toString()}
            label="Aluguel (R$)"
            type="number"
            id="rentalValue"
            className="row-[2]"
            min={0}
            {...register("rentalValue")}
          />
        </form>
      </Card>
      <div className="col-[1/-1] flex gap-4 justify-between">
        <Link to={`/republica/${republica.id}`}>
          <Button style="secondary">Cancelar</Button>
        </Link>
        <Button type="submit" onClick={onSubmit}>
          Salvar
        </Button>
      </div>
    </div>
  );
}
