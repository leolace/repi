import { CreateAccountContext } from "@app/auth/criar/page.context";
import { InvisibleInput } from "@components/invisible-input";
import { CreateAccountSteps } from "../../../page.types";
import { EyeOff, Eye } from "lucide-react";
import React from "react";

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
      <div onClick={() => setShow((prev) => !prev)} className="cursor-pointer p-3 hover:bg-gray-light rounded text-primary">
        {show ? <Eye /> : <EyeOff />}
      </div>
    </div>
  );
};
