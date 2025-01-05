import { IUserJWTPayload } from "./session";

export enum UserClassesEnum {
  NAO_DEFINIDA = "NAO_DEFINIDA",
  BIXO = "BIXO",
  REPUBLICA = "REPUBLICA",
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  class: UserClassesEnum;
}

export interface ITag {
  id: string;
  name: string;
}

export interface IUserWithTags extends IUser {
  tags: ITag[] | null;
}

export interface Republica {
  userId: string;
  class: UserClassesEnum.REPUBLICA;
  imageUrl?: string;
  rentalValue: number;
  occupantsCount: number;
  postsCount: number;
}

export interface Bixo {
  userId: string;
  class: UserClassesEnum.BIXO;
  imageUrl?: string;
}

export type CompleteSelfUser = IUser & {
  classData: Bixo | Republica;
  session: IUserJWTPayload;
};
