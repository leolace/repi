import { Button } from "@components/button";
import Link from "next/link";

export const NavButtons = () => {
  return (
    <nav className="flex gap-5">
      <Link href="/auth/entrar">
        <Button type="secondary">Entrar</Button>
      </Link>
      <Link href="/auth/criar">
        <Button>Criar uma conta</Button>
      </Link>
    </nav>
  );
};
