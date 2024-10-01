"use client"
import { Logo } from "@components";
import { SessionContext } from "@contexts/session";
import Link from "next/link";
import React from "react";
import { NavButtons, ProfileAvatar } from "./_compose";

export const Header = () => {
  const { isAuth } = React.useContext(SessionContext);

  return (
    <header className="py-2 flex justify-between items-center">
      <Link href="/">
        <Logo />
      </Link>

      {isAuth ? (
        <ProfileAvatar />
      ) : (
					<NavButtons />
      )}
    </header>
  );
};
