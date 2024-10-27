import { CreateAccountContext } from "@app/auth/criar/page.context";
import { Text } from "@components";
import { InvisibleInput } from "@components/invisible-input";
import { CreateAccountSteps } from "../../../page.types";
import React from "react";

export const PasswordStep = () => {
  const { setUser, user, error, currentStep } = React.use(CreateAccountContext);

  return (
    <div>
      <InvisibleInput
        size="3xl"
        placeholder="Digite seu email aqui"
        type="email"
        className="min-w-full"
        onChange={({ currentTarget }) =>
          setUser((prev) => ({ ...prev, password: currentTarget.value }))
        }
        required
        value={user.password}
        name="password"
				autoFocus={currentStep === CreateAccountSteps.EMAIL}
      />
			{error && <Text>{error}</Text>}
    </div>
  );
};
