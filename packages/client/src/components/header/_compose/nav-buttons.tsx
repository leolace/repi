import { Button } from "@components/button";
import Link from "next/link";

export const NavButtons = () => {
  return (
    <nav className="flex gap-3">
      <Link href="/auth/entrar">
        <Button type="secondary">Entrar</Button>
      </Link>
      <Link href="/auth/criar">
        <Button>Criar</Button>
      </Link>
    </nav>
  );
};
