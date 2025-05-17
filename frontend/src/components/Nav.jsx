import React from 'react'
import Logo from './Logo'
import Navbar from './Navbar'
import Profile from './Profile'

const Nav = () => {
  return (
    <>
        <div className='fixed w-full flex justify-around text-white items-center align-middle'>
            <Logo />
            <Navbar />
            <Profile />
        </div>
    </>
  )
}

export default Nav