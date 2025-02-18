import React from "react";
import { CreateAccountSteps, CurrentStepData } from "./criar.types";
import { UserClassesEnum } from "common";

import ClassStep from "./_compose/steps/class/class.component";
import NameStep from "./_compose/steps/name/name.component";
import TagStep from "./_compose/steps/tag/tag.component";
import EmailStep from "./_compose/steps/email/email.component";
import PasswordStep from "./_compose/steps/password/password.component";
import ConfirmStep from "./_compose/steps/confirm/confirm.component";

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
  [CreateAccountSteps.TAG]: {
    title: "Adicione itens de interesse",
    subtitle: "A busca por repúblicas será personalizada.",
    component: <TagStep />,
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
  [CreateAccountSteps.NOT_DEFINED]: {
    title: "[ERROR]",
    subtitle: "STEP NOT DEFINED.",
    component: <div>STEP NOT DEFINED</div>,
  },
};

export const mapNextStep = (
  currentStep: CreateAccountSteps,
  userClass: UserClassesEnum = UserClassesEnum.NAO_DEFINIDA
) => {
  const steps: Record<
    Partial<CreateAccountSteps>,
    Partial<CreateAccountSteps>
  > = {
    [CreateAccountSteps.CLASS]: CreateAccountSteps.NAME,
    [CreateAccountSteps.NAME]: CreateAccountSteps.EMAIL,
    [CreateAccountSteps.EMAIL]: CreateAccountSteps.PASSWORD,
    [CreateAccountSteps.PASSWORD]: CreateAccountSteps.CONFIRM,
    [CreateAccountSteps.CONFIRM]: CreateAccountSteps.CONFIRM,
    [CreateAccountSteps.NOT_DEFINED]: CreateAccountSteps.NOT_DEFINED,
    [CreateAccountSteps.TAG]: CreateAccountSteps.NOT_DEFINED,
  };

  if (userClass === UserClassesEnum.BIXO) {
    steps[CreateAccountSteps.NAME] = CreateAccountSteps.TAG;
    steps[CreateAccountSteps.TAG] = CreateAccountSteps.EMAIL;
  }

  return steps[currentStep];
};

export const mapPrevStep = (
  currentStep: CreateAccountSteps,
  userClass: UserClassesEnum = UserClassesEnum.NAO_DEFINIDA
) => {
  const steps: Record<CreateAccountSteps, CreateAccountSteps> = {
    [CreateAccountSteps.CLASS]: CreateAccountSteps.CLASS,
    [CreateAccountSteps.NAME]: CreateAccountSteps.CLASS,
    [CreateAccountSteps.TAG]: CreateAccountSteps.NAME,
    [CreateAccountSteps.EMAIL]: CreateAccountSteps.NAME,
    [CreateAccountSteps.PASSWORD]: CreateAccountSteps.EMAIL,
    [CreateAccountSteps.CONFIRM]: CreateAccountSteps.PASSWORD,
    [CreateAccountSteps.NOT_DEFINED]: CreateAccountSteps.CLASS,
  };

  if (userClass === UserClassesEnum.BIXO) {
    steps[CreateAccountSteps.EMAIL] = CreateAccountSteps.TAG;
    steps[CreateAccountSteps.TAG] = CreateAccountSteps.NAME;
  }

  return steps[currentStep];
};
