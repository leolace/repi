import { UserClassesEnum } from "common";
import { UseFormReturn } from "react-hook-form";

export enum CreateAccountSteps {
  CLASS = 0,
  NAME = 1,
  EMAIL = 2,
  TAG = 3,
  PASSWORD = 4,
  CONFIRM = 5,
}

export interface CurrentStepData {
  title: string;
  subtitle: string;
  component: React.ReactNode;
}

export interface CreateAccountFormFields {
  class: UserClassesEnum;
  name: string;
  email: string;
  tags?: string[];
  password: string;
}
export interface ICreateAccountContext {
  form: UseFormReturn<CreateAccountFormFields>;
  step: CreateAccountSteps;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  nextStep: () => void;
  previousStep: () => void;
}
