import { CompleteUser, Republica } from "common";

export type RepublicaEditData = {
  name?: CompleteUser<Republica>["name"];
  avatarFilename?: string;
  classData?: {
    occupantsCount?: CompleteUser<Republica>["classData"]["occupantsCount"];
    rentalValue?: CompleteUser<Republica>["classData"]["rentalValue"];
  };
};

export interface RepublicaEditForm {
  name: string;
  occupantsCount: number;
  rentalValue: number;
}