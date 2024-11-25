import React, { useContext, useState } from 'react';
import Plan from '../components/Plan.jsx';
import Profile from '../components/Profile.jsx';
import {
    MenuIcon,
    MenuOpenIcon,
    AddIcon,
    HomeIcon,
    LightModeIcon,
    LogoutIcon,
    DarkModeIcon,
    ChatIcon
} from "../utils/Icons.js"
import { Context } from '../context/Context.js';
import { NavLink } from 'react-router-dom';

const ChatPageHeader = () => {
    const [isExpandSmall, setIsExpandSmall] = useState(false);
    const { setShowResult, ColorPicker, number, getInitials, handleClick, data, btn, setBtn, userEmail, HandleLogout } = useContext(Context);
    return (
        <>
            <div className="flex items-center justify-between py-4 px-5 dark:text-white text-gray-700 bg-white dark:bg-[#040B35]">
                <div className='flex items-center justify-between w-full'>
                    <div className='sm:hidden'>
                        <span className=' transition-all duration-500' onClick={() => setIsExpandSmall(curr => !curr)} >
                            <MenuIcon className=' scale-125' />
                        </span>
                    </div>
                    <Plan />
                    <Profile />
                    <div className='sm:hidden' onClick={() => setShowResult(false)}>
                        <span className='p-1 bg-gray-700 text-white rounded-full flex items-center justify-center'>
                            <AddIcon />
                        </span>
                    </div>
                </div>
                <div className={` ${isExpandSmall ? "sm:hidden absolute w-full bg-[#F0F4F9] dark:bg-[#0c1649] h-full inset-0 flex flex-col" : "sm:hidden absolute w-full dark:bg-[#0c1649] bg-[#F0F4F9] h-full inset-0 hidden flex-col"} `}>
                    {/* Header */}
                    <header className='flex justify-between items-center p-4 bg-[#F0F4F9] dark:bg-[#0c1649] dark:text-white text-gray-600 border-b dark:border-gray-700 border-gray-300'>
                        <div className='flex items-center justify-center'>
                            <div className='mx-3'>
                                <button className='text-lg transition-all duration-500 font-semibold' onClick={() => setIsExpandSmall(curr => !curr)}><MenuOpenIcon className='scale-125' /></button>
                            </div>
                            <div className='mx-3'>
                                <NavLink to="/">
                                    <button className='text-lg font-semibold'><HomeIcon className='scale-125' /></button>
                                </NavLink>
                            </div>
                        </div>
                        <div className='flex items-center justify-center'>
                            <div className='mx-3'>
                                <button className='text-lg font-semibold' onClick={() => setBtn(curr => !curr)}>
                                    {
                                        btn ? <LightModeIcon /> : <DarkModeIcon />
                                    }
                                </button>
                            </div>
                            <div className='mx-3'>
                                <button className='text-lg font-semibold'><AddIcon className='scale-125' onClick={() => setShowResult(false)} /></button>
                            </div>
                        </div>
                    </header>

                    {/* Chat Section */}
                    <div className='flex-1 overflow-y-auto p-4 bg-[#F0F4F9] dark:bg-[#0c1649]'>
                        <div className=' p-4 rounded-lg dark:text-white text-gray-600'>
                            {/* Chat messages/content go here */}
                            <div>
                                {data?.slice().reverse().map(chat => (
                                    <button
                                        onClick={() => handleClick(chat.title)}
                                        key={chat._id}
                                        className="w-full text-left py-2 px-1 rounded-lg dark:hover:bg-gray-700 hover:bg-[#d6e6ff] text-sm font-semibold"
                                    >
                                        <span className='px-1'><ChatIcon className='scale-75' /></span>
                                        <span className='pl-2'>{(chat.title.length <= 30) ? chat.title : `${chat.title.substring(0, 30)}...`}</span>
                                    </button>
                                ))}
                            </div>
                            {/* Add more chat messages as needed */}
                        </div>
                    </div>

                    {/* Footer - Dark/Light Theme Button */}
                    <footer className='p-4 border-t dark:border-gray-700 border-gray-300 dark:bg-[#0c1649] bg-[#F0F4F9] dark:text-white text-gray-600 flex items-center justify-between'>
                        <div className='flex items-center justify-center'>
                            <div
                                className={`size-10 rounded-full font-semibold flex text-white items-center justify-center cursor-pointer`}
                                style={{ backgroundColor: `${ColorPicker[number]}` }}
                            >
                                {getInitials()}
                            </div>
                            <div className='flex flex-col ml-2 justify-center'>
                                <span>{localStorage.getItem("loggedInUser")}</span>
                                <span className='text-sm'>{userEmail}</span>
                            </div>
                        </div>
                        <div>
                            <span onClick={HandleLogout}>
                                <LogoutIcon />
                            </span>
                        </div>
                    </footer>
                </div>

            </div>
        </>
    )
}

export default ChatPageHeader