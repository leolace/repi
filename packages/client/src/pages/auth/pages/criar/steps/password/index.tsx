import { useCreateAccount } from "@pages/auth/pages/criar/criar.context";
import { InvisibleInput } from "@components/invisible-input";
import { CreateAccountSteps } from "@pages/auth/pages/criar/criar.types";
import React from "react";
import { TogglePassword } from "./_compose";
import { StepWrapper } from "../../_compose";

export function PasswordStep() {
  const {
    form: { formState, register },
    step,
  } = useCreateAccount();
  const [show, setShow] = React.useState(false);

  return (
    <StepWrapper isValidStep={!formState.errors.password}>
      <div className="flex items-center">
        <InvisibleInput
          size="3xl"
          placeholder="Digite a senha"
          type={show ? "text" : "password"}
          className="flex-1"
          autoFocus={step === CreateAccountSteps.PASSWORD}
          {...register("password")}
        />
        <TogglePassword show={show} setShow={setShow} />
      </div>
    </StepWrapper>
  );
}
