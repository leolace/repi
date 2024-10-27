export enum UserClassesEnum {
	NAO_DEFINIDA = "NAO_DEFINIDA",
	BIXO = "BIXO",
	REPUBLICA = "REPUBLICA"
}

export interface IUser {
	name: string;
	email: string;
	class: UserClassesEnum;
};
