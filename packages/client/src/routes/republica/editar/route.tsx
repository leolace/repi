import { Button, Card, Input, PageTitle } from "@components";
import {
  ActionFunctionArgs,
  Form,
  Link,
  LoaderFunctionArgs,
  redirectDocument,
} from "react-router";
import { useGetRepublicaRouteData } from "../hooks";
import { editUser, uploadFile } from "@actions/user.server";
import invariant from "tiny-invariant";
import { RepublicaEditData } from "./types";
import { EditProfileAvatar } from "@components/edit-profile-avatar";
import { isErrorResponseData } from "@utils/is-error-response";

export const loader = ({ params }: LoaderFunctionArgs) => {
  return { params };
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  invariant(params.id, "User id not found");
  const formData = await request.formData();

  const file = formData.get("file") as File;

  const dataToUpdate: RepublicaEditData = {
    name: formData.get("name")?.toString(),
    classData: {
      occupantsCount: Number(formData.get("occupantsCount")),
      rentalValue: formData.get("rentalValue")?.toString(),
    },
  };

  if (file.name) dataToUpdate.avatarFilename = file.name;

  const editedUserResponse = await editUser(request, params.id, dataToUpdate);
  if (isErrorResponseData(editedUserResponse.data))
    return new Error("Something went wrong");

  if (editedUserResponse.data.presignedUrl)
    await uploadFile(editedUserResponse.data.presignedUrl, file);

  return redirectDocument(`/republica/${params.id}`);
};

export default function EditRepublica() {
  const { user } = useGetRepublicaRouteData();

  return (
    <Form method="POST" className="grid gap-8" encType="multipart/form-data">
      <PageTitle title="Editar república" />

      <Card className="grid gap-10 items-center grid-cols-[0.3fr_1fr]">
        <EditProfileAvatar user={user} />
        <div className="grid gap-5 grid-rows-2 grid-cols-2">
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
        </div>
      </Card>
      <div className="col-[1/-1] flex gap-4 justify-between">
        <Link to={`/republica/${user.id}`}>
          <Button style="secondary">Cancelar</Button>
        </Link>
        <Button type="submit">Salvar</Button>
      </div>
    </Form>
  );
}
