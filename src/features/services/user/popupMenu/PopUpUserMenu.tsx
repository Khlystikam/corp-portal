import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import LogoutButton from '../LogoutButton';

type PopUpUserMenuProps = {
	onClose: () => void;
};

const PopUpUserMenu = ({ onClose }: PopUpUserMenuProps) => {
	const menuRef = useRef<HTMLDivElement | null>(null);

	// скрывать меню аккаунта юзера
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [onClose]);

	const menuUserItems = [
		{ id: 1, name: "Информация аккаунта", href: "/projects/project-1/account-information" },
		{ id: 2, name: "Настройки", href: "/projects/project-1/settings-account" },
		{ id: 3, name: "Уведомления", href: "/projects/project-1/notifications" },
	];

	return (
		<div
			ref={menuRef}
			className="absolute top-11 -right-2 flex flex-col justify-around items-start w-60 h-80 bg-gray-900 rounded-2xl z-1100"
		>
			<ul className="flex flex-col items-center gap-3 w-full">
				{menuUserItems.map(({ id, name, href }) => (
					<li key={id} className="w-9/10 bg-gray-700 rounded-md">
						<Link
							to={href}
							className="flex flex-row gap-3 w-full p-2 rounded-md text-gray-400 font-semibold hover:text-gray-50 hover:bg-gray-600 cursor-pointer text-left delay-50"
						>
							{name}
						</Link>
					</li>
				))}
			</ul>

			<span className="flex flex-col items-center gap-3 w-full">
				<LogoutButton />
			</span>
		</div>
	);
};

export default PopUpUserMenu;
