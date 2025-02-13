import { Outlet } from "react-router";

export function Layout() {
  return (
    <section className="grid content-center mt-40">
      <Outlet />
    </section>
  );
};