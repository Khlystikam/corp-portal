import {useState} from 'react';
import LoginForm from "../../features/services/LoginForm";
import module from "./UserMenu.module.css";


const UserMenu = () => {
	const [formLoginInOpen, setFormLoginInOpen] = useState<boolean>(false);

	const switchLogInBtn = () => {
		setFormLoginInOpen(true);
	}

	return (
		<div className="user-menu-wrapper flex flex-row justify-between items-center w-1/1 h-6/10 pl-4 pr-4 bg-gray-600 rounded-md">
			<button
				type="button"
				className={ module.loginBtn }
				onClick={ switchLogInBtn }
			>
				Log in
			</button>

			{formLoginInOpen && (
				<LoginForm 
					visible={true}
					onClose={() => setFormLoginInOpen(false)}
				/>
			)}
		</div>
	);
};

export default UserMenu;