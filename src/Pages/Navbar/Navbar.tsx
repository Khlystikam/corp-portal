import React, { useState } from 'react';
import { navItemUser, navItemTechnical } from '../../data/NavItems';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';

const Navbar: React.FC = () => {
	const [activeId, setActiveId] = useState(navItemUser[0].id);

	

	return (
		<div className="navbar flex flex-col justify-between w-50 h-auto bg-gray-800 rounded-2xl overflow-y-auto py-5">
			<nav className="w-full bg-gray-800">
				<ul className="flex flex-col items-center gap-3 w-full">
					{navItemUser.map(({ id, name, href, svg }) => (
						<li key={id} className="w-9/10">
							<Link
								to={href}
								onClick={() => setActiveId(id)}
								className={clsx(
									"flex flex-row gap-3 w-full p-2 rounded-md text-gray-400 font-semibold hover:text-gray-50 hover:bg-gray-600 cursor-pointer text-left delay-50",
									activeId === id ? "text-orange-200 bg-gray-600" : ""
								)}
							>
								{svg}
								{name}
							</Link>
						</li>
					))}
				</ul>
			</nav>

			<nav className="w-1/1 mt-5 bg-gray-800">
				<ul className="flex flex-col items-center gap-3 w-full">
					{navItemTechnical.map(({ id, name, href, svg }) => (
						<li key={id} className="w-9/10">
							<Link
								to={href}
								onClick={() => setActiveId(id)}
								className={clsx(
									"flex flex-row gap-3 w-full p-2 rounded-md text-gray-400 font-semibold hover:text-gray-50 hover:bg-gray-600 cursor-pointer text-left delay-50",
									activeId === id ? "text-orange-200 bg-gray-600" : ""
								)}
							>
								{svg}
								{name}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
};

export default Navbar;