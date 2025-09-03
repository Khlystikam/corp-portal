import { useDispatch } from "react-redux";
import { clearUser } from "../../../store/userSlice";
import type { AppDispatch } from "../../../store/store";

const LogoutButton: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();

	const handleLogout = () => {
		dispatch(clearUser());
	};

	return (
		<button
			onClick={handleLogout}
			className="flex flex-row justify-center gap-3 w-9/10 p-2 rounded-md text-gray-100 font-semibold  bg-red-900 hover:bg-red-800 cursor-pointer delay-50"
		>
			Выйти из аккаунта
		</button>
	);
};

export default LogoutButton;
