import { LoaderFunctionArgs } from "@remix-run/node";
import { RepHeader, InfoCards, Content } from "./_compose";
import { getUserById } from "@actions/user.server";
import { isErrorResponseData } from "@utils/is-error-response";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const userId = params.userId;
  if (!userId) throw new Error("User Id not found");

  const userByIdData = await getUserById(userId);
  if (isErrorResponseData(userByIdData)) throw new Error(userByIdData.error);
  
  const user = userByIdData[0];

  return { user };
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
