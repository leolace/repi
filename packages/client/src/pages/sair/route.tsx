import { logout } from "@actions/auth.server";
import { Button, Text } from "@components";
import { ActionFunctionArgs } from "react-router";
import { Form, Link } from "react-router";

export const action = async ({ request }: ActionFunctionArgs) => {
  return await logout(request);
};

export default function Sair() {
  return (
    <Form method="POST">
      <Text>Tem certeza que deseja sair?</Text>
      <Button type="submit">Sair</Button>
      <Link to="/inicio">
        <Button>Voltar</Button>
      </Link>
    </Form>
  );
}
