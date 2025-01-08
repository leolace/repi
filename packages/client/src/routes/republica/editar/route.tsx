import { Select, Text } from "@components";
import { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";

export const loader = ({ params }: LoaderFunctionArgs) => {
  return { params };
};

export default function EditRepublica() {
  const { params } = useLoaderData<typeof loader>();

  return (
    <div>
      <Text>editar {params.id}</Text>

      <div className="w-full">
        <Select.Select defaultValue="teste">
          <Select.SelectTrigger>
            <Select.SelectValue placeholder="Clicar" />
          </Select.SelectTrigger>
          <Select.SelectContent>
            <Select.SelectGroup>
              <Select.SelectItem value="teste">Teste</Select.SelectItem>
              <Select.SelectItem value="teste2">Teste 2</Select.SelectItem>
              <Select.SelectItem value="teste1">Teste 1</Select.SelectItem>
            </Select.SelectGroup>
          </Select.SelectContent>
        </Select.Select>
      </div>
    </div>
  );
}
