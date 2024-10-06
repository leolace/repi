"use client";
import { Logo } from "@components";
import { SessionContext } from "@contexts/session";
import Link from "next/link";
import React from "react";
import { NavButtons, ProfileAvatar } from "./_compose";
import { HeaderProps } from "./header.types";

export const Header = ({ hideActions = false }: HeaderProps) => {
  const { isAuth } = React.useContext(SessionContext);

	const renderHeaderActions = () => {
		if (hideActions) return null;
		
		if (isAuth) return <ProfileAvatar />
		else return <NavButtons />
	}

  return (
    <header className="py-2 flex justify-between items-center">
      <Link href="/">
        <Logo />
      </Link>

      {renderHeaderActions()}
    </header>
  );
};
