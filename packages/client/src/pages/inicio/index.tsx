import React from "react";
import { PageTitle } from "@components";

export function Inicio() {
  // const { users } = useLoaderData<typeof loader>();

  // if (isErrorResponseData(users)) return;
  return (
    <section className="flex-1 h-full w-full grid gap-10">
      <PageTitle title="Encontre a sua república" />
      <div>
        <pre className="grid gap-8">
          {/* {users.map((user) => (
            <RepCard {...user} key={user.email} />
          ))} */}
        </pre>
      </div>
    </section>
  );
}
