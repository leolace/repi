import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const loader = ({ request }: LoaderFunctionArgs) => {
  if (request.url.replaceAll("/", "").endsWith("republica"))
    return redirect("/inicio");

  return null;
};

const Layout = () => {
  return (
    <section>
      <Outlet />
    </section>
  );
};

export default Layout;
