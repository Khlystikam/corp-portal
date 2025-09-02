import {useState} from 'react';
import LoginForm from "../../features/services/LoginForm";
import UserMenuActive from "../../features/services/user/UserMenuActive";
import module from "./UserMenu.module.css";


const UserMenu = () => {
	const [formLoginInOpen, setFormLoginInOpen] = useState<boolean>(false);
	const [authorizedUserActive, setAuthorizedUserActive] = useState<boolean>(false);

	// запуск формы с авторизацией
	const switchLogInBtn = () => {
		setFormLoginInOpen(true);
	}

	// кнопка авторизации
	const authorizedLoginBtn = () => {
		return(
			<button
				type="button"
				className={ module.loginBtn }
				onClick={ switchLogInBtn }
			>
				Login
			</button>
		)
	}

	const handleActive = () => {
		setAuthorizedUserActive(true);
		setFormLoginInOpen(false);
	};

	// смена кнопки логироания на меню авторизованного пользователя
	const authorizedUser = () => {
		return(
			<UserMenuActive />
		)
	}

	return (
		<div className="user-menu-wrapper flex flex-row justify-center items-center w-1/1 h-6/10 pl-4 pr-4 bg-gray-600 rounded-md">
			{ authorizedUserActive ? authorizedUser() : authorizedLoginBtn() }

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