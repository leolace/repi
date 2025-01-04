import { CreateAccountContext } from "../../../context";
import { InvisibleInput } from "@components/invisible-input";
import { CreateAccountSteps } from "../../../types";
import React from "react";
import { ShowOrHidePassword } from "./_compose";
import { isStrongPassword } from "@utils/regex";

const PasswordStep = () => {
  const { form, formDispatch } = React.use(CreateAccountContext);
  const [show, setShow] = React.useState(false);

  React.useLayoutEffect(() => {
    if (!form.user.password)
      formDispatch({ type: "SET_ERROR", key: "PASSWORD", value: true });
  }, []);

  const handleChange = async ({
    currentTarget: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (!isStrongPassword(value))
      return formDispatch({
        type: "SET_ERROR",
        key: "PASSWORD",
        value: "Senha fraca",
      });

    formDispatch({
      type: "SET_USER_FIELD",
      key: "password",
      value: value,
      resetError: true,
    });
  };

  return (
    <div className="flex items-center">
      <InvisibleInput
        size="3xl"
        placeholder="Digite a senha"
        type={show ? "text" : "password"}
        className="flex-1"
        onChange={handleChange}
        required
        defaultValue={form.user.password || ""}
        name="password"
        autoFocus={form.currentStep === CreateAccountSteps.PASSWORD}
      />
      <ShowOrHidePassword show={show} setShow={setShow} />
    </div>
  );
};

export default PasswordStep;
