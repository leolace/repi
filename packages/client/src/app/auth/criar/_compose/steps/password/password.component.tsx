import { CreateAccountContext } from "@app/auth/criar/page.context";
import { InvisibleInput } from "@components/invisible-input";
import { CreateAccountSteps } from "../../../page.types";
import React from "react";
import { ShowOrHidePassword } from "./_compose";

export const PasswordStep = () => {
  const { setUser, user, currentStep } = React.use(CreateAccountContext);
  const [show, setShow] = React.useState(false);

  return (
    <div className="flex items-center">
      <InvisibleInput
        size="3xl"
        placeholder="Digite a senha"
        type={show ? "text" : "password"}
        className="flex-1"
        onChange={({ currentTarget }) =>
          setUser((prev) => ({ ...prev, password: currentTarget.value }))
        }
        required
        value={user.password}
        name="password"
        autoFocus={currentStep === CreateAccountSteps.PASSWORD}
      />
      <ShowOrHidePassword show={show} setShow={setShow} />
    </div>
  );
};
