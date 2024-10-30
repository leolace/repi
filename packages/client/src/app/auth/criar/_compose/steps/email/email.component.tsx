import { CreateAccountContext } from "@app/auth/criar/page.context";
import { Text } from "@components";
import { InvisibleInput } from "@components/invisible-input";
import { CreateAccountSteps } from "../../../page.types";
import React from "react";
import { Spinner } from "@components/spinner";

export const EmailStep = () => {
  const { setUser, user, error, currentStep, isLoadingEmailVerify } = React.use(CreateAccountContext);

  return (
    <div>
      <div className="flex items-center">
        <InvisibleInput
          size="3xl"
          placeholder="Digite seu email aqui"
          type="email"
          className="flex-1"
          onChange={({ currentTarget }) =>
            setUser((prev) => ({ ...prev, email: currentTarget.value }))
          }
          required
          value={user.email}
          name="name"
          autoFocus={currentStep === CreateAccountSteps.EMAIL}
        />
				{isLoadingEmailVerify && <Spinner />}
      </div>
      {error && <Text>{error}</Text>}
    </div>
  );
};
