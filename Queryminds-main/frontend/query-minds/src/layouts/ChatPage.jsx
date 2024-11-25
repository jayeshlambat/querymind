import React, { useContext, useEffect } from 'react';
import ChatPageHeader from './ChatPageHeader.jsx';
import ChatPageMain from './ChatPageMain.jsx';
import ChatPageSerachBar from './ChatPageSerachBar.jsx';
import { Context } from '../context/Context.js';

const ChatPage = ({ setIsAuthenticated }) => {
    const { setUsername,
        setFullname,
        setUserEmail,
        setNumber } = useContext(Context)

    useEffect(() => {
        setUsername(localStorage.getItem("loggedInUser"));
        setFullname(localStorage.getItem("loggedInUser"));
        setUserEmail(localStorage.getItem("loggedInUserEmail"));
        setNumber(localStorage.getItem("ColorNumber"));
    }, []);

    return (
        <div className="flex-1 flex flex-col h-screen bg-white dark:bg-[#040B35]">
            <ChatPageHeader />
            <ChatPageMain setIsAuthenticated={setIsAuthenticated} />
            <ChatPageSerachBar />
        </div>
    );
}

export default ChatPage;
