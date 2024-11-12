import { Logo } from "@components";
import Link from "next/link";
import React from "react";
import { NavButtons } from "./_compose";

export const Header = () => {
  return (
    <header className="py-2 flex justify-between items-center">
      <Link href="/">
        <Logo />
      </Link>

      <NavButtons />
    </header>
  );
};
