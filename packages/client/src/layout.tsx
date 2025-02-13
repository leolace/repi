import { Header } from "@interfaces";
import { Outlet } from "react-router";

export function Layout() {
  return (
    <div className="max-w-[60rem] ml-auto mr-auto w-full flex flex-col gap-12">
      <Header />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
}
