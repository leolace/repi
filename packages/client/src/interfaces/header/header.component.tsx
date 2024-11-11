import { Logo } from "@components";
import Link from "next/link";
import React from "react";
import { NavButtons } from "./_compose";
import { HeaderProps } from "./header.types";

export const Header = ({ hideActions = false }: HeaderProps) => {
	const renderHeaderActions = () => {
		if (hideActions) return null;
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
