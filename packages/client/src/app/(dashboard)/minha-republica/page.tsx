import { getSelf } from "@actions/user";
import { Button } from "@components";

export default async function Page() {
  const user = await getSelf();

  return (
    <div>
      <header>
        <div>
          {user?.name}
          São Carlos - SP
        </div>
        <div>
          <Button>Editar</Button>
        </div>
      </header>
    </div>
  );
}
