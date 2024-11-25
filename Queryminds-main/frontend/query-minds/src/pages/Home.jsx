import React from 'react'
import "../index.css";
import Header from  '../layouts/Header';
import HeroSection from '../layouts/HeroSection';
import Footer from "../layouts/Footer"

const Home = () => {
    return (
        <div className={`h-auto w-screen bg-white dark:bg-[#040B35] `}>
            <Header />
            <HeroSection />
            <Footer />
        </div>
    )
}

export default Home