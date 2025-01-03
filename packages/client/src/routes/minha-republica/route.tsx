import { requireClass } from "@actions/auth.server";
import { getSelf } from "@actions/user.server";
import { Button } from "@components";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { UserClassesEnum } from "common";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireClass(request, UserClassesEnum.REPUBLICA);

  const user = await getSelf(request);

  return { user };
};

export default function Page() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <div>
      <header>
        <div>
          {user?.name}
          São Carlos - SP
        </div>
        <div>
          <Button>Editar</Button>
        </div>
      </header>
    </div>
  );
}
