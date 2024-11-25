import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Profile from "../components/Profile.jsx"
import {
    PersonIcon,
    LightModeIcon,
    DarkModeIcon,
    MenuIcon,
    CloseRoundedIcon,
    ArrowDropDownIcon,
    ArrowDropUpIcon
} from "../utils/Icons.js"
import { Context } from '../context/Context.js';

const Header = () => {
    const [isClicked, setIsCLicked] = useState(false);
    const [isClickedProfile, setIsCLickedProfile] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { isAuthenticated, userEmail, btn, setBtn, ColorPicker, HandleLogout, number, getInitials } = useContext(Context);


    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className={`w-full py-6 flex md:flex-row flex-col justify-between items-center sticky top-0 bg-white dark:bg-[#040B35] z-50 transition-shadow duration-300 ${isScrolled ? 'dark:shadow-xl shadow-lg' : 'dark:shadow-none shadow-md'}`}>
            <div className='w-full flex items-center justify-between'>
                <div className='h-full flex items-center mx-3 justify-between'>
                    <span className='flex items-center flex-row mx-1 sm:mx-6 cursor-pointer'>
                        <NavLink to="/" className="flex items-center">
                            <img src="./images/logo.png" alt="robot-logo" className='size-10' />
                            <h3 className="font-extrabold text-2xl bg-gradient-to-r from-[#EC008C] to-[#00aeef] bg-clip-text text-transparent">
                                Queryminds
                            </h3>
                        </NavLink>
                    </span>
                    <div className="md:flex items-center justify-center hidden">
                        <span className="cursor-pointer text-gray-500 dark:hover:text-white hover:text-black flex items-center mx-6 md:mx-2">
                            <NavLink to="/chatbot" className="flex items-center">
                                <span className="text-lg font-semibold ml-2">Ask anything</span>
                            </NavLink>
                        </span>
                        <span className="text-gray-500 dark:hover:text-white hover:text-black cursor-pointer flex items-center mx-6 md:mx-2">
                            <NavLink to="/pricing" className="flex items-center">
                                <span className="text-lg font-semibold ml-2">Pricing</span>
                            </NavLink>
                        </span>
                    </div>

                </div>
                <div className='flex items-center px-4 md:hidden'>
                    <span className='mx-1 sm:mx-4'>
                        <button className='dark:text-white text-gray-600 flex items-center justify-center' onClick={() => setBtn(curr => !curr)}>
                            {
                                btn ? <LightModeIcon /> : <DarkModeIcon />
                            }
                        </button>
                    </span>
                    <span className='mx-1 sm:mx-4 dark:text-white text-gray-600 trasition-all duration-500' onClick={() => setIsCLicked(isClicked === true ? false : true)}>
                        {
                            isClicked ? <CloseRoundedIcon /> : <MenuIcon />
                        }
                    </span>
                </div>
            </div>
            <div
                className={`flex md:hidden flex-col w-full items-center justify-center mt-3 transition-all duration-500 ease-in-out overflow-hidden ${isClicked ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <span className='text-gray-500 hover:text-black dark:hover:text-white  mx-6 cursor-pointer  flex items-center'>
                    <NavLink to="/chatbot" className="flex items-center">
                        <span className='text-lg mx-2 font-semibold'>Ask anything</span>
                    </NavLink>
                </span>
                <span className='flex text-gray-500 hover:text-black dark:hover:text-white cursor-pointer items-center mx-6'>
                    <NavLink to="/pricing" className="flex items-center">
                        <span className='text-lg mx-2 font-semibold'>Pricing</span>
                    </NavLink>
                </span>
                {
                    isAuthenticated && <div className='flex items-center justify-center my-2 text-gray-500 hover:text-black dark:hover:text-white border w-44 flex-col py-2'>
                        <span className='flex transition-all duration-500 items-center w-full justify-center' onClick={() => setIsCLickedProfile(isClickedProfile === true ? false : true)}>
                            <span>
                                <PersonIcon className=' scale-75' />
                            </span>
                            <span>
                                Profile
                            </span>
                            <span className='ml-3'>
                                {
                                    isClickedProfile ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
                                }
                            </span>
                        </span>
                        {
                            isClickedProfile && <span className='flex transition-all duration-500 flex-col items-center'>
                                <span>
                                    {userEmail}
                                </span>
                                <span
                                    className={`size-10 rounded-full my-2 font-semibold flex text-white items-center justify-center cursor-pointer`}
                                    style={{ backgroundColor: `${ColorPicker[number]}` }}
                                >
                                    {getInitials()}
                                </span>
                                <span className='my-2'>
                                    <button onClick={HandleLogout} className='text-white py-2 w-28 text-sm font-bold px-7 rounded-full bg-[#5135F7] hover:bg-[#3d27b7]'>Log Out</button>
                                </span>
                            </span>
                        }
                    </div>
                }

            </div>
            <div className='hidden md:flex'>
                {
                    isAuthenticated ? <Profile /> : <span>
                        <NavLink to="/signup">
                            <button className='text-white py-2 w-28 text-sm font-bold px-7 rounded-full bg-[#5135F7] hover:bg-[#3d27b7]'>Log In</button>
                        </NavLink>
                    </span>
                }
            </div>

            <div className='h-full md:flex items-center mx-8 hidden'>

                <span className='mr-3'>
                    <button className='dark:text-white dark:bg-[#323a60] bg-zinc-200 text-gray-600 size-10 rounded-full flex items-center justify-center' onClick={() => setBtn(curr => !curr)}>
                        {
                            btn ? <LightModeIcon /> : <DarkModeIcon />
                        }
                    </button>
                </span>
            </div>
        </div>
    );
}

export default Header;
