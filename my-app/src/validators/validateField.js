import { validateEmail } from './validateEmail';

export const validateField = (name, value, formData) => {
	let error = '';

	switch (name) {
		case 'email':
			if (!value) {
				error = 'Email обязателен.';
			} else if (!validateEmail(value)) {
				error = 'Некорректный Email.';
			}
			break;
		case 'password':
			if (value.length < 8) {
				error = 'Пароль должен быть не менее 8 символов.';
			}
			break;
		case 'confirmPassword':
			if (value !== formData.password) {
				error = 'Пароли должны совпадать.';
			}
			break;
		default:
			break;
	}
	return error;
};
