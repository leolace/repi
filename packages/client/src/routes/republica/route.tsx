import { LoaderFunctionArgs, redirect } from "react-router";
import { Outlet } from "react-router";

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
