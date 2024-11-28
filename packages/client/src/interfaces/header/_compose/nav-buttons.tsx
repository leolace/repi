"use client";

import { logOut } from "@actions";
import { Text } from "@components";
import { Button } from "@components/button";
import { IUser } from "common";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProfileAvatar } from "./profile-avatar";

export const NavButtons = ({ user }: { user: IUser | null }) => {
  const path = usePathname();
  const hiddenActionsPaths = [/\/auth/];

  if (hiddenActionsPaths.some((regex) => regex.test(path))) return null;

  return (
    <nav className="flex gap-5 items-center">
      {!user ? (
        <>
          <Link href="/auth/entrar">
            <Button style="secondary">Entrar</Button>
          </Link>
          <Link href="/auth/criar">
            <Button>Criar conta</Button>
          </Link>
        </>
      ) : (
        <>
          <ProfileAvatar />
          <Text>{user.name}</Text>
          <Button style="secondary" onClick={logOut}>Sair</Button>
        </>
      )}
    </nav>
  );
};
