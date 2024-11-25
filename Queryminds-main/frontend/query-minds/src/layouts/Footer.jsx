import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    InstagramIcon,
    LinkedInIcon,
    EmailRoundedIcon,
    LocalPhoneRoundedIcon
} from "../utils/Icons.js"

const Footer = () => {
    return (
        <footer className="dark:bg-[#0C1649] bg-[#D4DAE1] text-gray-700 dark:text-white py-10 sm:py-16 lg:py-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div>
                        <div className="flex items-center mb-4">
                            <NavLink to="/" className="flex items-center">
                                <img src="./images/logo.png" alt="robot-logo" className="w-10 h-10 sm:w-12 sm:h-12" />
                                <h3 className="font-extrabold text-2xl sm:text-3xl bg-gradient-to-r from-[#EC008C] to-[#00aeef] bg-clip-text text-transparent ml-2">
                                    Queryminds
                                </h3>
                            </NavLink>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm sm:text-base">
                            Creating something great for the web. Your slogan or mission statement goes here.
                        </p>
                        <h2 className="text-lg sm:text-xl font-semibold mb-2">Follow Us</h2>
                        <div className="flex space-x-4">
                            <a href="https://www.linkedin.com/in/piyushborkar/" target="_blank" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                                <LinkedInIcon />
                            </a>
                            <a href="https://www.instagram.com/_piyush_borkar_" target="_blank" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                                <InstagramIcon />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg sm:text-xl font-bold mb-4">Quick Links</h2>
                        <ul className="space-y-2">
                            <li><NavLink to="/" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:underline">Home</NavLink></li>
                            <li><NavLink to="/chatbot" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:underline">Ask query</NavLink></li>
                            <li><NavLink to="/pricing" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:underline">Pricing</NavLink></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg sm:text-xl font-bold mb-4">Contact Us</h2>
                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                                <EmailRoundedIcon className="mr-2" />
                                <span>piyushborkar95@gmail.com</span>
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                                <LocalPhoneRoundedIcon className="mr-2" />
                                <span>+91 097-6405-7350</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center text-gray-500 text-sm sm:text-base">
                    &copy; {new Date().getFullYear()} Queryminds. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
