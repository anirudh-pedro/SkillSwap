import React from 'react'
import Logo from './Logo'
import Navbar from './Navbar'
import Profile from './Profile'

const Nav = () => {
  return (
    <>
        <div className='z-10 fixed w-full flex justify-around text-white items-center align-middle backdrop-blur-md bg-black/20 border-b-2 border-white/10'>
            <Logo />
            <Navbar />
            <Profile />
        </div>
    </>
  )
}

export default Nav