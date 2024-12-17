import { Logo } from "@components";
import Link from "next/link";
import React from "react";
import { NavButtons } from "./_compose";
import { getSelf } from "@actions/user";

export const Header = async () => {
  const user = await getSelf();

  return (
    <header className="py-2 flex justify-between items-center">
      <Link href="/">
        <Logo />
      </Link>

      <NavButtons user={user}/>
    </header>
  );
};
