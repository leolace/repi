import { CreateAccountContext } from "@app/auth/criar/page.context";
import { Text } from "@components";
import { InvisibleInput } from "@components/invisible-input";
import React from "react";

export const EmailStep = () => {
  const { setUser, user, error } = React.useContext(CreateAccountContext);

  return (
    <div>
      <InvisibleInput
        size="3xl"
        placeholder="Digite seu email aqui"
        type="email"
        className="min-w-full"
        onChange={({ currentTarget }) =>
          setUser((prev) => ({ ...prev, email: currentTarget.value }))
        }
        required
        value={user.email}
        name="name"
				autoFocus
      />
			{error && <Text>{error}</Text>}
    </div>
  );
};
