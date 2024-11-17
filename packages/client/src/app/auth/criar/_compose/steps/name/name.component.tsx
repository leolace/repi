import { CreateAccountContext } from "@app/auth/criar/page.context";
import { CreateAccountSteps } from "@app/auth/criar/page.types";
import { InvisibleInput } from "@components/invisible-input";
import React from "react";

export const NameStep = () => {
  const { user, currentStep, handleForm } = React.use(CreateAccountContext);

  return (
    <InvisibleInput
      size="3xl"
      placeholder="Digite seu nome aqui"
      className="min-w-full"
      onChange={async ({ currentTarget }) =>
        await handleForm(currentTarget.value)
      }
      required
      defaultValue={user.name || ""}
      autoFocus={currentStep === CreateAccountSteps.NAME}
      name="name"
    />
  );
};
