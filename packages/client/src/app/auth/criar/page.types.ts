import { Class } from "@types";

export enum CreateAccountSteps {
	CLASS = "CLASS",
	NAME = "NAME",
	EMAIL = "EMAIL",
	CONFIRM = "CONFIRM"
}

export interface CurrentStepData {
	title: string;
	subtitle: string;
	component: React.ReactNode;
}

export interface ICreateAccountUser {
	name: string;
	email: string;
	class: Class;
};

export interface ICreateAccountContext {
	currentTitle: string;
	setCurrentTitle: React.Dispatch<React.SetStateAction<string>>;
	currentSubtitle: string;
	setCurrentSubtitle: React.Dispatch<React.SetStateAction<string>>;
	currentStep: CreateAccountSteps;
	setCurrentStep: React.Dispatch<React.SetStateAction<CreateAccountSteps>>;
	user: ICreateAccountUser;
	setUser: React.Dispatch<React.SetStateAction<ICreateAccountUser>>;
	error: null | string;
	setError: React.Dispatch<React.SetStateAction<null | string>>;
}

