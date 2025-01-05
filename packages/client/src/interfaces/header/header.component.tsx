import { Logo } from "@components";
import React from "react";
import { NavButtons } from "./_compose";
import { HeaderMenu } from "./_compose/header-menu";
import { Link } from "@remix-run/react";
import { useGetRootData } from "@hooks/use-get-root-data";

export const Header = () => {
  const { user } = useGetRootData();

  return (
    <header className="py-2 flex justify-between items-center">
      <Link to="/inicio">
        <Logo />
      </Link>

      {user ? <HeaderMenu /> : <NavButtons />}
    </header>
  );
};
