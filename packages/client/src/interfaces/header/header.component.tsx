import { Logo } from "@components";
import React from "react";
import { Link } from "react-router";
import { NavButtons } from "./_compose";
import { useSession } from "@contexts/session";
import { HeaderMenu } from "./_compose/header-menu";

export const Header = () => {
  const { user } = useSession();
  return (
    <header className="py-2 flex justify-between items-center">
      <Link to="/inicio">
        <Logo />
      </Link>

      {user ? <HeaderMenu /> : <NavButtons />}
    </header>
  );
};
