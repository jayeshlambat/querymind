import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import Home from './pages/Home';
import ChatBot from './pages/ChatBot';
import SignupModal from './pages/SignupModal';
import LoginModal from './pages/LoginModal';
import Pricing from './pages/Pricing';
import Error from './pages/Error';
import RefreshHandler from './components/RefreshHandler';
import './index.css';
import { Context } from './context/Context';
import ContextProvider from './context/ContextProvider';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function PrivateRoute({ element }) {
  const { isAuthenticated } = useContext(Context);

  return isAuthenticated ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
      <ContextProvider>
          <RefreshHandler />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/chatbot' element={<PrivateRoute element={<ChatBot />} />} />
            <Route path='/pricing' element={<PrivateRoute element={<Pricing />} />} />
            <Route path='/signup' element={<SignupModal />} />
            <Route path='/login' element={<LoginModal />} />
            <Route path='*' element={<Error />} />
          </Routes>
          <ToastContainer />
      </ContextProvider>
        </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
