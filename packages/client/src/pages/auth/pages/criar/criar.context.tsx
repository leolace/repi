import { createContext, useContext, useEffect, useState } from "react";
import {
  ICreateAccountContext,
  CreateAccountFormFields,
  CreateAccountSteps,
} from "./criar.types";
import { useForm } from "react-hook-form";
import {
  CreateAccountFormSchema,
  defaultCreateAccountUser,
} from "./criar.utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserClassesEnum } from "common";

export const CreateAccountContext = createContext<ICreateAccountContext>(
  {} as ICreateAccountContext,
);

export const CreateAccountProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [step, setStep] = useState(CreateAccountSteps.CLASS);
  const form = useForm<CreateAccountFormFields>({
    defaultValues: defaultCreateAccountUser,
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(CreateAccountFormSchema),
  });

  function nextStep() {
    if (
      form.getValues("class") === UserClassesEnum.REPUBLICA &&
      step === CreateAccountSteps.EMAIL
    ) {
      return setStep(CreateAccountSteps.PASSWORD);
    }
    setStep((prev) => prev + 1);
  }

  function previousStep() {
    setStep((prev) => prev - 1);
  }

  useEffect(() => {
    form.trigger();
  }, [step]);

  const value = {
    form,
    step,
    setStep,
    nextStep,
    previousStep,
  };

  return (
    <CreateAccountContext.Provider value={value}>
      {children}
    </CreateAccountContext.Provider>
  );
};

export const useCreateAccount = () => useContext(CreateAccountContext);
