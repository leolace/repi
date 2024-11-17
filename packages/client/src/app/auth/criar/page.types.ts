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

export type FormError = Partial<
  Record<CreateAccountSteps, string | null | false>
>;

export interface ICreateAccountContext {
  currentTitle: string;
  setCurrentTitle: React.Dispatch<React.SetStateAction<string>>;
  currentSubtitle: string;
  setCurrentSubtitle: React.Dispatch<React.SetStateAction<string>>;
  currentStep: CreateAccountSteps;
  setCurrentStep: React.Dispatch<React.SetStateAction<CreateAccountSteps>>;
  user: ICreateAccountUser;
  setUser: React.Dispatch<React.SetStateAction<ICreateAccountUser>>;
  error: null | FormError;
  setError: React.Dispatch<React.SetStateAction<null | FormError>>;
  isLoadingEmailVerify: boolean;
  clearUser: () => void;
  handleForm: (value: string) => Promise<void>;
  enableNextStep: () => void;
}
