import React from 'react';
import module from './Header.module.css';

// interface Props {
//     title?: string;
// }

const Header: React.FC = () => {
    return (
        <div className="flex w-screen h-1/12 bg-gray-800 rounded-b-2xl">
            <div className="my-logo flex items-center justify-center w-1/10">
                <a className="size-15" href="/">
                    <img className={`${module.Logo} size-12 h-auto p-2`} src="./logo/logo.svg" alt="logo" />
                </a>
            </div>

            <div className="search flex items-center justify-start w-5/10 ml-10">
                <form className="flex flex-row items-center gap-5 w-6/10 h-7/10 rounded-xl bg-gray-700" action="/search">
                    <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 items-center ml-5"
                        viewBox="0 0 20 20"
                        fill="none"
                    >
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"></path>
                    </svg>
                    <input
                        className={`${module.TopbarSearch} w-full h-full text-lg`}
                        id="topbar-search"
                        type="text"
                        placeholder="Search"
                    />
                </form>
            </div>
        </div>
    );
};

export default Header;