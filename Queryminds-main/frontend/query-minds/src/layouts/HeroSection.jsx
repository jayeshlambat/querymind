import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    AutoAwesomeRoundedIcon
} from "../utils/Icons.js"

const HeroSection = () => {
    return (
        <div className='h-screen w-full bg-white dark:bg-[#040B35]'>
            <div className='flex flex-col mt-10 items-center justify-center w-full max-w-screen-xl mx-auto px-4'>
                <div className='my-1 flex items-center'>
                    <img src="./images/logo.png" alt="robot-logo" className='md:w-16 md:h-16 size-10 mx-1' />
                    <h1 className="font-extrabold text-3xl md:text-4xl bg-gradient-to-r from-[#EC008C] to-[#00aeef] bg-clip-text text-transparent mx-1">
                        Queryminds
                    </h1>
                </div>
                <div className='my-2 text-xl text-[#C4C7C5] dark:text-white md:text-3xl font-bold text-center'>
                    <h2 className='text-[#C4C7C5] dark:text-gray-500 dark:md:text-white'>
                        Where every question meets its answer
                    </h2>
                    <h2>
                        What will you ask?
                    </h2>
                </div>
                <div className='my-4'>
                    <NavLink to="/chatbot" >
                        <button className='bg-gradient-to-r from-[#EC008C] to-[#00aeef] hover:from-[#d50080] hover:to-[#009bd3] md:py-3 md:px-6 py-2 px-4 text-lg flex items-center text-white rounded-md font-bold uppercase'>
                            <AutoAwesomeRoundedIcon className='mx-1' />
                            <span className='mx-1'>Pose a query</span>
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
