export class ErrorE extends Error {
	statusCode;
	
	constructor(message: string, statusCode: number = 400) {
		super(message);
		this.statusCode = statusCode;
	}
}
