import { Button, Card, Input, PageTitle } from "@components";
import {
  ActionFunctionArgs,
  Form,
  Link,
  LoaderFunctionArgs,
  redirectDocument,
} from "react-router";
import { useGetRepublicaRouteData } from "../hooks";
import { editUser } from "@actions/user.server";
import invariant from "tiny-invariant";
import { RepublicaEditData } from "./types";
import { EditProfileAvatar } from "./_compose/edit-profile-avatar";

export const loader = ({ params }: LoaderFunctionArgs) => {
  return { params };
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  invariant(params.id, "User id not found");
  const formData = await request.formData();

  const dataToUpdate: RepublicaEditData = {
    name: formData.get("name")?.toString(),
    classData: {
      occupantsCount: Number(formData.get("occupantsCount")),
      rentalValue: formData.get("rentalValue")?.toString(),
    },
  };

  const editedUserResponse = await editUser(request, params.id, dataToUpdate);
  if (!editedUserResponse.ok) return new Error("Something went wrong");

  return redirectDocument(`/republica/${params.id}`);
};

export default function EditRepublica() {
  const { user } = useGetRepublicaRouteData();

  return (
    <div className="grid gap-8">
      <PageTitle title="Editar república" />

      <Card className="grid gap-10 items-center grid-cols-[0.3fr_1fr]">
        <EditProfileAvatar />
        <Form method="POST" className="grid gap-5 grid-rows-2 grid-cols-2">
          <Input
            defaultValue={user.name}
            placeholder={user.name}
            label="Nome"
            name="name"
            type="name"
            id="name"
            className="col-[1/-1]"
            minLength={3}
          />
          <Input
            defaultValue={user.classData.occupantsCount}
            placeholder={user.classData.occupantsCount.toString()}
            label="Quantidade de moradores"
            type="number"
            name="occupantsCount"
            id="occupantsCount"
            className="row-[2]"
            min={0}
          />
          <Input
            defaultValue={user.classData.rentalValue}
            placeholder={user.classData.rentalValue.toString()}
            label="Aluguel (R$)"
            type="number"
            name="rentalValue"
            id="rentalValue"
            className="row-[2]"
            min={0}
          />
        </Form>
      </Card>
      <div className="col-[1/-1] flex gap-4 justify-between">
        <Link to={`/republica/${user.id}`}>
          <Button style="secondary">Cancelar</Button>
        </Link>
        <Button type="submit">Salvar</Button>
      </div>
    </div>
  );
}
