import { verifySession } from "@actions/auth.server";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, redirect } from "@remix-run/react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await verifySession(request);
  if (session) return redirect("/inicio");
  if (request.url.replaceAll("/", "").endsWith("auth"))
    return redirect("/auth/entrar");

  return null;
};

const Layout = () => {
  return (
    <section className="flex items-center self-center w-full">
      <Outlet />
    </section>
  );
};

export default Layout;
