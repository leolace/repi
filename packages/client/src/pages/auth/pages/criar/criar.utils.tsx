import React from "react";
import { CreateAccountSteps, CurrentStepData } from "./criar.types";
import {
  ClassStep,
  EmailStep,
  NameStep,
  TagStep,
  PasswordStep,
  ConfirmStep,
} from "./steps";
import { z } from "zod";
import { UserClassesEnum } from "common";

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
};

export const defaultCreateAccountUser = {
  name: "",
  email: "",
  password: "",
  class: undefined,
};

export const CreateAccountFormSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  class: z.nativeEnum(UserClassesEnum),
});
