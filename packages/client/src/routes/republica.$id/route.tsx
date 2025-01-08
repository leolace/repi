import { LoaderFunctionArgs } from "@remix-run/node";
import { RepHeader, InfoCards, Content } from "./_compose";
import { getRepublicaByUser, getUserById } from "@actions/user.server";
import { isErrorResponseData } from "@utils/is-error-response";
import { verifySession } from "@actions/auth.server";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const userId = params.id;
  if (!userId) throw new Error("User Id not found");

  const userByIdData = await getUserById(userId);
  if (isErrorResponseData(userByIdData)) throw new Error(userByIdData.error);

  const user = userByIdData[0];

  const republica = await getRepublicaByUser(user.id);
  if (isErrorResponseData(republica)) throw new Error(republica.error);

  const session = await verifySession(request);
  let isOwnerUser = false;

  if (session?.userId === userId) isOwnerUser = true;

  return { user, republica, isOwnerUser };
};

export default function Page() {
  return (
    <section className="grid gap-16">
      <RepHeader />
      <InfoCards />
      <Content />
    </section>
  );
}
