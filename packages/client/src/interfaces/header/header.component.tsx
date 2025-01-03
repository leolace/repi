import { Logo } from "@components";
import React from "react";
import { NavButtons } from "./_compose";
import { HeaderMenu } from "./_compose/header-menu";
import { Link } from "@remix-run/react";
import { ISelfUser } from "common";

export const Header = ({ user }: { user: ISelfUser | null }) => {

  return (
    <header className="py-2 flex justify-between items-center">
      <Link to="/inicio">
        <Logo />
      </Link>

      {user ? <HeaderMenu {...user} /> : <NavButtons />}
    </header>
  );
};
