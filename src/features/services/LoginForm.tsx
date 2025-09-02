import React, { useState } from "react";
import { createPortal } from "react-dom";
import styles from "./LoginForm.module.css";

interface Props {
	visible: boolean;
	onClose: () => void;
	onActive: () => void;
}

const LoginForm: React.FC<Props> = ({ visible, onClose, onActive }) => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string>("");

	if (!visible) return null;

	const loginDemo = () => (
		<span className={styles.colorFocus}>
			logindemo@dev-khlystikam.ru
		</span>
	);

	const passwordDemp = () => (
		<span className={styles.colorFocus}>
			passwordLoginDemo
		</span>
	);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (!email.trim() || !password.trim()) {
			setError("Заполните все поля!");
			return;
		}

		try {
			const response = await fetch(
				"/projects/php/corp-portal/login.php",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password }),
				}
			);

			const data = await response.json();

			if (data.success) {
				onActive();
			} else {
				setError(data.message || "Неверный email или пароль");
			}
		} catch (err) {
			setError("Ошибка соединения с сервером");
		}
	};

	return createPortal(
		<div className={styles.loginContainer} role="dialog" aria-modal="true">
			<div className={styles.formLoginWrapper}>
				<h1 className={styles.titleForm}>Введите email и пароль</h1>

				<p className={styles.titleForm__p}>
					Используйте эти данные для входа в пробную демоверсии:<br />
					Email: {loginDemo()}<br />
					Пароль: {passwordDemp()}<br />
				</p>

				<form className={styles.formLoginContainer} onSubmit={handleSubmit}>
					<div className={styles.loginForm}>
						<p className={styles.loginForm__p}>Email:</p>
						<input
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							title="email"
							className={styles.inputLogin}
							autoFocus
						/>
					</div>

					<div className={styles.passwordForm}>
						<p className={styles.passwordForm__p}>Пароль:</p>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							title="password"
							className={styles.inputPassword}
						/>
					</div>

					{error && <p className={styles.errorText}>{error}</p>}

					<button type="submit" className={styles.formLoginContainer__button}>
						Войти
					</button>
				</form>

				<button
					type="button"
					title="Закрыть"
					className={styles.popUpClose}
					onClick={onClose}
				>
					<img src="./assets/popup/close-icon.svg" alt="close-icon" />
				</button>
			</div>
		</div>,
		document.body
	);
};

export default LoginForm;
