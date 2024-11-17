"use client";

import React, { createContext } from "react";
import {
  CreateAccountSteps,
  FormError,
  ICreateAccountContext,
  ICreateAccountUser,
} from "./page.types";
import { isStrongPassword, isValidEmail } from "@utils/regex";
import { getUserByEmail } from "@actions/user";
import { useDebouncedFetch } from "@hooks/use-debounced-fetch";
import { IUser, TagEnum, UserClassesEnum } from "common";

const defaultCreateAccountUser: ICreateAccountUser = {
  name: "",
  email: "",
  password: "",
  tags: null,
  class: UserClassesEnum.NAO_DEFINIDA,
};

export const CreateAccountContext = createContext<ICreateAccountContext>(
  {} as ICreateAccountContext
);

export const CreateAccountProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentTitle, setCurrentTitle] = React.useState<string>("");
  const [currentSubtitle, setCurrentSubtitle] = React.useState<string>("");
  const [currentStep, setCurrentStep] = React.useState<CreateAccountSteps>(
    CreateAccountSteps.CLASS
  );
  const [user, setUser] = React.useState<ICreateAccountUser>(
    defaultCreateAccountUser
  );
  const [error, setError] = React.useState<FormError | null>(null);
  const { deboundedFetch, isLoading } = useDebouncedFetch<IUser[]>(1000);

  const handleForm = React.useCallback(
    async (value: string) => {
      switch (currentStep) {
        case CreateAccountSteps.CLASS:
          if (value !== user.class) clearUser();
          setCurrentStepUserData({ class: value as UserClassesEnum });
          if (!value) return setCurrentStepError(true);
          break;
        case CreateAccountSteps.NAME:
          setCurrentStepUserData({ name: value });
          if (!value.trim())
            return setCurrentStepError("Digite seu nome para continuar");
          break;
        case CreateAccountSteps.PASSWORD:
          setCurrentStepUserData({ password: value });
          if (!value.trim())
            return setCurrentStepError("Digite uma senha valida");
          if (!isStrongPassword(value))
            return setCurrentStepError("Digite uma senha mais segura");
          break;
        case CreateAccountSteps.EMAIL:
          setCurrentStepUserData({ email: value });
          const result = await deboundedFetch(() => getUserByEmail(value));
          if (result?.length)
            return setCurrentStepError("Este e-mail já está em uso");

          if (!value.trim()) return setCurrentStepError(true);

          if (!isValidEmail(value))
            return setCurrentStepError("E-mail inválido");
          break;
        case CreateAccountSteps.TAG:
          const userTags: TagEnum[] = user.tags?.includes(value as TagEnum)
            ? user.tags.filter((tag) => tag !== value)
            : user.tags?.concat(value as TagEnum) || [value as TagEnum];

          setCurrentStepUserData({ tags: userTags });
          break;
        default:
          break;
      }
      enableNextStep();
    },
    [user, currentStep]
  );

  const clearUser = () => {
    setUser(defaultCreateAccountUser);
  };

  const enableNextStep = () => {
    setError((prev) => ({ ...prev, [currentStep]: false }));
  };

  const setCurrentStepError = (error: string | null | boolean) => {
    setError((prev) => ({
      ...prev,
      [currentStep]: error,
    }));
  };

  function setCurrentStepUserData(value: Partial<ICreateAccountUser>) {
    setUser((prev) => ({ ...prev, ...value }));
  }

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
        isLoadingEmailVerify: isLoading,
        handleForm,
        clearUser,
        enableNextStep,
      }}
    >
      {children}
    </CreateAccountContext.Provider>
  );
};
