import { useState, useRef } from 'react';
import { useStore } from './hooks/useStore';
import { validateField } from './validators/validateField';
import styles from './RegistrationPage.module.css';

export const RegistrationPage = () => {
	const { getState, updateState, resetState } = useStore();
	const { email, password, confirmPassword } = getState();

	const [errors, setErrors] = useState({});
	const registerButtonRef = useRef(null);

	const handleInput = ({ target }) => {
		updateState(target.name, target.value);

		const fieldError = validateField(target.name, target.value, getState());

		let nextErrors = { ...errors, [target.name]: fieldError };
		setErrors(nextErrors);
	};

	const focusSubmitButton = () => {
		if (isFormValid(errors) && registerButtonRef.current) {
			registerButtonRef.current.focus();
		}
	};

	const isFormValid = (currentErrors) => {
		return (
			email.length > 0 &&
			password.length >= 8 &&
			password === confirmPassword &&
			!Object.values(currentErrors).some((error) => error.length > 0)
		);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(...getState());
		resetState();
	};

	return (
		<div className={styles.app}>
			<h2 className={styles.title}>Создать аккаунт</h2>

			<form className={styles.formRegistration} onSubmit={handleSubmit}>
				<div>
					<label className={styles.formLabel}>
						Email:
						<input
							name="email"
							type="email"
							value={email}
							placeholder="Enter email"
							className={styles.formInput}
							onChange={handleInput}
							onBlur={focusSubmitButton}
						/>
					</label>

					{errors.email && <p className={styles.errors}>{errors.email}</p>}
				</div>

				<div>
					<label className={styles.formLabel}>
						Пароль:
						<input
							name="password"
							type="password"
							value={password}
							placeholder="Password"
							className={styles.formInput}
							onChange={handleInput}
							onBlur={focusSubmitButton}
						/>
					</label>
					{errors.password && (
						<p className={styles.errors}>{errors.password}</p>
					)}
				</div>

				<div>
					<label className={styles.formLabel}>
						Повторите пароль:
						<input
							name="confirmPassword"
							type="password"
							value={confirmPassword}
							placeholder="Confirm Password"
							className={styles.formInput}
							onChange={handleInput}
							onBlur={focusSubmitButton}
						/>
					</label>
					{errors.confirmPassword && (
						<p className={styles.errors}>{errors.confirmPassword}</p>
					)}
				</div>

				<button
					className={styles.btn}
					ref={registerButtonRef}
					type="submit"
					disabled={!isFormValid(errors)}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
