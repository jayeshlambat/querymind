import React from 'react'
import Sidebar from '../layouts/Sidebar'
import ChatPage from '../layouts/ChatPage'

const ChatBot = ({ setIsAuthenticated }) => {
  return (
    <div className="flex h-screen">
        <Sidebar />
        <ChatPage setIsAuthenticated={setIsAuthenticated} />
    </div>
  )
}

export default ChatBot