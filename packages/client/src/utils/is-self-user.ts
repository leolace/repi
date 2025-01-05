import { Bixo, CompleteSelfUser, Republica, UserClassesEnum } from "common";

export const isSelfUser = (value: unknown): value is CompleteSelfUser => {
  return (
    !!value && typeof value === "object" && "id" in value && "session" in value
  );
};

export const isClassDataRepublica = (value: unknown): value is Republica => {
  return (
    !!value &&
    typeof value === "object" &&
    "class" in value &&
    value.class === UserClassesEnum.REPUBLICA
  );
};

export const isClassDataBixo = (value: unknown): value is Bixo => {
  return (
    !!value &&
    typeof value === "object" &&
    "class" in value &&
    value.class === UserClassesEnum.BIXO
  );
};
