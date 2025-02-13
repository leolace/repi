import { verifySession } from "@actions/auth.server";
import { getCompleteUserById } from "@actions/user.server";
import { isErrorResponseData } from "@utils/is-error-response";
import { LoaderFunctionArgs, redirect } from "react-router";
import { Outlet } from "react-router";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  if (request.url.replaceAll("/", "").endsWith("republica"))
    return redirect("/inicio");

  const userId = params.id;
  if (!userId) throw new Error("User Id not found");

  const user = await getCompleteUserById(userId);
  if (isErrorResponseData(user)) throw new Error(user.error);

  const session = await verifySession(request);
  let isOwnerUser = false;

  if (session?.userId === userId) isOwnerUser = true;

  return { user, isOwnerUser };
};

const Layout = () => {
  return (
    <section>
      <Outlet />
    </section>
  );
};

export default Layout;
