import { Class } from "@types";
import { TagEnum } from "common";

export enum CreateAccountSteps {
	CLASS = "CLASS",
	NAME = "NAME",
	EMAIL = "EMAIL",
	TAG = "TAG",
	PASSWORD = "PASSWORD",
	CONFIRM = "CONFIRM",
	NOT_DEFINED = "NOT_DEFINED"
}

export interface CurrentStepData {
	title: string;
	subtitle: string;
	component: React.ReactNode;
}

export interface ICreateAccountUser {
	name: string;
	email: string;
	password: string;
	class: Class;
	tags: TagEnum[] | null;
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
	isLoadingEmailVerify: boolean;
	clearUser: () => void;
}

