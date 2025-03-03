import { Button, Text } from "@components";
import { useSession } from "@contexts/session";
import { Link } from "react-router";

export function Sair() {
  const { logout } = useSession();

  return (
    <div>
      <Text>Tem certeza que deseja sair?</Text>
      <Button onClick={logout}>Sair</Button>
      <Link to="/inicio">
        <Button>Voltar</Button>
      </Link>
    </div>
  );
}
