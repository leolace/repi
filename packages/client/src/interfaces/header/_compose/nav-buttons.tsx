"use client"
import { Button } from "@components/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavButtons = () => {
  const path = usePathname();
  const hiddenActionsPaths = [/\/auth/];

  if (hiddenActionsPaths.some(regex => regex.test(path))) return null;

  return (
    <nav className="flex gap-5">
      <Link href="/auth/entrar">
        <Button style="secondary">Entrar</Button>
      </Link>
      <Link href="/auth/criar">
        <Button>Criar conta</Button>
      </Link>
    </nav>
  );
};
