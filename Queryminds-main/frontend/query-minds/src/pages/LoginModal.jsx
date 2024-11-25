import React, { useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { HandleError, HandleSuccess } from '../utils/Utils.js';
import { NavLink, useNavigate } from "react-router-dom"
import {
    HomeIcon,
    VisibilityOffRoundedIcon,
    VisibilityRoundedIcon
} from "../utils/Icons.js"

const LoginModal = () => {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();


    const HandleSubmit = (e) => {
        e.preventDefault();
        let isConflict = false;

        if (!email || !password) {
            isConflict = true;
            HandleError("All fields are required");
        } else if (password.length < 8) {
            isConflict = true;
            HandleError("Password length must be at least 8 characters");
        }

        axios.post(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/login`, { email, password })
            .then(result => {
                if (result.data.success) {
                    localStorage.setItem("token", result.data.jwtToken);
                    localStorage.setItem("loggedInUserEmail", result.data.email);
                    localStorage.setItem("loggedInUser", result.data.name);
                    localStorage.setItem("userId", result.data.userId)
                    localStorage.setItem("ColorNumber", (Math.floor(Math.random() * 6) + 1))
                    window.location.reload();
                    HandleSuccess(result.data.message);
                    navigate("/chatbot");
                }
            })
            .catch(error => {
                if (!isConflict) {
                    HandleError("Authentication failed, email or password is wrong");
                    throw error;
                }
            });
    }

    return (
        <div className="min-h-screen w-screen flex flex-col items-center bg-white dark:bg-[#040B35]">
            <div className='h-[10%] m-5 flex items-center px-5 w-full text-gray-600 dark:text-white'>
                <NavLink to="/">
                    <span className='p-2 rounded-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center cursor-pointer hover:bg-zinc-300'>
                        <HomeIcon className=' scale-110' />
                    </span>
                </NavLink>
            </div>
            <div className="relative bg-[#e5efff] text-gray-600 dark:text-black dark:bg-white rounded-lg px-6 sm:px-8 pb-3 shadow-lg w-11/12 sm:w-96">
                <h2 className="text-2xl font-semibold text-center mb-6 mt-6">Log In</h2>

                <form onSubmit={HandleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Email Address</label>
                        <input
                            type="email"
                            placeholder="your@gmail.com"
                            className="w-full border bg-transparent border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-4 relative">
                        <label className="block text-sm font-semibold mb-2">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full border bg-transparent border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {password &&
                            <button
                                type="button"
                                onClick={() => {
                                    setShowPassword(!showPassword);
                                }}
                                className="absolute flex justify-center right-3 top-9 text-gray-600 hover:text-gray-900 focus:outline-none"
                            >
                                {showPassword ? <VisibilityRoundedIcon /> : <VisibilityOffRoundedIcon />}
                            </button>
                        }
                    </div>

                    {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

                    <button type="submit" className="w-full bg-pink-500 text-white py-2 rounded-lg shadow-md hover:bg-pink-600">
                        Get started
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 py-3">
                    Don't have an account? {" "}
                    <NavLink to="/signup">
                        <button
                            type="button"
                            className="text-blue-700 hover:underline font-semibold"
                        >
                            Sign Up
                        </button>
                    </NavLink>
                </p>
            </div>
        </div>
    );
}

export default LoginModal;
