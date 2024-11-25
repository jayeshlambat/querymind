import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { HandleError, HandleSuccess } from '../utils/Utils.js';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    HomeIcon,
    CancelRoundedIcon,
    VisibilityOffRoundedIcon,
    VisibilityRoundedIcon
} from "../utils/Icons.js";

const SignupModal = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        let isConflict = false;

        if (!name || !email || !password || !confirmPassword) {
            isConflict = true;
            HandleError("All fields are required");
        } else if (name.length < 3) {
            isConflict = true;
            HandleError("Name length must be at least 3 characters");
        } else if (password.length < 8) {
            isConflict = true;
            HandleError("Password length must be at least 8 characters");
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        axios.post(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/signup`, { name, email, password, confirmPassword })
            .then(result => {
                if (result.data.success) {
                    HandleSuccess(result.data.message);
                    navigate("/login");
                }
            })
            .catch(err => {
                if (err.response && err.response.status === 409) {
                    HandleError("This email is already registered. Please log in or use another email.");
                } else if (isConflict === false) {
                    HandleError("An error occurred during signup. Please try again.");
                }
                console.error(err);
                throw err;
            });
    };

    return (
        <div className="flex flex-col min-h-screen w-screen items-center bg-white dark:bg-[#040B35]">
            <div className="h-[10%] m-5 flex items-center px-6 w-full text-gray-600 dark:text-white">
                <NavLink to="/">
                    <span className="p-2 rounded-full bg-zinc-200 dark:bg-slate-700 flex items-center justify-center cursor-pointer hover:bg-zinc-300 dark:hover:bg-slate-600">
                        <HomeIcon className="scale-110" />
                    </span>
                </NavLink>
            </div>
            <div className="relative dark:bg-white bg-[#e5efff] text-gray-600 dark:text-black mb-5 rounded-lg px-6 sm:px-8 py-6 shadow-lg w-11/12 sm:w-96">
                <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4 sm:mb-5">Sign up for free</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-1">Full Name</label>
                        <input
                            type="text"
                            placeholder="Eg. Jayesh lambat"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-transparent border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-1">Email Address</label>
                        <input
                            type="email"
                            placeholder="your@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-transparent border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4 relative">
                        <label className="block text-sm font-semibold mb-1">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-transparent border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {password &&
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute flex justify-center right-3 top-9 text-gray-600 hover:text-gray-900 focus:outline-none"
                            >
                                {showPassword ? <VisibilityRoundedIcon /> : <VisibilityOffRoundedIcon />}
                            </button>
                        }
                    </div>

                    <div className="mb-4 relative">
                        <label className="block text-sm font-semibold mb-1">Confirm Password</label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-transparent border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {confirmPassword &&
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 flex justify-center top-9 text-gray-600 hover:text-gray-900 focus:outline-none"
                            >
                                {showConfirmPassword ? <VisibilityRoundedIcon /> : <VisibilityOffRoundedIcon />}
                            </button>
                        }
                    </div>

                    {error && <p className="text-red-500 text-center text-sm mb-2">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-pink-500 text-white py-2 rounded-lg shadow-md hover:bg-pink-600"
                    >
                        Get started
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 py-3">
                    Already have an account?{" "}
                    <NavLink to="/login">
                        <button
                            type="button"
                            className="text-blue-700 hover:underline font-semibold"
                        >
                            Log In
                        </button>
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default SignupModal;
