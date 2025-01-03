import { CreateAccountContext } from "../../../context";
import { Text } from "@components";
import { InvisibleInput } from "@components/invisible-input";
import { CreateAccountSteps } from "../../../page.types";
import React from "react";
import { Spinner } from "@components/spinner";
import { isValidEmail } from "common";

const EmailStep = () => {
  const { form, formDispatch, checkEmailAvailability } = React.use(CreateAccountContext);

  React.useLayoutEffect(() => {
    if (!form.user.email)
      formDispatch({ type: "SET_ERROR", key: "EMAIL", value: true });
  }, []);

  const handleChange = async ({
    currentTarget: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    formDispatch({
      type: "SET_USER_FIELD",
      key: "email",
      value,
    });
    if (!isValidEmail(value))
      return formDispatch({
        type: "SET_ERROR",
        key: "EMAIL",
        value: "E-mail inválido",
      });

    await checkEmailAvailability(value);
  };

  return (
    <div>
      <div className="flex items-center">
        <InvisibleInput
          size="3xl"
          placeholder="Digite seu email aqui"
          type="email"
          className="flex-1"
          onChange={handleChange}
          required
          defaultValue={form.user.email || ""}
          name="name"
          autoFocus={form.currentStep === CreateAccountSteps.EMAIL}
        />
        {form.loadings.EMAIL && <Spinner />}
      </div>
      {form.errors?.EMAIL && <Text>{form.errors.EMAIL}</Text>}
    </div>
  );
};

export default EmailStep;