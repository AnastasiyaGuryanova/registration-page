import styles from './RegistrationPage.module.css';

export const RegistrationPage = () => {
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
						/>
					</label>
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
						/>
					</label>
					{errors.confirmPassword && (
						<p className={styles.errors}>{errors.confirmPassword}</p>
					)}
				</div>

				<button className={styles.btn} type="submit">
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
