export enum UserClassesEnum {
  NAO_DEFINIDA = "NAO_DEFINIDA",
  BIXO = "BIXO",
  REPUBLICA = "REPUBLICA",
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  imageUrl: string | null;
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
  id: string;
  userId: string;
  class: UserClassesEnum.REPUBLICA;
  rentalValue: string;
  occupantsCount: number;
  postsCount: number;
}

export interface Bixo {
  userId: string;
  class: UserClassesEnum.BIXO;
}

export type CompleteUser<T> = IUser & {
  classData: T;
};

export type CompleteSelfUser = IUser & {
  classData: Bixo | Republica;
};
