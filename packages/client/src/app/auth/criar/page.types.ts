import { IUserWithTags, TagEnum } from "common";

export enum CreateAccountSteps {
  CLASS = "CLASS",
  NAME = "NAME",
  EMAIL = "EMAIL",
  TAG = "TAG",
  PASSWORD = "PASSWORD",
  CONFIRM = "CONFIRM",
  NOT_DEFINED = "NOT_DEFINED",
}

export interface CurrentStepData {
  title: string;
  subtitle: string;
  component: React.ReactNode;
}

export interface ICreateAccountUser extends Omit<IUserWithTags, "id" | "tags"> {
  password: string;
  tags: TagEnum[] | null;
}

export type FormError = Partial<Record<CreateAccountSteps, string | boolean>>;

export type FormLoading = Partial<Record<CreateAccountSteps, boolean>>;

export type FormActions =
  | {
      type: "SET_USER_FIELD";
      key: keyof ICreateAccountUser;
      value: ICreateAccountUser[keyof ICreateAccountUser];
      resetError?: boolean
    }
  | { type: "CLEAR_USER" }
  | {
      type: "SET_ERROR";
      key: keyof typeof CreateAccountSteps;
      value: string | boolean;
    }
  | {
      type: "SET_LOADING";
      key: keyof typeof CreateAccountSteps;
      value: boolean;
    }
  | { type: "SET_CURRENT_STEP"; value: CreateAccountSteps }
  | { type: "RESET_ERROR" };

export type FormState = {
  user: ICreateAccountUser;
  errors: FormError;
  loadings: FormLoading;
  currentStep: CreateAccountSteps;
};

export interface ICreateAccountContext {
  form: FormState;
  formDispatch: React.ActionDispatch<[action: FormActions]>;
  checkEmailAvailability: (value: string) => Promise<void>
}
