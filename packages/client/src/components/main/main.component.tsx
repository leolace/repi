import { useSession } from "@contexts/session.context";
import { Header } from "@interfaces";
import { CompleteSelfUser } from "common";
import { useEffect } from "react";
import { Outlet } from "react-router";

export function Main({ user }: { user: CompleteSelfUser | null }) {
  const { setUser } = useSession();

  useEffect(() => {
    setUser(user);
  }, [user]);

  return (
    <div className="max-w-[60rem] mx-auto w-full flex flex-col gap-12">
      <Header />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
}
