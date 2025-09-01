import React from "react";
import { createPortal } from "react-dom";
import styles from "./LoginForm.module.css";

interface Props {
	visible: boolean;
	onClose: () => void;
}

const LoginForm: React.FC<Props> = ({ visible, onClose }) => {
	// Если не нужно показывать — ничего не рендерим
	if (!visible) return null;

	const loginDemo = "loginDemo";
	const passwordDemp = "adminloginDemo";

	return createPortal(
		<div className={styles.loginContainer} role="dialog" aria-modal="true">
		<div className={styles.formLoginWrapper}>
			<h1 className={styles.titleForm}>Введите логин и пароль</h1>

			<p className={styles.titleForm__p}>
				Тестовые для входа:<br />
				Логин: {loginDemo}<br />
				Пароль: {passwordDemp}<br />
				Используйте их для пробной демоверсии.
			</p>

			<form className={styles.formLoginContainer}>
			<div className={styles.loginForm}>
				<p className={styles.loginForm__p}>Логин:</p>
				<input
					type="text"
					title="login"
					className={styles.inputLogin}
					autoFocus
				/>
			</div>

			<div className={styles.passwordForm}>
				<p className={styles.passwordForm__p}>Пароль:</p>
				<input
					type="password"
					title="password"
					className={styles.inputPassword}
				/>
			</div>

			<button
				type="submit"
				className={styles.formLoginContainer__button}
				onClick={onClose}
			>
				Войти
			</button>
			</form>

			<button
				type="button"
				title="Закрыть"
				className={styles.popUpClose}
				onClick={onClose}
			>
				<img
					src="./assets/popup/close-icon.svg"
					alt="close-icon"
				/>
			</button>
		</div>
		</div>,
		document.body
	);
};

export default LoginForm;
