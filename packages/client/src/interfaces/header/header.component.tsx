import { Logo } from "@components";
import React from "react";
import { Link } from "react-router";
import { NavButtons } from "./_compose";

export const Header = () => {
  return (
    <header className="py-2 flex justify-between items-center">
      <Link to="/inicio">
        <Logo />
      </Link>

      {/* {user ? <HeaderMenu /> : <NavButtons />} */}
      <NavButtons />
    </header>
  );
};
