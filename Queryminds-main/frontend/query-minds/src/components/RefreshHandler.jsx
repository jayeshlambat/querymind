import React, { useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Context } from '../context/Context';

const RefreshHandler = () => {
    const {setIsAuthenticated} = useContext(Context)
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        if (localStorage.getItem("token")) {
            setIsAuthenticated(true);
            if (location.pathname === "/login" || location.pathname === "/signup") {
                navigate("/chatbot", { replace: false })
            }
        }
    }, [location, navigate, setIsAuthenticated])
    return (
        null
    )
}

export default RefreshHandler