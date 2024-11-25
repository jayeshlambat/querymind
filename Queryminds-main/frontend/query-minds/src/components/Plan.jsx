import React, { useState, useRef, useEffect, useContext } from 'react'
import {
    ArrowDropUpIcon,
    ArrowDropDownIcon,
    AutoAwesomeIcon,
    CheckCircleOutlineIcon,
} from "../utils/Icons.js"
import { NavLink } from 'react-router-dom';
import { Context } from '../context/Context.js';

const Plan = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isPaymentDone } = useContext(Context);
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <>
            <div ref={dropdownRef} className='relative'>
                <div
                    className='flex items-center cursor-pointer transition-all dark:hover:bg-gray-700 py-1 px-2 rounded-md'
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    <span>
                        <h1 className="text-lg text-black dark:text-white md:text-xl font-semibold">Queryminds</h1>
                    </span>
                    <span className='text-black dark:text-white'>
                        {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                    </span>
                </div>
                {isOpen && (
                    <div className="absolute top-full mt-2 md:left-0 left-1/2 transform -translate-x-1/2 sm:transform-none sm:-translate-x-0 sm:right-0 w-80 bg-[#E9EEF6] dark:bg-[#0C1649] text-gray-600 dark:text-white rounded-xl shadow-lg">
                        <ul className="py-4">
                            <li className="pl-2 pr-4 py-2 mx-2 rounded-xl hover:bg-[#E0E5EC] dark:hover:bg-gray-700 cursor-pointer flex justify-between items-center">
                                <span className='flex flex-row items-center'>
                                    <span className='mx-1'><AutoAwesomeIcon className='text-[#3196DC] scale-[0.8]' /></span>
                                    <span className='mx-1'>Queryminds</span>
                                </span>
                                {
                                    (isPaymentDone) ? "" : <span className='flex flex-row items-center'>
                                        <CheckCircleOutlineIcon />
                                    </span>
                                }
                            </li>
                            <NavLink to="/pricing">
                                <li className="pl-2 pr-4 py-2 mx-2 rounded-xl hover:bg-[#E0E5EC] dark:hover:bg-gray-700 cursor-pointer flex justify-between items-center">
                                    <span className='flex flex-row items-center'>
                                        <span className='mx-1'><AutoAwesomeIcon className='text-[#D6615E] scale-[0.8]' /></span>
                                        <span className='mx-1'>Queryminds Premium</span>
                                    </span>
                                    {
                                        isPaymentDone ? <span className='flex flex-row items-center'>
                                            <CheckCircleOutlineIcon />
                                        </span> : <span className='text-sm py-1 px-3 text-black dark:text-white rounded-full bg-white dark:bg-black flex flex-row items-center'>Upgrade</span>
                                    }
                                </li>
                            </NavLink>
                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}

export default Plan