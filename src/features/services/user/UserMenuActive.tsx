import {useState} from 'react';
import PopUpUserMenu from './popupMenu/PopUpUserMenu';


const UserMenuActive = () => {
	const [userImgUrl, setUserImgUrl] = useState<string>("");
	const [popUpMenuActive, setPopUpMenuActive] = useState<boolean>(false);

	const nameUser:string = "loginDemo";

	if (!userImgUrl) {
		setUserImgUrl("/projects/project-1/assets/user/no-foto/no_photo_user.webp");
	}

	const handleActive = () => {
		if (!popUpMenuActive){
			setPopUpMenuActive(true);
		} else {
			setPopUpMenuActive(false);
		}
		
	};

	return(
		<div className="relative flex flex-row justify-between items-center w-1/1">
			<h3 className="w-1/3 text-1 text-orange-200">
				{ nameUser }
			</h3>
			<button
				type="button"
				className="w-1/5 rounded-md overflow-hidden cursor-pointer"
				onClick={ handleActive }
			>
				<img
					src={ userImgUrl }
					alt="photo user"
					className="w-1/1 h-auto"
				/>
			</button>

			{popUpMenuActive && (
				<PopUpUserMenu onClose={() => setPopUpMenuActive(false)} />
			)}
		</div>
	)
};

export default UserMenuActive;