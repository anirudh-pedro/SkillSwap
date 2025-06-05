import React from 'react'
import Logo from './Logo'
import Navbar from './Navbar'
import Profile from './Profile'

const Nav = ({setLoaded}) => {
  // setLoaded is used to show a loading indicator during page transitions
  
  return (
    <>
        <div className='z-50 fixed top-0 left-0 w-full flex justify-between items-center px-6 py-6 text-white backdrop-blur-md bg-black/30 border-b border-white/10 shadow-lg'>
            <div className='flex items-center'>
                <Logo />
            </div>
            
            <div className='flex-1 flex justify-center'>
                <Navbar  
                  setLoaded={setLoaded}             
                />
            </div>
            
            <div className='flex items-center'>
                <Profile />
            </div>
        </div>
        
        {/* Spacer to prevent content from going under fixed nav */}
        <div className='h-16 w-full'></div>
    </>
  )
}

export default Nav