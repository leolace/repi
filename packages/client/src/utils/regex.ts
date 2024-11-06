export const isValidEmail = (value?: string) => {
	if (!value) return false;

	const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

	return emailRegex.test(value);
}

export const isStrongPassword = (value?: string) => {
	if (!value) return false;

	// TODO: make it more strong
	const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,}$/

	return passwordRegex.test(value);
}

