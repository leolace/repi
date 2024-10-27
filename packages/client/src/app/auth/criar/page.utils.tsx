import React from "react";
import { ClassStep, ConfirmStep, NameStep, PasswordStep } from "./_compose";
import { CreateAccountSteps, CurrentStepData } from "./page.types";
import { EmailStep } from "./_compose/steps/email";

export const mapCurrentStepData: Record<CreateAccountSteps, CurrentStepData> = {
  [CreateAccountSteps.CLASS]: {
    title: "Escolha a sua classe",
    subtitle: "Usaremos isso para modificar a sua experiência na Repi.",
    component: <ClassStep />,
  },
  [CreateAccountSteps.NAME]: {
    title: "Como devemos lhe chamar?",
    subtitle: "Você será chamado assim daqui para frente.",
    component: <NameStep />,
  },
  [CreateAccountSteps.EMAIL]: {
    title: "Qual seu e-mail de contato?",
    subtitle: "Entraremos em contato por este e-mail.",
    component: <EmailStep />,
  },
	[CreateAccountSteps.PASSWORD]: {
		title: "Crie uma senha segura",
		subtitle: "Você irá utilizá-la para acessar sua conta.",
		component: <PasswordStep />,
	},
  [CreateAccountSteps.CONFIRM]: {
    title: "Confirme seus dados",
    subtitle: "Voce pode voltar atrás e editar.",
    component: <ConfirmStep />,
  },
};

export const mapNextStep: Record<CreateAccountSteps, CreateAccountSteps> = {
  [CreateAccountSteps.CLASS]: CreateAccountSteps.NAME,
  [CreateAccountSteps.NAME]: CreateAccountSteps.EMAIL,
  [CreateAccountSteps.EMAIL]: CreateAccountSteps.PASSWORD,
	[CreateAccountSteps.PASSWORD]: CreateAccountSteps.CONFIRM,
	[CreateAccountSteps.CONFIRM]: CreateAccountSteps.CONFIRM,
};

export const mapPrevStep: Record<CreateAccountSteps, CreateAccountSteps> = {
	[CreateAccountSteps.CLASS]: CreateAccountSteps.CLASS,
	[CreateAccountSteps.NAME]: CreateAccountSteps.CLASS,
	[CreateAccountSteps.EMAIL]: CreateAccountSteps.PASSWORD,
	[CreateAccountSteps.PASSWORD]: CreateAccountSteps.CONFIRM,
	[CreateAccountSteps.CONFIRM]: CreateAccountSteps.EMAIL,
}
