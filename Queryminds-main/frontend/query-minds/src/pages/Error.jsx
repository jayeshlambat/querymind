import React from 'react'
import { NavLink } from 'react-router-dom'

const Error = () => {
  return (
    <>
      <div className='h-screen w-screen bg-white dark:bg-[#040B35] flex flex-col items-center justify-center'>
        <img src="./images/error_img.png" className=' size-60 sm:size-80 md:size-96 pb-2' alt="Error image" />
        <span className='text-white pb-2 text-center'>
          The page you're trying to access is not found!
        </span>
        <span>
          <NavLink to="/">
            <button className='bg-[#FFC801] my-2 transition-all duration-300 hover:bg-[#d2a500] px-10 py-2 text-gray-600 rounded-lg font-bold'>
              Go to Home
            </button>
          </NavLink>
        </span>
      </div>
    </>
  )
}

export default Error