import React from 'react';
import UserMenu from '../UserMenu/UserMenu';
import module from './Header.module.css';


const Header: React.FC = () => {
	return (
		<div className="flex justify-between items-center w-screen h-1/12 bg-gray-800 rounded-b-2xl">
			<div className="my-logo flex items-center justify-center w-1/10">
				<a className="size-15" href="/">
				<img className={`${module.Logo} size-12 h-auto p-2`} src="./logo/logo.svg" alt="logo" />
				</a>
			</div>
			<div className={ module.search }>
				<form action="/search">
					<svg
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="none"
					>
						<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"></path>
					</svg>
					<input
						className={module.TopbarSearch}
						id="topbar-search"
						type="text"
						placeholder="Search"
					/>
				</form>
			</div>

			<div className="login-form-menu flex items-center justify-center xl:w-1/10 h-1/1 lg:w-2/10">
				<UserMenu />
			</div>
		</div>
	);
};

export default Header;