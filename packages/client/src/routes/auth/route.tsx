import { verifySession } from "../../actions/auth.server";
import { LoaderFunctionArgs } from "react-router";
import { Outlet, redirect } from "react-router";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await verifySession(request);
  if (session) return redirect("/inicio");
  if (request.url.replaceAll("/", "").endsWith("auth"))
    return redirect("/auth/entrar");

  return null;
};

const Layout = () => {
  return (
    <section className="grid content-center mt-40">
      <Outlet />
    </section>
  );
};

export default Layout;
