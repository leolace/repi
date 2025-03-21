import { Button } from "@components/forms/button";
import { Link, useLocation } from "react-router";

export const NavButtons = () => {
  const { pathname } = useLocation();
  const hiddenActionsPaths = [/\/auth/];

  if (hiddenActionsPaths.some((regex) => regex.test(pathname)))
    return null;

  return (
    <nav className="flex gap-5 items-center">
      <Link to="/auth/entrar">
        <Button style="secondary">Entrar</Button>
      </Link>
      <Link to="/auth/criar">
        <Button>Criar conta</Button>
      </Link>
    </nav>
  );
};
