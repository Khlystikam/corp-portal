import { useState } from "react";
import PopUpUserMenu from "./popupMenu/PopUpUserMenu";
import { useSelector } from "react-redux";
import { selectUserName, selectIsAuth } from "../../../store/userSlice";

const UserMenuActive = () => {
	const [userImgUrl, setUserImgUrl] = useState<string>("");

	if (!userImgUrl) {
		setUserImgUrl("/projects/project-1/assets/user/no-foto/no_photo_user.webp");
	}

	const [popUpMenuActive, setPopUpMenuActive] = useState<boolean>(false);

	const nameUser = useSelector(selectUserName) || "Гость";
	const isAuth = useSelector(selectIsAuth);

	const handleActive = () => {
		setPopUpMenuActive((prev) => !prev);
	};

	return (
		<div className="relative flex flex-row justify-between items-center w-full">
		<h3 className="w-1/3 text-1 text-orange-200">{nameUser}</h3>

		{isAuth ? (
			<>
			<button
				type="button"
				className="w-1/5 rounded-md overflow-hidden cursor-pointer"
				onClick={handleActive}
			>
				<img src={userImgUrl} alt="photo user" className="w-full h-auto" />
			</button>

			{popUpMenuActive && (
				<PopUpUserMenu onClose={() => setPopUpMenuActive(false)} />
			)}
			</>
		) : (
			<button type="button" className="text-orange-300">
				Войти
			</button>
		)}
		</div>
	);
};

export default UserMenuActive;
