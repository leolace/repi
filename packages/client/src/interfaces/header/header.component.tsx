import { Logo } from "@components";
import Link from "next/link";
import React, { Suspense } from "react";
import { NavButtons } from "./_compose";
import { getSelf } from "@actions/user";
import { HeaderMenu } from "./_compose/header-menu";

export const Header = async () => {
  const user = await getSelf();

  return (
    <header className="py-2 flex justify-between items-center">
      <Link href="/">
        <Logo />
      </Link>

      {user ? <HeaderMenu {...user} /> : <NavButtons />}
    </header>
  );
};
