import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './RegistrationPage.module.css';

const schema = yup
	.object({
		email: yup.string().email('Неверный формат email').required('Email обязателен'),
		password: yup
			.string()
			.min(8, 'Пароль должен содержать минимум 8 символов')
			.required('Пароль обязателен'),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref('password'), null], 'Пароли не совпадают')
			.required('Повтор пароля обязателен'),
	})
	.required();

export const RegistrationPage = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'onChange',
	});

	const submitButtonRef = React.useRef(null);

	const focusSubmitButton = () => {
		if (isValid && submitButtonRef.current) {
			submitButtonRef.current.focus();
		}
	};

	const onSubmit = (data) => {
		console.log(data);

		reset({
			email: '',
			password: '',
			confirmPassword: '',
		});
	};

	return (
		<div className={styles.app}>
			<h2 className={styles.title}>Создать аккаунт</h2>

			<form className={styles.formRegistration} onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label className={styles.formLabel}>
						Email:
						<input
							name="email"
							type="email"
							placeholder="Enter email"
							className={styles.formInput}
							{...register('email')}
							onBlur={focusSubmitButton}
						/>
					</label>
					{errors.email && (
						<p className={styles.errors}>{errors.email.message}</p>
					)}
				</div>

				<div>
					<label className={styles.formLabel}>
						Пароль:
						<input
							name="password"
							type="password"
							placeholder="Password"
							className={styles.formInput}
							{...register('password')}
							onBlur={focusSubmitButton}
						/>
					</label>
					{errors.password && (
						<p className={styles.errors}>{errors.password.message}</p>
					)}
				</div>

				<div>
					<label className={styles.formLabel}>
						Повторите пароль:
						<input
							name="confirmPassword"
							type="password"
							placeholder="Confirm Password"
							className={styles.formInput}
							{...register('confirmPassword')}
							onBlur={focusSubmitButton}
						/>
					</label>
					{errors.confirmPassword && (
						<p className={styles.errors}>{errors.confirmPassword.message}</p>
					)}
				</div>

				<button
					ref={submitButtonRef}
					className={styles.btn}
					type="submit"
					disabled={!isValid}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
