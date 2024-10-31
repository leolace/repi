"use client";

import React, { createContext } from "react";
import {
  CreateAccountSteps,
  ICreateAccountContext,
  ICreateAccountUser,
} from "./page.types";
import { Class } from "@types";
import { isValidEmail } from "@utils/regex";
import { getUserByEmail } from "@actions";

const defaultCreateAccountUser: ICreateAccountUser = {
  name: "",
  email: "",
  password: "",
  class: Class.NAO_DEFINIDA,
};

export const CreateAccountContext = createContext<ICreateAccountContext>(
  {} as ICreateAccountContext,
);

export const CreateAccountProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentTitle, setCurrentTitle] = React.useState<string>("");
  const [currentSubtitle, setCurrentSubtitle] = React.useState<string>("");
  const [currentStep, setCurrentStep] = React.useState<CreateAccountSteps>(
    CreateAccountSteps.CLASS,
  );
  const [user, setUser] = React.useState<ICreateAccountUser>(
    defaultCreateAccountUser,
  );
  const [error, setError] = React.useState<null | string>(null);
  const [isLoadingEmailVerify, setIsLoadingEmailVerify] = React.useState(false);

  React.useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    const getError = () => {
      setError(null);
      switch (currentStep) {
        case CreateAccountSteps.CLASS:
          if (!user.class) setError("Escolha uma classe para continuar");
          break;
        case CreateAccountSteps.NAME:
          if (!user.name.trim()) setError("Digite seu nome para continuar");
          break;
        case CreateAccountSteps.EMAIL:
					setIsLoadingEmailVerify(false);
          if (!user.email.trim()) return setError(" ");
          if (!isValidEmail(user.email)) return setError("E-mail inválido");
          timer = setTimeout(async () => {
						setIsLoadingEmailVerify(true);
            const data = await getUserByEmail(user.email);
            if (data?.length) setError("Email já existe");
            setIsLoadingEmailVerify(false);
          }, 1000);
          break;
        default:
          break;
      }
    };

    getError();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [currentStep, user]);

  return (
    <CreateAccountContext.Provider
      value={{
        currentTitle,
        setCurrentTitle,
        currentSubtitle,
        setCurrentSubtitle,
        currentStep,
        setCurrentStep,
        user,
        setUser,
        error,
        setError,
				isLoadingEmailVerify
      }}
    >
      {children}
    </CreateAccountContext.Provider>
  );
};
