import { useState } from "react";
import LoginForm from "../../features/services/LoginForm";
import UserMenuActive from "../../features/services/user/UserMenuActive";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../store/userSlice"; // проверка авторизации
import module from "./UserMenu.module.css";

const UserMenu = () => {
	const [formLoginInOpen, setFormLoginInOpen] = useState<boolean>(false);

	// берём состояние авторизации из Redux
	const isAuth = useSelector(selectIsAuth);

	// запуск формы с авторизацией
	const switchLogInBtn = () => {
		setFormLoginInOpen(true);
	};

	// кнопка авторизации
	const authorizedLoginBtn = () => (
		<button type="button" className={module.loginBtn} onClick={switchLogInBtn}>
			Login
		</button>
	);

	// закрытие формы после авторизации
	const handleActive = () => {
		setFormLoginInOpen(false);
	};

	return (
		<div className="user-menu-wrapper flex flex-row justify-center items-center w-full h-6/10 pl-4 pr-4 bg-gray-600 rounded-md">
		{isAuth ? <UserMenuActive /> : authorizedLoginBtn()}

		{formLoginInOpen && (
			<LoginForm
				visible={true}
				onClose={() => setFormLoginInOpen(false)}
				onActive={handleActive}
			/>
		)}
		</div>
	);
};

export default UserMenu;
