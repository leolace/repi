import { CreateAccountContext } from "@app/auth/criar/page.context";
import { CreateAccountSteps } from "@app/auth/criar/page.types";
import { InvisibleInput } from "@components/invisible-input";
import React from "react";

export const NameStep = () => {
  const { form, formDispatch } = React.use(CreateAccountContext);

  React.useLayoutEffect(() => {
    if (!form.user.name)
      formDispatch({ type: "SET_ERROR", key: "NAME", value: true });
  }, []);

  return (
    <InvisibleInput
      size="3xl"
      placeholder="Digite seu nome aqui"
      className="min-w-full"
      onChange={({ currentTarget }) =>
        formDispatch({
          type: "SET_USER_FIELD",
          key: "name",
          value: currentTarget.value,
        })
      }
      required
      defaultValue={form.user.name || ""}
      autoFocus={form.currentStep === CreateAccountSteps.NAME}
      name="name"
    />
  );
};
