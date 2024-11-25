import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Context } from '../context/Context';
import {
    MenuIcon,
    MenuOpenIcon,
    AddIcon,
    HomeIcon,
    DarkModeIcon,
    LightModeIcon,
    ChatIcon
} from "../utils/Icons.js"


const Sidebar = () => {
    const { setShowResult, expanded, setExpanded, handleClick, error, data, btn, setBtn } = useContext(Context);


    if (error) {
        console.log("Error details:", error);
    }

    return (
        <div className={` ${expanded ? "w-20 sm:flex hidden transition-all ease-in-out duration-300 bg-[#F0F4F9] dark:bg-[#0c1649] flex-col text-gray-600 dark:text-white justify-between" : " transition-all hidden left-0 ease-in-out duration-300l w-80 bg-[#F0F4F9] dark:bg-[#0c1649] text-gray-600 dark:text-white sm:flex flex-col h-screen"} `}>
            <div className={`${expanded ? "w-full border-none flex flex-col justify-center py-4" : "py-4 font-semibold border-b dark:border-gray-700 border-gray-300"}`}>
                <div className={`${expanded ? "flex flex-col w-full justify-center items-center" : "flex justify-between"}`}>
                    <span className={`${expanded ? "mx-0 p-3 cursor-pointer dark:hover:bg-gray-700 hover:bg-[#DDE3EA] md:flex items-center justify-center rounded-full" : "cursor-pointer hover:bg-[#DDE3EA] dark:hover:bg-gray-700 mx-4 p-2 md:flex items-center justify-center rounded-full"}`} onClick={() => setExpanded(curr => !curr)}>
                        {expanded ? <MenuIcon className=' scale-125' />
                            : <MenuOpenIcon className=' scale-125' />}
                    </span>
                    <span className={`${expanded ? "transition-all mx-0 p-3 my-3 flex items-center justify-center rounded-full cursor-pointer  hover:bg-[#DDE3EA] dark:hover:bg-gray-700" : "transition-all cursor-pointer  hover:bg-[#DDE3EA] dark:hover:bg-gray-700 mx-4 p-2 flex items-center justify-center rounded-full"}`}>
                        <NavLink to="/" className="w-full h-full flex items-center justify-center"><HomeIcon className='scale-125' /></NavLink>
                    </span>
                </div>
                <div className={`${expanded ? "transition-all w-full flex items-center justify-center" : "transition-all"}`}>
                    <button onClick={() => setShowResult(false)} className={`${expanded ? "transition-all p-2 mx-0 my-3 rounded-full flex items-center justify-center dark:bg-gray-700 bg-[#ffffff] text-white cursor-pointer" : "transition-all text-left py-1 mx-3 my-5 px-1 rounded-full flex items-center justify-center dark:bg-gray-700 bg-[#ffffff]"}`}>
                        <span><AddIcon className='scale-125 dark:text-white text-gray-600' /></span>
                        <span className={`${expanded ? "hidden transition-all" : "pl-3 px-2 transition-all"}`}>New Chat</span>
                    </button>
                </div>
            </div>

            <div className={`${expanded ? "hidden transition-all" : "transition-all flex-1 py-4 px-4 space-y-2 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar dark:scrollbar-thumb-slate-700 scrollbar-thumb-[#c4c7c5] dark:scrollbar-track-[#0c1649] scrollbar-track-[#F0F4F9] overflow-y-scroll"}`}>
                <div className="space-y-2">
                    <p className="text-gray-400 text-sm py-2 px-3">Recent</p>
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
                </div>
            </div>


            <div className={`${expanded ? "transition-all flex border-none w-full my-6 items-center justify-center" : " transition-all p-4 border-t dark:border-gray-700 border-gray-300"}`}>
                <button className={`${expanded ? "transition-all p-0" : "transition-all w-full text-left p-2 rounded-lg dark:hover:bg-gray-700 hover:bg-[#DDE3EA] flex items-center"}`} onClick={() => setBtn(curr => !curr)}>
                    <span className={`${expanded ? "p-3 hover:bg-[#DDE3EA] dark:hover:bg-gray-700 flex items-center justify-center rounded-full" : ""}`}> {
                        btn ? <LightModeIcon /> : <DarkModeIcon/>
                    } </span>
                    <span className={`${expanded ? "transition-all hidden" : " px-2 transition-all"}`}>{
                        btn ? "Light theme" : "Dark theme"
                    }</span>
                </button>
            </div>
        </div >
    );
}
export default Sidebar;