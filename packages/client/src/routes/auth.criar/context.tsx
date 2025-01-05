import React, { createContext } from "react";
import {
  CreateAccountSteps,
  FormActions,
  FormState,
  ICreateAccountContext,
  ICreateAccountUser
} from "./types";
import { IUser, UserClassesEnum } from "common";
import { useDebounced } from "@hooks/use-debounced-fetch";
import { useClient } from "@hooks/use-client-fetch";

const defaultCreateAccountUser: ICreateAccountUser = {
  name: "",
  email: "",
  password: "",
  tags: null,
  class: UserClassesEnum.NAO_DEFINIDA
};

export const CreateAccountContext = createContext<ICreateAccountContext>(
  {} as ICreateAccountContext
);

const defaultForm: FormState = {
  user: defaultCreateAccountUser,
  errors: {},
  loadings: {},
  currentStep: CreateAccountSteps.CLASS
};

export const CreateAccountProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [form, formDispatch] = React.useReducer(formReducer, defaultForm);
  const { debouncedFunction } = useDebounced<IUser[]>(1000);
  const { client } = useClient();

  const getUserByEmail = async (email: string) => {
    const users = await client<IUser[]>(`/users?email=${email}`);
    return users.data;
  };

  function formReducer(state: FormState, action: FormActions): FormState {
    switch (action.type) {
      case "SET_USER_FIELD":
        return {
          ...state,
          user: { ...state.user, [action.key]: action.value },
          errors:
            action.resetError !== false
              ? { ...state.errors, [state.currentStep]: "" }
              : state.errors
        };
      case "CLEAR_USER":
        return { ...state, user: defaultCreateAccountUser };
      case "SET_CURRENT_STEP":
        return { ...state, currentStep: action.value };
      case "SET_ERROR":
        return { ...state, errors: { [action.key]: action.value } };
      case "SET_LOADING":
        return { ...state, loadings: { [action.key]: action.value } };
      case "RESET_ERROR":
        return {
          ...state,
          errors: { ...state.errors, [state.currentStep]: false }
        };
    }
  }

  const checkEmailAvailability = async (value: string) => {
    formDispatch({
      type: "SET_LOADING",
      key: "EMAIL",
      value: true
    });
    const result = await debouncedFunction(() => getUserByEmail(value));

    formDispatch({
      type: "SET_LOADING",
      key: "EMAIL",
      value: false
    });

    if (result?.length)
      {return formDispatch({
        type: "SET_ERROR",
        key: "EMAIL",
        value: "Este e-mail já está em uso"
      });}
  };

  const value = React.useMemo(
    () => ({
      form,
      formDispatch,
      checkEmailAvailability
    }),
    [form, formDispatch, checkEmailAvailability]
  );

  return (
    <CreateAccountContext.Provider value={value}>
      {children}
    </CreateAccountContext.Provider>
  );
};
