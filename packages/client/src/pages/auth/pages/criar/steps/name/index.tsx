import { CreateAccountContext } from "@pages/auth/pages/criar/criar.context";
import { InvisibleInput } from "@components/invisible-input";
import React from "react";
import { StepWrapper } from "../../_compose";

export function NameStep() {
  const {
    form: { register, formState },
  } = React.use(CreateAccountContext);

  return (
    <StepWrapper isValidStep={!formState.errors.name}>
      <InvisibleInput
        size="3xl"
        placeholder="Digite seu nome aqui"
        className="min-w-full"
        required
        autoFocus
        {...register("name")}
      />
    </StepWrapper>
  );
}
