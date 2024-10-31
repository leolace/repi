export enum UserClassesEnum {
	NAO_DEFINIDA = "NAO_DEFINIDA",
	BIXO = "BIXO",
	REPUBLICA = "REPUBLICA"
}

export interface IUser {
	id: string;
	name: string;
	email: string;
	class: UserClassesEnum;
};

export interface ITag {
	id: string;
	name: string;
}
