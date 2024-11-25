import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Context } from './Context';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';
import { HandleSuccess } from '../utils/Utils.js';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const ContextProvider = (props) => {
    const [text, setText] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [expanded, setExpanded] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [username, setUsername] = useState("");
    const [btn, setBtn] = useState(true);
    const [fullname, setFullname] = useState("");
    const [number, setNumber] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [count, setCount] = useState(0);
    const [isPaymentDone, setIsPaymentDone] = useState(false);
    const navigate = useNavigate();

    const ColorPicker = {
        1: "#FF8343",
        2: "#295F98",
        3: "#FABC3F",
        4: "#C40C0C",
        5: "#41B3A2",
        6: "#06D001"
    }

    const HandleSubmit = () => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(text);
        setText("");
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage
        let userId = localStorage.getItem("userId");

        if (!userId) {
            userId = uuidv4();
            localStorage.setItem("userId", userId);
        }

        const headers = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        };

        axios.post(`${import.meta.env.VITE_BACKEND_HOST_URL}/chatbot`, { text, userId }, { headers })
            .then(result => {
                setResultData(result.data.response);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error in HandleSubmit:", error);
                setLoading(false);
            });
    };
    const HandleLogout = async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUserEmail");
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("userId");
        localStorage.removeItem("ColorNumber");
        HandleSuccess("Logged out successful");
        setIsAuthenticated(false);
        navigate("/");
    };
    const GetFirstName = () => {
        let firstname = username?.split(" ")[0];
        return firstname;
    };

    function getInitials() {
        const nameParts = fullname?.trim()?.split(" ");

        if (nameParts?.length === 1) {
            return fullname?.charAt(0)?.toUpperCase(); // For a single name
        }

        const firstNameInitial = nameParts[0]?.charAt(0)?.toUpperCase();
        const lastNameInitial = nameParts[nameParts?.length - 1].charAt(0)?.toUpperCase();

        return firstNameInitial + lastNameInitial;
    }
    function getRandomNumber() {
        return Math.floor(Math.random() * 6) + 1;
    }

    const handleClick = useCallback((title) => {
        setRecentPrompt(title);
    }, [setRecentPrompt]);

    const { isPending, error, data } = useQuery({
        queryKey: ["userChats"],
        queryFn: async () => {
            try {
                const userId = localStorage.getItem("userId");
                console.log("UserId is: ", userId);

                if (!userId) throw new Error("User ID is missing");

                const response = await fetch(`http://localhost:5000/api/userchats?userId=${userId}`, {
                    credentials: "include",
                });
                console.log("This is response ", response);

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("HTTP error:", response.status, errorText);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                console.log("API Response:", result);
                return result;
            } catch (err) {
                console.error("Fetch error:", err);
                throw err; // Rethrow error to be caught by React Query
            }
        },
        refetchInterval: 5000,
        refetchOnWindowFocus: true,
    });

    const useDarkMode = () => {
        const [isDarkMode, setIsDarkMode] = useState(false);

        useEffect(() => {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            setIsDarkMode(mediaQuery.matches);

            const handleChange = (event) => {
                setIsDarkMode(event.matches);
            };

            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }, []);

        useEffect(() => {
            if (isDarkMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }, [isDarkMode]);

        return isDarkMode;
    };
    useDarkMode()


    useEffect(() => {
        setUsername(localStorage.getItem("loggedInUser"));
        setFullname(localStorage.getItem("loggedInUser"));
        setUserEmail(localStorage.getItem("loggedInUserEmail"));
        setNumber(localStorage.getItem("ColorNumber"));
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', btn === true);
    }, [btn]);

    const contextValue = {
        isPending,
        error,
        data,
        ColorPicker,
        prevPrompts,
        recentPrompt,
        showResult,
        loading,
        resultData,
        text,
        username,
        userEmail,
        isAuthenticated,
        isPaymentDone,
        number,
        count,
        expanded,
        btn,
        setBtn,
        handleClick,
        setExpanded,
        setCount,
        setNumber,
        setUserEmail,
        setPrevPrompts,
        setRecentPrompt,
        setShowResult,
        setText,
        setUsername,
        HandleLogout,
        setFullname,
        HandleSubmit,
        setResultData,
        GetFirstName,
        getRandomNumber,
        getInitials,
        setIsAuthenticated,
        setIsPaymentDone
    }


    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;
