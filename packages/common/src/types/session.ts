import { UserClassesEnum } from "./user";

export interface IToken {
  token: string;
}

export interface IUserJWTPayload {
  userId: string;
  class: UserClassesEnum;
}
