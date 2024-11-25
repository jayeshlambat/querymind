import React, { useContext, useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { LogoutIcon } from '../utils/Icons'
import { Context } from '../context/Context';
import { HandleError, HandleSuccess } from '../utils/Utils.js';

const Profile = () => {
    const [isOpenUser, setIsOpenUser] = useState(false);
    const dropdownRefUser = useRef(null);
    const { GetFirstName, ColorPicker, getInitials, HandleLogout, userEmail, setIsAuthenticated, number } = useContext(Context);
    const navigate = useNavigate();

    const HandleClickOutsideUser = (e) => {
        if (dropdownRefUser.current && !dropdownRefUser.current.contains(e.target)) {
            setIsOpenUser(false);
        }
    };



    useEffect(() => {
        document.addEventListener('mousedown', HandleClickOutsideUser);
        return () => {
            document.removeEventListener('mousedown', HandleClickOutsideUser);
        };
    }, []);
    return (
        <>
            <div className='relative hidden sm:block' ref={dropdownRefUser}>
                <div onClick={() => setIsOpenUser((prev) => !prev)}>
                    <span
                        className={`size-10 rounded-full font-semibold flex text-white items-center justify-center cursor-pointer`}
                        style={{ backgroundColor: `${ColorPicker[number]}` }}
                    >
                        {getInitials()}
                    </span>
                </div>
                {isOpenUser && (
                    <div className="absolute top-full mt-2 right-0 w-full sm:w-64 md:w-80 lg:w-96 bg-[#E9EEF6] dark:bg-[#0C1649] text-gray-600 dark:text-white rounded-xl shadow-lg z-50">
                        <ul className="py-6">
                            <li className="w-full flex justify-center">
                                <p className='text-center'>{userEmail}</p>
                            </li>
                            <li className="pl-2 pr-4 py-3 mx-2 flex flex-col items-center">
                                <span>
                                    <span
                                        className={`size-20 rounded-full text-white flex items-center justify-center text-2xl font-semibold`}
                                        style={{ backgroundColor: `${ColorPicker[number]}` }}
                                    >
                                        {getInitials()}
                                    </span>
                                </span>
                                <span className='my-[2px]'>
                                    <h3 className='font-bold text-xl'>Hii, {GetFirstName()}</h3>
                                </span>
                            </li>
                            <li
                                className="pl-2 pr-4 py-4 mx-5 rounded-full transition-all bg-white hover:bg-[#E0E5EC] dark:bg-slate-700 dark:hover:bg-slate-600 cursor-pointer flex justify-between items-center"
                                onClick={HandleLogout}
                            >
                                <span className='w-full h-full flex items-center justify-center'>
                                    <button className='font-bold flex items-center justify-center'>
                                        <span className='px-1'><LogoutIcon /></span>
                                        <span className='px-1'>Log Out</span>
                                    </button>
                                </span>
                            </li>
                        </ul>
                    </div>
                )}
            </div>

        </>
    )
}

export default Profile