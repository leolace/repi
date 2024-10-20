"use client";
import React, { createContext } from "react";
import {
  CreateAccountSteps,
  ICreateAccountContext,
  ICreateAccountUser,
} from "./page.types";
import { Class } from "@types";

const defaultCreateAccountUser: ICreateAccountUser = {
  name: "",
  email: "",
  class: Class.NAO_DEFINIDA,
};

export const CreateAccountContext =
  createContext<ICreateAccountContext>({} as ICreateAccountContext);

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
				setError
      }}
    >
      {children}
    </CreateAccountContext.Provider>
  );
};
