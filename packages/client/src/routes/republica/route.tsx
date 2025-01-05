import { Outlet } from "@remix-run/react";

const Layout = () => {
  return (
    <section>
      <Outlet />
    </section>
  );
};

export default Layout;
